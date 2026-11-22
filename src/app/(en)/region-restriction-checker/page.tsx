import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { RegionRestrictionChecker } from "./region-restriction-checker";

const tool = getTool("/region-restriction-checker");

export const metadata = pageMetadata({
  title: "YouTube Region Restriction Checker",
  description:
    "Check which countries a YouTube video is blocked or allowed in, and whether embedding is enabled — straight from the official YouTube API.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Region Restriction Checker"
      intro="'Video unavailable in your country'? See exactly which countries a video is blocked or allowed in — and whether it can be embedded."
      updated="November 7, 2026"
      howTo={[
        "Paste any video or Shorts link.",
        "We read the video's region restriction list from the official YouTube API.",
        "See blocked or allowed countries by name, plus the embedding setting.",
      ]}
      meaning={
        <>
          <p>
            Uploaders and rights holders can restrict a video two ways: a <strong>blocklist</strong> (blocked in listed countries, viewable
            everywhere else) or an <strong>allowlist</strong> (viewable only in listed countries). The API exposes both lists, and we show
            them with country names, not just codes.
          </p>
          <p>
            No restriction listed means the uploader didn&apos;t limit it — a video can still be unavailable somewhere for other reasons we
            can&apos;t see from public data: a copyright takedown in one market, local law, age restriction, or YouTube not operating in a
            country. We also show whether the uploader allows embedding on other websites.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I check if a YouTube video is blocked in my country?",
          a: "Paste the video link above. If your country appears in the blocked list (or is missing from an 'allowed only' list), that's why it won't play for you.",
        },
        {
          q: "Why is a video blocked in some countries?",
          a: "Usually music or sports licensing — rights holders license content per territory. Uploaders can also restrict regions themselves.",
        },
        {
          q: "The checker shows no restrictions, but the video won't play for me. Why?",
          a: "The API only shows uploader/rights-holder region lists. Court orders, age restriction, or a private/deleted video can still make it unavailable without appearing here.",
        },
        {
          q: "What does the embedding result mean?",
          a: "Uploaders can disallow playback outside youtube.com. If embedding is off, the video won't play inside other websites' players.",
        },
      ]}
      related={["/video-analyzer", "/embed-code-generator", "/video-upload-date-checker"]}
    >
      <RegionRestrictionChecker />
    </ToolPage>
  );
}
