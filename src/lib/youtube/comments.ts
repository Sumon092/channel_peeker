import "server-only";
import { AppError } from "@/lib/errors";
import { kv, TTL } from "@/lib/kv";
import { ytGet } from "./client";

export interface CommentItem {
  id: string;
  author: string;
  authorAvatarUrl: string | null;
  authorChannelUrl: string | null;
  text: string;
  likes: number;
  replies: number;
  publishedAt: string;
}

interface ApiCommentThread {
  id: string;
  snippet?: {
    totalReplyCount?: number;
    topLevelComment?: {
      snippet?: {
        authorDisplayName?: string;
        authorProfileImageUrl?: string;
        authorChannelUrl?: string;
        textOriginal?: string;
        likeCount?: number;
        publishedAt?: string;
      };
    };
  };
}

interface ApiResponse {
  items?: ApiCommentThread[];
}

const cacheKey = (videoId: string, search: string, order: string) => `yt:comments:${videoId}:${order}:${search.toLowerCase()}:v1`;

/**
 * Top-level comments on a video via commentThreads.list (1 unit), optionally
 * filtered by YouTube's own `searchTerms` matching. Up to 100 threads.
 */
export async function getComments(
  videoId: string,
  search: string,
  order: "relevance" | "time",
  tool: string,
): Promise<{ comments: CommentItem[]; fetchedAt: string }> {
  const key = cacheKey(videoId, search, order);
  const hit = await kv.get<{ comments: CommentItem[]; fetchedAt: string }>(key).catch(() => null);
  if (hit) return hit;

  // The API rejects order=relevance combined with searchTerms (400 processingFailure),
  // so searches fetch in time order and we rank by likes ourselves below.
  const apiOrder = search ? "time" : order;

  let res: ApiResponse;
  try {
    res = await ytGet<ApiResponse>(
      "commentThreads",
      {
        part: "snippet",
        videoId,
        order: apiOrder,
        maxResults: 100,
        textFormat: "plainText",
        searchTerms: search || undefined,
        fields:
          "items(id,snippet(totalReplyCount,topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,authorChannelUrl,textOriginal,likeCount,publishedAt))))",
      },
      { tool },
    );
  } catch (err) {
    // commentThreads returns 403 for videos with comments turned off.
    if (err instanceof AppError && err.code === "private") {
      throw new AppError("private", "Comments are turned off on that video.");
    }
    throw err;
  }

  const comments: CommentItem[] = (res.items ?? []).flatMap((t) => {
    const c = t.snippet?.topLevelComment?.snippet;
    if (!c?.textOriginal) return [];
    return [
      {
        id: t.id,
        author: c.authorDisplayName ?? "Unknown",
        authorAvatarUrl: c.authorProfileImageUrl ?? null,
        authorChannelUrl: c.authorChannelUrl ?? null,
        text: c.textOriginal,
        likes: c.likeCount ?? 0,
        replies: t.snippet?.totalReplyCount ?? 0,
        publishedAt: c.publishedAt ?? "",
      },
    ];
  });

  if (search && order === "relevance") comments.sort((a, b) => b.likes - a.likes);

  const result = { comments, fetchedAt: new Date().toISOString() };
  await kv.set(key, result, TTL.hour).catch(() => {});
  return result;
}
