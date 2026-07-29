import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your SuezElectric account to buy electricity, fund your wallet and view your token history.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Account access"
      lines={["Welcome back."]}
      lede="Your saved meters, wallet balance and every token you have ever bought are one password away."
      plate={{
        stat: "14s",
        label: "Median token delivery",
        body: "Log in, pick a saved meter, pay from your wallet. The whole thing is shorter than the queue used to be.",
      }}
      footer={
        <>
          No account yet?{" "}
          <Link href="/signup" className="link-slide text-fg-ink hover:text-voltage">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-7">
        <p className="field">
          <label htmlFor="l-id">Phone or email</label>
          <input
            id="l-id"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="080 0000 0000"
            required
          />
        </p>

        <p className="field">
          <label htmlFor="l-password">Password</label>
          <input
            id="l-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </p>

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-3 font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 cursor-pointer accent-voltage"
            />
            Keep me signed in
          </label>
          <Link
            href="/contact"
            className="link-slide font-label text-[0.6875rem] uppercase tracking-[0.075em] text-fg-ink-muted hover:text-voltage"
          >
            Forgot password
          </Link>
        </div>

        {/* ponytail: presentation only — wire to your auth endpoint / server action. */}
        <button type="submit" className="btn btn-voltage w-full">
          Log in
        </button>
      </form>
    </AuthShell>
  );
}
