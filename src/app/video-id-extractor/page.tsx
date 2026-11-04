import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { VideoIdExtractor } from "./video-id-extractor";

const tool = getTool("/video-id-extractor");

export const metadata = pageMetadata({
  title: "YouTube Video ID Extractor: get the ID from any link",
  description:
    "Extract the 11-character video ID from any YouTube URL — watch, youtu.be, Shorts, embed or live links. Instant, in your browser, free.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Video ID Extractor"
      intro="Paste any form of YouTube link and get the clean 11-character video ID, instantly."
      updated="November 4, 2026"
      howTo={[
        "Paste any YouTube video link — watch, youtu.be, Shorts, embed or live URLs all work.",
        "The ID appears instantly, parsed in your browser.",
        "Copy it for your API calls, embeds or spreadsheets.",
      ]}
      meaning={
        <>
          <p>
            Every YouTube video has a permanent <strong>11-character ID</strong> (letters, digits, <code>-</code> and <code>_</code>), like{" "}
            <code>dQw4w9WgXcQ</code>. It&apos;s the part after <code>watch?v=</code> — but YouTube links come in a dozen shapes (short
            links, Shorts, embeds, live URLs, links with playlists and timestamps attached), which is why a parser beats eyeballing.
          </p>
          <p>Developers use the ID for API calls and embeds; spreadsheets use it as a stable key. Parsing happens fully in your browser.</p>
        </>
      }
      faq={[
        {
          q: "What is a YouTube video ID?",
          a: "The unique 11-character code identifying a video, e.g. dQw4w9WgXcQ. It never changes, even if the title does.",
        },
        {
          q: "Which link formats are supported?",
          a: "watch?v=, youtu.be short links, /shorts/, /live/, /embed/ and /v/ URLs — with or without extra parameters like timestamps and playlists.",
        },
        {
          q: "Why would I need the video ID?",
          a: "API requests, iframe embeds, thumbnail URLs (img.youtube.com/vi/ID/…), or as a stable key in databases and spreadsheets.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, instant, fully in your browser.",
        },
      ]}
      related={["/playlist-id-finder", "/channel-id-finder", "/url-cleaner"]}
    >
      <VideoIdExtractor />
    </ToolPage>
  );
}
