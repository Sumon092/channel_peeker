import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata(
  "transcript-tools",
  "YouTube transcript tools: text, summaries and chapters",
  "Turn YouTube captions into text, TXT/SRT/VTT files, AI summaries and chapter timestamps.",
);

export default function Page() {
  return (
    <HubPage
      id="transcript-tools"
      heading="YouTube Transcript Tools"
      intro="Turn captions into readable text, summaries and chapter timestamps."
    />
  );
}
