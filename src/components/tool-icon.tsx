import {
  Calculator,
  Captions,
  ChartColumnBig,
  Coins,
  Columns2,
  DollarSign,
  FileText,
  Gauge,
  GitCompareArrows,
  Handshake,
  Hash,
  IdCard,
  ImageDown,
  KeyRound,
  ListOrdered,
  MonitorPlay,
  Ruler,
  ScanEye,
  ScrollText,
  Search,
  Signal,
  Smartphone,
  Sparkles,
  Tag,
  Tags,
  TrendingUp,
  Type,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import type { HubId } from "@/lib/tools";

const icons: Record<string, LucideIcon> = {
  "/channel-analyzer": ChartColumnBig,
  "/video-analyzer": MonitorPlay,
  "/channel-comparison": GitCompareArrows,
  "/channel-id-finder": IdCard,
  "/outlier-finder": TrendingUp,
  "/thumbnail-tools/thumbnail-downloader": ImageDown,
  "/thumbnail-tools/thumbnail-tester": ScanEye,
  "/thumbnail-tools/thumbnail-size-checker": Ruler,
  "/thumbnail-tools/thumbnail-a-b-preview": Columns2,
  "/seo-tools/tag-extractor": Tags,
  "/seo-tools/tag-generator": Tag,
  "/seo-tools/title-generator": WandSparkles,
  "/seo-tools/title-checker": Type,
  "/seo-tools/description-generator": FileText,
  "/seo-tools/hashtag-generator": Hash,
  "/seo-tools/video-seo-score": Gauge,
  "/revenue-calculator": DollarSign,
  "/revenue-calculator/shorts-revenue-calculator": Smartphone,
  "/revenue-calculator/channel-earnings-estimator": Coins,
  "/revenue-calculator/sponsorship-rate-calculator": Handshake,
  "/revenue-calculator/rpm-cpm-calculator": Calculator,
  "/transcript-tools/transcript-extractor": Captions,
  "/transcript-tools/transcript-summarizer": Sparkles,
  "/transcript-tools/timestamp-generator": ListOrdered,
  "/keyword-tools/keyword-research": Search,
  "/keyword-tools/keyword-difficulty": Signal,
  "/keyword-tools/related-keywords": KeyRound,
  "/keyword-tools/long-tail-finder": ScrollText,
};

const sizes = {
  sm: ["h-8 w-8 rounded-lg", "h-4 w-4"],
  md: ["h-11 w-11 rounded-xl", "h-5 w-5"],
  lg: ["h-14 w-14 rounded-2xl", "h-7 w-7"],
} as const;

/** One consistent style everywhere: red icon on a soft red tile. `solid` for emphasis. */
export function ToolIcon({ path, size = "md", solid = false }: { path: string; hub?: HubId; size?: keyof typeof sizes; solid?: boolean }) {
  const Icon = icons[path] ?? Sparkles;
  const [box, glyph] = sizes[size];
  const tone = solid ? "bg-accent text-white shadow-sm shadow-accent/30" : "bg-accent-soft text-accent";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${box} ${tone}`}>
      <Icon className={glyph} aria-hidden="true" strokeWidth={2.2} />
    </span>
  );
}
