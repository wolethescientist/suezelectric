import type { Metadata } from "next";
import Link from "next/link";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import {
  NumberedRow,
  PageHero,
  PullQuote,
  SectionHead,
  StatRow,
} from "@/components/page-parts";

export const metadata: Metadata = {
  title: "About us",
  description:
    "SuezElectric Limited (RC 1638998) is an Abuja utility company vending prepaid electricity across Nigerian distribution companies, and part of a group that has delivered LPG since 2012.",
};

const GROUP = [
  ["Suez Group", "The parent group supporting the company’s energy operations.", "Group company"],
  ["Suez Gas", "Domestic and commercial LPG operations across Abuja and surrounding areas.", "Gas operations"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="RC 1638998 · Wuse 2, Abuja"
        lines={["A utility company,", "not an app company."]}
        lede="SuezElectric Limited was incorporated to purchase and distribute power through electronic channels to domestic and industrial users. The software is how we do it — the business is energy."
        aside={
          <dl className="space-y-4 border-l border-ink-line pl-6">
            {[
              ["Incorporated in", "Nigeria"],
              ["Registered office", "20 Alexandria Crescent, Wuse 2, Abuja FCT"],
              ["Sector", "Electricity vending & e-payments"],
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

      {/* Mission */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -6, y: 30 }} rings={22} tone="bone" opacity={0.5} />
        <Reveal className="measure relative">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <PullQuote>
                We want customers to benefit from the shift to smart, efficient
                energy — reliable supply, real-time information, and a way to
                pay for it that does not cost anybody an afternoon.
              </PullQuote>
            </div>
            <p
              className="mt-9 max-w-2xl text-body-l text-fg-bone-muted"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              That means aggregating vending across multiple distribution
              companies and meter technologies, then reporting on it properly:
              meter serials, token strings, timestamps, tariff bands and usage
              trends. Detail is what turns a payment into a record.
            </p>
          </div>
        </Reveal>
      </section>

      {/* What we do */}
      <section className="relative overflow-hidden border-y border-ink-line py-20 lg:py-28">
        <Guilloche className="pointer-events-none absolute -left-40 top-16 h-[30rem] w-[30rem] opacity-25" />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="What we operate"
            title="Three surfaces, one ledger."
            note="Web · iOS · Android · agent kiosks"
          />
          <Reveal className="reveal mt-14">
            <NumberedRow index={1} title="Consumer vending" meta="Prepaid, postpaid, net metering">
              <p>
                On-demand token generation with a naira-to-unit calculator,
                saved payment methods, a prefunded wallet, retrievable history
                and printable receipts.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="Agent distribution" meta="Up to 3% commission">
              <p>
                Partner agents in mobile kiosks extend coverage to rural areas
                and the outskirts of the Abuja metropolis, where the fixed
                vending network runs out.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Third-party vending" meta="For estates, employers and platforms">
              <p>
                The same aggregation, offered as integrated multi-service
                infrastructure to organisations that want to vend power to their
                own residents, staff or users.
              </p>
            </NumberedRow>
          </Reveal>
        </Reveal>
      </section>

      {/* The group */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 104, y: 70 }} rings={20} tone="bone" opacity={0.45} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="The group"
            title="Capacity we did not have to build from nothing."
            note="Group and affiliates"
          />
          <Reveal className="reveal mt-14">
            {GROUP.map(([name, body, tag], i) => (
              <div
                key={name}
                className="grid gap-3 border-t py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-12"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div>
                  <h3 className="text-display-s">{name}</h3>
                  <div className="mt-2 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-voltage-ink">
                    {tag}
                  </div>
                </div>
                <p className="max-w-xl text-fg-bone-muted">{body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="reveal mt-16">
            <StatRow
              items={[
                { label: "Group LPG operations since", value: "2012" },
                { label: "Electricity platform since", value: "2020" },
                { label: "Registered office", value: "Wuse 2" },
                { label: "Payment providers", value: "3" },
              ]}
            />
          </Reveal>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <Contours origin={{ x: 30, y: 45 }} rings={24} opacity={0.6} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-display-m">
            Buy your first token, or bring us your estate.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn btn-voltage">
              Buy electricity
            </Link>
            <Link href="/partners" className="btn btn-ghost">
              Partner with us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
