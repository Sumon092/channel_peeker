import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Changelog: new tools & updates",
  description: "Every new tool and change on channelpeeker, newest first — 46 free YouTube tools and counting, all official-API and signup-free.",
  path: "/changelog",
});

const entries = [
  {
    date: "November 7, 2026",
    items: [
      "New tool: Comment Picker — fair, random giveaway winners from your video's comments, with a recordable draw.",
      "New tool: Banner Downloader — any channel's banner art in HD, in TV, desktop, tablet and mobile crops.",
      "New tool: Channel Tag Extractor — the hidden channel keywords any channel has set.",
      "New tool: Region Restriction Checker — which countries a video is blocked or allowed in, plus embedding status.",
      "New tool: Comment Finder — search any video's comments for a word, name or phrase, sort by top or newest, export to CSV.",
      "New tool: Watch Time Calculator — views × average view duration, with your distance to the 4,000-hour threshold.",
      "New tool: Live Stream Earnings Calculator — ads, Super Chat and memberships, with YouTube's cuts shown.",
    ],
  },
  {
    date: "November 4, 2026",
    items: [
      "Five new micro-tools: Video ID Extractor, Playlist ID Finder, YouTube URL Cleaner, Video Upload Date Checker and Profile Picture Downloader.",
      "Every planned tool is now live: all 4 revenue calculators (with our published CPM table), all 4 keyword tools and all 3 transcript tools.",
      "New AI tools (powered by Gemini): Title, Description, Tag and Hashtag Generators — free, 10 generations a day.",
      "New tools: Video Analyzer, Channel Comparison, Outlier Finder, Video SEO Score, Thumbnail Tester and Thumbnail A/B Preview.",
      "New tools: Tag Extractor, Title Checker, Thumbnail Size Checker and RPM & CPM Calculator are now live.",
      "New micro-tools: Channel Age Checker, Timestamp Link Generator, Shorts Link Converter and Embed Code Generator.",
      "New tool: Channel Analyzer — stats, upload cadence, top videos and a shareable report link for any channel.",
      "New tool: Monetization Checker — which Partner Program requirements a channel meets, from public data.",
    ],
  },
  { date: "September 29, 2026", items: ["Site foundation: tools directory, methodology and data policy."] },
];

export default function Page() {
  return (
    <ProsePage title="Changelog" path="/changelog">
      {entries.map((e) => (
        <section key={e.date}>
          <h2>{e.date}</h2>
          <ul>
            {e.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      ))}
    </ProsePage>
  );
}
