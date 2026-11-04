import { median, SHORT_MAX_SECONDS } from "@/lib/analyzer";
import { readYouTubeInput } from "@/lib/api";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";
import { getRecentUploads } from "@/lib/youtube/uploads";
import { getVideos } from "@/lib/youtube/videos";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");
    const { data: c, fetchedAt } = await getChannel(input, "outlier-finder");
    if (!c.uploadsPlaylistId) throw new AppError("not_found", "That channel has no public uploads to analyze.");

    const uploads = await getRecentUploads(c.uploadsPlaylistId, "outlier-finder");
    const { videos } = await getVideos(uploads.data.map((u) => u.videoId), "outlier-finder");
    const list = [...videos.values()].filter((v) => v.views !== null);

    const derivedEnabled = process.env.DERIVED_METRICS_APPROVED === "true";
    const isShort = (d: number) => d > 0 && d <= SHORT_MAX_SECONDS;
    const medLong = derivedEnabled ? median(list.filter((v) => !isShort(v.durationSeconds)).map((v) => v.views as number)) : null;
    const medShorts = derivedEnabled ? median(list.filter((v) => isShort(v.durationSeconds)).map((v) => v.views as number)) : null;

    const items = list
      .map((v) => {
        const short = isShort(v.durationSeconds);
        const med = short ? medShorts : medLong;
        return {
          id: v.id,
          title: v.title,
          publishedAt: v.publishedAt,
          durationSeconds: v.durationSeconds,
          isShort: short,
          views: v.views as number,
          thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
          multiplier: derivedEnabled && med && med > 0 ? Number(((v.views as number) / med).toFixed(1)) : null,
        };
      })
      .sort((a, b) => (b.multiplier ?? b.views) - (a.multiplier ?? a.views));

    return Response.json({
      channel: { id: c.id, title: c.title, handle: c.handle, avatarUrl: c.avatarUrl, subscribers: c.subscribers, subscribersHidden: c.subscribersHidden },
      videos: items,
      medians: derivedEnabled ? { long: medLong, shorts: medShorts } : null,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
