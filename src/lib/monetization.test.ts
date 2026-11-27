import { describe, expect, it } from "vitest";
import {
  activityPath,
  buildMonetizationReport,
  confidence,
  countryInSentence,
  formatSubscriberCount,
  rulesAt,
  YPP_COUNTRIES,
  type MonetizationReport,
  type SelfCheck,
} from "./monetization";
import type { ChannelSummary } from "./youtube/types";

const NOW = new Date("2026-11-27T00:00:00Z");
const daysAgo = (n: number, now = NOW) => new Date(now.getTime() - n * 86_400_000).toISOString();

function channel(overrides: Partial<ChannelSummary> = {}): ChannelSummary {
  return {
    id: "UC0000000000000000000000",
    title: "Test Channel",
    handle: "@test",
    description: "",
    country: "US",
    publishedAt: "2020-01-01T00:00:00Z",
    avatarUrl: null,
    uploadsPlaylistId: "UU0000000000000000000000",
    subscribers: 50_000,
    subscribersHidden: false,
    views: 1_000_000,
    videoCount: 200,
    madeForKids: false,
    ...overrides,
  };
}

const activeUploads = [daysAgo(5), daysAgo(20), daysAgo(40)];

const statusOf = (r: MonetizationReport, tier: "fan" | "ad", id: string) => r.tiers[tier].checks.find((c) => c.id === id)?.status;
const ids = (r: MonetizationReport, tier: "fan" | "ad") => r.tiers[tier].checks.map((c) => c.id);

describe("buildMonetizationReport: two tiers", () => {
  it("checks the right requirements in each tier", () => {
    const r = buildMonetizationReport(channel(), activeUploads, NOW);
    expect(ids(r, "fan")).toEqual(["subscribers", "uploads", "country", "made_for_kids", "watch_time"]);
    expect(ids(r, "ad")).toEqual(["subscribers", "country", "made_for_kids", "watch_time"]);
  });

  it("meets both tiers when every public requirement passes", () => {
    const r = buildMonetizationReport(channel(), activeUploads, NOW);
    expect(r.tiers.fan.verdict).toBe("met");
    expect(r.tiers.ad.verdict).toBe("met");
  });

  it("never claims watch time is checkable", () => {
    const r = buildMonetizationReport(channel(), activeUploads, NOW);
    expect(statusOf(r, "fan", "watch_time")).toBe("unknown");
    expect(statusOf(r, "ad", "watch_time")).toBe("unknown");
  });

  it("does not let recent uploads affect the ad revenue verdict", () => {
    const r = buildMonetizationReport(channel({ subscribers: 1_000_000 }), [daysAgo(200)], NOW);
    expect(statusOf(r, "fan", "uploads")).toBe("fail");
    expect(r.tiers.fan.verdict).toBe("not_yet");
    expect(r.tiers.ad.verdict).toBe("met");
  });

  it("fails both tiers below 500 subscribers", () => {
    const r = buildMonetizationReport(channel({ subscribers: 499 }), activeUploads, NOW);
    expect(r.tiers.fan.verdict).toBe("not_yet");
    expect(r.tiers.ad.verdict).toBe("not_yet");
  });

  it("meets fan funding but not ad revenue between 500 and 999 subscribers", () => {
    const r = buildMonetizationReport(channel({ subscribers: 800 }), activeUploads, NOW);
    expect(statusOf(r, "fan", "subscribers")).toBe("pass");
    expect(statusOf(r, "ad", "subscribers")).toBe("fail");
    expect(r.tiers.fan.verdict).toBe("met");
    expect(r.tiers.ad.verdict).toBe("not_yet");
  });

  it("is unclear when the subscriber count is hidden", () => {
    const r = buildMonetizationReport(channel({ subscribers: null, subscribersHidden: true }), activeUploads, NOW);
    expect(r.tiers.fan.verdict).toBe("unclear");
    expect(r.tiers.ad.verdict).toBe("unclear");
  });

  it("fails both tiers for a country outside the Partner Program", () => {
    expect(YPP_COUNTRIES.has("CN")).toBe(false);
    const r = buildMonetizationReport(channel({ country: "CN" }), activeUploads, NOW);
    expect(r.tiers.fan.verdict).toBe("not_yet");
    expect(r.tiers.ad.verdict).toBe("not_yet");
  });

  it("treats a missing country as unknown, not failing", () => {
    const r = buildMonetizationReport(channel({ country: null }), activeUploads, NOW);
    expect(statusOf(r, "ad", "country")).toBe("unknown");
    expect(r.tiers.ad.verdict).toBe("partial");
  });

  it("counts only uploads inside the 90-day window", () => {
    const r = buildMonetizationReport(channel(), [daysAgo(10), daysAgo(91), daysAgo(200)], NOW);
    expect(r.recentUploads).toBe(1);
    expect(r.recentUploadsCapped).toBe(false);
    expect(statusOf(r, "fan", "uploads")).toBe("fail");
  });

  it("flags the count as a lower bound when all 50 fetched uploads are recent", () => {
    const fifty = Array.from({ length: 50 }, (_, i) => daysAgo(i));
    const r = buildMonetizationReport(channel(), fifty, NOW);
    expect(r.recentUploads).toBe(50);
    expect(r.recentUploadsCapped).toBe(true);
  });

  it("fails the uploads check when the channel has no public videos", () => {
    const r = buildMonetizationReport(channel({ videoCount: 0 }), [], NOW);
    expect(statusOf(r, "fan", "uploads")).toBe("fail");
    expect(r.recentUploads).toBe(0);
  });

  it("made for kids: fan funding not met, ad revenue partly met", () => {
    const r = buildMonetizationReport(channel({ madeForKids: true }), activeUploads, NOW);
    expect(statusOf(r, "fan", "made_for_kids")).toBe("fail");
    expect(statusOf(r, "ad", "made_for_kids")).toBe("warn");
    expect(r.tiers.fan.verdict).toBe("not_yet");
    expect(r.tiers.ad.verdict).toBe("partial");
  });
});

describe("rulesAt: Feb 1, 2027 switch", () => {
  it("uses today's thresholds and counts down before the date", () => {
    expect(rulesAt(NOW)).toEqual({ era: "current", adWatchHours: 4000, adShortsViews: 10_000_000, daysUntilChange: 66 });
  });

  it("shows 1 day in the last second before the change", () => {
    const r = rulesAt(new Date("2027-01-31T23:59:59Z"));
    expect(r.era).toBe("current");
    expect(r.adWatchHours).toBe(4000);
    expect(r.daysUntilChange).toBe(1);
  });

  it("switches at exactly Feb 1, 2027 00:00 UTC and hides the countdown", () => {
    expect(rulesAt(new Date("2027-02-01T00:00:00Z"))).toEqual({ era: "2027", adWatchHours: 8000, adShortsViews: 20_000_000, daysUntilChange: null });
    expect(rulesAt(new Date("2027-06-01T12:00:00Z")).era).toBe("2027");
  });

  it("carries the rules into the report from the time it was built", () => {
    const after = new Date("2027-02-02T00:00:00Z");
    expect(buildMonetizationReport(channel(), [daysAgo(1, after)], after).rules.adWatchHours).toBe(8000);
    expect(buildMonetizationReport(channel(), activeUploads, NOW).rules.adWatchHours).toBe(4000);
  });
});

describe("activityPath (2027 stay-active, uploads combined)", () => {
  it.each([
    [0, "not_enough"],
    [1, "not_enough"],
    [2, "enough_if_long"],
    [4, "enough_if_long"],
    [5, "enough_any"],
    [50, "enough_any"],
  ] as const)("%i uploads → %s", (n, expected) => {
    expect(activityPath(n)).toBe(expected);
  });
});

describe("confidence", () => {
  const none: SelfCheck = { join: false, store: false, supers: false, ads: false };
  const big = { subscribers: 50_000, subscribersHidden: false };

  it("very likely: a Partner Program-only feature plus the ad tier met", () => {
    expect(confidence(big, "met", { ...none, join: true })).toBe("very_likely");
    expect(confidence(big, "met", { ...none, store: true })).toBe("very_likely");
    expect(confidence(big, "met", { ...none, supers: true, ads: true })).toBe("very_likely");
  });

  it("possibly: only ads ticked, or ad tier met with nothing ticked", () => {
    expect(confidence(big, "met", none)).toBe("possibly");
    expect(confidence(big, "met", { ...none, ads: true })).toBe("possibly");
    expect(confidence(big, "partial", { ...none, ads: true })).toBe("possibly");
  });

  it("unlikely under 500 subscribers, whatever is ticked", () => {
    const small = { ...big, subscribers: 300 };
    expect(confidence(small, "not_yet", none)).toBe("unlikely");
    expect(confidence(small, "not_yet", { ...none, ads: true })).toBe("unlikely");
    expect(confidence(small, "not_yet", { ...none, join: true })).toBe("unlikely");
  });

  it("can't tell for a made-for-kids channel with nothing ticked (e.g. a huge kids channel)", () => {
    const kids = { subscribers: 203_000_000, subscribersHidden: false };
    // Made for kids makes the ad tier "partial", so it never counts as met.
    expect(confidence(kids, "partial", none)).toBe("cant_tell");
    expect(confidence(kids, "partial", { ...none, ads: true })).toBe("possibly");
    expect(confidence(kids, "partial", { ...none, join: true })).toBe("cant_tell");
  });

  it("possibly (fan funding) at 500–999 subscribers with a Join button or another Partner Program-only feature", () => {
    for (const subs of [500, 800, 999]) {
      const mid = { ...big, subscribers: subs };
      expect(confidence(mid, "not_yet", { ...none, join: true })).toBe("possibly_fan");
      expect(confidence(mid, "not_yet", { ...none, store: true, ads: true })).toBe("possibly_fan");
      expect(confidence(mid, "not_yet", { ...none, supers: true })).toBe("possibly_fan");
    }
    expect(confidence({ ...big, subscribers: 800 }, "not_yet", none)).toBe("cant_tell");
    expect(confidence({ ...big, subscribers: 800 }, "not_yet", { ...none, ads: true })).toBe("possibly");
  });

  it("can't tell otherwise", () => {
    expect(confidence({ subscribers: null, subscribersHidden: true }, "unclear", none)).toBe("cant_tell");
    expect(confidence({ subscribers: null, subscribersHidden: true }, "unclear", { ...none, join: true })).toBe("cant_tell");
    expect(confidence(big, "partial", { ...none, join: true })).toBe("cant_tell");
  });
});

describe("formatSubscriberCount", () => {
  it("shows three significant figures above 1,000", () => {
    expect(formatSubscriberCount(1230)).toBe("≈ 1.23K");
    expect(formatSubscriberCount(12_300)).toBe("≈ 12.3K");
    expect(formatSubscriberCount(123_000)).toBe("≈ 123K");
    expect(formatSubscriberCount(21_500_000)).toBe("≈ 21.5M");
  });

  it("shows exact counts below 1,000", () => {
    expect(formatSubscriberCount(999)).toBe("999");
  });
});

describe("countryInSentence", () => {
  const name = (code: string) => new Intl.DisplayNames("en", { type: "region" }).of(code)!;

  it("adds 'the' where English needs it", () => {
    for (const code of ["US", "GB", "NL", "PH", "AE", "DO", "KY", "VG", "VI", "TC", "FK", "FO", "MP", "IO", "BS"]) {
      expect(countryInSentence(code, name(code), "en")).toBe(`the ${name(code)}`);
    }
  });

  it("leaves other countries alone", () => {
    for (const code of ["DE", "IN", "JP", "BR", "CZ", "KR", "IE"]) {
      expect(countryInSentence(code, name(code), "en")).toBe(name(code));
    }
  });

  it("never changes non-English names", () => {
    expect(countryInSentence("US", "Vereinigte Staaten", "de")).toBe("Vereinigte Staaten");
  });
});
