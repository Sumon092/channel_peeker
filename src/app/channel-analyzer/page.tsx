import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelAnalyzer } from "./channel-analyzer";

const tool = getTool("/channel-analyzer");

export const metadata = pageMetadata({
  title: "YouTube Channel Analyzer: free stats for any channel",
  description:
    "Analyze any YouTube channel free: subscribers, views per upload, recent activity, top videos and a shareable report. No signup, no extension, official YouTube data.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Channel Analyzer"
      intro="Paste any channel and get its stats, recent performance and top videos — with a share link you can send to anyone."
      updated="November 4, 2026"
      howTo={[
        "Paste the channel's @handle, channel URL, or a link to any of its videos.",
        "We read the channel's public stats and its newest 50 uploads from the official YouTube API.",
        "Explore the report, then copy the share link to send the exact same view to anyone.",
      ]}
      meaning={
        <>
          <p>
            The report covers the channel&apos;s <strong>newest 50 public uploads</strong>: how often it publishes, how views are trending
            upload by upload, and which recent videos performed best. Figures like view counts and upload dates are YouTube&apos;s own
            numbers; anything we calculate is labeled as a channelpeek estimate.
          </p>
          <p>
            <strong>Uploads (90 days)</strong> counts public videos published in the last three months — a quick read on whether a channel
            is active. The <strong>views per upload</strong> chart shows each recent video in order, so spikes (viral videos) and droughts
            stand out immediately.
          </p>
          <p>
            Subscriber counts above 1,000 are rounded by YouTube, shown with a ≈ sign. Watch time, impressions and click-through rates are
            private to the channel owner, so no outside tool can show them.
          </p>
        </>
      }
      faq={[
        {
          q: "Is the channel analyzer free?",
          a: "Yes. It's free, needs no account or extension, and reads only public data from the official YouTube Data API.",
        },
        {
          q: "Can I analyze someone else's channel?",
          a: "Yes. Any public channel works — paste its @handle, channel URL, or a link to one of its videos.",
        },
        {
          q: "How many videos does the analysis cover?",
          a: "The newest 50 public uploads. That's enough to show current cadence and performance without scanning a channel's whole history.",
        },
        {
          q: "Can I share a report?",
          a: "Yes. After a lookup, the page URL updates to include the channel, and the Copy share link button gives you a link that reopens the same report.",
        },
        {
          q: "Why don't you show watch time or CTR?",
          a: "YouTube keeps watch time, impressions and click-through rates private to the channel owner. Tools that claim to show them for other channels are guessing.",
        },
        {
          q: "Are the numbers live?",
          a: "Results are cached briefly to stay fast and within YouTube's API quota. Every report shows exactly when its data was fetched.",
        },
      ]}
      related={["/monetization-checker", "/channel-id-finder", "/thumbnail-tools/thumbnail-downloader"]}
    >
      <ChannelAnalyzer />
    </ToolPage>
  );
}
