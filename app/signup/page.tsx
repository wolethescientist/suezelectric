import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth-shell";
import { SignupForm } from "@/components/signup-form";

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
      <Suspense fallback={<div className="py-12 text-center text-fg-ink-muted">Loading registration form...</div>}>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}

