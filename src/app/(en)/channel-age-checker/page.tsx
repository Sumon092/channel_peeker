import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ChannelAgeChecker } from "./channel-age-checker";

const tool = getTool("/channel-age-checker");

export const metadata = pageMetadata({
  title: "YouTube Channel Age & Creation Date Checker",
  description:
    "Find out exactly when any YouTube channel was created and how old it is, with total views and video count. Free, instant, no signup.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Channel Age Checker"
      intro="See exactly when any YouTube channel was created and how old it is today. Paste a channel link, @handle or video link to get started."
      updated="November 27, 2026"
      afterTool={
        <p>
          Every channel has a creation date, but YouTube doesn&apos;t make it easy to find. That date tells you a lot. A channel with 2
          million subscribers that&apos;s 10 years old has grown steadily. One that hit 2 million in 8 months probably went viral. This tool
          shows you the date in seconds, along with total views and video count, so you can see the full picture.
        </p>
      }
      howTo={[
        <>
          <strong>Paste the channel.</strong> Use the @handle (like @mkbhd), the channel URL, the channel ID (it starts with UC), or a link
          to any of the channel&apos;s videos, Shorts included. All of them work.
        </>,
        <>
          <strong>Check the date.</strong> The tool reads the creation date straight from YouTube&apos;s official data, so it matches what
          YouTube itself records.
        </>,
        <>
          <strong>Use the result.</strong> Copy it, or open the{" "}
          <Link href="/channel-analyzer" className="font-medium text-accent-strong underline">
            full channel analysis
          </Link>{" "}
          to see the channel&apos;s recent uploads and which of them are getting the most views.
        </>,
      ]}
      resultSection={{
        eyebrow: "The result card",
        title: "What you'll see in the result",
        content: (
          <>
            <p>Here&apos;s what the result showed when we checked @mkbhd on November 27, 2026:</p>
            <ul>
              <li>
                <strong>Channel:</strong> avatar, name (Marques Brownlee) and handle.
              </li>
              <li>
                <strong>Age:</strong> in years, months and days, &quot;18 years, 8 months, 6 days old&quot;, plus the total in days (6,825
                days).
              </li>
              <li>
                <strong>Creation date and time,</strong> in UTC: &quot;Created on March 21, 2008 at 15:25 UTC&quot;.
              </li>
              <li>
                <strong>Subscribers:</strong> ≈ 21.5M, as YouTube rounds them, or &quot;Hidden by creator&quot; if they&apos;re hidden.
              </li>
              <li>
                <strong>Total views since creation:</strong> 5.9B.
              </li>
              <li>
                <strong>Public videos:</strong> 1,869.
              </li>
              <li>
                <strong>Subscribers per month:</strong> about 95.9K, worked out for you.
              </li>
              <li>
                <strong>Average views per video:</strong> 3.2M, worked out for you.
              </li>
              <li>
                <strong>Country:</strong> United States, or &quot;Not set&quot; if the creator left it blank.
              </li>
              <li>
                <strong>Channel ID:</strong> UCBJycsmduvYEL83R_U4JriQ, with a Copy ID button.
              </li>
              <li>
                <strong>Copy result:</strong> copies a one-line summary of the date, time and age.
              </li>
              <li>
                <strong>Copy link:</strong> copies a share link (channelpeeker.com/channel-age-checker?c=@mkbhd) that opens the tool and
                runs the same check. Handy for sending a channel to a client or teammate.
              </li>
              <li>
                <strong>Open on YouTube:</strong> opens the channel on YouTube in a new tab.
              </li>
            </ul>
          </>
        ),
      }}
      meaning={
        <>
          <p>
            The creation date is when the channel itself was made. It&apos;s not the date of the first video. Plenty of channels sit empty
            for years before anyone uploads anything. Some creators also delete or hide their oldest videos, so the earliest video you can
            see may be much newer than the channel.
          </p>
          <p>That&apos;s why age is most useful next to other numbers. Here&apos;s how to read them together:</p>
          <ul>
            <li>
              <strong>Old channel, few videos:</strong> the channel was probably dormant for a long time, or the creator removed old
              content.
            </li>
            <li>
              <strong>Young channel, big numbers:</strong> fast growth, often from one or two viral videos. Look at the top videos to see
              whether the growth has held up.
            </li>
            <li>
              <strong>Old channel, steady numbers:</strong> a long, consistent track record. This is usually the safest sign when
              you&apos;re judging a channel.
            </li>
          </ul>

          <h3>Channel age vs. Google account age</h3>
          <p>
            If you&apos;re trying to find out how old your YouTube account is, there are two dates. Your Google account may be years older
            than your channel, because a channel is created separately, sometimes long after you sign up for Gmail. This tool shows the
            channel&apos;s creation date, which is the date that matters on YouTube.
          </p>

          <h3>How to find a channel&apos;s creation date without a tool</h3>
          <p>
            You can check it on YouTube directly. Open the channel, tap the description under the channel name to open the &quot;About&quot;
            panel, and look for the &quot;Joined&quot; date. It shows only the date, so you&apos;ll need to work out the age yourself.
            That&apos;s what this tool does for you, along with the channel&apos;s views and video count.
          </p>
        </>
      }
      extraSection={[
        {
          eyebrow: "Common reasons",
          title: "Why people check a channel's age",
          content: (
            <ul>
              <li>
                <strong>Before a sponsorship or collab.</strong> Brands and creators check that a channel has a real track record and
                didn&apos;t appear out of nowhere.
              </li>
              <li>
                <strong>Before buying a channel.</strong> If a seller says a channel is &quot;established since 2015&quot;, the creation
                date shows whether that&apos;s true.
              </li>
              <li>
                <strong>Benchmarking against competitors.</strong> Compare how long a rival took to reach their numbers with how long
                you&apos;ve been going.
              </li>
              <li>
                <strong>Sizing up a niche.</strong> If most of the big channels in a topic are 8+ years old, it&apos;s a mature space. If
                several fast-growing ones are under 2 years old, there&apos;s still room for newcomers.
              </li>
              <li>
                <strong>Spotting fake or reused channels.</strong> A brand-new channel with huge subscriber counts and few videos can be a
                warning sign.
              </li>
              <li>
                <strong>Plain curiosity.</strong> Finding out when your favorite creator started is fun, especially when the channel turns
                out older than you expected.
              </li>
            </ul>
          ),
        },
        {
          eyebrow: "Do the math",
          title: "How to work out a channel's growth rate",
          content: (
            <>
              <p>
                Once you know how old a channel is, two quick sums tell you how fast it grew. The tool works out both for you and shows them
                in the result, but here&apos;s how they&apos;re calculated:
              </p>
              <ul>
                <li>
                  <strong>Subscribers per month:</strong> total subscribers ÷ channel age in months. A channel with 600,000 subscribers
                  that&apos;s 5 years old (60 months) has gained about 10,000 a month on average.
                </li>
                <li>
                  <strong>Average views per video:</strong> total views ÷ number of videos. 30 million views across 300 videos works out to
                  100,000 views per video.
                </li>
              </ul>
              <p>
                Keep in mind these are averages. A channel that crawled along for four years and then blew up in one month looks the same as
                one that grew steadily. To see which recent videos are driving views, open the{" "}
                <Link href="/channel-analyzer">full channel analysis</Link>.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "How do I see when a YouTube channel was created?",
          a: "Paste the channel's handle, URL or one of its video links into the tool above. You'll get the exact creation date and the channel's age. On YouTube itself, the date appears as \"Joined\" in the channel's About panel.",
        },
        {
          q: "How old is my YouTube account?",
          a: "Paste your own channel link into the tool. It shows when your channel was created. Your Google account may be older, because the channel is created separately.",
        },
        {
          q: "Is the creation date the same as the first upload?",
          a: 'No. A channel can sit empty for years before its first video, and old uploads can be deleted or hidden. See "What the results mean" above for how to read age next to video count.',
        },
        {
          q: "Does an older channel rank better or get monetized faster?",
          a: "Not directly. YouTube's Partner Program has no minimum channel age. It looks at subscribers and watch hours. Recommendations depend on how viewers respond to your videos, not on how old the channel is.",
          link: { text: "YouTube's Partner Program", href: "https://support.google.com/youtube/answer/72851" },
        },
        {
          q: "Can I check a deleted or private channel?",
          a: "No. The tool can only read public channels. Once a channel is deleted or made private, its data isn't available.",
        },
        {
          q: "Can I find out when a specific video was uploaded?",
          a: "Yes, but that's a different tool. Use the Video Upload Date Checker to get a video's exact publish date and time.",
          link: {
            text: "Video Upload Date Checker",
            href: "/video-upload-date-checker",
          },
        },
        {
          q: "Why does a channel look older than its videos?",
          a: "Usually because the creator made the channel early and started posting later, or removed older uploads. It's very common and doesn't mean anything is wrong.",
        },
        {
          q: "How accurate is the creation date?",
          a: "It comes straight from YouTube's own records through the official API, so it's the same date YouTube has stored for the channel. It's not an estimate.",
        },
        {
          q: "Can I paste a video link instead of the channel?",
          a: "Yes. Paste any video link, including a Shorts link, and the tool finds the channel that uploaded it, then shows that channel's creation date. A channel ID (it starts with UC) works too.",
        },
        {
          q: "Why isn't the tool showing a result?",
          a: "Usually it's the link. Paste the full channel link, the handle, or any video link. Old /c/ custom URLs don't work, so use the @handle or a video link instead. If the channel has been deleted, made private or terminated, there's nothing public left to read.",
        },
        {
          q: "Does a channel's age change if it's renamed?",
          a: "No. The creation date stays the same when a creator changes the channel name, handle or picture. It only reflects when the channel was first made.",
        },
        {
          q: "Why does a channel show a strange date like 1970?",
          a: "That's not a real date. A few channels, including YouTube's own official channel, come back from YouTube with January 1, 1970 as their creation date, which is a placeholder rather than the day they were made. Any date before 2005, the year YouTube launched, can't be right, so the tool shows \"Creation date not public\" instead of a wrong age.",
        },
      ]}
      related={["/channel-analyzer", "/video-upload-date-checker", "/monetization-checker"]}
    >
      <ChannelAgeChecker />
    </ToolPage>
  );
}
