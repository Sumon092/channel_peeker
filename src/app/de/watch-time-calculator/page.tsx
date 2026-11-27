import { WatchTimeCalculator } from "@/app/(en)/watch-time-calculator/watch-time-calculator";
import { LocalizedToolPage, localizedMetadata } from "@/components/localized-tool-page";
import { content } from "@/locales/pages/de/watch-time-calculator";

const EN_PATH = "/watch-time-calculator";
const LOCALE = "de" as const;

export const metadata = localizedMetadata(LOCALE, EN_PATH, content);

export default function Page() {
  return (
    <LocalizedToolPage locale={LOCALE} enPath={EN_PATH} content={content} related={["/monetization-checker", "/channel-analyzer", "/revenue-calculator"]}>
      <WatchTimeCalculator />
    </LocalizedToolPage>
  );
}
