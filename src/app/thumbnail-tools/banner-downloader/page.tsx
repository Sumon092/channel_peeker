import { ToolPage } from "@/components/tool-page";
import { hreflangFor } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { BannerDownloader } from "./banner-downloader";

const tool = getTool("/thumbnail-tools/banner-downloader");

export const metadata = pageMetadata({
  title: "YouTube Banner Downloader: channel art in HD",
  description:
    "Download any YouTube channel's banner in full resolution — TV (2120px), desktop 2× (2560px), tablet and mobile crops. Free, official YouTube data.",
  path: tool.path,
  languages: hreflangFor("/thumbnail-tools/banner-downloader"),
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Banner Downloader"
      intro="Grab any channel's banner art in every size YouTube serves — from the full TV image to the exact desktop crop."
      updated="November 7, 2026"
      howTo={[
        "Paste a channel link, @handle or any video from the channel.",
        "We read the banner's source URL from the official YouTube API.",
        "Open the size you need and save it, or copy the direct URL.",
      ]}
      meaning={
        <>
          <p>
            YouTube stores one large banner image and crops it per device: TV apps show the full ~2120×1192 image, desktop shows a wide
            2560×423 strip, tablets and phones get narrower crops. We give you <strong>direct links to each crop</strong> plus the original
            source image, straight from Google&apos;s image CDN.
          </p>
          <p>
            Useful for design references, archiving your own art, press kits and competitor research. The images are the channel
            owner&apos;s work — download for reference, don&apos;t rebrand someone else&apos;s banner as your own.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I download a YouTube channel's banner?",
          a: "Paste the channel link or @handle above. We show the banner in every crop YouTube uses — open one and right-click → Save image as.",
        },
        {
          q: "What size is a YouTube banner?",
          a: "Upload at 2560×1440. TV shows the full image, desktop shows a 2560×423 strip, and the 'safe area' that's visible everywhere is 1546×423 in the middle.",
        },
        {
          q: "Why does a channel show no banner?",
          a: "Not every channel sets one. If the owner never uploaded banner art, YouTube's API has no banner URL and we say so.",
        },
        {
          q: "Is this legal?",
          a: "The URLs are public — YouTube serves them to every visitor. The artwork remains the creator's property, so use downloads for reference and archiving, not for re-use as your own branding.",
        },
      ]}
      related={["/thumbnail-tools/profile-picture-downloader", "/thumbnail-tools/thumbnail-downloader", "/channel-analyzer"]}
    >
      <BannerDownloader />
    </ToolPage>
  );
}
