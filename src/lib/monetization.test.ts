import { describe, expect, it } from "vitest";
import { buildMonetizationReport, YPP_COUNTRIES } from "./monetization";
import type { ChannelSummary } from "./youtube/types";

const NOW = new Date("2026-11-04T00:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000).toISOString();

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

const statusOf = (r: ReturnType<typeof buildMonetizationReport>, id: string) => r.signals.find((s) => s.id === id)?.status;

describe("buildMonetizationReport", () => {
  it("gives a strong verdict when every public requirement passes", () => {
    const r = buildMonetizationReport(channel(), activeUploads, NOW);
    expect(r.verdict).toBe("strong");
    expect(statusOf(r, "subscribers")).toBe("pass");
    expect(statusOf(r, "country")).toBe("pass");
    expect(statusOf(r, "activity")).toBe("pass");
  });

  it("never claims the private requirements are checkable", () => {
    const r = buildMonetizationReport(channel(), activeUploads, NOW);
    expect(statusOf(r, "watch_time")).toBe("unknown");
    expect(statusOf(r, "policies")).toBe("unknown");
  });

  it("fails below 500 subscribers", () => {
    const r = buildMonetizationReport(channel({ subscribers: 499 }), activeUploads, NOW);
    expect(statusOf(r, "subscribers")).toBe("fail");
    expect(r.verdict).toBe("not_yet");
  });

  it("warns between 500 and 999 subscribers (fan-funding tier only)", () => {
    const r = buildMonetizationReport(channel({ subscribers: 800 }), activeUploads, NOW);
    expect(statusOf(r, "subscribers")).toBe("warn");
    expect(r.verdict).toBe("partial");
  });

  it("is unclear when the subscriber count is hidden", () => {
    const r = buildMonetizationReport(channel({ subscribers: null, subscribersHidden: true }), activeUploads, NOW);
    expect(statusOf(r, "subscribers")).toBe("unknown");
    expect(r.verdict).toBe("unclear");
  });

  it("fails for a country outside the Partner Program", () => {
    expect(YPP_COUNTRIES.has("CN")).toBe(false);
    const r = buildMonetizationReport(channel({ country: "CN" }), activeUploads, NOW);
    expect(statusOf(r, "country")).toBe("fail");
    expect(r.verdict).toBe("not_yet");
  });

  it("treats a missing country as unknown, not failing", () => {
    const r = buildMonetizationReport(channel({ country: null }), activeUploads, NOW);
    expect(statusOf(r, "country")).toBe("unknown");
    expect(r.verdict).toBe("partial");
  });

  it("counts only uploads inside the 90-day window", () => {
    const r = buildMonetizationReport(channel(), [daysAgo(10), daysAgo(91), daysAgo(200)], NOW);
    expect(statusOf(r, "activity")).toBe("warn");
    expect(r.verdict).toBe("partial");
  });

  it("fails activity when the channel has no public videos", () => {
    const r = buildMonetizationReport(channel({ videoCount: 0 }), [], NOW);
    expect(statusOf(r, "activity")).toBe("fail");
    expect(r.verdict).toBe("not_yet");
  });

  it("warns on made-for-kids channels without changing the verdict", () => {
    const r = buildMonetizationReport(channel({ madeForKids: true }), activeUploads, NOW);
    expect(statusOf(r, "made_for_kids")).toBe("warn");
    expect(r.verdict).toBe("strong");
  });
});
