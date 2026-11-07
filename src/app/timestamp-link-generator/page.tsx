import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TimestampLinkGenerator } from "./timestamp-link-generator";

const tool = getTool("/timestamp-link-generator");

export const metadata = pageMetadata({
  title: "YouTube Timestamp Link Generator",
  description:
    "Create a YouTube link that starts playing at an exact time. Paste a video, set hours, minutes and seconds, copy the timestamped link. Free, in-browser.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Runs in your browser"
      heading="YouTube Timestamp Link Generator"
      intro="Make a link that starts a video at the exact moment you choose — perfect for sharing a specific quote, step or highlight."
      updated="November 4, 2026"
      howTo={[
        "Paste the video link.",
        "Set the start time in hours, minutes and seconds.",
        "Copy the short or full timestamped link and share it anywhere.",
      ]}
      meaning={
        <>
          <p>
            A timestamped link adds <code>?t=seconds</code> to the URL, so the video starts at that moment for everyone who opens it. We
            generate both the short <code>youtu.be</code> form and the full <code>watch?v=</code> form — they behave identically.
          </p>
          <p>Everything runs in your browser; the link is built locally and nothing is sent to our servers.</p>
        </>
      }
      faq={[
        {
          q: "How do I link to a specific time in a YouTube video?",
          a: "Add ?t= followed by the time in seconds to the URL — exactly what this tool builds for you from hours, minutes and seconds.",
        },
        {
          q: "Do timestamped links work on mobile?",
          a: "Yes. The t parameter works in browsers and the YouTube apps on iOS and Android.",
        },
        {
          q: "Can I make a timestamp link for a Short?",
          a: "You can paste a Shorts link and we'll build the timestamped watch URL for it, which opens Shorts in the normal player at your chosen time.",
        },
        {
          q: "Is there a way to do this on YouTube itself?",
          a: "Yes — right-click a playing video and choose 'Copy video URL at current time'. This tool is for when you want to set a precise time by hand or don't have the video open.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/embed-code-generator", "/shorts-link-converter", "/video-analyzer"]}
    >
      <TimestampLinkGenerator />
    </ToolPage>
  );
}
