import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ThumbnailAbPreview } from "./thumbnail-a-b-preview";

const tool = getTool("/thumbnail-tools/thumbnail-a-b-preview");

export const metadata = pageMetadata({
  title: "Thumbnail A/B Preview: compare two versions",
  description:
    "Compare two YouTube thumbnail versions side by side at feed, search and sidebar sizes. Free, in-browser, nothing uploaded.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Thumbnail A/B Preview"
      intro="Put two thumbnail versions next to each other at every size viewers actually see, and pick the stronger one before you publish."
      updated="November 4, 2026"
      howTo={[
        "Upload version A and version B (both stay in your browser).",
        "Compare them at feed, search and sidebar sizes.",
        "Pick the one that survives the squint test at the smallest size.",
      ]}
      meaning={
        <>
          <p>
            Thumbnails compete at <strong>small sizes</strong> — in the suggested sidebar a thumbnail is barely wider than your thumb.
            Comparing two versions side by side at each real size exposes which one loses its message when shrunk.
          </p>
          <p>
            This is a visual comparison, not a live test: it tells you which version <em>reads</em> better, not which gets more clicks. For
            statistical testing on a published video, use YouTube Studio&apos;s built-in &quot;Test &amp; compare&quot;, which rotates up to
            three thumbnails on your real audience.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I A/B test YouTube thumbnails?",
          a: "For live statistical testing, use YouTube Studio's own 'Test & compare' feature. Use this preview before publishing, to eliminate the weaker design early.",
        },
        {
          q: "What should I compare between versions?",
          a: "Readability of any text at sidebar size, emotional clarity of faces, contrast against YouTube's white and dark backgrounds, and whether each version makes you curious without the title.",
        },
        {
          q: "Why does small-size comparison matter most?",
          a: "A large share of impressions happen at small sizes (sidebar, mobile). A thumbnail that only works large is optimized for the wrong screen.",
        },
        {
          q: "Do you store my images?",
          a: "No. Both images stay in your browser; nothing is uploaded.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/thumbnail-tools/thumbnail-tester", "/thumbnail-tools/thumbnail-size-checker", "/thumbnail-tools/thumbnail-downloader"]}
    >
      <ThumbnailAbPreview />
    </ToolPage>
  );
}
