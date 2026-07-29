import Link from "next/link";
import { Contours, Guilloche } from "./texture";
import { Logo } from "./logo";
import { StoreButtons } from "./app-download";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/partners", label: "Partners" },
      { href: "/investors", label: "Investors" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/signup", label: "Buy units" },
      { href: "/agents", label: "Become an agent" },
      { href: "/faq", label: "FAQ" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of service" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/refunds", label: "Refunds" },
    ],
  },
];

const SOCIALS = [
  { href: "https://www.facebook.com/suezelectric", label: "Facebook", short: "FB" },
  { href: "https://www.instagram.com/suezelectric_/", label: "Instagram", short: "IG" },
  { href: "https://x.com/suezelectric", label: "X", short: "X" },
  {
    href: "https://www.linkedin.com/in/suezelectric-limited/",
    label: "LinkedIn",
    short: "LI",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-ink">
      <Contours origin={{ x: 84, y: 88 }} rings={26} opacity={0.55} />

      {/* Instrument strip: live-reading numbers, hairline-divided like a meter panel */}
      <div className="relative border-b border-ink-line">
        <div className="measure grid grid-cols-2 divide-ink-line md:grid-cols-4 md:divide-x">
          {[
            ["Coverage", "11 DISCOs"],
            ["Median delivery", "14 seconds"],
            ["Agent commission", "Up to 3%"],
            ["Operating since", "2020"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`py-7 md:px-7 ${i % 2 === 0 ? "pr-4" : "pl-4 md:pl-7"} ${
                i < 2 ? "border-b border-ink-line md:border-b-0" : ""
              } ${i === 0 ? "md:pl-0" : ""}`}
            >
              <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                {label}
              </div>
              <div className="mt-2 font-display text-2xl sm:text-[1.75rem]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div className="measure relative grid gap-14 py-16 lg:grid-cols-[1.15fr_1.6fr] lg:gap-20 lg:py-20">
        <div>
          <div className="eyebrow">Suez Energy Group</div>
          <p className="mt-6 max-w-sm font-display text-[1.625rem] leading-[1.15] sm:text-[2rem]">
            Cooking gas since 2012. Electricity since 2020. The same trucks, the
            same streets.
          </p>

          <address className="mt-9 space-y-3 not-italic">
            <FooterContact label="Call & WhatsApp" value="+234 908 007 0070" href="tel:+2349080070070" />
            <FooterContact label="Email" value="support@suezelectric.com" href="mailto:support@suezelectric.com" />
            <FooterContact
              label="Office"
              value="20 Alexandria Crescent, Wuse 2, Abuja FCT 904101"
            />
          </address>

          <div className="mt-9 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ink-line font-label text-[0.6875rem] tracking-widest text-fg-ink-muted transition-colors duration-200 hover:border-voltage hover:text-voltage"
              >
                {s.short}
              </a>
            ))}
          </div>

          <div className="mt-10 border-t border-ink-line pt-8">
            <h3 className="font-label text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
              Get the app
            </h3>
            <StoreButtons className="mt-5" />
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-label text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-slide text-[0.9375rem] text-fg-ink transition-colors duration-200 hover:text-voltage"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-3">
            <h3 className="font-label text-[0.6875rem] font-normal uppercase tracking-[0.09em] text-fg-ink-muted">
              Group & affiliates
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                ["Suez Gas Nigeria", "Domestic & commercial LPG"],
                ["Suez Trading International", "LPG import & bulk haulage"],
                ["Oribera Limited", "Technical partner"],
                ["Reimnet Limited", "Technology partner"],
              ].map(([name, role]) => (
                <li
                  key={name}
                  className="flex items-baseline justify-between gap-4 border-b border-ink-line pb-3"
                >
                  <span className="text-[0.9375rem]">{name}</span>
                  <span className="shrink-0 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The oversized brand lockup with the guilloche plate behind it. This is the
          footer's memorable anchor — a banknote-plate signature, not a logo strip. */}
      <div className="relative border-t border-ink-line">
        <Guilloche
          className="pointer-events-none absolute -top-20 right-[-6rem] h-[26rem] w-[26rem] opacity-45 sm:right-8"
          strokeOpacity={0.3}
        />
        <div className="measure relative py-14 lg:py-16">
          <Logo tone="ink" className="h-auto w-full max-w-4xl" />
        </div>
      </div>

      <div className="measure relative flex flex-col gap-4 py-8 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} SuezElectric Limited · RC 1638998</span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>Abuja · 9.0765° N, 7.3986° E</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-voltage" />
            Platform operational
          </span>
        </span>
      </div>
    </footer>
  );
}

function FooterContact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="w-32 shrink-0 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="link-slide text-[0.9375rem] transition-colors duration-200 hover:text-voltage"
        >
          {value}
        </a>
      ) : (
        <span className="text-[0.9375rem] leading-relaxed">{value}</span>
      )}
    </div>
  );
}
