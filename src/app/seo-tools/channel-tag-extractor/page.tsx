import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelTagExtractor } from "./channel-tag-extractor";

const tool = getTool("/seo-tools/channel-tag-extractor");

export const metadata = pageMetadata({
  title: "YouTube Channel Tag Extractor: see any channel's keywords",
  description:
    "See the channel keywords (channel tags) any YouTube channel has set — the topic hints competitors give YouTube. Free, official YouTube data.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Channel Tag Extractor"
      intro="Every channel can set hidden 'channel keywords' that tell YouTube what it's about. See exactly what any channel chose."
      updated="November 7, 2026"
      howTo={[
        "Paste a channel link, @handle or any video from the channel.",
        "We read the channel keywords from the official YouTube API.",
        "Copy the list — handy for competitor research and setting your own.",
      ]}
      meaning={
        <>
          <p>
            Channel keywords (set in YouTube Studio under Settings → Channel → Basic info) describe the <strong>whole channel</strong>, not
            one video. They&apos;re invisible on the channel page but help YouTube understand your channel&apos;s topic for search and
            recommendations — a small signal, not a magic one.
          </p>
          <p>
            Looking up what channels in your niche use is the fastest way to write your own: aim for 10–15 focused terms about your topics,
            not a keyword dump. These differ from video tags — our{" "}
            <a href="/seo-tools/tag-extractor" className="underline">
              Tag Extractor
            </a>{" "}
            shows those per video.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I see another channel's tags?",
          a: "Paste the channel link or @handle above. We show the channel keywords exactly as the owner set them, from the official API.",
        },
        {
          q: "What's the difference between channel tags and video tags?",
          a: "Channel keywords describe the whole channel and are set once in Studio settings. Video tags are per-video metadata. Both are invisible to viewers.",
        },
        {
          q: "Do channel keywords matter for ranking?",
          a: "They're a minor topical signal — useful to set sensibly, but titles, thumbnails and watch time matter far more.",
        },
        {
          q: "Why does a channel show no tags?",
          a: "Most channels never set them. An empty result means the owner left the field blank, not that we couldn't read it.",
        },
      ]}
      related={["/seo-tools/tag-extractor", "/seo-tools/tag-generator", "/channel-analyzer"]}
    >
      <ChannelTagExtractor />
    </ToolPage>
  );
}
