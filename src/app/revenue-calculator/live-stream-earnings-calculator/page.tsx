import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { LiveStreamEarningsCalculator } from "./live-stream-earnings-calculator";

const tool = getTool("/revenue-calculator/live-stream-earnings-calculator");

export const metadata = pageMetadata({
  title: "YouTube Live Stream Earnings Calculator",
  description:
    "Estimate monthly YouTube live stream income from ads, Super Chat and channel memberships — with YouTube's cuts shown, not hidden. Free, math on display.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Live Stream Earnings Calculator"
      intro="Live income has three parts — ads, Super Chat and memberships. Estimate each one, with YouTube's cut shown instead of hidden."
      updated="November 7, 2026"
      howTo={[
        "Enter your monthly live stream views, niche and main audience country.",
        "Add what viewers send in Super Chat and Stickers, and your member count and price.",
        "Read the total range and the per-stream-type breakdown, after YouTube's share.",
      ]}
      meaning={
        <>
          <p>
            Streamers earn from three sources at once: <strong>ads</strong> shown during the stream (we apply our published niche CPM table
            at a reduced live rate, since live CPMs run below long-form video), <strong>Super Chat and Super Stickers</strong> (you keep
            70%), and <strong>channel memberships</strong> (also 70%).
          </p>
          <p>
            The ad portion is an estimate range, like all our revenue tools — real RPM depends on advertiser demand, season and how many ad
            breaks you take. The Super Chat and membership math is exact once you know your gross numbers, which YouTube Studio shows under
            Earn → Revenue sources.
          </p>
        </>
      }
      faq={[
        {
          q: "How much do YouTube live streamers make?",
          a: "It varies enormously. A stream's income is ads (often $1–10 per 1,000 live views depending on niche and audience country) plus Super Chat and memberships, where you keep 70% of what viewers pay.",
        },
        {
          q: "What cut does YouTube take from Super Chat?",
          a: "30%. A $10 Super Chat nets you about $7 — and if the viewer sent it from the iOS or Android app, app-store fees can reduce the pool further.",
        },
        {
          q: "Do live streams need monetization to earn?",
          a: "Yes — you need to be in the YouTube Partner Program. Super Chat and memberships also require your country to support them and (for memberships) 1,000+ subscribers.",
        },
        {
          q: "Does live watch time count toward the 4,000-hour requirement?",
          a: "Public live stream watch time counts while the stream stays public. Streams deleted or set to private afterwards stop counting.",
        },
      ]}
      related={["/revenue-calculator", "/watch-time-calculator", "/revenue-calculator/sponsorship-rate-calculator"]}
    >
      <LiveStreamEarningsCalculator />
    </ToolPage>
  );
}
