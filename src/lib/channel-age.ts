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

/** Average month length in days (365.25 / 12). */
const MONTH_DAYS = 30.4375;

/**
 * Subscribers ÷ age in months (fractional, from whole UTC days). A channel under a month old counts as one
 * month, so a new channel doesn't show a huge per-month figure. Null when the creator hides the count.
 */
export function subscribersPerMonth(subscribers: number | null, hidden: boolean, created: Date, now: Date): number | null {
  if (hidden || subscribers === null) return null;
  const days = Math.max(0, Math.round((utcMidnight(now) - utcMidnight(created)) / DAY_MS));
  return subscribers / Math.max(1, days / MONTH_DAYS);
}

/** Total views ÷ public videos. Null when there are no public videos to divide by. */
export function averageViewsPerVideo(views: number, videoCount: number): number | null {
  return videoCount > 0 ? views / videoCount : null;
}
