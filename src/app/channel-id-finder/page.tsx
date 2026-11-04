import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelIdFinder } from "./channel-id-finder";

const tool = getTool("/channel-id-finder");

export const metadata = pageMetadata({
  title: "YouTube Channel ID Finder: find any channel's ID",
  description: "Find the channel ID (UC…) of any YouTube channel from its @handle, channel URL or any video link. Free, instant, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Channel ID Finder"
      intro="Paste a @handle, a channel link or any video from the channel, and get its permanent channel ID."
      updated="September 29, 2026"
      howTo={[
        "Copy the channel's @handle, its channel URL, or the link to any of its videos.",
        "Paste it into the box above. The lookup starts as soon as you paste.",
        "Copy the channel ID, the permanent channel URL or the handle with one click.",
      ]}
      meaning={
        <>
          <p>
            Every YouTube channel has a permanent <strong>channel ID</strong>: 24 characters starting with <code>UC</code>. Unlike a handle, it
            never changes, so it is the safest way to reference a channel in embeds, APIs, analytics tools and sponsorship contracts.
          </p>
          <p>
            The <strong>handle</strong> (like @name) is the public, changeable name. Subscriber counts are shown the way YouTube publishes them:
            rounded above 1,000.
          </p>
        </>
      }
      faq={[
        {
          q: "What is a YouTube channel ID?",
          a: "A unique 24-character identifier that starts with UC, for example UC_x5XG1OV2P6uZZ5FSM9Ttw. It stays the same even if the channel changes its name or handle.",
        },
        {
          q: "How do I find my own channel ID?",
          a: "Paste your @handle here, or in YouTube go to Settings > Advanced settings, where YouTube lists your channel ID.",
        },
        {
          q: "Can I find a channel ID from a video?",
          a: "Yes. Paste any video or Shorts link from the channel and we'll look up the channel that uploaded it.",
        },
        {
          q: "Why doesn't my /c/ custom URL work?",
          a: "YouTube's API can no longer look up old /c/ custom URLs. Use the channel's @handle or a link to one of its videos instead.",
        },
        {
          q: "Is the channel ID the same as the handle?",
          a: "No. The handle is the @name people see and can be changed. The channel ID is permanent and is what tools and APIs use.",
        },
        {
          q: "What's the difference between a YouTube handle and a channel name?",
          a: "The channel name is the display title (can contain spaces, needn't be unique). The handle is the unique @name used in URLs and mentions. Both can change; only the channel ID is permanent.",
        },
        {
          q: "How do I find a channel ID on mobile?",
          a: "Share the channel (or any of its videos) from the YouTube app, copy the link, and paste it here — the ID appears instantly.",
        },
        {
          q: "Is this tool free?",
          a: "Yes. It's free, needs no account, and only reads public channel information.",
        },
      ]}
      related={["/monetization-checker", "/channel-analyzer", "/thumbnail-tools/thumbnail-downloader"]}
    >
      <ChannelIdFinder />
    </ToolPage>
  );
}
