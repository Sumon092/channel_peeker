import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelEarningsEstimator } from "./channel-earnings-estimator";

const tool = getTool("/revenue-calculator/channel-earnings-estimator");

export const metadata = pageMetadata({
  title: "YouTube Channel Earnings Estimator",
  description:
    "Estimate any YouTube channel's monthly ad earnings from its real last-30-days views — honest ranges with a published CPM table, long-form and Shorts split.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Channel Earnings Estimator"
      intro="Paste any channel and get an earnings range built on its actual last-30-days views — not a lifetime average, not a single fake number."
      updated="November 4, 2026"
      howTo={[
        "Paste a channel link or @handle.",
        "We fetch its real uploads from the last 30 days and split views into long-form and Shorts.",
        "Pick the niche and audience region — the range updates from our published CPM table.",
      ]}
      meaning={
        <>
          <p>
            Unlike estimators that work from lifetime views, this one uses the channel&apos;s <strong>actual uploads from the last 30
            days</strong> (YouTube&apos;s own view counts) and prices long-form and Shorts separately — because they earn wildly different
            rates. The CPM table behind the range is published on our <a href="/methodology">methodology page</a>.
          </p>
          <p>
            What no tool can know: the channel&apos;s real CPM, its monetized-view share, membership income, or whether it&apos;s monetized
            at all (our <a href="/monetization-checker">Monetization Checker</a> shows the public signals). That&apos;s why this is a range
            — and why we show you the recent-views basis so you can sanity-check it.
          </p>
        </>
      }
      faq={[
        {
          q: "How accurate is a channel earnings estimate?",
          a: "It brackets ad earnings if our niche/region assumptions fit. Real figures can leave the range — a channel with direct-sold sponsors or premium audience can earn multiples more. Only YouTube Studio knows.",
        },
        {
          q: "Why last-30-days views instead of lifetime?",
          a: "Earnings come from current viewing. A channel with 100M lifetime views but no recent uploads earns almost nothing today; recent uploads are the honest basis.",
        },
        {
          q: "Why are Shorts shown separately?",
          a: "Shorts pay roughly a thousand times less per view than good long-form CPMs. Mixing them into one number is how other estimators get comically wrong.",
        },
        {
          q: "Does this include sponsorships and memberships?",
          a: "No — ads only. For many mid-size channels, sponsorships (see our Sponsorship Rate Calculator) out-earn AdSense.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, built on official YouTube data plus our published estimate table.",
        },
      ]}
      related={["/revenue-calculator", "/monetization-checker", "/revenue-calculator/sponsorship-rate-calculator"]}
    >
      <ChannelEarningsEstimator />
    </ToolPage>
  );
}
