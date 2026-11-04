import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ShortsRevenueCalculator } from "./shorts-revenue-calculator";

const tool = getTool("/revenue-calculator/shorts-revenue-calculator");

export const metadata = pageMetadata({
  title: "YouTube Shorts Revenue Calculator: honest estimates",
  description:
    "Estimate YouTube Shorts earnings from monthly views — honest ranges based on typical Shorts RPM and your audience's region. Free, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Shorts Revenue Calculator"
      intro="Estimate what your Shorts views earn from the shared ad-revenue pool — a realistic range, not a dream number."
      updated="November 4, 2026"
      howTo={[
        "Enter your monthly Shorts views.",
        "Pick where most of your audience lives.",
        "Read the range — and brace yourself: Shorts RPM is small, and we won't pretend otherwise.",
      ]}
      meaning={
        <>
          <p>
            Shorts are paid differently from long-form: ad revenue goes into a <strong>shared pool</strong>, part covers music licensing,
            and creators get 45% of their allocation. In practice that lands around <strong>$0.04–$0.15 per 1,000 views</strong> for most
            channels — a thousand times less per view than good long-form CPMs.
          </p>
          <p>
            The honest take: Shorts money is a bonus, not a business. Their real value is audience growth that watches your long-form and
            joins memberships — where the actual income lives.
          </p>
        </>
      }
      faq={[
        {
          q: "How much do 1 million Shorts views pay?",
          a: "Typically somewhere between $40 and $150 for a mostly-US audience, less elsewhere. The range is wide because the pool payout shifts monthly.",
        },
        {
          q: "Why do Shorts pay so much less than videos?",
          a: "Shorts ads aren't attached to your video — revenue is pooled across all Shorts, music costs come off the top, and the creator split is 45% versus 55% for long-form.",
        },
        {
          q: "Do I need to do anything to earn from Shorts?",
          a: "Be in the YouTube Partner Program (check with our Monetization Checker) and accept the Shorts monetization module in Studio.",
        },
        {
          q: "Is this estimate accurate?",
          a: "It's an honest range from typical Shorts RPMs, adjusted by region. Your exact figure is in YouTube Studio — no outside tool can see it.",
        },
      ]}
      related={["/revenue-calculator", "/monetization-checker", "/shorts-link-converter"]}
    >
      <ShortsRevenueCalculator />
    </ToolPage>
  );
}
