import { YPP_2027_CHANGE } from "@/lib/monetization";

/**
 * Watch time calculator maths (pure and browser-safe, so it can be unit tested).
 * Watch hours = views × average view duration ÷ 3,600 seconds.
 */

export const GOALS = [3000, 4000, 8000] as const;
export type Goal = (typeof GOALS)[number];
export const SUBSCRIBER_TARGET = 1000;
export const WINDOW_DAYS = 365;
export const PACE_DAYS = 28;
export const SPRINT_DAYS = 90;
/** Projections further out than this are reported as "more than 5 years", never as a date. */
export const MAX_PROJECTION_DAYS = 5 * 365;

const DAY_MS = 86_400_000;

/** 4,000 hours until January 31, 2027 23:59:59 UTC, then 8,000 (the monetization checker's switch date). */
export function defaultGoal(now = new Date()): Goal {
  return now.getTime() < YPP_2027_CHANGE ? 4000 : 8000;
}

export const isGoal = (n: number): n is Goal => (GOALS as readonly number[]).includes(n);

/** Strict number parsing: "50k" or "1e3" must error visibly, not silently become 50 or 1000. Empty → null. */
export function parseNumber(v: string): number | null {
  if (!/^[\d,.\s]*$/.test(v) || !v.trim()) return null;
  const n = Number.parseFloat(v.replace(/[,\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Seconds from separate minutes and seconds fields; null when both are empty or either is invalid. */
export function durationSeconds(minutes: string, seconds: string): number | null {
  if (!minutes.trim() && !seconds.trim()) return null;
  const m = minutes.trim() ? parseNumber(minutes) : 0;
  const s = seconds.trim() ? parseNumber(seconds) : 0;
  if (m === null || s === null) return null;
  return m * 60 + s;
}

export const watchHours = (views: number, avdSeconds: number) => (views * avdSeconds) / 3600;

/** Views needed to reach `hours` at a given average view duration (rounded up). */
export const viewsFor = (hours: number, avdSeconds: number) => (avdSeconds > 0 ? Math.ceil((hours * 3600) / avdSeconds) : null);

/**
 * Views still needed for a goal at the same average view duration: { more, total }, or null once the
 * current views already reach it (so the result never shows a negative number).
 */
export function remainingViews(views: number, avdSeconds: number, goal: number): { more: number; total: number } | null {
  const total = viewsFor(goal, avdSeconds);
  if (total === null || watchHours(views, avdSeconds) >= goal) return null;
  return { more: Math.max(1, total - Math.floor(views)), total };
}

/** Views each video needs when the total is spread evenly across `videos` videos (rounded up). */
export const perVideo = (views: number, videos: number) => Math.ceil(views / videos);

/** Average % viewed = average view duration ÷ video length. Can pass 100% when people rewatch. */
export const percentViewed = (avdSeconds: number, lengthSeconds: number) => (avdSeconds / lengthSeconds) * 100;

/** Average view duration from a video length and an average retention percentage. */
export const avdFromRetention = (lengthSeconds: number, retentionPct: number) => (lengthSeconds * retentionPct) / 100;

/** "4:15", or "1:02:05" past an hour. */
export function formatDuration(totalSeconds: number): string {
  const t = Math.round(totalSeconds);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const pad = (x: number) => String(x).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export type PaceOutcome =
  /** The goal is already reached. */
  | { kind: "reached" }
  /** No last-28-days figure was entered. */
  | { kind: "no_pace" }
  /** Zero hours in the last 28 days. */
  | { kind: "zero"; perDay: number }
  /**
   * The rolling 12-month total levels off at about pace × 365. If that's below the goal,
   * the goal is never reached at this pace, so no date is shown.
   */
  | { kind: "plateau"; perDay: number; plateau: number; neededPerDay: number }
  /** Reachable in principle, but more than 5 years away. */
  | { kind: "too_slow"; perDay: number }
  /** `afterSwitch`: the date falls on or after February 1, 2027, when new applicants need 8,000 hours. */
  | { kind: "date"; perDay: number; date: Date; days: number; afterSwitch: boolean };

/** Show the "that's after February 1, 2027" warning: a 4,000-hour goal projected to land on or after the switch. */
export const needs8000Warning = (p: Progress) => p.goal === 4000 && p.pace.kind === "date" && p.pace.afterSwitch;

export interface Progress {
  goal: Goal;
  hours12: number;
  pct: number;
  toGo: number;
  reached: boolean;
  /** Hours a day needed to close the gap in 90 days; null once reached. */
  perDayFor90: number | null;
  subscribers: number | null;
  subscribersPct: number | null;
  pace: PaceOutcome;
}

export function progress(hours12: number, hours28: number | null, subscribers: number | null, goal: Goal, now = new Date()): Progress {
  const toGo = Math.max(0, goal - hours12);
  const reached = toGo === 0;
  let pace: PaceOutcome;
  if (reached) pace = { kind: "reached" };
  else if (hours28 === null) pace = { kind: "no_pace" };
  else {
    const perDay = hours28 / PACE_DAYS;
    const plateau = perDay * WINDOW_DAYS;
    if (perDay <= 0) pace = { kind: "zero", perDay };
    else if (plateau < goal) pace = { kind: "plateau", perDay, plateau, neededPerDay: goal / WINDOW_DAYS };
    else {
      const days = Math.ceil(toGo / perDay);
      const date = new Date(now.getTime() + days * DAY_MS);
      pace = days > MAX_PROJECTION_DAYS ? { kind: "too_slow", perDay } : { kind: "date", perDay, days, date, afterSwitch: date.getTime() >= YPP_2027_CHANGE };
    }
  }
  return {
    goal,
    hours12,
    pct: Math.min(100, (hours12 / goal) * 100),
    toGo,
    reached,
    perDayFor90: reached ? null : toGo / SPRINT_DAYS,
    subscribers,
    subscribersPct: subscribers === null ? null : Math.min(100, (subscribers / SUBSCRIBER_TARGET) * 100),
    pace,
  };
}

/* ---------- Share links ---------- */

export type Tab = "views" | "progress" | "retention";
export const TABS: Tab[] = ["views", "progress", "retention"];

export interface ViewsFields {
  views: string;
  avdM: string;
  avdS: string;
  lenM: string;
  lenS: string;
  videos: string;
}
export interface ProgressFields {
  h12: string;
  h28: string;
  subs: string;
  goal: Goal;
}
export interface RetentionFields {
  lenM: string;
  lenS: string;
  ret: string;
  views: string;
  videos: string;
}

/** Query parameter names used by share links (also the list for GA redaction). */
export const SHARE_PARAMS = ["tab", "views", "avd", "len", "videos", "h12", "h28", "subs", "goal", "ret"] as const;

const clean = (v: string) => v.replace(/[,\s]/g, "");

/** "3" + "30" → "3:30"; empty when both are empty. */
function joinMS(m: string, s: string): string {
  if (!m.trim() && !s.trim()) return "";
  return `${clean(m) || "0"}:${(clean(s) || "0").padStart(2, "0")}`;
}

/** "3:30" → ["3", "30"]; "4" → ["4", ""]; invalid → null. */
function splitMS(v: string | null): [string, string] | null {
  if (!v) return null;
  const m = /^(\d{1,4})(?::(\d{1,2}))?$/.exec(v.trim());
  return m ? [m[1], m[2] ? String(Number(m[2])) : ""] : null;
}

const num = (v: string | null) => (v && /^\d+(\.\d+)?$/.test(v) ? v : null);

function query(pairs: [string, string][]): string {
  const p = pairs.filter(([, v]) => v !== "");
  return "?" + p.map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%3A/g, ":")}`).join("&");
}

export function shareQuery(tab: Tab, f: { views: ViewsFields; progress: ProgressFields; retention: RetentionFields }): string {
  if (tab === "views") {
    const v = f.views;
    return query([["tab", "views"], ["views", clean(v.views)], ["avd", joinMS(v.avdM, v.avdS)], ["len", joinMS(v.lenM, v.lenS)], ["videos", clean(v.videos)]]);
  }
  if (tab === "progress") {
    const p = f.progress;
    return query([["tab", "progress"], ["h12", clean(p.h12)], ["h28", clean(p.h28)], ["subs", clean(p.subs)], ["goal", String(p.goal)]]);
  }
  const r = f.retention;
  return query([["tab", "retention"], ["len", joinMS(r.lenM, r.lenS)], ["ret", clean(r.ret)], ["views", clean(r.views)], ["videos", clean(r.videos)]]);
}

export interface SharedState {
  tab: Tab;
  views?: Partial<ViewsFields>;
  progress?: Partial<ProgressFields>;
  retention?: Partial<RetentionFields>;
}

/** Reads a share link. Returns null when the address has no calculator parameters. Bad values are ignored. */
export function readShare(search: string): SharedState | null {
  const q = new URLSearchParams(search);
  const tab = q.get("tab");
  if (!tab || !(TABS as string[]).includes(tab)) return null;
  const len = splitMS(q.get("len"));
  if (tab === "views") {
    const avd = splitMS(q.get("avd"));
    const out: Partial<ViewsFields> = {};
    if (num(q.get("views"))) out.views = q.get("views")!;
    if (avd) [out.avdM, out.avdS] = avd;
    if (len) [out.lenM, out.lenS] = len;
    if (num(q.get("videos"))) out.videos = q.get("videos")!;
    return { tab, views: out };
  }
  if (tab === "progress") {
    const out: Partial<ProgressFields> = {};
    if (num(q.get("h12"))) out.h12 = q.get("h12")!;
    if (num(q.get("h28"))) out.h28 = q.get("h28")!;
    if (num(q.get("subs"))) out.subs = q.get("subs")!;
    const g = Number(q.get("goal"));
    if (isGoal(g)) out.goal = g;
    return { tab, progress: out };
  }
  const out: Partial<RetentionFields> = {};
  if (len) [out.lenM, out.lenS] = len;
  if (num(q.get("ret"))) out.ret = q.get("ret")!;
  if (num(q.get("views"))) out.views = q.get("views")!;
  if (num(q.get("videos"))) out.videos = q.get("videos")!;
  return { tab: "retention", retention: out };
}
