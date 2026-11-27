/**
 * Calendar age between two instants, counted on UTC dates (the creation time is shown in UTC too).
 * Whole years and months first, then the leftover days. Adding months clamps to the end of a short
 * month, so a channel made on Jan 31 is 1 month old on Feb 28 (or Feb 29), and one made on Feb 29 is
 * 1 year old on Feb 28 of the next non-leap year.
 */
export interface Age {
  years: number;
  months: number;
  days: number;
}

const DAY_MS = 86_400_000;

function utcMidnight(d: Date) {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** `from` moved forward by `n` calendar months, day clamped to the target month's length (UTC midnight). */
function addMonths(from: Date, n: number) {
  const total = from.getUTCMonth() + n;
  const year = from.getUTCFullYear() + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return Date.UTC(year, month, Math.min(from.getUTCDate(), lastDay));
}

export function channelAge(created: Date, now: Date): Age {
  const end = utcMidnight(now);
  if (end <= utcMidnight(created)) return { years: 0, months: 0, days: 0 };
  let months = (now.getUTCFullYear() - created.getUTCFullYear()) * 12 + (now.getUTCMonth() - created.getUTCMonth());
  while (months > 0 && addMonths(created, months) > end) months -= 1;
  const days = Math.round((end - addMonths(created, months)) / DAY_MS);
  return { years: Math.floor(months / 12), months: months % 12, days };
}

const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** "18 years, 8 months, 6 days". Zero parts are left out; a channel made today is "0 days". */
export function formatAge({ years, months, days }: Age): string {
  const parts = [years && unit(years, "year"), months && unit(months, "month"), days && unit(days, "day")].filter(Boolean);
  return parts.length ? parts.join(", ") : "0 days";
}

/** One unit's wording per plural category ("one", "other", and "few"/"many" where a language has them). */
export type UnitWords = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
export interface AgeUnits {
  year: UnitWords;
  month: UnitWords;
  day: UnitWords;
}

/** Fills "{n}" in the right plural form for the locale ("1 year" / "2 years", "1 Jahr" / "2 Jahre", "1年"). */
export function pluralUnit(n: number, words: UnitWords, intl: string): string {
  const form = words[new Intl.PluralRules(intl).select(n)] ?? words.other;
  return form.replace("{n}", n.toLocaleString(intl));
}

/**
 * formatAge in any language: plural-correct units joined the way the language lists them
 * ("18 years, 8 months, 6 days", "18 Jahre, 8 Monate und 6 Tage", "18年 8か月 6日"). Zero parts are left out.
 */
export function formatAgeIn({ years, months, days }: Age, units: AgeUnits, intl: string): string {
  const parts = [years && pluralUnit(years, units.year, intl), months && pluralUnit(months, units.month, intl), days && pluralUnit(days, units.day, intl)].filter(
    (x): x is string => Boolean(x),
  );
  if (!parts.length) return pluralUnit(0, units.day, intl);
  return new Intl.ListFormat(intl, { type: "unit", style: "long" }).format(parts);
}

/** Whole UTC days from creation to now (0 for today or a future date). */
export function totalDays(created: Date, now: Date): number {
  return Math.max(0, Math.round((utcMidnight(now) - utcMidnight(created)) / DAY_MS));
}

/**
 * YouTube returns 1970-01-01T00:00:00Z (the Unix epoch) for some channels, e.g. its own @YouTube channel.
 * Anything before 2005, the year YouTube launched, is a placeholder, not a real creation date.
 */
export function isPlaceholderDate(created: Date): boolean {
  return Number.isNaN(created.getTime()) || created.getUTCFullYear() < 2005;
}

/** The channel's creation year, or null when YouTube gave a placeholder (see isPlaceholderDate). */
export function creationYear(iso: string): number | null {
  const d = new Date(iso);
  return isPlaceholderDate(d) ? null : d.getUTCFullYear();
}

/** "Mar 2008" (UTC), or null when YouTube gave a placeholder date. */
export function formatCreatedMonth(iso: string): string | null {
  const d = new Date(iso);
  return isPlaceholderDate(d) ? null : d.toLocaleDateString("en", { year: "numeric", month: "short", timeZone: "UTC" });
}

/** Average month length in days (365.25 / 12). */
const MONTH_DAYS = 30.4375;

/**
 * Subscribers ÷ age in months (fractional, from whole UTC days). A channel under a month old counts as one
 * month, so a new channel doesn't show a huge per-month figure. Null when the creator hides the count.
 */
export function subscribersPerMonth(subscribers: number | null, hidden: boolean, created: Date, now: Date): number | null {
  if (hidden || subscribers === null) return null;
  return subscribers / Math.max(1, totalDays(created, now) / MONTH_DAYS);
}

/** Total views ÷ public videos. Null when there are no public videos to divide by. */
export function averageViewsPerVideo(views: number, videoCount: number): number | null {
  return videoCount > 0 ? views / videoCount : null;
}
