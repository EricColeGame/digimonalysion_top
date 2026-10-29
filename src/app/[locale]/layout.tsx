import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = siteConfig.url;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = `${siteUrl}/images/hero.webp`;
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  const title = "Digimon Alysion Wiki";
  const description = "Explore Digimon Alysion with card lists, deck building strategies, character guides, battle mechanics, beginner tips, release updates, and mobile game news.";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s" },
    description,
    manifest: "/manifest.json",
    applicationName: title,
    alternates: { canonical: `/${locale}`, languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}`])) },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: { capable: true, statusBarStyle: "black-translucent", title },
    openGraph: { type: "website", locale, url: `${siteUrl}/${locale}`, siteName: siteConfig.name, title, description, images: [{ url: image, width: 1200, height: 630, alt: "Digimon Alysion" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(adsenseId ? { other: { "google-adsense-account": adsenseId } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages({ locale });
  const sameAs = Object.values(siteConfig.social ?? {}).filter((url): url is string => Boolean(url));
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    "logo": { "@type": "ImageObject", url: `${siteUrl}/android-chrome-512x512.png`, width: 512, height: 512 },
    "image": { "@type": "ImageObject", url: `${siteUrl}/images/hero.webp`, width: 1200, height: 630 },
    sameAs,
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: siteConfig.supportEmail },
  };

  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {adsenseId && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
