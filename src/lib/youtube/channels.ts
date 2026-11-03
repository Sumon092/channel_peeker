import "server-only";
import { AppError } from "@/lib/errors";
import { cached, TTL } from "@/lib/kv";
import { ytGet } from "./client";
import type { ChannelRef, ParsedInput } from "./parse-input";
import type { ChannelSummary } from "./types";
import { getVideo } from "./videos";

interface ApiChannel {
  id: string;
  snippet?: {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string;
    country?: string;
    thumbnails?: Record<string, { url: string }>;
  };
  statistics?: { viewCount?: string; subscriberCount?: string; hiddenSubscriberCount?: boolean; videoCount?: string };
  contentDetails?: { relatedPlaylists?: { uploads?: string } };
}

const CHANNEL_FIELDS =
  "items(id,snippet(title,description,customUrl,publishedAt,country,thumbnails),statistics(viewCount,subscriberCount,hiddenSubscriberCount,videoCount),contentDetails(relatedPlaylists(uploads)))";

function toSummary(c: ApiChannel): ChannelSummary {
  const s = c.snippet!;
  const st = c.statistics ?? {};
  const thumbs = s.thumbnails ?? {};
  return {
    id: c.id,
    title: s.title,
    handle: s.customUrl?.startsWith("@") ? s.customUrl : s.customUrl ? `@${s.customUrl}` : null,
    description: s.description,
    country: s.country ?? null,
    publishedAt: s.publishedAt,
    avatarUrl: (thumbs.high ?? thumbs.medium ?? thumbs.default)?.url ?? null,
    uploadsPlaylistId: c.contentDetails?.relatedPlaylists?.uploads ?? null,
    subscribers: st.hiddenSubscriberCount ? null : Number(st.subscriberCount ?? 0),
    subscribersHidden: Boolean(st.hiddenSubscriberCount),
    views: Number(st.viewCount ?? 0),
    videoCount: Number(st.videoCount ?? 0),
  };
}

const notFound = () => new AppError("not_found", "Channel not found. Check the @handle, or paste a link to one of its videos.");

async function fetchChannel(filter: Record<string, string>, tool: string): Promise<ChannelSummary> {
  const res = await ytGet<{ items?: ApiChannel[] }>(
    "channels",
    { part: "snippet,statistics,contentDetails", fields: CHANNEL_FIELDS, ...filter },
    { tool },
  );
  const item = res.items?.[0];
  if (!item?.snippet) throw notFound();
  return toSummary(item);
}

/** Channel stats are cached 6 h (plan 7.3); the handle → ID mapping for 30 days. */
export async function getChannelById(id: string, tool: string) {
  return cached(`yt:channel:${id}:v1`, 6 * TTL.hour, () => fetchChannel({ id }, tool));
}

async function resolveChannelId(ref: ChannelRef, tool: string): Promise<string> {
  if (ref.by === "id") return ref.id;
  const [cacheKey, filter] =
    ref.by === "handle"
      ? [`yt:handle:${ref.handle.toLowerCase()}`, { forHandle: `@${ref.handle}` }]
      : [`yt:username:${ref.username.toLowerCase()}`, { forUsername: ref.username }];
  const { data } = await cached(cacheKey, 30 * TTL.day, async () => {
    const res = await ytGet<{ items?: { id: string }[] }>("channels", { part: "id", fields: "items(id)", ...filter }, { tool });
    const id = res.items?.[0]?.id;
    if (!id) throw notFound();
    return id;
  });
  return data;
}

/** Resolves any parsed input (channel, or a video from the channel) to a channel summary. */
export async function getChannel(input: ParsedInput, tool: string) {
  if (input.kind === "playlist") {
    throw new AppError("invalid_input", "That's a playlist link. Paste a channel link, @handle, or a video from the channel.");
  }
  let channelId: string;
  if (input.kind === "video") {
    const { video } = await getVideo(input.id, tool);
    if (!video) throw new AppError("not_found", "We couldn't find that video. It may be private or deleted.");
    channelId = video.channelId;
  } else {
    channelId = await resolveChannelId(input, tool);
  }
  return getChannelById(channelId, tool);
}
