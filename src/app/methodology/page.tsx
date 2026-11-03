import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
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
        Earnings are shown as low, mid and high ranges, never as one exact number. They come from a CPM/RPM table we maintain per niche,
        audience country and format, which we review every quarter. Real earnings depend on factors no outside tool can see, including ad
        inventory, viewer location, watch time and advertiser demand.
      </p>
      <p>
        The table and the formulas will be published here when the <Link href="/tools#revenue-calculator">revenue calculators</Link> launch.
      </p>

      <h2>Freshness</h2>
      <p>
        We cache API responses to stay fast and within YouTube&apos;s quota. Every result shows when it was fetched. See the{" "}
        <Link href="/data-policy">data policy</Link> for how long we keep each type of data.
      </p>
    </ProsePage>
  );
}
