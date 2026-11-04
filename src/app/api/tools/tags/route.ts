import { readYouTubeInput } from "@/lib/api";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getVideo } from "@/lib/youtube/videos";

/** #hashtags from the title and description, deduplicated, in order of appearance. */
function extractHashtags(...texts: string[]): string[] {
  const seen = new Set<string>();
  for (const text of texts) {
    for (const m of text.matchAll(/#[\p{L}\p{N}_]{2,100}/gu)) {
      seen.add(m[0]);
    }
  }
  return [...seen];
}

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "video");
    if (input.kind !== "video") {
      throw new AppError("invalid_input", "Paste a link to a video — tags belong to a single video, not a channel.");
    }
    await enforceRateLimit(req, "tool");
    const { video: v, fetchedAt } = await getVideo(input.id, "tag-extractor");
    if (!v) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");
    return Response.json({
      video: {
        id: v.id,
        title: v.title,
        channelTitle: v.channelTitle,
        publishedAt: v.publishedAt,
        thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
      },
      tags: v.tags,
      hashtags: extractHashtags(v.title, v.description),
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
