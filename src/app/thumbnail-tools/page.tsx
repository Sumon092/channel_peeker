import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata(
  "thumbnail-tools",
  "YouTube thumbnail tools: download & test",
  "Free YouTube thumbnail tools: download every size up to 4K, preview in feed mockups, check dimensions and compare two versions.",
);

export default function Page() {
  return (
    <HubPage
      id="thumbnail-tools"
      heading="YouTube Thumbnail Tools"
      intro="Grab any video's thumbnail in every size, then test your own before you publish."
    >
      <h2>Why thumbnails matter</h2>
      <p>
        Your thumbnail and title are the first thing a viewer judges. These tools help you study what works in your niche and check that your
        own thumbnail stays readable at the small sizes most people see it at.
      </p>
    </HubPage>
  );
}
