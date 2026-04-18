import { NextResponse } from "next/server";

type PayPalSubscriptionEvent = {
  id?: string;
  event_type?: string;
  resource?: {
    id?: string;
    status?: string;
    plan_id?: string;
    subscriber?: {
      email_address?: string;
      name?: { given_name?: string; surname?: string };
    };
  };
};

const MAILERLITE_API = "https://connect.mailerlite.com/api";

async function mailerliteUpsert(email: string, groupId: string, fields?: Record<string, string>) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn("[paypal-webhook] MAILERLITE_API_KEY missing — skipping");
    return;
  }
  const res = await fetch(`${MAILERLITE_API}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, groups: [groupId], fields: fields ?? {} }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("[paypal-webhook] MailerLite upsert failed:", res.status, text);
  }
}

async function verifyPayPalWebhook(
  request: Request,
  rawBody: string,
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const clientId = process.env.PAYPAL_CLIENT_ID ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!webhookId || !clientId || !clientSecret) {
    console.warn("[paypal-webhook] Verification creds missing — accepting unverified (set PAYPAL_WEBHOOK_ID and PAYPAL_CLIENT_SECRET to enable)");
    return true;
  }

  const tokenRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!tokenRes.ok) {
    console.error("[paypal-webhook] Token fetch failed:", tokenRes.status);
    return false;
  }
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const verifyRes = await fetch(
    "https://api-m.paypal.com/v1/notifications/verify-webhook-signature",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: request.headers.get("paypal-auth-algo"),
        cert_url: request.headers.get("paypal-cert-url"),
        transmission_id: request.headers.get("paypal-transmission-id"),
        transmission_sig: request.headers.get("paypal-transmission-sig"),
        transmission_time: request.headers.get("paypal-transmission-time"),
        webhook_id: webhookId,
        webhook_event: JSON.parse(rawBody),
      }),
    },
  );
  if (!verifyRes.ok) {
    console.error("[paypal-webhook] Verify call failed:", verifyRes.status);
    return false;
  }
  const { verification_status } = (await verifyRes.json()) as { verification_status: string };
  return verification_status === "SUCCESS";
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  const verified = await verifyPayPalWebhook(request, rawBody);
  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: PayPalSubscriptionEvent;
  try {
    event = JSON.parse(rawBody) as PayPalSubscriptionEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.event_type;
  const email = event.resource?.subscriber?.email_address?.trim().toLowerCase();
  const subscriptionId = event.resource?.id;
  const firstName = event.resource?.subscriber?.name?.given_name ?? "";

  if (!email) {
    console.log(`[paypal-webhook] Event ${eventType} (${event.id}) — no subscriber email, ignoring`);
    return NextResponse.json({ ok: true, ignored: true });
  }

  const trialStartedGroup = process.env.MAILERLITE_TRIAL_STARTED_GROUP_ID;
  const trialCancelledGroup = process.env.MAILERLITE_TRIAL_CANCELLED_GROUP_ID;
  const activeMemberGroup = process.env.MAILERLITE_ACTIVE_MEMBER_GROUP_ID;
  const churnedGroup = process.env.MAILERLITE_CHURNED_GROUP_ID;

  const fields: Record<string, string> = {
    name: firstName,
    paypal_subscription_id: subscriptionId ?? "",
    last_event: eventType ?? "",
  };

  switch (eventType) {
    case "BILLING.SUBSCRIPTION.ACTIVATED":
    case "BILLING.SUBSCRIPTION.CREATED":
      if (trialStartedGroup) await mailerliteUpsert(email, trialStartedGroup, fields);
      break;

    case "PAYMENT.SALE.COMPLETED":
      if (activeMemberGroup) await mailerliteUpsert(email, activeMemberGroup, fields);
      break;

    case "BILLING.SUBSCRIPTION.CANCELLED":
      if (trialCancelledGroup) await mailerliteUpsert(email, trialCancelledGroup, fields);
      break;

    case "BILLING.SUBSCRIPTION.EXPIRED":
    case "BILLING.SUBSCRIPTION.SUSPENDED":
      if (churnedGroup) await mailerliteUpsert(email, churnedGroup, fields);
      break;

    default:
      console.log(`[paypal-webhook] Unhandled event type: ${eventType} for ${email}`);
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "paypal-webhook",
    hint: "Configure this URL in PayPal Developer Dashboard → Webhooks",
  });
}
