import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/tools" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-medium text-white hover:bg-accent-strong">
        Browse all tools
      </Link>
    </div>
  );
}
