import { ChannelAgeChecker } from "@/app/(en)/channel-age-checker/channel-age-checker";
import { LocalizedToolPage, localizedMetadata } from "@/components/localized-tool-page";
import { content } from "@/locales/pages/ja/channel-age-checker";

const EN_PATH = "/channel-age-checker";
const LOCALE = "ja" as const;

export const metadata = localizedMetadata(LOCALE, EN_PATH, content);

export default function Page() {
  return (
    <LocalizedToolPage locale={LOCALE} enPath={EN_PATH} content={content} related={["/channel-analyzer", "/video-upload-date-checker", "/monetization-checker"]}>
      <ChannelAgeChecker />
    </LocalizedToolPage>
  );
}
