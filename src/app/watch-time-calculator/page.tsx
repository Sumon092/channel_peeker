import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { WatchTimeCalculator } from "./watch-time-calculator";

const tool = getTool("/watch-time-calculator");

export const metadata = pageMetadata({
  title: "YouTube Watch Time Calculator",
  description:
    "Convert views and average view duration into total watch hours, and see how many views you need for YouTube's 4,000-hour monetization threshold.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Math shown, nothing invented"
      heading="Watch Time Calculator"
      intro="Turn views and average view duration into watch hours — and see exactly how far that is from the 4,000 hours YouTube asks for."
      updated="November 7, 2026"
      howTo={[
        "Enter a view count — one video's, or your channel's recent total.",
        "Enter the average view duration from YouTube Studio (Analytics → Engagement).",
        "Read total watch hours, and the views needed to reach 4,000 hours at that duration.",
      ]}
      meaning={
        <>
          <p>
            Watch time is simply <strong>views × average view duration</strong>. YouTube&apos;s Partner Program requires 4,000 public watch
            hours in the last 365 days (plus 1,000 subscribers) for full monetization — this calculator shows how your numbers translate
            into that requirement.
          </p>
          <p>
            Only public, long-form watch time counts toward the 4,000 hours: time watched in the Shorts feed, private or deleted videos and
            live streams later set to private are excluded. Shorts creators have a separate path (10 million Shorts views in 90 days). The
            math here is exact; which hours YouTube counts is summarized from their published rules.
          </p>
        </>
      }
      faq={[
        {
          q: "How is YouTube watch time calculated?",
          a: "Views multiplied by average view duration. 100,000 views at an average of 3:30 is 350,000 minutes — about 5,833 hours.",
        },
        {
          q: "How many views do I need for 4,000 watch hours?",
          a: "It depends on how long people watch. At a 2-minute average you need about 120,000 views; at 5 minutes, about 48,000. Enter your own average above for the exact figure.",
        },
        {
          q: "Where do I find my average view duration?",
          a: "YouTube Studio → Analytics → Engagement shows average view duration per video and for the channel.",
        },
        {
          q: "Do Shorts views count toward 4,000 watch hours?",
          a: "No — watch time from the Shorts feed doesn't count. Shorts have their own monetization path: 10 million public Shorts views in 90 days.",
        },
      ]}
      related={["/monetization-checker", "/channel-analyzer", "/revenue-calculator"]}
    >
      <WatchTimeCalculator />
    </ToolPage>
  );
}
