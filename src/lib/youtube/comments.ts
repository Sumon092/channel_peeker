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
  nextPageToken?: string;
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

  const comments = toItems(res);

  if (search && order === "relevance") comments.sort((a, b) => b.likes - a.likes);

  const result = { comments, fetchedAt: new Date().toISOString() };
  await kv.set(key, result, TTL.hour).catch(() => {});
  return result;
}

function toItems(res: ApiResponse): CommentItem[] {
  return (res.items ?? []).flatMap((t) => {
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
}

export interface PickerComments {
  comments: CommentItem[];
  /** True when the video has more top-level comments than our page cap fetched. */
  hasMore: boolean;
  pagesFetched: number;
  fetchedAt: string;
}

const PICKER_MAX_PAGES = 5;

/**
 * Up to 500 most recent top-level comments for giveaway draws (1 unit per page,
 * max 5 pages). Cached only 15 minutes so draws see fresh entries.
 */
export async function getCommentsForPicker(videoId: string, tool: string): Promise<PickerComments> {
  const key = `yt:picker:${videoId}:v1`;
  const hit = await kv.get<PickerComments>(key).catch(() => null);
  if (hit) return hit;

  const comments: CommentItem[] = [];
  let pageToken: string | undefined;
  let pagesFetched = 0;
  let hasMore = false;

  try {
    do {
      const res: ApiResponse = await ytGet<ApiResponse>(
        "commentThreads",
        {
          part: "snippet",
          videoId,
          order: "time",
          maxResults: 100,
          textFormat: "plainText",
          pageToken,
          fields:
            "nextPageToken,items(id,snippet(totalReplyCount,topLevelComment(snippet(authorDisplayName,authorProfileImageUrl,authorChannelUrl,textOriginal,likeCount,publishedAt))))",
        },
        { tool },
      );
      comments.push(...toItems(res));
      pagesFetched += 1;
      pageToken = res.nextPageToken;
      hasMore = Boolean(pageToken);
    } while (pageToken && pagesFetched < PICKER_MAX_PAGES);
  } catch (err) {
    if (err instanceof AppError && err.code === "private") {
      throw new AppError("private", "Comments are turned off on that video.");
    }
    throw err;
  }

  const result: PickerComments = { comments, hasMore, pagesFetched, fetchedAt: new Date().toISOString() };
  await kv.set(key, result, 15 * TTL.minute).catch(() => {});
  return result;
}
