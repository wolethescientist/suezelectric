import Link from "next/link";
import { Contours } from "./texture";
import { Reveal } from "./reveal";
import { SectionHead } from "./page-parts";

const SOCIAL_CHANNELS = [
  {
    label: "Instagram",
    handle: "@suezelectric_",
    description: "Product notes, power tips and the people behind the meter.",
    href: "https://www.instagram.com/suezelectric_/",
    short: "IG",
  },
  {
    label: "Facebook",
    handle: "SuezElectric",
    description: "Service updates, agent stories and answers to common questions.",
    href: "https://www.facebook.com/suezelectric",
    short: "FB",
  },
  {
    label: "X",
    handle: "@suezelectric",
    description: "Fast updates when a token, tariff or network status changes.",
    href: "https://x.com/suezelectric",
    short: "X",
  },
  {
    label: "LinkedIn",
    handle: "SuezElectric Limited",
    description: "The work behind a more dependable energy experience in Nigeria.",
    href: "https://www.linkedin.com/in/suezelectric-limited/",
    short: "LI",
  },
];

export function SocialMediaSection() {
  return (
    <section id="social-media" className="on-bone relative overflow-hidden py-20 lg:py-28">
      <Contours origin={{ x: 91, y: 32 }} rings={24} tone="bone" opacity={0.45} />
      <Reveal className="measure relative">
        <SectionHead
          eyebrow="Social media"
          title="Stay close to the current."
          note="Follow along for service news, practical power advice and Suez stories"
        />

        <div className="mt-14 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_CHANNELS.map((channel, index) => (
            <Reveal key={channel.label} className="reveal" delay={index * 40}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-channel group block border-t border-bone-line py-7 transition-colors duration-300 hover:border-voltage-ink"
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-bone-line font-label text-[0.6875rem] font-semibold tracking-[0.12em] transition-colors duration-300 group-hover:border-voltage-ink group-hover:bg-voltage-ink group-hover:text-bone">
                    {channel.short}
                  </span>
                  <span aria-hidden="true" className="text-xl text-fg-bone-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
                <h3 className="mt-8 text-display-s">{channel.label}</h3>
                <p className="mt-2 font-label text-sm text-fg-bone-muted">{channel.handle}</p>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-fg-bone-muted">
                  {channel.description}
                </p>
                <span className="link-slide mt-7 inline-block font-label text-[0.6875rem] uppercase tracking-[0.09em] text-voltage-ink">
                  Follow channel
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-bone-line pt-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <p className="max-w-xl text-fg-bone-muted">
            Need an answer about your meter or token? Social is good for updates. Our support team is better for account-specific help.
          </p>
          <Link href="/contact" className="btn btn-ghost mt-6 shrink-0 sm:mt-0">
            Contact support
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
