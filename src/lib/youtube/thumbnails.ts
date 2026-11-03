import "server-only";
import { kv, TTL } from "@/lib/kv";
import type { ThumbnailKey } from "./types";
import { getVideos } from "./videos";

export interface ThumbnailSize {
  key: ThumbnailKey;
  label: string;
  width: number;
  height: number;
  url: string;
  bytes: number | null;
}

/** Standard sizes served from i.ytimg.com. Building these URLs costs zero API quota. */
const STANDARD: { key: ThumbnailKey; file: string; label: string; width: number; height: number }[] = [
  { key: "maxres", file: "maxresdefault.jpg", label: "Max resolution (HD)", width: 1280, height: 720 },
  { key: "standard", file: "sddefault.jpg", label: "Standard (SD)", width: 640, height: 480 },
  { key: "high", file: "hqdefault.jpg", label: "High", width: 480, height: 360 },
  { key: "medium", file: "mqdefault.jpg", label: "Medium", width: 320, height: 180 },
  { key: "default", file: "default.jpg", label: "Default", width: 120, height: 90 },
];

/** Higher-resolution sizes YouTube added in 2026; only discoverable through the API. */
const HIGH_RES: { key: ThumbnailKey; label: string }[] = [
  { key: "uhd", label: "4K (UHD)" },
  { key: "qhd", label: "1440p (QHD)" },
  { key: "fhd", label: "1080p (Full HD)" },
];

export const THUMB_FILES = Object.fromEntries(STANDARD.map((s) => [s.key, s.file])) as Record<string, string>;

/**
 * HEAD-checks a thumbnail. YouTube answers 404 for sizes that don't exist
 * (typically maxres on older or low-resolution uploads).
 */
async function probe(url: string): Promise<{ ok: boolean; bytes: number | null }> {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store", signal: AbortSignal.timeout(5000) });
    const len = res.headers.get("content-length");
    return { ok: res.ok, bytes: len ? Number(len) : null };
  } catch {
    return { ok: false, bytes: null };
  }
}

export interface VideoThumbnails {
  id: string;
  title: string | null;
  sizes: ThumbnailSize[];
  /** True when the high-resolution (1080p+) check ran against the API. */
  checkedHighRes: boolean;
}

async function standardSizes(id: string): Promise<ThumbnailSize[]> {
  const cacheKey = `thumbs:std:${id}:v1`;
  const hit = await kv.get<ThumbnailSize[]>(cacheKey).catch(() => null);
  if (hit) return hit;

  const probed = await Promise.all(
    STANDARD.map(async (s) => {
      const url = `https://i.ytimg.com/vi/${id}/${s.file}`;
      const { ok, bytes } = await probe(url);
      return ok ? { key: s.key, label: s.label, width: s.width, height: s.height, url, bytes } : null;
    }),
  );
  const sizes = probed.filter((s): s is ThumbnailSize => s !== null);
  await kv.set(cacheKey, sizes, 7 * TTL.day).catch(() => {});
  return sizes;
}

export async function getThumbnails(ids: string[]): Promise<VideoThumbnails[]> {
  // Titles and 1080p+ sizes need the API (1 unit per 50 videos). Skip gracefully without a key.
  let apiVideos: Awaited<ReturnType<typeof getVideos>>["videos"] | null = null;
  if (process.env.YOUTUBE_API_KEY) {
    apiVideos = await getVideos(ids, "thumbnail-downloader")
      .then((r) => r.videos)
      .catch(() => null);
  }

  return Promise.all(
    ids.map(async (id) => {
      const sizes = await standardSizes(id);
      const video = apiVideos?.get(id);
      const extra: ThumbnailSize[] = [];
      for (const h of HIGH_RES) {
        const t = video?.thumbnails[h.key];
        if (t?.url && t.width && t.height) extra.push({ key: h.key, label: h.label, width: t.width, height: t.height, url: t.url, bytes: null });
      }
      return { id, title: video?.title ?? null, sizes: [...extra, ...sizes], checkedHighRes: apiVideos !== null };
    }),
  );
}
