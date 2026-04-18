"use client";

import Link from "next/link";
import { useState } from "react";

const ANNUAL_CHECKOUT = "https://www.fanbasis.com/agency-checkout/the-tee-academy/zm7Qm";

export function AnnualCta() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-purple-50/60 p-3 text-left ring-1 ring-tta-purple/10 transition hover:bg-purple-50">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-2 border-tta-purple accent-tta-pink"
        />
        <span className="text-xs leading-snug text-tta-black/80">
          I understand this is a $397 annual payment for 12 months of TTA
          access, and it auto-renews at $397/year until I cancel. I&apos;ve
          read the{" "}
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
      <a
        href={agreed ? ANNUAL_CHECKOUT : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!agreed}
        tabIndex={agreed ? 0 : -1}
        onClick={(e) => {
          if (!agreed) e.preventDefault();
        }}
        className={`group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-tta-purple px-8 py-4 font-heading text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-tta-purple/25 transition ${
          agreed
            ? "hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-xl"
            : "cursor-not-allowed opacity-50"
        }`}
      >
        Get the Annual Deal
        <span aria-hidden className="transition group-hover:translate-x-1">
          →
        </span>
      </a>
      <p className="mt-3 text-center text-xs text-tta-black/70">
        or <span className="font-bold text-tta-black">4 payments of $101</span>
        {" "}with Zip at checkout
      </p>
    </div>
  );
}
