"use client";

import { useId, useState } from "react";
import { COUNTRY_TIERS, estimateShortsEarnings, formatRange, SHORTS_RPM_HIGH, SHORTS_RPM_LOW } from "@/lib/revenue-data";

const inputCls =
  "w-full field-pill px-4 py-3";

export function ShortsRevenueCalculator() {
  const id = useId();
  const [views, setViews] = useState("1,000,000");
  const [tierId, setTierId] = useState("tier1");

  const monthlyViews = Number.parseInt(views.replace(/[,\s]/g, ""), 10);
  const tier = COUNTRY_TIERS.find((t) => t.id === tierId) ?? COUNTRY_TIERS[0];
  const range = Number.isFinite(monthlyViews) && monthlyViews > 0 ? estimateShortsEarnings(monthlyViews, tier) : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium" htmlFor={`${id}-v`}>
          Monthly Shorts views
          <input id={`${id}-v`} type="text" inputMode="numeric" value={views} onChange={(e) => setViews(e.target.value)} className={`mt-2 font-normal ${inputCls}`} />
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-t`}>
          Main audience
          <select id={`${id}-t`} value={tierId} onChange={(e) => setTierId(e.target.value)} className={`mt-2 font-normal ${inputCls}`}>
            {COUNTRY_TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {range && (
        <div className="mt-5 rounded-xl bg-surface-2 px-4 py-4 text-center" aria-live="polite">
          <p className="text-xs text-muted">Estimated monthly Shorts earnings</p>
          <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatRange(range)}</p>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Shorts pay from a shared ad pool at roughly ${SHORTS_RPM_LOW.toFixed(2)}–${SHORTS_RPM_HIGH.toFixed(2)} per 1,000 views (already
        after the 45% creator split), adjusted for where your audience lives. A channelpeeker estimate — Shorts RPM varies by month and music
        usage; your YouTube Studio has the real figure.
      </p>
    </div>
  );
}
