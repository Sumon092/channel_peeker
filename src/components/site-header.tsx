import { Menu } from "lucide-react";
import Link from "next/link";
import { hubs, toolsInHub } from "@/lib/tools";
import { Logo } from "./logo";
import { ToolsMenu } from "./tools-menu";

const nav = [
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Rendered on every page, so it is kept deliberately light: no icons in the menu,
 * no backdrop blur, and unbuilt tools collapsed into a count.
 */
export function SiteHeader() {
  const groups = hubs.map((hub) => {
    const all = toolsInHub(hub.id);
    return { hub, live: all.filter((t) => t.status === "live"), soon: all.filter((t) => t.status !== "live").length };
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="channelpeek home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 text-nav font-medium md:flex">
          <ToolsMenu
            groups={groups.map(({ hub, live, soon }) => ({
              name: hub.name,
              items: live.map((t) => ({ name: t.name, path: t.path })),
              soon,
            }))}
          />
          {nav.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="rounded-full px-4 py-2 hover:bg-surface-2">
              {item.label}
            </Link>
          ))}
          <Link href="/tools" className="ml-3 rounded-full bg-text px-5 py-2 font-medium text-bg transition hover:opacity-85">
            All free tools
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-full p-2 hover:bg-surface-2 [&::-webkit-details-marker]:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-surface p-2 shadow-menu">
            {[{ href: "/tools", label: "All tools" }, ...nav].map((item) => (
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
