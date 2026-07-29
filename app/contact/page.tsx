import type { Metadata } from "next";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call or WhatsApp +234 908 007 0070, email support@suezelectric.com, or visit 20 Alexandria Crescent, Wuse 2, Abuja.",
};

const CHANNELS = [
  {
    label: "Call & WhatsApp",
    value: "+234 908 007 0070",
    href: "tel:+2349080070070",
    note: "Fastest route for a failed token or a debit without delivery.",
  },
  {
    label: "Email",
    value: "support@suezelectric.com",
    href: "mailto:support@suezelectric.com",
    note: "Include the meter number and the time of payment.",
  },
  {
    label: "Office",
    value: "20 Alexandria Crescent, Wuse 2, Abuja FCT 904101",
    note: "Monday to Friday, 9am to 5pm.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["A number that", "someone picks up."]}
        lede="If a payment went through and a token did not, that is not a support ticket — it is an emergency for your evening. Call it in."
      />

      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 104, y: 30 }} rings={22} tone="bone" opacity={0.45} />
        <Guilloche
          className="pointer-events-none absolute -left-40 bottom-[-8rem] h-[30rem] w-[30rem] opacity-30"
          stroke="#8f4a12"
          strokeOpacity={0.3}
        />

        <Reveal className="measure relative">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
            {/* Channels */}
            <div className="reveal">
              {CHANNELS.map((c, i) => (
                <div
                  key={c.label}
                  className="border-t py-7"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-bone-muted">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="link-slide mt-3 block font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight transition-colors duration-200 hover:text-voltage-ink"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-3 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight">
                      {c.value}
                    </p>
                  )}
                  <p className="mt-3 max-w-sm text-sm text-fg-bone-muted">{c.note}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <Reveal className="reveal">
              <h2 className="text-display-m" style={{ "--i": 0 } as React.CSSProperties}>
                Or write it down.
              </h2>
              <form
                className="mt-10 space-y-8"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <p className="field">
                    <label htmlFor="c-name">Full name</label>
                    <input id="c-name" name="name" type="text" autoComplete="name" required />
                  </p>
                  <p className="field">
                    <label htmlFor="c-phone">Phone</label>
                    <input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="080 0000 0000"
                      required
                    />
                  </p>
                </div>

                <p className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" required />
                </p>

                <p className="field">
                  <label htmlFor="c-topic">What is this about?</label>
                  <select id="c-topic" name="topic" defaultValue="token">
                    <option value="token">A token did not arrive</option>
                    <option value="wallet">Wallet or refund</option>
                    <option value="agent">Becoming an agent</option>
                    <option value="partner">Partnership or integration</option>
                    <option value="investor">Investor enquiry</option>
                    <option value="other">Something else</option>
                  </select>
                </p>

                <p className="field">
                  <label htmlFor="c-meter">Meter number (if relevant)</label>
                  <input id="c-meter" name="meter" type="text" inputMode="numeric" />
                </p>

                <p className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" name="message" required />
                </p>

                <button type="submit" className="btn btn-voltage w-full sm:w-auto">
                  Send message
                </button>

                {/* ponytail: no submit handler wired — hook this to your mailer or
                    a server action when the backend endpoint exists. */}
                <p className="font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-bone-muted">
                  We reply to every message. Urgent token failures go to the phone line.
                </p>
              </form>
            </Reveal>
          </div>
        </Reveal>
      </section>
    </>
  );
}
