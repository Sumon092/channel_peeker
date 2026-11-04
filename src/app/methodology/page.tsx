import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { COUNTRY_TIERS, NICHES, SHORTS_RPM_HIGH, SHORTS_RPM_LOW } from "@/lib/revenue-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Methodology: how channelpeek calculates every number",
  description: "Where channelpeek's data comes from, which numbers are YouTube's and which are our estimates, and exactly how each estimate is calculated.",
  path: "/methodology",
});

export default function Page() {
  return (
    <ProsePage title="Methodology" path="/methodology" updated="September 29, 2026">
      <p>
        We want every number on channelpeek to be checkable. This page explains where our data comes from, which figures are ours, and how we
        calculate them.
      </p>

      <h2>Two kinds of numbers</h2>
      <ul>
        <li>
          <strong>YouTube data:</strong> public figures from the official YouTube Data API, such as view counts, like counts, comment counts,
          upload dates and subscriber counts.
        </li>
        <li>
          <strong>channelpeek estimates:</strong> anything we calculate, such as medians, ratios, outlier multipliers, scores and earnings
          ranges. These are always labeled as channelpeek estimates. They are not provided or approved by YouTube or Google.
        </li>
      </ul>

      <h2>Known limits of public data</h2>
      <ul>
        <li>
          <strong>Subscriber counts are rounded.</strong> YouTube rounds public subscriber counts to three significant figures above 1,000
          (123,456 shows as 123,000). We show them with a ≈ sign. View counts are exact.
        </li>
        <li>
          <strong>Dislikes are private.</strong> We don&apos;t show like/dislike ratios.
        </li>
        <li>
          <strong>Watch hours, CTR and revenue are private.</strong> Only the channel owner can see them in YouTube Studio.
        </li>
        <li>
          <strong>View counting changed in 2026.</strong> YouTube announced that public views count from the first frame for all formats. Charts
          that span that change may show a step.
        </li>
      </ul>

      <h2>Definitions</h2>
      <h3>Median views</h3>
      <p>
        The middle value of a set of videos&apos; view counts. We prefer medians to averages because one viral video can distort an average.
      </p>
      <h3>Outlier multiplier</h3>
      <p>A video&apos;s views divided by the median views of the same channel&apos;s recent videos of the same format (Shorts or long-form). A 5× outlier got five times the typical views.</p>
      <h3>Engagement ratios</h3>
      <p>Likes ÷ views and comments ÷ views, shown as percentages.</p>

      <h2>Earnings estimates</h2>
      <p>
        Earnings are shown as ranges, never as one exact number. Real earnings depend on factors no outside tool can see, including ad
        inventory, viewer location, watch time and advertiser demand. The formula behind our{" "}
        <Link href="/revenue-calculator">revenue calculators</Link>:
      </p>
      <p>
        <code>earnings = views ÷ 1,000 × monetized share (default 60%) × 55% creator split × niche CPM range × audience multiplier</code>
      </p>
      <h3>CPM table (long-form, USD, advertiser CPM)</h3>
      <p>
        These are channelpeek estimates of industry-typical ranges, reviewed quarterly. Last reviewed: November 2026. They are not YouTube
        data.
      </p>
      <table>
        <thead>
          <tr>
            <th>Niche</th>
            <th>CPM range</th>
          </tr>
        </thead>
        <tbody>
          {NICHES.map((n) => (
            <tr key={n.id}>
              <td>{n.name}</td>
              <td>
                ${n.cpmLow}–${n.cpmHigh}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Audience multipliers</h3>
      <table>
        <thead>
          <tr>
            <th>Main audience</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {COUNTRY_TIERS.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>×{t.multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Shorts are estimated separately at ${SHORTS_RPM_LOW.toFixed(2)}–${SHORTS_RPM_HIGH.toFixed(2)} creator RPM per 1,000 views.
        Sponsorship rates use $20–$50 per 1,000 expected views for a dedicated integration.
      </p>

      <h2>Keyword data</h2>
      <p>
        Keyword tools use YouTube&apos;s public search suggestions — real phrases people type. We don&apos;t show monthly search volumes
        because Google doesn&apos;t publish them for YouTube; any precise volume number you see elsewhere is an estimate. Keyword Difficulty
        shows the top-10 ranking videos from the official API; because a search costs 100 quota units, results are cached for 7 days.
      </p>

      <h2>AI tools</h2>
      <p>
        Generator and summarizer tools send your topic or pasted transcript to Google&apos;s Gemini API to produce suggestions, and are
        limited to 10 generations per day. We don&apos;t store the inputs. AI output is a draft: review it before publishing. Transcript
        tools work on text you paste from YouTube&apos;s own transcript panel, because YouTube&apos;s API only allows caption downloads by a
        video&apos;s owner — we don&apos;t scrape private endpoints.
      </p>

      <h2>Freshness</h2>
      <p>
        We cache API responses to stay fast and within YouTube&apos;s quota. Every result shows when it was fetched. See the{" "}
        <Link href="/data-policy">data policy</Link> for how long we keep each type of data.
      </p>
    </ProsePage>
  );
}
