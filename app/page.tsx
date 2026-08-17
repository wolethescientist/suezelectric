import Link from "next/link";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal, WipeLines } from "@/components/reveal";
import { TokenReadout } from "@/components/token-readout";
import { NumberedRow, PullQuote, SectionHead, StatRow } from "@/components/page-parts";
import { AppDownloadSection } from "@/components/app-download";
import { MarketTicker } from "@/components/market-ticker";
import { SocialMediaSection } from "@/components/social-media";
import { ChatbotWidget } from "@/components/chatbot-widget";

const DISCOS = [
  "Abuja — AEDC",
  "Ikeja — IKEDC",
  "Eko — EKEDC",
  "Ibadan — IBEDC",
  "Enugu — EEDC",
  "Kaduna — KAEDCO",
  "Kano — KEDCO",
  "Jos — JEDPLC",
  "Benin — BEDC",
  "Port Harcourt — PHED",
  "Yola — YEDC",
];

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-ink-line pb-14 pt-32 sm:pt-40 lg:pb-20 lg:pt-48">
        <Contours origin={{ x: 74, y: 34 }} rings={32} />
        <div className="sweep" />

        <Reveal className="measure relative" immediate>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.85fr] lg:items-center lg:gap-16">
            <div className="reveal">
              <h1 className="text-display-xl">
                <WipeLines lines={["Power,", "on demand."]} />
              </h1>

              <p
                className="mt-9 max-w-lg text-body-l text-fg-ink-muted"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                Enter a meter number, pay, and your token arrives before the
                kettle boils. Eleven distribution companies, one wallet, no
                queues.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-3"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                <Link href="/signup" className="btn btn-voltage">
                  Buy electricity
                </Link>
                <Link href="/agents" className="btn btn-ghost">
                  Become an agent
                </Link>
              </div>
            </div>

            <div className="reveal">
              <div style={{ "--i": 6 } as React.CSSProperties}>
                <TokenReadout />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Coverage ticker: a measurement scale, not a logo wall */}
        <div className="measure relative mt-16 lg:mt-20">
          <div className="rule-ticks" />
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2 pt-6 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
            <span className="text-voltage">Coverage</span>
            {DISCOS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Market tape (sticky) ───────────────────────── */}
      <MarketTicker />

      {/* ───────────────────────── How it works (bone) ───────────────────────── */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 62 }} rings={22} tone="bone" opacity={0.5} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Three seconds, four taps"
            title="The whole transaction, start to token."
            note="Works on prepaid, postpaid and net-metered accounts"
          />

          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Enter the meter" meta="Name verified against the DISCO before you pay">
              <p>
                Type the meter number. We resolve it against the distribution
                company and show you the registered name, so a mistyped digit
                never becomes someone else&rsquo;s credit.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="Choose the amount" meta="Naira-to-unit calculator built in">
              <p>
                See exactly how many kilowatt-hours your naira buys at your
                current tariff band before you commit — not after.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Pay how you like" meta="Paystack · Flutterwave · Providus VPS · wallet">
              <p>
                Card, transfer, USSD, or a prefunded SuezElectric wallet that
                skips card entry entirely on every purchase after the first.
              </p>
            </NumberedRow>
            <NumberedRow index={4} title="Token, immediately" meta="Delivered in-app, by SMS and by email">
              <p>
                Twenty digits, three places at once, plus a receipt filed in
                your history for the day your landlord asks.
              </p>
            </NumberedRow>
          </Reveal>
        </Reveal>
      </section>

      {/* ───────────────────────── Why (ink) ───────────────────────── */}
      <section className="relative overflow-hidden border-y border-ink-line py-20 lg:py-28">
        <Guilloche className="pointer-events-none absolute -right-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-30" />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Built for the way Nigeria buys power"
            title="Every part of this exists because something else was slower."
          />

          <Reveal className="reveal mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "One wallet, every meter",
                "Fund once and buy for the flat, the shop and your mother's house without re-entering a card.",
              ],
              [
                "Tariff-aware pricing",
                "Band A through E resolve automatically, so the unit count you see is the unit count you get.",
              ],
              [
                "Records that hold up",
                "Meter serials, token strings, timestamps and printable receipts, kept as long as you keep the account.",
              ],
              [
                "Support that answers",
                "A named human on WhatsApp and phone, 24 hours, because a failed token at 11pm is not a ticket.",
              ],
              [
                "Agent kiosks",
                "Partner agents in mobile kiosks reach the outskirts of the metropolis where the network thins out.",
              ],
              [
                "Usage you can read",
                "Consumption trends per meter across months, so a bill spike has an explanation.",
              ],
            ].map(([title, body], i) => (
              <div
                key={title}
                className="border-t border-ink-line pt-6"
                style={{ "--i": i } as React.CSSProperties}
              >
                <h3 className="text-display-s">{title}</h3>
                <p className="mt-3 text-fg-ink-muted">{body}</p>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </section>

      {/* ───────────────────────── Heritage (bone) ───────────────────────── */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 106, y: 30 }} rings={20} tone="bone" opacity={0.45} />
        <Reveal className="measure relative">
          <div className="reveal">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Since 2012
            </div>
            <div className="mt-8" style={{ "--i": 1 } as React.CSSProperties}>
              <PullQuote attribution="Suez Group · Suez Gas">
                We spent eight years delivering cooking gas to the same estates,
                bars and bakeries we now sell electricity to. That is not a
                pivot. That is a second product on a route we already know.
              </PullQuote>
            </div>
            <div className="mt-14" style={{ "--i": 2 } as React.CSSProperties}>
              <StatRow
                items={[
                  { label: "LPG operations since", value: "2012" },
                  { label: "Vending platform since", value: "2020" },
                  { label: "Distribution companies", value: "11" },
                  { label: "Median token delivery", value: "14s" },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── Get the app (ink) ───────────────────────── */}
      <AppDownloadSection />

      {/* ───────────────────────── Power desk (bone) ───────────────────────── */}
      <section className="on-bone relative overflow-hidden border-y border-bone-line py-20 lg:py-28">
        <Contours origin={{ x: 106, y: 72 }} rings={18} tone="bone" opacity={0.4} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="The power desk"
            title="A clearer next step, whenever you need one."
            note="Guides and people for the moments around your purchase"
          />

          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Buying for the first time" meta="Meter check · tariff band · payment options">
              <p>Learn what to have ready before you buy and how SuezElectric confirms your meter details.</p>
            </NumberedRow>
            <NumberedRow index={2} title="Keeping every receipt" meta="History · SMS · email delivery">
              <p>Your token and receipt stay together in your purchase history, ready when you need to top up again.</p>
            </NumberedRow>
            <NumberedRow index={3} title="Speaking to a human" meta="WhatsApp and phone support, 24 hours">
              <p>When a token needs a closer look, our support team can trace the payment and help you resolve it.</p>
            </NumberedRow>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/faq" className="btn btn-ghost">Read the FAQ</Link>
            <Link href="/contact" className="btn btn-voltage">Contact the power desk</Link>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── Social media (bone) ───────────────────────── */}
      <SocialMediaSection />

      {/* ───────────────────────── Agent CTA (ink) ───────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 22, y: 50 }} rings={26} opacity={0.7} />
        <Reveal className="measure relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <div>
              <div className="eyebrow">Agent network</div>
              <h2 className="mt-7 max-w-2xl text-display-l">
                Sell power from a kiosk, a shop, or a phone.
              </h2>
              <p className="mt-7 max-w-lg text-body-l text-fg-ink-muted">
                Agents earn up to 3% on every sale, settle to their own wallet,
                and get a dashboard that shows each token they have issued.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/agents" className="btn btn-voltage">
                Register as an agent
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <ChatbotWidget />
    </>
  );
}
