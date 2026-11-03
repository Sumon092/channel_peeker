/**
 * Turns whatever a user pastes (URL, @handle, channel ID, video ID, playlist link) into a typed
 * reference, using regexes only. Costs zero API quota; never falls back to search.list.
 */

export type ChannelRef =
  | { kind: "channel"; by: "id"; id: string }
  | { kind: "channel"; by: "handle"; handle: string }
  | { kind: "channel"; by: "username"; username: string };

export type VideoRef = { kind: "video"; id: string; playlistId?: string };
export type PlaylistRef = { kind: "playlist"; id: string };
export type ParsedInput = ChannelRef | VideoRef | PlaylistRef;

export type ParseErrorCode = "empty" | "too_long" | "not_youtube" | "custom_url" | "unrecognized";

export type ParseResult = { ok: true; value: ParsedInput } | { ok: false; code: ParseErrorCode; message: string };

/** What the calling tool wants; decides how an ambiguous bare token is read. */
export type Expect = "any" | "video" | "channel";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const CHANNEL_ID = /^UC[A-Za-z0-9_-]{22}$/;
const PLAYLIST_ID = /^(PL|UU|LL|FL|RD|OL|UUSH|UULF)[A-Za-z0-9_-]{10,}$/;
// Handles: 3–30 chars of letters (any script), digits, underscore, hyphen, period.
const HANDLE = /^[\p{L}\p{M}\p{N}_.-]{3,30}$/u;

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "gaming.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);
const SHORT_HOSTS = new Set(["youtu.be", "www.youtu.be"]);

const RESERVED_PATHS = new Set([
  "feed", "results", "playlist", "watch", "shorts", "live", "embed", "channel", "user", "c",
  "about", "account", "premium", "gaming", "music", "kids", "t", "howyoutubeworks", "hashtag", "post",
]);

const MAX_INPUT = 2048;

const errors = {
  empty: "Paste a YouTube link, @handle or ID.",
  too_long: "That input is too long to be a YouTube link.",
  not_youtube: "That link isn't from YouTube. Paste a youtube.com or youtu.be link.",
  custom_url:
    "YouTube no longer lets tools look up old /c/ custom URLs. Paste the channel's @handle or a link to any of its videos instead.",
  unrecognized: "We couldn't recognize that. Try a video link, a channel link, or an @handle.",
} satisfies Record<ParseErrorCode, string>;

const fail = (code: ParseErrorCode): ParseResult => ({ ok: false, code, message: errors[code] });
const ok = (value: ParsedInput): ParseResult => ({ ok: true, value });

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function parseHandle(raw: string): ParseResult {
  const handle = safeDecode(raw.replace(/^@/, ""));
  return HANDLE.test(handle) ? ok({ kind: "channel", by: "handle", handle }) : fail("unrecognized");
}

function looksLikeUrl(s: string) {
  return /^(https?:)?\/\//i.test(s) || /^([a-z0-9-]+\.)*(youtube(-nocookie)?\.com|youtu\.be)(\/|$|\?)/i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+\//i.test(s);
}

export function parseYouTubeInput(input: string, expect: Expect = "any"): ParseResult {
  const s = input.trim();
  if (!s) return fail("empty");
  if (s.length > MAX_INPUT) return fail("too_long");

  if (!looksLikeUrl(s)) return parseBare(s, expect);

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(s) ? s : `https://${s.replace(/^\/\//, "")}`);
  } catch {
    return fail("unrecognized");
  }
  const host = url.hostname.toLowerCase();
  const segments = url.pathname.split("/").filter(Boolean);

  if (SHORT_HOSTS.has(host)) {
    const id = segments[0];
    return id && VIDEO_ID.test(id) ? ok(withList({ kind: "video", id }, url)) : fail("unrecognized");
  }
  if (!YOUTUBE_HOSTS.has(host)) return fail("not_youtube");

  const [first, second] = segments;
  const v = url.searchParams.get("v");
  const list = url.searchParams.get("list");

  if (first === "watch" || (!first && v)) {
    return v && VIDEO_ID.test(v) ? ok(withList({ kind: "video", id: v }, url)) : fail("unrecognized");
  }
  if (first && ["shorts", "live", "embed", "v", "e"].includes(first)) {
    // /embed/videoseries?list=PL... ("videoseries" is 11 chars, so check it before VIDEO_ID)
    if (second === "videoseries") {
      return list && PLAYLIST_ID.test(list) ? ok({ kind: "playlist", id: list }) : fail("unrecognized");
    }
    if (second && VIDEO_ID.test(second)) return ok(withList({ kind: "video", id: second }, url));
    return fail("unrecognized");
  }
  if (first === "playlist") {
    return list && PLAYLIST_ID.test(list) ? ok({ kind: "playlist", id: list }) : fail("unrecognized");
  }
  if (first === "channel") {
    return second && CHANNEL_ID.test(second) ? ok({ kind: "channel", by: "id", id: second }) : fail("unrecognized");
  }
  if (first === "user") {
    return second && /^[A-Za-z0-9_.-]{1,100}$/.test(second) ? ok({ kind: "channel", by: "username", username: second }) : fail("unrecognized");
  }
  if (first === "c") return fail("custom_url");
  if (first && safeDecode(first).startsWith("@")) return parseHandle(first);
  // Legacy vanity URLs like youtube.com/SomeName behave like /c/ URLs.
  if (first && !RESERVED_PATHS.has(first.toLowerCase()) && segments.length <= 2) return fail("custom_url");

  return fail("unrecognized");
}

function withList(ref: VideoRef, url: URL): VideoRef {
  const list = url.searchParams.get("list");
  return list && PLAYLIST_ID.test(list) ? { ...ref, playlistId: list } : ref;
}

function parseBare(s: string, expect: Expect): ParseResult {
  if (/\s/.test(s)) return fail("unrecognized");
  if (s.startsWith("@")) return parseHandle(s);
  if (CHANNEL_ID.test(s)) return ok({ kind: "channel", by: "id", id: s });
  if (expect !== "channel" && PLAYLIST_ID.test(s) && s.length > 11) return ok({ kind: "playlist", id: s });
  // An 11-character token is read as a video ID unless the tool only accepts channels.
  if (expect !== "channel" && VIDEO_ID.test(s)) return ok({ kind: "video", id: s });
  if (expect !== "video") return parseHandle(s);
  return fail("unrecognized");
}
