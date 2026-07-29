import type { Metadata } from "next";
import Link from "next/link";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { NumberedRow, PageHero, PullQuote, SectionHead } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Third-party electricity vending for estates, employers, fintechs and distribution companies. Integrate SuezElectric's aggregation, or resell it under your own brand.",
};

const TRACKS = [
  {
    tag: "Estates & facility managers",
    title: "Vend to your residents without becoming a utility",
    body: "Issue tokens to every unit from one dashboard, with per-meter consumption reporting for service-charge reconciliation. Sits alongside existing estate billing.",
  },
  {
    tag: "Employers & institutions",
    title: "Electricity as a benefit that actually lands",
    body: "Allocate a monthly electricity allowance straight to staff meters. No cash handling, no expense claims, a full audit trail per beneficiary.",
  },
  {
    tag: "Fintechs & platforms",
    title: "Our aggregation behind your interface",
    body: "One integration for eleven distribution companies and multiple meter technologies, with token generation, retries and reconciliation handled on our side.",
  },
  {
    tag: "Distribution companies",
    title: "A vending channel that reaches the last street",
    body: "Extend collection into low-coverage areas through our agent kiosk network, with settlement and reporting in the formats your revenue team already uses.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        lines={["More than a", "shopping platform", "for units."]}
        lede="Businesses are managing rising costs, faster technology cycles and a widening energy distribution portfolio. We offer integrated, multi-service vending infrastructure rather than a checkout page."
        aside={
          <dl className="space-y-4 border-l border-ink-line pl-6">
            {[
              ["Integration", "REST API · webhooks"],
              ["Coverage", "11 distribution companies"],
              ["Settlement", "Daily, to your account"],
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

      {/* Four partnership tracks — column rules, no card boxes */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: -6, y: 34 }} rings={22} tone="bone" opacity={0.5} />
        <Reveal className="measure relative">
          <SectionHead
            eyebrow="Four ways in"
            title="Whoever you are in the chain, there is a shape for it."
          />
          <Reveal className="reveal mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {TRACKS.map((t, i) => (
              <div
                key={t.tag}
                className="border-t pt-7"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-voltage-ink">
                  {t.tag}
                </div>
                <h3 className="mt-4 text-display-s">{t.title}</h3>
                <p className="mt-3 max-w-md text-fg-bone-muted">{t.body}</p>
              </div>
            ))}
          </Reveal>
        </Reveal>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden border-y border-ink-line py-20 lg:py-28">
        <Guilloche className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] opacity-25" />
        <Reveal className="measure relative">
          <div className="reveal">
            <div style={{ "--i": 0 } as React.CSSProperties}>
              <PullQuote attribution="Why partner with SuezElectric">
                We have the resources and the expertise to offer third-party
                vending. What we actually offer is the route — eight years of
                deliveries into the same estates and streets you are trying to
                reach.
              </PullQuote>
            </div>
          </div>

          <Reveal className="reveal mt-16">
            <NumberedRow index={1} title="Technical partnership" meta="Oribera · Reimnet">
              <p>
                Continuous improvement and upgrade of the platform through
                dedicated technical and technology partners, rather than a
                frozen build.
              </p>
            </NumberedRow>
            <NumberedRow index={2} title="Existing clientele" meta="LPG distribution since 2012">
              <p>
                A live customer base in domestic and commercial energy, and
                extensive working knowledge of Abuja and its environs.
              </p>
            </NumberedRow>
            <NumberedRow index={3} title="Physical network" meta="Agent mobile kiosks">
              <p>
                Coverage into rural areas and the outskirts of the metropolis
                through partner agents, not just an internet connection.
              </p>
            </NumberedRow>
            <NumberedRow index={4} title="Group capacity" meta="Suez Gas · Suez Trading International">
              <p>
                LPG importation, bulk haulage and domestic distribution already
                running, with the logistics and settlement discipline that
                implies.
              </p>
            </NumberedRow>
          </Reveal>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="on-bone relative overflow-hidden py-20 lg:py-24">
        <Contours origin={{ x: 98, y: 55 }} rings={20} tone="bone" opacity={0.45} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-xl text-display-m">
              Tell us what you need to vend, and to whom.
            </h2>
            <p className="mt-5 max-w-md text-fg-bone-muted">
              Commercial and technical conversations start with the same email.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-ghost">
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
