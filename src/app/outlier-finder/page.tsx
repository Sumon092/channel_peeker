import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { OutlierFinder } from "./outlier-finder";

const tool = getTool("/outlier-finder");

export const metadata = pageMetadata({
  title: "YouTube Outlier Finder: beat-the-median videos",
  description:
    "Find a channel's outlier videos — the ones that beat its typical views by 2×, 5× or 10×. Free, official YouTube data, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Outlier Finder"
      intro="See which of a channel's recent videos massively out-performed its usual numbers — the clearest signal of a topic or thumbnail that worked."
      updated="November 4, 2026"
      howTo={[
        "Paste a channel link or @handle.",
        "We analyze the channel's newest 50 public uploads.",
        "Filter by 2×, 5× or 10× the channel's typical views and study what the outliers have in common.",
      ]}
      meaning={
        <>
          <p>
            An <strong>outlier</strong> is a video that got far more views than the same channel usually gets. We compare each video against
            the <strong>median</strong> views of the channel&apos;s recent uploads of the same format (Shorts and long-form are measured
            separately), because one viral hit distorts averages but not medians.
          </p>
          <p>
            Outliers matter because they isolate what changed: same channel, same audience — different idea, title or thumbnail. Studying a
            niche&apos;s outliers is the most honest form of topic research.
          </p>
        </>
      }
      faq={[
        {
          q: "What counts as an outlier on YouTube?",
          a: "A common rule: a video with at least 2× the channel's median views. 5× is strong, 10× is exceptional.",
        },
        {
          q: "Why compare against the median and not the average?",
          a: "One viral video can double a channel's average and hide every other outlier. The median ignores extremes, so multipliers stay meaningful.",
        },
        {
          q: "Why are Shorts measured separately?",
          a: "Shorts routinely get many times more raw views than long-form on the same channel. Mixing formats would mark every Short an outlier.",
        },
        {
          q: "How many videos do you analyze?",
          a: "The channel's newest 50 public uploads — recent enough to reflect the channel's current audience.",
        },
        {
          q: "Can I search outliers across all of YouTube by topic?",
          a: "Not here yet. We analyze one channel at a time; cross-YouTube outlier databases require tracking millions of channels continuously.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, official YouTube data only.",
        },
      ]}
      related={["/channel-analyzer", "/video-analyzer", "/thumbnail-tools/thumbnail-downloader"]}
    >
      <OutlierFinder />
    </ToolPage>
  );
}
