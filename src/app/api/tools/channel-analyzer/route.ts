import { buildAnalyzerReport } from "@/lib/analyzer";
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
    const { data: c, fetchedAt } = await getChannel(input, "channel-analyzer");

    let videoIds: string[] = [];
    if (c.uploadsPlaylistId) {
      const uploads = await getRecentUploads(c.uploadsPlaylistId, "channel-analyzer");
      videoIds = uploads.data.map((u) => u.videoId);
    }
    const { videos } = await getVideos(videoIds, "channel-analyzer");

    const report = buildAnalyzerReport(c, [...videos.values()], process.env.DERIVED_METRICS_APPROVED === "true");

    return Response.json({
      channel: {
        id: c.id,
        title: c.title,
        handle: c.handle,
        avatarUrl: c.avatarUrl,
        subscribers: c.subscribers,
        subscribersHidden: c.subscribersHidden,
        videoCount: c.videoCount,
        views: c.views,
        publishedAt: c.publishedAt,
        country: c.country,
      },
      report,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
