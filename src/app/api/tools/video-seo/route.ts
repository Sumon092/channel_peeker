import { readYouTubeInput } from "@/lib/api";
import { AppError, errorResponse } from "@/lib/errors";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getVideo } from "@/lib/youtube/videos";
import type { VideoSummary } from "@/lib/youtube/types";

type Status = "pass" | "warn" | "fail";

interface Check {
  id: string;
  label: string;
  status: Status;
  points: number;
  max: number;
  detail: string;
}

/** Rules-based metadata checklist. These are editorial checks, not performance metrics. */
function buildChecks(v: VideoSummary): Check[] {
  const checks: Check[] = [];
  const add = (id: string, label: string, max: number, status: Status, points: number, detail: string) =>
    checks.push({ id, label, status, points, max, detail });

  const titleLen = v.title.length;
  if (titleLen <= 70) add("title-length", "Title length", 20, "pass", 20, `${titleLen} characters — shows in full in search results.`);
  else add("title-length", "Title length", 20, "warn", 10, `${titleLen} characters — truncated after ~70 in desktop search. Front-load the key words.`);

  const allCaps = v.title === v.title.toUpperCase() && /[A-Z]/.test(v.title);
  add("title-caps", "Natural casing", 5, allCaps ? "warn" : "pass", allCaps ? 1 : 5, allCaps ? "All-caps titles often read as spammy." : "Mixed case reads naturally.");

  const descLen = v.description.length;
  if (descLen >= 200) add("description", "Description depth", 15, "pass", 15, `${descLen} characters — enough to give YouTube and viewers context.`);
  else if (descLen > 0) add("description", "Description depth", 15, "warn", 7, `Only ${descLen} characters. Aim for 200+, with the hook in the first two lines.`);
  else add("description", "Description depth", 15, "fail", 0, "No description. The first lines matter for search and click-through.");

  const hasTimestamps = /(^|\s)\d{1,2}:\d{2}/.test(v.description);
  add(
    "timestamps",
    "Chapters / timestamps",
    10,
    hasTimestamps ? "pass" : "warn",
    hasTimestamps ? 10 : 3,
    hasTimestamps ? "Timestamps found — enables chapters and key moments in search." : "No timestamps. Chapters improve navigation and can surface key moments in Google.",
  );

  const hasLink = /https?:\/\//.test(v.description);
  add("links", "Links in description", 5, hasLink ? "pass" : "warn", hasLink ? 5 : 2, hasLink ? "Links present (socials, related videos or sources)." : "No links — a missed chance to route viewers.");

  const tagChars = v.tags.join(",").length;
  if (v.tags.length > 0 && tagChars <= 500)
    add("tags", "Tags", 10, "pass", 10, `${v.tags.length} tags (${tagChars} of 500 characters). Minor ranking weight, but costs nothing.`);
  else if (v.tags.length === 0) add("tags", "Tags", 10, "warn", 4, "No tags. Their weight is small, but they help with misspellings and related topics.");
  else add("tags", "Tags", 10, "warn", 5, `Tags exceed the 500-character limit (${tagChars}); YouTube may ignore extras.`);

  const hashtags = (v.description.match(/#[\p{L}\p{N}_]{2,}/gu) ?? []).length + (v.title.match(/#[\p{L}\p{N}_]{2,}/gu) ?? []).length;
  if (hashtags > 0 && hashtags <= 15) add("hashtags", "Hashtags", 10, "pass", 10, `${hashtags} hashtag${hashtags === 1 ? "" : "s"} — the first 3 show above the title.`);
  else if (hashtags === 0) add("hashtags", "Hashtags", 10, "warn", 5, "No hashtags. Up to 3 show above the title and aid discovery slightly.");
  else add("hashtags", "Hashtags", 10, "warn", 2, `${hashtags} hashtags — over 60 and YouTube ignores all of them; keep it to a relevant few.`);

  add(
    "captions",
    "Captions",
    15,
    v.hasCaptions ? "pass" : "warn",
    v.hasCaptions ? 15 : 5,
    v.hasCaptions ? "Captions available — better accessibility and watch time." : "No captions detected. Captions help accessibility, retention and international reach.",
  );

  add(
    "language",
    "Language set",
    10,
    v.language ? "pass" : "warn",
    v.language ? 10 : 4,
    v.language ? `Video language is set (${v.language}).` : "No language set — setting it helps YouTube serve the right audience and auto-translate metadata.",
  );

  return checks;
}

export async function POST(req: Request) {
  try {
    const input = await readYouTubeInput(req, "video");
    if (input.kind !== "video") throw new AppError("invalid_input", "Paste a link to a single video.");
    await enforceRateLimit(req, "tool");
    const { video: v, fetchedAt } = await getVideo(input.id, "video-seo-score");
    if (!v) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");

    const checks = buildChecks(v);
    const score = Math.round((checks.reduce((a, c) => a + c.points, 0) / checks.reduce((a, c) => a + c.max, 0)) * 100);

    return Response.json({
      video: {
        id: v.id,
        title: v.title,
        channelTitle: v.channelTitle,
        thumbnailUrl: (v.thumbnails.medium ?? v.thumbnails.high ?? v.thumbnails.default)?.url ?? null,
      },
      score,
      checks,
      fetchedAt,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
