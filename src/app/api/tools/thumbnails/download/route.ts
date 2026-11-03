import { THUMB_FILES } from "@/lib/youtube/thumbnails";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const SIZE = /^[a-z]{3,10}$/;

/** Resolves the upstream URL. Only i.ytimg.com paths for this exact video are allowed (no open proxy). */
function upstreamUrl(id: string, size: string, src: string | null): string | null {
  if (THUMB_FILES[size]) return `https://i.ytimg.com/vi/${id}/${THUMB_FILES[size]}`;
  if (!src) return null;
  try {
    const u = new URL(src);
    const allowed = u.protocol === "https:" && u.hostname === "i.ytimg.com" && (u.pathname.startsWith(`/vi/${id}/`) || u.pathname.startsWith(`/vi_webp/${id}/`));
    return allowed ? u.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Streams a thumbnail back as a file download. Browsers ignore the `download` attribute on
 * cross-origin links, so we proxy.
 */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const id = params.get("id") ?? "";
  const size = params.get("size") ?? "";
  if (!VIDEO_ID.test(id) || !SIZE.test(size)) return new Response("Invalid request", { status: 400 });

  const target = upstreamUrl(id, size, params.get("src"));
  if (!target) return new Response("Invalid request", { status: 400 });

  const upstream = await fetch(target, { signal: AbortSignal.timeout(10000) }).catch(() => null);
  if (!upstream?.ok || !upstream.body) return new Response("Thumbnail not found", { status: 404 });

  const type = upstream.headers.get("content-type") ?? "image/jpeg";
  const ext = type.includes("webp") ? "webp" : "jpg";
  return new Response(upstream.body, {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="youtube-thumbnail-${id}-${size}.${ext}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
