"use client";

import { useId, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { fmt as tfmt } from "@/lib/widget-i18n";

const inputCls = "w-full field-pill px-4 py-3";

const THRESHOLD_HOURS = 4000;

function parseNum(v: string): number | null {
  // Strict: "50k" or "1e3" must error visibly, not silently become 50 or 1000.
  if (!/^[\d,.\s]*$/.test(v) || !v.trim()) return null;
  const n = Number.parseFloat(v.replace(/[,\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function WatchTimeCalculator() {
  const id = useId();
  const { intl, w } = useI18n();
  const t = w.watchTime;
  const [views, setViews] = useState("100,000");
  const [minutes, setMinutes] = useState("3");
  const [seconds, setSeconds] = useState("30");

  const fmt = (n: number, digits = 0) => n.toLocaleString(intl, { maximumFractionDigits: digits });

  const viewCount = parseNum(views);
  const avgSeconds = (parseNum(minutes) ?? 0) * 60 + (parseNum(seconds) ?? 0);

  // Per-field validation (WCAG 3.3.1): a typo must say so, not silently clear the result.
  const fieldErr = (v: string, example: string) => (v.trim() && parseNum(v) === null ? tfmt(t.numberError, { example }) : null);
  const errs = { v: fieldErr(views, "100,000"), m: fieldErr(minutes, "3"), s: fieldErr(seconds, "30") };

  const watchHours = viewCount !== null && avgSeconds > 0 ? (viewCount * avgSeconds) / 3600 : null;
  const viewsFor4000 = avgSeconds > 0 ? Math.ceil((THRESHOLD_HOURS * 3600) / avgSeconds) : null;
  const pctOfThreshold = watchHours !== null ? Math.min(100, (watchHours / THRESHOLD_HOURS) * 100) : null;

  const field = (key: "v" | "m" | "s", label: string, value: string, set: (v: string) => void) => (
    <label className="text-sm font-medium" htmlFor={`${id}-${key}`}>
      {label}
      <input
        id={`${id}-${key}`}
        type="text"
        inputMode="numeric"
        value={value}
        aria-invalid={Boolean(errs[key])}
        aria-describedby={errs[key] ? `${id}-${key}-err` : undefined}
        onChange={(e) => set(e.target.value)}
        className={`mt-2 font-normal ${inputCls}`}
      />
      {errs[key] && (
        <span id={`${id}-${key}-err`} className="mt-1 block text-sm font-medium text-bad">
          {errs[key]}
        </span>
      )}
    </label>
  );

  // needLine keeps the view count emphasized: split the template around {views}.
  const [needBefore, needAfter] = t.needLine.split("{views}");

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {field("v", t.views, views, setViews)}
        {field("m", t.minutesLabel, minutes, setMinutes)}
        {field("s", t.secondsLabel, seconds, setSeconds)}
      </div>

      {/* Always-mounted status: announces the one-line result, not the whole block. */}
      <p role="status" className="sr-only">
        {watchHours !== null
          ? watchHours >= THRESHOLD_HOURS
            ? tfmt(t.statusPast, { hours: fmt(watchHours) })
            : tfmt(t.statusAt, { hours: fmt(watchHours), pct: pctOfThreshold?.toFixed(1) ?? "0" })
          : ""}
      </p>

      {watchHours !== null && (
        <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-surface-2 px-4 py-4 text-center">
            <p className="text-xs text-muted">{t.totalLabel}</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{tfmt(t.hoursValue, { n: fmt(watchHours) })}</p>
            <p className="mt-1 text-sm text-muted">
              {pctOfThreshold !== null && pctOfThreshold < 100
                ? tfmt(t.minutesLinePct, { m: fmt(watchHours * 60), pct: pctOfThreshold.toFixed(1) })
                : tfmt(t.minutesLinePast, { m: fmt(watchHours * 60) })}
            </p>
          </div>

          {pctOfThreshold !== null && (
            <div className="rounded-xl bg-surface-2 px-4 py-4">
              <div aria-hidden="true" className="h-2 w-full overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-accent-fill" style={{ width: `${pctOfThreshold}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted">
                {watchHours >= THRESHOLD_HOURS ? (
                  <>{t.passLine}</>
                ) : (
                  <>
                    {tfmt(needBefore, { hours: fmt(THRESHOLD_HOURS - watchHours) })}
                    <strong className="text-foreground">{viewsFor4000 !== null ? fmt(viewsFor4000) : "—"}</strong>
                    {tfmt(needAfter ?? "", { hours: fmt(THRESHOLD_HOURS - watchHours) })}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">{t.explainer}</p>
    </div>
  );
}
