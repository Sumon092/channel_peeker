"use client";

import { useId, useState } from "react";
import { COUNTRY_TIERS, DEFAULT_MONETIZED_SHARE, estimateLongFormEarnings, formatRange, NICHES } from "@/lib/revenue-data";

const selectCls =
  "w-full field-pill px-4 py-3";

export function RevenueCalculator() {
  const id = useId();
  const [views, setViews] = useState("100,000");
  const [nicheId, setNicheId] = useState("other");
  const [tierId, setTierId] = useState("tier1");
  const [monetizedPct, setMonetizedPct] = useState("60");

  const monthlyViews = Number.parseInt(views.replace(/[,\s]/g, ""), 10);
  const niche = NICHES.find((n) => n.id === nicheId) ?? NICHES[NICHES.length - 1];
  const tier = COUNTRY_TIERS.find((t) => t.id === tierId) ?? COUNTRY_TIERS[0];
  const share = Math.min(100, Math.max(1, Number.parseInt(monetizedPct, 10) || DEFAULT_MONETIZED_SHARE * 100)) / 100;

  const valid = Number.isFinite(monthlyViews) && monthlyViews > 0;
  const monthly = valid ? estimateLongFormEarnings(monthlyViews, niche, tier, share) : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium" htmlFor={`${id}-v`}>
          Monthly long-form views
          <input
            id={`${id}-v`}
            type="text"
            inputMode="numeric"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            className={`mt-2 font-normal ${selectCls}`}
          />
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-n`}>
          Niche
          <select id={`${id}-n`} value={nicheId} onChange={(e) => setNicheId(e.target.value)} className={`mt-2 font-normal ${selectCls}`}>
            {NICHES.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name} (${n.cpmLow}–${n.cpmHigh} CPM)
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-t`}>
          Main audience
          <select id={`${id}-t`} value={tierId} onChange={(e) => setTierId(e.target.value)} className={`mt-2 font-normal ${selectCls}`}>
            {COUNTRY_TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-m`}>
          Monetized views (%)
          <input
            id={`${id}-m`}
            type="number"
            min="1"
            max="100"
            inputMode="numeric"
            value={monetizedPct}
            onChange={(e) => setMonetizedPct(e.target.value)}
            className={`mt-2 font-normal ${selectCls}`}
          />
        </label>
      </div>

      {monthly && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
          <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
            <p className="text-xs text-muted">Estimated monthly ad earnings</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatRange(monthly)}</p>
          </div>
          <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
            <p className="text-xs text-muted">Estimated yearly ad earnings</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatRange({ low: monthly.low * 12, high: monthly.high * 12 })}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        The math: views ÷ 1,000 × monetized share × 55% creator split × niche CPM range × audience multiplier. A channelpeek estimate using
        our published CPM table (see the methodology page) — ads only, excluding memberships, sponsorships and Supers. Never an exact number,
        because nobody outside your YouTube Studio can know one.
      </p>
    </div>
  );
}
