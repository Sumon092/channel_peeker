import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { ACTIVITY_WINDOW_DAYS, buildMonetizationReport } from "@/lib/monetization";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";
import { getRecentUploads } from "@/lib/youtube/uploads";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");
    const { data: c, fetchedAt } = await getChannel(input, "monetization-checker");
    const uploadDates = c.uploadsPlaylistId
      ? (await getRecentUploads(c.uploadsPlaylistId, "monetization-checker")).data.map((u) => u.publishedAt)
      : [];
    const { verdict, signals } = buildMonetizationReport(c, uploadDates);
    const cutoff = Date.now() - ACTIVITY_WINDOW_DAYS * 86_400_000;
    return Response.json({
      channel: {
        id: c.id,
        title: c.title,
        handle: c.handle,
        avatarUrl: c.avatarUrl,
        subscribers: c.subscribers,
        subscribersHidden: c.subscribersHidden,
        videoCount: c.videoCount,
        // Raw inputs so localized pages can rebuild the signal texts natively.
        country: c.country,
        madeForKids: c.madeForKids,
        recentUploads: uploadDates.filter((d) => Date.parse(d) >= cutoff).length,
      },
      verdict,
      signals,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
