"use client";

import { useId, useState } from "react";
import { estimateSponsorshipRate, formatRange, SPONSOR_CPM_HIGH, SPONSOR_CPM_LOW } from "@/lib/revenue-data";

export function SponsorshipRateCalculator() {
  const id = useId();
  const [views, setViews] = useState("25,000");

  const expectedViews = Number.parseInt(views.replace(/[,\s]/g, ""), 10);
  const valid = Number.isFinite(expectedViews) && expectedViews > 0;
  const dedicated = valid ? estimateSponsorshipRate(expectedViews) : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <label className="text-sm font-medium" htmlFor={id}>
        Average views per video (first 30 days)
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={views}
        onChange={(e) => setViews(e.target.value)}
        className="mt-2 w-full max-w-sm field-pill px-4 py-3"
      />

      {dedicated && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
          <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
            <p className="text-xs text-muted">Dedicated integration (60–90s)</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatRange(dedicated)}</p>
          </div>
          <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
            <p className="text-xs text-muted">Short mention (~30s)</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatRange({ low: dedicated.low * 0.4, high: dedicated.high * 0.5 })}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        The math: expected views ÷ 1,000 × ${SPONSOR_CPM_LOW}–${SPONSOR_CPM_HIGH} (typical sponsor CPM for a dedicated integration);
        mentions price at roughly 40–50% of that. A channelpeek estimate — niche fit, audience trust and exclusivity can move rates well
        outside this range, in both directions.
      </p>
    </div>
  );
}
