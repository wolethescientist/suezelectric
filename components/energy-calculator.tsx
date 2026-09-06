"use client";

import { useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Contours } from "./texture";
import { Reveal } from "./reveal";

/**
 * Energy calculator — a demonstration of the feature shipping in the mobile app.
 *
 * The maths is deliberately transparent: watts x quantity x hours, summed, divided
 * by a thousand, multiplied by thirty days, then priced at the selected tariff band.
 * The real product will read the meter's own history; this estimates from a list the
 * customer builds themselves, which is what the app will do on first run anyway.
 *
 * Wattages are typical Nigerian household ratings, not measured figures — the
 * disclaimer under the result says so plainly rather than in a footnote nobody reads.
 */

type Preset = {
  id: string;
  name: string;
  watts: number;
  /** Typical *running* hours a day, not hours plugged in. */
  hours: number;
};

type Group = { group: string; items: Preset[] };

const CATALOGUE: Group[] = [
  {
    group: "Cooling & air",
    items: [
      { id: "ac-1", name: "Air conditioner — 1HP split", watts: 900, hours: 6 },
      { id: "ac-15", name: "Air conditioner — 1.5HP split", watts: 1200, hours: 6 },
      { id: "ac-2", name: "Air conditioner — 2HP split", watts: 1600, hours: 6 },
      { id: "fan-standing", name: "Standing fan", watts: 60, hours: 8 },
      { id: "fan-ceiling", name: "Ceiling fan", watts: 75, hours: 8 },
      { id: "fan-recharge", name: "Rechargeable fan", watts: 30, hours: 6 },
    ],
  },
  {
    group: "Lighting",
    items: [
      { id: "bulb-led", name: "LED bulb", watts: 10, hours: 6 },
      { id: "bulb-saver", name: "Energy-saver bulb", watts: 18, hours: 6 },
      { id: "bulb-incand", name: "Incandescent bulb", watts: 60, hours: 6 },
      { id: "flood", name: "Security / flood light", watts: 50, hours: 11 },
    ],
  },
  {
    group: "Kitchen & laundry",
    items: [
      { id: "fridge", name: "Refrigerator", watts: 150, hours: 10 },
      { id: "freezer", name: "Deep freezer", watts: 250, hours: 10 },
      { id: "microwave", name: "Microwave", watts: 1200, hours: 0.5 },
      { id: "kettle", name: "Electric kettle", watts: 1500, hours: 0.5 },
      { id: "cooker", name: "Electric cooker / hotplate", watts: 2000, hours: 1 },
      { id: "airfryer", name: "Air fryer", watts: 1400, hours: 0.5 },
      { id: "blender", name: "Blender", watts: 400, hours: 0.25 },
      { id: "rice", name: "Rice cooker", watts: 700, hours: 0.75 },
      { id: "washer", name: "Washing machine", watts: 500, hours: 1 },
      { id: "iron", name: "Electric iron", watts: 1000, hours: 0.5 },
    ],
  },
  {
    group: "Entertainment & work",
    items: [
      { id: "tv-32", name: 'LED television — 32"', watts: 60, hours: 6 },
      { id: "tv-55", name: 'LED television — 55"', watts: 120, hours: 6 },
      { id: "decoder", name: "Decoder / set-top box", watts: 25, hours: 6 },
      { id: "theatre", name: "Home theatre", watts: 100, hours: 3 },
      { id: "laptop", name: "Laptop", watts: 65, hours: 8 },
      { id: "desktop", name: "Desktop computer", watts: 200, hours: 6 },
      { id: "router", name: "Wi-Fi router", watts: 12, hours: 24 },
      { id: "phone", name: "Phone charging", watts: 10, hours: 3 },
    ],
  },
  {
    group: "Utility",
    items: [
      { id: "pump", name: "Water pump — 1HP", watts: 750, hours: 1 },
      { id: "heater", name: "Water heater", watts: 1500, hours: 1 },
      { id: "cctv", name: "CCTV system", watts: 50, hours: 24 },
      { id: "borehole", name: "Borehole pump — 1.5HP", watts: 1100, hours: 1 },
    ],
  },
];

const PRESET_INDEX = new Map(
  CATALOGUE.flatMap((g) => g.items).map((item) => [item.id, item]),
);

/** Indicative NERC band rates, naira per kWh. Editable in one place. */
const BANDS = [
  { id: "A", rate: 209.5, note: "20+ hrs/day" },
  { id: "B", rate: 63.0, note: "16-20 hrs/day" },
  { id: "C", rate: 51.2, note: "12-16 hrs/day" },
  { id: "D", rate: 43.3, note: "8-12 hrs/day" },
  { id: "E", rate: 40.0, note: "4-8 hrs/day" },
];

type Row = {
  key: string;
  name: string;
  watts: number;
  qty: number;
  hours: number;
};

/** Seeded with the household most people describe first, so the panel opens live. */
const INITIAL_ROWS: Row[] = [
  { key: "r1", name: "Standing fan", watts: 60, qty: 2, hours: 8 },
  { key: "r2", name: "LED bulb", watts: 10, qty: 10, hours: 6 },
  { key: "r3", name: "Air conditioner — 1.5HP split", watts: 1200, qty: 1, hours: 6 },
  { key: "r4", name: "Refrigerator", watts: 150, qty: 1, hours: 10 },
];

const naira = (value: number) =>
  `₦${Math.round(value).toLocaleString("en-NG")}`;

const DAYS = 30;

export function EnergyCalculator() {
  const uid = useId().replace(/:/g, "");
  const router = useRouter();

  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [band, setBand] = useState("B");
  const [picker, setPicker] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const [customError, setCustomError] = useState<string | null>(null);
  const [counter, setCounter] = useState(0);

  const rate = BANDS.find((b) => b.id === band)?.rate ?? 63;

  const { dailyKwh, monthlyKwh, monthlyCost, topUp } = useMemo(() => {
    const daily = rows.reduce(
      (sum, r) => sum + (r.watts * r.qty * r.hours) / 1000,
      0,
    );
    const monthly = daily * DAYS;
    const cost = monthly * rate;
    // Round the suggested purchase up to the nearest ₦500 — nobody buys ₦18,342.
    return {
      dailyKwh: daily,
      monthlyKwh: monthly,
      monthlyCost: cost,
      topUp: Math.max(500, Math.ceil(cost / 500) * 500),
    };
  }, [rows, rate]);

  const addPreset = (id: string) => {
    const preset = PRESET_INDEX.get(id);
    if (!preset) return;
    setRows((current) => {
      const existing = current.find((r) => r.name === preset.name);
      if (existing) {
        return current.map((r) =>
          r.key === existing.key ? { ...r, qty: r.qty + 1 } : r,
        );
      }
      return [
        ...current,
        {
          key: `${preset.id}-${counter}`,
          name: preset.name,
          watts: preset.watts,
          qty: 1,
          hours: preset.hours,
        },
      ];
    });
    setCounter((c) => c + 1);
    setPicker("");
  };

  const addCustom = () => {
    const name = customName.trim();
    const watts = Number(customWatts);
    if (!name) {
      setCustomError("Give the appliance a name");
      return;
    }
    if (!Number.isFinite(watts) || watts <= 0) {
      setCustomError("Enter the wattage — check the sticker on the appliance");
      return;
    }
    setRows((current) => [
      ...current,
      { key: `custom-${counter}`, name, watts, qty: 1, hours: 4 },
    ]);
    setCounter((c) => c + 1);
    setCustomName("");
    setCustomWatts("");
    setCustomError(null);
    setCustomOpen(false);
  };

  const update = (key: string, patch: Partial<Row>) =>
    setRows((current) =>
      current.map((r) => (r.key === key ? { ...r, ...patch } : r)),
    );

  const remove = (key: string) =>
    setRows((current) => current.filter((r) => r.key !== key));

  const buy = () => {
    const params = new URLSearchParams({ amount: String(topUp) });
    router.push(`/signup?${params.toString()}`);
  };

  return (
    <section
      id="energy-calculator"
      className="relative overflow-hidden border-y border-ink-line section-y"
    >
      <Contours origin={{ x: 96, y: 26 }} rings={24} opacity={0.45} />

      <Reveal className="measure relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="reveal">
            <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
              Energy calculator
            </div>
            <h2
              className="mt-5 max-w-2xl text-display-m sm:mt-6"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              How many units does your house actually need?
            </h2>
            <p
              className="mt-5 max-w-xl text-body-l text-fg-ink-muted sm:mt-6"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              List what you run — two standing fans, a 1.5HP air conditioner, ten
              bulbs — and see the kilowatt-hours a month of steady supply costs at
              your tariff band, before you buy.
            </p>
          </div>
          <p
            className="max-w-xs font-label text-[0.6875rem] uppercase leading-relaxed tracking-[0.075em] text-fg-ink-muted lg:text-right"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            Shipping in the SuezElectric app
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1.35fr_0.85fr] lg:items-start lg:gap-12">
          {/* ─────────── Builder ─────────── */}
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-4 backdrop-blur-sm sm:p-6 lg:p-7">
            {/* Tariff band */}
            <fieldset>
              <legend className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                Your tariff band
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {BANDS.map((b) => {
                  const on = b.id === band;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBand(b.id)}
                      aria-pressed={on}
                      className={`cursor-pointer rounded-lg border px-2 py-2.5 text-center transition-colors duration-150 ${
                        on
                          ? "border-voltage bg-voltage/15 text-voltage"
                          : "border-ink-line text-fg-ink-muted hover:border-fg-ink-muted"
                      }`}
                    >
                      <span className="block font-display text-lg leading-none">
                        {b.id}
                      </span>
                      <span className="mt-1 block font-mono text-[0.625rem] leading-tight">
                        ₦{b.rate}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-xs text-fg-ink-muted">
                Band {band} · {BANDS.find((b) => b.id === band)?.note} · indicative{" "}
                {naira(rate)} per kWh
              </p>
            </fieldset>

            {/* Appliance picker */}
            <div className="mt-7 border-t border-ink-line pt-6">
              <label
                htmlFor={`${uid}-picker`}
                className="block font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted"
              >
                Add an appliance
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <select
                    id={`${uid}-picker`}
                    value={picker}
                    onChange={(e) => addPreset(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-ink-line bg-ink-2 py-3.5 pl-4 pr-10 text-[0.9375rem] text-fg-ink transition-colors duration-200 focus:border-voltage focus:outline-none focus:ring-1 focus:ring-voltage"
                  >
                    <option value="">Choose an appliance…</option>
                    {CATALOGUE.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} — {item.watts.toLocaleString()} W
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 12 8"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 fill-none stroke-fg-ink-muted"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 1.5 6 6.5 11 1.5" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomOpen((v) => !v);
                    setCustomError(null);
                  }}
                  aria-expanded={customOpen}
                  className="btn btn-ghost w-full shrink-0 sm:w-auto"
                >
                  {customOpen ? "Cancel" : "Add your own"}
                </button>
              </div>

              {customOpen && (
                <div className="mt-4 rounded-xl border border-ink-line bg-ink/60 p-4">
                  <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr_auto] sm:items-end">
                    <div>
                      <label
                        htmlFor={`${uid}-cname`}
                        className="block font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted"
                      >
                        Appliance
                      </label>
                      <input
                        id={`${uid}-cname`}
                        value={customName}
                        onChange={(e) => {
                          setCustomName(e.target.value);
                          setCustomError(null);
                        }}
                        placeholder="e.g. Grinding machine"
                        className="mt-2 w-full rounded-lg border border-ink-line bg-ink-2 px-3 py-3 text-[0.9375rem] text-fg-ink placeholder:text-fg-ink-muted/50 focus:border-voltage focus:outline-none focus:ring-1 focus:ring-voltage"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-cwatts`}
                        className="block font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted"
                      >
                        Watts
                      </label>
                      <input
                        id={`${uid}-cwatts`}
                        value={customWatts}
                        onChange={(e) => {
                          setCustomWatts(e.target.value.replace(/[^\d.]/g, ""));
                          setCustomError(null);
                        }}
                        inputMode="decimal"
                        placeholder="750"
                        className="mt-2 w-full rounded-lg border border-ink-line bg-ink-2 px-3 py-3 font-mono text-[0.9375rem] text-fg-ink placeholder:text-fg-ink-muted/50 focus:border-voltage focus:outline-none focus:ring-1 focus:ring-voltage"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addCustom}
                      className="btn btn-voltage w-full sm:w-auto"
                    >
                      Add
                    </button>
                  </div>
                  {customError && (
                    <p className="mt-3 text-xs text-red-400">{customError}</p>
                  )}
                  <p className="mt-3 text-xs text-fg-ink-muted">
                    The wattage is printed on the appliance&rsquo;s rating plate or
                    inside the manual.
                  </p>
                </div>
              )}
            </div>

            {/* Rows */}
            <div className="mt-7 border-t border-ink-line pt-2">
              {rows.length === 0 ? (
                <p className="py-10 text-center text-sm text-fg-ink-muted">
                  Nothing on the list yet. Pick an appliance above to start.
                </p>
              ) : (
                <ul>
                  {rows.map((row) => {
                    const rowMonthly = (row.watts * row.qty * row.hours * DAYS) / 1000;
                    return (
                      <li
                        key={row.key}
                        className="flex flex-col gap-3 border-b border-ink-line py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-5"
                      >
                        <div className="flex min-w-0 items-start justify-between gap-3 sm:flex-1">
                          <div className="min-w-0">
                            <div className="truncate text-[0.9375rem]">{row.name}</div>
                            <div className="mt-1 font-mono text-[0.6875rem] text-fg-ink-muted">
                              {row.watts.toLocaleString()} W ·{" "}
                              {rowMonthly.toFixed(1)} kWh/month
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(row.key)}
                            aria-label={`Remove ${row.name}`}
                            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-ink-line text-fg-ink-muted transition-colors duration-200 hover:border-voltage hover:text-voltage sm:hidden"
                          >
                            <Cross />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-end sm:gap-4">
                          <NumberField
                            id={`${uid}-${row.key}-qty`}
                            label="Qty"
                            value={row.qty}
                            min={1}
                            step={1}
                            onChange={(v) => update(row.key, { qty: v })}
                          />
                          <NumberField
                            id={`${uid}-${row.key}-hrs`}
                            label="Hrs/day"
                            value={row.hours}
                            min={0}
                            max={24}
                            step={0.5}
                            onChange={(v) =>
                              update(row.key, { hours: Math.min(24, v) })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => remove(row.key)}
                            aria-label={`Remove ${row.name}`}
                            className="hidden h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-ink-line text-fg-ink-muted transition-colors duration-200 hover:border-voltage hover:text-voltage sm:grid"
                          >
                            <Cross />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {rows.length > 0 && (
              <button
                type="button"
                onClick={() => setRows([])}
                className="mt-3 inline-flex min-h-11 cursor-pointer items-center font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted transition-colors duration-200 hover:text-voltage"
              >
                Clear the list
              </button>
            )}
          </div>

          {/* ─────────── Result ─────────── */}
          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-2/70 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-ink-line px-5 py-3 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted sm:px-6">
                <span>Monthly estimate</span>
                <span className="flex items-center gap-2 text-voltage">
                  <span className="h-1.5 w-1.5 rounded-full bg-voltage" />
                  Band {band}
                </span>
              </div>

              <div className="px-5 py-7 sm:px-6">
                <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                  You need about
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[clamp(2.75rem,11vw,4rem)] leading-none text-voltage">
                    {monthlyKwh.toLocaleString("en-NG", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span className="font-label text-sm uppercase tracking-[0.09em] text-fg-ink-muted">
                    kWh / month
                  </span>
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-y-5 border-t border-ink-line pt-6">
                  <Readout label="Per day" value={`${dailyKwh.toFixed(1)} kWh`} />
                  <Readout label="Per week" value={`${(dailyKwh * 7).toFixed(1)} kWh`} />
                  <Readout label="Appliances listed" value={String(rows.reduce((n, r) => n + r.qty, 0))} />
                  <Readout label="Rate applied" value={`₦${rate}/kWh`} />
                </dl>

                <div className="mt-7 border-t border-ink-line pt-6">
                  <div className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
                    Estimated monthly spend
                  </div>
                  <div className="mt-2 font-display text-[clamp(1.75rem,7vw,2.25rem)] leading-none">
                    {naira(monthlyCost)}
                  </div>
                  <p className="mt-3 text-sm text-fg-ink-muted">
                    Buy around{" "}
                    <span className="font-mono text-fg-ink">{naira(topUp)}</span> of
                    units for a month of steady supply at this usage.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={buy}
                  disabled={rows.length === 0}
                  className="btn btn-voltage mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Buy {naira(topUp)} of units
                </button>
              </div>
            </div>

            {/* The disclaimer. Under the number it qualifies, at readable size. */}
            <p className="mt-5 border-t border-ink-line pt-5 text-sm leading-relaxed text-fg-ink-muted">
              <span className="text-fg-ink">This is an estimate, not a bill.</span>{" "}
              Figures use typical appliance ratings and an indicative band tariff over
              a 30-day month. Real consumption varies with appliance age and
              efficiency, ambient temperature, supply hours and the exact tariff your
              distribution company applies. Always check your meter for the true
              balance.
            </p>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
        {label}
      </dt>
      <dd className="mt-1.5 font-mono text-[0.9375rem]">{value}</dd>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max?: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block font-label text-[0.625rem] uppercase tracking-[0.09em] text-fg-ink-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        inputMode="decimal"
        onChange={(e) => {
          const next = Number(e.target.value);
          onChange(Number.isFinite(next) ? Math.max(min, next) : min);
        }}
        className="mt-1.5 h-11 w-full rounded-lg border border-ink-line bg-ink px-3 text-center font-mono text-[0.9375rem] text-fg-ink focus:border-voltage focus:outline-none focus:ring-1 focus:ring-voltage sm:w-[5.25rem]"
      />
    </div>
  );
}

function Cross() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="h-3 w-3 fill-none stroke-current"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M1.5 1.5 10.5 10.5M10.5 1.5 1.5 10.5" />
    </svg>
  );
}
