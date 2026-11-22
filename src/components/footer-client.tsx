"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import type { ChromeStrings } from "@/lib/widget-i18n";
import { Logo } from "./logo";

/** Footer markup; labels arrive already localized from SiteFooter. */
export function FooterClient({ hubLinks, year, c }: { hubLinks: { href: string; label: string }[]; year: number; c: ChromeStrings }) {

  const company = [
    { href: "/about", label: c.about },
    { href: "/contact", label: c.contact },
    { href: "/methodology", label: c.methodology },
    { href: "/changelog", label: c.changelog },
  ];

  const legal = [
    { href: "/privacy-policy", label: c.privacy },
    { href: "/terms", label: c.terms },
    { href: "/cookie-policy", label: c.cookies },
    { href: "/data-policy", label: c.dataPolicy },
  ];

  return (
    <footer className="mt-auto bg-ink text-sm text-ink-text">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-lg" gid="cp-gf" />
          <p className="mt-4 max-w-xs leading-relaxed text-ink-muted">{c.tagline}</p>
        </div>
        <FooterList title={c.footerTools} items={[{ href: "/tools", label: c.allTools }, ...hubLinks]} />
        <FooterList title={c.footerCompany} items={company} />
        <FooterList title={c.footerLegal} items={legal} />
      </div>
      <div className="border-t border-ink-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-ink-muted">
          {c.disclaimer} {c.trademark} © {year} {site.name}.
        </p>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-ink-muted hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
