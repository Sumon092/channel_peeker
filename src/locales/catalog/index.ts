import type { Catalog } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { catalog as de } from "./de";
import { catalog as es } from "./es";
import { catalog as fr } from "./fr";
import { catalog as ja } from "./ja";
import { catalog as ko } from "./ko";
import { catalog as pt } from "./pt";

export const CATALOGS: Record<Locale, Catalog> = { de, ja, fr, ko, es, pt };
