import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { VideoAnalyzer } from "./video-analyzer";

const tool = getTool("/video-analyzer");

export const metadata = pageMetadata({
  title: "YouTube Video Analyzer: stats for any video",
  description:
    "Analyze any YouTube video free: views, likes, comments, length, tags and captions, with channel context. Official YouTube data, no signup, no extension.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Video Analyzer"
      intro="Paste any video and get its stats, metadata checks and channel context in one card."
      updated="November 4, 2026"
      howTo={[
        "Paste a video or Shorts link.",
        "We fetch the video's public stats and its channel from the official YouTube API.",
        "Read the numbers in context — and jump to the channel's full analysis in one click.",
      ]}
      meaning={
        <>
          <p>
            Everything shown comes from YouTube&apos;s public data: views, likes, comments, length, tag count and whether captions exist.
            Views are exact; <strong>dislikes, watch time, impressions and click-through rate are private</strong> to the uploader, so no
            outside tool can show them — including this one.
          </p>
          <p>
            A single video&apos;s numbers mean little in isolation. Judge them against the channel&apos;s size and its other recent videos —
            that&apos;s what the channel context line and our <a href="/channel-analyzer">Channel Analyzer</a> are for.
          </p>
        </>
      }
      faq={[
        {
          q: "Can I analyze any YouTube video?",
          a: "Any public video or Short. Private, unlisted-deleted or removed videos can't be read.",
        },
        {
          q: "Can you show a video's dislikes?",
          a: "No one can. YouTube made dislike counts private in 2021. Tools claiming to show real dislikes are extrapolating.",
        },
        {
          q: "Can you show watch time or CTR?",
          a: "No — those are visible only to the video's owner in YouTube Studio.",
        },
        {
          q: "What's a good like-to-view ratio?",
          a: "Rules of thumb put typical long-form like rates around 2–5% of views, but it varies heavily by niche and audience. Compare a video against the same channel's other videos first.",
        },
        {
          q: "Does this work for Shorts?",
          a: "Yes — paste a Shorts link and you get the same report.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, official YouTube data only.",
        },
      ]}
      related={["/channel-analyzer", "/seo-tools/video-seo-score", "/region-restriction-checker", "/comment-finder"]}
    >
      <VideoAnalyzer />
    </ToolPage>
  );
}
