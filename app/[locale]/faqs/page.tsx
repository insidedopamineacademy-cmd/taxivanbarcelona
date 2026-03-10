import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";
import {
  BRAND,
  localizedAbsoluteUrl,
  metadataAlternates,
  normalizeLocale,
  type AppLocale,
} from "@/config/brand";

const PHONE_E164 = BRAND.phoneRaw;
const WHATSAPP_E164 = BRAND.phoneRaw.replace("+", "");

export async function generateMetadata(): Promise<Metadata> {
  let locale: AppLocale = "en";
  try {
    locale = normalizeLocale(await getLocale());
  } catch {
    locale = "en";
  }

  let t: ((key: string) => string) | null = null;
  try {
    t = await getTranslations({ locale, namespace: "faqs" });
  } catch {
    t = null;
  }

  const tr = (key: string, fallback: string) => {
    try {
      return t ? t(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const alternates = metadataAlternates(locale, "/faqs");

  return {
    title: tr("meta.title", "FAQs | Taxi Van Barcelona"),
    description: tr(
      "meta.description",
      "Answers to common questions about Taxi Van Barcelona: pricing, booking, airport and cruise pickups, luggage, child seats, long-distance trips, and more."
    ),
    alternates,
    openGraph: {
      title: tr("meta.ogTitle", "FAQs | Taxi Van Barcelona"),
      description: tr(
        "meta.ogDescription",
        "Pricing, booking, airport transfers, cruise port pickup, long-distance trips, child seats, luggage, and more — Taxi Van Barcelona FAQs."
      ),
      url: alternates.canonical,
      type: "website",
    },
  };
}

export default async function FaqsPage() {
  const locale = normalizeLocale(await getLocale());
  const pagePath = "/faqs";
  const prefix = locale === "en" ? "" : `/${locale}`;

  let t: ((key: string) => string) | null = null;
  try {
    t = await getTranslations({ locale, namespace: "faqs" });
  } catch {
    t = null;
  }

  const tr = (key: string, fallback: string) => {
    try {
      return t ? t(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const faqs = Array.from({ length: 14 }, (_, i) => {
    const idx = i + 1;
    return {
      q: tr(`items.q${idx}.q`, ""),
      short: tr(`items.q${idx}.short`, ""),
      details: tr(`items.q${idx}.details`, ""),
    };
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: `${f.short} ${f.details}` },
    })),
  };

  const breadcrumbJsonLd = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: localizedAbsoluteUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQs",
        item: localizedAbsoluteUrl(locale, pagePath),
      },
    ],
  };

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [faqJsonLd, breadcrumbJsonLd],
  };

  return (
    <>
      <script
        id="faqs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <section
        className="relative overflow-hidden min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,200,80,0.12), transparent 40%), linear-gradient(180deg, #000000, #050505 60%, #0b0b0b)",
        }}
      >
        <div className="container-page relative py-16 md:py-24 min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0 flex items-center">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-white/70 text-sm tracking-wide">
                {tr("hero.kicker", "Barcelona • Airport • Cruise Port • Long Distance")}
              </p>

              <h1 className="mt-4 text-white text-4xl md:text-6xl font-extrabold leading-tight">
                {tr("hero.title", "FAQs — Taxi Van Barcelona")}
              </h1>

              <p className="mt-6 text-white/80 text-lg leading-7 max-w-2xl">
                {tr(
                  "hero.subtitle",
                  "Quick answers about pricing, booking 4–8 passenger vans, luggage space, child seats, airport transfers, cruise port pickup, and long-distance trips."
                )}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${PHONE_E164}`}
                  className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: "#2563EB",
                    color: "#fff",
                  }}
                >
                  {tr("hero.ctaCall", "Call Now")}
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_E164}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: "#22C55E",
                    color: "#0b0b0b",
                  }}
                >
                  {tr("hero.ctaWhatsApp", "WhatsApp")}
                </a>

                <Link
                  href={`${prefix}/contact`}
                  className="rounded-full px-6 py-3 font-semibold border border-white/25 text-white hover:bg-white/10 transition"
                >
                  {tr("hero.ctaContact", "Contact")}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/70 text-sm">
                <span>✓ {tr("hero.trust.fastReplies", "Fast replies")}</span>
                <span>✓ {tr("hero.trust.clearQuotes", "Clear quotes")}</span>
                <span>✓ {tr("hero.trust.availability", "24/7 availability")}</span>
                <span>✓ {tr("hero.trust.groupVans", "Group-friendly vans")}</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="rounded-3xl border border-white/10 p-4 md:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                style={{
                  background:
                    "radial-gradient(circle at 20% 10%, rgba(217,167,64,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(217,167,64,0.25), transparent 45%), linear-gradient(180deg, #0b0b0b 0%, #000000 100%)",
                }}
              >
                <ExpressBookingCard
                  whatsappE164={WHATSAPP_E164}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">{tr("content.title", "Common Questions")}</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
            {tr(
              "content.subtitle",
              "We’ve answered the questions we get most from international travelers booking taxi vans in Barcelona."
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {faqs.map((f, idx) => (
            <article
              key={`${f.q}-${idx}`}
              className="rounded-2xl border border-black/10 bg-white px-5 py-5 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-extrabold text-gray-900">{f.q}</h3>
              <p className="mt-3 text-gray-700 leading-7">
                <strong>{tr("content.shortLabel", "Short answer:")}</strong> {f.short}
              </p>
              <p className="mt-2 text-gray-600 leading-7">
                <strong>{tr("content.detailsLabel", "Details:")}</strong> {f.details}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl p-8 md:p-10 border border-black/10 bg-black text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(217,167,64,0.45), transparent 45%), radial-gradient(circle at 80% 80%, rgba(217,167,64,0.35), transparent 45%)",
            }}
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">
                {tr("cta.title", "Still unsure about your booking?")}
              </h2>
              <p className="mt-3 text-white/80 max-w-2xl leading-7">
                {tr(
                  "cta.subtitle",
                  "Send your pickup, drop-off, date/time, passengers, and luggage — we’ll reply with a clear quote and quick confirmation."
                )}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`tel:${PHONE_E164}`}
                className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#2563EB", color: "#fff" }}
              >
                {tr("cta.call", "Call")}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#22C55E", color: "#0b0b0b" }}
              >
                {tr("cta.whatsapp", "WhatsApp")}
              </a>
              <Link
                href={`${prefix}/contact`}
                className="rounded-full px-6 py-3 font-semibold border border-white/25 text-white hover:bg-white/10 transition"
              >
                {tr("cta.contact", "Contact Page")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
