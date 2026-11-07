import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { SponsorshipRateCalculator } from "./sponsorship-rate-calculator";

const tool = getTool("/revenue-calculator/sponsorship-rate-calculator");

export const metadata = pageMetadata({
  title: "YouTube Sponsorship Rate Calculator",
  description:
    "Calculate what to charge for a YouTube sponsorship from your average views — typical sponsor CPM ranges for integrations and mentions. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Math shown, nothing invented"
      heading="Sponsorship Rate Calculator"
      intro="Know what to charge before a brand emails you — rates from your average views, based on how sponsors actually price deals."
      updated="November 4, 2026"
      howTo={[
        "Enter your average views per video over its first 30 days (your median recent video, not your best one).",
        "Read the ranges for a dedicated integration and a shorter mention.",
        "Negotiate from the middle — and raise it if your niche is commercial (finance, software, B2B).",
      ]}
      meaning={
        <>
          <p>
            Sponsors price YouTube deals on <strong>expected views</strong>, typically paying $20–$50 per 1,000 views for a dedicated 60–90
            second integration. That&apos;s far above ad CPMs because an integration is delivered by a voice the audience trusts and
            can&apos;t be skipped.
          </p>
          <p>
            Rates swing with niche fit (a VPN on a tech channel pays more than on a vlog), audience geography and purchase power, and
            exclusivity clauses. Treat the range as your anchor, not your ceiling — creators most often err by charging too little.
          </p>
        </>
      }
      faq={[
        {
          q: "How much should I charge for a YouTube sponsorship?",
          a: "A common anchor: $20–$50 per 1,000 expected views for a dedicated integration. A channel averaging 25K views can reasonably quote $500–$1,250.",
        },
        {
          q: "What view count should I base rates on?",
          a: "Your median video's first-30-day views — that's what the sponsor's video will realistically get. Don't quote from your one viral hit; brands check.",
        },
        {
          q: "What's the difference between an integration and a mention?",
          a: "An integration is a 60–90s dedicated segment you script; a mention is ~30s. Mentions price at roughly 40–50% of integration rates.",
        },
        {
          q: "Do small channels get sponsorships?",
          a: "Yes — niche fit beats size. A 5K-subscriber channel in a specific niche can out-earn a generalist 50K channel, because conversion matters more to sponsors than reach.",
        },
      ]}
      related={["/revenue-calculator", "/channel-analyzer", "/monetization-checker"]}
    >
      <SponsorshipRateCalculator />
    </ToolPage>
  );
}
