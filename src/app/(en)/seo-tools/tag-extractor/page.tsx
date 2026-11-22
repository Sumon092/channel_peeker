import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TagExtractor } from "./tag-extractor";

const tool = getTool("/seo-tools/tag-extractor");

export const metadata = pageMetadata({
  title: "YouTube Tag Extractor: any video's tags",
  description:
    "Extract the tags and hashtags of any public YouTube video. Free, instant, no signup and no extension — straight from the official YouTube API.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Tag Extractor"
      intro="Paste any video link and see its tags and hashtags, exactly as the uploader wrote them."
      updated="November 4, 2026"
      howTo={[
        "Copy the link of any public YouTube video or Short.",
        "Paste it above. We read the video's metadata from the official YouTube API.",
        "Copy the full tag list or individual hashtags with one click.",
      ]}
      meaning={
        <>
          <p>
            <strong>Tags</strong> are keywords the uploader added when publishing. They aren&apos;t shown on the watch page, but they are
            public through YouTube&apos;s API, which is how this tool reads them — no scraping, no extension.
          </p>
          <p>
            Honest context: YouTube has said for years that tags play a <em>minimal</em> role in ranking, mainly helping with common
            misspellings. Titles, thumbnails and viewer response matter far more. Studying a successful video&apos;s tags is still useful
            for understanding how they describe their topic — just don&apos;t expect copying tags to change your reach.
          </p>
          <p>
            <strong>Hashtags</strong> come from the title and description and are shown above the video title on YouTube.
          </p>
        </>
      }
      faq={[
        {
          q: "Can I see the tags of any YouTube video?",
          a: "Any public video, yes. Private and deleted videos can't be read. Tags are public metadata available through YouTube's official API.",
        },
        {
          q: "Why does a video show no tags?",
          a: "Many channels leave tags empty. Since tags carry little ranking weight today, plenty of large channels skip them entirely.",
        },
        {
          q: "Do tags still matter for YouTube SEO?",
          a: "Barely. YouTube says tags mostly help with commonly misspelled names. Your title, thumbnail and audience retention matter far more.",
        },
        {
          q: "Is copying a competitor's tags a good idea?",
          a: "Copying tags won't make your video rank like theirs. Use extracted tags to learn vocabulary and topic framing, then write your own.",
        },
        {
          q: "Does this work for Shorts?",
          a: "Yes. Paste a Shorts link and we'll read its tags and hashtags the same way.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, no extension. It only reads public video metadata.",
        },
      ]}
      related={["/seo-tools/channel-tag-extractor", "/seo-tools/title-checker", "/thumbnail-tools/thumbnail-downloader"]}
    >
      <TagExtractor />
    </ToolPage>
  );
}
