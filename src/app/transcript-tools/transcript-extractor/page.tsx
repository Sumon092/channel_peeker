import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TranscriptExtractor } from "./transcript-extractor";

const tool = getTool("/transcript-tools/transcript-extractor");

export const metadata = pageMetadata({
  title: "YouTube Transcript to Text, SRT & VTT",
  description:
    "Turn a YouTube transcript into clean text, SRT or VTT subtitle files. Paste from YouTube's transcript panel — converted in your browser, nothing uploaded.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Transcript Extractor"
      intro="Paste a transcript from YouTube's own panel and get clean text, SRT or VTT — formatted, copyable and downloadable."
      updated="November 4, 2026"
      howTo={[
        "On the video, open the description and click “Show transcript”, then select all of it and copy.",
        "Paste it here. We parse the timestamps and lines instantly, in your browser.",
        "Switch between clean text, SRT and VTT, then copy or download.",
      ]}
      meaning={
        <>
          <p>
            Why paste instead of a link? YouTube&apos;s rules: caption files can only be downloaded through the API by the{" "}
            <strong>video&apos;s owner</strong>. Sites that take just a URL scrape YouTube&apos;s private endpoints against its terms — and
            break regularly. YouTube&apos;s own transcript panel is public and takes five seconds to copy, so we built the honest version
            around it.
          </p>
          <p>
            <strong>Clean text</strong> joins the caption lines into readable prose (for blog posts, notes or feeding to AI tools).{" "}
            <strong>SRT</strong> and <strong>VTT</strong> are standard subtitle formats; end times are inferred from each next line&apos;s
            start, which is how YouTube&apos;s rolling captions behave.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I get the transcript from YouTube?",
          a: "On the watch page: expand the description → 'Show transcript' → the panel opens → select all the lines and copy. Works on desktop; on mobile it's under the ••• menu.",
        },
        {
          q: "Why can't I just paste a video link?",
          a: "YouTube's API only lets a video's owner download caption files. URL-based transcript sites scrape unofficial endpoints against YouTube's terms. Pasting keeps it honest and reliable.",
        },
        {
          q: "Do you store my transcript?",
          a: "No. This tool is fully client-side — the transcript never leaves your browser.",
        },
        {
          q: "What's the difference between SRT and VTT?",
          a: "Both are subtitle formats. SRT is the older, universally supported one; VTT is the web standard (HTML5 video). Most editors accept both.",
        },
        {
          q: "Are the SRT timings exact?",
          a: "Start times are exact (they come from the transcript). End times are inferred from the next line's start, since YouTube's panel doesn't include them.",
        },
        {
          q: "Can I turn a YouTube transcript into notes?",
          a: "Yes — use the clean text output here for the raw material, or run the same transcript through our Transcript Summarizer for an AI summary with key points.",
        },
      ]}
      related={["/transcript-tools/transcript-summarizer", "/transcript-tools/timestamp-generator", "/embed-code-generator"]}
    >
      <TranscriptExtractor />
    </ToolPage>
  );
}
