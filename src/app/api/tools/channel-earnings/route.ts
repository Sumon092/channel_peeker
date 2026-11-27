import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";
import { getRecentViews } from "@/lib/youtube/recent-views";
import { getRecentUploads } from "@/lib/youtube/uploads";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");
    const { data: c, fetchedAt } = await getChannel(input, "channel-earnings-estimator");

    // Views on uploads from the last 30 days: the raw basis the client's estimate starts from.
    const recent = c.uploadsPlaylistId
      ? await getRecentViews((await getRecentUploads(c.uploadsPlaylistId, "channel-earnings-estimator")).data, "channel-earnings-estimator")
      : { views30dLong: 0, views30dShorts: 0, uploads30d: 0 };

    return Response.json({
      channel: { id: c.id, title: c.title, handle: c.handle, avatarUrl: c.avatarUrl, subscribers: c.subscribers, subscribersHidden: c.subscribersHidden },
      ...recent,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
