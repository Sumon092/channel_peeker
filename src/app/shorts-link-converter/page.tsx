import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ShortsLinkConverter } from "./shorts-link-converter";

const tool = getTool("/shorts-link-converter");

export const metadata = pageMetadata({
  title: "YouTube Shorts Link Converter: Shorts to normal URL",
  description:
    "Convert a YouTube Shorts link into a normal watch URL (and back) to play a Short in the regular player with a scrubber. Free, instant, in-browser.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Shorts Link Converter"
      intro="Turn a Shorts link into a normal watch URL — so you can scrub, change speed and use chapters — or go the other way."
      updated="November 4, 2026"
      howTo={[
        "Paste a Shorts link (or any video link).",
        "We extract the video ID — every Short is a normal video underneath.",
        "Copy the watch URL, the Shorts URL, or the short share link.",
      ]}
      meaning={
        <>
          <p>
            Every Short is an ordinary YouTube video shown in a different player. Swapping <code>/shorts/ID</code> for{" "}
            <code>/watch?v=ID</code> opens the same video in the regular player, where you get the timeline scrubber, playback speed,
            miniplayer and comments side panel. The reverse also works for any vertical video.
          </p>
          <p>The conversion happens entirely in your browser — it&apos;s just URL rewriting, no data is sent anywhere.</p>
        </>
      }
      faq={[
        {
          q: "How do I watch a YouTube Short in the normal player?",
          a: "Replace /shorts/ with /watch?v= in the URL — or paste the link here and copy the converted URL.",
        },
        {
          q: "Why would I convert a Shorts link?",
          a: "The normal player gives you a scrubber, playback speed controls, timestamps and the standard comment layout — all missing from the Shorts player.",
        },
        {
          q: "Does the view count change when watched as a normal video?",
          a: "No. It's the same video with the same stats, just a different player.",
        },
        {
          q: "Can I turn a normal video into a Shorts link?",
          a: "You can build the /shorts/ URL for any video, but YouTube only uses the Shorts player for vertical videos up to 3 minutes; others redirect to the normal player.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/timestamp-link-generator", "/embed-code-generator", "/thumbnail-tools/thumbnail-downloader"]}
    >
      <ShortsLinkConverter />
    </ToolPage>
  );
}
