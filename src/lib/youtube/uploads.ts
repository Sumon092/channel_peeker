import "server-only";
import { cached, TTL } from "@/lib/kv";
import { ytGet } from "./client";

interface ApiPlaylistItem {
  contentDetails?: { videoId?: string; videoPublishedAt?: string };
}

export interface RecentUpload {
  videoId: string;
  publishedAt: string;
}

/**
 * A channel's most recent uploads (newest first, up to 50) from the uploads
 * playlist: 1 quota unit instead of search.list's 100. Private and scheduled
 * videos have no videoPublishedAt and are skipped.
 */
export async function getRecentUploads(uploadsPlaylistId: string, tool: string) {
  return cached(`yt:uploads:${uploadsPlaylistId}:v2`, 2 * TTL.hour, async () => {
    const res = await ytGet<{ items?: ApiPlaylistItem[] }>(
      "playlistItems",
      {
        part: "contentDetails",
        playlistId: uploadsPlaylistId,
        maxResults: 50,
        fields: "items(contentDetails(videoId,videoPublishedAt))",
      },
      { tool },
    );
    return (res.items ?? [])
      .map((i) => i.contentDetails)
      .filter((c): c is { videoId: string; videoPublishedAt: string } => Boolean(c?.videoId && c?.videoPublishedAt))
      .map((c) => ({ videoId: c.videoId, publishedAt: c.videoPublishedAt }) satisfies RecentUpload);
  });
}
