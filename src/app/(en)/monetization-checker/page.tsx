import { ToolPage } from "@/components/tool-page";
import { hreflangFor } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { MonetizationChecker } from "./monetization-checker";

const tool = getTool("/monetization-checker");

export const metadata = pageMetadata({
  title: "YouTube Monetization Checker: eligibility",
  description:
    "Check which YouTube Partner Program requirements any channel meets: subscribers, country, activity and kids-content limits. Honest signals, no fake yes/no.",
  path: tool.path,
  languages: hreflangFor("/monetization-checker"),
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Monetization Checker"
      intro="See which Partner Program requirements any channel meets, from public data. We tell you what can be checked and what can't, instead of guessing a yes or no."
      updated="November 4, 2026"
      howTo={[
        "Paste the channel's @handle, its channel URL, or a link to any of its videos.",
        "We check the public Partner Program requirements: subscribers, country, recent activity and the made-for-kids setting.",
        "Read the verdict. Requirements only YouTube can see, like watch hours and strikes, are clearly marked as uncheckable.",
      ]}
      meaning={
        <>
          <p>
            YouTube never publishes whether a channel is monetized, so <strong>no outside tool can give a true yes or no</strong>, including
            the ones that claim to. What we can do is check every public requirement of the{" "}
            <strong>YouTube Partner Program (YPP)</strong> and show exactly where a channel stands.
          </p>
          <p>
            YPP has two tiers. From <strong>500 subscribers</strong> plus 3 public uploads in 90 days (and watch-time thresholds only the
            owner can see), a channel can earn from memberships and Supers. From <strong>1,000 subscribers</strong> plus 4,000 watch hours
            in a year or 10M Shorts views in 90 days, it can also earn ad revenue.
          </p>
          <p>
            A green verdict means the channel clears every requirement visible in public data. Watch hours, Shorts views, strikes and the
            final review are private, which is why we label them &quot;not public&quot; rather than pretending to know.
          </p>
        </>
      }
      faq={[
        {
          q: "Can this tool say for certain whether a channel is monetized?",
          a: "No, and neither can any other tool. Monetization status is private to YouTube and the channel owner. We check the public Partner Program requirements and are upfront about the rest.",
        },
        {
          q: "What are the YouTube monetization requirements in 2026?",
          a: "Fan funding (memberships, Supers): 500 subscribers, 3 public uploads in the last 90 days, and 3,000 watch hours in 12 months or 3 million Shorts views in 90 days. Ad revenue: 1,000 subscribers and 4,000 watch hours or 10 million Shorts views. The channel must also live in a Partner Program country and follow YouTube's policies.",
        },
        {
          q: "Why can't you check watch hours?",
          a: "Watch hours and 90-day Shorts views are only visible to the channel owner in YouTube Studio. The public API doesn't expose them to anyone.",
        },
        {
          q: "Why does the subscriber count show as approximate?",
          a: "YouTube rounds public subscriber counts to three significant figures above 1,000. Below 1,000 the count is exact, which is exactly where the 500 and 1,000 thresholds matter.",
        },
        {
          q: "Does a made-for-kids channel earn less?",
          a: "Usually yes. Kids content gets no personalized ads and loses memberships, Supers and live chat, which typically cuts revenue substantially. We flag channels whose audience setting is made for kids.",
        },
        {
          q: "How do I check if a YouTube video is monetized?",
          a: "Paste the video's link here — we look up its channel and check the public Partner Program signals. Whether ads run on one specific video is not public data, so no tool can confirm that part.",
        },
        {
          q: "Is my YouTube channel eligible for monetization?",
          a: "Paste your own @handle and see which public requirements you already meet. Watch hours and Shorts views are only visible to you in YouTube Studio under Earn.",
        },
        {
          q: "Is this tool free?",
          a: "Yes. It's free, needs no account, and only reads public channel information from the official YouTube Data API.",
        },
      ]}
      related={["/watch-time-calculator", "/channel-analyzer", "/revenue-calculator/channel-earnings-estimator"]}
    >
      <MonetizationChecker />
    </ToolPage>
  );
}
