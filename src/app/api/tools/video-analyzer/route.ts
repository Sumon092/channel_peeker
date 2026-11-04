import { median, SHORT_MAX_SECONDS } from "@/lib/analyzer";
import { readYouTubeInput } from "@/lib/api";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannelById } from "@/lib/youtube/channels";
import { getRecentUploads } from "@/lib/youtube/uploads";
import { getVideo, getVideos } from "@/lib/youtube/videos";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "video");
    if (input.kind !== "video") throw new AppError("invalid_input", "Paste a link to a single video.");
    await enforceRateLimit(req, "tool");

    const { video: v, fetchedAt } = await getVideo(input.id, "video-analyzer");
    if (!v) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");
    const { data: c } = await getChannelById(v.channelId, "video-analyzer");

    // Derived metrics (rates, vs-median) are channelpeek estimates, gated by plan 3.2.
    let derived: { likeRatePct: number | null; commentRatePct: number | null; vsMedian: number | null; sampleSize: number } | null = null;
    if (process.env.DERIVED_METRICS_APPROVED === "true") {
      let vsMedian: number | null = null;
      let sampleSize = 0;
      if (c.uploadsPlaylistId && v.views !== null) {
        const uploads = await getRecentUploads(c.uploadsPlaylistId, "video-analyzer");
        const { videos } = await getVideos(uploads.data.map((u) => u.videoId), "video-analyzer");
        const isShort = v.durationSeconds > 0 && v.durationSeconds <= SHORT_MAX_SECONDS;
        const sameFormat = [...videos.values()].filter(
          (x) => (x.durationSeconds > 0 && x.durationSeconds <= SHORT_MAX_SECONDS) === isShort && x.views !== null,
        );
        sampleSize = sameFormat.length;
        const med = median(sameFormat.map((x) => x.views as number));
        if (med && med > 0) vsMedian = Number((v.views / med).toFixed(1));
      }
      derived = {
        likeRatePct: v.views && v.likes !== null ? Number(((v.likes / v.views) * 100).toFixed(2)) : null,
        commentRatePct: v.views && v.comments !== null ? Number(((v.comments / v.views) * 100).toFixed(2)) : null,
        vsMedian,
        sampleSize,
      };
    }

    return Response.json({
      video: {
        id: v.id,
        title: v.title,
        publishedAt: v.publishedAt,
        durationSeconds: v.durationSeconds,
        views: v.views,
        likes: v.likes,
        comments: v.comments,
        tags: v.tags.length,
        hasCaptions: v.hasCaptions,
        thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
      },
      channel: {
        id: c.id,
        title: c.title,
        handle: c.handle,
        avatarUrl: c.avatarUrl,
        subscribers: c.subscribers,
        subscribersHidden: c.subscribersHidden,
      },
      derived,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
