"use client";

import { useState } from "react";
import { CheckoutModal } from "./checkout-modal";

export function CtaButton({
  children,
  dark = false,
}: {
  children?: React.ReactNode;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const label = children ?? "Start My 7-Day Pass — $7";

  return (
    <>
      <button
        id={dark ? "cta-button-dark" : "cta-button"}
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-tta-pink px-10 py-5 font-heading text-lg font-extrabold uppercase tracking-wide text-white shadow-lg shadow-tta-pink/30 transition hover:-translate-y-0.5 hover:bg-tta-pink/90 hover:shadow-xl hover:shadow-tta-pink/40 focus:outline-none focus:ring-4 focus:ring-tta-pink/40 sm:text-xl"
      >
        {label}
        <span aria-hidden className="transition group-hover:translate-x-1">
          →
        </span>
      </button>
      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
