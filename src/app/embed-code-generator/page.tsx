import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { EmbedCodeGenerator } from "./embed-code-generator";

const tool = getTool("/embed-code-generator");

export const metadata = pageMetadata({
  title: "YouTube Embed Code Generator",
  description:
    "Generate clean, responsive YouTube iframe embed code with privacy-enhanced mode and a custom start time. Free, instant, runs in your browser.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Embed Code Generator"
      intro="Paste a video, pick your options, copy a clean responsive iframe — including privacy-enhanced mode and a start time."
      updated="November 4, 2026"
      howTo={[
        "Paste the video link.",
        "Choose responsive sizing, privacy-enhanced mode, and an optional start time.",
        "Copy the code and paste it into your site's HTML.",
      ]}
      meaning={
        <>
          <p>
            The <strong>responsive</strong> option wraps the iframe so it scales to any screen while keeping the 16:9 ratio — the fixed
            560×315 snippet YouTube gives you overflows small screens. <strong>Privacy-enhanced mode</strong> serves the player from{" "}
            <code>youtube-nocookie.com</code>, which doesn&apos;t store viewer cookies unless they play the video — useful for GDPR-conscious
            sites.
          </p>
          <p>The code is generated in your browser; nothing is sent to our servers.</p>
        </>
      }
      faq={[
        {
          q: "How do I embed a YouTube video on my website?",
          a: "Paste the video link here, copy the generated iframe code and add it to your page's HTML. Any CMS with an HTML block (WordPress, Shopify, Webflow…) accepts it.",
        },
        {
          q: "How do I make a YouTube embed responsive?",
          a: "Wrap the iframe in a container with padding-bottom: 56.25% and position the iframe absolutely — exactly what the responsive option generates.",
        },
        {
          q: "What is youtube-nocookie.com?",
          a: "YouTube's privacy-enhanced domain. The embedded player doesn't set tracking cookies until the viewer actually plays the video.",
        },
        {
          q: "Can the embed start at a specific time?",
          a: "Yes — set the start seconds and we add ?start= to the embed URL.",
        },
        {
          q: "Does embedding a video earn views for the creator?",
          a: "Yes, plays in embeds count as views for the video as long as embedding is allowed by the uploader.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, client-side, no account.",
        },
      ]}
      related={["/region-restriction-checker", "/timestamp-link-generator", "/shorts-link-converter"]}
    >
      <EmbedCodeGenerator />
    </ToolPage>
  );
}
