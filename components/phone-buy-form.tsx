"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PhoneBuyFormProps {
  layout?: "inline" | "stacked";
  tone?: "ink" | "bone";
  buttonText?: string;
  placeholder?: string;
  label?: string;
  subtext?: string;
  className?: string;
  showAmountChips?: boolean;
  onSuccess?: (phone: string) => void;
}

export function PhoneBuyForm({
  layout = "inline",
  tone = "ink",
  buttonText = "Buy units",
  placeholder = "080 0000 0000",
  label,
  subtext,
  className = "",
  showAmountChips = false,
  onSuccess,
}: PhoneBuyFormProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<string>("5000");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanPhone) {
      setError("Please enter your phone number");
      return;
    }

    // Basic Nigerian phone check (10 to 14 characters)
    const phoneRegex = /^(\+?234|0)[789][01]\d{8}$/;
    const isValid = phoneRegex.test(cleanPhone) || cleanPhone.length >= 10;

    if (!isValid) {
      setError("Please enter a valid phone number (e.g. 080 1234 5678)");
      return;
    }

    setError(null);
    setLoading(true);

    if (onSuccess) {
      onSuccess(cleanPhone);
    }

    const params = new URLSearchParams();
    params.set("phone", cleanPhone);
    if (showAmountChips && selectedAmount) {
      params.set("amount", selectedAmount);
    }

    router.push(`/signup?${params.toString()}`);
  };

  const isBone = tone === "bone";

  if (layout === "stacked") {
    return (
      <form onSubmit={handleSubmit} className={`w-full max-w-md ${className}`}>
        <div className="space-y-4">
          <div className="field">
            {label ? (
              <label
                htmlFor="phone-input-stacked"
                className={`block font-label text-[0.6875rem] uppercase tracking-[0.09em] ${
                  isBone ? "text-fg-bone-muted" : "text-fg-ink-muted"
                }`}
              >
                {label}
              </label>
            ) : (
              <label
                htmlFor="phone-input-stacked"
                className={`block font-label text-[0.6875rem] uppercase tracking-[0.09em] ${
                  isBone ? "text-fg-bone-muted" : "text-fg-ink-muted"
                }`}
              >
                Phone number
              </label>
            )}

            <div className="relative mt-2">
              <input
                id="phone-input-stacked"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={placeholder}
                autoComplete="tel"
                className={`w-full rounded-xl border px-4 py-3.5 pr-4 font-mono text-base tracking-wide transition-all duration-200 focus:outline-none sm:pr-24 ${
                  isBone
                    ? "border-bone-line bg-bone-2/60 text-fg-bone placeholder:text-fg-bone-muted/60 focus:border-voltage-ink focus:ring-1 focus:ring-voltage-ink"
                    : "border-ink-line bg-ink-2/80 text-fg-ink placeholder:text-fg-ink-muted/50 focus:border-voltage focus:ring-1 focus:ring-voltage"
                }`}
              />
              <span
                className={`pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 font-label text-[0.6875rem] uppercase tracking-wider sm:block ${
                  isBone ? "text-fg-bone-muted" : "text-fg-ink-muted"
                }`}
              >
                SMS Token
              </span>
            </div>
          </div>

          {showAmountChips && (
            <div>
              <div
                className={`font-label text-[0.6875rem] uppercase tracking-[0.09em] ${
                  isBone ? "text-fg-bone-muted" : "text-fg-ink-muted"
                }`}
              >
                Select amount
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "₦2,000", val: "2000" },
                  { label: "₦5,000", val: "5000" },
                  { label: "₦10,000", val: "10000" },
                  { label: "₦20,000", val: "20000" },
                ].map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setSelectedAmount(chip.val)}
                    className={`min-h-11 cursor-pointer rounded-lg border py-2 text-center font-mono text-xs transition-colors duration-150 ${
                      selectedAmount === chip.val
                        ? isBone
                          ? "border-voltage-ink bg-voltage-ink/10 font-semibold text-voltage-ink"
                          : "border-voltage bg-voltage/15 font-semibold text-voltage"
                        : isBone
                          ? "border-bone-line bg-transparent text-fg-bone-muted hover:border-fg-bone-muted"
                          : "border-ink-line bg-transparent text-fg-ink-muted hover:border-fg-ink-muted"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-400 animate-pulse">{error}</p>
          )}

          {/* Buy unit button directly under */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-voltage w-full shadow-lg transition-all"
          >
            {loading ? "Preparing..." : buttonText}
          </button>

          {subtext && (
            <p
              className={`text-xs ${
                isBone ? "text-fg-bone-muted" : "text-fg-ink-muted"
              }`}
            >
              {subtext}
            </p>
          )}
        </div>
      </form>
    );
  }

  // Inline layout (hero and headers)
  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-xl ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            autoComplete="tel"
            aria-label="Phone number for electricity units"
            className={`w-full rounded-full border px-5 py-3.5 font-mono text-sm tracking-wide transition-all duration-200 focus:outline-none sm:text-base ${
              isBone
                ? "border-bone-line bg-bone-2/70 text-fg-bone placeholder:text-fg-bone-muted/60 focus:border-voltage-ink focus:ring-1 focus:ring-voltage-ink"
                : "border-ink-line bg-ink-2/90 text-fg-ink placeholder:text-fg-ink-muted/50 focus:border-voltage focus:ring-1 focus:ring-voltage"
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-voltage w-full shrink-0 sm:w-auto"
        >
          {loading ? "Loading..." : buttonText}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-400 animate-pulse">{error}</p>
      )}

      {subtext && (
        <p
          className={`mt-2.5 font-label text-[0.6875rem] uppercase tracking-[0.075em] ${
            isBone ? "text-fg-bone-muted" : "text-fg-ink-muted"
          }`}
        >
          {subtext}
        </p>
      )}
    </form>
  );
}
