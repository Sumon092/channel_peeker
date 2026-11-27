import "server-only";
import { SHORT_MAX_SECONDS } from "@/lib/analyzer";
import type { RecentUpload } from "./uploads";
import { getVideos } from "./videos";

export interface RecentViews {
  /** Views on long-form uploads from the last 30 days. */
  views30dLong: number;
  /** Views on Shorts (≤ 3 min) uploaded in the last 30 days. */
  views30dShorts: number;
  uploads30d: number;
}

/**
 * Views on a channel's uploads from the last 30 days, split long-form / Shorts by duration:
 * the basis of the earnings estimate (shared by the earnings estimator and the monetization checker).
 */
export async function getRecentViews(uploads: RecentUpload[], tool: string): Promise<RecentViews> {
  const cutoff = Date.now() - 30 * 86_400_000;
  const recentIds = uploads.filter((u) => Date.parse(u.publishedAt) >= cutoff).map((u) => u.videoId);
  let views30dLong = 0;
  let views30dShorts = 0;
  if (recentIds.length) {
    const { videos } = await getVideos(recentIds, tool);
    for (const v of videos.values()) {
      if (v.views === null) continue;
      if (v.durationSeconds > 0 && v.durationSeconds <= SHORT_MAX_SECONDS) views30dShorts += v.views;
      else views30dLong += v.views;
    }
  }
  return { views30dLong, views30dShorts, uploads30d: recentIds.length };
}
