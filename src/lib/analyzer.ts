import type { ChannelSummary, VideoSummary } from "@/lib/youtube/types";

/**
 * Channel Analyzer report (analytics hub). Raw YouTube figures are always
 * included; anything we calculate (medians, ratios, outlier multipliers, the
 * grade) is a channelpeeker estimate and is only produced when derived metrics
 * are enabled (DERIVED_METRICS_APPROVED, plan 3.2). See /methodology.
 */

/** Shorts can be up to 3 minutes since late 2024; duration is our only public signal. */
export const SHORT_MAX_SECONDS = 180;
const WINDOW_DAYS = 90;

export interface VideoLite {
  id: string;
  title: string;
  publishedAt: string;
  durationSeconds: number;
  isShort: boolean;
  views: number | null;
  thumbnailUrl: string | null;
  /** Views ÷ median views of the same format. Derived; null when derived metrics are off. */
  outlierMultiplier: number | null;
}

export interface GradeComponent {
  id: "activity" | "engagement" | "reach" | "consistency";
  label: string;
  /** null when the inputs aren't public (e.g. hidden subscribers). */
  score: number | null;
  max: number;
  note: string;
}

export interface Grade {
  letter: "A" | "B" | "C" | "D" | "F";
  /** 0–100, scaled over the components that could be scored. */
  score: number;
  components: GradeComponent[];
}

export interface DerivedMetrics {
  medianViewsLong: number | null;
  medianViewsShorts: number | null;
  /** Median likes ÷ views across recent videos, as a percentage. */
  likeRatePct: number | null;
  commentRatePct: number | null;
  grade: Grade;
}

export interface AnalyzerReport {
  /** Count of analyzed uploads and the window they span (newest 50 public uploads). */
  sampleSize: number;
  uploads90d: number;
  longFormCount: number;
  shortsCount: number;
  /** Chronological views per upload, oldest first, for the chart. Raw data. */
  series: { publishedAt: string; views: number | null; isShort: boolean }[];
  /** Top recent videos by views. Raw sort of YouTube figures. */
  topVideos: VideoLite[];
  /** channelpeeker estimates; null until derived metrics are enabled. */
  derived: DerivedMetrics | null;
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const isShort = (v: VideoSummary) => v.durationSeconds > 0 && v.durationSeconds <= SHORT_MAX_SECONDS;

function toLite(v: VideoSummary, medianLong: number | null, medianShorts: number | null): VideoLite {
  const short = isShort(v);
  const med = short ? medianShorts : medianLong;
  const thumb = v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default;
  return {
    id: v.id,
    title: v.title,
    publishedAt: v.publishedAt,
    durationSeconds: v.durationSeconds,
    isShort: short,
    views: v.views,
    thumbnailUrl: thumb?.url ?? null,
    outlierMultiplier: med && med > 0 && v.views !== null ? Number((v.views / med).toFixed(1)) : null,
  };
}

/** Steps score bands: first entry whose threshold the value meets wins. */
function band(value: number, bands: [threshold: number, score: number][], floor: number): number {
  for (const [threshold, score] of bands) if (value >= threshold) return score;
  return floor;
}

function buildGrade(channel: ChannelSummary, videos: VideoSummary[], uploads90d: number, medianLong: number | null, likeRatePct: number | null): Grade {
  const components: GradeComponent[] = [];

  components.push({
    id: "activity",
    label: "Activity",
    max: 25,
    score: band(uploads90d, [[12, 25], [6, 18], [3, 12], [1, 6]], 0),
    note: `${uploads90d} public uploads in the last ${WINDOW_DAYS} days. 12+ scores full marks.`,
  });

  components.push({
    id: "engagement",
    label: "Engagement",
    max: 25,
    score: likeRatePct === null ? null : band(likeRatePct, [[6, 25], [4, 20], [2.5, 15], [1.5, 10], [0.5, 5]], 2),
    note:
      likeRatePct === null
        ? "Likes are hidden on too many recent videos to score engagement."
        : `Median like rate ${likeRatePct}% of views. 6%+ scores full marks.`,
  });

  const reachRatio =
    channel.subscribers && channel.subscribers > 0 && medianLong !== null ? medianLong / channel.subscribers : null;
  components.push({
    id: "reach",
    label: "Reach",
    max: 25,
    score: reachRatio === null ? null : band(reachRatio, [[1, 25], [0.5, 20], [0.2, 15], [0.08, 10], [0.02, 5]], 2),
    note:
      reachRatio === null
        ? "Needs a visible subscriber count and recent long-form videos."
        : `Typical long-form video reaches ${Math.round(reachRatio * 100)}% of subscribers. 100%+ scores full marks.`,
  });

  const longViews = videos.filter((v) => !isShort(v) && v.views !== null).map((v) => v.views as number);
  let cv: number | null = null;
  if (longViews.length >= 5) {
    const mean = longViews.reduce((a, b) => a + b, 0) / longViews.length;
    if (mean > 0) {
      const variance = longViews.reduce((a, b) => a + (b - mean) ** 2, 0) / longViews.length;
      cv = Math.sqrt(variance) / mean;
    }
  }
  components.push({
    id: "consistency",
    label: "Consistency",
    max: 25,
    // Lower variation = steadier performance, so the bands invert via negation.
    score: cv === null ? null : band(-cv, [[-0.6, 25], [-1, 18], [-1.5, 12], [-2.5, 6]], 2),
    note:
      cv === null
        ? "Needs at least 5 recent long-form videos to measure."
        : `View counts vary ${cv <= 1 ? "moderately" : "a lot"} between videos (CV ${cv.toFixed(2)}). Steadier is better.`,
  });

  const scorable = components.filter((c) => c.score !== null);
  const maxTotal = scorable.reduce((a, c) => a + c.max, 0);
  const total = scorable.reduce((a, c) => a + (c.score as number), 0);
  const score = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;
  const letter = score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : score >= 40 ? "D" : "F";
  return { letter, score, components };
}

export function buildAnalyzerReport(
  channel: ChannelSummary,
  videos: VideoSummary[],
  derivedAllowed: boolean,
  now = new Date(),
): AnalyzerReport {
  const sorted = [...videos].sort((a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt));
  const cutoff = now.getTime() - WINDOW_DAYS * 86_400_000;
  const uploads90d = sorted.filter((v) => Date.parse(v.publishedAt) >= cutoff).length;

  const longForm = sorted.filter((v) => !isShort(v));
  const shorts = sorted.filter(isShort);

  let derived: DerivedMetrics | null = null;
  let medianLong: number | null = null;
  let medianShorts: number | null = null;

  if (derivedAllowed) {
    medianLong = median(longForm.filter((v) => v.views !== null).map((v) => v.views as number));
    medianShorts = median(shorts.filter((v) => v.views !== null).map((v) => v.views as number));
    const likeRates = sorted
      .filter((v) => v.views !== null && v.views > 0 && v.likes !== null)
      .map((v) => ((v.likes as number) / (v.views as number)) * 100);
    const commentRates = sorted
      .filter((v) => v.views !== null && v.views > 0 && v.comments !== null)
      .map((v) => ((v.comments as number) / (v.views as number)) * 100);
    const likeRatePct = likeRates.length >= 3 ? Number(median(likeRates)!.toFixed(2)) : null;
    const commentRatePct = commentRates.length >= 3 ? Number(median(commentRates)!.toFixed(2)) : null;
    derived = {
      medianViewsLong: medianLong,
      medianViewsShorts: medianShorts,
      likeRatePct,
      commentRatePct,
      grade: buildGrade(channel, sorted, uploads90d, medianLong, likeRatePct),
    };
  }

  const topVideos = [...sorted]
    .filter((v) => v.views !== null)
    .sort((a, b) => (b.views as number) - (a.views as number))
    .slice(0, 5)
    .map((v) => toLite(v, medianLong, medianShorts));

  return {
    sampleSize: sorted.length,
    uploads90d,
    longFormCount: longForm.length,
    shortsCount: shorts.length,
    series: sorted.map((v) => ({ publishedAt: v.publishedAt, views: v.views, isShort: isShort(v) })),
    topVideos,
    derived,
  };
}
