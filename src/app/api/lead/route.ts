import { NextResponse } from "next/server";

type LeadBody = {
  email?: string;
  source?: string;
  segment?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const segment = body.segment ?? "TTA Warm Leads";
  const source = body.source ?? "landing-page-modal";

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_WARM_LEADS_GROUP_ID;

  if (!apiKey || !groupId) {
    console.log(
      `[lead] email=${email} segment=${segment} source=${source} (MailerLite not configured yet — stub only)`
    );
    return NextResponse.json({ ok: true, stub: true });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        fields: { source },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[lead] MailerLite error:", res.status, text);
      return NextResponse.json(
        { error: "Upstream failure" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] fetch failure:", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
