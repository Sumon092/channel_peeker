import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { CommentPicker } from "./comment-picker";

const tool = getTool("/comment-picker");

export const metadata = pageMetadata({
  title: "YouTube Comment Picker: giveaway winners",
  description:
    "Pick random giveaway winners from any YouTube video's comments — cryptographically fair, one entry per person, keyword filter, up to 5 winners.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Comment Picker"
      intro="Running a giveaway? Draw random winners from your video's comments — provably fair, with a suspense reveal you can record for the announcement."
      updated="November 7, 2026"
      howTo={[
        "Paste your giveaway video's link.",
        "Optionally require a keyword (like #giveaway), keep one entry per person, and choose how many winners.",
        "Hit Pick winner — record your screen during the draw for a transparent announcement.",
      ]}
      meaning={
        <>
          <p>
            Comment giveaways reward your real audience, but picking a winner by scrolling is neither random nor provable. This tool loads
            your video&apos;s comments from the official YouTube API and draws winners with{" "}
            <strong>cryptographic randomness in your own browser</strong> — we couldn&apos;t favour anyone if we wanted to, and you can
            re-draw if a winner doesn&apos;t respond.
          </p>
          <p>
            Honest limits: we draw from the newest 500 top-level comments (replies aren&apos;t separate entries), and no tool can verify
            who&apos;s subscribed — YouTube doesn&apos;t expose that, so check your conditions manually before announcing. For reading or
            searching comments instead, use the{" "}
            <a href="/comment-finder" className="underline">
              Comment Finder
            </a>
            .
          </p>
        </>
      }
      faq={[
        {
          q: "How do I pick a random winner from YouTube comments?",
          a: "Paste your video link above, set your filters and press Pick winner. The draw uses your browser's cryptographic random generator over the loaded comments.",
        },
        {
          q: "Is the draw really random?",
          a: "Yes — we use crypto.getRandomValues (the browser's secure random source) with unbiased selection, running on your device. Record the draw if you want visible proof for your audience.",
        },
        {
          q: "Can it check that the winner is subscribed?",
          a: "No tool can — YouTube doesn't publicly expose anyone's subscriptions. Verify subscriber-only conditions manually before announcing.",
        },
        {
          q: "How many comments does it load?",
          a: "Up to the 500 newest top-level comments. On bigger giveaways, add a required keyword so every real entry still qualifies, or draw soon after entries close.",
        },
        {
          q: "Can I pick multiple winners?",
          a: "Yes — up to 5 at once, with no duplicate winners, plus a copy-ready announcement line.",
        },
      ]}
      related={["/comment-finder", "/channel-analyzer", "/video-analyzer"]}
    >
      <CommentPicker />
    </ToolPage>
  );
}
