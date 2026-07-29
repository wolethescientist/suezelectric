import type { Metadata } from "next";
import { LegalSection, LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What personal data SuezElectric collects, why we collect it, how long we keep it and how to have it deleted.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy policy"
      updated="31 October 2023"
      intro="This policy describes how SuezElectric Limited collects, uses and discloses your information when you use our services, and what rights you have over it."
    >
      <LegalSection heading="Who we are">
        <p>
          The Company is Suez Electric Limited, 20 Alexandria Crescent, Wuse 2,
          Abuja. The Application is SuezElectric. The country of operation is
          Nigeria. We use your personal data to provide and improve the service;
          by using it you agree to the collection and use of information in
          accordance with this policy.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <h3>Personal data</h3>
        <p>
          When you use the service we may ask you to provide information that can
          identify or be used to contact you:
        </p>
        <ul>
          <li>First and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
        </ul>
        <p>
          Card details are handled by our payment providers and are not stored on
          our systems.
        </p>

        <h3>Usage data</h3>
        <p>
          Collected automatically: IP address, browser type and version, pages
          visited, date and time of visit, time spent on pages, unique device
          identifiers and other diagnostic data. On mobile we may also collect
          device type, device ID, mobile operating system and mobile browser type.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use it">
        <ul>
          <li>
            <strong>To provide and maintain the service</strong>, including
            monitoring its usage.
          </li>
          <li>
            <strong>To manage your account</strong> and your registration as a
            user.
          </li>
          <li>
            <strong>To perform a contract</strong> — completing the purchases you
            make through the service.
          </li>
          <li>
            <strong>To contact you</strong> by email, phone, SMS or push
            notification about updates, security notices and services you have
            contracted.
          </li>
          <li>
            <strong>To tell you about offers</strong> and information on goods and
            services similar to those you have bought or enquired about, unless
            you have opted out.
          </li>
          <li>
            <strong>To manage your requests</strong> and to analyse usage trends
            so we can improve the service.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <ul>
          <li>
            <strong>Service providers</strong> who process data on our behalf, to
            monitor and analyse usage and to contact you.
          </li>
          <li>
            <strong>Affiliates</strong> — our parent company, subsidiaries, joint
            venture partners and companies under common control — who are required
            to honour this policy.
          </li>
          <li>
            <strong>Business partners</strong>, to offer you certain products,
            services or promotions.
          </li>
          <li>
            <strong>In a business transfer</strong>, in connection with a merger,
            financing, acquisition or sale of assets.
          </li>
          <li>
            <strong>With your consent</strong>, for any other purpose.
          </li>
        </ul>
        <p>We do not sell your personal data.</p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We retain personal data only as long as necessary for the purposes set
          out in this policy, and as needed to comply with legal obligations,
          resolve disputes and enforce our agreements. Usage data is generally
          retained for a shorter period, except where it is used to strengthen
          security or improve functionality, or where we are legally required to
          keep it longer.
        </p>
      </LegalSection>

      <LegalSection heading="Transfer of your data">
        <p>
          Your information is processed at our operating offices and anywhere else
          the parties involved in processing are located, which may be outside your
          jurisdiction and under different data protection laws. We take all steps
          reasonably necessary to ensure your data is treated securely, and will
          not transfer it to an organisation or country without adequate controls
          in place.
        </p>
      </LegalSection>

      <LegalSection heading="Deleting your data">
        <p>
          You have the right to delete, or ask us to help delete, the personal data
          we hold about you. You can update, amend or delete your information at
          any time by signing in and visiting your account settings, or by
          contacting us to request access, correction or deletion.
        </p>
        <p>
          Note that we may need to retain certain information where we have a legal
          obligation or lawful basis to do so.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy: email{" "}
          <a href="mailto:support@suezelectric.com">support@suezelectric.com</a> or
          call <a href="tel:+2349080070070">+234 908 007 0070</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
