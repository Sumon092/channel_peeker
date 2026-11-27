import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { hreflangFor } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { WatchTimeCalculator } from "./watch-time-calculator";

const tool = getTool("/watch-time-calculator");

export const metadata = pageMetadata({
  title: "YouTube Watch Time Calculator: 4,000 & 8,000 Hours", // layout template appends " | channelpeeker"
  description:
    "Turn views and watch time into hours, track your progress to 4,000 hours (8,000 from February 2027), and see the date you'll get there. Free, no signup.",
  path: tool.path,
  languages: hreflangFor("/watch-time-calculator"),
});

/** Views needed at each average view duration. Values are ceil(hours × 3600 ÷ seconds), same as the widget. */
const VIEWS_TABLE: [duration: string, for3000: string, for4000: string, for8000: string][] = [
  ["2 minutes", "90,000", "120,000", "240,000"],
  ["3 minutes 30 seconds", "51,429", "68,572", "137,143"],
  ["5 minutes", "36,000", "48,000", "96,000"],
  ["8 minutes", "22,500", "30,000", "60,000"],
  ["10 minutes", "18,000", "24,000", "48,000"],
];

/** Watch hours at a 4-minute average view duration (views × 4 ÷ 60, rounded). */
const HOURS_TABLE: [views: string, hours: string][] = [
  ["100", "about 7"],
  ["1,000", "about 67"],
  ["10,000", "about 667"],
  ["100,000", "about 6,667"],
  ["1,000,000", "about 66,667"],
];

/** YouTube's announcement of the February 1, 2027 Partner Program changes. */
const YPP_CHANGES_URL = "https://support.google.com/youtube/answer/12843009";

/** "What you'll see in the result": the widget's own "Try an example" inputs and outputs (checked in the browser). */
const RESULT_SECTION = (
  <>
    <p>
      The calculator has three tabs. Each one has a &quot;Try an example&quot; button, and these are the results those examples give (the date
      is from November 27, 2026):
    </p>
    <ul>
      <li>
        <strong>Views to hours:</strong> 42,000 views at a 5:20 average view duration give 3,733 hours, or 224,000 minutes, which is 93.3% of
        4,000. That&apos;s 3,000 more views (45,000 total) at that duration for 4,000 hours. In total, 3,000 hours takes 33,750 views and 8,000
        hours takes 90,000. With a 12:00 video length filled in, the average % viewed is 44.4%. Spread across 20 videos, that&apos;s 1,688,
        2,250 and 4,500 views per video.
      </li>
      <li>
        <strong>Track my progress:</strong> 2,850 watch hours in the last 12 months is 71.3% of 4,000, with 1,150 hours to go, and 740 of 1,000
        subscribers. Getting there within 90 days takes about 12.8 hours a day. With 310 hours in the last 28 days, the pace is about 11.1 hours
        a day, which reaches 4,000 around March 11, 2027. Because that&apos;s after February 1, 2027, a note points out that new applicants will
        need 8,000 hours by then, with a button that switches the goal to 8,000. If a pace could never get there, because the 12-month total
        would level off below the goal, the calculator says so instead of showing a date.
      </li>
      <li>
        <strong>Length × retention:</strong> a 14:00 video with 38% average retention has a 5:19 average view duration. 60,000 views at that
        duration give 5,320 watch hours. For 3,000, 4,000 and 8,000 hours you&apos;d need 33,835, 45,113 and 90,226 views, or 1,354, 1,805 and
        3,610 per video across 25 videos.
      </li>
      <li>
        <strong>On every tab:</strong> Copy result (a plain-text summary), Copy link (a link that fills in the same numbers), Clear, and a link
        to the earnings estimator. Everything is worked out in your browser. The only thing saved is which tab you used last.
      </li>
    </ul>
  </>
);

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      dataBadge="Math shown, nothing invented"
      heading="YouTube Watch Time Calculator"
      highlight="Watch Time Calculator"
      intro="Find out how many watch hours your videos have earned, and how far you are from the 4,000 hours YouTube asks for before it pays you from ads. Enter your views and average view duration. That's all it takes."
      updated="November 27, 2026"
      afterTool={
        <p>
          YouTube Studio shows your watch time, but it doesn&apos;t tell you what to do with it. Are 30,000 views enough? Would longer videos
          get you there faster? This calculator does the math for you. It turns views and average view duration into hours, then shows how
          many more views you&apos;d need at that same duration to cross the line.
        </p>
      }
      howTo={[
        "Enter your views. Use the view count for a single video, or the total for your channel over the last 12 months if you want to check your progress toward monetization.",
        "Enter your average view duration. Open YouTube Studio, go to Analytics, then the Engagement tab. You'll see it there in minutes and seconds, for example 4:12.",
        "Read your result. You'll get your total watch time in hours and minutes, whether you've passed 4,000 hours, and how many more views you'd need at the same average duration.",
      ]}
      howToTip="To check your monetization progress, set the date range in Studio to the last 365 days before you copy the numbers. That's the window YouTube looks at."
      resultSection={[
        {
          eyebrow: "In YouTube Studio",
          title: "How to check your watch hours in YouTube Studio",
          content: (
            <>
              <p>There are two places to look, and they answer different questions.</p>
              <ol>
                <li>
                  For your monetization progress, open YouTube Studio and click Earn. It shows your public watch hours from the last 12
                  months, which is the number YouTube actually counts for the <Link href="/monetization-checker">Partner Program</Link>. Use
                  this in the &quot;Track my progress&quot; tab.
                </li>
                <li>
                  For your recent pace, open Analytics, set the date range to the last 28 days, and note your watch time in hours. Put that in
                  the &quot;last 28 days&quot; box and the calculator works out when you&apos;ll reach your goal.
                </li>
              </ol>
              <p>
                The two numbers won&apos;t always match. Analytics counts everything, including Shorts feed views and videos you&apos;ve
                since made private, while Earn only counts what qualifies.
              </p>
            </>
          ),
        },
        {
          eyebrow: "The math",
          title: "The watch time formula",
          content: (
            <>
              <p className="rounded-xl bg-surface-2 px-4 py-3 font-semibold">Watch hours = views × average view duration (in minutes) ÷ 60</p>
              <p>A few worked examples:</p>
              <ul>
                <li>10,000 views at an average of 4 minutes = 40,000 minutes = about 667 hours.</li>
                <li>50,000 views at 3 minutes 30 seconds = 175,000 minutes = about 2,917 hours.</li>
                <li>100,000 views at 2 minutes = 200,000 minutes = about 3,333 hours.</li>
              </ul>
              <p>
                If you know your video length and retention instead, work out the average view duration first: video length × retention %. A
                10-minute video with 40% retention gives an average view duration of 4 minutes.
              </p>
              <h3>How many watch hours do views give you?</h3>
              <p>At an average view duration of 4 minutes:</p>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Views</th>
                    <th scope="col">Watch hours</th>
                  </tr>
                </thead>
                <tbody>
                  {HOURS_TABLE.map(([views, hours]) => (
                    <tr key={views}>
                      <th scope="row" className="font-normal tabular-nums">
                        {views}
                      </th>
                      <td className="tabular-nums">{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>For your own numbers, use the calculator above.</p>
            </>
          ),
        },
        {
          eyebrow: "Your date",
          title: "Track your progress and see your date",
          content: (
            <>
              <p>
                Knowing your total is useful. Knowing when you&apos;ll get there is better. In the &quot;Track my progress&quot; tab, enter
                your watch hours from the last 12 months and your watch hours from the last 28 days. The calculator works out your daily
                pace, how many hours you still need, and roughly when you&apos;ll cross 4,000 (or 8,000) at that pace. It also shows how many
                hours a day you&apos;d need to get there within 90 days, which is a handy target if you want to speed things up.
              </p>
              <p>
                Treat the date as a rough guide. The 12-month window keeps moving, so hours you earned a year ago drop off as new ones come
                in.
              </p>
            </>
          ),
        },
        {
          eyebrow: "The result",
          title: "What you'll see in the result",
          content: RESULT_SECTION,
        },
      ]}
      meaningHeading="What your watch time result means"
      meaning={
        <>
          <p>
            Watch time is simple: <strong>views × average view duration</strong>. If a video has 100,000 views and people watch for 3 minutes
            30 seconds on average, that&apos;s 350,000 minutes, or about 5,833 hours.
          </p>
          <p>
            The number YouTube cares about is 4,000. To earn a share of ad revenue, you need 1,000 subscribers and 4,000 public watch hours on
            long-form videos in the last 365 days. In some countries there&apos;s also an earlier tier: 500 subscribers, 3 public uploads in
            the last 90 days, and 3,000 watch hours. That tier unlocks fan funding like channel memberships and Super Thanks, but not ad
            revenue.
          </p>

          <h3>Changing on February 1, 2027: 8,000 hours for new channels</h3>
          <p>
            From{" "}
            <a href={YPP_CHANGES_URL} target="_blank" rel="noopener noreferrer">
              February 1, 2027
            </a>
            , channels applying for ad revenue will need 8,000 watch hours in the last 365 days, or 20 million qualified Shorts views in 90 days, plus
            1,000 subscribers. That&apos;s double today&apos;s bar. Channels already in the Partner Program aren&apos;t affected, and the
            3,000-hour fan funding level stays the same. If you&apos;re planning to apply after February 1, aim for 8,000. That works out to
            about 22 hours of viewing every day.
          </p>

          <h3>How many views you need for 4,000 hours</h3>
          <p>Average view duration makes a huge difference. Here&apos;s how many views it takes at different durations:</p>
          <table>
            <thead>
              <tr>
                <th scope="col">Average view duration</th>
                <th scope="col">Views for 3,000 hours</th>
                <th scope="col">Views for 4,000 hours</th>
                <th scope="col">Views for 8,000 hours</th>
              </tr>
            </thead>
            <tbody>
              {VIEWS_TABLE.map(([duration, for3000, for4000, for8000]) => (
                <tr key={duration}>
                  <th scope="row" className="font-normal">
                    {duration}
                  </th>
                  <td className="tabular-nums">{for3000}</td>
                  <td className="tabular-nums">{for4000}</td>
                  <td className="tabular-nums">{for8000}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Public watch hours means watch time on long-form videos that are set to public. Shorts feed views, private, unlisted and deleted
            videos don&apos;t count.
          </p>
          <p>
            Going from a 2-minute to an 8-minute average cuts the views you need by three quarters. That&apos;s why keeping people watching
            often matters more than getting more clicks.
          </p>

          <h3>What doesn&apos;t count toward 4,000 hours</h3>
          <ul>
            <li>Watch time from Shorts in the Shorts feed</li>
            <li>Private, unlisted or deleted videos</li>
            <li>Videos running as ads</li>
            <li>Live streams once they&apos;re made private or deleted</li>
          </ul>
          <p>
            Shorts creators have their own route instead: 10 million qualified Shorts views in the last 90 days (or 3 million for the earlier
            tier).
          </p>

          <h3>Spread over a year, 4,000 hours is about 11 hours a day</h3>
          <p>
            The 365-day window is rolling. Watch time from 13 months ago drops off as new watch time comes in. So 4,000 hours works out to
            about 11 hours of viewing every day across your channel. If your daily total in Studio is well below that, you know you need more
            views, longer viewing, or both.
          </p>
        </>
      }
      extraSection={[
        {
          eyebrow: "Grow your watch time",
          title: "How to reach 4,000 watch hours faster",
          content: (
          <>
            <p>
              You can&apos;t change last year&apos;s numbers, but you can change what happens next. These are the things that move watch
              time the most:
            </p>
            <ul>
              <li>
                <strong>Fix the first 30 seconds.</strong> Most viewers leave early. Open with what the video delivers, not a long intro or a
                channel plug. Check the audience retention graph in Studio to see exactly where people drop off.
              </li>
              <li>
                <strong>Make some longer videos.</strong> A 12-minute video that holds people for 6 minutes earns three times the watch time
                of a 4-minute video people watch for 2. Tutorials, reviews and walkthroughs suit longer formats well.
              </li>
              <li>
                <strong>Send viewers to your next video.</strong> Use end screens, cards and playlists so one view turns into two or three.
                Series content works especially well here.
              </li>
              <li>
                <strong>Go live.</strong> Live streams often pick up long watch sessions, and they count as long as you keep the replay
                public.
              </li>
              <li>
                <strong>Use Shorts as a doorway.</strong> Shorts feed watch time won&apos;t count, but a Short can send new viewers to a long
                video that does.
              </li>
              <li>
                <strong>Keep old videos public.</strong> Deleting or privating a video removes its watch hours from your total. Fix or update
                an old video instead of taking it down.
              </li>
              <li>
                <strong>Make evergreen videos.</strong> Tutorials and explainers keep getting found for years, so they add watch hours long
                after you post them.
              </li>
              <li>
                <strong>Upload on a schedule.</strong> A steady rhythm gives YouTube more chances to recommend you and gives viewers a reason
                to come back.
              </li>
              <li>
                <strong>Work on titles and thumbnails.</strong> A better click-through rate means more people start watching, and every extra
                view adds hours.
              </li>
            </ul>
            <p>
              Once you&apos;re close, run your numbers again with the <Link href="/monetization-checker">Monetization Checker</Link> to see
              which public requirements your channel already meets.
            </p>
          </>
          ),
        },
        {
          eyebrow: "Totals going down",
          title: "Why your watch hours went down",
          content: (
            <>
              <p>It&apos;s normal to see your total drop, even when you&apos;re uploading. The usual reasons:</p>
              <ul>
                <li>
                  <strong>The 12-month window moved on.</strong> Hours from more than a year ago no longer count, so a big month last year
                  drops off this year.
                </li>
                <li>
                  <strong>You made a video private, unlisted or deleted it.</strong> Its watch hours leave your total straight away.
                </li>
                <li>
                  <strong>Your views slowed down.</strong> If you&apos;re earning hours more slowly than old ones expire, the total falls.
                </li>
                <li>
                  <strong>Studio hasn&apos;t caught up.</strong> The Earn number can lag behind Analytics by a day or two.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "How is YouTube watch time calculated?",
          a: "Multiply views by average view duration. 50,000 views at a 4-minute average is 200,000 minutes, which is about 3,333 hours. YouTube Studio adds this up for you, but the calculator lets you test \"what if\" numbers before you upload.",
        },
        {
          q: "How many views do I need for 4,000 watch hours?",
          a: "It depends on how long people watch. At a 2-minute average you'd need 120,000 views. At 5 minutes it's 48,000, and at 10 minutes just 24,000. Enter your own average above to get your exact number.",
        },
        {
          q: "Is the 4,000-hour requirement changing?",
          a: "Yes, for new channels. From February 1, 2027, new applicants need 8,000 watch hours in the last 365 days (or 20 million qualified Shorts views in 90 days) plus 1,000 subscribers. If you're already monetized, nothing changes for you.",
        },
        {
          q: "Where do I find my average view duration?",
          a: "In YouTube Studio, open Analytics and go to the Engagement tab. For a single video, open that video's analytics instead. Set the date range to the last 365 days if you're tracking monetization.",
        },
        {
          q: "Do Shorts views count toward 4,000 watch hours?",
          a: "No. Watch time from the Shorts feed doesn't count. Shorts have their own path: 10 million qualified Shorts views in 90 days, plus 1,000 subscribers.",
        },
        {
          q: "Do live streams count toward watch hours?",
          a: "Yes, as long as the stream is public and you keep the replay public. If you later make it private or delete it, those hours drop out of your total.",
        },
        {
          q: "Do watch hours ever expire?",
          a: "Yes. YouTube only counts the last 365 days, and the window moves every day. Hours from a video that went viral 14 months ago no longer count, even though the views are still on the video.",
        },
        {
          q: "I have 4,000 hours. Why am I not monetized yet?",
          a: "Hitting the numbers only makes you eligible. You still need 1,000 subscribers, then you apply in YouTube Studio under Earn and link an AdSense account. YouTube reviews your channel against its monetization policies before approving it.",
        },
        {
          q: "Can I buy watch hours?",
          a: "Don't. Bought views and watch time break YouTube's rules. They usually get filtered out, and they can get your application rejected or your channel removed.",
        },
        {
          q: "How many minutes is 4,000 watch hours?",
          a: "240,000 minutes. 8,000 hours, the target for new applicants from February 1, 2027, is 480,000 minutes, and the 3,000-hour fan funding target is 180,000 minutes.",
        },
        {
          q: "How many watch hours is 1,000 views?",
          a: "It depends on how long people watch. At a 4-minute average, 1,000 views give about 67 hours. At 10 minutes, about 167 hours. Enter your own numbers in the calculator above.",
        },
        {
          q: "Do the 4,000 hours have to come from one video?",
          a: "No. YouTube adds up public watch hours across all your long-form videos from the last 12 months. Many small videos count just as much as one big one.",
        },
        {
          q: "What happens when I reach 4,000 watch hours?",
          a: "You also need 1,000 subscribers. Once you have both, apply in YouTube Studio under Earn, accept the terms and link an AdSense account. YouTube then reviews your channel, which can take up to 30 days.",
        },
        {
          q: "Does YouTube pay per watch hour?",
          a: "No. YouTube doesn't pay for watch hours. Once you're monetized, you earn a share of ad revenue, which depends on views, your topic and your audience's location. Our earnings estimator gives you a rough range.",
          link: { text: "earnings estimator", href: "/revenue-calculator/channel-earnings-estimator" },
        },
        {
          q: "Is 4,000 watch hours hard to get?",
          a: "It's a real milestone. Spread over a year, it's about 11 hours of viewing every day across your channel. Longer videos that hold attention get there much faster than short ones, which is why average view duration matters so much.",
        },
        {
          q: "What retention rate should I use in the calculator?",
          a: "Use your real numbers from YouTube Studio if you have them. If you're just starting out, try a few values between 30% and 50% to see a range, then replace them with your real figure once you have some videos up.",
        },
        {
          q: "I'm applying around January 2027. Which rule applies to me?",
          a: "The 8,000-hour rule applies to new applicants from February 1, 2027. YouTube's announcement doesn't say how applications still in review on that date will be handled, so if you already meet 4,000 hours and 1,000 subscribers, it makes sense to apply before then and check the status in Earn.",
        },
        {
          q: "Is this calculator free?",
          a: "Yes. There's no signup and no usage limit.",
        },
      ]}
      related={["/monetization-checker", "/channel-analyzer", "/revenue-calculator"]}
    >
      <WatchTimeCalculator />
    </ToolPage>
  );
}
