import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TranscriptSummarizer } from "./transcript-summarizer";

const tool = getTool("/transcript-tools/transcript-summarizer");

export const metadata = pageMetadata({
  title: "YouTube Transcript Summarizer (AI)",
  description:
    "Summarize any YouTube video from its transcript: a short AI summary plus key points. Paste from YouTube's transcript panel. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Transcript Summarizer"
      intro="Paste a transcript and get a tight summary plus the key points — know what a video says without watching all of it."
      updated="November 4, 2026"
      howTo={[
        "On the video, open the description → “Show transcript” → select all → copy.",
        "Paste it here and hit Summarize.",
        "Copy the summary and key points for your notes, scripts or research.",
      ]}
      meaning={
        <>
          <p>
            The summarizer (powered by Google&apos;s Gemini) reads the full transcript and returns a 2–3 sentence summary plus 5–8 concrete
            key points. It works on any video whose transcript you can open — yours or anyone&apos;s.
          </p>
          <p>
            Why paste instead of a link? Caption files can only be fetched via the API by the video&apos;s owner, so link-based transcript
            tools scrape endpoints against YouTube&apos;s terms. Copying from YouTube&apos;s own panel takes seconds and keeps the tool
            reliable and honest. Free use is limited to 10 generations a day.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I summarize a YouTube video for free?",
          a: "Open the video's transcript panel ('Show transcript' in the description), copy it, paste it here. You get a summary and key points in seconds.",
        },
        {
          q: "Why do I have to paste the transcript?",
          a: "YouTube only allows caption downloads by the video's owner through its API. The transcript panel is the public, terms-compliant source — and copying it takes five seconds.",
        },
        {
          q: "How long a video can it handle?",
          a: "Up to roughly 120,000 characters of transcript — several hours of speech.",
        },
        {
          q: "Is the summary reliable?",
          a: "It's AI-generated and usually accurate, but spot-check anything you plan to quote. The transcript itself may also contain auto-caption errors.",
        },
        {
          q: "Do you store transcripts?",
          a: "No. The text is sent to Google's Gemini API to generate the summary and isn't stored by us.",
        },
      ]}
      related={["/transcript-tools/transcript-extractor", "/transcript-tools/timestamp-generator", "/seo-tools/description-generator"]}
    >
      <TranscriptSummarizer />
    </ToolPage>
  );
}
