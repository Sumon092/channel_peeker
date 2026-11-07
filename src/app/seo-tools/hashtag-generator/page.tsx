import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { HashtagGenerator } from "./hashtag-generator";

const tool = getTool("/seo-tools/hashtag-generator");

export const metadata = pageMetadata({
  title: "YouTube Hashtag Generator",
  description:
    "Generate relevant YouTube hashtags with AI — a mix of broad and specific tags, correctly formatted. Free, no signup, 10 generations a day.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Hashtag Generator"
      intro="Describe your video and get 15 correctly formatted hashtags — broad ones for reach, specific ones for relevance. Use the best 3."
      updated="November 4, 2026"
      howTo={[
        "Describe your video topic in a few words.",
        "Get 15 hashtags mixing broad and topic-specific tags.",
        "Pick your best 3 and put them at the end of the description — those show above your title.",
      ]}
      meaning={
        <>
          <p>
            YouTube shows up to <strong>3 hashtags above the video title</strong>, pulled from the description (or title). They&apos;re
            clickable and group your video with others under the same tag — a modest discovery aid, especially for Shorts.
          </p>
          <p>
            The limits that matter: more than <strong>60 hashtags</strong> and YouTube ignores all of them; misleading hashtags violate
            policy. That&apos;s why we suggest 15 and tell you to use 3 — honest advice over hashtag spam.
          </p>
        </>
      }
      faq={[
        {
          q: "How many hashtags should I use on YouTube?",
          a: "Three well-chosen ones. Only the first 3 show above the title, and over 60 makes YouTube ignore every hashtag on the video.",
        },
        {
          q: "Where do I put hashtags?",
          a: "At the end of the description is the common practice. If the description has none, hashtags from the title are used instead.",
        },
        {
          q: "Do hashtags really help views?",
          a: "Modestly. They aid topical grouping and matter more for Shorts than long-form. A good title and thumbnail matter far more.",
        },
        {
          q: "Is this generator free?",
          a: "Yes, up to 10 AI generations per day, no account. Your topic is sent to Google's Gemini API for generation; we don't store it.",
        },
        {
          q: "What format should a hashtag have?",
          a: "No spaces or punctuation — CamelCase keeps multi-word tags readable (#HomeStudioSetup). The generator formats them correctly.",
        },
      ]}
      related={["/seo-tools/tag-generator", "/seo-tools/title-generator", "/seo-tools/description-generator"]}
    >
      <HashtagGenerator />
    </ToolPage>
  );
}
