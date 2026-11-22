import { RootShell, rootMetadata, rootViewport } from "@/components/root-shell";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function LocaleRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="ja">{children}</RootShell>;
}
