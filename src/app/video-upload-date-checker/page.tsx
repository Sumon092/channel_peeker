import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { VideoUploadDateChecker } from "./video-upload-date-checker";

const tool = getTool("/video-upload-date-checker");

export const metadata = pageMetadata({
  title: "YouTube Upload Date Checker: to the minute",
  description:
    "Find the exact date and time any YouTube video was published — in your timezone and UTC — plus how old it is. Free, official YouTube data.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Video Upload Date Checker"
      intro="YouTube shows '2 years ago' — this shows the exact date and time a video was published, down to the minute."
      updated="November 4, 2026"
      howTo={[
        "Paste any video or Shorts link.",
        "We read the exact publish timestamp from the official YouTube API.",
        "Copy the result — shown in your timezone and in UTC.",
      ]}
      meaning={
        <>
          <p>
            YouTube&apos;s watch page rounds dates into &quot;X years ago&quot;, but the API stores the exact{" "}
            <strong>publish timestamp</strong> — the moment the video went public. We show it in your local timezone and in UTC, plus the
            precise age.
          </p>
          <p>
            Exact dates matter for citations, fact-checking (&quot;which video came first?&quot;), copyright questions and research. Note:
            for videos that premiered or went from private to public, the timestamp is when it became public, not when the file was uploaded.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I see the exact upload date of a YouTube video?",
          a: "Paste its link here. YouTube's own page shows relative dates ('2 years ago'); the API provides the exact timestamp, which we display to the minute.",
        },
        {
          q: "Is the time shown upload time or publish time?",
          a: "Publish time — when the video became public. For premieres and scheduled releases that differs from when the file was uploaded.",
        },
        {
          q: "What timezone is used?",
          a: "Both: your browser's local timezone and UTC, so citations are unambiguous.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, official YouTube data.",
        },
      ]}
      related={["/channel-age-checker", "/video-analyzer", "/video-id-extractor"]}
    >
      <VideoUploadDateChecker />
    </ToolPage>
  );
}
