import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How channelpeeker handles your information when you use our free YouTube tools.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <ProsePage title="Privacy policy" path="/privacy-policy" updated="September 29, 2026">
      <p>
        This policy explains what information {site.name} collects when you use the site and what we do with it. You don&apos;t need an account
        to use our tools.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>What you type into a tool</strong>, such as a channel handle or video link, so we can fetch and show the result. Results are
          cached as described in our <Link href="/data-policy">data policy</Link>.
        </li>
        <li>
          <strong>Basic technical data</strong>, such as your IP address and browser type. We use it for rate limiting, abuse prevention and error
          monitoring, and keep it only as long as those purposes need.
        </li>
        <li>
          <strong>Aggregate usage analytics</strong> to learn which tools are useful. We use privacy-friendly analytics that do not track you
          across other websites.
        </li>
      </ul>

      <h2>YouTube API Services</h2>
      <p>
        Our tools use the YouTube API Services. By using them you also agree to the{" "}
        <a href="https://www.youtube.com/t/terms" rel="noopener">
          YouTube Terms of Service
        </a>
        , and Google&apos;s handling of data is covered by the{" "}
        <a href="https://policies.google.com/privacy" rel="noopener">
          Google Privacy Policy
        </a>
        .
      </p>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your personal information.</li>
        <li>We don&apos;t upload images you check in our thumbnail tools; they stay in your browser.</li>
        <li>We don&apos;t try to infer sensitive traits of viewers or creators.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        See our <Link href="/cookie-policy">cookie policy</Link>.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal information we hold about you. Email{" "}
        <strong>{site.contactEmail}</strong> and we will respond within 30 days.
      </p>

      <h2>Changes</h2>
      <p>We will update the date at the top of this page when this policy changes.</p>
    </ProsePage>
  );
}
