import { MonetizationChecker } from "@/app/(en)/monetization-checker/monetization-checker";
import { LocalizedToolPage, localizedMetadata } from "@/components/localized-tool-page";
import { content } from "@/locales/pages/es/monetization-checker";

const EN_PATH = "/monetization-checker";
const LOCALE = "es" as const;

export const metadata = localizedMetadata(LOCALE, EN_PATH, content);

export default function Page() {
  return (
    <LocalizedToolPage locale={LOCALE} enPath={EN_PATH} content={content} related={["/watch-time-calculator", "/channel-analyzer", "/revenue-calculator/channel-earnings-estimator"]}>
      <MonetizationChecker />
    </LocalizedToolPage>
  );
}
