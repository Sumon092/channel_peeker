import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Data policy: what we store and for how long",
  description: "What YouTube data channelpeek stores, how long we keep it, and how channel owners can request deletion.",
  path: "/data-policy",
});

const retention = [
  ["Channel ID and handle mapping", "30 days"],
  ["Channel statistics (subscribers, views, video count)", "6 hours in cache"],
  ["Video statistics (videos under 7 days old)", "2 hours in cache"],
  ["Video statistics (older videos)", "12 hours in cache"],
  ["Video metadata (title, tags, description)", "7 days"],
  ["Search results used for keyword difficulty", "7 days"],
  ["Stored snapshots of any public YouTube data", "Refreshed or deleted within 30 days"],
];

export default function Page() {
  return (
    <ProsePage title="Data policy" path="/data-policy" updated="September 29, 2026">
      <p>
        channelpeek uses the YouTube API Services to read public channel and video data. We follow the YouTube API Services Terms of Service and
        Developer Policies, including their limits on how long data can be stored.
      </p>

      <h2>What we store</h2>
      <p>
        We only request the fields a tool needs. We cache responses so repeated lookups don&apos;t use extra quota, and so pages load fast.
      </p>

      <h2>How long we keep it</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Maximum age</th>
            </tr>
          </thead>
          <tbody>
            {retention.map(([what, age]) => (
              <tr key={what}>
                <td>{what}</td>
                <td>{age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        An automated job runs every day and deletes or refreshes anything older than its allowed age. Public YouTube data is never kept for more
        than 30 days unless YouTube&apos;s policies explicitly allow longer.
      </p>

      <h2>Files you upload</h2>
      <p>
        Thumbnail tester, size checker and A/B preview process images in your browser. The images are not uploaded to our servers.
      </p>

      <h2>Deletion requests</h2>
      <p>
        If you own a channel and want its cached data or report pages removed, email <strong>{site.contactEmail}</strong> from an address linked
        to the channel, or include the channel URL. We act on requests within 7 days.
      </p>

      <h2>Google and YouTube</h2>
      <p>
        See the{" "}
        <a href="https://policies.google.com/privacy" rel="noopener">
          Google Privacy Policy
        </a>{" "}
        and the{" "}
        <a href="https://www.youtube.com/t/terms" rel="noopener">
          YouTube Terms of Service
        </a>
        . {site.disclaimer}
      </p>
    </ProsePage>
  );
}
