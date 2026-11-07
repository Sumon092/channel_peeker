import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { TitleChecker } from "./title-checker";

const tool = getTool("/seo-tools/title-checker");

export const metadata = pageMetadata({
  title: "YouTube Title Checker: truncation preview",
  description:
    "Check your YouTube title's character count and see exactly where it gets cut off in desktop search and on mobile. Free, instant, nothing leaves your browser.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Runs in your browser"
      heading="YouTube Title Checker"
      intro="Type or paste a title and instantly see its length, warnings and how it truncates in search and on mobile."
      updated="November 4, 2026"
      howTo={[
        "Type or paste the title you plan to use.",
        "Watch the live character count and the desktop and mobile previews.",
        "Trim until your key words survive the cutoff, then publish with confidence.",
      ]}
      meaning={
        <>
          <p>
            YouTube allows up to <strong>100 characters</strong>, but far fewer are actually visible: desktop search shows roughly the first
            70 characters and compact mobile cards even less. Anything beyond the cutoff is replaced with an ellipsis, so front-load the
            words that make someone click.
          </p>
          <p>
            Everything here runs in your browser — the title never leaves your device. The cutoffs are approximations because YouTube
            truncates by pixel width rather than a fixed character count.
          </p>
        </>
      }
      faq={[
        {
          q: "How long can a YouTube title be?",
          a: "100 characters is the hard limit. Titles over that can't be saved at all.",
        },
        {
          q: "How many characters show before truncation?",
          a: "Roughly 70 in desktop search results and around 40 on compact mobile cards. YouTube cuts by pixel width, so exact counts vary with the letters used.",
        },
        {
          q: "What's the ideal title length?",
          a: "Under about 60–70 characters keeps the full title visible almost everywhere. More important than length: put the words that earn the click at the front.",
        },
        {
          q: "Do you store the titles I type?",
          a: "No. This tool is fully client-side — nothing you type is sent to our servers.",
        },
        {
          q: "Does an all-caps title help?",
          a: "Usually the opposite: viewers often read all caps as spammy. Capitalize a word or two for emphasis if you must.",
        },
        {
          q: "What is the YouTube title character limit in 2026?",
          a: "Still 100 characters — unchanged for years. The practical limit is lower: around 70 characters survive desktop search, around 40 on compact mobile cards.",
        },
        {
          q: "Where is the YouTube title character cutoff?",
          a: "Desktop search truncates at roughly 70 characters; small mobile cards earlier. YouTube cuts by pixel width, so wide letters shorten the visible text — the live preview above shows your exact title.",
        },
        {
          q: "Is this tool free?",
          a: "Yes, free with no account or extension.",
        },
      ]}
      related={["/seo-tools/tag-extractor", "/thumbnail-tools/thumbnail-size-checker", "/channel-analyzer"]}
    >
      <TitleChecker />
    </ToolPage>
  );
}
