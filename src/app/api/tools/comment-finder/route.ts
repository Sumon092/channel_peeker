import { z } from "zod";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getComments } from "@/lib/youtube/comments";
import { parseYouTubeInput } from "@/lib/youtube/parse-input";
import { getVideo } from "@/lib/youtube/videos";

const bodySchema = z.object({
  input: z.string().max(4096),
  search: z.string().max(200).optional(),
  order: z.enum(["relevance", "time"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = bodySchema.safeParse(await req.json().catch(() => null));
    if (!body.success) throw new AppError("invalid_input", "Paste a YouTube video link or ID.");
    const parsed = parseYouTubeInput(body.data.input, "video");
    if (!parsed.ok || parsed.value.kind !== "video") throw new AppError("invalid_input", "Paste a link to a single video.");
    await enforceRateLimit(req, "tool");

    const search = body.data.search?.trim() ?? "";
    const order = body.data.order ?? "relevance";

    const { video: v, fetchedAt } = await getVideo(parsed.value.id, "comment-finder");
    if (!v) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");

    const { comments } = await getComments(v.id, search, order, "comment-finder");

    return Response.json({
      video: {
        id: v.id,
        title: v.title,
        commentCount: v.comments,
        thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
      },
      search,
      order,
      comments,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
