export interface SiteConfig {
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  url: string;
  supportEmail: string;
  gameUrl?: string;
  heroVideoId?: string;
  social?: {
    discord?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  locales: readonly string[];
  defaultLocale: string;
}

export const siteConfig: SiteConfig = {
  name: "Digimon Alysion Wiki",
  shortName: "Digimon Alysion",
  logoText: "D",
  tagline: "Cards, Decks & Beginner Guides",
  description: "Explore Digimon Alysion with card lists, deck building strategies, character guides, battle mechanics, beginner tips, release updates, and mobile game news.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://digimonalysion.top",
  supportEmail: `support@${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://digimonalysion.top").hostname.replace(/^www\./, "")}`,
  gameUrl: "https://www.digimon-alysion.com/en/",
  heroVideoId: "hVOArd4R8PA", // Official Digimon Alysion promotion video
  social: {
    discord: "https://discord.gg/6yWJZwyy7T",
    youtube: "https://www.youtube.com/@digimontcgen",
  },
  locales: ["en", "es", "pt", "de", "fr"],
  defaultLocale: "en",
};
