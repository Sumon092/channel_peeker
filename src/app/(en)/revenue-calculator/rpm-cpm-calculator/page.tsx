import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { RpmCpmCalculator } from "./rpm-cpm-calculator";

const tool = getTool("/revenue-calculator/rpm-cpm-calculator");

export const metadata = pageMetadata({
  title: "YouTube RPM & CPM Calculator",
  description:
    "Convert between YouTube CPM and RPM, see the 55% creator share and estimate ad earnings per view count. Free calculator with the formula shown.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Math shown, nothing invented"
      heading="YouTube RPM & CPM Calculator"
      intro="Convert between what advertisers pay (CPM) and what you actually earn (RPM), with the formula in plain sight."
      updated="November 4, 2026"
      howTo={[
        "Pick which number you know: your ad CPM or your RPM from YouTube Studio.",
        "Set the share of your views that actually show ads (60% is a common starting point).",
        "Read the converted value and the earnings estimate for your monthly views.",
      ]}
      meaning={
        <>
          <p>
            <strong>CPM</strong> is what advertisers pay per 1,000 <em>monetized</em> views, before YouTube&apos;s cut. <strong>RPM</strong>{" "}
            is what you earn per 1,000 <em>total</em> views, after YouTube keeps 45% of long-form ad revenue and after non-monetized views
            dilute the average. That&apos;s why RPM is always much lower than CPM.
          </p>
          <p>
            The formula we use: <code>RPM = CPM × monetized-view share × 0.55</code>. Unlike earnings &quot;estimators&quot;, this calculator
            does no guessing — it&apos;s pure arithmetic on numbers you provide, so it&apos;s exactly as accurate as your inputs.
          </p>
        </>
      }
      faq={[
        {
          q: "What's the difference between CPM and RPM?",
          a: "CPM is advertiser spend per 1,000 monetized views before YouTube's cut. RPM is your revenue per 1,000 total views after everything. RPM is the number that predicts your actual earnings.",
        },
        {
          q: "Why is my RPM so much lower than my CPM?",
          a: "Two reasons: YouTube keeps 45% of long-form ad revenue, and many views show no ad at all. A $10 CPM with 60% monetized views becomes a $3.30 ad RPM.",
        },
        {
          q: "What is YouTube's revenue split?",
          a: "Creators get 55% of ad revenue on long-form videos. Shorts use a different pooled model that works out far lower per view.",
        },
        {
          q: "Where do I find my real RPM and CPM?",
          a: "In YouTube Studio under Analytics → Revenue. Only the channel owner can see them — no third-party tool can.",
        },
        {
          q: "Is this an earnings estimator?",
          a: "No. It converts numbers you already know. For channel-level earnings ranges, our Channel Earnings Estimator (coming soon) will show ranges with stated assumptions.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/revenue-calculator", "/revenue-calculator/live-stream-earnings-calculator", "/monetization-checker"]}
    >
      <RpmCpmCalculator />
    </ToolPage>
  );
}
