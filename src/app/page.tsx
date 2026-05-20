"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckoutModal } from "./checkout-modal";

const ANNUAL_CHECKOUT = "https://www.fanbasis.com/agency-checkout/the-tee-academy/zm7Qm";

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

type UpcomingEvent = { date: string; day: string; title: string };
const upcoming: UpcomingEvent[] = [
  { date: "Wed, May 20", day: "6:00 PM CDT · Tomorrow", title: "Social Media Content Audits + HOOK Training" },
  { date: "Thu, May 21", day: "6:00 PM CDT", title: "Affiliate Marketing w/ AI — TikTok Shop & Amazon" },
  { date: "Mon, May 25", day: "6:00 PM CDT", title: "Etsy / Print On Demand Sellers Q&A + Support Call" },
  { date: "Wed, May 27", day: "6:00 PM CDT", title: "Claude Code Vibe Coding Session + Support Call" },
  { date: "Thu, May 28", day: "6:00 PM CDT", title: "Monthly Reflection + June Goal Setting" },
  { date: "Mon, Jun 1", day: "6:00 PM CDT", title: "Seedance 2.0 Tips & Tricks: Support Call + Q&A" },
];

const libraryTiles: { src: string; label: string }[] = [
  { src: "/library/tile-1-ai-system.png", label: "AI Powered System For Any Biz" },
  { src: "/library/tile-ai-language.jpg", label: "AI Language Models For Beginners" },
  { src: "/library/tile-7-pod.png", label: "Print on Demand w/ AI" },
  { src: "/library/tile-ai-content-physical.jpg", label: "AI Content Class: Physical Products" },
  { src: "/library/tile-5-branding-gems.png", label: "Branding & Marketing Gems" },
  { src: "/library/tile-money-map.jpg", label: "The Money Map" },
  { src: "/library/tile-ai-twin.png", label: "How To Create An AI Twin / Avatar" },
  { src: "/library/tile-digital-biz.png", label: "How To Start A Digital Product Biz" },
];

const trainingCategories: { label: string; items: string[] }[] = [
  {
    label: "AI Skills",
    items: ["Prompt Like A Pro", "AI Language Models for Beginners", "Nano Banana Image Prompts", "AI Edit Like A Pro", "AI Lip Sync Training", "Higgsfield AI Twin", "AI Avatar For Free", "Custom GPTs + Mini Apps"],
  },
  {
    label: "Video & Content",
    items: ["Product Videos w/ AI", "Kling 3.0", "Seedance 2.0", "Sora 2 + Google Veo", "YouTube Channel w/ AI", "Animated Episodic Content", "AI Twin Talking Video"],
  },
  {
    label: "Physical Products",
    items: ["T-Shirt Brand Course", "Sublimation Camp", "POD Biz with AI", "Cup & Journal Biz", "Coloring Book Creations", "Canvas To Cash 5-Day", "Shopify Tips"],
  },
  {
    label: "Digital Products",
    items: ["Digital Marketing Journey", "How To Start A Digital Product Biz", "PNG Profits Camp", "Holiday Themed Classes", "1k Digital Marketing Sales Play", "Digital Product Content Strategy"],
  },
  {
    label: "Business & Marketing",
    items: ["Money Map: Monthly Revenue Planning", "AutoDM System (Sales In Your Sleep)", "Email & Text Marketing 101", "SEO Camp", "Branding & Marketing Gems", "30-Day Revenue Reset", "Black Friday + Cyber Monday Training"],
  },
  {
    label: "Libraries & Resources",
    items: ["Mockups & Stock Image Library", "Biz Resources & Templates", "Canva Learning Space", "TTA Besties Content Studio App", "Monthly Sales Reflection Replays", "T-Shirt Design Hall"],
  },
];

const whoFor = [
  "Print on demand sellers",
  "Etsy + digital product sellers",
  "Coloring book creators",
  "Course + membership builders",
  "Live sellers",
  "Apparel + beauty brands",
  "Content creators",
  "Aspiring creators ready to start",
];

const notFor = [
  "Tech bros looking for the next hype cycle.",
  "\"AI money\" content watchers who never build.",
  "People looking for magic pills or shortcuts.",
  "People who want coddling instead of coaching.",
];

type Faq = { q: string; a: string };
const faqs: Faq[] = [
  {
    q: "What exactly do I get for $7?",
    a: "Full access to The Tee Academy for 7 days. Every live class happening that week (Mon + Thu at 6 PM CDT, plus bonus Wednesday drops), 40+ self-paced trainings, the prompt library, the community, and all on-demand AI tool walkthroughs. Same dashboard a $44/mo member sees.",
  },
  {
    q: "What happens after the 7 days?",
    a: "Your membership auto-continues at $44/month (regularly $97). You'll be notified before the charge so there are no surprises. Cancel inside PayPal in 2 clicks any time before day 7.",
  },
  {
    q: "How do I cancel?",
    a: "Cancel yourself anytime in PayPal → Settings → Payments → Manage automatic payments → cancel. Takes 30 seconds. If you checked out as a guest or need help, email support@theteeacademy.co at least 48 hours before your trial ends. Cancellations after billing aren't refunded — set a reminder.",
  },
  {
    q: "What if I'm a complete beginner?",
    a: "Perfect. 40+ self-paced trainings start at the basics — t-shirts, POD, digital products, AI — plus live coaching every Mon + Thu. If you can copy + paste, you can keep up.",
  },
  {
    q: "What's included in the AI Twin training?",
    a: "Full walkthroughs for building your AI Twin in Higgsfield, creating AI avatars for free, AI lip sync, talking-head video, and using your twin across content, ads, and your funnel.",
  },
  {
    q: "What kind of business does this work for?",
    a: "Print on demand, Etsy, digital products, coloring books, courses, memberships, apparel, beauty, live sales, content businesses. If you're selling something creative, the Academy fits.",
  },
  {
    q: "Do I need tech skills?",
    a: "No. TTA is built for creatives who don't consider themselves \"tech people.\" Every training starts at the basics and walks you through it step by step.",
  },
  {
    q: "What's the difference between monthly and annual?",
    a: "Monthly is $44/mo, cancel any time. Annual is $397/year — that's 8 months for the price of 12, plus you get the Prompt Like A Pro Generator ($47 value) and a 30-min welcome jumpstart call with Coach Tee, free.",
  },
];

/* ────────────────────────────────────────────────────────────
   COUNTDOWN TICKER
   ──────────────────────────────────────────────────────────── */

function CountdownTicker() {
  // Sale window — closes Sunday May 4 23:59 CT (so today is "the 7-Day Pass closes in")
  const deadlineRef = useRef<number>(new Date("2026-05-04T23:59:00-05:00").getTime());
  const [parts, setParts] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      let s = Math.max(0, Math.floor((deadlineRef.current - now) / 1000));
      const d = Math.floor(s / 86400); s -= d * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      const pad = (n: number) => String(n).padStart(2, "0");
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-tta-ink text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-7 py-3">
        <div className="flex items-center gap-2.5 font-heading text-base sm:text-lg font-black tracking-tight">
          <span
            className="inline-block h-2 w-2 rounded-full bg-tta-pink"
            style={{ animation: "tta-pulse 1.6s ease-in-out infinite" }}
          />
          <span>The 7-Day Pass closes in</span>
        </div>
        <div className="flex items-center gap-2.5 font-heading">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-tta-pink-wash hidden sm:inline">
            Doors close
          </span>
          <div className="flex gap-1.5">
            {[
              { n: parts.d, u: "Days" },
              { n: parts.h, u: "Hrs" },
              { n: parts.m, u: "Min" },
              { n: parts.s, u: "Sec" },
            ].map((c) => (
              <div key={c.u} className="min-w-[46px] rounded-md bg-tta-purple px-2.5 pt-1.5 pb-1 text-center">
                <span className="block font-heading text-xl leading-none tabular-nums">{c.n}</span>
                <span className="mt-0.5 block font-body text-[9px] font-bold uppercase tracking-[0.16em] text-tta-purple-wash">{c.u}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STAMP BUTTON — primary CTA, opens $7 checkout modal
   ──────────────────────────────────────────────────────────── */

function StampButton({
  onClick,
  children,
  price = "$7",
  variant = "purple",
  fullWidth = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  price?: string;
  variant?: "purple" | "ink" | "white";
  fullWidth?: boolean;
}) {
  const palette =
    variant === "purple"
      ? { bg: "var(--color-tta-purple)", border: "var(--color-tta-ink)", text: "#fff", shadow: "var(--color-tta-ink)", priceBg: "var(--color-tta-pink)", priceText: "var(--color-tta-ink)", hover: "var(--color-tta-purple-hover)" }
      : variant === "ink"
      ? { bg: "var(--color-tta-ink)", border: "var(--color-tta-ink)", text: "#fff", shadow: "var(--color-tta-purple)", priceBg: "var(--color-tta-pink)", priceText: "var(--color-tta-ink)", hover: "var(--color-tta-purple)" }
      : { bg: "#fff", border: "var(--color-tta-pink)", text: "var(--color-tta-ink)", shadow: "var(--color-tta-pink)", priceBg: "var(--color-tta-purple)", priceText: "#fff", hover: "var(--color-tta-pink-wash)" };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-[10px] px-7 py-4 font-body text-sm font-black uppercase tracking-[0.08em] transition active:translate-x-[3px] active:translate-y-[3px] ${fullWidth ? "w-full justify-center" : ""}`}
      style={{
        background: palette.bg,
        color: palette.text,
        border: `2px solid ${palette.border}`,
        boxShadow: `6px 6px 0 ${palette.shadow}`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = palette.hover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = palette.bg)}
      onMouseDown={(e) => (e.currentTarget.style.boxShadow = `3px 3px 0 ${palette.shadow}`)}
      onMouseUp={(e) => (e.currentTarget.style.boxShadow = `6px 6px 0 ${palette.shadow}`)}
    >
      <span>{children}</span>
      <span
        className="rounded-[4px] px-2 py-0.5 font-heading text-[18px] tracking-tight"
        style={{ background: palette.priceBg, color: palette.priceText }}
      >
        {price}
      </span>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   FAQ ACCORDION
   ──────────────────────────────────────────────────────────── */

function FaqList() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="border-t border-tta-hair">
      {faqs.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={f.q} className="border-b border-tta-hair">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-4 py-6 text-left font-heading text-xl sm:text-2xl font-black tracking-tight text-tta-ink transition hover:text-tta-purple"
              aria-expanded={isOpen}
            >
              <span>{f.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] transition ${
                  isOpen ? "rotate-45 border-tta-purple bg-tta-purple text-white" : "border-tta-ink text-tta-ink"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="7" y1="2" x2="7" y2="12" />
                  <line x1="2" y1="7" x2="12" y2="7" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-[max-height] duration-300 ease-out"
              style={{ maxHeight: isOpen ? "320px" : "0px" }}
            >
              <p className="max-w-xl pb-6 pr-4 text-base leading-relaxed text-tta-graphite">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STICKY MOBILE BAR
   ──────────────────────────────────────────────────────────── */

function StickyMobileBar({ onCta }: { onCta: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const pricing = document.getElementById("pricing");
      if (!hero || !pricing) return;
      const past = window.scrollY > hero.offsetTop + hero.offsetHeight - 200;
      const r = pricing.getBoundingClientRect();
      const pricingVisible = r.top < window.innerHeight && r.bottom > 0;
      setShow(past && !pricingVisible);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className="fixed bottom-6 left-1/2 z-[25] flex max-w-[calc(100vw-32px)] items-center gap-4 rounded-full bg-tta-ink px-5 py-3.5 text-white transition-transform duration-300 ease-out"
      style={{
        transform: show ? "translate(-50%, 0)" : "translate(-50%, 140%)",
        boxShadow: "0 16px 40px rgba(1,1,1,0.28), 0 0 0 2px var(--color-tta-pink)",
      }}
    >
      <span className="font-heading text-base font-black tracking-tight">
        7 days · <span className="text-tta-pink">$7</span>
      </span>
      <button
        type="button"
        onClick={onCta}
        className="rounded-full bg-tta-pink px-4 py-2 font-body text-xs font-black uppercase tracking-[0.12em] text-tta-ink transition hover:bg-white"
      >
        Grab it
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [annualAgreed, setAnnualAgreed] = useState(false);
  const [isClassDay, setIsClassDay] = useState(false);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short" });
    const day = fmt.format(new Date());
    setIsClassDay(day === "Mon" || day === "Thu");
  }, []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const scrollToPricing = useCallback(() => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const scrollToInside = useCallback(() => {
    document.getElementById("inside")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="flex-1">
      {/* COUNTDOWN TICKER */}
      <CountdownTicker />

      {/* NAV */}
      <nav className="sticky top-[46px] sm:top-[58px] z-20 border-b border-tta-hair bg-white/90 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-7 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-tta-ink font-heading text-2xl font-black tracking-tight text-white">
              T<b className="text-tta-pink">·</b>
            </div>
            <div className="font-heading text-xl sm:text-2xl font-black tracking-tight">THE TEE ACADEMY</div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-tta-graphite">
              $44/mo · <span className="text-tta-mist line-through">$97</span>
            </div>
            <button
              type="button"
              onClick={scrollToPricing}
              className="whitespace-nowrap rounded-lg bg-tta-purple px-4 py-3 font-body text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-tta-purple-hover"
            >
              Get the Pass
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="mx-auto grid max-w-[1280px] items-center gap-12 px-7 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
            7-Day Access Pass · Just $7
          </span>
          <h1 className="mt-5 font-heading font-black tracking-tight leading-[1.02] text-[clamp(54px,7vw,108px)]">
            Stop playing with AI.
            <br />
            Start making <em className="not-italic text-tta-purple">real money.</em>
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg sm:text-xl leading-relaxed text-tta-graphite">
            7 days of full access to The Tee Academy — the AI business school for creative women ready to turn prompts into real income. Live workshops 2× a week, the prompt library, AI Twin training, and the receipts to prove it works.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <StampButton onClick={openModal} price="$7">Grab the 7-Day Pass</StampButton>
            <button
              type="button"
              onClick={scrollToInside}
              className="rounded-[10px] border-[1.5px] border-tta-ink bg-transparent px-5 py-4 font-body text-xs font-black uppercase tracking-[0.1em] text-tta-ink transition hover:bg-tta-ink hover:text-white"
            >
              See what&apos;s inside
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-tta-ash">
            <div><b className="font-bold text-tta-ink">Instant access.</b> Cancel any time.</div>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-tta-mist" />
            <div><b className="font-bold text-tta-ink">500+</b> creatives building inside</div>
            {isClassDay && (
              <>
                <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-tta-mist" />
                <div><b className="font-bold text-tta-ink">Live</b> workshop tonight</div>
              </>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border-2 border-tta-ink bg-tta-cloud" style={{ boxShadow: "8px 8px 0 var(--color-tta-purple)" }}>
          <Image src="/photos/purple-hoodie-laptop.png" alt="Coach Tee in a purple hoodie at her laptop" fill className="object-cover" priority sizes="(max-width: 1024px) 90vw, 540px" />
          <div
            className="absolute -left-4 top-9 rotate-[-4deg] rounded-[10px] bg-tta-ink px-4 py-3.5 font-heading text-xl font-black leading-none tracking-tight text-white"
            style={{ boxShadow: "4px 4px 0 var(--color-tta-pink)" }}
          >
            7 DAYS
            <br />
            <em className="not-italic text-tta-pink">· $7 ·</em>
          </div>
          {isClassDay && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border-2 border-tta-ink bg-white px-3.5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-tta-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-tta-pink" />
              Live workshop tonight 6 PM CDT
            </div>
          )}
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="border-y border-tta-hair bg-tta-cloud">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-9 gap-y-3 px-7 py-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-tta-ash">What you&apos;ll actually build</div>
          <div className="flex flex-wrap items-center gap-x-9 gap-y-2 font-heading text-xl sm:text-[22px] font-black tracking-tight text-tta-ink">
            <span>Print on Demand</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-tta-purple" />
            <span>Etsy Shops</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-tta-purple" />
            <span>AI Twins</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-tta-purple" />
            <span>Campaign Funnels</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-tta-purple" />
            <span>Live Sales</span>
          </div>
        </div>
      </div>

      {/* AI TWIN SPOTLIGHT — Option A */}
      <section className="bg-tta-purple-wash py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-7 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border-2 border-tta-ink bg-white order-last lg:order-first" style={{ boxShadow: "10px 10px 0 var(--color-tta-pink)" }}>
            <Image src="/photos/gray-suit-boss.png" alt="Coach Tee's AI Twin in a gray suit" fill className="object-cover" sizes="(max-width: 1024px) 90vw, 540px" />
            <div
              className="absolute right-4 top-4 rotate-[3deg] rounded-[10px] bg-tta-pink px-3.5 py-2 font-heading text-base font-black tracking-tight text-tta-ink"
              style={{ boxShadow: "3px 3px 0 var(--color-tta-ink)" }}
            >
              ↓ This is AI ↓
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
              The AI Twin Vault
            </span>
            <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5.5vw,76px)]">
              Build the version of you <em className="not-italic text-tta-purple">that never gets camera shy.</em>
            </h2>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-tta-graphite">
              Your AI Twin is the unfair advantage hiding inside TTA. Show up daily on camera without showing up on camera. The full vault is yours from day one of your 7-Day Pass.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { h: "Clone your face for camera-shy reels", d: "Higgsfield AI Twin walkthrough — built and shipping in under an hour." },
                { h: "Use your twin in ads + funnels", d: "Talking-head ads, course intros, sales reels — without you in glam every time." },
                { h: "AI Avatars (free option included)", d: "When the budget's not there yet — we have the free workflow too." },
                { h: "AI Lip Sync + Voice Match", d: "Make the twin actually sound like you, not a robot." },
              ].map((b) => (
                <li key={b.h} className="flex items-start gap-3 rounded-2xl border border-tta-hair bg-white p-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-tta-purple text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div>
                    <div className="font-heading text-lg font-black tracking-tight">{b.h}</div>
                    <div className="mt-0.5 text-sm leading-snug text-tta-graphite">{b.d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <StampButton onClick={openModal} price="$7" variant="ink">Unlock AI Twin Training</StampButton>
            </div>
          </div>
        </div>
      </section>

      {/* INSIDE — DARK BAND */}
      <section id="inside" className="bg-tta-ink text-white">
        <div className="mx-auto max-w-[1280px] px-7 py-24">
          <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-pink before:inline-block before:h-0.5 before:w-7 before:bg-current">
            Inside your 7 days
          </span>
          <h2 className="mt-4 max-w-3xl font-heading font-black tracking-tight leading-[1.02] text-[clamp(42px,5.5vw,82px)]">
            Full access. <em className="not-italic text-tta-pink">No watered-down trial.</em>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#B5B5B6]">
            For one week, you get exactly what every full member gets. Walk in, build, sell, and decide if it&apos;s for you.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", h: "Live Workshops", d: "Mon + Thu live coaching at 6 PM CDT, plus bonus Wednesday drops. Hot-seats, campaign teardowns, real asks, real answers.", tag: "Weekly · Live" },
              { num: "02", h: "The Prompt Library", d: "Every prompt I actually use — campaign copy, product visuals, AI twins, funnels, live-sale scripts. Copy + ship.", tag: "Always on" },
              { num: "03", h: "The Community", d: "Women who are building, not watching. Show your work, get eyes on it, find collabs and customers.", tag: "Members only" },
              { num: "04", h: "AI Tool Walkthroughs", d: "40+ step-by-step builds inside the tools we actually use — no fluff, no \"47 AI sites\" lists.", tag: "On-demand" },
            ].map((c) => (
              <div key={c.num} className="relative overflow-hidden rounded-[18px] border border-[#2A2A2E] bg-[#161618] p-7 transition hover:-translate-y-1 hover:border-tta-purple">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-tta-purple text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {c.num === "01" && (<><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>)}
                    {c.num === "02" && (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>)}
                    {c.num === "03" && (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>)}
                    {c.num === "04" && (<path d="M12 2 15 8.5 22 9.5 17 14.5 18.2 22 12 18.5 5.8 22 7 14.5 2 9.5 9 8.5z" />)}
                  </svg>
                </div>
                <div className="mt-3.5 font-heading text-sm font-black tracking-[0.06em] text-tta-pink">{c.num}</div>
                <h3 className="mt-1 font-heading text-2xl font-black leading-tight tracking-tight">{c.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B5B5B6]">{c.d}</p>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-tta-pink">{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SNEAK PEEK INSIDE — actual library tile artwork */}
      <section className="bg-tta-cloud py-24">
        <div className="mx-auto max-w-[1280px] px-7">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
              Sneak Peek Inside
            </span>
            <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5vw,72px)]">
              This is what the library <em className="not-italic text-tta-purple">actually looks like.</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-tta-graphite">
              Real training covers pulled straight from inside TTA right now. Every tile is a full class waiting for you on day one.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {libraryTiles.map((tile) => (
              <div
                key={tile.src}
                className="group overflow-hidden rounded-[18px] border-2 border-tta-ink bg-white transition hover:-translate-y-1"
                style={{ boxShadow: "6px 6px 0 var(--color-tta-purple)" }}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-tta-cloud">
                  <Image
                    src={tile.src}
                    alt={tile.label}
                    fill
                    sizes="(min-width: 768px) 280px, 50vw"
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t-2 border-tta-ink px-3.5 py-2.5">
                  <p className="font-heading text-xs font-black leading-tight tracking-tight text-tta-ink">
                    {tile.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center font-body text-sm text-tta-graphite">
            + 30 more trainings you can start the moment you&apos;re in.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS — supporting receipts for the trial */}
      <section className="bg-tta-white py-24">
        <div className="mx-auto max-w-[1280px] px-7">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
              Real members · real receipts
            </span>
            <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5vw,72px)]">
              The same Academy <em className="not-italic text-tta-purple">they&apos;re winning inside.</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-tta-graphite">
              Your $7 unlocks the exact same vault these members built from. Hit play.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-center sm:items-start">
              <div
                className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[18px] border-2 border-tta-ink bg-tta-ink"
                style={{ boxShadow: "8px 8px 0 var(--color-tta-purple)" }}
              >
                <video
                  src="/testimonials/testimonial-1.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 max-w-[320px] text-center sm:text-left">
                <div className="font-heading text-xl font-black tracking-tight text-tta-ink">Shannon</div>
                <div className="mt-0.5 text-sm leading-snug text-tta-graphite">
                  Sells digital products to beginner crafters. Made thousands + goes mega viral using TTA&apos;s content tips.
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div
                className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[18px] border-2 border-tta-ink bg-tta-ink"
                style={{ boxShadow: "8px 8px 0 var(--color-tta-pink)" }}
              >
                <video
                  src="/testimonials/testimonial-2.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 max-w-[320px] text-center sm:text-left">
                <div className="font-heading text-xl font-black tracking-tight text-tta-ink">Kinese</div>
                <div className="mt-0.5 text-sm leading-snug text-tta-graphite">
                  New digital seller. Sold out her first prompt workshop — paid attendees before launch day.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING CLASSES */}
      <section className="bg-tta-purple text-white">
        <div className="mx-auto max-w-[1280px] px-7 py-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-pink-wash before:inline-block before:h-0.5 before:w-7 before:bg-current">
              Live & Upcoming
            </span>
            <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5vw,72px)]">
              Your first class could be <em className="not-italic" style={{ background: "linear-gradient(transparent 60%, var(--color-tta-pink) 60%, var(--color-tta-pink) 92%, transparent 92%)", padding: "0 0.08em" }}>this week.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#F1E9F8]">
              These are real classes on the calendar right now. Show up live, or watch every replay inside the hub.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {upcoming.map((e) => {
              const [day, monDate] = e.date.split(", ");
              const [mon, num] = monDate.split(" ");
              return (
                <div key={e.title} className="flex items-start gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/15">
                  <div
                    className="flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center rounded-2xl bg-tta-pink text-tta-ink"
                    style={{ boxShadow: "3px 3px 0 var(--color-tta-ink)" }}
                  >
                    <div className="font-body text-[10px] font-black uppercase tracking-[0.18em]">{day}</div>
                    <div className="font-heading text-3xl font-black leading-none">{num}</div>
                    <div className="font-body text-[10px] font-black uppercase tracking-[0.18em]">{mon}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-body text-xs font-black uppercase tracking-[0.14em] text-tta-pink">{e.day}</div>
                    <h3 className="mt-1.5 font-heading text-lg font-black leading-tight tracking-tight">{e.title}</h3>
                    <div className="mt-2 text-xs text-[#F1E9F8]">Recorded for replays</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRAINING CATEGORIES */}
      <section className="bg-tta-white py-24">
        <div className="mx-auto max-w-[1280px] px-7">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
              40+ self-paced trainings
            </span>
            <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5vw,72px)]">
              Everything you can <em className="not-italic text-tta-purple">binge in 7 days.</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-tta-graphite">
              Your $7 unlocks the full library — every category, every training, every replay. No drip walls. No locked tiers.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trainingCategories.map((cat) => (
              <div key={cat.label} className="rounded-2xl border border-tta-hair bg-tta-cloud p-6">
                <div className="font-heading text-xl font-black uppercase tracking-tight text-tta-purple">{cat.label}</div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <li key={it} className="rounded-full bg-white px-3 py-1.5 text-sm text-tta-graphite ring-1 ring-tta-hair">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-tta-white py-24">
        <div className="mx-auto max-w-[1280px] px-7">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
                Who this is for
              </span>
              <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5.2vw,76px)]">
                For women in their <em className="not-italic text-tta-purple">building season.</em>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-tta-graphite">
                Creative women ready to actually use AI to build income. Not watch content. Not dabble. Build.
              </p>
              <div className="mt-9 grid gap-3.5 sm:grid-cols-2">
                {whoFor.map((w) => (
                  <div key={w} className="flex items-start gap-3 text-base font-medium leading-snug text-tta-graphite">
                    <div className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] bg-tta-purple text-white">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3" /></svg>
                    </div>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-tta-hair border-l-[3px] border-l-tta-ink bg-tta-cloud p-7">
              <div className="font-heading text-2xl font-black tracking-tight">Not for…</div>
              <ul className="mt-4 space-y-1">
                {notFor.map((n, i) => (
                  <li
                    key={n}
                    className={`flex items-start gap-2.5 py-2 text-[15px] leading-snug text-tta-graphite ${i < notFor.length - 1 ? "border-b border-dashed border-tta-hair" : ""}`}
                  >
                    <span className="mt-0.5 shrink-0 text-lg font-bold text-tta-mist">×</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative overflow-hidden bg-tta-purple py-28 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-8 whitespace-nowrap font-heading text-[84px] font-black leading-none tracking-tight"
          style={{ color: "rgba(255,255,255,0.06)" }}
        >
          BUILDING SEASON · BUILDING SEASON · BUILDING SEASON · BUILDING SEASON · BUILDING SEASON ·
        </div>
        <div className="relative mx-auto max-w-[1280px] px-7">
          <div className="mx-auto max-w-[1080px]">
            <div className="text-center">
              <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-pink-wash before:inline-block before:h-0.5 before:w-7 before:bg-current">
                The 7-Day Access Pass
              </span>
              <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(48px,6vw,92px)]">
                Seven days. Seven dollars. <em className="not-italic text-tta-pink">No excuses.</em>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#F1E9F8]">
                Get inside the Academy at the lowest price we&apos;ll ever offer. Use it. Build something. Decide if you want to stay.
              </p>
            </div>

            <div className="mt-14 grid gap-7 lg:grid-cols-2 lg:items-start">
              {/* CARD 1 — $7 ACCESS PASS */}
              <div
                className="relative rounded-[18px] border-2 border-tta-ink bg-white px-8 pt-9 pb-7 text-tta-ink"
                style={{ boxShadow: "8px 8px 0 var(--color-tta-pink)" }}
              >
                <div
                  className="absolute -top-3.5 right-6 rounded-full border-2 border-tta-ink bg-tta-pink px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-tta-ink"
                >
                  Limited · Closes Sunday
                </div>
                <h3 className="font-heading text-3xl font-black leading-none tracking-tight">7-Day Access Pass</h3>
                <p className="mt-1 text-sm text-tta-ash">Full Academy access. One time. No auto-bill on the $7.</p>
                <div className="my-5 flex items-baseline gap-3.5 border-y-2 border-tta-ink py-4">
                  <div className="font-heading text-[78px] font-black leading-[0.95] tracking-[-0.03em]">
                    <span className="align-top text-[44px] leading-tight">$</span>7
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-tta-ash line-through">$97/mo regular</span>
                    <span className="text-sm font-semibold text-tta-graphite">$1/day · 7 days</span>
                  </div>
                </div>
                <div className="mb-6 flex flex-col gap-2.5">
                  {[
                    "2–3 live workshops while you're in",
                    "Full prompt library (300+ prompts)",
                    "Community + hot-seat threads",
                    "AI Twin training + 40+ walkthroughs",
                  ].map((li) => (
                    <div key={li} className="flex items-start gap-2.5 text-sm leading-snug text-tta-graphite">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-tta-purple"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>{li}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={openModal}
                  className="flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-tta-ink px-5 py-4 font-body text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-tta-purple"
                >
                  Get my 7-Day Pass
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-tta-ash">
                  One-time $7. Auto-renews at $44/mo after day 7 unless you cancel inside PayPal.
                </p>
              </div>

              {/* CARD 2 — $397 ANNUAL (BEST VALUE) */}
              <div
                className="relative rounded-[18px] border-2 border-tta-ink bg-tta-ink px-8 pt-9 pb-7 text-white"
                style={{ boxShadow: "8px 8px 0 var(--color-tta-pink)" }}
              >
                <div
                  className="absolute -top-3.5 right-6 rounded-full border-2 border-tta-ink bg-tta-pink px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-tta-ink"
                >
                  Best Value · Save $131
                </div>
                <h3 className="font-heading text-3xl font-black leading-none tracking-tight">Annual Membership</h3>
                <p className="mt-1 text-sm text-[#B5B5B6]">Skip the trial. Lock in a year + get bonuses worth $400+.</p>
                <div className="my-5 flex items-baseline gap-3.5 border-y-2 border-white/30 py-4">
                  <div className="font-heading text-[78px] font-black leading-[0.95] tracking-[-0.03em]">
                    <span className="align-top text-[44px] leading-tight">$</span>397
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-[#B5B5B6] line-through">$528/yr regular</span>
                    <span className="text-sm font-semibold text-white">$33/mo · billed yearly</span>
                  </div>
                </div>

                <div className="mb-5 rounded-[10px] border border-tta-pink/40 bg-tta-pink/10 p-4">
                  <div className="font-body text-[10px] font-black uppercase tracking-[0.16em] text-tta-pink">Annual Bonuses · Free</div>
                  <div className="mt-2 space-y-2 text-sm leading-snug">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-tta-pink">★</span>
                      <span><b className="font-bold">Prompt Like A Pro Generator</b> — the GPT that writes your campaign prompts ($47 value)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-tta-pink">★</span>
                      <span><b className="font-bold">30-min Welcome Jumpstart Call</b> with Coach Tee — map your first 30 days inside TTA</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex flex-col gap-2.5">
                  {[
                    "Everything in monthly — full access, no walls",
                    "Live workshops every Mon + Thu, all year",
                    "All 40+ trainings + new ones added monthly",
                    "Priority hot-seats in the community",
                  ].map((li) => (
                    <div key={li} className="flex items-start gap-2.5 text-sm leading-snug text-[#B5B5B6]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-tta-pink"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>{li}</span>
                    </div>
                  ))}
                </div>

                <label className="mb-3 flex cursor-pointer items-start gap-2.5 rounded-lg bg-white/5 p-3 ring-1 ring-white/10 transition hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={annualAgreed}
                    onChange={(e) => setAnnualAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-tta-pink"
                  />
                  <span className="text-[11px] leading-snug text-[#D8D8D9]">
                    I understand this is a $397 annual payment for 12 months of TTA access, and it auto-renews at $397/year until I cancel. I&apos;ve read the{" "}
                    <Link href="/terms" className="text-tta-pink underline">Terms</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-tta-pink underline">Privacy Policy</Link>.
                  </span>
                </label>

                <a
                  href={annualAgreed ? ANNUAL_CHECKOUT : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!annualAgreed}
                  tabIndex={annualAgreed ? 0 : -1}
                  onClick={(e) => { if (!annualAgreed) e.preventDefault(); }}
                  className={`flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-tta-pink px-5 py-4 font-body text-sm font-black uppercase tracking-[0.12em] text-tta-ink transition ${
                    annualAgreed ? "hover:bg-white" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  Get the Annual Deal
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-[#B5B5B6]">
                  or <b className="font-bold text-white">4 payments of $101</b> with Zip at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tta-white py-24">
        <div className="mx-auto max-w-[1280px] px-7">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.22em] text-tta-purple-hover before:inline-block before:h-0.5 before:w-7 before:bg-current">
                Common questions
              </span>
              <h2 className="mt-4 font-heading font-black tracking-tight leading-[1.02] text-[clamp(40px,5vw,72px)]">
                Real talk, <em className="not-italic text-tta-purple">fast answers.</em>
              </h2>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-tta-graphite">
                If your question isn&apos;t here, DM <b className="font-bold">@theteeacademy</b> and we&apos;ll get back to you within a day.
              </p>
            </div>
            <FaqList />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-tta-ink px-7 py-24 text-center text-white">
        <h2 className="mx-auto max-w-4xl font-heading font-black tracking-tight leading-[1.02] text-[clamp(48px,6.5vw,108px)]">
          Your building season starts the day you{" "}
          <em
            className="not-italic"
            style={{
              background: "linear-gradient(transparent 60%, var(--color-tta-pink) 60%, var(--color-tta-pink) 92%, transparent 92%)",
              padding: "0 0.08em",
              color: "#fff",
            }}
          >
            decide.
          </em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#B5B5B6]">
          Seven days. Seven dollars. The same Academy 500+ creatives are using to actually build.
        </p>
        <div className="mt-9 flex justify-center">
          <StampButton onClick={openModal} price="$7" variant="white">Get my 7-Day Pass</StampButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-tta-hair bg-tta-white px-7 py-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-6 text-sm text-tta-ash">
          <div>© The Tee Academy — Building season, all year.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://instagram.com/theteeacademy" target="_blank" rel="noopener noreferrer" className="font-semibold text-tta-graphite transition hover:text-tta-purple">Instagram</a>
            <Link href="/terms" className="font-semibold text-tta-graphite transition hover:text-tta-purple">Terms</Link>
            <Link href="/privacy" className="font-semibold text-tta-graphite transition hover:text-tta-purple">Privacy</Link>
            <a href="mailto:support@theteeacademy.co" className="font-semibold text-tta-graphite transition hover:text-tta-purple">Contact</a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <StickyMobileBar onCta={openModal} />

      {/* CHECKOUT MODAL */}
      <CheckoutModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
