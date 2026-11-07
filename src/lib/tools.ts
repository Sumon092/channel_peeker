export type ToolStatus = "live" | "soon";

export type HubId =
  | "analytics"
  | "thumbnail-tools"
  | "seo-tools"
  | "revenue-calculator"
  | "transcript-tools"
  | "keyword-tools"
  | "link-tools";

export interface Tool {
  path: string;
  name: string;
  /** One-line description used on cards and as a meta description fallback. */
  summary: string;
  hub: HubId;
  status: ToolStatus;
}

export interface Hub {
  id: HubId;
  name: string;
  /** Hub landing route; `null` for groups that have no hub page of their own. */
  path: string | null;
  summary: string;
}

export const hubs: Hub[] = [
  {
    id: "analytics",
    name: "Channel & video analytics",
    path: "/channel-analytics",
    summary: "Stats, benchmarks and outliers for any public channel or video.",
  },
  {
    id: "thumbnail-tools",
    name: "Thumbnail tools",
    path: "/thumbnail-tools",
    summary: "Grab, preview and check thumbnails before you publish.",
  },
  {
    id: "seo-tools",
    name: "SEO tools",
    path: "/seo-tools",
    summary: "Titles, descriptions, tags and hashtags that get found.",
  },
  {
    id: "revenue-calculator",
    name: "Revenue calculators",
    path: "/revenue-calculator",
    summary: "Earnings ranges with the math shown, never a made-up exact number.",
  },
  {
    id: "transcript-tools",
    name: "Transcript tools",
    path: "/transcript-tools",
    summary: "Turn captions into text, summaries and chapters.",
  },
  {
    id: "keyword-tools",
    name: "Keyword tools",
    path: "/keyword-tools",
    summary: "Find what people search for and how hard it is to rank.",
  },
  {
    id: "link-tools",
    name: "Link & URL tools",
    path: null,
    summary: "Small utilities for YouTube links, timestamps and embeds.",
  },
];

export const tools: Tool[] = [
  // Analytics
  { path: "/channel-analyzer", name: "Channel Analyzer", summary: "Stats, upload cadence, top videos and a shareable report for any channel.", hub: "analytics", status: "live" },
  { path: "/video-analyzer", name: "Video Analyzer", summary: "Views, engagement and context for any video, next to its channel.", hub: "analytics", status: "live" },
  { path: "/channel-comparison", name: "Channel Comparison", summary: "Compare 2 to 4 channels side by side.", hub: "analytics", status: "live" },
  { path: "/channel-id-finder", name: "Channel ID Finder", summary: "Turn a @handle, channel URL or video link into a channel ID.", hub: "analytics", status: "live" },
  { path: "/monetization-checker", name: "Monetization Checker", summary: "See which Partner Program requirements a channel meets, honestly.", hub: "analytics", status: "live" },
  { path: "/outlier-finder", name: "Outlier Finder", summary: "Find videos that beat a channel's median views by 2×, 5× or 10×.", hub: "analytics", status: "live" },
  { path: "/channel-age-checker", name: "Channel Age Checker", summary: "See exactly when a channel was created and how old it is.", hub: "analytics", status: "live" },
  { path: "/video-upload-date-checker", name: "Video Upload Date Checker", summary: "The exact date and time any video was published, and its age.", hub: "analytics", status: "live" },
  { path: "/comment-finder", name: "Comment Finder", summary: "Search any video's comments for a word, name or phrase, and export to CSV.", hub: "analytics", status: "live" },
  { path: "/watch-time-calculator", name: "Watch Time Calculator", summary: "Views × average view duration, and your distance to 4,000 watch hours.", hub: "analytics", status: "live" },

  // Links & URLs
  { path: "/timestamp-link-generator", name: "Timestamp Link Generator", summary: "Create a YouTube link that starts at an exact time.", hub: "link-tools", status: "live" },
  { path: "/video-id-extractor", name: "Video ID Extractor", summary: "Pull the 11-character video ID out of any YouTube link.", hub: "link-tools", status: "live" },
  { path: "/playlist-id-finder", name: "Playlist ID Finder", summary: "Extract the playlist ID from any YouTube playlist link.", hub: "link-tools", status: "live" },
  { path: "/url-cleaner", name: "YouTube URL Cleaner", summary: "Strip si= and other tracking parameters from YouTube links.", hub: "link-tools", status: "live" },
  { path: "/shorts-link-converter", name: "Shorts Link Converter", summary: "Turn a Shorts link into a normal watch URL, and back.", hub: "link-tools", status: "live" },
  { path: "/embed-code-generator", name: "Embed Code Generator", summary: "Responsive iframe embed code for any video, with start time and privacy mode.", hub: "link-tools", status: "live" },

  // Thumbnails
  { path: "/thumbnail-tools/thumbnail-downloader", name: "Thumbnail Downloader", summary: "Download every thumbnail size, including new 1080p to 4K versions.", hub: "thumbnail-tools", status: "live" },
  { path: "/thumbnail-tools/thumbnail-tester", name: "Thumbnail Tester", summary: "Preview your thumbnail in feed, search, sidebar and mobile mockups.", hub: "thumbnail-tools", status: "live" },
  { path: "/thumbnail-tools/thumbnail-size-checker", name: "Thumbnail Size Checker", summary: "Check dimensions, aspect ratio and file size before uploading.", hub: "thumbnail-tools", status: "live" },
  { path: "/thumbnail-tools/thumbnail-a-b-preview", name: "Thumbnail A/B Preview", summary: "Compare two thumbnail versions side by side at every size.", hub: "thumbnail-tools", status: "live" },
  { path: "/thumbnail-tools/profile-picture-downloader", name: "Profile Picture Downloader", summary: "Any channel's avatar in full resolution, up to 800px.", hub: "thumbnail-tools", status: "live" },

  // SEO
  { path: "/seo-tools/tag-extractor", name: "Tag Extractor", summary: "See the tags, title keywords and hashtags of any public video.", hub: "seo-tools", status: "live" },
  { path: "/seo-tools/tag-generator", name: "Tag Generator", summary: "Generate a tag list under the 500-character limit.", hub: "seo-tools", status: "live" },
  { path: "/seo-tools/title-generator", name: "Title Generator", summary: "AI title ideas with length and truncation checks.", hub: "seo-tools", status: "live" },
  { path: "/seo-tools/title-checker", name: "Title Checker", summary: "Character count and truncation preview for desktop and mobile.", hub: "seo-tools", status: "live" },
  { path: "/seo-tools/description-generator", name: "Description Generator", summary: "Descriptions with a strong hook, timestamps and links.", hub: "seo-tools", status: "live" },
  { path: "/seo-tools/hashtag-generator", name: "Hashtag Generator", summary: "Relevant hashtags for your video topic.", hub: "seo-tools", status: "live" },
  { path: "/seo-tools/video-seo-score", name: "Video SEO Score", summary: "A scored checklist of fixes for any video's metadata.", hub: "seo-tools", status: "live" },

  // Revenue
  { path: "/revenue-calculator", name: "Revenue Calculator", summary: "Estimate earnings by views, niche and audience country.", hub: "revenue-calculator", status: "live" },
  { path: "/revenue-calculator/shorts-revenue-calculator", name: "Shorts Revenue Calculator", summary: "Estimate Shorts earnings from the shared revenue pool.", hub: "revenue-calculator", status: "live" },
  { path: "/revenue-calculator/channel-earnings-estimator", name: "Channel Earnings Estimator", summary: "Earnings ranges for a channel from its recent views.", hub: "revenue-calculator", status: "live" },
  { path: "/revenue-calculator/sponsorship-rate-calculator", name: "Sponsorship Rate Calculator", summary: "Price a sponsored integration from your average views.", hub: "revenue-calculator", status: "live" },
  { path: "/revenue-calculator/rpm-cpm-calculator", name: "RPM & CPM Calculator", summary: "Convert between RPM and CPM and see the creator share.", hub: "revenue-calculator", status: "live" },
  { path: "/revenue-calculator/live-stream-earnings-calculator", name: "Live Stream Earnings Calculator", summary: "Estimate live income from ads, Super Chat and memberships, cuts included.", hub: "revenue-calculator", status: "live" },

  // Transcripts
  { path: "/transcript-tools/transcript-extractor", name: "Transcript Extractor", summary: "Get a transcript as text, SRT or VTT.", hub: "transcript-tools", status: "live" },
  { path: "/transcript-tools/transcript-summarizer", name: "Transcript Summarizer", summary: "AI summary and key points from a transcript.", hub: "transcript-tools", status: "live" },
  { path: "/transcript-tools/timestamp-generator", name: "Timestamp Generator", summary: "Chapters in YouTube's 0:00 format from a transcript.", hub: "transcript-tools", status: "live" },

  // Keywords
  { path: "/keyword-tools/keyword-research", name: "Keyword Research", summary: "Search suggestions expanded with A–Z and question modifiers.", hub: "keyword-tools", status: "live" },
  { path: "/keyword-tools/keyword-difficulty", name: "Keyword Difficulty", summary: "How strong the channels ranking for a keyword are.", hub: "keyword-tools", status: "live" },
  { path: "/keyword-tools/related-keywords", name: "Related Keywords", summary: "Related search terms around a topic.", hub: "keyword-tools", status: "live" },
  { path: "/keyword-tools/long-tail-finder", name: "Long-tail Finder", summary: "Longer, easier keywords for small channels.", hub: "keyword-tools", status: "live" },
];

export type InputKind = "video" | "channel" | "playlist";

/**
 * Which pasted input types each tool can take, in priority order per kind.
 * Drives the home-page smart search suggestions.
 */
export const toolsByInput: Record<InputKind, string[]> = {
  video: [
    "/thumbnail-tools/thumbnail-downloader",
    "/video-analyzer",
    "/seo-tools/tag-extractor",
    "/comment-finder",
    "/video-upload-date-checker",
    "/video-id-extractor",
    "/url-cleaner",
    "/timestamp-link-generator",
    "/embed-code-generator",
    "/shorts-link-converter",
    "/seo-tools/video-seo-score",
    "/channel-id-finder",
  ],
  channel: [
    "/channel-analyzer",
    "/channel-id-finder",
    "/monetization-checker",
    "/channel-age-checker",
    "/thumbnail-tools/profile-picture-downloader",
    "/outlier-finder",
    "/channel-comparison",
    "/revenue-calculator/channel-earnings-estimator",
  ],
  playlist: ["/playlist-id-finder"],
};

export function getTool(path: string): Tool {
  const tool = tools.find((t) => t.path === path);
  if (!tool) throw new Error(`Unknown tool: ${path}`);
  return tool;
}

export function toolsInHub(hub: HubId): Tool[] {
  return tools.filter((t) => t.hub === hub);
}

export function getHub(id: HubId): Hub {
  const hub = hubs.find((h) => h.id === id);
  if (!hub) throw new Error(`Unknown hub: ${id}`);
  return hub;
}

export const liveTools = () => tools.filter((t) => t.status === "live");
