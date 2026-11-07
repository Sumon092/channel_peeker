import { ToolPage } from "@/components/tool-page";
import { hreflangFor, LABELS, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
import { content } from "@/locales/ja";
import { MonetizationChecker } from "@/app/monetization-checker/monetization-checker";

const EN_PATH = "/monetization-checker";
const LOCALE = "ja" as const;
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
      related={["/watch-time-calculator","/channel-analyzer","/revenue-calculator/channel-earnings-estimator"]}
      i18n={{ lang: LOCALE, labels: LABELS[LOCALE], path: localePath(LOCALE, EN_PATH) }}
    >
      <MonetizationChecker />
    </ToolPage>
  );
}
