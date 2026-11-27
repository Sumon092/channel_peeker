import { Fragment } from "react";
import type { LocalizedSection } from "@/lib/i18n";

function withLink(text: string, link: LocalizedSection["link"]) {
  const i = link ? text.indexOf(link.text) : -1;
  if (!link || i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.text}
      </a>
      {text.slice(i + link.text.length)}
    </>
  );
}

/** Renders `sections` from a localized content entry, matching the markup of the English meaning sections. */
export function LocalizedSections({ sections }: { sections?: LocalizedSection[] }) {
  return sections?.map((s) => (
    <Fragment key={s.heading}>
      <h3>{s.heading}</h3>
      {s.paragraphs?.map((p, i) => (
        <p key={p.slice(0, 24)}>{i === 0 ? withLink(p, s.link) : p}</p>
      ))}
      {s.table && (
        <table>
          <thead>
            <tr>
              {s.table.columns.map((col) => (
                <th key={col} scope="col">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.table.rows.map(([rowHead, ...cells]) => (
              <tr key={rowHead}>
                <th scope="row" className="font-normal">
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
      )}
    </Fragment>
  ));
}
