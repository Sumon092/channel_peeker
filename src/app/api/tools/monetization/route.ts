import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { buildMonetizationReport } from "@/lib/monetization";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";
import { getRecentViews } from "@/lib/youtube/recent-views";
import { getRecentUploads } from "@/lib/youtube/uploads";

const TOOL = "monetization-checker";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");
    const { data: c, fetchedAt } = await getChannel(input, TOOL);
    const uploads = c.uploadsPlaylistId ? (await getRecentUploads(c.uploadsPlaylistId, TOOL)).data : [];
    // Statuses and raw data only: the widget renders every text in the page's language.
    const report = buildMonetizationReport(
      c,
      uploads.map((u) => u.publishedAt),
    );
    // The earnings range is only shown when the ad tier's public requirements are met, so only then
    // spend the extra videos.list call (same 30-day basis as the earnings estimator).
    const recentViews = report.tiers.ad.verdict === "met" ? await getRecentViews(uploads, TOOL) : null;
    return Response.json({
      channel: {
        id: c.id,
        title: c.title,
        handle: c.handle,
        avatarUrl: c.avatarUrl,
        subscribers: c.subscribers,
        subscribersHidden: c.subscribersHidden,
        videoCount: c.videoCount,
        country: c.country,
        madeForKids: c.madeForKids,
      },
      ...report,
      recentViews,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
