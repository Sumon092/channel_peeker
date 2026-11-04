import { KeywordTool } from "@/components/ui/keyword-tool";
import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("/keyword-tools/long-tail-finder");

export const metadata = pageMetadata({
  title: "Long-tail YouTube Keywords: easier phrases to rank",
  description:
    "Find long-tail YouTube keywords — specific 4+ word phrases from real search suggestions that small channels can actually rank for. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Long-tail Keyword Finder"
      intro="Find the specific, 4-plus-word phrases people search — where small channels can actually win."
      updated="November 4, 2026"
      howTo={[
        "Type a seed keyword for your niche.",
        "We expand it A–Z through YouTube's suggestions and keep only phrases of 4+ words.",
        "Make videos that answer those exact phrases — specificity is the small channel's advantage.",
      ]}
      meaning={
        <>
          <p>
            A <strong>long-tail keyword</strong> is a longer, more specific search phrase. Each one gets fewer searches than a broad term,
            but the searcher&apos;s intent is precise, competition is thinner, and a new channel answering it exactly can outrank big
            channels answering it vaguely.
          </p>
          <p>
            Everything shown is a real suggestion from YouTube&apos;s search — if it appears, people type it. For a small channel, twenty
            videos on long-tails usually beat one video chasing a head term.
          </p>
        </>
      }
      faq={[
        {
          q: "What is a long-tail keyword?",
          a: "A specific multi-word search phrase (we filter for 4+ words), like 'how to sharpen a knife without a stone' instead of 'knife sharpening'.",
        },
        {
          q: "Why are long-tails better for small channels?",
          a: "Fewer established videos compete for them, and the searcher's intent is so specific that a video answering it precisely wins the click and the retention.",
        },
        {
          q: "How many searches do long-tails get?",
          a: "Individually few — often under 100 a month. But if a phrase appears in suggestions, real people type it, and the viewers it brings are exactly who your video serves.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account.",
        },
      ]}
      related={["/keyword-tools/keyword-research", "/keyword-tools/keyword-difficulty", "/seo-tools/title-generator"]}
    >
      <KeywordTool mode="longtail" placeholder="e.g. sourdough" emptyNote="No 4+ word phrases found — try a broader or different seed." />
    </ToolPage>
  );
}
