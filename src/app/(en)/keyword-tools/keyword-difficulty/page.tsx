import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { KeywordDifficulty } from "./keyword-difficulty";

const tool = getTool("/keyword-tools/keyword-difficulty");

export const metadata = pageMetadata({
  title: "YouTube Keyword Difficulty Checker",
  description:
    "Check how hard a YouTube keyword is: see the channels currently ranking in the top 10 and their subscriber counts. Free, official YouTube data.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Keyword Difficulty"
      intro="See exactly who ranks in the top 10 for a keyword and how big they are — the honest way to judge whether you can compete."
      updated="November 4, 2026"
      howTo={[
        "Type the keyword you're considering.",
        "We fetch YouTube's top 10 results for it and each ranking channel's size.",
        "If small channels appear in the top 10, you can too. If it's all giants, pick a longer tail.",
      ]}
      meaning={
        <>
          <p>
            Difficulty on YouTube is really one question: <strong>who currently owns the results?</strong> We show the top 10 ranking videos
            and each channel&apos;s subscriber count. Small channels in the top 10 are the green light — it means YouTube ranks the best
            answer, not the biggest channel, for this phrase.
          </p>
          <p>
            Honesty about freshness: YouTube&apos;s search API is expensive (100× a normal lookup), so each keyword&apos;s results are
            cached for 7 days and the tool has a small daily budget. If it reports the limit is reached, try again tomorrow — cached
            keywords keep working.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I know if a keyword is too competitive?",
          a: "Look at the ranking channels' sizes. All 1M+ channels: very hard. A mix including sub-100K channels: winnable with a better video.",
        },
        {
          q: "Why is this tool limited per day?",
          a: "YouTube charges 100 quota units per search — 100× a normal lookup. We cache each keyword for 7 days and budget fresh searches so the whole site stays within quota.",
        },
        {
          q: "Does a big channel always outrank a small one?",
          a: "No — YouTube ranks by viewer satisfaction signals. That's why small channels in a top 10 are meaningful: the niche rewards the best answer.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, official YouTube data.",
        },
      ]}
      related={["/keyword-tools/keyword-research", "/keyword-tools/long-tail-finder", "/channel-comparison"]}
    >
      <KeywordDifficulty />
    </ToolPage>
  );
}
