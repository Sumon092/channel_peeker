import type { Metadata } from "next";
import Link from "next/link";
import { RootShell, rootMetadata } from "@/components/root-shell";

/**
 * 404 for unmatched URLs. With one root layout per language there is no single layout
 * to compose a 404 from, so this renders the shared shell itself (same header, footer, CSS).
 */
export const metadata: Metadata = { ...rootMetadata, title: "Page not found" };

export default function GlobalNotFound() {
  return (
    <RootShell locale="en">
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/tools" className="mt-6 inline-block rounded-full bg-accent-fill px-6 py-3 font-medium text-white hover:bg-accent-fill-strong">
          Browse all tools
        </Link>
      </div>
    </RootShell>
  );
}
