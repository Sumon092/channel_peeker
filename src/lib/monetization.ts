import type { ChannelSummary } from "@/lib/youtube/types";

/**
 * Monetization eligibility (analytics hub). YouTube does not publish whether a
 * channel is monetized, so we never output a yes/no. We check every public YPP
 * requirement per tier and mark the private ones as not public (see /methodology).
 * Everything here is pure and browser-safe: the API returns statuses and raw
 * data, and the widget renders the text in the page's language.
 *
 * YPP thresholds (support.google.com/youtube/answer/72851, /12843009):
 * - Fan funding tier (some countries only): 500 subscribers, 3 public uploads in
 *   the last 90 days, plus 3,000 watch hours in 365 days OR 3M Shorts views in 90 days.
 * - Ad revenue tier: 1,000 subscribers, plus 4,000 watch hours OR 10M Shorts views.
 *   From Feb 1, 2027 new applicants need 8,000 watch hours OR 20M Shorts views.
 * - From Feb 1, 2027 monetized channels must also stay active (shown as information).
 */

export const YPP_FULL_SUBS = 1000;
export const YPP_STARTER_SUBS = 500;
export const ACTIVITY_WINDOW_DAYS = 90;
export const ACTIVITY_MIN_UPLOADS = 3;
/** The recent-uploads lookup reads at most this many uploads (one playlistItems page). */
export const RECENT_UPLOADS_LIMIT = 50;

/** Feb 1, 2027 00:00 UTC: new ad revenue thresholds and the stay-active rule take effect. */
export const YPP_2027_CHANGE = Date.UTC(2027, 1, 1);

const DAY_MS = 86_400_000;

/** Anchor of the requirements section on the English page (the widget's countdown links to it). */
export const REQUIREMENTS_2027_ID = "requirements-2027";

/** ISO 3166-1 alpha-2 codes where the YouTube Partner Program is available (support.google.com/youtube/answer/7101720, checked November 2026). */
export const YPP_COUNTRIES = new Set([
  "DZ", "AS", "AI", "AR", "AM", "AW", "AZ", "AU", "AT", "BH", "BD", "BM", "BE", "BO", "BA", "BR", "IO", "VG", "BG", "KH",
  "CA", "KY", "CL", "CO", "CR", "HR", "CY", "CZ", "DK", "DO", "EC", "EG", "SV", "EE", "FK", "FO", "FI", "FR", "GF", "PF",
  "GE", "DE", "GH", "GI", "GR", "GL", "GT", "GP", "GU", "HN", "HK", "HU", "IS", "IN", "ID", "IQ", "IL", "IT", "JM", "JP",
  "JO", "KZ", "KE", "KW", "LA", "LV", "LB", "LY", "LI", "LT", "LU", "MK", "MY", "MT", "MQ", "YT", "MX", "MD", "ME", "MS",
  "MA", "NP", "NL", "NC", "NZ", "NI", "NG", "NF", "NO", "MP", "OM", "PK", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "PR",
  "QA", "IE", "RE", "RO", "SH", "PM", "SN", "RS", "SG", "SA", "SK", "SI", "ZA", "KR", "ES", "LK", "SJ", "SE", "CH", "TW",
  "TZ", "TH", "TN", "TR", "TC", "UG", "UA", "AE", "GB", "US", "VI", "UY", "VE", "VN", "WF", "EH", "YE", "ZW",
]);

export type SignalStatus = "pass" | "warn" | "fail" | "unknown";
export type CheckId = "subscribers" | "country" | "uploads" | "made_for_kids" | "watch_time";
export interface Check {
  id: CheckId;
  status: SignalStatus;
}
export type TierVerdict = "met" | "partial" | "not_yet" | "unclear";
export interface Tier {
  verdict: TierVerdict;
  checks: Check[];
}

export interface Rules {
  /** "current" until Jan 31, 2027; "2027" from Feb 1, 2027 00:00 UTC. */
  era: "current" | "2027";
  adWatchHours: number;
  adShortsViews: number;
  /** Whole days (rounded up) until Feb 1, 2027; null once it has passed. */
  daysUntilChange: number | null;
}

export function rulesAt(now: Date): Rules {
  const left = YPP_2027_CHANGE - now.getTime();
  return left > 0
    ? { era: "current", adWatchHours: 4000, adShortsViews: 10_000_000, daysUntilChange: Math.ceil(left / DAY_MS) }
    : { era: "2027", adWatchHours: 8000, adShortsViews: 20_000_000, daysUntilChange: null };
}

function subscribersStatus(c: ChannelSummary, min: number): SignalStatus {
  if (c.subscribersHidden || c.subscribers === null) return "unknown";
  return c.subscribers >= min ? "pass" : "fail";
}

function countryStatus(c: ChannelSummary): SignalStatus {
  if (!c.country) return "unknown";
  return YPP_COUNTRIES.has(c.country) ? "pass" : "fail";
}

/** Made for kids: fan funding has nothing to unlock (no memberships, Supers or Shopping); ads still run, non-personalized. */
function madeForKidsStatus(c: ChannelSummary, tier: "fan" | "ad"): SignalStatus {
  if (c.madeForKids === null) return "unknown";
  if (!c.madeForKids) return "pass";
  return tier === "fan" ? "fail" : "warn";
}

/** A tier's verdict from its public checks; private ones (watch time) never count either way. */
export function tierVerdict(checks: Check[]): TierVerdict {
  const pub = checks.filter((c) => c.id !== "watch_time");
  if (pub.some((c) => c.status === "fail")) return "not_yet";
  if (pub.find((c) => c.id === "subscribers")?.status === "unknown") return "unclear";
  if (pub.every((c) => c.status === "pass")) return "met";
  return "partial";
}

export interface MonetizationReport {
  tiers: { fan: Tier; ad: Tier };
  rules: Rules;
  /** Public uploads in the last 90 days (long videos and Shorts combined). */
  recentUploads: number;
  /** True when the lookup limit was hit inside the window, so the real count may be higher. */
  recentUploadsCapped: boolean;
}

export function buildMonetizationReport(c: ChannelSummary, uploadDates: string[], now = new Date()): MonetizationReport {
  const cutoff = now.getTime() - ACTIVITY_WINDOW_DAYS * DAY_MS;
  const inWindow = uploadDates.filter((d) => Date.parse(d) >= cutoff);
  const recentUploads = c.videoCount === 0 ? 0 : inWindow.length;
  const recentUploadsCapped = uploadDates.length >= RECENT_UPLOADS_LIMIT && inWindow.length === uploadDates.length;

  const watchTime: Check = { id: "watch_time", status: "unknown" };
  const fanChecks: Check[] = [
    { id: "subscribers", status: subscribersStatus(c, YPP_STARTER_SUBS) },
    { id: "uploads", status: recentUploads >= ACTIVITY_MIN_UPLOADS ? "pass" : "fail" },
    { id: "country", status: countryStatus(c) },
    { id: "made_for_kids", status: madeForKidsStatus(c, "fan") },
    watchTime,
  ];
  // Ad revenue tier: deliberately no recent-uploads requirement.
  const adChecks: Check[] = [
    { id: "subscribers", status: subscribersStatus(c, YPP_FULL_SUBS) },
    { id: "country", status: countryStatus(c) },
    { id: "made_for_kids", status: madeForKidsStatus(c, "ad") },
    watchTime,
  ];
  return {
    tiers: {
      fan: { verdict: tierVerdict(fanChecks), checks: fanChecks },
      ad: { verdict: tierVerdict(adChecks), checks: adChecks },
    },
    rules: rulesAt(now),
    recentUploads,
    recentUploadsCapped,
  };
}

/**
 * 2027 stay-active rule, upload path only (2 long videos or 5 Shorts per 90 days).
 * Public data can't reliably split long videos from Shorts, so we judge the total:
 * 5+ uploads cover it either way, 2–4 only if at least 2 are long videos.
 */
export type ActivityPath = "enough_any" | "enough_if_long" | "not_enough";
export function activityPath(recentUploads: number): ActivityPath {
  if (recentUploads >= 5) return "enough_any";
  if (recentUploads >= 2) return "enough_if_long";
  return "not_enough";
}

export interface SelfCheck {
  join: boolean;
  store: boolean;
  supers: boolean;
  ads: boolean;
}

export type Confidence = "very_likely" | "possibly" | "possibly_fan" | "unlikely" | "cant_tell";

/**
 * Combines what the visitor sees on YouTube with the public checks, in this order:
 * - very likely: a Partner Program-only feature (Join, Store, Super Thanks) and the ad tier's public checks are met;
 * - unlikely: under 500 subscribers (no feature can override that);
 * - possibly (fan funding): a Partner Program-only feature at 500–999 subscribers, where only fan funding is open;
 * - possibly: only ads ticked, or the ad tier's public checks met with nothing ticked;
 * - can't tell: anything else, including made-for-kids channels with nothing ticked.
 */
export function confidence(
  c: { subscribers: number | null; subscribersHidden: boolean },
  adTier: TierVerdict,
  s: SelfCheck,
): Confidence {
  const strong = s.join || s.store || s.supers;
  const subs = c.subscribersHidden ? null : c.subscribers;
  if (strong && adTier === "met") return "very_likely";
  if (subs !== null && subs < YPP_STARTER_SUBS) return "unlikely";
  if (strong && subs !== null && subs < YPP_FULL_SUBS) return "possibly_fan";
  if ((s.ads && !strong) || (adTier === "met" && !strong && !s.ads)) return "possibly";
  return "cant_tell";
}

/** Public subscriber count to three significant figures, the precision YouTube publishes (1,234 → "≈ 1.23K"). */
export function formatSubscriberCount(n: number, intl = "en"): string {
  return n >= 1000
    ? `≈ ${new Intl.NumberFormat(intl, { notation: "compact", maximumSignificantDigits: 3 }).format(n)}`
    : n.toLocaleString(intl);
}

/** Country names that take "the" in an English sentence (code list plus name patterns). */
const THE_CODES = new Set(["BQ", "BS", "GM", "KM", "MV", "NL", "PH", "SC"]);
const THE_NAME = /\b(Islands|Republic|States|Kingdom|Emirates|Territories|Territory)\b/;

/** Region name for a sentence: "the United States", "the Netherlands", but "Germany". Non-English names pass through. */
export function countryInSentence(code: string, name: string, lang: string): string {
  if (lang !== "en" || name === code) return name;
  return THE_CODES.has(code) || THE_NAME.test(name) ? `the ${name}` : name;
}
