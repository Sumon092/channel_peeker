import { ToolPage } from "@/components/tool-page";
import { hreflangFor } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ThumbnailDownloader } from "./thumbnail-downloader";

const tool = getTool("/thumbnail-tools/thumbnail-downloader");

export const metadata = pageMetadata({
  title: "YouTube Thumbnail Downloader: HD, 1080p, 4K",
  description:
    "Download any YouTube video's thumbnail in every size: HD 1280×720, SD, and the new 1080p to 4K versions when available. Bulk mode for up to 20 videos. Free.",
  path: tool.path,
  languages: hreflangFor("/thumbnail-tools/thumbnail-downloader"),
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Thumbnail Downloader"
      highlight="Thumbnail Downloader"
      intro="Paste a video or Shorts link and download its thumbnail in every available size, from 120×90 up to HD, 1080p and 4K."
      updated="September 30, 2026"
      howTo={[
        "Copy the link of any YouTube video or Short.",
        "Paste it above. For several videos, switch to Bulk and paste up to 20 links.",
        "Pick a size and click Download, or copy the direct image link.",
      ]}
      meaning={
        <>
          <p>YouTube stores several copies of every thumbnail. We only show the sizes that actually exist for the video:</p>
          <ul>
            <li>
              <strong>1080p, 1440p and 4K:</strong> higher-resolution versions YouTube started serving in 2026 for some videos. They appear when
              YouTube has them.
            </li>
            <li>
              <strong>Max resolution (1280×720):</strong> the HD thumbnail most creators upload. Missing on some older or low-resolution videos.
            </li>
            <li>
              <strong>Standard, High, Medium and Default:</strong> smaller copies YouTube uses in feeds, search and embeds.
            </li>
          </ul>
          <h3>Respect creators&apos; work</h3>
          <p>
            Thumbnails are the creator&apos;s copyrighted work. Use them for reference, research, commentary or your own videos, and don&apos;t
            re-upload someone else&apos;s thumbnail as your own.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I download a YouTube thumbnail in HD?",
          a: "Paste the video link above and click Download next to Max resolution (1280×720), or next to 1080p or 4K when those are available.",
        },
        {
          q: "Why is there no HD or max resolution thumbnail?",
          a: "YouTube only creates the 1280×720 version when the video or custom thumbnail was uploaded at HD resolution. Older and low-resolution uploads only have smaller sizes.",
        },
        {
          q: "Can I download 4K YouTube thumbnails?",
          a: "Yes, when YouTube has one. In 2026 YouTube began serving 1080p, 1440p and 4K thumbnails for some videos. We list them automatically when they exist.",
        },
        {
          q: "Does this work for YouTube Shorts?",
          a: "Yes. Paste a youtube.com/shorts/ link and you'll get the Short's thumbnail in every available size.",
        },
        {
          q: "Can I download thumbnails for many videos at once?",
          a: "Yes. Switch to Bulk mode, paste up to 20 links, and export every image link as a CSV.",
        },
        {
          q: "Is it legal to download YouTube thumbnails?",
          a: "Viewing and saving a thumbnail for reference is common, but the image belongs to the creator. Don't re-upload or sell someone else's thumbnail without permission.",
        },
      ]}
      related={["/thumbnail-tools/thumbnail-size-checker", "/thumbnail-tools/thumbnail-tester", "/seo-tools/tag-extractor", "/channel-id-finder"]}
    >
      <ThumbnailDownloader />
    </ToolPage>
  );
}
