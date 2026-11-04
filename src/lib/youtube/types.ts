export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

/** Includes the higher-resolution sizes YouTube added in 2026 for some videos. */
export type ThumbnailKey = "default" | "medium" | "high" | "standard" | "maxres" | "fhd" | "qhd" | "uhd";

export interface ChannelSummary {
  id: string;
  title: string;
  handle: string | null;
  description: string;
  country: string | null;
  publishedAt: string;
  avatarUrl: string | null;
  uploadsPlaylistId: string | null;
  subscribers: number | null;
  subscribersHidden: boolean;
  views: number;
  videoCount: number;
  madeForKids: boolean | null;
}

export interface VideoSummary {
  id: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  categoryId: string | null;
  language: string | null;
  durationSeconds: number;
  hasCaptions: boolean;
  madeForKids: boolean | null;
  liveBroadcast: string | null;
  thumbnails: Partial<Record<ThumbnailKey, Thumbnail>>;
  views: number | null;
  likes: number | null;
  comments: number | null;
}
