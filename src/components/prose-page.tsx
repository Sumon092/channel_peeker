import type { ReactNode } from "react";
import { PageHero } from "./page-hero";

export function ProsePage({ title, path, updated, children }: { title: string; path: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, path }]} title={title} intro={updated ? `Last updated ${updated}` : undefined} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="prose-cp max-w-3xl">{children}</div>
      </div>
    </>
  );
}
