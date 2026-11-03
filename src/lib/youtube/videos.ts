import "server-only";
import { kv, TTL } from "@/lib/kv";
import { chunk, ytGet } from "./client";
import type { Thumbnail, ThumbnailKey, VideoSummary } from "./types";

interface ApiVideo {
  id: string;
  snippet?: {
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    publishedAt: string;
    tags?: string[];
    categoryId?: string;
    defaultAudioLanguage?: string;
    defaultLanguage?: string;
    liveBroadcastContent?: string;
    thumbnails?: Partial<Record<ThumbnailKey, Thumbnail>>;
  };
  statistics?: { viewCount?: string; likeCount?: string; commentCount?: string };
  contentDetails?: { duration?: string; caption?: string };
  status?: { madeForKids?: boolean };
}

const num = (v: string | undefined) => (v === undefined ? null : Number(v));

/** ISO 8601 duration (PT1H2M3S, P1DT2H) to seconds. */
export function parseDuration(iso: string | undefined): number {
  const m = iso?.match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
  if (!m) return 0;
  const [, d, h, min, s] = m.map((x) => Number(x ?? 0));
  return d * 86400 + h * 3600 + min * 60 + s;
}

function toSummary(v: ApiVideo): VideoSummary {
  const s = v.snippet!;
  return {
    id: v.id,
    channelId: s.channelId,
    channelTitle: s.channelTitle,
    title: s.title,
    description: s.description,
    publishedAt: s.publishedAt,
    tags: s.tags ?? [],
    categoryId: s.categoryId ?? null,
    language: s.defaultAudioLanguage ?? s.defaultLanguage ?? null,
    durationSeconds: parseDuration(v.contentDetails?.duration),
    hasCaptions: v.contentDetails?.caption === "true",
    madeForKids: v.status?.madeForKids ?? null,
    liveBroadcast: s.liveBroadcastContent && s.liveBroadcastContent !== "none" ? s.liveBroadcastContent : null,
    thumbnails: s.thumbnails ?? {},
    views: num(v.statistics?.viewCount),
    likes: num(v.statistics?.likeCount),
    comments: num(v.statistics?.commentCount),
  };
}

/** Plan 7.3: fresh videos refresh every 2 h, older ones every 12 h. */
function ttlFor(v: VideoSummary) {
  const ageDays = (Date.now() - Date.parse(v.publishedAt)) / 86_400_000;
  return ageDays < 7 ? 2 * TTL.hour : 12 * TTL.hour;
}

const videoKey = (id: string) => `yt:video:${id}:v1`;
const missingKey = (id: string) => `yt:video-missing:${id}`;

/**
 * Fetches videos by ID, serving each from cache when possible and batching the rest
 * 50 per call (1 unit each). Missing, private or deleted IDs are simply absent from the result.
 */
export async function getVideos(ids: string[], tool: string): Promise<{ videos: Map<string, VideoSummary>; fetchedAt: string }> {
  const unique = [...new Set(ids)];
  const videos = new Map<string, VideoSummary>();
  let oldest = new Date().toISOString();

  const hits = await Promise.all(unique.map((id) => kv.get<{ data: VideoSummary | null; fetchedAt: string }>(videoKey(id)).catch(() => null)));
  const missingHits = await Promise.all(unique.map((id) => kv.get<boolean>(missingKey(id)).catch(() => null)));
  const toFetch: string[] = [];
  unique.forEach((id, i) => {
    const hit = hits[i];
    if (hit?.data) {
      videos.set(id, hit.data);
      if (hit.fetchedAt < oldest) oldest = hit.fetchedAt;
    } else if (!missingHits[i]) {
      toFetch.push(id);
    }
  });

  for (const batch of chunk(toFetch)) {
    const res = await ytGet<{ items?: ApiVideo[] }>(
      "videos",
      {
        part: "snippet,statistics,contentDetails,status",
        id: batch.join(","),
        maxResults: 50,
        fields:
          "items(id,snippet(channelId,channelTitle,title,description,publishedAt,tags,categoryId,defaultAudioLanguage,defaultLanguage,liveBroadcastContent,thumbnails),statistics(viewCount,likeCount,commentCount),contentDetails(duration,caption),status(madeForKids))",
      },
      { tool },
    );
    const fetchedAt = new Date().toISOString();
    const found = new Set<string>();
    for (const item of res.items ?? []) {
      if (!item.snippet) continue;
      const summary = toSummary(item);
      videos.set(summary.id, summary);
      found.add(summary.id);
      await kv.set(videoKey(summary.id), { data: summary, fetchedAt }, ttlFor(summary)).catch(() => {});
    }
    // Remember misses briefly so repeated lookups of a deleted video don't burn quota.
    for (const id of batch) if (!found.has(id)) await kv.set(missingKey(id), true, TTL.hour).catch(() => {});
  }

  return { videos, fetchedAt: oldest };
}

export async function getVideo(id: string, tool: string) {
  const { videos, fetchedAt } = await getVideos([id], tool);
  return { video: videos.get(id) ?? null, fetchedAt };
}

