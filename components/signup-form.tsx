"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function SignupForm() {
  const searchParams = useSearchParams();
  const meterParam = searchParams.get("meter") || "";
  const amountParam = searchParams.get("amount") || "";
  const [meter, setMeter] = useState(meterParam);

  useEffect(() => {
    if (meterParam) {
      setMeter(meterParam);
    }
  }, [meterParam]);

  return (
    <form className="space-y-7">
      {meterParam && (
        <div className="rounded-xl border border-voltage/30 bg-voltage/10 px-4 py-3 text-xs text-voltage">
          Continuing with meter <strong>{meterParam}</strong>
          {amountParam && (
            <span> · Initial recharge of ₦{Number(amountParam).toLocaleString()} selected</span>
          )}
        </div>
      )}

      <p className="field">
        <label htmlFor="s-meter">Meter number</label>
        <input
          id="s-meter"
          name="meter"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="4512 7789 013"
          value={meter}
          onChange={(e) => setMeter(e.target.value)}
          required
        />
      </p>

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
        Create account &amp; Buy units
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
  );
}
