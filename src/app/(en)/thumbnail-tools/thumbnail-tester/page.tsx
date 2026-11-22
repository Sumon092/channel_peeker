import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ThumbnailTester } from "./thumbnail-tester";

const tool = getTool("/thumbnail-tools/thumbnail-tester");

export const metadata = pageMetadata({
  title: "YouTube Thumbnail Tester: preview mockups",
  description:
    "Preview your thumbnail exactly where viewers see it: home feed, search results, suggested sidebar and mobile. Free, in-browser, nothing uploaded.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Runs in your browser"
      heading="YouTube Thumbnail Tester"
      intro="See your thumbnail in realistic feed, search, sidebar and mobile mockups — with your title next to it — before you publish."
      updated="November 4, 2026"
      howTo={[
        "Upload your thumbnail (it stays in your browser).",
        "Type the title and channel name you'll publish with.",
        "Check every placement — especially the small sidebar size, where most thumbnails fail.",
      ]}
      meaning={
        <>
          <p>
            Most creators judge thumbnails at full size, but viewers mostly see them <strong>small</strong>: in the suggested sidebar and on
            phones. If your text is unreadable or the subject invisible at sidebar size, the thumbnail fails where it matters most.
          </p>
          <p>
            The mockups approximate YouTube&apos;s current layouts. Your image and text never leave the browser — nothing is uploaded or
            stored.
          </p>
        </>
      }
      faq={[
        {
          q: "How can I test my thumbnail before uploading?",
          a: "Upload it here with your planned title. You'll see it in home feed, search, sidebar and mobile mockups instantly.",
        },
        {
          q: "What should I check in the preview?",
          a: "Readability at sidebar size, whether faces/subjects are recognizable small, and whether the thumbnail and title repeat each other (they shouldn't — they should complement).",
        },
        {
          q: "Is this real A/B testing?",
          a: "No — it's a visual preview. Real A/B testing on live videos requires YouTube's own 'Test & compare' in Studio. For comparing two versions side by side, use our Thumbnail A/B Preview.",
        },
        {
          q: "Do you store my thumbnail?",
          a: "No. Everything runs in your browser; the image is never uploaded to any server.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/thumbnail-tools/thumbnail-a-b-preview", "/thumbnail-tools/thumbnail-size-checker", "/seo-tools/title-checker"]}
    >
      <ThumbnailTester />
    </ToolPage>
  );
}
