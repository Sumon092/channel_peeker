import { readYouTubeInput } from "@/lib/api";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getVideo, getVideoAvailability } from "@/lib/youtube/videos";

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "video");
    if (input.kind !== "video") throw new AppError("invalid_input", "Paste a link to a single video.");
    await enforceRateLimit(req, "tool");

    const { video: v, fetchedAt } = await getVideo(input.id, "region-restriction");
    if (!v) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");
    const { data: availability } = await getVideoAvailability(v.id, "region-restriction");

    return Response.json({
      video: {
        id: v.id,
        title: v.title,
        channelTitle: v.channelTitle,
        thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
      },
      availability,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
