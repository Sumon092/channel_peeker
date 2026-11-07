import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TimestampGenerator } from "./timestamp-generator";

const tool = getTool("/transcript-tools/timestamp-generator");

export const metadata = pageMetadata({
  title: "YouTube Timestamp Generator: chapters",
  description:
    "Generate YouTube chapters in the 0:00 format from a timestamped transcript. AI finds the topic changes; you paste the block into your description. Free.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Free AI · 10 runs a day"
      heading="YouTube Timestamp Generator"
      intro="Paste a timestamped transcript and get ready-to-paste chapters — the AI finds the topic changes and matches them to the right times."
      updated="November 4, 2026"
      howTo={[
        "On your video, open the description → “Show transcript” → select all → copy.",
        "Paste it here. The AI detects topic changes and picks each chapter's start time.",
        "Copy the chapter block into your video description — done.",
      ]}
      meaning={
        <>
          <p>
            YouTube turns a list of timestamps in your description into <strong>chapters</strong>: the segmented progress bar viewers can
            scan and jump through. The rules: the list must start at <code>0:00</code>, have at least 3 entries, and each chapter must be
            10+ seconds.
          </p>
          <p>
            The generator uses your transcript&apos;s own timestamps, so chapters land where topics actually change — review the titles and
            adjust any wording before publishing. Chapters also feed Google&apos;s &quot;key moments&quot; in search results.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I add chapters to a YouTube video?",
          a: "Paste a timestamp list starting with 0:00 into the video description — exactly the block this tool generates. Save, and the chapter bar appears.",
        },
        {
          q: "Why do chapters need 0:00 first?",
          a: "That's YouTube's requirement for activating chapters, along with at least 3 entries of 10+ seconds each. We enforce the 0:00 start automatically.",
        },
        {
          q: "Where does the transcript come from?",
          a: "Copy it from YouTube's own transcript panel ('Show transcript' in the description) — it includes the timestamps the AI needs.",
        },
        {
          q: "Do chapters help SEO?",
          a: "They improve navigation and watch satisfaction, and they can appear as 'key moments' in Google search — a modest but real win.",
        },
        {
          q: "Why are my YouTube chapters not showing?",
          a: "The usual causes: the list doesn't start at exactly 0:00, has fewer than 3 entries, a chapter is shorter than 10 seconds, or the timestamps aren't at the start of their lines. Also allow a few minutes after saving — chapters aren't instant.",
        },
        {
          q: "Why are chapters not showing on the progress bar on mobile?",
          a: "If chapters work on desktop but not mobile, it's usually app caching — reopen the app. If they show nowhere, re-check the three formatting rules above.",
        },
        {
          q: "Is this tool free?",
          a: "Yes, up to 10 AI generations per day. The transcript is sent to Google's Gemini API and isn't stored by us.",
        },
      ]}
      related={["/transcript-tools/transcript-extractor", "/transcript-tools/transcript-summarizer", "/timestamp-link-generator"]}
    >
      <TimestampGenerator />
    </ToolPage>
  );
}
