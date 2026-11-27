import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { hreflangFor } from "@/lib/i18n";
import { REQUIREMENTS_2027_ID } from "@/lib/monetization";
import { NICHES, nicheRpm } from "@/lib/revenue-data";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { MonetizationChecker } from "./monetization-checker";

const tool = getTool("/monetization-checker");

const YPP_CHANGES_URL = "https://support.google.com/youtube/answer/12843009";

export const metadata = pageMetadata({
  title: "YouTube Monetization Checker: Is This Channel Monetized?",
  description:
    "Check any YouTube channel against Partner Program rules, including the February 2027 changes. See the public signals and what they really mean. Free.",
  path: tool.path,
  languages: hreflangFor("/monetization-checker"),
});

/** Rows of the requirements table: [requirement, fan funding, ad revenue until January 31, 2027, ad revenue from February 1, 2027]. */
const REQUIREMENTS: [string, string, string, string][] = [
  ["Subscribers", "500", "1,000", "1,000"],
  ["Public uploads", "3 in the last 90 days", "–", "–"],
  ["Watch hours (last 365 days)", "3,000", "4,000", "8,000"],
  ["Or Shorts views (last 90 days)", "3 million", "10 million", "20 million"],
  ["What it unlocks", "Memberships, Supers, Shopping", "Everything above, plus ad and YouTube Premium revenue", "Same"],
];

/** Niches shown in the RPM table: straight from the earnings estimator's CPM table, so the numbers always match it. */
const usd2 = (n: number) => `$${n.toFixed(2)}`;
const RPM_NICHES = ["finance", "business", "tech", "education", "health", "food", "gaming", "entertainment"].map((id) => NICHES.find((n) => n.id === id)!);

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Monetization Checker"
      intro="Find out whether a YouTube channel meets the Partner Program requirements, and what its public signals say about monetization. Paste a channel link, @handle or video link."
      updated="November 27, 2026"
      afterTool={
        <p>
          One thing to know before you start: YouTube doesn&apos;t publish whether a channel is monetized. Only the owner can see that
          in YouTube Studio. What a tool can do is check the requirements that are public, read the clues a monetized channel leaves behind,
          and be upfront about everything else. That&apos;s exactly what this checker does.
        </p>
      }
      howTo={[
        <>
          <strong>Paste the channel.</strong> Use the @handle, the channel URL, the channel ID, or a link to any of its videos, Shorts or
          live streams.
        </>,
        <>
          <strong>Run the check.</strong> We look at the channel&apos;s subscriber count, country, recent uploads and made-for-kids
          setting, and compare them with both Partner Program tiers.
        </>,
        <>
          <strong>Read the verdict.</strong> Each requirement is marked as met, partly met, not met, or not public, so you can see exactly
          what&apos;s confirmed and what isn&apos;t.
        </>,
      ]}
      resultSection={{
        eyebrow: "The result card",
        title: "What you'll see in the result",
        content: (
          <>
            <p>Here&apos;s what the result showed when we checked @veritasium on November 27, 2026:</p>
            <ul>
              <li>
                <strong>Channel:</strong> avatar, name (Veritasium) and handle, with ≈ 21.5M subscribers and 555 videos.
              </li>
              <li>
                <strong>Countdown:</strong> &quot;66 days until YouTube&apos;s new ad revenue requirements take effect&quot;, linking to the
                2027 requirements below. It disappears on February 1, 2027.
              </li>
              <li>
                <strong>Fan funding tier:</strong> &quot;Meets every public requirement&quot;. At least 500 subscribers (where available):
                met, ≈ 21.5M. 3 public uploads in the last 90 days: met, 25 uploads. Partner Program country: met, the United States. Not made
                for kids: met. 3,000 watch hours or 3M Shorts views: not public.
              </li>
              <li>
                <strong>Ad revenue tier:</strong> &quot;Meets every public requirement&quot;. At least 1,000 subscribers: met, ≈ 21.5M.
                Partner Program country: met. Not made for kids: met. 4,000 watch hours or 10M Shorts views: not public, with a note that new
                applicants need 8,000 hours or 20M Shorts views from February 1, 2027. Recent uploads don&apos;t count here.
              </li>
              <li>
                <strong>Both tiers:</strong> no active strikes and following monetization policies: not public.
              </li>
              <li>
                <strong>Staying active:</strong> 25 public uploads in the last 90 days, which is enough for the 2027 rule whichever kind they
                are. The count combines long videos and Shorts, because YouTube&apos;s public data doesn&apos;t reliably tell them apart.
                It&apos;s shown for information and doesn&apos;t affect the verdict.
              </li>
              <li>
                <strong>Check it yourself:</strong> an Open channel on YouTube button and four tick boxes (Join button, Store tab or product
                shelf, Super Thanks or Super Chat, ads on recent videos), each with a line on how strong that clue is.
              </li>
              <li>
                <strong>Our read:</strong> &quot;Possibly monetized&quot; with nothing ticked, since the public requirements are met. Ticking
                &quot;I see a Join button&quot; changes it to &quot;Very likely monetized&quot;. Nothing you tick is saved.
              </li>
              <li>
                <strong>Estimated monthly earnings:</strong> $22.9K – $91.6K, labelled &quot;Estimate, not a payout&quot;. It&apos;s based on
                the views of the 11 videos uploaded in the last 30 days, assuming a mixed niche and a US, UK, Canadian or Australian audience.
                It only appears when a channel meets the public ad revenue requirements. Otherwise the box says &quot;Not shown: this channel
                doesn&apos;t meet the public ad revenue requirements.&quot;
              </li>
              <li>
                <strong>Estimate earnings:</strong> opens the earnings estimator with @veritasium already filled in, where you can pick the
                niche and audience for the full breakdown.
              </li>
              <li>
                <strong>Recently checked:</strong> your last 5 channels appear under the search box, with a Clear button. Click one to check
                it again. The list is kept only in your browser.
              </li>
              <li>
                <strong>Copy link:</strong> copies a share link (channelpeeker.com/monetization-checker?c=@veritasium) that opens the tool
                and runs the same check.
              </li>
              <li>
                <strong>When the data was fetched,</strong> so you know how fresh it is.
              </li>
            </ul>
          </>
        ),
      }}
      meaningHeading="YouTube monetization requirements, now and from February 1, 2027"
      meaningId={REQUIREMENTS_2027_ID}
      meaning={
        <>
          <p>
            YouTube has two levels of monetization. The first unlocks fan funding. The second adds a share of ad and Premium revenue. On February 1, 2027, the watch-hour and Shorts-view targets for the second level double for new channels. The subscriber
            requirement stays at 1,000.
          </p>
          <table>
            <thead>
              <tr>
                <td />
                <th scope="col">Fan funding</th>
                <th scope="col">Ad revenue, until January 31, 2027</th>
                <th scope="col">Ad revenue, from February 1, 2027</th>
              </tr>
            </thead>
            <tbody>
              {REQUIREMENTS.map(([label, fan, adNow, ad2027]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td className="tabular-nums">{fan}</td>
                  <td className="tabular-nums">{adNow}</td>
                  <td className="tabular-nums">{ad2027}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            YouTube Premium revenue is a share of what Premium subscribers pay when they watch your videos.
          </p>
          <p>A few things worth knowing:</p>
          <ul>
            <li>The 2027 change only applies to new applicants. Channels already in the Partner Program keep their status.</li>
            <li>The fan funding level isn&apos;t changing.</li>
            <li>The 500-subscriber level is only available in some countries. Everywhere else, channels start at 1,000.</li>
            <li>
              You also need to follow YouTube&apos;s monetization policies, have no active Community Guidelines strikes, and live in a country
              where the Partner Program is available.
            </li>
          </ul>

          <h3>What else changes in 2027 for monetized channels</h3>
          <ul>
            <li>
              <strong>Staying active:</strong> from February 1, 2027, a monetized channel needs at least one of these: 1,000 watch hours in
              the past year, 1 million Shorts views in the last 90 days, or 2 long videos or 5 Shorts uploaded every 90 days. Channels that
              fall short get 90 days to catch up.
            </li>
            <li>
              <strong>Shorts earnings:</strong> to earn from the Shorts Creator Pool each month, a channel needs 10 million Shorts views over
              the last 90 days. Missing this doesn&apos;t affect long-form earnings.
            </li>
            <li>
              <strong>New terms:</strong> channels already in the program need to accept the updated terms in YouTube Studio by January 31,
              2027. Otherwise they stop earning from the affected features.
            </li>
          </ul>
          <p>
            You can read YouTube&apos;s full announcement on its{" "}
            <a href={YPP_CHANGES_URL} target="_blank" rel="noopener noreferrer">
              Partner Program changes
            </a>{" "}
            page.
          </p>
        </>
      }
      extraSection={[
        {
          eyebrow: "Spot the signs",
          title: "How to tell if a channel is monetized without a tool",
          content: (
            <>
              <p>You can spot most of the public clues yourself. Some are much stronger than others.</p>
              <ul>
                <li>
                  <strong>A Join button next to Subscribe.</strong> Channel memberships are only available to Partner Program channels, so
                  this is the strongest public sign there is.
                </li>
                <li>
                  <strong>Super Thanks, Super Chat or Super Stickers.</strong> These are Partner Program features too.
                </li>
                <li>
                  <strong>A Store tab or product shelf.</strong> This usually means Shopping is switched on, which also needs the Partner
                  Program.
                </li>
                <li>
                  <strong>Ads on videos.</strong> This is the weakest clue. <a href="https://support.google.com/youtube/answer/72851" target="_blank" rel="noopener noreferrer">
                    YouTube can show ads on any video, including on channels that aren&apos;t in the program and get nothing from those ads.
                  </a>
                </li>
                <li>
                  <strong>The subscriber count.</strong> A channel under 500 subscribers almost certainly hasn&apos;t qualified yet.
                </li>
              </ul>
              <p>No single clue is proof. A Join button tells you a lot. Ads on their own tell you very little.</p>
              <p>Our checker walks you through these clues and combines them with the public requirements into a confidence level.</p>
            </>
          ),
        },
        {
          eyebrow: "Single videos",
          title: "Can you check if a single video or Short is monetized?",
          content: (
            <p>
              Not reliably. Even on a monetized channel, one video can earn nothing. It might be made for kids, carry limited ads because of
              its topic, or include music that someone else has claimed. The ad breaks you see while watching don&apos;t prove the creator is
              getting paid. If you paste a video or Shorts link here, we check the channel behind it, because that&apos;s the part that&apos;s
              public.
            </p>
          ),
        },
        {
          eyebrow: "Common reasons",
          title: "Why a channel might not be monetized yet",
          content: (
            <ul>
              <li>
                <strong>Not enough watch hours or Shorts views.</strong> This is the most common reason by far. Use the{" "}
                <Link href="/watch-time-calculator">watch time calculator</Link> to see how far off you are.
              </li>
              <li>
                <strong>Reused or repetitive content.</strong> YouTube turns down channels that mostly re-upload other people&apos;s videos or
                mass-produce near-identical ones.
              </li>
              <li>
                <strong>Made-for-kids content.</strong> These channels can join, but they earn less: no personalized ads, and no memberships or
                Supers.
              </li>
              <li>
                <strong>Location.</strong> The Partner Program isn&apos;t available in every country.
              </li>
              <li>
                <strong>Strikes.</strong> An active Community Guidelines strike can block or delay approval.
              </li>
              <li>
                <strong>Never applied.</strong> Hitting the numbers doesn&apos;t enroll you automatically. You have to apply in YouTube Studio,
                under Earn.
              </li>
            </ul>
          ),
        },
        {
          eyebrow: "Your own channel",
          title: "How to check your own channel",
          content: (
            <>
              <p>
                Open YouTube Studio and go to Earn. You&apos;ll see your exact watch hours, Shorts views and subscribers, how close you are to
                each tier, and your application status if you&apos;ve applied. It&apos;s the only official answer. A tool like this one is
                handy for checking other channels, or for a quick look at what&apos;s public.
              </p>
              <p>
                Want to know what a monetized channel might make? Try the{" "}
                <Link href="/revenue-calculator/channel-earnings-estimator">earnings estimator</Link>.
              </p>
            </>
          ),
        },
        {
          eyebrow: "Next steps",
          title: "Who uses a monetization checker, and what to do next",
          content: (
            <>
              <p>Different people check for different reasons, and the next step depends on yours.</p>
              <ul>
                <li>
                  <strong>Creators tracking their own progress.</strong> Check what&apos;s public here, then open YouTube Studio&apos;s Earn
                  section for your exact watch hours. If you&apos;re close, the <Link href="/watch-time-calculator">watch time calculator</Link>{" "}
                  shows how many more views you need.
                </li>
                <li>
                  <strong>Brands and agencies vetting a sponsorship.</strong> A monetized channel has passed YouTube&apos;s own review, which
                  tells you something about its content. Look at the channel&apos;s recent uploads and views in the{" "}
                  <Link href="/channel-analyzer">channel analyzer</Link> before you sign anything.
                </li>
                <li>
                  <strong>Creators sizing up competitors.</strong> If a rival in your niche is monetized, the{" "}
                  <Link href="/revenue-calculator/channel-earnings-estimator">earnings estimator</Link> gives you a rough idea of what the
                  niche can pay.
                </li>
                <li>
                  <strong>People buying or selling a channel.</strong> Never take &quot;monetized&quot; on trust. Ask the seller for a live
                  screen share of the Earn page in YouTube Studio. It&apos;s the most reliable proof, because screenshots can be edited.
                </li>
              </ul>
            </>
          ),
        },
        {
          eyebrow: "Shorts and live",
          title: "YouTube Shorts and live stream monetization",
          id: "shorts-and-live",
          content: (
            <>
              <p>
                Shorts have their own route into the Partner Program. Instead of watch hours, a channel can qualify with Shorts views: 10
                million in the last 90 days today, or 20 million for new applicants from February 1, 2027, plus 1,000 subscribers. Watch time
                from the Shorts feed doesn&apos;t count toward the watch-hour target, so a channel can&apos;t mix the two.
              </p>
              <p>
                Shorts earnings work differently too. Ad money from the Shorts feed goes into a shared pool, called the Shorts Creator Pool, which is split between creators
                based on their share of views. From February 1, 2027, a monetized channel needs to keep 10 million Shorts views every 90 days to
                keep earning from that pool. Missing it doesn&apos;t affect long-form earnings.
              </p>
              <p>
                Live streams are simpler. Watch time from a public live stream counts toward watch hours, as long as you keep the replay
                public. Monetized channels can also earn from Super Chat and Super Stickers during the stream. You can paste a live stream
                link into the checker, and it will check the channel behind it.
              </p>
            </>
          ),
        },
        {
          eyebrow: "Apply",
          title: "How to apply for YouTube monetization",
          content: (
            <>
              <p>Once your channel meets the requirements, you apply in YouTube Studio. It&apos;s free and takes a few minutes.</p>
              <ol>
                <li>Turn on 2-Step Verification for your Google account. YouTube requires it.</li>
                <li>Open YouTube Studio and select Earn in the left menu.</li>
                <li>Click Apply, then review and accept the Partner Program terms.</li>
                <li>Set up an AdSense account, or link one you already have. This is how YouTube pays you.</li>
                <li>
                  Wait for review. YouTube&apos;s systems and human reviewers look at your channel as a whole, and the review can take up to
                  30 days. You can follow the status in Earn.
                </li>
              </ol>
              <p>
                If you&apos;re turned down, YouTube tells you why. After a first rejection you can reapply after 30 days, or appeal within 21
                days if you think the decision was wrong.
              </p>
            </>
          ),
        },
        {
          eyebrow: "Earnings",
          title: "How much do monetized channels earn?",
          content: (
            <>
              <p>
                It depends far more on the topic than on the view count. Advertisers pay more to reach people who are about to spend money,
                so a finance or software channel can earn several times more per view than a gaming or entertainment channel with the same
                audience size.
              </p>
              <p>
                Earnings are usually measured as RPM (revenue per mille): what a creator earns for every 1,000 views after YouTube&apos;s
                share, across all their views, including ones with no ads.
              </p>
              <table>
                <caption className="caption-bottom pt-2 text-left text-sm text-muted">
                  For a US, UK, Canadian or Australian audience, from the earnings estimator&apos;s assumptions.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Niche</th>
                    <th scope="col">Estimated RPM range (US$ per 1,000 views)</th>
                  </tr>
                </thead>
                <tbody>
                  {RPM_NICHES.map((n) => {
                    const r = nicheRpm(n);
                    return (
                      <tr key={n.id}>
                        <th scope="row">{n.name}</th>
                        <td className="tabular-nums">
                          {usd2(r.low)} – {usd2(r.high)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p>
                These are estimates, not payouts. Your real RPM depends on your audience&apos;s location, video length, season and how many
                ads your videos show.
              </p>
              <p>
                For a rough figure for any channel, try the{" "}
                <Link href="/revenue-calculator/channel-earnings-estimator">earnings estimator</Link>.
              </p>
            </>
          ),
        },
        {
          eyebrow: "Per video",
          title: "Does every video earn money once a channel is monetized?",
          content: (
            <p>
              No. Being in the Partner Program means a channel can earn, not that every video does. Videos with limited ads (for example
              because of strong language or sensitive topics), videos made for kids, and videos where someone else has claimed the music or
              footage can earn little or nothing. That&apos;s also why two channels with the same views can make very different amounts.
              Topic, audience location and video length all change what an ad view is worth.
            </p>
          ),
        },
        {
          eyebrow: "Keeping it",
          title: "Can a channel lose monetization?",
          content: (
            <>
              <p>
                Yes. Getting in isn&apos;t permanent, and YouTube keeps checking channels that are already in the program. The most common
                reasons a channel loses it:
              </p>
              <ul>
                <li>
                  <strong>Going quiet.</strong> YouTube can turn off monetization for channels that haven&apos;t uploaded a video or posted
                  for 6 months. From February 1, 2027, monetized channels also need to stay active: 2 long videos or 5 Shorts every 90 days, or
                  1,000 watch hours in a year, or 1 million Shorts views in 90 days.
                </li>
                <li>
                  <strong>Breaking monetization policies.</strong> Reused content, mass-produced videos or misleading metadata can get a
                  channel removed from the program, even after it was approved.
                </li>
                <li>
                  <strong>Not accepting new terms.</strong> Channels already in the program need to accept YouTube&apos;s updated terms by
                  January 31, 2027, or they stop earning from the affected features.
                </li>
              </ul>
            </>
          ),
        },
        {
          eyebrow: "Why results differ",
          title: "Why different monetization checkers give different answers",
          content: (
            <>
              <p>
                If you&apos;ve tried a few checkers, you&apos;ve probably seen them disagree. That&apos;s because none of them can see
                YouTube&apos;s real records. Each one reads different public clues and weighs them differently. Some count ads on a video as
                proof, even though YouTube can show ads on channels that aren&apos;t paid for them. Some scrape signals from YouTube&apos;s
                pages, which breaks whenever YouTube changes its layout. Others give a confident yes or no that the data can&apos;t really
                support.
              </p>
              <p>
                We&apos;d rather be clear about the gaps. This checker shows which requirements are confirmed, which aren&apos;t public, and
                how strong each clue you can see for yourself really is.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Can this tool tell me for sure if a channel is monetized?",
          a: "No, and no outside tool can. YouTube keeps monetization status private between itself and the channel owner. This checker tells you which public requirements a channel meets and what the public clues suggest, and it marks everything else as not public.",
        },
        {
          q: "What are YouTube's monetization requirements right now?",
          a: "Until January 31, 2027, ad revenue needs 1,000 subscribers plus 4,000 watch hours in the last 365 days or 10 million Shorts views in the last 90 days. In some countries there's an earlier fan funding level at 500 subscribers, 3 public uploads in the last 90 days, and 3,000 watch hours or 3 million Shorts views.",
        },
        {
          q: "Are the monetization requirements changing in 2027?",
          a: "Yes. From February 1, 2027, new channels applying for ad revenue need 1,000 subscribers plus 8,000 watch hours in the last 365 days or 20 million Shorts views in the last 90 days. The 500-subscriber fan funding level stays the same.",
        },
        {
          q: "I'm already monetized. Do I need 8,000 hours now?",
          a: "No. The higher bar is for new applicants only. You do need to accept YouTube's updated terms in Studio by January 31, 2027, and from February 1, 2027 your channel needs to stay active to keep its place in the program.",
        },
        {
          q: "Can a channel be monetized with 500 subscribers?",
          a: "Partly. In countries with the fan funding level, 500 subscribers plus the upload and watch-time requirements unlock memberships, Supers and Shopping. Ad revenue still needs 1,000 subscribers.",
        },
        {
          q: "Does seeing ads on a video mean the channel is monetized?",
          a: "No. YouTube can run ads on any video, even on channels outside the Partner Program, and those creators don't get a share. A Join button is a much better sign.",
        },
        {
          q: "Why can't you check watch hours?",
          a: "Watch hours are private. Only the channel owner can see them in YouTube Studio, and YouTube's public data doesn't include them. You can estimate your own with the watch time calculator.",
          link: { text: "watch time calculator", href: "/watch-time-calculator" },
        },
        {
          q: "Why is the subscriber count approximate?",
          a: "YouTube rounds public subscriber counts above 1,000 to three significant figures, so 1,234 shows as 1.23K. Below 1,000 the count is exact, which is the range where the thresholds matter.",
        },
        {
          q: "Do made-for-kids channels earn less?",
          a: "Usually, yes. Videos made for kids don't get personalized ads, and features like memberships, Supers and comments are switched off, which removes several ways to earn.",
        },
        {
          q: "How do Shorts get monetized?",
          a: "There are two separate numbers. To join the Partner Program through Shorts, a channel needs 1,000 subscribers and 10 million Shorts views in 90 days, rising to 20 million for new applicants from February 1, 2027. Once a channel is in, from February 1, 2027 it needs to keep 10 million Shorts views every 90 days to keep earning from the Shorts Creator Pool. See the Shorts section above for more.",
          link: { text: "Shorts section", href: "#shorts-and-live" },
        },
        {
          q: "How much does a monetized channel earn?",
          a: "It varies hugely by topic, audience location and video length. Finance and tech channels can earn many times more per view than entertainment channels. Our earnings estimator gives you a realistic range.",
          link: { text: "earnings estimator", href: "/revenue-calculator/channel-earnings-estimator" },
        },
        {
          q: "Can I check my own channel with this tool?",
          a: "Yes. Paste your @handle to see what's public. For your exact watch hours and application status, go to YouTube Studio and open Earn.",
        },
        {
          q: "How long does YouTube take to review a monetization application?",
          a: "Up to 30 days. Your status shows in the Earn section of YouTube Studio while it's in review.",
        },
        {
          q: "What happens if my monetization application is rejected?",
          a: "YouTube tells you the main reason. After a first rejection, you can reapply after 30 days. If you think the decision was wrong, you can appeal within 21 days instead.",
        },
        {
          q: "What's the difference between being eligible and being monetized?",
          a: "Eligible means a channel meets the numbers: subscribers plus watch hours or Shorts views. Monetized means it has applied, passed YouTube's review and been accepted. Plenty of eligible channels aren't monetized because they haven't applied yet, or were turned down.",
        },
        {
          q: "Can a monetized channel lose monetization?",
          a: "Yes. YouTube can switch it off if a channel stops uploading for months, breaks its monetization policies, or (from February 1, 2027) doesn't accept the updated terms or stay active.",
        },
        {
          q: "Can I check if a channel is monetized on my phone?",
          a: "Yes. This checker works in any mobile browser. Copy the channel or video link from the YouTube app using Share, then paste it into the box above.",
        },
        {
          q: "Do you store the channels I check?",
          a: "We don't save the channels you type into the checker. To keep the tool fast and stop abuse, the server briefly caches the public data it gets from YouTube and counts requests per IP address for an hour. If you open a share link (one ending in ?c=@handle), that address appears in our standard server logs for about two weeks. We've set Google Analytics to remove channel names from page addresses. Your checklist ticks and recently checked list never leave your browser, and you can clear the list any time.",
        },
      ]}
      related={["/watch-time-calculator", "/channel-analyzer", "/revenue-calculator/channel-earnings-estimator"]}
    >
      <MonetizationChecker />
    </ToolPage>
  );
}
