import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Changelog",
  description: "New tools and changes on channelpeek.",
  path: "/changelog",
});

const entries = [
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
