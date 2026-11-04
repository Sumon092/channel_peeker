import { SHORT_MAX_SECONDS } from "@/lib/analyzer";
import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";
import { getRecentUploads } from "@/lib/youtube/uploads";
import { getVideos } from "@/lib/youtube/videos";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");
    const { data: c, fetchedAt } = await getChannel(input, "channel-earnings-estimator");

    // Views on uploads from the last 30 days: the raw basis the client's estimate starts from.
    let views30dLong = 0;
    let views30dShorts = 0;
    let uploads30d = 0;
    if (c.uploadsPlaylistId) {
      const uploads = await getRecentUploads(c.uploadsPlaylistId, "channel-earnings-estimator");
      const cutoff = Date.now() - 30 * 86_400_000;
      const recentIds = uploads.data.filter((u) => Date.parse(u.publishedAt) >= cutoff).map((u) => u.videoId);
      uploads30d = recentIds.length;
      const { videos } = await getVideos(recentIds, "channel-earnings-estimator");
      for (const v of videos.values()) {
        if (v.views === null) continue;
        if (v.durationSeconds > 0 && v.durationSeconds <= SHORT_MAX_SECONDS) views30dShorts += v.views;
        else views30dLong += v.views;
      }
    }

    return Response.json({
      channel: { id: c.id, title: c.title, handle: c.handle, avatarUrl: c.avatarUrl, subscribers: c.subscribers, subscribersHidden: c.subscribersHidden },
      views30dLong,
      views30dShorts,
      uploads30d,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
