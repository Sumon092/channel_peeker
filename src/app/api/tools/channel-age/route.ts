import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");
    const { data: c, fetchedAt } = await getChannel(input, "channel-age-checker");
    return Response.json({
      channel: {
        id: c.id,
        title: c.title,
        handle: c.handle,
        avatarUrl: c.avatarUrl,
        publishedAt: c.publishedAt,
        subscribers: c.subscribers,
        subscribersHidden: c.subscribersHidden,
        videoCount: c.videoCount,
        views: c.views,
      },
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
