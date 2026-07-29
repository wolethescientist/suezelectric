import type { Metadata } from "next";
import Link from "next/link";
import { Contours } from "@/components/texture";
import { Reveal } from "@/components/reveal";
import { PageHero, SectionHead } from "@/components/page-parts";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "How to open an account, buy a token, fund your wallet, and what happens if a payment succeeds but a token does not arrive.",
};

const GROUPS = [
  {
    title: "Buying electricity",
    items: [
      {
        q: "Who can use SuezElectric?",
        a: "Anyone with a Nigerian electricity meter. Prepaid meters get a token; postpaid and net-metered accounts are credited directly against the account.",
      },
      {
        q: "How do I buy a unit?",
        a: "Enter your meter number, select the state and meter type, enter the amount, review the unit count at your tariff band, and pay. The token is issued to the app, by SMS and by email.",
      },
      {
        q: "How long does a token take?",
        a: "Median delivery is fourteen seconds. If a distribution company's vending system is queueing, we hold your payment and retry automatically rather than failing the transaction.",
      },
      {
        q: "Can I buy for someone else's meter?",
        a: "Yes. Any meter number can be credited from your account, and each meter you use is saved with the registered name so you can pick it again without retyping.",
      },
    ],
  },
  {
    title: "Payment and wallet",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Debit and credit card, bank transfer, USSD, and your prefunded SuezElectric wallet. Payments are processed by Paystack, Flutterwave and Providus Bank's virtual payment service. All amounts are in naira.",
      },
      {
        q: "How does the wallet work?",
        a: "Fund it from your bank account, then buy without entering card details again. Balance is yours — withdraw it at any time.",
      },
      {
        q: "I was debited but no token arrived. What now?",
        a: "Contact us on +234 908 007 0070 or support@suezelectric.com with the meter number and the time of payment. Confirmed debits without a delivered token are resolved by re-issuing the token or refunding the payment to source.",
      },
      {
        q: "Do you charge a fee?",
        a: "No service fee on consumer purchases. Your payment provider's charge, where one applies, is shown on the review screen before you confirm.",
      },
    ],
  },
  {
    title: "Account and security",
    items: [
      {
        q: "How do I open an account?",
        a: "Sign up with your full name, phone number and email, and set a password. You can buy a token as a guest, but an account gets you the wallet, saved meters and transaction history.",
      },
      {
        q: "Are my transactions secure?",
        a: "Card details are handled by our PCI-compliant payment providers and never stored on our systems. We do not sell or share your personal data with third parties.",
      },
      {
        q: "Can I get a receipt for my landlord or employer?",
        a: "Every purchase generates a receipt with the meter serial, token string, unit count, tariff band and timestamp, viewable and printable from your history.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        lines={["Questions,", "answered plainly."]}
        lede="If the answer you need is not here, a human is on the phone and on WhatsApp — the same number, all day."
        aside={
          <div className="border-l border-ink-line pl-6">
            <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
              Call & WhatsApp
            </div>
            <a
              href="tel:+2349080070070"
              className="link-slide mt-2 block font-display text-[1.75rem] transition-colors duration-200 hover:text-voltage"
            >
              +234 908 007 0070
            </a>
          </div>
        }
      />

      <section className="on-bone relative overflow-hidden py-20 lg:py-28">
        <Contours origin={{ x: 104, y: 24 }} rings={22} tone="bone" opacity={0.45} />
        <div className="measure relative space-y-20">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title}>
              <SectionHead
                eyebrow={`Section ${String(gi + 1).padStart(2, "0")}`}
                title={group.title}
              />
              <div className="reveal mt-10">
                {group.items.map((item, i) => (
                  <details
                    key={item.q}
                    className="faq-item"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <summary>
                      <span>{item.q}</span>
                      <span className="faq-sign" aria-hidden="true" />
                    </summary>
                    <div className="faq-body">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20 lg:py-24">
        <Contours origin={{ x: 24, y: 50 }} rings={24} opacity={0.6} />
        <Reveal className="measure relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-display-m">Still stuck? Call, do not queue.</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-voltage">
              Contact support
            </Link>
            <a href="tel:+2349080070070" className="btn btn-ghost">
              +234 908 007 0070
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
