import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About channelpeeker",
  description: "channelpeeker builds free, fast YouTube analytics and SEO tools with honest, explained numbers.",
  path: "/about",
});

export default function Page() {
  return (
    <ProsePage title="About channelpeeker" path="/about">
      <p>
        {site.name} is a set of free tools for YouTube creators, especially creators with small and growing channels. You can analyze any
        public channel or video, study what works in your niche, and estimate what a channel earns, without signing up or installing an
        extension.
      </p>

      <h2>What we believe</h2>
      <ul>
        <li>
          <strong>The basics should be free.</strong> Stats, thumbnails, tags and calculators shouldn&apos;t sit behind a paywall.
        </li>
        <li>
          <strong>Numbers should be honest.</strong> We show ranges instead of made-up exact figures, label our own estimates, and publish our{" "}
          <Link href="/methodology">methodology</Link>.
        </li>
        <li>
          <strong>Tools should be fast.</strong> Pages load quickly on a phone, and results appear as soon as we have them.
        </li>
      </ul>

      <h2>Independence</h2>
      <p>{site.disclaimer}</p>

      <p>
        Questions or ideas? <Link href="/contact">Get in touch</Link>.
      </p>
    </ProsePage>
  );
}
