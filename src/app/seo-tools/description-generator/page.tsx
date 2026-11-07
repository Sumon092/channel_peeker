import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { DescriptionGenerator } from "./description-generator";

const tool = getTool("/seo-tools/description-generator");

export const metadata = pageMetadata({
  title: "YouTube Description Generator (AI)",
  description:
    "Generate a structured YouTube description with AI: a strong 2-sentence hook, keyword paragraph, chapter placeholders, link slots and hashtags. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Description Generator"
      intro="Describe your video and get a structured draft: hook first, then detail, chapter placeholders, link slots and hashtags."
      updated="November 4, 2026"
      howTo={[
        "Describe your video topic in a few words.",
        "Get a full draft: 2-sentence hook, detail paragraph, chapters block, link placeholders and hashtags.",
        "Replace the placeholder timestamps and [LINK] markers with your real ones, then paste into YouTube Studio.",
      ]}
      meaning={
        <>
          <p>
            The structure mirrors what works: the <strong>first two lines</strong> show above the fold in search and under the player, so
            the draft opens with a hook stating what the viewer gets. Then a keyword-bearing detail paragraph, a <strong>Chapters:</strong>{" "}
            block (real timestamps unlock chapter navigation), link placeholders and a few hashtags.
          </p>
          <p>
            It&apos;s a draft, deliberately: the timestamps are placeholders because only you know your edit, and the hook will always be
            stronger once you put your specific angle in it. Free use is limited to 10 generations a day.
          </p>
        </>
      }
      faq={[
        {
          q: "How long should a YouTube description be?",
          a: "At least ~200 characters for context; the hard limit is 5,000. What matters most is the first two lines — they're visible before 'more'.",
        },
        {
          q: "Do descriptions affect ranking?",
          a: "They help YouTube understand the video's topic and can surface it for related searches. They matter more than tags, less than title and retention.",
        },
        {
          q: "Why placeholder timestamps?",
          a: "Chapters need your real edit times. The draft includes a correctly formatted block starting at 0:00 — adjust the times and labels to your video.",
        },
        {
          q: "Is this generator free?",
          a: "Yes, up to 10 AI generations per day, no account. Your topic is sent to Google's Gemini API for generation; we don't store it.",
        },
        {
          q: "Should I publish the draft as-is?",
          a: "No — fill in the placeholders and personalize the hook. Generic descriptions read as generic to viewers and to YouTube alike.",
        },
      ]}
      related={["/seo-tools/title-generator", "/seo-tools/hashtag-generator", "/seo-tools/video-seo-score"]}
    >
      <DescriptionGenerator />
    </ToolPage>
  );
}
