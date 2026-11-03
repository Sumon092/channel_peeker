import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Compact header for hub, directory and content pages. */
export function PageHero({ crumbs, title, intro, children }: { crumbs: Crumb[]; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="hero-surface border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-8 max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
