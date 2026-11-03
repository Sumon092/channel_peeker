import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "./json-ld";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const [base, hover, current] =
    tone === "dark" ? ["text-ink-muted", "hover:text-white", "text-white"] : ["text-muted", "hover:text-text", "text-text"];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${base}`}>
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className={`font-medium ${current}`}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className={hover}>
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.path),
          })),
        }}
      />
    </>
  );
}
