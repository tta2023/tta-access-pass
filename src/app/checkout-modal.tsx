"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const TRIAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_TRIAL_PLAN_ID;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const ZAPIER_TRIAL_WEBHOOK = process.env.NEXT_PUBLIC_ZAPIER_TRIAL_WEBHOOK;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const emailValid = EMAIL_RE.test(email.trim());
  const ready = emailValid && agreed;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const saveLead = useCallback(async () => {
    if (emailSaved || !emailValid) return;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: "landing-page-modal",
          segment: "TTA Warm Leads",
        }),
      });
      setEmailSaved(true);
    } catch (err) {
      console.error("Lead capture failed:", err);
    }
  }, [email, emailValid, emailSaved]);

  useEffect(() => {
    if (ready && !emailSaved) {
      saveLead();
    }
  }, [ready, emailSaved, saveLead]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-tta-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-y-auto rounded-3xl bg-tta-white shadow-2xl"
        style={{ maxHeight: "calc(100vh - 3rem)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-tta-black/5 text-tta-black transition hover:bg-tta-black/10"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="px-8 pt-10 pb-8 sm:px-10">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-tta-pink">
            7-Day Access Pass
          </p>
          <h2
            id="checkout-modal-title"
            className="mt-3 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
          >
            One step from inside TTA.
          </h2>
          <p className="mt-3 text-base text-tta-black/70">
            Drop your email, check the terms, and pay your $7.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="checkout-email"
                className="block font-heading text-xs font-bold uppercase tracking-wider text-tta-black/80"
              >
                Best email
              </label>
              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={saveLead}
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-2xl border-2 border-tta-black/10 bg-tta-white px-5 py-4 font-body text-base text-tta-black outline-none transition focus:border-tta-purple focus:ring-4 focus:ring-tta-purple/15"
              />
              <p className="mt-2 text-xs text-tta-black/55">
                Use the same email for PayPal + your TTA login.
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-purple-50/60 p-4 text-left ring-1 ring-tta-purple/10 transition hover:bg-purple-50">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-tta-purple accent-tta-pink"
              />
              <span className="text-sm leading-snug text-tta-black/80">
                I understand my $7 gives me 7 days of access. On Day 7, my
                membership auto-renews at $44/month until I cancel in PayPal.
                I&apos;ve read the{" "}
                <Link href="/terms" className="text-tta-purple underline">
                  Terms
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-tta-purple underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <div className="mt-7">
            {!ready ? (
              <button
                type="button"
                disabled
                className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-tta-pink px-10 py-5 font-heading text-lg font-extrabold uppercase tracking-wide text-white opacity-50 shadow-lg shadow-tta-pink/30"
              >
                {!emailValid
                  ? "Enter your email to continue"
                  : "Accept terms to continue"}
              </button>
            ) : TRIAL_PLAN_ID && PAYPAL_CLIENT_ID ? (
              <div className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-tta-black/5">
                <PayPalScriptProvider
                  options={{
                    clientId: PAYPAL_CLIENT_ID,
                    vault: true,
                    intent: "subscription",
                    components: "buttons",
                  }}
                >
                  <PayPalButtons
                    style={{
                      shape: "rect",
                      color: "gold",
                      layout: "vertical",
                      label: "subscribe",
                    }}
                    createSubscription={(_data, actions) =>
                      actions.subscription.create({
                        plan_id: TRIAL_PLAN_ID,
                        subscriber: { email_address: email.trim().toLowerCase() },
                      })
                    }
                    onApprove={async (data) => {
                      if (ZAPIER_TRIAL_WEBHOOK) {
                        try {
                          await fetch(ZAPIER_TRIAL_WEBHOOK, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              subscriber: {
                                email_address: email.trim().toLowerCase(),
                              },
                              resource: {
                                subscriber: {
                                  email_address: email.trim().toLowerCase(),
                                },
                              },
                              subscription_id: data.subscriptionID,
                              source: "tta-access-pass-landing",
                            }),
                          });
                        } catch (err) {
                          console.error("Zapier webhook failed:", err);
                        }
                      }
                      window.location.href = `/thank-you?subscription_id=${data.subscriptionID}`;
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert(
                        "Something went wrong with PayPal. Please try again or email hello@theteeacademy.com."
                      );
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <p className="text-center text-sm text-red-500">
                PayPal not configured. Missing plan ID.
              </p>
            )}
          </div>

          <p className="mt-5 text-center text-xs text-tta-black/55">
            Secure checkout powered by PayPal · Cancel anytime in 2 clicks
          </p>
        </div>
      </div>
    </div>
  );
}
