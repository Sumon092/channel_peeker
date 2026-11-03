import { z } from "zod";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";
import { getThumbnails } from "@/lib/youtube/thumbnails";

const MAX_VIDEOS = 20;

export async function POST(req: Request) {
  try {
    const body = z.object({ inputs: z.array(z.string().max(2048)).min(1).max(MAX_VIDEOS) }).safeParse(await req.json().catch(() => null));
    if (!body.success) throw new AppError("invalid_input", `Paste between 1 and ${MAX_VIDEOS} video links.`);

    const ids: string[] = [];
    const invalid: string[] = [];
    for (const raw of body.data.inputs) {
      const r = parseYouTubeInput(raw, "video");
      if (r.ok && r.value.kind === "video") ids.push(r.value.id);
      else invalid.push(raw);
    }
    if (ids.length === 0) {
      throw new AppError("invalid_input", "We couldn't find a video in that. Paste a video or Shorts link, like youtube.com/watch?v=…");
    }

    await enforceRateLimit(req, "tool");
    const videos = await getThumbnails([...new Set(ids)]);
    return Response.json({ videos, invalid });
  } catch (err) {
    return errorResponse(err);
  }
}
