import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { ProfilePictureDownloader } from "./profile-picture-downloader";

const tool = getTool("/thumbnail-tools/profile-picture-downloader");

export const metadata = pageMetadata({
  title: "YouTube Profile Picture Downloader",
  description:
    "View and save any YouTube channel's profile picture in full resolution — up to 800×800 pixels. Free, instant, official YouTube data.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="YouTube Profile Picture Downloader"
      intro="Get any channel's avatar in full resolution — not the tiny 88px version YouTube shows."
      updated="November 4, 2026"
      howTo={[
        "Paste the channel's @handle, URL, or any of its videos.",
        "Pick a size — small, medium, or the full 800px version.",
        "Open it and save with right-click (or long-press on mobile).",
      ]}
      meaning={
        <>
          <p>
            Channel avatars are served by Google&apos;s image CDN with the resolution encoded in the URL (<code>=s88</code>,{" "}
            <code>=s176</code>…). The original upload is stored large, so by requesting <code>=s800</code> we get the{" "}
            <strong>full-quality picture</strong> — the same file, no upscaling.
          </p>
          <p>
            Common uses: checking how your own avatar looks at full size, collages and fan content, or verifying a channel&apos;s branding.
            Respect the obvious: the picture belongs to its channel — don&apos;t use someone&apos;s avatar to impersonate them.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I see a YouTube profile picture in full size?",
          a: "Paste the channel here and open the 800px version. YouTube's pages show avatars at 88–176px, but the CDN serves the original at larger sizes.",
        },
        {
          q: "What's the maximum resolution?",
          a: "800×800 is what YouTube recommends for upload, so that's typically the ceiling. Avatars uploaded smaller will simply come back at their original size.",
        },
        {
          q: "Does the channel owner know I viewed it?",
          a: "No. Avatars are public images on Google's CDN; viewing them is like loading the channel page.",
        },
        {
          q: "Can I use someone's profile picture?",
          a: "It's their image — fine for personal reference or commentary contexts, not for impersonation or implying endorsement.",
        },
        {
          q: "Is this tool free?",
          a: "Yes — free, no account, one API lookup per channel.",
        },
      ]}
      related={["/thumbnail-tools/banner-downloader", "/thumbnail-tools/thumbnail-downloader", "/channel-analyzer"]}
    >
      <ProfilePictureDownloader />
    </ToolPage>
  );
}
