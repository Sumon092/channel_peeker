"use client";

import { useId, useState } from "react";

const inputCls = "w-full field-pill px-4 py-3";

const THRESHOLD_HOURS = 4000;

function parseNum(v: string): number | null {
  const n = Number.parseFloat(v.replace(/[,\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function fmt(n: number, digits = 0) {
  return n.toLocaleString("en", { maximumFractionDigits: digits });
}

export function WatchTimeCalculator() {
  const id = useId();
  const [views, setViews] = useState("100,000");
  const [minutes, setMinutes] = useState("3");
  const [seconds, setSeconds] = useState("30");

  const viewCount = parseNum(views);
  const avgSeconds = (parseNum(minutes) ?? 0) * 60 + (parseNum(seconds) ?? 0);

  const watchHours = viewCount !== null && avgSeconds > 0 ? (viewCount * avgSeconds) / 3600 : null;
  const viewsFor4000 = avgSeconds > 0 ? Math.ceil((THRESHOLD_HOURS * 3600) / avgSeconds) : null;
  const pctOfThreshold = watchHours !== null ? Math.min(100, (watchHours / THRESHOLD_HOURS) * 100) : null;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium" htmlFor={`${id}-v`}>
          Views
          <input id={`${id}-v`} type="text" inputMode="numeric" value={views} onChange={(e) => setViews(e.target.value)} className={`mt-2 font-normal ${inputCls}`} />
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-m`}>
          Avg. view duration — minutes
          <input id={`${id}-m`} type="text" inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value)} className={`mt-2 font-normal ${inputCls}`} />
        </label>
        <label className="text-sm font-medium" htmlFor={`${id}-s`}>
          Seconds
          <input id={`${id}-s`} type="text" inputMode="numeric" value={seconds} onChange={(e) => setSeconds(e.target.value)} className={`mt-2 font-normal ${inputCls}`} />
        </label>
      </div>

      {watchHours !== null && (
        <div className="mt-5 space-y-4" aria-live="polite">
          <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
            <p className="text-xs text-muted">Total watch time</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{fmt(watchHours)} hours</p>
            <p className="mt-1 text-sm text-muted">
              {fmt(watchHours * 60)} minutes · {pctOfThreshold !== null && pctOfThreshold < 100 ? `${pctOfThreshold.toFixed(1)}% of` : "past"} the
              4,000-hour Partner Program threshold
            </p>
          </div>

          {pctOfThreshold !== null && (
            <div className="rounded-xl bg-surface-2 px-4 py-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-accent-fill" style={{ width: `${pctOfThreshold}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted">
                {watchHours >= THRESHOLD_HOURS ? (
                  <>These views alone pass 4,000 public watch hours.</>
                ) : (
                  <>
                    At this average duration you&apos;d need about <strong className="text-foreground">{viewsFor4000 !== null ? fmt(viewsFor4000) : "—"} views</strong>{" "}
                    for 4,000 watch hours — {fmt(THRESHOLD_HOURS - watchHours)} hours to go from here.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Watch time = views × average view duration. YouTube&apos;s 4,000-hour requirement counts <strong>public</strong> watch hours in the
        last 365 days (Shorts feed views don&apos;t count toward it — Shorts have a separate 10M-views path). Your exact average view
        duration is in YouTube Studio under Analytics → Engagement.
      </p>
    </div>
  );
}
