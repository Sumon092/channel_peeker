import type { ParseErrorCode } from "@/lib/youtube/parse-input";

/**
 * Every user-facing string inside the interactive widgets, so localized pages
 * have no English UI. Widgets read these via useI18n(); English pages get the
 * EN defaults (no provider needed), locale pages get their translation from
 * src/locales/widgets/. Templates use {name} placeholders — see fmt().
 */

/** Replaces {key} tokens in a template. Missing keys render as-is for debuggability. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (Object.hasOwn(vars, k) ? String(vars[k]) : m));
}

export interface WidgetStrings {
  working: string;
  tryLabel: string;
  copy: string;
  copied: string;
  copyFailed: string;
  download: string;
  opensInNewTab: string;
  /** {date} */
  fetchedAt: string;
  optional: string;
  networkError: string;
  genericError: string;
  parseErrors: Record<ParseErrorCode, string>;
  /** Exact English server error message → localized. Unknown messages pass through. */
  serverErrors: Record<string, string>;
  videoInputLabel: string;
  videoPlaceholder: string;
  channelInputLabel: string;
  channelPlaceholder: string;
  exampleVideoLink: string;

  picker: {
    inputLabel: string;
    submit: string;
    loading: string;
    /** {n} */
    loaded: string;
    /** {n} */
    commentsLoaded: string;
    hasMoreNote: string;
    mustContain: string;
    keywordPlaceholder: string;
    winnersLabel: string;
    onePerPerson: string;
    winnerOne: string;
    winnerMany: string;
    /** {n} */
    entriesReadyOne: string;
    entriesReadyMany: string;
    drawing: string;
    drawAgain: string;
    pickWinnerOne: string;
    pickWinnerMany: string;
    copyAnnouncement: string;
    /** {title} {winners} {n} */
    announcement: string;
    /** {source} — fairSourceNewest or the comment count */
    fairNote: string;
    fairSourceNewest: string;
  };

  finder: {
    searchLabel: string;
    searchPlaceholder: string;
    sortLabel: string;
    sortTop: string;
    sortNew: string;
    submit: string;
    searching: string;
    searchingStatus: string;
    /** {n} */
    foundOne: string;
    foundMany: string;
    /** {n} */
    commentsOnVideo: string;
    countUnavailable: string;
    /** {q} */
    showingMatches: string;
    noMatch: string;
    noneFound: string;
    /** {n} */
    countSummaryOne: string;
    countSummaryMany: string;
    countSummaryMatchedOne: string;
    countSummaryMatchedMany: string;
    downloadCsv: string;
    /** {n} */
    likesOne: string;
    likesMany: string;
    repliesOne: string;
    repliesMany: string;
  };

  thumbs: {
    modeLabel: string;
    single: string;
    /** {n} */
    bulk: string;
    inputLabel: string;
    submit: string;
    exampleMusic: string;
    exampleShort: string;
    notVideo: string;
    bulkLabel: string;
    bulkEmpty: string;
    /** {max} {n} */
    bulkTooMany: string;
    /** {n} {max} */
    linksCount: string;
    bulkSubmit: string;
    /** {n} */
    skippedOne: string;
    skippedMany: string;
    exportCsv: string;
    /** {id} */
    noThumbs: string;
    watchOnYouTube: string;
    noHd: string;
    copyLink: string;
    /** {title} */
    thumbnailAlt: string;
    thumbnailAltFallback: string;
    /** {id} */
    videoFallback: string;
    /** Localized names for the API's stable size keys; unknown keys fall back to the server label. */
    sizeLabels: Record<string, string>;
  };

  banner: {
    submit: string;
    looking: string;
    /** {title} */
    found: string;
    /** {title} */
    none: string;
    /** {label} */
    open: string;
    copyUrl: string;
    /** {label} */
    copyUrlFor: string;
    saveHint: string;
    sizes: { tv: string; desktop2x: string; tablet: string; desktop: string; source: string };
    /** {title} */
    bannerAlt: string;
  };

  monetization: {
    submit: string;
    /** {subs} {videos} */
    channelMeta: string;
    noHandle: string;
    hiddenByCreator: string;
    verdicts: Record<"strong" | "partial" | "not_yet" | "unclear", { title: string; body: string }>;
    statusSr: Record<"pass" | "warn" | "fail" | "unknown", string>;
    estimateNote: string;
    signals: {
      subscribers: { label: string; hiddenValue: string; hiddenDetail: string; passDetail: string; warnDetail: string; failDetail: string };
      /** {name} in pass/fail details */
      country: { label: string; notSetValue: string; notSetDetail: string; passDetail: string; failDetail: string };
      /** {n} in uploadsValue */
      activity: { label: string; uploadsValue: string; noVideosValue: string; noVideosDetail: string; passDetail: string; warnFewDetail: string; warnNoneDetail: string };
      madeForKids: { label: string; notPublicValue: string; notPublicDetail: string; yesValue: string; yesDetail: string; noValue: string; noDetail: string };
      watchTime: { label: string; value: string; detail: string };
      policies: { label: string; value: string; detail: string };
    };
  };

  watchTime: {
    views: string;
    minutesLabel: string;
    secondsLabel: string;
    /** {example} */
    numberError: string;
    /** {hours} {pct} — sr-only summary */
    statusPast: string;
    statusAt: string;
    totalLabel: string;
    /** {n} */
    hoursValue: string;
    /** {m} {pct} */
    minutesLinePct: string;
    minutesLinePast: string;
    passLine: string;
    /** {views} {hours} — rendered with the view count emphasized */
    needLine: string;
    explainer: string;
  };

  uploadDate: {
    submit: string;
    published: string;
    /** {age} */
    ago: string;
    /** {n} */
    hoursAge: string;
    dayOne: string;
    daysMany: string;
    monthsAge: string;
    yearsAge: string;
    /** {y} {m} */
    yearsMonthsAge: string;
    copyResult: string;
    /** {title} {date} {age} */
    copyText: string;
  };

  analyzer: {
    submit: string;
    copyShare: string;
    /** {year} */
    joined: string;
    noHandle: string;
    hiddenByCreator: string;
    statSubscribers: string;
    statViews: string;
    statVideos: string;
    statUploads90: string;
    medianLong: string;
    medianShorts: string;
    likeRate: string;
    commentRate: string;
    estimateSr: string;
    /** {score} */
    reportCard: string;
    /** {n} */
    reportNote: string;
    topVideos: string;
    /** {n} */
    topVideosNote: string;
    viewsHidden: string;
    /** {n} */
    viewsCompact: string;
    short: string;
    outlierSr: string;
    chartTitle: string;
    /** {n} */
    chartNote: string;
    /** {n} {peak} {latest} */
    chartAria: string;
    footEstimates: string;
    footOfficial: string;
    /** {title} */
    opensOnYouTube: string;
  };
}

/** Header/footer labels. Link targets stay on the English pages; only labels localize. */
export interface ChromeStrings {
  tools: string;
  methodology: string;
  about: string;
  contact: string;
  allFreeTools: string;
  allTools: string;
  openMenu: string;
  homeAria: string;
  /** {n} */
  comingSoon: string;
  footerTools: string;
  footerCompany: string;
  footerLegal: string;
  changelog: string;
  privacy: string;
  terms: string;
  cookies: string;
  dataPolicy: string;
  tagline: string;
  disclaimer: string;
}

/** BCP 47 tags for Intl APIs (dates, numbers, region names). */
export const INTL_LOCALE: Record<string, string> = {
  en: "en",
  de: "de",
  ja: "ja",
  fr: "fr",
  ko: "ko",
  es: "es-419",
  pt: "pt-BR",
};

export const EN_WIDGETS: WidgetStrings = {
  working: "Working…",
  tryLabel: "Try:",
  copy: "Copy",
  copied: "✓ Copied",
  copyFailed: "Copy failed",
  download: "Download",
  opensInNewTab: "(opens in new tab)",
  fetchedAt: "Data from YouTube, fetched {date}",
  optional: "(optional)",
  networkError: "Couldn't reach channelpeeker. Check your connection and try again.",
  genericError: "Something went wrong. Please try again.",
  parseErrors: {
    empty: "Paste a YouTube link, @handle or ID.",
    too_long: "That input is too long to be a YouTube link.",
    not_youtube: "That link isn't from YouTube. Paste a youtube.com or youtu.be link.",
    custom_url: "YouTube no longer lets tools look up old /c/ custom URLs. Paste the channel's @handle or a link to any of its videos instead.",
    unrecognized: "We couldn't recognize that. Try a video link, a channel link, or an @handle.",
  },
  serverErrors: {},
  videoInputLabel: "Video link or ID",
  videoPlaceholder: "https://www.youtube.com/watch?v=… or youtu.be/…",
  channelInputLabel: "Channel link, @handle or video link",
  channelPlaceholder: "@handle or https://www.youtube.com/@name",
  exampleVideoLink: "A video link",

  picker: {
    inputLabel: "Giveaway video link or ID",
    submit: "Load comments",
    loading: "Loading comments…",
    loaded: "Loaded {n} top-level comments.",
    commentsLoaded: "{n} top-level comments loaded",
    hasMoreNote: " (newest 500 — the video has more)",
    mustContain: "Must contain",
    keywordPlaceholder: "e.g. #giveaway",
    winnersLabel: "Winners",
    onePerPerson: "One entry per person",
    winnerOne: "Winner",
    winnerMany: "Winners",
    entriesReadyOne: "{n} eligible entry ready",
    entriesReadyMany: "{n} eligible entries ready",
    drawing: "Drawing…",
    drawAgain: "Draw again",
    pickWinnerOne: "Pick winner",
    pickWinnerMany: "Pick winners",
    copyAnnouncement: "Copy announcement",
    announcement: "🎉 Giveaway result for “{title}”: {winners} — picked at random from {n} entries with channelpeeker.com/comment-picker",
    fairNote:
      "Fair by design: the draw runs in your browser with cryptographic randomness (not a predictable shuffle), from the {source} top-level comments via the official YouTube API. Replies inside threads aren't separate entries, and YouTube doesn't let anyone verify who's subscribed — check that manually if your giveaway requires it. Record your screen during the draw for a transparent announcement.",
    fairSourceNewest: "newest 500",
  },

  finder: {
    searchLabel: "Search within comments",
    searchPlaceholder: "A word, name or phrase",
    sortLabel: "Sort by",
    sortTop: "Top comments",
    sortNew: "Newest first",
    submit: "Find comments",
    searching: "Searching…",
    searchingStatus: "Searching comments…",
    foundOne: "Found {n} top-level comment.",
    foundMany: "Found {n} top-level comments.",
    commentsOnVideo: "{n} comments on this video",
    countUnavailable: "Comment count unavailable",
    showingMatches: " · showing matches for “{q}”",
    noMatch: "No top-level comments match that search.",
    noneFound: "No top-level comments found.",
    countSummaryOne: "{n} top-level comment (replies not included).",
    countSummaryMany: "{n} top-level comments (replies not included).",
    countSummaryMatchedOne: "{n} top-level comment matched (replies not included).",
    countSummaryMatchedMany: "{n} top-level comments matched (replies not included).",
    downloadCsv: "Download CSV",
    likesOne: "{n} like",
    likesMany: "{n} likes",
    repliesOne: "{n} reply",
    repliesMany: "{n} replies",
  },

  thumbs: {
    modeLabel: "Mode",
    single: "Single video",
    bulk: "Bulk (up to {n})",
    inputLabel: "Video or Shorts link",
    submit: "Get thumbnails",
    exampleMusic: "A music video",
    exampleShort: "A youtu.be link",
    notVideo: "That's not a video link. Paste a link to a video or a Short.",
    bulkLabel: "Video links, one per line",
    bulkEmpty: "Paste at least one video link.",
    bulkTooMany: "You can check up to {max} videos at once. You pasted {n}.",
    linksCount: "{n} / {max} links",
    bulkSubmit: "Get all thumbnails",
    skippedOne: "Skipped {n} line that wasn't a video link.",
    skippedMany: "Skipped {n} lines that weren't video links.",
    exportCsv: "Export CSV of all links",
    noThumbs: "No thumbnails found for {id}. The video may be private or deleted.",
    watchOnYouTube: "Watch on YouTube",
    noHd: "No HD (1280×720) version exists. The video was likely uploaded in a lower resolution or before HD thumbnails.",
    copyLink: "Copy link",
    thumbnailAlt: "Thumbnail of {title}",
    thumbnailAltFallback: "Video thumbnail",
    videoFallback: "Video {id}",
    sizeLabels: {
      maxres: "Max resolution (HD)",
      standard: "Standard (SD)",
      high: "High",
      medium: "Medium",
      default: "Default",
      uhd: "4K (UHD)",
      qhd: "1440p (QHD)",
      fhd: "1080p (Full HD)",
    },
  },

  banner: {
    submit: "Get banner",
    looking: "Looking up banner…",
    found: "Banner found for {title}.",
    none: "{title} hasn't set a channel banner.",
    open: "Open {label}",
    copyUrl: "Copy URL",
    copyUrlFor: "Copy URL for {label}",
    saveHint: "Open a size, then right-click (or long-press) → “Save image as…”.",
    sizes: {
      tv: "Full banner (TV, 2120×1192)",
      desktop2x: "Desktop 2× (2560×423)",
      tablet: "Tablet (1707×283)",
      desktop: "Desktop / mobile (1060×175)",
      source: "Source image (as uploaded)",
    },
    bannerAlt: "{title} channel banner",
  },

  monetization: {
    submit: "Check",
    channelMeta: "{subs} subscribers · {videos} videos",
    noHandle: "No handle",
    hiddenByCreator: "Hidden by creator",
    verdicts: {
      strong: {
        title: "Meets every public requirement we can check",
        body: "Subscribers, country and activity all clear the Partner Program bar. Watch hours, Shorts views and policy standing are private, so only YouTube and the owner know if the channel is actually monetized.",
      },
      partial: {
        title: "Meets some public requirements",
        body: "The channel clears part of the Partner Program bar. See which checks below hold it back, and remember the private requirements can't be verified by any outside tool.",
      },
      not_yet: {
        title: "Doesn't yet meet the public requirements",
        body: "At least one public Partner Program requirement isn't met, so the channel can't currently join YPP. Existing members in changed circumstances are reviewed by YouTube.",
      },
      unclear: {
        title: "Not enough public data to tell",
        body: "Key public signals are hidden for this channel, so we can't assess eligibility either way.",
      },
    },
    statusSr: { pass: "Met", warn: "Partly met", fail: "Not met", unknown: "Can't be checked" },
    estimateNote: "Eligibility signals are channelpeeker estimates, not a statement from YouTube.",
    signals: {
      subscribers: {
        label: "At least 1,000 subscribers",
        hiddenValue: "Hidden",
        hiddenDetail: "The creator hides their subscriber count, so we can't check this requirement.",
        passDetail: "Meets the 1,000 needed for the full program, including ad revenue.",
        warnDetail: "Meets the 500 needed for the fan-funding tier (memberships, Supers), but not the 1,000 needed for ad revenue.",
        failDetail: "Below the 500 subscribers YouTube requires for even the first monetization tier.",
      },
      country: {
        label: "Lives in a Partner Program country",
        notSetValue: "Not set",
        notSetDetail: "The channel doesn't show a country, so we can't check availability. YPP requires one.",
        passDetail: "The Partner Program is available in {name}.",
        failDetail: "YouTube doesn't list {name} as a Partner Program country, so the channel can't join from there.",
      },
      activity: {
        label: "3 public uploads in the last 90 days",
        uploadsValue: "{n} uploads",
        noVideosValue: "No public videos",
        noVideosDetail: "The channel has no public uploads. The fan-funding tier requires recent public activity.",
        passDetail: "The channel is active enough for the fan-funding tier's recent-uploads requirement.",
        warnFewDetail: "Fewer than the 3 public uploads in 90 days the fan-funding tier asks for. (Not required for the 1,000-subscriber tier.)",
        warnNoneDetail: "No public uploads in the last 90 days. Inactive channels can also lose monetization. (Not required for the 1,000-subscriber tier.)",
      },
      madeForKids: {
        label: "Not a made-for-kids channel",
        notPublicValue: "Not public",
        notPublicDetail: "YouTube doesn't expose this channel's audience setting.",
        yesValue: "Made for kids",
        yesDetail: "The whole channel is set as made for kids: no personalized ads, memberships, Supers or live chat, which sharply limits earnings.",
        noValue: "No",
        noDetail: "The channel isn't set as made for kids, so no kids-content ad limits apply channel-wide.",
      },
      watchTime: {
        label: "4,000 watch hours or 10M Shorts views",
        value: "Not public",
        detail: "Watch hours and 90-day Shorts views are visible only to the channel owner in YouTube Studio. No outside tool can check this, including ones that claim to.",
      },
      policies: {
        label: "No active strikes, follows monetization policies",
        value: "Not public",
        detail: "Community-guidelines strikes and policy reviews are private. A channel meeting every public requirement can still be rejected or suspended.",
      },
    },
  },

  watchTime: {
    views: "Views",
    minutesLabel: "Avg. view duration — minutes",
    secondsLabel: "Seconds",
    numberError: "Enter a number, e.g. {example}",
    statusPast: "{hours} watch hours — past the 4,000-hour threshold.",
    statusAt: "{hours} watch hours — {pct}% of the 4,000-hour threshold.",
    totalLabel: "Total watch time",
    hoursValue: "{n} hours",
    minutesLinePct: "{m} minutes · {pct}% of the 4,000-hour Partner Program threshold",
    minutesLinePast: "{m} minutes · past the 4,000-hour Partner Program threshold",
    passLine: "These views alone pass 4,000 public watch hours.",
    needLine: "At this average duration you'd need about {views} views for 4,000 watch hours — {hours} hours to go from here.",
    explainer:
      "Watch time = views × average view duration. YouTube's 4,000-hour requirement counts public watch hours in the last 365 days (Shorts feed views don't count toward it — Shorts have a separate 10M-views path). Your exact average view duration is in YouTube Studio under Analytics → Engagement.",
  },

  uploadDate: {
    submit: "Check date",
    published: "Published",
    ago: "{age} ago",
    hoursAge: "{n} hours",
    dayOne: "1 day",
    daysMany: "{n} days",
    monthsAge: "{n} months",
    yearsAge: "{n} years",
    yearsMonthsAge: "{y} years, {m} months",
    copyResult: "Copy result",
    copyText: "“{title}” was published on {date} ({age} ago).",
  },

  analyzer: {
    submit: "Analyze",
    copyShare: "Copy share link",
    joined: "Joined {year}",
    noHandle: "No handle",
    hiddenByCreator: "Hidden by creator",
    statSubscribers: "Subscribers",
    statViews: "Total views",
    statVideos: "Videos",
    statUploads90: "Uploads (90 days)",
    medianLong: "Median views (long-form)",
    medianShorts: "Median views (Shorts)",
    likeRate: "Median like rate",
    commentRate: "Median comment rate",
    estimateSr: "(channelpeeker estimate)",
    reportCard: "Channel report card: {score}/100",
    reportNote: "A channelpeeker estimate from the newest {n} public uploads. The math is shown below.",
    topVideos: "Top recent videos",
    topVideosNote: "by views, newest {n} uploads",
    viewsHidden: "Views hidden",
    viewsCompact: "{n} views",
    short: "Short",
    outlierSr: "the channel median",
    chartTitle: "Views per upload",
    chartNote: "Newest {n} uploads, oldest first",
    chartAria: "Views per upload for the newest {n} uploads. Peak {peak} views; most recent upload {latest} views.",
    footEstimates: "* channelpeeker estimates, calculated from public YouTube data.",
    footOfficial: "Showing YouTube's own figures for the newest public uploads.",
    opensOnYouTube: "{title} — opens on YouTube in a new tab",
  },
};

export const EN_CHROME: ChromeStrings = {
  tools: "Tools",
  methodology: "Methodology",
  about: "About",
  contact: "Contact",
  allFreeTools: "All free tools",
  allTools: "All tools",
  openMenu: "Open menu",
  homeAria: "channelpeeker home",
  comingSoon: "+{n} coming soon",
  footerTools: "Tools",
  footerCompany: "Company",
  footerLegal: "Legal",
  changelog: "Changelog",
  privacy: "Privacy policy",
  terms: "Terms",
  cookies: "Cookie policy",
  dataPolicy: "Data policy",
  tagline: "Free, fast YouTube analytics and SEO tools with honest numbers.",
  disclaimer: "channelpeeker is an independent tool for YouTube creators. It is not affiliated with, endorsed by or sponsored by YouTube or Google.",
};
