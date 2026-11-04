import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { VideoSeoScore } from "./video-seo-score";

const tool = getTool("/seo-tools/video-seo-score");

export const metadata = pageMetadata({
  title: "YouTube Video SEO Score: free metadata audit",
  description:
    "Audit any YouTube video's metadata: title length, description, chapters, tags, hashtags, captions and language — scored with specific fixes. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Video SEO Score"
      intro="Paste any video and get a scored checklist of its metadata, with a specific fix for everything that loses points."
      updated="November 4, 2026"
      howTo={[
        "Paste a video or Shorts link — yours or anyone's.",
        "We audit the public metadata: title, description, chapters, tags, hashtags, captions and language.",
        "Work through the yellow and red items; each one tells you exactly what to change.",
      ]}
      meaning={
        <>
          <p>
            The score is a <strong>channelpeek assessment of metadata quality</strong>, out of 100. It checks the things you can fix in five
            minutes: a title that survives truncation, a description with substance, chapters, sensible tags and hashtags, captions and a set
            language.
          </p>
          <p>
            Honest framing: metadata is the smaller part of YouTube SEO. Your idea, thumbnail and audience retention decide most of your
            reach — perfect metadata on a weak video changes little. But weak metadata on a strong video leaves views on the table, and
            that&apos;s what this audit catches.
          </p>
        </>
      }
      faq={[
        {
          q: "What does the SEO score measure?",
          a: "Metadata quality only: title length and casing, description depth, timestamps, links, tags, hashtags, captions and language setting. It does not measure or predict views.",
        },
        {
          q: "Can I audit someone else's video?",
          a: "Yes — any public video. Auditing top videos in your niche shows which metadata habits successful channels keep.",
        },
        {
          q: "What's a good score?",
          a: "80+ means the basics are covered. Below 55 usually means quick wins are available — most often description depth, chapters or captions.",
        },
        {
          q: "Do tags really matter for the score?",
          a: "They're worth 10 of 100 points, mirroring reality: YouTube says tags have minimal ranking weight, so we weight them lightly too.",
        },
        {
          q: "Why does the checklist care about captions?",
          a: "Captions improve accessibility, international reach and retention — and retention is a real ranking input.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, official YouTube data only.",
        },
      ]}
      related={["/seo-tools/tag-extractor", "/seo-tools/title-checker", "/video-analyzer"]}
    >
      <VideoSeoScore />
    </ToolPage>
  );
}
