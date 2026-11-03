import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata(
  "seo-tools",
  "YouTube SEO tools: tags, titles, descriptions and hashtags",
  "Free YouTube SEO tools: extract tags from any video, check title length and truncation, and generate descriptions, tags and hashtags.",
);

export default function Page() {
  return (
    <HubPage
      id="seo-tools"
      heading="YouTube SEO Tools"
      intro="Write titles, descriptions and tags that get found, and see what other videos in your niche use."
    >
      <h2>What actually helps a video get found</h2>
      <p>
        Titles, the first lines of the description and viewer response carry far more weight than tags. These tools focus on those first, and
        are honest about the smaller role tags and hashtags play today.
      </p>
    </HubPage>
  );
}
