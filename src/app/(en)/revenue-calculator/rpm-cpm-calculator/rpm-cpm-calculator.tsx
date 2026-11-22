"use client";

import { useId, useState } from "react";

/** YouTube pays creators 55% of ad revenue on long-form videos. */
const CREATOR_SHARE = 0.55;

const money = (n: number) => `$${n.toFixed(2)}`;

export function RpmCpmCalculator() {
  const id = useId();
  const [mode, setMode] = useState<"cpm" | "rpm">("cpm");
  const [value, setValue] = useState("4.00");
  const [monetizedPct, setMonetizedPct] = useState("60");
  const [views, setViews] = useState("");

  const v = Number.parseFloat(value);
  const pct = Math.min(100, Math.max(1, Number.parseFloat(monetizedPct) || 0)) / 100;
  const viewCount = Number.parseInt(views.replace(/[,\s]/g, ""), 10);

  let cpm: number | null = null;
  let rpm: number | null = null;
  if (Number.isFinite(v) && v > 0) {
    if (mode === "cpm") {
      cpm = v;
      rpm = v * pct * CREATOR_SHARE;
    } else {
      rpm = v;
      cpm = v / (pct * CREATOR_SHARE);
    }
  }

  const inputCls =
    "w-full field-pill px-5 py-3";

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <fieldset>
        <legend className="text-sm font-medium">What do you know?</legend>
        <div className="mt-2.5 flex gap-2">
          {(
            [
              ["cpm", "Ad CPM (what advertisers pay)"],
              ["rpm", "RPM (what you earn)"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === m ? "bg-accent-fill text-white" : "bg-surface-2 hover:bg-surface-3"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`${id}-v`} className="text-sm font-medium">
            {mode === "cpm" ? "Ad CPM ($ per 1,000 monetized views)" : "RPM ($ per 1,000 total views)"}
          </label>
          <input id={`${id}-v`} type="number" min="0" step="0.1" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} className={`mt-2 ${inputCls}`} />
        </div>
        <div>
          <label htmlFor={`${id}-p`} className="text-sm font-medium">
            Monetized views (%)
          </label>
          <input
            id={`${id}-p`}
            type="number"
            min="1"
            max="100"
            step="1"
            inputMode="numeric"
            value={monetizedPct}
            onChange={(e) => setMonetizedPct(e.target.value)}
            className={`mt-2 ${inputCls}`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-views`} className="text-sm font-medium">
            Monthly views <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={`${id}-views`}
            type="text"
            inputMode="numeric"
            placeholder="100,000"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            className={`mt-2 ${inputCls}`}
          />
        </div>
      </div>

      {cpm !== null && rpm !== null && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3" aria-live="polite">
          <div className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">Ad CPM</p>
            <p className="mt-1 text-xl font-bold tabular-nums tracking-tight">{money(cpm)}</p>
          </div>
          <div className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">Your RPM (ads only)</p>
            <p className="mt-1 text-xl font-bold tabular-nums tracking-tight">{money(rpm)}</p>
          </div>
          <div className="rounded-xl border border-border px-4 py-3">
            <p className="text-xs text-muted">Ad earnings {Number.isFinite(viewCount) && viewCount > 0 ? "for those views" : "per 100K views"}</p>
            <p className="mt-1 text-xl font-bold tabular-nums tracking-tight">{money(((Number.isFinite(viewCount) && viewCount > 0 ? viewCount : 100_000) / 1000) * rpm)}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        The math: RPM = CPM × monetized&nbsp;share × {CREATOR_SHARE} (YouTube&apos;s 55% long-form creator split). Real RPM also includes
        memberships, Supers and Premium, so your true RPM is usually a bit higher than ads alone. This is arithmetic on numbers you provide —
        not an estimate of any specific channel.
      </p>
    </div>
  );
}
