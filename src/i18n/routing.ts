import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ja", "ko", "es"] as const;
export type Locale = (typeof locales)[number];

const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});
