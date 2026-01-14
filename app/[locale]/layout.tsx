import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

// Critical: Disable all caching to prevent stale translations
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const SUPPORTED_LOCALES = ["en", "es", "it", "de"] as const;
type AppLocale = (typeof SUPPORTED_LOCALES)[number];

function isLocale(value: string): value is AppLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

// This tells Next.js which locale routes to generate
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Next.js App Router provides dynamic route params as a Promise
  const { locale: rawLocale } = await params;
  
  // Normalize locale (handles variants like "en-US" -> "en")
  const base = (rawLocale || "").split("-")[0];
  
  // If the normalized locale is not in our supported list, show 404
  if (!isLocale(base)) {
    notFound();
  }

  const locale: AppLocale = base;

  // Tell next-intl which locale to use for this request
  setRequestLocale(locale);
  
  // Load messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}