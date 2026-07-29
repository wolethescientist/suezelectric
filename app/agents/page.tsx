import type { Metadata } from "next";
import Link from "next/link";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { NumberedRow, PageHero, SectionHead, StatRow } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Become an agent",
  description:
    "Earn up to 3% commission on every electricity sale as a SuezElectric agent. Sell from a kiosk, a shop or a phone, with your own wallet and dashboard.",
};

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agent network"
        lines={["Get paid to sell", "the thing everyone", "already needs."]}
        lede="Up to 3% commission on every sale, settled to your own wallet. No float requirement beyond what you choose to hold, and no monthly fee."
        aside={
          <div className="border-l border-ink-line pl-6">
            <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
              Commission
            </div>
            <div className="mt-2 font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-voltage">
              3%
            </div>
            <p className="mt-3 max-w-[16rem] text-sm text-fg-ink-muted">
              On all sales. Tiered by monthly volume, paid on settlement — not at
              month end.
            </p>
          </div>
        }
      />

      {/* Earnings table — hairline rows, no boxes */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 40 }} rings={22} tone="bone" opacity={0.5} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="What it pays"
            title="Commission scales with what you move."
            note="Illustrative. Rates confirmed on approval of your application."
          />

          <Reveal className="reveal mt-14 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b">
                  {["Monthly volume", "Rate", "On ₦1,000,000", "Settlement"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-4 pr-6 font-label text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-bone-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-sm tabular-nums">
                {[
                  ["Up to ₦500,000", "1.5%", "₦15,000", "Instant to wallet"],
                  ["₦500,001 – ₦2,000,000", "2.0%", "₦20,000", "Instant to wallet"],
                  ["₦2,000,001 – ₦10,000,000", "2.5%", "₦25,000", "Instant to wallet"],
                  ["Above ₦10,000,000", "3.0%", "₦30,000", "Instant + account manager"],
                ].map((row, i) => (
                  <tr
                    key={row[0]}
                    className="border-b"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-5 pr-6 ${j === 1 ? "text-voltage-ink" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Reveal>
      </section>

      {/* How to start */}
      <section className="relative overflow-hidden border-y border-ink-line py-20 lg:py-28">
        <Guilloche className="pointer-events-none absolute -right-36 bottom-0 h-[32rem] w-[32rem] opacity-25" />
        <Reveal className="measure relative">
          <SectionHead eyebrow="Getting started" title="Four steps, one working day." />
          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Apply" meta="Name, phone, email, referral code if you have one">
              <p>
                Register as an agent from the platform. You will be asked for
                basic identification and the location you intend to sell from.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="Get verified" meta="Usually same day">
              <p>
                We confirm your identity and your selling location. Kiosk agents
                are mapped so we do not saturate a single street.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Fund your wallet" meta="Card, transfer, USSD">
              <p>
                Hold as much or as little float as your trade needs. Top up in
                seconds; unused balance is always withdrawable.
              </p>
            </NumberedRow>
            <NumberedRow index={4} title="Start vending" meta="Commission credited on each sale">
              <p>
                Sell from the app or the web dashboard. Every token you issue is
                logged against your agent code with the commission earned.
              </p>
            </NumberedRow>
          </Reveal>

          <Reveal className="reveal mt-16">
            <StatRow
              items={[
                { label: "Approval time", value: "1 day" },
                { label: "Monthly fee", value: "₦0" },
                { label: "Minimum float", value: "None" },
                { label: "Commission ceiling", value: "3%" },
              ]}
            />
          </Reveal>
        </Reveal>
      </section>

      <section className="on-bone relative overflow-hidden py-20 lg:py-24">
        <Contours origin={{ x: 96, y: 50 }} rings={20} tone="bone" opacity={0.45} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-display-m">
            Bring your counter. We will bring the units.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn btn-voltage">
              Register as an agent
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Ask a question
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
