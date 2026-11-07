import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel, getChannelBranding } from "@/lib/youtube/channels";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");

    const { data: c, fetchedAt } = await getChannel(input, "banner-downloader");
    const { data: branding } = await getChannelBranding(c.id, "banner-downloader");

    return Response.json({
      channel: { id: c.id, title: c.title, handle: c.handle, avatarUrl: c.avatarUrl },
      bannerUrl: branding.bannerUrl,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
