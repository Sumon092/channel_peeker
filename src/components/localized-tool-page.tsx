import Link from "next/link";
import type { ReactNode } from "react";
import { ToolPage } from "@/components/tool-page";
import { hreflangFor, isLocalizedTool, LABELS, localePath, type Locale } from "@/lib/i18n";
import type { Block, LocalizedPageContent, PageSection } from "@/lib/localized-page";
import { pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const INLINE = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** **bold** and [text](href) → JSX. Internal links use next/link, external ones open in a new tab. */
export function rich(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${m.index}`;
    if (m[1] !== undefined) out.push(<strong key={key}>{m[1]}</strong>);
    else {
      const [label, href] = [m[2], m[3]];
      if (/^https?:\/\//.test(href))
        out.push(
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>,
        );
      else if (href.startsWith("#"))
        out.push(
          <a key={key} href={href}>
            {label}
          </a>,
        );
      else
        out.push(
          <Link key={key} href={href}>
            {label}
          </Link>,
        );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : <>{out}</>;
}

/** Plain text of a rich string (for keys and schema). */
export const plain = (text: string) => text.replace(INLINE, (_, b, l) => b ?? l);

function BlockView({ block }: { block: Block }) {
  if ("p" in block) return <p>{rich(block.p)}</p>;
  if ("h3" in block) return <h3>{block.h3}</h3>;
  if ("formula" in block) return <p className="rounded-xl bg-surface-2 px-4 py-3 font-semibold">{block.formula}</p>;
  if ("ul" in block)
    return (
      <ul>
        {block.ul.map((li) => (
          <li key={plain(li).slice(0, 40)}>{rich(li)}</li>
        ))}
      </ul>
    );
  if ("ol" in block)
    return (
      <ol>
        {block.ol.map((li) => (
          <li key={plain(li).slice(0, 40)}>{rich(li)}</li>
        ))}
      </ol>
    );
  const t = block.table;
  return (
    <table>
      {t.caption && <caption className="caption-bottom pt-2 text-left text-sm text-muted">{t.caption}</caption>}
      <thead>
        <tr>
          {t.head.map((h, i) => (t.corner && i === 0 ? <td key="corner" /> : <th key={h} scope="col">{h}</th>))}
        </tr>
      </thead>
      <tbody>
        {t.rows.map(([rowHead, ...cells]) => (
          <tr key={rowHead}>
            <th scope="row" className={t.corner ? undefined : "font-normal"}>
              {rowHead}
            </th>
            {cells.map((cell, i) => (
              <td key={i} className="tabular-nums">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </>
  );
}

const section = (s: PageSection) => ({ eyebrow: s.eyebrow, title: s.title, id: s.id, content: <Blocks blocks={s.blocks} /> });

export function localizedMetadata(locale: Locale, enPath: string, c: LocalizedPageContent) {
  // hreflang only once the tool is in LOCALIZED_TOOLS (i.e. every language's page exists).
  const languages = isLocalizedTool(enPath) ? hreflangFor(enPath) : undefined;
  return pageMetadata({ title: c.title, description: c.description, path: localePath(locale, enPath), languages });
}

/** A translated tool page with the same layout as its English page. */
export function LocalizedToolPage(props: { locale: Locale; enPath: string; content: LocalizedPageContent; related: string[]; children: ReactNode }) {
  const { locale, enPath, content: c, related, children } = props;
  return (
    <ToolPage
      tool={getTool(enPath)}
      heading={c.heading}
      highlight={c.highlight}
      intro={c.intro}
      updated={c.updated}
      dataBadge={c.dataBadge}
      afterTool={c.afterTool ? <Blocks blocks={c.afterTool} /> : undefined}
      howTo={c.howTo.map((s) => rich(s))}
      howToTip={c.howToTip}
      resultSection={c.before?.map(section)}
      meaningHeading={c.meaning.heading}
      meaningId={c.meaning.id}
      meaning={<Blocks blocks={c.meaning.blocks} />}
      extraSection={c.after?.map(section)}
      faq={c.faq}
      related={related}
      i18n={{ lang: locale, labels: LABELS[locale], path: localePath(locale, enPath) }}
    >
      {children}
    </ToolPage>
  );
}
