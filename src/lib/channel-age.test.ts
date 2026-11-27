import { describe, expect, it } from "vitest";
import { averageViewsPerVideo, channelAge, formatAge, subscribersPerMonth } from "./channel-age";

const age = (created: string, now: string) => channelAge(new Date(created), new Date(now));

describe("channelAge", () => {
  it("counts years, months and days", () => {
    expect(age("2008-03-21T15:25:54Z", "2026-11-27T04:10:00Z")).toEqual({ years: 18, months: 8, days: 6 });
  });

  it("uses UTC dates, ignoring time of day", () => {
    expect(age("2020-01-01T23:59:00Z", "2020-01-02T00:01:00Z")).toEqual({ years: 0, months: 0, days: 1 });
    expect(age("2020-01-01T00:01:00Z", "2020-01-01T23:59:00Z")).toEqual({ years: 0, months: 0, days: 0 });
  });

  it("returns zero for a channel made today or a future date", () => {
    expect(age("2026-11-27T10:00:00Z", "2026-11-27T12:00:00Z")).toEqual({ years: 0, months: 0, days: 0 });
    expect(age("2026-12-01T00:00:00Z", "2026-11-27T00:00:00Z")).toEqual({ years: 0, months: 0, days: 0 });
  });

  it("hits exact anniversaries", () => {
    expect(age("2015-06-10T00:00:00Z", "2025-06-10T00:00:00Z")).toEqual({ years: 10, months: 0, days: 0 });
    expect(age("2015-06-10T00:00:00Z", "2025-06-09T00:00:00Z")).toEqual({ years: 9, months: 11, days: 30 });
  });

  describe("month ends", () => {
    it("clamps Jan 31 + 1 month to the end of February", () => {
      expect(age("2023-01-31T00:00:00Z", "2023-02-28T00:00:00Z")).toEqual({ years: 0, months: 1, days: 0 });
      expect(age("2024-01-31T00:00:00Z", "2024-02-29T00:00:00Z")).toEqual({ years: 0, months: 1, days: 0 });
      expect(age("2024-01-31T00:00:00Z", "2024-02-28T00:00:00Z")).toEqual({ years: 0, months: 0, days: 28 });
    });

    it("counts days past a clamped month end", () => {
      expect(age("2023-01-31T00:00:00Z", "2023-03-01T00:00:00Z")).toEqual({ years: 0, months: 1, days: 1 });
      expect(age("2023-01-31T00:00:00Z", "2023-03-31T00:00:00Z")).toEqual({ years: 0, months: 2, days: 0 });
    });

    it("handles 31st into 30-day months", () => {
      expect(age("2023-03-31T00:00:00Z", "2023-04-30T00:00:00Z")).toEqual({ years: 0, months: 1, days: 0 });
      expect(age("2023-03-31T00:00:00Z", "2023-05-01T00:00:00Z")).toEqual({ years: 0, months: 1, days: 1 });
    });

    it("crosses a year boundary", () => {
      expect(age("2022-12-31T00:00:00Z", "2023-01-01T00:00:00Z")).toEqual({ years: 0, months: 0, days: 1 });
      expect(age("2022-11-30T00:00:00Z", "2024-01-15T00:00:00Z")).toEqual({ years: 1, months: 1, days: 16 });
    });
  });

  describe("Feb 29", () => {
    it("is 1 year old on Feb 28 of a non-leap year", () => {
      expect(age("2024-02-29T00:00:00Z", "2025-02-28T00:00:00Z")).toEqual({ years: 1, months: 0, days: 0 });
      expect(age("2024-02-29T00:00:00Z", "2025-02-27T00:00:00Z")).toEqual({ years: 0, months: 11, days: 29 });
      expect(age("2024-02-29T00:00:00Z", "2025-03-01T00:00:00Z")).toEqual({ years: 1, months: 0, days: 1 });
    });

    it("is exactly 4 years old on the next Feb 29", () => {
      expect(age("2020-02-29T00:00:00Z", "2024-02-29T00:00:00Z")).toEqual({ years: 4, months: 0, days: 0 });
    });

    it("counts a span across Feb 29 in a leap year", () => {
      expect(age("2024-02-28T00:00:00Z", "2024-03-01T00:00:00Z")).toEqual({ years: 0, months: 0, days: 2 });
      expect(age("2023-02-28T00:00:00Z", "2023-03-01T00:00:00Z")).toEqual({ years: 0, months: 0, days: 1 });
    });
  });
});

describe("formatAge", () => {
  it("writes all parts with plurals", () => {
    expect(formatAge({ years: 18, months: 8, days: 6 })).toBe("18 years, 8 months, 6 days");
    expect(formatAge({ years: 1, months: 1, days: 1 })).toBe("1 year, 1 month, 1 day");
  });

  it("leaves out zero parts", () => {
    expect(formatAge({ years: 10, months: 0, days: 0 })).toBe("10 years");
    expect(formatAge({ years: 2, months: 0, days: 3 })).toBe("2 years, 3 days");
    expect(formatAge({ years: 0, months: 0, days: 12 })).toBe("12 days");
  });

  it("says 0 days for a channel made today", () => {
    expect(formatAge({ years: 0, months: 0, days: 0 })).toBe("0 days");
  });
});

describe("subscribersPerMonth", () => {
  const d = (s: string) => new Date(s);

  it("divides subscribers by age in months", () => {
    // 5 years incl. two leap days = 1,827 days = 60.02 months
    expect(subscribersPerMonth(600_000, false, d("2020-01-01T00:00:00Z"), d("2025-01-01T00:00:00Z"))).toBeCloseTo(9_995.9, 1);
    expect(subscribersPerMonth(21_500_000, false, d("2008-03-21T15:25:54Z"), d("2026-11-27T04:10:00Z"))).toBeCloseTo(95_883.7, 1);
  });

  it("counts a channel under a month old as one month", () => {
    expect(subscribersPerMonth(5_000, false, d("2026-11-17T00:00:00Z"), d("2026-11-27T00:00:00Z"))).toBe(5_000);
    expect(subscribersPerMonth(5_000, false, d("2026-11-27T00:00:00Z"), d("2026-11-27T12:00:00Z"))).toBe(5_000);
  });

  it("returns null when subscribers are hidden", () => {
    expect(subscribersPerMonth(null, true, d("2020-01-01T00:00:00Z"), d("2025-01-01T00:00:00Z"))).toBeNull();
    expect(subscribersPerMonth(1_000, true, d("2020-01-01T00:00:00Z"), d("2025-01-01T00:00:00Z"))).toBeNull();
  });

  it("returns 0 for a channel with no subscribers", () => {
    expect(subscribersPerMonth(0, false, d("2020-01-01T00:00:00Z"), d("2025-01-01T00:00:00Z"))).toBe(0);
  });
});

describe("averageViewsPerVideo", () => {
  it("divides total views by video count", () => {
    expect(averageViewsPerVideo(30_000_000, 300)).toBe(100_000);
  });

  it("returns null with zero videos", () => {
    expect(averageViewsPerVideo(0, 0)).toBeNull();
    expect(averageViewsPerVideo(12_345, 0)).toBeNull();
  });
});
