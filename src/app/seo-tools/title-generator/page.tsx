import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TitleGenerator } from "./title-generator";

const tool = getTool("/seo-tools/title-generator");

export const metadata = pageMetadata({
  title: "YouTube Title Generator: AI ideas with length checks",
  description:
    "Generate YouTube title ideas with AI — 8 styles per topic, each checked against the 70-character truncation limit. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Title Generator"
      intro="Describe your video and get 8 title options in different styles, each with its character count checked against search truncation."
      updated="November 4, 2026"
      howTo={[
        "Describe your video topic in a few words.",
        "Get 8 titles across styles: how-to, curiosity, listicle, bold claim and question.",
        "Copy the strongest one and sharpen it in your own voice — AI output is a starting point.",
      ]}
      meaning={
        <>
          <p>
            The generator (powered by Google&apos;s Gemini) is instructed to write titles under 70 characters — the length that survives
            desktop search untruncated — with the key words up front and <strong>no claims a video can&apos;t deliver</strong>. Each result
            shows its character count; anything over 70 is flagged.
          </p>
          <p>
            Honest framing: a title can&apos;t rescue a weak idea, and the best titles usually come from writing 10 and publishing the one
            that still excites you. Use these as raw material, not final answers. Free use is limited to 10 generations a day.
          </p>
        </>
      }
      faq={[
        {
          q: "Is this title generator free?",
          a: "Yes, up to 10 AI generations per day. No account needed.",
        },
        {
          q: "What makes a good YouTube title?",
          a: "Specific promise, front-loaded key words, under ~70 characters, and honesty — a title that overpromises kills retention, which hurts you more than it helps.",
        },
        {
          q: "Where do the suggestions come from?",
          a: "Google's Gemini model, prompted with your topic and YouTube title best practices. Your topic is sent to Google's API for generation; we don't store it.",
        },
        {
          q: "Should I use the titles exactly as generated?",
          a: "Treat them as drafts. Pick the strongest angle, then rewrite it in your channel's voice and make sure the video delivers on it.",
        },
        {
          q: "Why do some titles get flagged?",
          a: "Anything over 70 characters truncates in desktop search results; we flag those so you can trim before publishing.",
        },
      ]}
      related={["/seo-tools/title-checker", "/seo-tools/description-generator", "/seo-tools/tag-generator"]}
    >
      <TitleGenerator />
    </ToolPage>
  );
}
