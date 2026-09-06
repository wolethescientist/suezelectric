import Link from "next/link";
import { Contours } from "./texture";
import { Reveal, WipeLines } from "./reveal";
import { TOKEN_DELIVERY_LONG } from "@/lib/site";

/**
 * The three-step plate.
 *
 * The detailed four-row breakdown further down the page is the reference version;
 * this is the scannable one, sitting directly under the hero so a first-time visitor
 * knows the shape of the transaction before they read a single paragraph.
 *
 * Glyphs are drawn in the same hairline language as the contour artwork — one stroke
 * weight, no fills — so they read as engraving rather than as an icon set.
 */

const STEPS = [
  {
    title: "Enter your phone number",
    meta: "No account needed to start",
    body: "Type the number your token should land on and tap buy. Returning customers get their saved meters pulled up straight away.",
    glyph: PhoneGlyph,
  },
  {
    title: "Confirm the meter, then pay",
    meta: "Card · transfer · USSD · wallet",
    body: "We resolve the meter against your distribution company and show the registered name and the unit count before a naira leaves your account.",
    glyph: NairaGlyph,
  },
  {
    title: `Token arrives in ${TOKEN_DELIVERY_LONG}`,
    meta: "SMS · WhatsApp · in-app · email",
    body: "Twenty digits delivered four ways at once, with a receipt filed in your purchase history for the day your landlord asks.",
    glyph: BoltGlyph,
  },
];

export function BuySteps() {
  return (
    <section
      id="how-to-buy"
      className="relative overflow-hidden border-b border-ink-line bg-ink-2/40 section-y"
    >
      <Contours origin={{ x: 14, y: 30 }} rings={20} opacity={0.5} />

      <Reveal className="measure relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="reveal">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Three steps
            </div>
            <h2
              className="mt-5 max-w-2xl text-display-m sm:mt-6"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <WipeLines lines={["Buying power takes", "three steps."]} />
            </h2>
          </div>
          <p
            className="max-w-md text-fg-ink-muted lg:max-w-xs lg:text-right"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Prepaid, postpaid or net-metered — the sequence is the same on every one
            of the eleven distribution companies.
          </p>
        </div>

        {/* The measurement rule the three steps hang from. */}
        <div className="mt-10 sm:mt-14">
          <div className="rule-ticks" />
        </div>

        <Reveal className="reveal grid gap-x-10 gap-y-0 sm:gap-y-2 lg:grid-cols-3 lg:gap-x-14">
          {STEPS.map(({ title, meta, body, glyph: Glyph }, i) => (
            <article
              key={title}
              className="relative flex gap-5 border-b border-ink-line py-8 last:border-b-0 sm:gap-7 lg:block lg:border-b-0 lg:border-l lg:pb-2 lg:pl-8 lg:pt-10 lg:first:border-l-0 lg:first:pl-0"
              style={{ "--i": i } as React.CSSProperties}
            >
              {/* Numeral column — a rail on mobile, a header on desktop */}
              <div className="flex w-12 shrink-0 flex-col items-center gap-3 sm:w-14 lg:w-auto lg:flex-row lg:items-center lg:justify-between">
                <span className="font-display text-[2.25rem] leading-none tabular-nums text-voltage sm:text-[2.75rem] lg:text-[3.25rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Glyph className="h-8 w-8 text-fg-ink-muted sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-display-s lg:mt-7">{title}</h3>
                <p className="mt-3 text-fg-ink-muted">{body}</p>
                <p className="mt-4 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted opacity-70">
                  {meta}
                </p>
              </div>
            </article>
          ))}
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink-line pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-14">
          <Link href="/signup" className="btn btn-voltage w-full sm:w-auto">
            Buy power now
          </Link>
          <Link href="/agents" className="btn btn-ghost w-full sm:w-auto">
            Sign up as an agent
          </Link>
          <a
            href="#energy-calculator"
            className="link-slide self-center font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted transition-colors duration-200 hover:text-fg-ink"
          >
            Not sure how much to buy? Use the energy calculator &rarr;
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Hairline glyphs. One stroke weight, no fills. ---------- */

type GlyphProps = { className?: string };

function PhoneGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9.5" y="3.5" width="13" height="25" rx="3" />
      <path d="M13.5 6.5h5" />
      <path d="M14 25.5h4" />
      <path d="M12.5 11.5h7M12.5 15h7M12.5 18.5h4" />
    </svg>
  );
}

function NairaGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="7.5" width="27" height="17" rx="3" />
      <path d="M2.5 12.5h27" />
      <path d="M12 16v6.5M12 16l8 6.5M20 16v6.5" />
      <path d="M10.5 18.6h11" />
    </svg>
  );
}

function BoltGlyph({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="12.5" />
      <circle cx="16" cy="16" r="8.5" opacity="0.45" />
      <path d="M17.6 9.5 12.5 17h4l-1.1 5.5 5.1-7.5h-4z" />
    </svg>
  );
}
