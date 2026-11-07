import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata(
  "keyword-tools",
  "YouTube keyword tools: research & difficulty",
  "Free YouTube keyword research: search suggestions, related and long-tail keywords, and a difficulty indicator based on who ranks.",
);

export default function Page() {
  return (
    <HubPage
      id="keyword-tools"
      heading="YouTube Keyword Tools"
      intro="Find what people search for on YouTube and how hard it is to rank for it."
    >
      <h2>A note on search volume</h2>
      <p>
        YouTube does not publish search volume. Where we show interest levels, they are relative indicators we derive ourselves, and they are
        labeled that way.
      </p>
    </HubPage>
  );
}
