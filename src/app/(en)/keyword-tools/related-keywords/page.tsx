import { KeywordTool } from "@/components/ui/keyword-tool";
import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("/keyword-tools/related-keywords");

export const metadata = pageMetadata({
  title: "Related YouTube Keywords Finder",
  description:
    "Find related YouTube search terms around any topic, from real search suggestions — sibling topics, comparisons and adjacent phrases. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Real YouTube searches"
      heading="Related Keywords Finder"
      intro="See the search terms that live around your topic — sibling phrases, comparisons and adjacent searches."
      updated="November 4, 2026"
      howTo={[
        "Type your main keyword.",
        "We pull suggestions for the phrase, its parent topic and its 'vs' comparisons.",
        "Use the related terms for series planning, playlists and description keywords.",
      ]}
      meaning={
        <>
          <p>
            Related terms come from the same source as our other keyword tools — <strong>YouTube&apos;s real search suggestions</strong> —
            queried from different angles: the phrase itself, its broader parent phrase, and comparison (&quot;vs&quot;) forms.
          </p>
          <p>
            Related keywords are most useful for planning a <strong>topic cluster</strong>: a set of videos that cover a subject from the
            angles people actually search, which helps every video in the cluster recommend the others.
          </p>
        </>
      }
      faq={[
        {
          q: "What's the difference from Keyword Research?",
          a: "Keyword Research expands your exact phrase (A–Z, questions). This tool looks sideways: sibling topics, the parent topic and comparisons around your phrase.",
        },
        {
          q: "Where does the data come from?",
          a: "YouTube's public search suggestions — real phrases people type, not generated guesses.",
        },
        {
          q: "How do I use related keywords?",
          a: "Plan a cluster of videos covering the related angles, use them in playlist names and descriptions, and find comparison topics ('X vs Y') viewers already want.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account.",
        },
      ]}
      related={["/keyword-tools/keyword-research", "/keyword-tools/long-tail-finder", "/keyword-tools/keyword-difficulty"]}
    >
      <KeywordTool mode="related" placeholder="e.g. video editing" emptyNote="No related terms found — try a broader topic." />
    </ToolPage>
  );
}
