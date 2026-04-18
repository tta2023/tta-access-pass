import Image from "next/image";
import Link from "next/link";
import { AnnualCta } from "./annual-cta";
import { CtaButton } from "./cta-button";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 text-tta-pink"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

type Pillar = { emoji: string; title: string; desc: string; bullets: string[] };
const pillars: Pillar[] = [
  {
    emoji: "📦",
    title: "Physical Product Biz",
    desc: "Start or scale your t-shirt, print-on-demand, Etsy, TikTok Shop, mug, journal, or coloring book brand.",
    bullets: [
      "What to post and how to market without burnout",
      "Live selling + seasonal promos (Black Friday, Cyber Monday)",
      "AI crash courses, editing tutorials, mockup templates",
    ],
  },
  {
    emoji: "💻",
    title: "Digital Product Biz",
    desc: "Create and sell digital products, templates, printables, and online courses.",
    bullets: [
      "Use AI to plan, launch, and automate marketing workflows",
      "Launch strategies, funnels, and audience growth",
      "Build your own mini apps, custom GPTs, and AI workflows",
    ],
  },
  {
    emoji: "🎬",
    title: "AI Content Creation",
    desc: "Prompt secrets from the pros + train to create and edit AI-generated videos that actually convert.",
    bullets: [
      "Create your AI Twin or avatar for branded content",
      "Clone your on-camera presence in Higgsfield AI",
      "AI voice + visuals for UGC and affiliate marketing",
    ],
  },
];

type UpcomingEvent = {
  date: string;
  day: string;
  title: string;
  going: number;
};
const upcoming: UpcomingEvent[] = [
  {
    date: "Mon, Apr 20",
    day: "6:00 PM CST",
    title: "Claude AI Skill Building Class",
    going: 38,
  },
  {
    date: "Wed, Apr 22",
    day: "6:00 PM CST",
    title: "AI for Beginners Q&A + Support Call",
    going: 0,
  },
  {
    date: "Thu, Apr 23",
    day: "6:00 PM CST",
    title: "Coloring Book Biz with AI",
    going: 35,
  },
  {
    date: "Mon, Apr 27",
    day: "6:00 PM CST",
    title: "Talking Head Video Tips & Tricks",
    going: 27,
  },
  {
    date: "Thu, Apr 30",
    day: "6:00 PM CST",
    title: "April Sales Reflection + May Goal Setting",
    going: 22,
  },
];

const trainingCategories: { label: string; items: string[] }[] = [
  {
    label: "AI Skills",
    items: [
      "Prompt Like A Pro",
      "AI Language Models for Beginners",
      "Nano Banana Image Prompts",
      "AI Edit Like A Pro",
      "AI Lip Sync Training",
      "Higgsfield AI Twin",
      "AI Avatar For Free",
      "Custom GPTs + Mini Apps",
    ],
  },
  {
    label: "Video & Content",
    items: [
      "Product Videos w/ AI",
      "Kling 3.0",
      "Seedance 2.0",
      "Sora 2 + Google Veo",
      "YouTube Channel w/ AI",
      "Animated Episodic Content",
      "AI Twin Talking Video",
    ],
  },
  {
    label: "Physical Products",
    items: [
      "T-Shirt Brand Course",
      "Sublimation Camp",
      "POD Biz with AI",
      "Cup & Journal Biz",
      "Coloring Book Creations",
      "Canvas To Cash 5-Day",
      "Shopify Tips",
    ],
  },
  {
    label: "Digital Products",
    items: [
      "Digital Marketing Journey",
      "How To Start A Digital Product Biz",
      "PNG Profits Camp",
      "Holiday Themed Classes",
      "1k Digital Marketing Sales Play",
      "Digital Product Content Strategy",
    ],
  },
  {
    label: "Business & Marketing",
    items: [
      "Money Map: Monthly Revenue Planning",
      "AutoDM System (Sales In Your Sleep)",
      "Email & Text Marketing 101",
      "SEO Camp",
      "Branding & Marketing Gems",
      "30-Day Revenue Reset",
      "Black Friday + Cyber Monday Training",
    ],
  },
  {
    label: "Libraries & Resources",
    items: [
      "Mockups & Stock Image Library",
      "Biz Resources & Templates",
      "Canva Learning Space",
      "TTA Besties Content Studio App",
      "Monthly Sales Reflection Replays",
      "T-Shirt Design Hall",
    ],
  },
];

const whoFor = [
  "You sell — or want to sell — physical or digital products",
  "You want to leverage AI to automate and grow your brand",
  "You crave structure, systems, and community accountability",
  "You're ready to stop guessing and start earning consistently",
  "You're a creative building online income — teacher, maker, seller, or all three",
];

type Faq = { q: string; a: string };
const faqs: Faq[] = [
  {
    q: "When are the live classes?",
    a: "Live AI business classes every Monday and Thursday at 6 PM CST, plus bonus classes on some Wednesdays. Claude, AI content, and business strategy are woven throughout. Every class is recorded and uploaded to the member hub within 24 hours.",
  },
  {
    q: "What happens after the 7 days?",
    a: "Your membership auto-continues at $44/month (normally $97). You'll be notified before the charge.",
  },
  {
    q: "How do I cancel?",
    a: "Cancel yourself anytime in PayPal → Settings → Payments → Manage automatic payments → hit cancel. Takes 30 seconds. If you checked out as a guest (no PayPal account) or need help, email support@theteeacademy.co at least 48 hours before your trial ends and we'll cancel for you. Cancellations after billing aren't refunded, so set a reminder.",
  },
  {
    q: "What if I'm a complete beginner?",
    a: "Perfect. 40+ self-paced trainings start at the basics — t-shirts, POD, digital products, AI — plus live coaching every week.",
  },
  {
    q: "What's included in the AI Twin training?",
    a: "Full walkthroughs for building your AI Twin in Higgsfield, creating AI avatars for free, AI lip sync, talking-head video, and using your twin across content and ads.",
  },
  {
    q: "Do I need tech skills?",
    a: "No. TTA is built for creatives who don't consider themselves 'tech people.' Every training starts at the basics and walks you through it step by step.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-tta-white via-tta-white to-purple-50 px-6 pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-tta-pink/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-tta-purple/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <div className="text-center md:text-left">
            <span className="inline-block rounded-full bg-tta-purple/10 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-tta-purple">
              The Tee Academy
            </span>
            <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.25rem]">
              Get Inside TTA for 7 Days.
              <br />
              <span className="text-tta-purple">For $7.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-tta-black/70 sm:text-xl md:mx-0">
              Live AI business classes every Monday &amp; Thursday at 6 PM CST,
              plus bonus Wednesday drops. Build AI-powered income alongside
              500+ creatives already inside.
            </p>
            <div className="mt-10 flex justify-center md:justify-start">
              <CtaButton>Start My 7-Day Pass — $7</CtaButton>
            </div>
            <p className="mt-4 text-sm text-tta-black/60">
              Then $44/month (normally $97). Cancel anytime in PayPal in 2 clicks.
            </p>
            <p className="mt-8 font-heading text-sm font-bold uppercase tracking-wider text-tta-purple">
              500+ creatives inside · 40+ self-paced trainings · Live classes 2× a week
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-tta-purple/30 ring-1 ring-tta-purple/10">
              <Image
                src="/tta-hero.webp"
                alt="The Tee Academy — AI Business Membership"
                fill
                priority
                sizes="(min-width: 768px) 450px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="bg-tta-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-tta-pink">
              What You&apos;ll Build
            </p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Three Kinds of Income. One Room.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-tta-black/70">
              Physical products. Digital products. AI-powered content. TTA has
              the full playbook for all three — and the room to actually do the
              work.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-3xl border border-tta-teal/20 bg-gradient-to-br from-tta-teal/5 to-tta-white p-8 transition hover:-translate-y-1 hover:border-tta-teal/40 hover:shadow-xl"
              >
                <div className="text-4xl">{p.emoji}</div>
                <h3 className="mt-5 font-heading text-2xl font-bold">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-tta-black/70">
                  {p.desc}
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-tta-black/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE THIS WEEK */}
      <section className="relative overflow-hidden bg-tta-purple px-6 py-24 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tta-purple via-tta-purple to-purple-900"
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-tta-pink">
              Live &amp; Upcoming
            </p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your First Class Could Be This Week.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              These are real classes on the calendar right now. Show up live,
              or watch every replay inside the hub.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {upcoming.map((e) => (
              <div
                key={e.title}
                className="flex items-start gap-5 rounded-2xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/10 transition hover:bg-white/15"
              >
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-tta-pink text-white shadow-lg">
                  <span className="font-heading text-[0.65rem] font-bold uppercase tracking-wider">
                    {e.date.split(",")[0]}
                  </span>
                  <span className="font-heading text-2xl font-extrabold leading-none">
                    {e.date.split(" ")[2]}
                  </span>
                  <span className="font-heading text-[0.6rem] font-bold uppercase tracking-wider">
                    {e.date.split(" ")[1].replace(",", "")}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-tta-pink">
                    {e.day}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-bold leading-tight">
                    {e.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/60">
            Live classes every Monday &amp; Thursday · Bonus Wednesday drops · All 6 PM CST
          </p>
        </div>
      </section>

      {/* SELF-PACED CATALOG */}
      <section className="bg-tta-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-tta-pink">
              40+ Self-Paced Trainings
            </p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Yours the Moment You Join.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-tta-black/70">
              Binge the library. Pick one. Start any course, any time — no
              waiting, no drip delays.
            </p>
          </div>
          <div className="relative mt-14 aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-tta-black/5">
            <Image
              src="/tta-desc-2.webp"
              alt="Build AI-powered content, landing pages, and marketing assets inside TTA"
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {trainingCategories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-3xl border border-tta-black/5 bg-purple-50/40 p-7"
              >
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-wider text-tta-purple">
                  {cat.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-tta-white px-3.5 py-1.5 text-sm font-medium text-tta-black/80 shadow-sm ring-1 ring-tta-black/5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base text-tta-black/60">
            Plus the TTA Besties Group Chat, member feed, 1:1 call discounts,
            and transfer discounts.
          </p>
        </div>
      </section>

      {/* PEEK INSIDE THE LIBRARY */}
      <section className="bg-gradient-to-b from-tta-white to-purple-50/40 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-tta-pink">
              Sneak Peek Inside
            </p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              This Is What the Library Actually Looks Like.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-tta-black/70">
              Real training covers pulled straight from inside TTA right now.
              Every tile is a full class waiting for you.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {[
              { src: "/library/tile-1-ai-system.png", label: "AI Powered System For Any Biz" },
              { src: "/library/tile-ai-language.jpg", label: "AI Language Models For Beginners" },
              { src: "/library/tile-7-pod.png", label: "Print on Demand w/ AI" },
              { src: "/library/tile-ai-content-physical.jpg", label: "AI Content Class: Physical Products" },
              { src: "/library/tile-5-branding-gems.png", label: "Branding & Marketing Gems" },
              { src: "/library/tile-money-map.jpg", label: "The Money Map" },
              { src: "/library/tile-ai-twin.png", label: "How To Create An AI Twin / Avatar" },
              { src: "/library/tile-digital-biz.png", label: "How To Start A Digital Product Biz" },
            ].map((tile) => (
              <div
                key={tile.src}
                className="group overflow-hidden rounded-2xl bg-tta-white shadow-lg ring-1 ring-tta-black/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-tta-black/5">
                  <Image
                    src={tile.src}
                    alt={tile.label}
                    fill
                    sizes="(min-width: 768px) 280px, 50vw"
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="font-heading text-xs font-bold leading-tight text-tta-black/80">
                    {tile.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base text-tta-black/60">
            + 30 more trainings you can start the moment you&apos;re in.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="bg-purple-50/50 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              This Is For You If…
            </h2>
          </div>
          <ul className="mt-12 space-y-5">
            {whoFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-2xl bg-tta-white p-5 shadow-sm"
              >
                <CheckIcon />
                <span className="text-lg leading-relaxed text-tta-black/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BRAND BREAK — Stop Trading Time For Money */}
      <section className="relative overflow-hidden bg-tta-purple">
        <div className="relative aspect-[16/7] w-full min-h-[260px]">
          <Image
            src="/tta-desc-1.webp"
            alt="Stop trading time for money — build systems that scale"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="bg-tta-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-[300px_1fr]">
            <div className="mx-auto md:mx-0">
              <div className="relative h-[300px] w-[300px] rounded-full bg-gradient-to-br from-tta-purple to-tta-pink p-2 shadow-xl">
                <Image
                  src="/coach-tee.png"
                  alt="Coach Tee, founder of The Tee Academy"
                  width={300}
                  height={300}
                  priority
                  className="h-full w-full rounded-full object-cover ring-4 ring-white"
                />
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                I left the classroom in 2021. Then AI changed everything.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-tta-black/75">
                <p>
                  Before I ever stepped into a classroom, I spent{" "}
                  <span className="font-bold text-tta-black">16 years</span> at
                  Payless Shoes — left as an Assistant District Manager with a
                  brain wired for branding and marketing. That foundation
                  became the quiet superpower behind everything that followed.
                </p>
                <p>
                  I spent seven years in education — taught 5th grade for my
                  last four — trained clients on the side as a personal
                  trainer, competed as an athlete, and launched my own
                  t-shirt brand on Black Friday 2019. TTA was born in{" "}
                  <span className="font-bold text-tta-black">December 2020</span>,
                  after I watched a wave of new entrepreneurs hit the same
                  wall — nobody was teaching real marketing.
                </p>
                <p>
                  I walked away from education in 2021. Then in 2022 I picked
                  up AI, and everything shifted. What used to take me a full
                  week started taking an afternoon. I scaled one of my
                  businesses to{" "}
                  <span className="font-bold text-tta-black">seven figures</span>{" "}
                  and another to{" "}
                  <span className="font-bold text-tta-black">six figures</span>
                  {" "}— and every piece of that growth has AI fingerprints
                  on it.
                </p>
                <p>
                  TTA is the room I wish I&apos;d had on day one. Built for
                  creatives who don&apos;t consider themselves &quot;tech
                  people&quot; — you don&apos;t need to be. You need the room,
                  the repetitions, and someone in your corner who&apos;s
                  already walked the path. I love it here. And honestly,
                  we&apos;re just getting started.
                </p>
              </div>
              <p className="mt-8 font-heading text-xl font-bold text-tta-purple">
                — Coach Tee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CLARITY */}
      <section className="bg-purple-50/50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              The Simple Math
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border-2 border-tta-pink bg-tta-white p-10 text-center shadow-lg">
              <p className="font-heading text-sm font-bold uppercase tracking-wider text-tta-pink">
                Today
              </p>
              <p className="mt-4 font-heading text-6xl font-extrabold text-tta-black">
                $7
              </p>
              <p className="mt-4 text-lg text-tta-black/75">
                7 days of full access · every live class this week · the entire
                member hub.
              </p>
            </div>
            <div className="rounded-3xl border-2 border-tta-purple/20 bg-tta-white p-10 text-center shadow-lg">
              <p className="font-heading text-sm font-bold uppercase tracking-wider text-tta-purple">
                After
              </p>
              <p className="mt-4 font-heading text-6xl font-extrabold text-tta-black">
                $44<span className="text-2xl text-tta-black/50">/mo</span>
              </p>
              <p className="mt-4 text-lg text-tta-black/75">
                Locked-in rate. Normally $97. Cancel anytime, no contracts.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-tta-black/75">
            If you stay, you stay because it&apos;s working. If it&apos;s not
            for you, one click in PayPal and you&apos;re out.
          </p>

          {/* Annual deal — secondary CTA for high-intent buyers */}
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-gradient-to-br from-tta-purple to-purple-800 p-1 shadow-xl">
            <div className="rounded-[1.4rem] bg-tta-white px-8 py-10 sm:px-12">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="text-center md:text-left">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-tta-pink">
                    Already know you want it?
                  </p>
                  <h3 className="mt-3 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                    Lock in a full year for{" "}
                    <span className="text-tta-purple">$397</span>
                  </h3>
                  <p className="mt-3 text-base text-tta-black/70">
                    That&apos;s <span className="font-bold text-tta-black">$131 less</span> than paying monthly ($44 × 12 = $528).
                    Same full access, no trial, no monthly charge to remember.
                  </p>
                </div>
                <AnnualCta />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tta-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Questions, Answered
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-tta-black/10 bg-tta-white p-6 transition open:border-tta-purple/40 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-bold text-tta-black marker:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tta-purple/10 text-xl font-bold text-tta-purple transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-tta-black/75">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-tta-purple px-6 py-24 text-center text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tta-purple via-tta-purple to-purple-800"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-tta-pink/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            The Room Is Open.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-white/85">
            Your first class could be this Monday. Try it for $7.
          </p>
          <div className="mt-10 flex justify-center">
            <CtaButton dark>Start My 7-Day Pass — $7</CtaButton>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Then $44/month. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-tta-black px-6 py-12 text-center text-sm text-white/60">
        <p>© 2026 The Tee Academy</p>
        <div className="mt-3 flex justify-center gap-6">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <span aria-hidden>·</span>
          <a
            href="mailto:support@theteeacademy.co"
            className="hover:text-white"
          >
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
