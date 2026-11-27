import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { hreflangFor } from "@/lib/i18n";
import { REQUIREMENTS_2027_ID } from "@/lib/monetization";
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

/** Rows of the requirements table: [requirement, fan funding, ad revenue until Jan 31 2027, ad revenue from Feb 1 2027]. */
const REQUIREMENTS: [string, string, string, string][] = [
  ["Subscribers", "500", "1,000", "1,000"],
  ["Public uploads", "3 in the last 90 days", "–", "–"],
  ["Watch hours (last 365 days)", "3,000", "4,000", "8,000"],
  ["Or Shorts views (last 90 days)", "3 million", "10 million", "20 million"],
  ["What it unlocks", "Memberships, Supers, Shopping", "Everything above, plus ad and Premium revenue", "Same"],
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Monetization Checker"
      intro="Find out whether a YouTube channel meets the Partner Program requirements, and what its public signals say about monetization. Paste a channel link, @handle or video link."
      updated="November 27, 2026"
      afterTool={
        <p>
          Here&apos;s the part most checkers skip: YouTube doesn&apos;t publish whether a channel is monetized. Only the owner can see that
          in YouTube Studio. What a tool can do is check the requirements that are public, read the clues a monetized channel leaves behind,
          and be upfront about everything else. That&apos;s exactly what this checker does.
        </p>
      }
      howTo={[
        <>
          <strong>Paste the channel.</strong> Use the @handle, the channel URL, the channel ID, or a link to any of its videos or Shorts.
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
                <strong>Estimate earnings:</strong> opens the earnings estimator with @veritasium already filled in.
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
      meaningHeading="YouTube monetization requirements, now and from February 2027"
      meaningId={REQUIREMENTS_2027_ID}
      meaning={
        <>
          <p>
            YouTube has two levels of monetization. The first unlocks fan funding. The second adds a share of ad and Premium revenue. On
            February 1, 2027, the bar for the second level doubles for new channels.
          </p>
          <table>
            <thead>
              <tr>
                <td />
                <th scope="col">Fan funding</th>
                <th scope="col">Ad revenue, until Jan 31, 2027</th>
                <th scope="col">Ad revenue, from Feb 1, 2027</th>
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
                  <strong>Ads on videos.</strong> This is the weakest clue. YouTube can show ads on any video, including on channels that
                  aren&apos;t in the program and get nothing from those ads.
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
          a: "No. The higher bar is for new applicants only. You do need to accept YouTube's updated terms in Studio by January 31, 2027, and from February 2027 your channel needs to stay active to keep its place in the program.",
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
          a: "Through the Shorts path: 10 million Shorts views in 90 days (20 million for new applicants from February 2027), plus 1,000 subscribers. Watch time from the Shorts feed doesn't count toward watch hours.",
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
      ]}
      related={["/watch-time-calculator", "/channel-analyzer", "/revenue-calculator/channel-earnings-estimator"]}
    >
      <MonetizationChecker />
    </ToolPage>
  );
}
