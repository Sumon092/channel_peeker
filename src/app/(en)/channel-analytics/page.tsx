import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata(
  "analytics",
  "YouTube channel & video analytics tools",
  "Free YouTube analytics: channel analyzer, video stats, channel comparison, monetization checker, outlier finder and more. Official data, no signup.",
);

export default function Page() {
  return (
    <HubPage
      id="analytics"
      heading="Channel & Video Analytics"
      intro="Stats, benchmarks and signals for any public channel or video — straight from the official YouTube API."
    >
      <h2>Numbers you can check</h2>
      <p>
        Every figure here is either YouTube&apos;s own public data or a clearly labeled channelpeeker estimate with the math published on the{" "}
        <a href="/methodology">methodology page</a>. What no tool can show — watch time, CTR, real revenue — we say so instead of guessing.
      </p>
    </HubPage>
  );
}
