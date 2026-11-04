import { KeywordTool } from "@/components/ui/keyword-tool";
import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("/keyword-tools/keyword-research");

export const metadata = pageMetadata({
  title: "YouTube Keyword Research: real search suggestions",
  description:
    "Free YouTube keyword research from real search suggestions: A–Z expansions and question phrases people actually type. No signup, no made-up volume numbers.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Keyword Research"
      intro="Type a seed keyword and see the real phrases people search on YouTube — expanded A–Z and with question forms."
      updated="November 4, 2026"
      howTo={[
        "Type a seed keyword, like your video's core topic.",
        "We expand it through YouTube's own search suggestions: base phrases, A–Z variations and question forms.",
        "Copy the list and pick the phrases that match videos you can actually make.",
      ]}
      meaning={
        <>
          <p>
            Every phrase comes from <strong>YouTube&apos;s live search suggestions</strong> — the same autocomplete viewers see. Suggestions
            exist because people type them, which makes this the most honest free signal of YouTube demand.
          </p>
          <p>
            What we deliberately don&apos;t show: exact monthly search volumes. Google doesn&apos;t publish them for YouTube, so any tool
            displaying precise volume numbers for YouTube searches is estimating — often loosely. Suggestion presence plus your own judgment
            about the niche beats a made-up number.
          </p>
        </>
      }
      faq={[
        {
          q: "Where do these keywords come from?",
          a: "YouTube's public search suggestions — the autocomplete you see when typing in YouTube's search box — expanded with A–Z letters and question prefixes.",
        },
        {
          q: "Why no search volume numbers?",
          a: "Google doesn't publish YouTube search volumes. Tools that show exact numbers are estimating from other data. We show real phrases and skip the fake precision.",
        },
        {
          q: "How should I pick keywords from the list?",
          a: "Choose phrases that match a video you can make well, favor specific multi-word phrases over broad heads, and check what currently ranks (our Keyword Difficulty tool) before committing.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free and unlimited within fair use, no account.",
        },
        {
          q: "Do suggestions differ by language or region?",
          a: "Yes, YouTube personalizes suggestions. We query the English/global endpoint, so niche local phrases may differ from what you see signed in.",
        },
      ]}
      related={["/keyword-tools/long-tail-finder", "/keyword-tools/keyword-difficulty", "/keyword-tools/related-keywords"]}
    >
      <KeywordTool mode="research" placeholder="e.g. home espresso" emptyNote="No suggestions found — try a broader seed keyword." />
    </ToolPage>
  );
}
