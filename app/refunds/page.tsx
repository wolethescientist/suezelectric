import type { Metadata } from "next";
import { LegalSection, LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Refunds & failed tokens",
  description:
    "What happens when a payment succeeds but a token does not arrive, how to report it, and how refunds are handled.",
};

export default function RefundsPage() {
  return (
    <LegalShell
      title="Refunds & failed tokens"
      updated="1 November 2023"
      intro="Delivered token purchases are final. A payment that was taken without a token delivered is a different thing entirely — and it gets resolved, not refused."
    >
      <LegalSection heading="Delivered purchases are final">
        <p>
          Once a token has been generated and delivered to you, the purchase is
          complete and is not refundable. The units are credited to the meter and
          cannot be recalled.
        </p>
        <p>
          Check the meter number on the review screen before confirming. We show
          the registered customer name returned by the distribution company
          precisely so a mistyped digit is caught before payment, not after.
        </p>
      </LegalSection>

      <LegalSection heading="Payment taken, no token delivered">
        <p>
          This is the case that matters. If your account or card was debited and no
          token reached you, one of two things happens:
        </p>
        <ul>
          <li>
            <strong>We re-issue the token.</strong> Where the distribution
            company&rsquo;s vending system was queueing or briefly unavailable, the
            transaction is retried and the token delivered. This is the usual
            outcome.
          </li>
          <li>
            <strong>We return the payment to source.</strong> Where the token
            cannot be issued, the payment is reversed to the account or card it
            came from.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How to report it">
        <p>Call or send a WhatsApp message — this is the fastest channel:</p>
        <ul>
          <li>
            <a href="tel:+2349080070070">+234 908 007 0070</a>
          </li>
          <li>
            <a href="mailto:support@suezelectric.com">support@suezelectric.com</a>
          </li>
        </ul>
        <p>Include, so we can find the transaction on the first attempt:</p>
        <ul>
          <li>The meter number</li>
          <li>The amount paid and the payment method used</li>
          <li>The date and approximate time of payment</li>
          <li>
            The bank reference or payment reference, if you have one to hand
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Timelines">
        <p>
          Re-issued tokens are normally delivered the same day. Reversals to card
          or bank are initiated by us within one business day of confirming the
          failure; how quickly the money appears then depends on your bank and
          payment provider, typically three to ten business days.
        </p>
      </LegalSection>

      <LegalSection heading="Wallet balances">
        <p>
          Funds in your SuezElectric wallet remain yours. You may withdraw an
          unused balance to your own bank account at any time, subject to
          verification of the account details.
        </p>
      </LegalSection>

      <LegalSection heading="If you are not satisfied">
        <p>
          Escalate to{" "}
          <a href="mailto:support@suezelectric.com">support@suezelectric.com</a>{" "}
          marked for the attention of the operations lead. Unresolved disputes are
          governed by the dispute resolution provisions in our{" "}
          <a href="/terms">terms of service</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
