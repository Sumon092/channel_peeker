export type ToolStatus = "live" | "soon";

export type HubId =
  | "analytics"
  | "thumbnail-tools"
  | "seo-tools"
  | "revenue-calculator"
  | "transcript-tools"
  | "keyword-tools";

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
    path: null,
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
];

export const tools: Tool[] = [
  // Analytics
  { path: "/channel-analyzer", name: "Channel Analyzer", summary: "Full stats, medians, upload cadence and top videos for any channel.", hub: "analytics", status: "soon" },
  { path: "/video-analyzer", name: "Video Analyzer", summary: "Views, engagement, SEO checks and performance vs the channel's median.", hub: "analytics", status: "soon" },
  { path: "/channel-comparison", name: "Channel Comparison", summary: "Compare 2 to 4 channels side by side.", hub: "analytics", status: "soon" },
  { path: "/channel-id-finder", name: "Channel ID Finder", summary: "Turn a @handle, channel URL or video link into a channel ID.", hub: "analytics", status: "live" },
  { path: "/outlier-finder", name: "Outlier Finder", summary: "Find videos that beat a channel's median views by 2×, 5× or 10×.", hub: "analytics", status: "soon" },

  // Thumbnails
  { path: "/thumbnail-tools/thumbnail-downloader", name: "Thumbnail Downloader", summary: "Download every thumbnail size, including new 1080p to 4K versions.", hub: "thumbnail-tools", status: "live" },
  { path: "/thumbnail-tools/thumbnail-tester", name: "Thumbnail Tester", summary: "Preview your thumbnail in feed, search, sidebar and mobile mockups.", hub: "thumbnail-tools", status: "soon" },
  { path: "/thumbnail-tools/thumbnail-size-checker", name: "Thumbnail Size Checker", summary: "Check dimensions, aspect ratio and file size before uploading.", hub: "thumbnail-tools", status: "soon" },
  { path: "/thumbnail-tools/thumbnail-a-b-preview", name: "Thumbnail A/B Preview", summary: "Compare two thumbnail versions side by side at every size.", hub: "thumbnail-tools", status: "soon" },

  // SEO
  { path: "/seo-tools/tag-extractor", name: "Tag Extractor", summary: "See the tags, title keywords and hashtags of any public video.", hub: "seo-tools", status: "soon" },
  { path: "/seo-tools/tag-generator", name: "Tag Generator", summary: "Generate a tag list under the 500-character limit.", hub: "seo-tools", status: "soon" },
  { path: "/seo-tools/title-generator", name: "Title Generator", summary: "AI title ideas with length and truncation checks.", hub: "seo-tools", status: "soon" },
  { path: "/seo-tools/title-checker", name: "Title Checker", summary: "Character count and truncation preview for desktop and mobile.", hub: "seo-tools", status: "soon" },
  { path: "/seo-tools/description-generator", name: "Description Generator", summary: "Descriptions with a strong hook, timestamps and links.", hub: "seo-tools", status: "soon" },
  { path: "/seo-tools/hashtag-generator", name: "Hashtag Generator", summary: "Relevant hashtags for your video topic.", hub: "seo-tools", status: "soon" },
  { path: "/seo-tools/video-seo-score", name: "Video SEO Score", summary: "A scored checklist of fixes for any video's metadata.", hub: "seo-tools", status: "soon" },

  // Revenue
  { path: "/revenue-calculator", name: "Revenue Calculator", summary: "Estimate earnings by views, niche and audience country.", hub: "revenue-calculator", status: "soon" },
  { path: "/revenue-calculator/shorts-revenue-calculator", name: "Shorts Revenue Calculator", summary: "Estimate Shorts earnings from the shared revenue pool.", hub: "revenue-calculator", status: "soon" },
  { path: "/revenue-calculator/channel-earnings-estimator", name: "Channel Earnings Estimator", summary: "Earnings ranges for a channel from its recent views.", hub: "revenue-calculator", status: "soon" },
  { path: "/revenue-calculator/sponsorship-rate-calculator", name: "Sponsorship Rate Calculator", summary: "Price a sponsored integration from your average views.", hub: "revenue-calculator", status: "soon" },
  { path: "/revenue-calculator/rpm-cpm-calculator", name: "RPM & CPM Calculator", summary: "Convert between RPM and CPM and see the creator share.", hub: "revenue-calculator", status: "soon" },

  // Transcripts
  { path: "/transcript-tools/transcript-extractor", name: "Transcript Extractor", summary: "Get a transcript as text, SRT or VTT.", hub: "transcript-tools", status: "soon" },
  { path: "/transcript-tools/transcript-summarizer", name: "Transcript Summarizer", summary: "AI summary and key points from a transcript.", hub: "transcript-tools", status: "soon" },
  { path: "/transcript-tools/timestamp-generator", name: "Timestamp Generator", summary: "Chapters in YouTube's 0:00 format from a transcript.", hub: "transcript-tools", status: "soon" },

  // Keywords
  { path: "/keyword-tools/keyword-research", name: "Keyword Research", summary: "Search suggestions expanded with A–Z and question modifiers.", hub: "keyword-tools", status: "soon" },
  { path: "/keyword-tools/keyword-difficulty", name: "Keyword Difficulty", summary: "How strong the channels ranking for a keyword are.", hub: "keyword-tools", status: "soon" },
  { path: "/keyword-tools/related-keywords", name: "Related Keywords", summary: "Related search terms around a topic.", hub: "keyword-tools", status: "soon" },
  { path: "/keyword-tools/long-tail-finder", name: "Long-tail Finder", summary: "Longer, easier keywords for small channels.", hub: "keyword-tools", status: "soon" },
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
    "/seo-tools/video-seo-score",
    "/transcript-tools/transcript-extractor",
    "/channel-id-finder",
  ],
  channel: ["/channel-analyzer", "/channel-id-finder", "/outlier-finder", "/channel-comparison", "/revenue-calculator/channel-earnings-estimator"],
  playlist: [],
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
