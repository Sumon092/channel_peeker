import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of use",
  description: "The terms that apply when you use channelpeeker's free YouTube tools.",
  path: "/terms",
});

export default function Page() {
  return (
    <ProsePage title="Terms of use" path="/terms" updated="September 29, 2026">
      <p>By using {site.name} you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>

      <h2>The service</h2>
      <p>
        {site.name} provides free tools that show public YouTube data and our own estimates. {site.disclaimer}
      </p>

      <h2>YouTube Terms of Service</h2>
      <p>
        Our tools use the YouTube API Services. By using them you agree to be bound by the{" "}
        <a href="https://www.youtube.com/t/terms" rel="noopener">
          YouTube Terms of Service
        </a>
        .
      </p>

      <h2>Estimates are not guarantees</h2>
      <p>
        Scores, ratios and earnings ranges are channelpeeker estimates, explained on our <Link href="/methodology">methodology</Link> page. They
        are not provided or approved by YouTube or Google, and they are not financial advice.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Don&apos;t use automated scripts to send large numbers of requests or get around our rate limits.</li>
        <li>Don&apos;t use our tools to harass creators or viewers.</li>
        <li>Respect creators&apos; copyright. Thumbnails and other content you view with our tools belong to their owners.</li>
      </ul>

      <h2>No warranty</h2>
      <p>
        The site is provided &quot;as is&quot;. Data can be delayed, incomplete or unavailable, for example when YouTube&apos;s API is down or our
        quota is used up. To the extent the law allows, we are not liable for decisions made from information on the site.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows the latest version.</p>

      <h2>Contact</h2>
      <p>
        Questions: <strong>{site.contactEmail}</strong>
      </p>
    </ProsePage>
  );
}
