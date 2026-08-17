import type { Metadata } from "next";
import Link from "next/link";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero, PullQuote, SectionHead, StatRow } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "SuezElectric Limited (RC 1638998) — corporate profile, group structure and investor contact for the Abuja-based electricity vending platform.",
};

const THESIS = [
  [
    "A collections problem, not a demand problem",
    "Nigerian distribution companies do not struggle to find customers. They struggle to collect. Prepaid vending converts an accounts-receivable problem into a point-of-sale one, and the vending layer earns on every conversion.",
  ],
  [
    "Aggregation is the moat",
    "Integrating one distribution company is a project. Integrating eleven, across different meter technologies, and keeping them reconciled, is an operating capability. That capability is the product.",
  ],
  [
    "Distribution we already own",
    "Group LPG operations have delivered into Abuja estates, hotels and bakeries since 2012. Electricity is a second product sold down an existing route, with existing trust and existing logistics.",
  ],
  [
    "Agents extend the edge",
    "Mobile kiosk agents reach the outskirts where fixed vending thins out, at a variable cost of up to 3% instead of the fixed cost of branches.",
  ],
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investor relations"
        lines={["The case, and", "the corporate", "record."]}
        lede="SuezElectric Limited is a private company registered in Nigeria, operating an electricity vending platform from Abuja as part of a group with LPG operations dating to 2012."
        aside={
          <dl className="space-y-4 border-l border-ink-line pl-6">
            {[
              ["Registration", "RC 1638998"],
              ["Legal form", "Private company limited by shares"],
              ["Jurisdiction", "Federal Republic of Nigeria"],
              ["Registered office", "20 Alexandria Crescent, Wuse 2, Abuja FCT"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                  {k}
                </dt>
                <dd className="mt-1.5 text-[0.9375rem]">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Investment thesis */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -8, y: 30 }} rings={22} tone="bone" opacity={0.5} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="The thesis"
            title="Four reasons this business compounds."
            note="Forward-looking statements. Not an offer of securities."
          />
          <Reveal className="reveal mt-14">
            {THESIS.map(([title, body], i) => (
              <div
                key={title}
                className="grid gap-4 border-t py-9 sm:grid-cols-[4rem_1fr] sm:gap-10 lg:grid-cols-[4rem_1fr_1.3fr]"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-display-s">{title}</h3>
                <p className="max-w-xl text-fg-bone-muted">{body}</p>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </section>

      {/* Corporate profile */}
      <section className="relative overflow-hidden border-y border-ink-line py-20 lg:py-28">
        <Guilloche className="pointer-events-none absolute -left-44 top-1/3 h-[32rem] w-[32rem] opacity-25" />
        <Reveal className="measure relative">
          <SectionHead eyebrow="Corporate profile" title="Structure and operating base." />

          <Reveal className="reveal mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <h3 className="font-label text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
                Operating entities
              </h3>
              <ul className="mt-6">
                {[
                  ["SuezElectric Limited", "Electricity vending & e-payments"],
                  ["Suez Group", "Parent group"],
                  ["Suez Gas", "Domestic & commercial LPG distribution"],
                ].map(([name, role]) => (
                  <li
                    key={name}
                    className="flex flex-col gap-1 border-t border-ink-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-[1.0625rem]">{name}</span>
                    <span className="font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ "--i": 1 } as React.CSSProperties}>
              <h3 className="font-label text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
                Group & affiliates
              </h3>
              <ul className="mt-6">
                {[
                  ["Suez Group", "Group company"],
                  ["Suez Gas", "Affiliate"],
                ].map(([name, role]) => (
                  <li
                    key={name}
                    className="flex flex-col gap-1 border-t border-ink-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-[1.0625rem]">{name}</span>
                    <span className="font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="reveal mt-16">
            <StatRow
              items={[
                { label: "Platform live since", value: "2020" },
                { label: "Distribution companies", value: "11" },
                { label: "Payment providers", value: "3" },
                { label: "Agent commission", value: "≤ 3%" },
              ]}
            />
          </Reveal>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 100, y: 60 }} rings={20} tone="bone" opacity={0.45} />
        <Reveal className="measure relative">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <PullQuote attribution="Investor enquiries">
                Serious enquiries receive the corporate profile, audited
                positions where available, and a conversation with the managing
                director.
              </PullQuote>
            </div>
            <div
              className="mt-12 flex flex-wrap gap-3"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <a href="mailto:support@suezelectric.com" className="btn btn-ghost">
                support@suezelectric.com
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Contact form
              </Link>
            </div>
            <p
              className="mt-10 max-w-2xl font-label text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] text-fg-bone-muted"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              This page is information about SuezElectric Limited. It is not an
              offer to sell or a solicitation of an offer to buy securities, and
              it is not investment advice.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
