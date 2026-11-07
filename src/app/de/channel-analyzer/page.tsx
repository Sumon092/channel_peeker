import { ToolPage } from "@/components/tool-page";
import { hreflangFor, LABELS, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { content } from "@/locales/de";
import { ChannelAnalyzer } from "@/app/channel-analyzer/channel-analyzer";

const EN_PATH = "/channel-analyzer";
const LOCALE = "de" as const;
const c = content[EN_PATH];
const tool = getTool(EN_PATH);

export const metadata = pageMetadata({
  title: c.title,
  description: c.description,
  path: localePath(LOCALE, EN_PATH),
  languages: hreflangFor(EN_PATH),
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      heading={c.heading}
      highlight={c.highlight}
      intro={c.intro}
      updated={c.updated}
      howTo={c.howTo}
      meaning={
        <>
          {c.meaning.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </>
      }
      faq={c.faq}
      dataBadge={c.dataBadge}
      related={["/channel-comparison","/outlier-finder","/monetization-checker"]}
      i18n={{ lang: LOCALE, labels: LABELS[LOCALE], path: localePath(LOCALE, EN_PATH) }}
    >
      <ChannelAnalyzer />
    </ToolPage>
  );
}
