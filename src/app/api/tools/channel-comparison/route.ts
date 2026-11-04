import { z } from "zod";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getChannel } from "@/lib/youtube/channels";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = z.object({ inputs: z.array(z.string().max(4096)).min(2).max(4) }).safeParse(body);
    if (!parsed.success) throw new AppError("invalid_input", "Paste 2 to 4 channel links or @handles.");
    await enforceRateLimit(req, "tool");

    const refs = parsed.data.inputs.map((input) => {
      const r = parseYouTubeInput(input, "channel");
      if (!r.ok) throw new AppError("invalid_input", `"${input.slice(0, 60)}": ${r.message}`);
      return r.value;
    });

    const results = await Promise.all(refs.map((ref) => getChannel(ref, "channel-comparison")));
    const seen = new Set<string>();
    const channels = results
      .filter(({ data: c }) => (seen.has(c.id) ? false : (seen.add(c.id), true)))
      .map(({ data: c }) => ({
        id: c.id,
        title: c.title,
        handle: c.handle,
        avatarUrl: c.avatarUrl,
        publishedAt: c.publishedAt,
        country: c.country,
        subscribers: c.subscribers,
        subscribersHidden: c.subscribersHidden,
        views: c.views,
        videoCount: c.videoCount,
      }));
    if (channels.length < 2) throw new AppError("invalid_input", "Those links point to the same channel. Paste 2 to 4 different channels.");

    return Response.json({ channels, fetchedAt: results.reduce((min, r) => (r.fetchedAt < min ? r.fetchedAt : min), results[0].fetchedAt) });
  } catch (err) {
    return errorResponse(err);
  }
}
