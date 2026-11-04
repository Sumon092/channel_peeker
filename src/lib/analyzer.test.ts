import { describe, expect, it } from "vitest";
import { buildAnalyzerReport, median } from "./analyzer";
import type { ChannelSummary, VideoSummary } from "./youtube/types";

const NOW = new Date("2026-11-04T00:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000).toISOString();

const channel: ChannelSummary = {
  id: "UC0000000000000000000000",
  title: "Test Channel",
  handle: "@test",
  description: "",
  country: "US",
  publishedAt: "2020-01-01T00:00:00Z",
  avatarUrl: null,
  uploadsPlaylistId: "UU0000000000000000000000",
  subscribers: 10_000,
  subscribersHidden: false,
  views: 1_000_000,
  videoCount: 100,
  madeForKids: false,
};

function video(overrides: Partial<VideoSummary>): VideoSummary {
  return {
    id: Math.random().toString(36).slice(2, 13),
    channelId: channel.id,
    channelTitle: channel.title,
    title: "A video",
    description: "",
    publishedAt: daysAgo(10),
    tags: [],
    categoryId: null,
    language: null,
    durationSeconds: 600,
    hasCaptions: false,
    madeForKids: null,
    liveBroadcast: null,
    thumbnails: {},
    views: 5000,
    likes: 250,
    comments: 25,
    ...overrides,
  };
}

describe("median", () => {
  it("handles odd, even and empty inputs", () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBeNull();
  });
});

describe("buildAnalyzerReport", () => {
  const videos = [
    video({ publishedAt: daysAgo(5), views: 4000 }),
    video({ publishedAt: daysAgo(15), views: 5000 }),
    video({ publishedAt: daysAgo(30), views: 6000 }),
    video({ publishedAt: daysAgo(60), views: 5500 }),
    video({ publishedAt: daysAgo(80), views: 4500 }),
    video({ publishedAt: daysAgo(120), views: 50000 }), // outside 90d window
    video({ publishedAt: daysAgo(20), durationSeconds: 45, views: 20000 }), // a Short
  ];

  it("returns raw stats and no derived metrics when the gate is off", () => {
    const r = buildAnalyzerReport(channel, videos, false, NOW);
    expect(r.derived).toBeNull();
    expect(r.sampleSize).toBe(7);
    expect(r.uploads90d).toBe(6);
    expect(r.shortsCount).toBe(1);
    expect(r.longFormCount).toBe(6);
    expect(r.topVideos[0].views).toBe(50000);
    expect(r.topVideos[0].outlierMultiplier).toBeNull();
  });

  it("computes medians per format when the gate is on", () => {
    const r = buildAnalyzerReport(channel, videos, true, NOW);
    expect(r.derived).not.toBeNull();
    expect(r.derived!.medianViewsLong).toBe(5250); // median of 4000,5000,6000,5500,4500,50000
    expect(r.derived!.medianViewsShorts).toBe(20000);
    expect(r.derived!.likeRatePct).toBeCloseTo(5, 0); // likes are 5% of views in fixtures
  });

  it("marks outlier multipliers against the format median", () => {
    const r = buildAnalyzerReport(channel, videos, true, NOW);
    const top = r.topVideos[0];
    expect(top.views).toBe(50000);
    expect(top.outlierMultiplier).toBeCloseTo(50000 / 5250, 1);
  });

  it("orders the series chronologically", () => {
    const r = buildAnalyzerReport(channel, videos, true, NOW);
    const times = r.series.map((p) => Date.parse(p.publishedAt));
    expect(times).toEqual([...times].sort((a, b) => a - b));
  });

  it("grades with unknown components when subscribers are hidden", () => {
    const hidden = { ...channel, subscribers: null, subscribersHidden: true };
    const r = buildAnalyzerReport(hidden, videos, true, NOW);
    const reach = r.derived!.grade.components.find((c) => c.id === "reach")!;
    expect(reach.score).toBeNull();
    expect(r.derived!.grade.score).toBeGreaterThan(0);
    expect(r.derived!.grade.score).toBeLessThanOrEqual(100);
  });

  it("handles a channel with no videos", () => {
    const r = buildAnalyzerReport(channel, [], true, NOW);
    expect(r.sampleSize).toBe(0);
    expect(r.derived!.medianViewsLong).toBeNull();
    expect(r.topVideos).toEqual([]);
  });
});
