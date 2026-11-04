import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelComparison } from "./channel-comparison";

const tool = getTool("/channel-comparison");

export const metadata = pageMetadata({
  title: "YouTube Channel Comparison: compare 2–4 channels",
  description:
    "Compare up to 4 YouTube channels side by side: subscribers, total views, video count, age and country. Free, official YouTube data, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Channel Comparison"
      intro="Put 2 to 4 channels next to each other and see who leads on subscribers, views and output."
      updated="November 4, 2026"
      howTo={[
        "Paste 2 to 4 channel links or @handles.",
        "We fetch each channel's public stats from the official YouTube API.",
        "Read the table — the leader in each row is highlighted.",
      ]}
      meaning={
        <>
          <p>
            The comparison shows each channel&apos;s lifetime public stats: subscribers (rounded by YouTube above 1,000, hence the ≈),
            total views, public video count, creation date and country. The best value per row is highlighted.
          </p>
          <p>
            Lifetime totals favour older channels, so check creation dates before drawing conclusions — a channel with half the subscribers
            in a quarter of the time is usually the faster-growing one. For recent performance, run each channel through the{" "}
            <a href="/channel-analyzer">Channel Analyzer</a>.
          </p>
        </>
      }
      faq={[
        {
          q: "How many channels can I compare?",
          a: "2 to 4 at a time, by @handle, channel URL or a video link from each channel.",
        },
        {
          q: "Why do subscriber counts show a ≈ sign?",
          a: "YouTube rounds public subscriber counts to three significant figures above 1,000, so exact comparison isn't possible for anyone.",
        },
        {
          q: "Can I compare growth over time?",
          a: "Not yet — we don't keep historical archives. We show current public stats; for multi-year history, sites with long archives are the right tool.",
        },
        {
          q: "Which number matters most?",
          a: "Depends on the question. For audience size, subscribers; for reach, total views relative to age; for work rate, video count. No single row tells the whole story.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, official YouTube data only.",
        },
      ]}
      related={["/channel-analyzer", "/channel-age-checker", "/monetization-checker"]}
    >
      <ChannelComparison />
    </ToolPage>
  );
}
