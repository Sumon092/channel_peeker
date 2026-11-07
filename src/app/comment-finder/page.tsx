import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { CommentFinder } from "./comment-finder";

const tool = getTool("/comment-finder");

export const metadata = pageMetadata({
  title: "YouTube Comment Finder: search comments on any video",
  description:
    "Search the comments of any YouTube video for a word, name or phrase. Sort by top or newest, and export matches to CSV. Free, official YouTube data.",
  path: tool.path,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading="Comment Finder"
      intro="Search inside the comments of any video — find a specific comment, every mention of a word, or your own comment on a busy upload."
      updated="November 7, 2026"
      howTo={[
        "Paste any video or Shorts link.",
        "Optionally add a search word, name or phrase.",
        "Browse matching top-level comments, sorted by top or newest, and download them as CSV.",
      ]}
      meaning={
        <>
          <p>
            YouTube&apos;s own comment search is limited — on most devices you can only scroll. This tool asks the official API to{" "}
            <strong>filter a video&apos;s comments by your search terms</strong>, so you can find a half-remembered comment, check what
            people say about a topic, or pull quotes for research.
          </p>
          <p>
            We show up to 100 top-level comment threads per search (reply threads are counted but not expanded). Matching is done by
            YouTube itself. Without a search, &quot;Top comments&quot; uses YouTube&apos;s own ranking; with a search, we order the
            matches by likes. &quot;Newest first&quot; is strictly chronological either way.
          </p>
        </>
      }
      faq={[
        {
          q: "How do I find a specific comment on a YouTube video?",
          a: "Paste the video link here and type a word or phrase you remember from the comment. We ask the official YouTube API to return only comments matching your search.",
        },
        {
          q: "Can I find my own comment?",
          a: "Yes — search for your channel name or a distinctive phrase from your comment. Note that YouTube returns top-level comments; a reply inside a thread won't appear on its own.",
        },
        {
          q: "Why do I see at most 100 comments?",
          a: "We fetch one page of up to 100 top-level threads per search. On busy videos, narrow the search terms to find what you need within that page.",
        },
        {
          q: "Can I export the comments?",
          a: "Yes — download the matches as a CSV with author, text, likes, reply count and date.",
        },
        {
          q: "Why does it say comments are turned off?",
          a: "If a creator disables comments (or the video is made for kids), YouTube's API returns no comment data, and we say so instead of guessing.",
        },
      ]}
      related={["/video-analyzer", "/video-upload-date-checker", "/channel-analyzer"]}
    >
      <CommentFinder />
    </ToolPage>
  );
}
