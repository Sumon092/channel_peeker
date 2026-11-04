import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ThumbnailSizeChecker } from "./thumbnail-size-checker";

const tool = getTool("/thumbnail-tools/thumbnail-size-checker");

export const metadata = pageMetadata({
  title: "YouTube Thumbnail Size Checker: dimensions & file size",
  description:
    "Check your thumbnail against YouTube's rules before uploading: 1280×720 recommended, 16:9 ratio, 2 MB limit. Runs in your browser — the image is never uploaded.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Thumbnail Size Checker"
      intro="Pick your thumbnail file and instantly check its dimensions, aspect ratio, file size and format against YouTube's rules."
      updated="November 4, 2026"
      howTo={[
        "Choose the image you plan to upload as a thumbnail.",
        "We read its dimensions, ratio, size and format — in your browser, never on a server.",
        "Fix anything marked red or yellow, then upload to YouTube without surprises.",
      ]}
      meaning={
        <>
          <p>
            YouTube&apos;s rules: thumbnails should be <strong>1280×720</strong> (minimum 640px wide), in a <strong>16:9</strong> ratio,
            under <strong>2 MB</strong>, as JPG, PNG, GIF or WebP. Anything over 2 MB is rejected outright; wrong ratios get padded with
            black bars or cropped in some placements.
          </p>
          <p>
            Your image is checked entirely in your browser with the standard file and image APIs — it is never uploaded to us or anyone
            else.
          </p>
        </>
      }
      faq={[
        {
          q: "What is the correct YouTube thumbnail size?",
          a: "1280×720 pixels (16:9). The minimum width is 640 pixels, and the file must be under 2 MB.",
        },
        {
          q: "What file formats does YouTube accept for thumbnails?",
          a: "JPG, PNG, GIF and WebP. JPG usually gives the best quality-to-size balance for photos; PNG for graphics with text.",
        },
        {
          q: "Why was my thumbnail rejected by YouTube?",
          a: "The most common reasons: the file is over 2 MB, or the format isn't supported. This checker catches both before you upload.",
        },
        {
          q: "Do you upload or keep my image?",
          a: "No. The check runs completely in your browser. The image never leaves your device.",
        },
        {
          q: "What happens if my thumbnail isn't 16:9?",
          a: "YouTube shows it letterboxed (black bars) or cropped depending on placement, which usually looks unprofessional. Crop to 16:9 first.",
        },
        {
          q: "What is the YouTube Shorts thumbnail size?",
          a: "Shorts are vertical: 1080×1920 pixels (9:16). Note that Shorts thumbnails can only be set from the mobile app at upload time, or by editing the video's thumbnail on desktop after publishing.",
        },
        {
          q: "What is the YouTube thumbnail ratio?",
          a: "16:9 for normal videos — at 1280×720 that's exactly right. This checker verifies the ratio of any image you pick.",
        },
        {
          q: "Is this tool free?",
          a: "Yes, free with no account or extension.",
        },
      ]}
      related={["/thumbnail-tools/thumbnail-downloader", "/seo-tools/title-checker", "/channel-analyzer"]}
    >
      <ThumbnailSizeChecker />
    </ToolPage>
  );
}
