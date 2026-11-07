import { readYouTubeInput } from "@/lib/api";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getCommentsForPicker } from "@/lib/youtube/comments";
import { getVideo } from "@/lib/youtube/videos";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "video");
    if (input.kind !== "video") throw new AppError("invalid_input", "Paste a link to a single video.");
    await enforceRateLimit(req, "tool");

    const { video: v, fetchedAt } = await getVideo(input.id, "comment-picker");
    if (!v) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");

    const picker = await getCommentsForPicker(v.id, "comment-picker");

    return Response.json({
      video: {
        id: v.id,
        title: v.title,
        channelTitle: v.channelTitle,
        commentCount: v.comments,
        thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
      },
      comments: picker.comments,
      hasMore: picker.hasMore,
      pagesFetched: picker.pagesFetched,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
