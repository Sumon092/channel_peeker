import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TagGenerator } from "./tag-generator";

const tool = getTool("/seo-tools/tag-generator");

export const metadata = pageMetadata({
  title: "YouTube Tag Generator: AI, under 500 chars",
  description:
    "Generate a YouTube tag list with AI: exact phrase, long-tail variations and category terms, automatically kept under the 500-character limit. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Tag Generator"
      intro="Describe your video and get a ready-to-paste tag list — exact phrase first, long-tails next, kept under YouTube's 500-character limit."
      updated="November 4, 2026"
      howTo={[
        "Describe your video topic in a few words.",
        "We generate ~25 tags: your exact phrase, specific variations, then broader category terms.",
        "Copy the whole list and paste it into YouTube Studio's tags field.",
      ]}
      meaning={
        <>
          <p>
            The list follows the common-sense order: the <strong>exact topic phrase</strong> first, then long-tail variations people actually
            search, then a few broad category terms. We trim the output so the full list always fits YouTube&apos;s{" "}
            <strong>500-character</strong> tag limit.
          </p>
          <p>
            We&apos;ll be straight with you: YouTube says tags play a minimal role in discovery today, mostly helping with misspellings.
            They cost nothing to add, so add them — but if you only optimize one thing, make it the title and thumbnail, not the tags.
          </p>
        </>
      }
      faq={[
        {
          q: "How many tags should a YouTube video have?",
          a: "Quality over quantity: 15–30 relevant tags comfortably fit the 500-character limit. Irrelevant tags can hurt, not help.",
        },
        {
          q: "Do YouTube tags still matter in 2026?",
          a: "Very little. YouTube's own guidance says they mainly help with commonly misspelled search terms. Titles, thumbnails and retention drive discovery.",
        },
        {
          q: "Is this generator free?",
          a: "Yes, up to 10 AI generations per day, no account. Your topic is sent to Google's Gemini API to generate suggestions; we don't store it.",
        },
        {
          q: "Should I copy tags from competitors instead?",
          a: "Extracting competitor tags (see our Tag Extractor) is good vocabulary research, but copying wholesale does nothing — tags describe your video, they don't transfer rankings.",
        },
        {
          q: "What order should tags be in?",
          a: "Exact topic phrase first, then variations. There's no confirmed ranking effect of order, but it keeps your most accurate description up front.",
        },
      ]}
      related={["/seo-tools/tag-extractor", "/seo-tools/hashtag-generator", "/seo-tools/title-generator"]}
    >
      <TagGenerator />
    </ToolPage>
  );
}
