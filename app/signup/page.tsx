import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Open a SuezElectric account to buy prepaid electricity tokens, fund a wallet, save your meters and keep printable receipts.",
};

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="New account"
      lines={["Four fields,", "then power."]}
      lede="Name, phone, email, password. You can buy a token as a guest, but an account gets you the wallet, saved meters and a receipt history."
      plate={{
        stat: "11",
        label: "Distribution companies covered",
        body: "One account vends to AEDC, IKEDC, EKEDC, IBEDC, EEDC, KAEDCO, KEDCO, JEDPLC, BEDC, PHED and YEDC.",
      }}
      footer={
        <>
          Already registered?{" "}
          <Link href="/login" className="link-slide text-fg-ink hover:text-voltage">
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-7">
        <p className="field">
          <label htmlFor="s-name">Full name</label>
          <input id="s-name" name="name" type="text" autoComplete="name" required />
        </p>

        <div className="grid gap-7 sm:grid-cols-2">
          <p className="field">
            <label htmlFor="s-phone">Phone</label>
            <input
              id="s-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="080 0000 0000"
              required
            />
          </p>
          <p className="field">
            <label htmlFor="s-email">Email</label>
            <input id="s-email" name="email" type="email" autoComplete="email" required />
          </p>
        </div>

        <p className="field">
          <label htmlFor="s-password">Password</label>
          <input
            id="s-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <span className="mt-2 block font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
            Minimum 8 characters
          </span>
        </p>

        <p className="field">
          <label htmlFor="s-referral">Referral code (optional)</label>
          <input id="s-referral" name="referred_by" type="text" />
        </p>

        {/* ponytail: presentation only — wire to your auth endpoint / server action. */}
        <button type="submit" className="btn btn-voltage w-full">
          Create account
        </button>

        <p className="text-sm leading-relaxed text-fg-ink-muted">
          You must be 18 or over. By continuing you agree to our{" "}
          <Link href="/terms" className="link-slide text-fg-ink">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="link-slide text-fg-ink">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}
