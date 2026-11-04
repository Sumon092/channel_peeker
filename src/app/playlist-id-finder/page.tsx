import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { PlaylistIdFinder } from "./playlist-id-finder";

const tool = getTool("/playlist-id-finder");

export const metadata = pageMetadata({
  title: "YouTube Playlist ID Finder: extract the list ID",
  description:
    "Get the playlist ID from any YouTube playlist link — including videos opened from a playlist. Plus a clean shareable playlist URL. Free, in-browser.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Playlist ID Finder"
      intro="Paste a playlist link — or any video playing inside one — and get the playlist ID plus a clean shareable URL."
      updated="November 4, 2026"
      howTo={[
        "Paste a playlist URL, or a watch URL that contains &list=.",
        "The playlist ID appears instantly, parsed in your browser.",
        "Copy the ID for API use, or the clean playlist URL for sharing.",
      ]}
      meaning={
        <>
          <p>
            A playlist ID is the value of the <code>list=</code> parameter — usually starting with <code>PL</code> (manual playlists),{" "}
            <code>UU</code> (a channel&apos;s uploads), <code>LL</code> (liked videos) or <code>RD</code> (mixes). The clean URL we build
            drops everything else — the video, timestamp and tracking parameters — so you share the playlist itself.
          </p>
          <p>
            Developers need the ID for the API&apos;s <code>playlistItems</code> calls and playlist embeds; everyone else mostly wants the
            clean link. Both are one click here.
          </p>
        </>
      }
      faq={[
        {
          q: "Where is the playlist ID in a YouTube URL?",
          a: "It's the list= parameter: youtube.com/playlist?list=PLxxxx. On a video opened from a playlist, it's buried among other parameters — this tool pulls it out.",
        },
        {
          q: "What do the ID prefixes mean?",
          a: "PL = a normal playlist, UU = a channel's all-uploads playlist, LL = liked videos, FL = favorites, RD = an auto-generated mix. Mixes (RD) are personal and may not open for others.",
        },
        {
          q: "Can I embed a whole playlist?",
          a: "Yes — use the ID in youtube.com/embed/videoseries?list=YOUR_ID, or grab the code from our Embed Code Generator with a playlist-video link.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, instant, fully in your browser.",
        },
      ]}
      related={["/video-id-extractor", "/channel-id-finder", "/embed-code-generator"]}
    >
      <PlaylistIdFinder />
    </ToolPage>
  );
}
