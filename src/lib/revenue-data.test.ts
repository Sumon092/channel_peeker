import { describe, expect, it } from "vitest";
import {
  COUNTRY_TIERS,
  DEFAULT_NICHE_ID,
  DEFAULT_TIER_ID,
  defaultMonthlyEarnings,
  estimateLongFormEarnings,
  estimateShortsEarnings,
  formatMoney,
  formatUsd,
  NICHES,
  nicheRpm,
} from "./revenue-data";

const niche = NICHES.find((n) => n.id === DEFAULT_NICHE_ID)!;
const tier = COUNTRY_TIERS.find((t) => t.id === DEFAULT_TIER_ID)!;

describe("defaultMonthlyEarnings (monetization checker's quick range)", () => {
  it("matches the earnings estimator's first result: long-form plus Shorts at its default niche and audience", () => {
    const long = estimateLongFormEarnings(2_000_000, niche, tier);
    const shorts = estimateShortsEarnings(5_000_000, tier);
    expect(defaultMonthlyEarnings(2_000_000, 5_000_000)).toEqual({ low: long.low + shorts.low, high: long.high + shorts.high });
  });

  it("works with only long-form or only Shorts views", () => {
    expect(defaultMonthlyEarnings(1_000_000, 0)).toEqual(estimateLongFormEarnings(1_000_000, niche, tier));
    expect(defaultMonthlyEarnings(0, 1_000_000)).toEqual(estimateShortsEarnings(1_000_000, tier));
  });

  it("is null with no recent views", () => {
    expect(defaultMonthlyEarnings(0, 0)).toBeNull();
  });
});

describe("nicheRpm", () => {
  it("is CPM × 60% monetized views × 55% creator share", () => {
    const finance = nicheRpm(NICHES.find((n) => n.id === "finance")!);
    expect(finance.low).toBeCloseTo(4.95);
    expect(finance.high).toBeCloseTo(13.2);
  });
});

describe("formatUsd", () => {
  it("matches formatMoney in English", () => {
    for (const n of [0.5, 4.95, 13.2, 250, 999, 1234, 56_789, 1_500_000]) expect(formatUsd(n)).toBe(formatMoney(n));
  });

  it("uses the locale's number format", () => {
    expect(formatUsd(1_500_000, "de")).toMatch(/1,5\sMio\./);
    expect(formatUsd(4.95, "fr")).toMatch(/4,95/);
  });
});
