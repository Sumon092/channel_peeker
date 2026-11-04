import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { UrlCleaner } from "./url-cleaner";

const tool = getTool("/url-cleaner");

export const metadata = pageMetadata({
  title: "YouTube URL Cleaner: remove si= and tracking parameters",
  description:
    "Clean YouTube links before sharing: strip the si= share identifier and other tracking parameters, keep only the video, playlist and timestamp. Free, in-browser.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube URL Cleaner"
      intro="Strip the si= share identifier and other clutter from YouTube links — share the video, not your metadata."
      updated="November 4, 2026"
      howTo={[
        "Paste any YouTube link — video, Short, playlist or channel.",
        "We rebuild it keeping only what matters: the video, its playlist and a timestamp if present.",
        "Copy the clean full link or the clean youtu.be short link.",
      ]}
      meaning={
        <>
          <p>
            When you tap Share on YouTube, the link includes <code>?si=…</code> — a <strong>share identifier</strong> that links the URL to
            your share action. Other parameters like <code>feature=</code> and <code>pp=</code> carry referral context too. None of them are
            needed to watch the video.
          </p>
          <p>
            The cleaner keeps exactly three things when present: the video ID, the playlist (<code>list=</code>) and the timestamp (
            <code>t=</code>). Everything else goes. Parsing happens in your browser — we never see the links you clean.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the si= parameter in YouTube links?",
          a: "A share identifier added when you use YouTube's Share button. It ties the link to the sharing action. The video plays identically without it.",
        },
        {
          q: "Is it safe to remove these parameters?",
          a: "Yes — the video, playlist and timestamp are all preserved. Only referral/tracking context is dropped.",
        },
        {
          q: "Does the cleaner keep timestamps?",
          a: "Yes. If the link has t= (or start=), the clean link keeps it, including in the short youtu.be form.",
        },
        {
          q: "How do I share a YouTube link without tracking?",
          a: "Clean it here first: the si= identifier and referral parameters are removed, leaving a plain link that plays identically.",
        },
        {
          q: "Do you log the links I paste?",
          a: "No. The tool runs entirely in your browser; nothing is sent to our servers.",
        },
      ]}
      related={["/video-id-extractor", "/timestamp-link-generator", "/shorts-link-converter"]}
    >
      <UrlCleaner />
    </ToolPage>
  );
}
