import { readYouTubeInput } from "@/lib/api";
import { errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel, getChannelBranding } from "@/lib/youtube/channels";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "channel");
    await enforceRateLimit(req, "tool");

    const { data: c, fetchedAt } = await getChannel(input, "channel-tags");
    const { data: branding } = await getChannelBranding(c.id, "channel-tags");

    return Response.json({
      channel: { id: c.id, title: c.title, handle: c.handle, avatarUrl: c.avatarUrl },
      keywords: branding.keywords,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
