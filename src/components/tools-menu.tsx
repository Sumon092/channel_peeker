"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export interface ToolsMenuGroup {
  name: string;
  items: { name: string; path: string }[];
  soon: number;
}

/** The header's Tools dropdown: hover/focus-driven like before, but with real open state so aria-expanded is announced (DESIGN.md fix 3). */
export function ToolsMenu({ groups }: { groups: ToolsMenuGroup[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <Link ref={triggerRef} href="/tools" aria-expanded={open} className="flex items-center gap-1 rounded-full px-4 py-2 hover:bg-surface-2">
        Tools <ChevronDown className={`h-4 w-4 text-muted transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </Link>
      <div className={`absolute left-1/2 top-full w-170 -translate-x-1/2 pt-3 transition duration-150 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 rounded-2xl border border-border bg-surface p-6 shadow-menu">
          {groups.map((group) => (
            <div key={group.name}>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{group.name}</p>
              <ul className="mt-2 space-y-1">
                {group.items.map((t) => (
                  <li key={t.path}>
                    <Link href={t.path} prefetch={false} className="block py-0.5 hover:text-accent">
                      {t.name}
                    </Link>
                  </li>
                ))}
                {group.soon > 0 && <li className="py-0.5 text-sm font-normal text-muted">+{group.soon} coming soon</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
