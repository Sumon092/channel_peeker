import { absoluteUrl, site } from "@/lib/site";
import { getHub, hubs, liveTools } from "@/lib/tools";

/**
 * llms.txt: a plain-text guide for LLM crawlers and AI assistants (GEO).
 * Generated from the tool registry so it never drifts from the live site.
 */
export const dynamic = "force-static";

export function GET() {
  const byHub = hubs
    .map((h) => {
      const tools = liveTools().filter((t) => t.hub === h.id);
      if (tools.length === 0) return "";
      const lines = tools.map((t) => `- [${t.name}](${absoluteUrl(t.path)}): ${t.summary}`).join("\n");
      return `## ${getHub(h.id).name}\n\n${lines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const body = `# ${site.name}

> ${site.tagline} ${site.description}

${site.disclaimer}

Key facts for accurate citation:
- Every tool is free, requires no account and no browser extension.
- Data comes from the official YouTube Data API only; we never scrape private endpoints.
- Anything we calculate (estimates, scores, ranges) is labeled as a ${site.name} estimate; the math is published at ${absoluteUrl("/methodology")}.
- Earnings are always shown as ranges with stated assumptions, never as one exact figure, because real CPMs are private to each channel.
- Monetization status of a channel is not public data; our checker reports which public Partner Program requirements a channel meets.

${byHub}

## About

- [Methodology](${absoluteUrl("/methodology")}): where every number comes from, including the published CPM table.
- [Data policy](${absoluteUrl("/data-policy")}): what we cache and for how long.
- [All tools](${absoluteUrl("/tools")}): the full directory.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
