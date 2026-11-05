import Link from "next/link";
import { hubs } from "@/lib/tools";
import { site } from "@/lib/site";
import { Logo } from "./logo";

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/methodology", label: "Methodology" },
  { href: "/changelog", label: "Changelog" },
];

const legal = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/data-policy", label: "Data policy" },
];

export function SiteFooter() {
  const hubLinks = hubs.filter((h) => h.path).map((h) => ({ href: h.path as string, label: h.name }));

  return (
    <footer className="mt-auto bg-ink text-sm text-ink-text">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-lg" />
          <p className="mt-4 max-w-xs leading-relaxed text-ink-muted">{site.tagline}</p>
        </div>
        <FooterList title="Tools" items={[{ href: "/tools", label: "All tools" }, ...hubLinks]} />
        <FooterList title="Company" items={company} />
        <FooterList title="Legal" items={legal} />
      </div>
      <div className="border-t border-ink-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-ink-muted">
          {site.disclaimer} YouTube is a trademark of Google LLC. © {new Date().getFullYear()} {site.name}.
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
