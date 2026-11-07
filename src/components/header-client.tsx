"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/i18n";
import { EN_CHROME } from "@/lib/widget-i18n";
import { CHROME_STRINGS } from "@/locales/widgets";
import { Logo } from "./logo";
import { ToolsMenu, type ToolsMenuGroup } from "./tools-menu";

/** Header markup; client-side so labels can follow the page's locale. */
export function HeaderClient({ groups }: { groups: ToolsMenuGroup[] }) {
  const locale = localeFromPathname(usePathname() ?? "/");
  const c = locale ? CHROME_STRINGS[locale] : EN_CHROME;

  const nav = [
    { href: "/methodology", label: c.methodology },
    { href: "/about", label: c.about },
    { href: "/contact", label: c.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label={c.homeAria}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 text-nav font-medium md:flex">
          <ToolsMenu groups={groups} label={c.tools} comingSoon={c.comingSoon} />
          {nav.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="rounded-full px-4 py-2 hover:bg-surface-2">
              {item.label}
            </Link>
          ))}
          <Link href="/tools" className="ml-3 rounded-full bg-text px-5 py-2 font-medium text-bg transition hover:opacity-85">
            {c.allFreeTools}
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-full p-2 hover:bg-surface-2 [&::-webkit-details-marker]:hidden" aria-label={c.openMenu}>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-surface p-2 shadow-menu">
            {[{ href: "/tools", label: c.allTools }, ...nav].map((item) => (
              <Link key={item.href} href={item.href} prefetch={false} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-surface-2">
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
