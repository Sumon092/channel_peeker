import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelAgeChecker } from "./channel-age-checker";

const tool = getTool("/channel-age-checker");

export const metadata = pageMetadata({
  title: "YouTube Channel Age Checker: creation date of any channel",
  description:
    "Find out exactly when any YouTube channel was created and how old it is, with total views and video count. Free, instant, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Channel Age Checker"
      intro="Paste any channel and see its exact creation date, its age today, and lifetime stats."
      updated="November 4, 2026"
      howTo={[
        "Paste the channel's @handle, channel URL, or a link to any of its videos.",
        "We read the channel's creation date from the official YouTube API.",
        "Copy the result, or jump to the full channel analysis.",
      ]}
      meaning={
        <>
          <p>
            Every channel&apos;s <strong>creation date</strong> is public metadata — it&apos;s the date the account made the channel, not the
            date of its first video. Many channels sit idle for years before uploading, so an old channel isn&apos;t automatically an
            established one. Pair the age with total views and video count for the real picture.
          </p>
          <p>
            Channel age is often checked when buying or vetting a channel, verifying a &quot;we&apos;ve been around since …&quot; claim, or
            sizing up how fast a competitor grew.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I find out when a YouTube channel was created?",
          a: "Paste its @handle or URL here. The creation date is public metadata in YouTube's API. It's also shown on some channels' About pages.",
        },
        {
          q: "Is the creation date the same as the first upload?",
          a: "No. It's when the channel was created. Channels often upload their first video much later, and old videos can be deleted or hidden.",
        },
        {
          q: "Does channel age affect monetization or ranking?",
          a: "Not directly. YouTube's Partner Program has no minimum channel age, and recommendations care about viewer response, not account age.",
        },
        {
          q: "Can I check a deleted or private channel?",
          a: "No. Only public channels can be read through the API.",
        },
        {
          q: "Why would I check a channel's age?",
          a: "Common reasons: vetting a channel before a purchase or sponsorship, verifying longevity claims, or measuring how quickly a competitor reached their current size.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, and it only reads public channel information.",
        },
      ]}
      related={["/channel-analyzer", "/video-upload-date-checker", "/monetization-checker"]}
    >
      <ChannelAgeChecker />
    </ToolPage>
  );
}
