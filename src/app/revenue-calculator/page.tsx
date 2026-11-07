import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { RevenueCalculator } from "./revenue-calculator";

const tool = getTool("/revenue-calculator");

export const metadata = pageMetadata({
  title: "YouTube Revenue Calculator: honest ranges",
  description:
    "Estimate YouTube ad earnings by views, niche and audience country — shown as honest ranges with the formula and CPM table published. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Math shown, nothing invented"
      heading="YouTube Revenue Calculator"
      intro="Estimate monthly ad earnings from views, niche and audience — as a range with the math shown, never a fake-exact number."
      updated="November 4, 2026"
      howTo={[
        "Enter your (or any channel's) monthly long-form views.",
        "Pick the niche and where most of the audience lives.",
        "Read the range — and the formula below it, so you know exactly where it came from.",
      ]}
      meaning={
        <>
          <p>
            Earnings = views ÷ 1,000 × monetized-view share × the 55% creator split × your niche&apos;s CPM range × an audience-country
            multiplier. The CPM table and multipliers are published on our <a href="/methodology">methodology page</a> and reviewed
            quarterly — they are channelpeek estimates of industry-typical ranges, not YouTube data.
          </p>
          <p>
            Why a range? Because real CPMs swing with seasonality, advertiser demand and video topic — anyone showing you one exact dollar
            figure is guessing with confidence. The range brackets reality; your YouTube Studio shows the truth.
          </p>
        </>
      }
      faq={[
        {
          q: "How much does YouTube pay per 1,000 views?",
          a: "It varies enormously by niche and audience: from under $0.50 to over $20 RPM. Finance and business content earns the most per view; music and entertainment the least.",
        },
        {
          q: "Why do you show a range instead of one number?",
          a: "Because one number would be fiction. CPMs change by month, topic and advertiser demand. Our range uses a published CPM table so you can see and challenge every assumption.",
        },
        {
          q: "Does this include Shorts, memberships or sponsorships?",
          a: "No — this is long-form ad revenue only. Shorts have their own calculator here, and sponsorships our rate calculator. Memberships and Supers are extra on top.",
        },
        {
          q: "Where do your CPM numbers come from?",
          a: "Industry-typical ranges we maintain and review quarterly, published in full on the methodology page. They're estimates — we label them as such.",
        },
        {
          q: "How much does YouTube pay per 1,000 views?",
          a: "After the 55% split and non-monetized views, typical creator earnings run from under $0.50 to over $13 per 1,000 views depending on niche and audience country. Set the calculator to your niche for your range.",
        },
        {
          q: "How much is 1 million YouTube views worth?",
          a: "Anywhere from roughly $400 (entertainment, non-US audience) to $13,000+ (finance, US audience) in ad revenue. That 30× spread is why one-number answers are meaningless — use the range for your niche.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/revenue-calculator/channel-earnings-estimator", "/revenue-calculator/shorts-revenue-calculator", "/revenue-calculator/rpm-cpm-calculator"]}
    >
      <RevenueCalculator />
    </ToolPage>
  );
}
