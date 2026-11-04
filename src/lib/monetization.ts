import type { ChannelSummary } from "@/lib/youtube/types";

/**
 * Monetization eligibility signals (analytics hub). YouTube does not publish
 * whether a channel is monetized, so we never output a yes/no. We check every public
 * YPP requirement and label the private ones as uncheckable (see /methodology).
 *
 * YPP thresholds (support.google.com/youtube/answer/72851):
 * - Fan funding tier: 500 subscribers, 3 public uploads in the last 90 days,
 *   plus 3,000 watch hours in 12 months OR 3M Shorts views in 90 days (private).
 * - Full tier (ads): 1,000 subscribers, plus 4,000 watch hours OR 10M Shorts views (private).
 */

export const YPP_FULL_SUBS = 1000;
export const YPP_STARTER_SUBS = 500;
export const ACTIVITY_WINDOW_DAYS = 90;
export const ACTIVITY_MIN_UPLOADS = 3;

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

export interface Signal {
  id: "subscribers" | "country" | "activity" | "made_for_kids" | "watch_time" | "policies";
  label: string;
  status: SignalStatus;
  /** Short value shown next to the label, e.g. "≈ 1.2M" or "Not public". */
  value: string;
  detail: string;
}

export type Verdict = "strong" | "partial" | "not_yet" | "unclear";

const countryNames = new Intl.DisplayNames("en", { type: "region" });

function subscriberSignal(c: ChannelSummary): Signal {
  const base = { id: "subscribers" as const, label: `At least ${YPP_FULL_SUBS.toLocaleString("en")} subscribers` };
  if (c.subscribersHidden || c.subscribers === null) {
    return { ...base, status: "unknown", value: "Hidden", detail: "The creator hides their subscriber count, so we can't check this requirement." };
  }
  const n = c.subscribers;
  const shown = n >= 1000 ? `≈ ${Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)}` : n.toLocaleString("en");
  if (n >= YPP_FULL_SUBS) {
    return { ...base, status: "pass", value: shown, detail: `Meets the ${YPP_FULL_SUBS.toLocaleString("en")} needed for the full program, including ad revenue.` };
  }
  if (n >= YPP_STARTER_SUBS) {
    return {
      ...base,
      status: "warn",
      value: shown,
      detail: `Meets the ${YPP_STARTER_SUBS} needed for the fan-funding tier (memberships, Supers), but not the ${YPP_FULL_SUBS.toLocaleString("en")} needed for ad revenue.`,
    };
  }
  return { ...base, status: "fail", value: shown, detail: `Below the ${YPP_STARTER_SUBS} subscribers YouTube requires for even the first monetization tier.` };
}

function countrySignal(c: ChannelSummary): Signal {
  const base = { id: "country" as const, label: "Lives in a Partner Program country" };
  if (!c.country) {
    return { ...base, status: "unknown", value: "Not set", detail: "The channel doesn't show a country, so we can't check availability. YPP requires one." };
  }
  const name = countryNames.of(c.country) ?? c.country;
  return YPP_COUNTRIES.has(c.country)
    ? { ...base, status: "pass", value: name, detail: `The Partner Program is available in ${name}.` }
    : { ...base, status: "fail", value: name, detail: `YouTube doesn't list ${name} as a Partner Program country, so the channel can't join from there.` };
}

function activitySignal(uploadDates: string[], videoCount: number, now: Date): Signal {
  const base = { id: "activity" as const, label: `${ACTIVITY_MIN_UPLOADS} public uploads in the last ${ACTIVITY_WINDOW_DAYS} days` };
  const cutoff = now.getTime() - ACTIVITY_WINDOW_DAYS * 86_400_000;
  const recent = uploadDates.filter((d) => Date.parse(d) >= cutoff).length;
  const value = `${recent} upload${recent === 1 ? "" : "s"}`;
  if (videoCount === 0) {
    return { ...base, status: "fail", value: "No public videos", detail: "The channel has no public uploads. The fan-funding tier requires recent public activity." };
  }
  if (recent >= ACTIVITY_MIN_UPLOADS) {
    return { ...base, status: "pass", value, detail: "The channel is active enough for the fan-funding tier's recent-uploads requirement." };
  }
  if (recent > 0) {
    return { ...base, status: "warn", value, detail: `Fewer than the ${ACTIVITY_MIN_UPLOADS} public uploads in ${ACTIVITY_WINDOW_DAYS} days the fan-funding tier asks for. (Not required for the 1,000-subscriber tier.)` };
  }
  return { ...base, status: "warn", value, detail: `No public uploads in the last ${ACTIVITY_WINDOW_DAYS} days. Inactive channels can also lose monetization. (Not required for the 1,000-subscriber tier.)` };
}

function madeForKidsSignal(c: ChannelSummary): Signal {
  const base = { id: "made_for_kids" as const, label: "Not a made-for-kids channel" };
  if (c.madeForKids === null) {
    return { ...base, status: "unknown", value: "Not public", detail: "YouTube doesn't expose this channel's audience setting." };
  }
  return c.madeForKids
    ? {
        ...base,
        status: "warn",
        value: "Made for kids",
        detail: "The whole channel is set as made for kids: no personalized ads, memberships, Supers or live chat, which sharply limits earnings.",
      }
    : { ...base, status: "pass", value: "No", detail: "The channel isn't set as made for kids, so no kids-content ad limits apply channel-wide." };
}

const privateSignals: Signal[] = [
  {
    id: "watch_time",
    label: "4,000 watch hours or 10M Shorts views",
    status: "unknown",
    value: "Not public",
    detail: "Watch hours and 90-day Shorts views are visible only to the channel owner in YouTube Studio. No outside tool can check this, including ones that claim to.",
  },
  {
    id: "policies",
    label: "No active strikes, follows monetization policies",
    status: "unknown",
    value: "Not public",
    detail: "Community-guidelines strikes and policy reviews are private. A channel meeting every public requirement can still be rejected or suspended.",
  },
];

function computeVerdict(signals: Signal[]): Verdict {
  const byId = new Map(signals.map((s) => [s.id, s.status]));
  const core = [byId.get("subscribers"), byId.get("country"), byId.get("activity")];
  if (core.includes("fail")) return "not_yet";
  if (byId.get("subscribers") === "unknown") return "unclear";
  if (core.every((s) => s === "pass")) return "strong";
  return "partial";
}

export interface MonetizationReport {
  verdict: Verdict;
  signals: Signal[];
}

export function buildMonetizationReport(channel: ChannelSummary, uploadDates: string[], now = new Date()): MonetizationReport {
  const signals = [
    subscriberSignal(channel),
    countrySignal(channel),
    activitySignal(uploadDates, channel.videoCount, now),
    madeForKidsSignal(channel),
    ...privateSignals,
  ];
  return { verdict: computeVerdict(signals), signals };
}
