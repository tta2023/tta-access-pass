import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="flex-1 bg-gradient-to-b from-purple-50 to-tta-white px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-tta-pink/10">
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 text-tta-pink"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>

        <h1 className="mt-8 font-heading text-5xl font-extrabold tracking-tight sm:text-6xl">
          You&apos;re in. 🎉
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-tta-black/75 sm:text-xl">
          Welcome to The Tee Academy. Your next step is to create your TTA
          login so you can get inside.
        </p>

        <a
          href="https://the-tee-academy.mn.co/plans/1977386?bundle_token=ae8eb2acc552ed121ffb9c888a5a23de&utm_source=manual"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-tta-pink px-10 py-5 font-heading text-lg font-extrabold uppercase tracking-wide text-white shadow-lg shadow-tta-pink/30 transition hover:-translate-y-0.5 hover:bg-tta-pink/90 hover:shadow-xl sm:text-xl"
        >
          Create My TTA Login
          <span aria-hidden className="transition group-hover:translate-x-1">
            →
          </span>
        </a>
        <p className="mt-3 text-sm text-tta-black/60">
          Use the same email you just paid with. Takes ~60 seconds.
        </p>

        <div className="mt-14 rounded-3xl border border-tta-purple/20 bg-tta-white p-8 text-left shadow-lg">
          <h2 className="font-heading text-2xl font-extrabold text-tta-purple">
            What happens next
          </h2>
          <ol className="mt-6 space-y-5 text-base leading-relaxed text-tta-black/80">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tta-pink font-heading text-sm font-bold text-white">
                1
              </span>
              <span>
                <strong className="text-tta-black">Click the button above</strong>{" "}
                to create your TTA login on the member app. Use the same email
                you paid with.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tta-pink font-heading text-sm font-bold text-white">
                2
              </span>
              <span>
                <strong className="text-tta-black">Join the group chat</strong>
                {" "}and introduce yourself — that&apos;s where everything
                happens day-to-day.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tta-pink font-heading text-sm font-bold text-white">
                3
              </span>
              <span>
                <strong className="text-tta-black">Show up Monday at 6 PM CST</strong>
                {" "}for your first live class. Replays posted within 24 hours
                if you miss it.
              </span>
            </li>
          </ol>
        </div>

        <p className="mt-10 text-sm text-tta-black/60">
          Questions? Email{" "}
          <a
            href="mailto:support@theteeacademy.com"
            className="text-tta-purple underline"
          >
            support@theteeacademy.com
          </a>
          .
        </p>

        <Link
          href="/"
          className="mt-8 inline-block font-heading text-sm font-bold uppercase tracking-wider text-tta-purple hover:text-tta-pink"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
