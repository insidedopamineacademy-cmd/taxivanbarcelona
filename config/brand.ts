export const SITE_URL = "https://taxivanbarcelona.com";

export const SUPPORTED_LOCALES = ["en", "es", "it", "de"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const BRAND = {
  name: "Taxi Van Barcelona",
  phoneDisplay: "+34 625 099 099",
  phoneRaw: "+34625099099",
  whatsappUrl: "https://wa.me/34625099099",
  email: "info@taxivanbarcelona.com",
  address: {
    street: "Av. Parallel 49",
    postalCode: "08001",
    city: "Barcelona",
    country: "Spain",
  },
  serviceArea: "Barcelona, Catalonia, Spain",
  fleetCapacity: "4–8 passengers",
  cancellationPolicy:
    "Free cancellation over 24 hours. 50% within 24h. Non-refundable within 3h.",
  childSeatPolicy: "Child seats available upon request.",
  pricingText: "Fixed pricing confirmed before travel.",
  operatingHours: "24/7",
} as const;

export function normalizeLocale(locale: string): AppLocale {
  const base = (locale || "").split("-")[0] as AppLocale;
  return SUPPORTED_LOCALES.includes(base) ? base : "en";
}

export function withLocalePath(locale: AppLocale, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

export function localizedAbsoluteUrl(locale: AppLocale, path: string): string {
  return absoluteUrl(withLocalePath(locale, path));
}

export function languageAlternates(path: string): Record<AppLocale, string> {
  return {
    en: localizedAbsoluteUrl("en", path),
    es: localizedAbsoluteUrl("es", path),
    it: localizedAbsoluteUrl("it", path),
    de: localizedAbsoluteUrl("de", path),
  };
}

export function metadataAlternates(locale: AppLocale, path: string) {
  return {
    canonical: localizedAbsoluteUrl(locale, path),
    languages: languageAlternates(path),
  };
}
