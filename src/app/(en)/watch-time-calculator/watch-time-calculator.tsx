"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import {
  avdFromRetention,
  defaultGoal,
  durationSeconds,
  formatDuration,
  formatInput,
  GOALS,
  needs8000Warning,
  parseNumber,
  percentViewed,
  perVideo,
  progress as progressOf,
  readShare,
  remainingViews,
  shareQuery,
  TABS,
  viewsFor,
  watchHours as hoursOf,
  WINDOW_DAYS,
  type Goal,
  type Progress,
  type ProgressFields,
  type RetentionFields,
  type Tab,
  type ViewsFields,
} from "@/lib/watch-time";
import { fmt as tfmt, type WidgetStrings } from "@/lib/widget-i18n";

type T = WidgetStrings["watchTime"];

const inputCls = "w-full field-pill px-4 py-3";
const boxCls = "rounded-xl bg-surface-2 px-4 py-4";
const THRESHOLD_HOURS = 4000;
const TAB_KEY = "cp:watch-time:tab";

// Example and starting values are numbers, written into the fields in the page language ("42,000" / "42.000").
const viewsStart = (intl: string): ViewsFields => ({ views: formatInput(100_000, intl), avdM: "3", avdS: "30", lenM: "", lenS: "", videos: "" });
const viewsExample = (intl: string): ViewsFields => ({ views: formatInput(42_000, intl), avdM: "5", avdS: "20", lenM: "12", lenS: "0", videos: "20" });
const VIEWS_EMPTY: ViewsFields = { views: "", avdM: "", avdS: "", lenM: "", lenS: "", videos: "" };
const progressExample = (intl: string): ProgressFields => ({ h12: formatInput(2850, intl), h28: "310", subs: "740", goal: defaultGoal() });
const progressEmpty = (): ProgressFields => ({ h12: "", h28: "", subs: "", goal: defaultGoal() });
const retentionExample = (intl: string): RetentionFields => ({ lenM: "14", lenS: "0", ret: "38", views: formatInput(60_000, intl), videos: "25" });
const RETENTION_EMPTY: RetentionFields = { lenM: "", lenS: "", ret: "", views: "", videos: "" };

/** A whole number of videos (2 or more makes a per-video split worth showing); null when empty or invalid. */
function videoCount(v: string, intl: string): number | null {
  const n = parseNumber(v, intl);
  return n !== null && Number.isInteger(n) && n >= 1 ? n : null;
}

function useFormat() {
  const { intl } = useI18n();
  return (n: number, digits = 0) => n.toLocaleString(intl, { maximumFractionDigits: digits });
}

/* ---------- Fields ---------- */

function FieldError({ id, msg }: { id: string; msg: string | null }) {
  return msg ? (
    <span id={id} className="mt-1 block text-sm font-medium text-bad">
      {msg}
    </span>
  ) : null;
}

function NumField(props: { id: string; label: string; hint?: string; optional?: boolean; value: string; onChange: (v: string) => void; error: string | null }) {
  const { w } = useI18n();
  const { id, label, hint, optional, value, onChange, error } = props;
  const described = [hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <label className="text-sm font-medium" htmlFor={id}>
      {label}
      {optional && <span className="font-normal text-muted"> {w.optional}</span>}
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={described}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 font-normal ${inputCls}`}
      />
      {hint && (
        <span id={`${id}-hint`} className="mt-1 block text-xs font-normal text-muted">
          {hint}
        </span>
      )}
      <FieldError id={`${id}-err`} msg={error} />
    </label>
  );
}

function DurationField(props: {
  id: string;
  legend: string;
  optional?: boolean;
  m: string;
  s: string;
  onM: (v: string) => void;
  onS: (v: string) => void;
  error: string | null;
  t: T;
}) {
  const { w } = useI18n();
  const { id, legend, optional, m, s, onM, onS, error, t } = props;
  return (
    <fieldset className="text-sm font-medium" aria-describedby={error ? `${id}-err` : undefined}>
      <legend>
        {legend}
        {optional && <span className="font-normal text-muted"> {w.optional}</span>}
      </legend>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={`${id}-m`}
          type="text"
          inputMode="numeric"
          aria-label={t.minutesSr}
          value={m}
          aria-invalid={Boolean(error)}
          onChange={(e) => onM(e.target.value)}
          className={`font-normal ${inputCls}`}
        />
        <span aria-hidden="true" className="text-lg font-bold text-muted">
          :
        </span>
        <input
          id={`${id}-s`}
          type="text"
          inputMode="numeric"
          aria-label={t.secondsSr}
          value={s}
          aria-invalid={Boolean(error)}
          onChange={(e) => onS(e.target.value)}
          className={`font-normal ${inputCls}`}
        />
      </div>
      <FieldError id={`${id}-err`} msg={error} />
    </fieldset>
  );
}

/** Error text for a field that has text but isn't a number. */
function useFieldError(t: T) {
  const { intl } = useI18n();
  return (v: string, example: number) => (v.trim() && parseNumber(v, intl) === null ? tfmt(t.numberError, { example: formatInput(example, intl) }) : null);
}
function durationError(t: T, m: string, s: string, example: string, intl: string) {
  return (m.trim() || s.trim()) && durationSeconds(m, s, intl) === null ? tfmt(t.numberError, { example }) : null;
}

/* ---------- Shared result pieces ---------- */

function NeededGrid({ avd, t, videos }: { avd: number; t: T; videos: number | null }) {
  const f = useFormat();
  const rows = [
    { label: t.views3000Label, value: viewsFor(3000, avd) },
    { label: t.views4000Label, value: viewsFor(4000, avd) },
    { label: t.views8000Label, value: viewsFor(8000, avd), note: t.views8000Note },
  ];
  return (
    <>
      <dl className="grid gap-4 sm:grid-cols-3">
        {rows.map(({ label, value, note }) => (
          <div key={label} className={`${boxCls} text-center`}>
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums">{value !== null ? f(value) : "—"}</dd>
            {note && <dd className="mt-1 text-xs text-muted">{note}</dd>}
          </div>
        ))}
      </dl>
      {videos !== null && videos >= 2 && (
        <div className={boxCls}>
          <p className="text-xs text-muted">{tfmt(t.perVideoTitle, { n: f(videos) })}</p>
          <dl className="mt-2 grid gap-2 sm:grid-cols-3">
            {GOALS.map((g) => {
              const v = viewsFor(g, avd);
              return (
                <div key={g} className="flex items-baseline justify-between gap-2 sm:block">
                  <dt className="text-sm text-muted">{tfmt(t.goalHours, { goal: f(g) })}</dt>
                  <dd className="text-lg font-bold tabular-nums">{v !== null ? f(perVideo(v, videos)) : "—"}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      )}
    </>
  );
}

function neededCopy(t: T, f: (n: number) => string, avd: number, videos: number | null): string[] {
  const [v3, v4, v8] = GOALS.map((g) => viewsFor(g, avd) ?? 0);
  const lines = [tfmt(t.copy.needed, { v3: f(v3), v4: f(v4), v8: f(v8) })];
  if (videos !== null && videos >= 2) lines.push(tfmt(t.copy.perVideo, { n: f(videos), v3: f(perVideo(v3, videos)), v4: f(perVideo(v4, videos)), v8: f(perVideo(v8, videos)) }));
  return lines;
}

/* ---------- Tab 1: views to hours ---------- */

function useViewsResult(fields: ViewsFields, t: T) {
  const { intl } = useI18n();
  const f = useFormat();
  const err = useFieldError(t);
  const errors = {
    views: err(fields.views, 100_000),
    avd: durationError(t, fields.avdM, fields.avdS, "3 : 30", intl),
    len: durationError(t, fields.lenM, fields.lenS, "10 : 00", intl),
    videos: fields.videos.trim() && videoCount(fields.videos, intl) === null ? tfmt(t.numberError, { example: "20" }) : null,
  };
  const views = parseNumber(fields.views, intl);
  const avd = durationSeconds(fields.avdM, fields.avdS, intl);
  const len = durationSeconds(fields.lenM, fields.lenS, intl);
  const videos = videoCount(fields.videos, intl);
  const hours = views !== null && avd !== null && avd > 0 ? hoursOf(views, avd) : null;
  const pctViewed = avd !== null && avd > 0 && len !== null && len > 0 ? percentViewed(avd, len) : null;
  // Views still needed for 4,000 hours at this duration; null once these views already get there.
  const remaining = hours !== null && avd !== null ? remainingViews(views!, avd, THRESHOLD_HOURS) : null;
  let copy: string | null = null;
  if (hours !== null && avd !== null) {
    const lines = [tfmt(t.copy.views, { views: f(views!), avd: formatDuration(avd), hours: f(hours) })];
    lines.push(remaining ? tfmt(t.needLine, { more: f(remaining.more), total: f(remaining.total) }) : t.passLine);
    if (pctViewed !== null) lines.push(tfmt(t.copy.pctViewed, { pct: f(pctViewed, 1), len: formatDuration(len!) }));
    lines.push(...neededCopy(t, f, avd, videos));
    copy = lines.join("\n");
  }
  return { errors, avd, hours, pctViewed, videos, remaining, copy };
}

function ViewsPanel({ fields, set, t }: { fields: ViewsFields; set: (f: Partial<ViewsFields>) => void; t: T }) {
  const id = useId();
  const f = useFormat();
  const r = useViewsResult(fields, t);
  const pct = r.hours !== null ? Math.min(100, (r.hours / THRESHOLD_HOURS) * 100) : null;
  // needLine keeps the remaining view count emphasized: split the template around {more}.
  const [needBefore, needAfter] = t.needLine.split("{more}");

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumField id={`${id}-v`} label={t.views} value={fields.views} onChange={(v) => set({ views: v })} error={r.errors.views} />
        <DurationField
          id={`${id}-avd`}
          legend={t.avdLegend}
          m={fields.avdM}
          s={fields.avdS}
          onM={(v) => set({ avdM: v })}
          onS={(v) => set({ avdS: v })}
          error={r.errors.avd}
          t={t}
        />
        <DurationField
          id={`${id}-len`}
          legend={t.lengthLegend}
          optional
          m={fields.lenM}
          s={fields.lenS}
          onM={(v) => set({ lenM: v })}
          onS={(v) => set({ lenS: v })}
          error={r.errors.len}
          t={t}
        />
        <NumField id={`${id}-n`} label={t.videosLabel} optional value={fields.videos} onChange={(v) => set({ videos: v })} error={r.errors.videos} />
      </div>

      <p role="status" className="sr-only">
        {r.hours !== null
          ? r.hours >= THRESHOLD_HOURS
            ? tfmt(t.statusPast, { hours: f(r.hours) })
            : tfmt(t.statusAt, { hours: f(r.hours), pct: f(pct ?? 0, 1) })
          : ""}
      </p>

      {r.hours !== null && r.avd !== null && (
        <div className="mt-5 space-y-4">
          <div className={`${boxCls} text-center`}>
            <p className="text-xs text-muted">{t.totalLabel}</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{tfmt(t.hoursValue, { n: f(r.hours) })}</p>
            <p className="mt-1 text-sm text-muted">
              {pct !== null && pct < 100 ? tfmt(t.minutesLinePct, { m: f(r.hours * 60), pct: f(pct, 1) }) : tfmt(t.minutesLinePast, { m: f(r.hours * 60) })}
            </p>
          </div>

          {pct !== null && (
            <div className={boxCls}>
              <div aria-hidden="true" className="h-2 w-full overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-accent-fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted">
                {!r.remaining ? (
                  <strong className="text-foreground">{t.passLine}</strong>
                ) : (
                  <>
                    {tfmt(needBefore, { total: f(r.remaining.total) })}
                    <strong className="text-foreground">{f(r.remaining.more)}</strong>
                    {tfmt(needAfter ?? "", { total: f(r.remaining.total) })}
                  </>
                )}
              </p>
            </div>
          )}

          {r.pctViewed !== null && (
            <div className={boxCls}>
              <p className="text-xs text-muted">{t.pctViewedLabel}</p>
              <p className="mt-1 text-xl font-bold tabular-nums">{f(r.pctViewed, 1)}%</p>
              <p className="mt-1 text-sm text-muted">{t.pctViewedNote}</p>
            </div>
          )}

          <NeededGrid avd={r.avd} t={t} videos={r.videos} />

          <p className={`${boxCls} text-sm text-muted`}>
            {tfmt(t.perDayLine, { perDay: f(r.hours / WINDOW_DAYS, 1), target: f(THRESHOLD_HOURS / WINDOW_DAYS, 0) })}
          </p>
        </div>
      )}
    </>
  );
}

/* ---------- Tab 2: track my progress ---------- */

function paceText(p: Progress, t: T, f: (n: number, d?: number) => string, intl: string): string | null {
  const pt = t.progress;
  const goal = f(p.goal);
  switch (p.pace.kind) {
    case "reached":
      return null;
    case "no_pace":
      return pt.paceMissing;
    case "zero":
      return pt.paceZero;
    case "plateau":
      return tfmt(pt.pacePlateau, { perDay: f(p.pace.perDay, 1), plateau: f(p.pace.plateau), goal, needed: f(p.pace.neededPerDay, 1) });
    case "too_slow":
      return tfmt(pt.paceTooSlow, { perDay: f(p.pace.perDay, 1), goal });
    case "date":
      return tfmt(pt.paceDate, { perDay: f(p.pace.perDay, 1), goal, date: new Intl.DateTimeFormat(intl, { dateStyle: "long" }).format(p.pace.date) });
  }
}

function useProgressResult(fields: ProgressFields, t: T) {
  const { intl } = useI18n();
  const f = useFormat();
  const err = useFieldError(t);
  const errors = { h12: err(fields.h12, 2850), h28: err(fields.h28, 310), subs: err(fields.subs, 740) };
  const h12 = parseNumber(fields.h12, intl);
  const h28 = fields.h28.trim() ? parseNumber(fields.h28, intl) : null;
  const subs = fields.subs.trim() ? parseNumber(fields.subs, intl) : null;
  const p = h12 !== null && !errors.h28 && !errors.subs ? progressOf(h12, h28, subs, fields.goal) : null;
  const pace = p ? paceText(p, t, f, intl) : null;
  let copy: string | null = null;
  if (p) {
    const lines = [
      p.reached
        ? tfmt(t.copy.reached, { hours: f(p.hours12), goal: f(p.goal) })
        : tfmt(t.copy.progress, { hours: f(p.hours12), goal: f(p.goal), pct: f(p.pct, 1), toGo: f(p.toGo) }),
    ];
    if (p.subscribers !== null) lines.push(tfmt(t.copy.subs, { subs: f(p.subscribers) }));
    if (p.perDayFor90 !== null) lines.push(tfmt(t.progress.per90, { n: f(p.perDayFor90, 1) }));
    if (pace && p.pace.kind !== "no_pace") lines.push(pace);
    if (needs8000Warning(p)) lines.push(t.progress.switchWarning);
    copy = lines.join("\n");
  }
  return { errors, p, pace, copy };
}

function ProgressPanel({ fields, set, t }: { fields: ProgressFields; set: (f: Partial<ProgressFields>) => void; t: T }) {
  const id = useId();
  const f = useFormat();
  const pt = t.progress;
  const { errors, p, pace } = useProgressResult(fields, t);
  const goalLabel: Record<Goal, string> = { 3000: pt.goals.g3000, 4000: pt.goals.g4000, 8000: pt.goals.g8000 };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumField id={`${id}-h12`} label={pt.h12Label} hint={pt.h12Hint} value={fields.h12} onChange={(v) => set({ h12: v })} error={errors.h12} />
        <NumField id={`${id}-h28`} label={pt.h28Label} hint={pt.h28Hint} optional value={fields.h28} onChange={(v) => set({ h28: v })} error={errors.h28} />
        <NumField id={`${id}-subs`} label={pt.subsLabel} optional value={fields.subs} onChange={(v) => set({ subs: v })} error={errors.subs} />
      </div>
      <fieldset className="mt-4">
        <legend className="text-sm font-medium">{pt.goalLegend}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {GOALS.map((g) => (
            <label
              key={g}
              className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${fields.goal === g ? "border-accent bg-surface-2" : "border-border hover:border-accent"}`}
            >
              <input type="radio" name={`${id}-goal`} className="mt-0.5 accent-[var(--accent)]" checked={fields.goal === g} onChange={() => set({ goal: g })} />
              <span>{goalLabel[g]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p role="status" className="sr-only">
        {p ? `${tfmt(pt.progressLine, { hours: f(p.hours12), goal: f(p.goal) })}, ${f(p.pct, 1)}%` : ""}
      </p>

      {!p ? (
        <p className={`mt-5 ${boxCls} text-sm text-muted`}>{pt.empty}</p>
      ) : (
        <div className="mt-5 space-y-4">
          <div className={boxCls}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-2xl font-black tabular-nums tracking-tight">{f(p.pct, 1)}%</p>
              <p className="text-sm text-muted tabular-nums">{tfmt(pt.progressLine, { hours: f(p.hours12), goal: f(p.goal) })}</p>
            </div>
            <div aria-hidden="true" className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full bg-accent-fill" style={{ width: `${p.pct}%` }} />
            </div>
            <p className="mt-3 text-sm font-medium">{p.reached ? pt.reached : tfmt(pt.toGo, { n: f(p.toGo) })}</p>
          </div>

          {p.subscribers !== null && p.subscribersPct !== null && (
            <div className={boxCls}>
              <p className="text-sm font-medium tabular-nums">
                {p.subscribersPct >= 100 ? tfmt(pt.subsReached, { subs: f(p.subscribers) }) : tfmt(pt.subsLine, { subs: f(p.subscribers) })}
              </p>
              <div aria-hidden="true" className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-accent-fill" style={{ width: `${p.subscribersPct}%` }} />
              </div>
            </div>
          )}

          {(p.perDayFor90 !== null || pace) && (
            <div className={`${boxCls} space-y-2 text-sm`}>
              {p.perDayFor90 !== null && <p>{tfmt(pt.per90, { n: f(p.perDayFor90, 1) })}</p>}
              {pace && <p className={p.pace.kind === "no_pace" ? "text-muted" : "font-medium"}>{pace}</p>}
              {needs8000Warning(p) && (
                <div className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2.5">
                  <p>{pt.switchWarning}</p>
                  <button
                    type="button"
                    onClick={() => set({ goal: 8000 })}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium transition hover:border-accent"
                  >
                    {pt.switchButton}
                  </button>
                </div>
              )}
            </div>
          )}

          <p className="text-xs leading-relaxed text-muted">{pt.note}</p>
        </div>
      )}
    </>
  );
}

/* ---------- Tab 3: length × retention ---------- */

function useRetentionResult(fields: RetentionFields, t: T) {
  const { intl } = useI18n();
  const f = useFormat();
  const err = useFieldError(t);
  const retNum = parseNumber(fields.ret, intl);
  const errors = {
    len: durationError(t, fields.lenM, fields.lenS, "10 : 00", intl),
    ret: fields.ret.trim() && (retNum === null || retNum <= 0) ? tfmt(t.numberError, { example: "40" }) : null,
    views: err(fields.views, 60_000),
    videos: fields.videos.trim() && videoCount(fields.videos, intl) === null ? tfmt(t.numberError, { example: "25" }) : null,
  };
  const len = durationSeconds(fields.lenM, fields.lenS, intl);
  const views = parseNumber(fields.views, intl);
  const videos = videoCount(fields.videos, intl);
  const avd = len !== null && len > 0 && retNum !== null && retNum > 0 ? avdFromRetention(len, retNum) : null;
  const hours = avd !== null && views !== null ? hoursOf(views, avd) : null;
  let copy: string | null = null;
  if (avd !== null) {
    const lines = [tfmt(t.copy.retention, { len: formatDuration(len!), ret: f(retNum!, 1), avd: formatDuration(avd) })];
    if (hours !== null) lines.push(tfmt(t.copy.views, { views: f(views!), avd: formatDuration(avd), hours: f(hours) }));
    lines.push(...neededCopy(t, f, avd, videos));
    copy = lines.join("\n");
  }
  return { errors, avd, hours, videos, copy };
}

function RetentionPanel({ fields, set, t }: { fields: RetentionFields; set: (f: Partial<RetentionFields>) => void; t: T }) {
  const id = useId();
  const f = useFormat();
  const rt = t.retention;
  const r = useRetentionResult(fields, t);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <DurationField
          id={`${id}-len`}
          legend={t.lengthLegend}
          m={fields.lenM}
          s={fields.lenS}
          onM={(v) => set({ lenM: v })}
          onS={(v) => set({ lenS: v })}
          error={r.errors.len}
          t={t}
        />
        <NumField id={`${id}-ret`} label={rt.retLabel} value={fields.ret} onChange={(v) => set({ ret: v })} error={r.errors.ret} />
        <NumField id={`${id}-v`} label={t.views} value={fields.views} onChange={(v) => set({ views: v })} error={r.errors.views} />
        <NumField id={`${id}-n`} label={t.videosLabel} optional value={fields.videos} onChange={(v) => set({ videos: v })} error={r.errors.videos} />
      </div>

      <p role="status" className="sr-only">
        {r.avd !== null ? `${rt.avdLabel}: ${formatDuration(r.avd)}${r.hours !== null ? `, ${tfmt(t.hoursValue, { n: f(r.hours) })}` : ""}` : ""}
      </p>

      {r.avd === null ? (
        <p className={`mt-5 ${boxCls} text-sm text-muted`}>{rt.empty}</p>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`${boxCls} text-center`}>
              <p className="text-xs text-muted">{rt.avdLabel}</p>
              <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{formatDuration(r.avd)}</p>
            </div>
            <div className={`${boxCls} text-center`}>
              <p className="text-xs text-muted">{t.totalLabel}</p>
              <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">{r.hours !== null ? tfmt(t.hoursValue, { n: f(r.hours) }) : "—"}</p>
            </div>
          </div>
          <NeededGrid avd={r.avd} t={t} videos={r.videos} />
        </div>
      )}
    </>
  );
}

/* ---------- Tabs, actions and state ---------- */

function TabList({ tab, onChange, t, ids }: { tab: Tab; onChange: (t: Tab) => void; t: T; ids: Record<Tab, { tab: string; panel: string }> }) {
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ views: null, progress: null, retention: null });
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = TABS.indexOf(tab);
    const next = e.key === "ArrowRight" ? TABS[(i + 1) % TABS.length] : e.key === "ArrowLeft" ? TABS[(i + TABS.length - 1) % TABS.length] : e.key === "Home" ? TABS[0] : e.key === "End" ? TABS[TABS.length - 1] : null;
    if (!next) return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  }
  return (
    <div role="tablist" aria-label={t.tabsLabel} onKeyDown={onKey} className="flex flex-wrap gap-1 rounded-2xl bg-surface-2 p-1">
      {TABS.map((k) => (
        <button
          key={k}
          ref={(el) => {
            refs.current[k] = el;
          }}
          type="button"
          role="tab"
          id={ids[k].tab}
          aria-selected={tab === k}
          aria-controls={ids[k].panel}
          tabIndex={tab === k ? 0 : -1}
          onClick={() => onChange(k)}
          className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition ${tab === k ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
        >
          {t.tabs[k]}
        </button>
      ))}
    </div>
  );
}

function readTab(): Tab | null {
  try {
    const v = localStorage.getItem(TAB_KEY);
    return v && (TABS as string[]).includes(v) ? (v as Tab) : null;
  } catch {
    return null;
  }
}
function saveTab(tab: Tab) {
  try {
    localStorage.setItem(TAB_KEY, tab);
  } catch {
    // Storage unavailable: the tab just isn't remembered.
  }
}

export function WatchTimeCalculator() {
  const id = useId();
  const { w, intl } = useI18n();
  const t = w.watchTime;
  const [tab, setTab] = useState<Tab>("views");
  const [views, setViews] = useState<ViewsFields>(() => viewsStart(intl));
  const [prog, setProg] = useState<ProgressFields>(progressEmpty);
  const [ret, setRet] = useState<RetentionFields>(RETENTION_EMPTY);

  // On first load: a share link (?tab=…) wins; otherwise reopen the last-used tab. Both live in the browser only.
  useEffect(() => {
    const shared = readShare(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- syncing once from the URL / localStorage (external) on mount */
    if (shared) {
      setTab(shared.tab);
      // Links carry plain numbers; show them in the page language.
      const local = <F extends object>(o: F): F =>
        Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === "string" && /^\d+(\.\d+)?$/.test(v) ? formatInput(Number(v), intl) : v])) as F;
      if (shared.views) setViews(local({ ...VIEWS_EMPTY, ...shared.views }));
      if (shared.progress) setProg(local({ ...progressEmpty(), ...shared.progress }));
      if (shared.retention) setRet(local({ ...RETENTION_EMPTY, ...shared.retention }));
    } else {
      const last = readTab();
      if (last) setTab(last);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [intl]);

  function changeTab(next: Tab) {
    setTab(next);
    saveTab(next);
  }

  const viewsR = useViewsResult(views, t);
  const progR = useProgressResult(prog, t);
  const retR = useRetentionResult(ret, t);
  const copyBody = tab === "views" ? viewsR.copy : tab === "progress" ? progR.copy : retR.copy;
  const copyText = copyBody ? `${copyBody}\n${t.copy.footer}` : null;
  const base = typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}`;
  const shareUrl = `${base}${shareQuery(tab, { views, progress: prog, retention: ret }, intl)}`;

  const ids = Object.fromEntries(TABS.map((k) => [k, { tab: `${id}-tab-${k}`, panel: `${id}-panel-${k}` }])) as Record<Tab, { tab: string; panel: string }>;

  function example() {
    if (tab === "views") setViews(viewsExample(intl));
    else if (tab === "progress") setProg(progressExample(intl));
    else setRet(retentionExample(intl));
  }
  function clear() {
    if (tab === "views") setViews(VIEWS_EMPTY);
    else if (tab === "progress") setProg(progressEmpty());
    else setRet(RETENTION_EMPTY);
  }

  let panel: ReactNode;
  if (tab === "views") panel = <ViewsPanel fields={views} set={(p) => setViews((s) => ({ ...s, ...p }))} t={t} />;
  else if (tab === "progress") panel = <ProgressPanel fields={prog} set={(p) => setProg((s) => ({ ...s, ...p }))} t={t} />;
  else panel = <RetentionPanel fields={ret} set={(p) => setRet((s) => ({ ...s, ...p }))} t={t} />;

  const btn = "inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition hover:border-accent";

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 text-left shadow-panel sm:p-6">
      <TabList tab={tab} onChange={changeTab} t={t} ids={ids} />

      <div role="tabpanel" id={ids[tab].panel} aria-labelledby={ids[tab].tab} className="mt-5">
        {panel}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button type="button" onClick={example} className={btn}>
          {t.actions.example}
        </button>
        <button type="button" onClick={clear} className={btn}>
          {t.actions.clear}
        </button>
        {copyText && <CopyButton text={copyText} label={t.actions.copyResult} />}
        <CopyButton text={shareUrl} label={t.actions.copyLink} ariaLabel={t.actions.copyLinkAria} />
        <Link
          href="/revenue-calculator/channel-earnings-estimator"
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-fill px-3.5 py-2 text-sm font-medium text-white transition hover:bg-accent-fill-strong"
        >
          {t.actions.estimateEarnings} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {tab !== "progress" && <p className="mt-4 text-xs leading-relaxed text-muted">{t.explainer}</p>}
    </div>
  );
}
