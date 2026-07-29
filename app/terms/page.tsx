import type { Metadata } from "next";
import { LegalSection, LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The legal terms governing use of the SuezElectric website, mobile application and vending services.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of service"
      updated="1 November 2023"
      intro="We are SuezElectric Limited, doing business as SuezElectric, a company registered in Nigeria at 20 Alexandria Crescent, Wuse 2, Abuja FCT 904101. These terms govern the website, the mobile application and every related service."
    >
      <LegalSection heading="Agreement to these terms">
        <p>
          These legal terms are a binding agreement between you — personally or on
          behalf of an entity — and SuezElectric Limited, covering your access to
          and use of the Services. By accessing the Services you confirm that you
          have read, understood and agreed to be bound by them. If you do not
          agree, you must discontinue use.
        </p>
        <p>
          The Services are intended for users aged <strong>18 or over</strong>.
          Persons under 18 may not register or use them.
        </p>
        <p>
          We will give notice of scheduled changes to the Services you use.
          Modified terms take effect on posting or on notification by email.
          Continuing to use the Services after the effective date means you accept
          the modified terms.
        </p>
      </LegalSection>

      <LegalSection heading="Purchases and payment">
        <p>Our payment channels and providers are:</p>
        <ul>
          <li>Paystack</li>
          <li>Flutterwave</li>
          <li>Providus Bank Virtual Payment Service (VPS)</li>
        </ul>
        <p>
          All payments are in <strong>naira</strong>. You agree to provide
          current, complete and accurate purchase and account information, and to
          keep your payment method and email address up to date so we can
          complete transactions and reach you.
        </p>
        <p>
          You authorise us to charge your chosen payment provider on placing an
          order. We may correct pricing errors even after payment has been
          requested or received, refuse any order, and limit or cancel quantities
          per person, household or order — including orders that appear to be
          placed by dealers or resellers.
        </p>
        <h3>Refunds</h3>
        <p>
          Completed token purchases are final and are not refundable once the
          token has been delivered. Where a payment is confirmed but no token is
          delivered, contact support and we will re-issue the token or return the
          payment to source.
        </p>
      </LegalSection>

      <LegalSection heading="Your account">
        <p>
          You may be required to register to use the Services. Keep your password
          confidential; you are responsible for all activity under your account.
          We may remove, reclaim or change a username we consider inappropriate.
        </p>
        <p>
          By using the Services you represent that your registration information
          is true and current, that you have legal capacity, that you are not a
          minor in your jurisdiction, and that you will not access the Services
          by bot, script or other automated means. Providing untrue or incomplete
          information entitles us to suspend or terminate your account.
        </p>
      </LegalSection>

      <LegalSection heading="Prohibited activities">
        <p>You agree not to:</p>
        <ul>
          <li>
            Systematically retrieve content from the Services to build a
            collection, compilation or database without written permission.
          </li>
          <li>
            Trick, defraud or mislead us or other users, particularly to obtain
            account credentials.
          </li>
          <li>
            Circumvent, disable or interfere with security features of the
            Services.
          </li>
          <li>Use information from the Services to harass, abuse or harm anyone.</li>
          <li>Misuse our support channels or file false reports of abuse.</li>
          <li>
            Upload viruses or other material that disrupts the operation of the
            Services.
          </li>
          <li>Use the Services in any way inconsistent with applicable law.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          We own or licence all intellectual property in the Services — source
          code, databases, functionality, software, designs, audio, video, text,
          photographs and graphics — together with the trademarks, service marks
          and logos within them. These are protected by copyright and trademark
          law in Nigeria and internationally.
        </p>
        <p>
          Subject to these terms we grant you a non-exclusive,
          non-transferable, revocable licence to access the Services and to
          download or print portions of the content you have properly accessed,
          for personal non-commercial use or internal business purposes only. All
          other exploitation requires our prior written permission — write to{" "}
          <a href="mailto:support@suezelectric.com">support@suezelectric.com</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law and disputes">
        <p>
          These terms are governed by and construed in accordance with the laws of
          Nigeria, and you and SuezElectric Limited irrevocably consent that the
          courts of Nigeria have exclusive jurisdiction over any dispute arising
          in connection with them.
        </p>
        <p>
          Any dispute arising out of or in connection with these terms —
          including as to their existence, validity or termination — shall be
          referred to and finally resolved by the International Commercial
          Arbitration Court under the European Arbitration Chamber, in accordance
          with its rules. There shall be one arbitrator. The seat of arbitration
          is Abuja, Nigeria, the language is English and the governing law is the
          substantive law of Nigeria.
        </p>
        <p>
          Arbitration is limited to the dispute between the parties individually.
          No arbitration may be joined with another proceeding or brought on a
          class or representative basis. Disputes concerning intellectual
          property rights, allegations of theft, piracy, invasion of privacy or
          unauthorised use, and claims for injunctive relief are excluded from
          arbitration.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer and liability">
        <p>
          The Services are provided as-is and as-available. Information on the
          Services may contain typographical errors, inaccuracies or omissions
          relating to descriptions, pricing and availability, which we may correct
          at any time without prior notice.
        </p>
        <p>
          We may modify, suspend or discontinue all or part of the Services at any
          time, and we cannot guarantee uninterrupted availability — hardware,
          software and third-party vending systems all fail occasionally.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          SuezElectric Limited, 20 Alexandria Crescent, Wuse 2, Abuja, FCT 904101,
          Nigeria.
          <br />
          Phone: <a href="tel:+2349080070070">+234 908 007 0070</a>
          <br />
          Email:{" "}
          <a href="mailto:support@suezelectric.com">support@suezelectric.com</a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
