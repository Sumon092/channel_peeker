import { describe, expect, it } from "vitest";
import {
  avdFromRetention,
  defaultGoal,
  durationSeconds,
  formatDuration,
  formatInput,
  needs8000Warning,
  parseNumber,
  percentViewed,
  perVideo,
  progress,
  readShare,
  remainingViews,
  shareQuery,
  viewsFor,
  watchHours,
  type ProgressFields,
  type RetentionFields,
  type ViewsFields,
} from "./watch-time";

const NOW = new Date("2026-11-27T12:00:00Z");

describe("formulas", () => {
  it("watch hours = views × average view duration ÷ 3,600", () => {
    expect(watchHours(10_000, 240)).toBeCloseTo(666.67, 1);
    expect(watchHours(50_000, 210)).toBeCloseTo(2916.67, 1);
    expect(watchHours(100_000, 120)).toBeCloseTo(3333.33, 1);
  });

  it("views needed rounds up, and matches the page's views table", () => {
    expect(viewsFor(4000, 120)).toBe(120_000);
    expect(viewsFor(3000, 210)).toBe(51_429);
    expect(viewsFor(4000, 210)).toBe(68_572);
    expect(viewsFor(8000, 210)).toBe(137_143);
    expect(viewsFor(4000, 0)).toBeNull();
  });

  it("remaining views: what's left at the same duration, never negative", () => {
    expect(remainingViews(42_000, 320, 4000)).toEqual({ more: 3000, total: 45_000 });
    expect(remainingViews(100_000, 210, 8000)).toEqual({ more: 37_143, total: 137_143 });
    expect(remainingViews(45_000, 320, 4000)).toBeNull(); // exactly 4,000 hours: goal reached
    expect(remainingViews(100_000, 210, 4000)).toBeNull(); // 5,833 hours
    expect(remainingViews(0, 320, 4000)).toEqual({ more: 45_000, total: 45_000 });
  });

  it("per-video views round up", () => {
    expect(perVideo(68_572, 20)).toBe(3429);
    expect(perVideo(100, 3)).toBe(34);
  });

  it("average % viewed and average view duration from retention", () => {
    expect(percentViewed(240, 600)).toBe(40);
    expect(percentViewed(90, 60)).toBe(150); // rewatches can pass 100%
    expect(avdFromRetention(600, 40)).toBe(240);
  });

  it("parses strictly", () => {
    expect(parseNumber("100,000")).toBe(100_000);
    expect(parseNumber("50k")).toBeNull();
    expect(parseNumber("1e3")).toBeNull();
    expect(parseNumber("")).toBeNull();
    expect(durationSeconds("3", "30")).toBe(210);
    expect(durationSeconds("", "45")).toBe(45);
    expect(durationSeconds("", "")).toBeNull();
    expect(durationSeconds("x", "1")).toBeNull();
  });

  it("parses numbers in the page language", () => {
    expect(parseNumber("42.000", "pt-BR")).toBe(42_000);
    expect(parseNumber("42.000", "de")).toBe(42_000);
    expect(parseNumber("3,5", "de")).toBe(3.5);
    expect(parseNumber("42\u202f000", "fr")).toBe(42_000);
    expect(parseNumber("42 000", "fr")).toBe(42_000);
    expect(parseNumber("42,000", "es-419")).toBe(42_000);
    expect(parseNumber("42,000", "ja")).toBe(42_000);
    expect(parseNumber("12.5", "en")).toBe(12.5);
    expect(parseNumber("1.2.3", "en")).toBeNull();
    expect(parseNumber("50k", "de")).toBeNull();
    expect(formatInput(42_000, "pt-BR")).toBe("42.000");
    expect(formatInput(42_000, "en")).toBe("42,000");
    expect(formatInput(null)).toBe("");
  });

  it("formats durations", () => {
    expect(formatDuration(255)).toBe("4:15");
    expect(formatDuration(3725)).toBe("1:02:05");
    expect(formatDuration(319.2)).toBe("5:19");
  });
});

describe("defaultGoal: the monetization checker's switch date", () => {
  it("is 4,000 until January 31, 2027 23:59:59 UTC and 8,000 from February 1, 2027", () => {
    expect(defaultGoal(NOW)).toBe(4000);
    expect(defaultGoal(new Date("2027-01-31T23:59:59Z"))).toBe(4000);
    expect(defaultGoal(new Date("2027-02-01T00:00:00Z"))).toBe(8000);
  });
});

describe("progress", () => {
  it("works out percentage, hours to go, the 90-day pace and subscribers", () => {
    const p = progress(2850, null, 740, 4000, NOW);
    expect(p.pct).toBeCloseTo(71.25);
    expect(p.toGo).toBe(1150);
    expect(p.perDayFor90).toBeCloseTo(12.78, 1);
    expect(p.subscribersPct).toBe(74);
    expect(p.pace).toEqual({ kind: "no_pace" });
  });

  it("projects a date when the pace can reach the goal", () => {
    const p = progress(2850, 310, null, 4000, NOW);
    expect(p.pace.kind).toBe("date");
    if (p.pace.kind !== "date") return;
    expect(p.pace.perDay).toBeCloseTo(11.07, 2);
    expect(p.pace.days).toBe(104); // ceil(1,150 ÷ 11.07)
    expect(p.pace.date.toISOString().slice(0, 10)).toBe("2027-03-11");
  });

  it("never shows a date when the 12-month total would level off below the goal", () => {
    const p = progress(2000, 140, null, 4000, NOW); // 5 hours a day → levels off near 1,825
    expect(p.pace).toEqual({ kind: "plateau", perDay: 5, plateau: 1825, neededPerDay: 4000 / 365 });
  });

  it("says so plainly when there's no pace", () => {
    expect(progress(1200, 0, null, 4000, NOW).pace).toEqual({ kind: "zero", perDay: 0 });
  });

  it("caps at 100% and stops projecting once the goal is reached", () => {
    const p = progress(4300, 200, 1500, 4000, NOW);
    expect(p.pct).toBe(100);
    expect(p.toGo).toBe(0);
    expect(p.reached).toBe(true);
    expect(p.perDayFor90).toBeNull();
    expect(p.subscribersPct).toBe(100);
    expect(p.pace).toEqual({ kind: "reached" });
  });

  it("handles the 8,000-hour goal", () => {
    const p = progress(5000, 700, null, 8000, NOW); // 25/day → levels off at 9,125 → 120 days
    expect(p.pace.kind).toBe("date");
    if (p.pace.kind === "date") expect(p.pace.days).toBe(120);
  });
});

describe("8,000-hour warning for 4,000-hour dates on or after February 1, 2027", () => {
  it("warns for the tab 2 example (March 11, 2027)", () => {
    const p = progress(2850, 310, 740, 4000, NOW);
    expect(p.pace.kind === "date" && p.pace.afterSwitch).toBe(true);
    expect(needs8000Warning(p)).toBe(true);
  });

  it("doesn't warn when the date is before the switch", () => {
    const p = progress(3800, 310, null, 4000, NOW); // 19 days → December 16, 2026
    expect(p.pace.kind === "date" && p.pace.date.toISOString().slice(0, 10)).toBe("2026-12-16");
    expect(needs8000Warning(p)).toBe(false);
  });

  it("is exact at the boundary: January 31 no, February 1 yes", () => {
    const now = new Date("2027-01-21T00:00:00Z");
    const jan31 = progress(3890, 308, null, 4000, now); // 11/day, 110 to go → 10 days → January 31
    const feb1 = progress(3879, 308, null, 4000, now); // 121 to go → 11 days → February 1, 00:00 UTC
    expect(jan31.pace.kind === "date" && jan31.pace.date.toISOString()).toBe("2027-01-31T00:00:00.000Z");
    expect(feb1.pace.kind === "date" && feb1.pace.date.toISOString()).toBe("2027-02-01T00:00:00.000Z");
    expect(needs8000Warning(jan31)).toBe(false);
    expect(needs8000Warning(feb1)).toBe(true);
  });

  it("never warns for other goals or when there's no date", () => {
    expect(needs8000Warning(progress(2850, 310, null, 3000, NOW))).toBe(false);
    expect(needs8000Warning(progress(5000, 700, null, 8000, NOW))).toBe(false);
    expect(needs8000Warning(progress(2000, 140, null, 4000, NOW))).toBe(false);
  });
});

describe("share links", () => {
  const views: ViewsFields = { views: "42,000", avdM: "5", avdS: "20", lenM: "12", lenS: "0", videos: "20" };
  const prog: ProgressFields = { h12: "2,850", h28: "310", subs: "740", goal: 4000 };
  const ret: RetentionFields = { lenM: "14", lenS: "", ret: "38", views: "60000", videos: "" };
  const all = { views, progress: prog, retention: ret };

  it("builds readable links per tab", () => {
    expect(shareQuery("views", all)).toBe("?tab=views&views=42000&avd=5:20&len=12:00&videos=20");
    expect(shareQuery("progress", all)).toBe("?tab=progress&h12=2850&h28=310&subs=740&goal=4000");
    expect(shareQuery("retention", all)).toBe("?tab=retention&len=14:00&ret=38&views=60000");
  });

  it("writes plain numbers from a Portuguese or German page", () => {
    const pt = { views: { ...views, views: "42.000" }, progress: { ...prog, h12: "2.850" }, retention: { ...ret, views: "60.000" } };
    expect(shareQuery("views", pt, "pt-BR")).toBe("?tab=views&views=42000&avd=5:20&len=12:00&videos=20");
    expect(shareQuery("progress", pt, "pt-BR")).toBe("?tab=progress&h12=2850&h28=310&subs=740&goal=4000");
    expect(shareQuery("retention", pt, "de")).toBe("?tab=retention&len=14:00&ret=38&views=60000");
  });

  it("reads them back", () => {
    expect(readShare("?tab=views&views=42000&avd=5:20&len=12:00&videos=20")).toEqual({
      tab: "views",
      views: { views: "42000", avdM: "5", avdS: "20", lenM: "12", lenS: "0", videos: "20" },
    });
    expect(readShare("?tab=progress&h12=2850&h28=310&subs=740&goal=4000")).toEqual({
      tab: "progress",
      progress: { h12: "2850", h28: "310", subs: "740", goal: 4000 },
    });
    expect(readShare("?tab=retention&len=14:00&ret=38&views=60000")).toEqual({
      tab: "retention",
      retention: { lenM: "14", lenS: "0", ret: "38", views: "60000" },
    });
  });

  it("ignores bad values and addresses without a tab", () => {
    expect(readShare("?q=@mkbhd")).toBeNull();
    expect(readShare("?tab=nope&views=1")).toBeNull();
    expect(readShare("?tab=progress&h12=abc&goal=5000")).toEqual({ tab: "progress", progress: {} });
    expect(readShare("?tab=views&avd=3:3:3&views=-5")).toEqual({ tab: "views", views: {} });
  });
});
