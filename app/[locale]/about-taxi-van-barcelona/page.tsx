/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
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

  let t: any;
  try {
    t = await getTranslations({ locale, namespace: "aboutTaxiVanBarcelona" });
  } catch {
    t = null;
  }

  // next-intl strict mode: avoid throwing on missing keys
  const hasKey = (key: string) => {
    const anyT = t as unknown as { has?: (k: string) => boolean };
    return !!t && typeof anyT?.has === "function" ? anyT.has(key) : false;
  };

  const tt = (key: string, fallback: string) => {
    try {
      return hasKey(key) ? t(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const title = tt("meta.title", "About Taxi Van Barcelona – Group Transfers in Barcelona");
  const description = tt(
    "meta.description",
    "Meet Taxi Van Barcelona — providing taxi for airport and long-distance transfers with fixed pricing and 24/7 availability across Barcelona."
  );

  const alternates = metadataAlternates(locale, "/about-taxi-van-barcelona");
  return {
    title,
    description,
    alternates,
    openGraph: {
      title: tt("meta.ogTitle", title),
      description: tt("meta.ogDescription", description),
      url: alternates.canonical,
      type: "website",
    },
  };
}

export default async function AboutTaxiVanBarcelonaPage() {
  const locale = normalizeLocale(await getLocale());
  const pagePath = "/about-taxi-van-barcelona";
  const prefix = locale === "en" ? "" : `/${locale}`;

  let t: any;
  try {
    t = await getTranslations({ locale, namespace: "aboutTaxiVanBarcelona" });
  } catch {
    t = null;
  }

  // next-intl strict mode: avoid throwing on missing keys
  const hasKey = (key: string) => {
    const anyT = t as unknown as { has?: (k: string) => boolean };
    return !!t && typeof anyT?.has === "function" ? anyT.has(key) : false;
  };

  const tt = (key: string, fallback: string) => {
    try {
      return hasKey(key) ? t(key) : fallback;
    } catch {
      return fallback;
    }
  };

  const introBadgeText = (tt("hero.title", "About Taxi Van Barcelona") || "About Taxi Van Barcelona").toUpperCase();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
        name: "About Taxi Van Barcelona",
        item: localizedAbsoluteUrl(locale, pagePath),
      },
    ],
  };

  return (
    <>
      <script
        id="about-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        {/* soft gold corner accents + subtle vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1200px 600px at 15% 10%, rgba(223,178,77,.18), transparent 55%), radial-gradient(900px 500px at 90% 90%, rgba(223,178,77,.12), transparent 55%), linear-gradient(135deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 10%, transparent 10%), linear-gradient(315deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 10%, transparent 10%)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top, right bottom, left top, right bottom",
            backgroundSize: "auto, auto, 380px 380px, 380px 380px",
            opacity: 0.95,
          }}
        />

        <div className="container-page relative py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* copy */}
            <div className="lg:col-span-7">
              <p className="text-white/70 text-sm font-semibold tracking-wide">
                {tt("hero.kicker", "Barcelona • 4–8 seater vans • 24/7")}
              </p>

              <h1 className="mt-3 text-white text-4xl md:text-5xl font-extrabold leading-tight">
                {tt("hero.title", "About Taxi Van Barcelona")}
              </h1>

              <p className="mt-5 text-white/80 text-lg leading-7 max-w-2xl">
                {tt(
                  "hero.subtitle",
                  "We provide reliable, spacious taxi vans in Barcelona for tourists, families, and groups. Because comfort matters, we focus on clean vehicles, professional drivers, and clear communication—so every trip feels easy."
                )}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a className="btn btn-gold" href={`tel:${PHONE_E164}`}>
                  {tt("hero.ctaCall", "Call Now")}
                </a>
                <a
                  className="btn px-6 py-3 rounded-full border border-white/25 text-white hover:bg-white/10 font-semibold"
                  href={`https://wa.me/${WHATSAPP_E164}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tt("hero.ctaWhatsApp", "WhatsApp")}
                </a>
              </div>

              {/* quick trust bullets (kept lightweight + aligned) */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2 text-white/75 text-sm">
                <div className="flex items-center gap-2">
                  <span aria-hidden>✓</span>
                  <span>{tt("hero.trust.0", "Door-to-door transfers")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden>✓</span>
                  <span>{tt("hero.trust.1", "Luggage-friendly vans")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden>✓</span>
                  <span>{tt("hero.trust.2", "Friendly, professional drivers")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden>✓</span>
                  <span>{tt("hero.trust.3", "Fixed pricing on request")}</span>
                </div>
              </div>
            </div>

            {/* visual card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,.45)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/Barcelona-official-airport-taxi.webp"
                    alt={tt("hero.imageAlt", "Taxi Van Barcelona fleet of spacious vans in Barcelona")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    fetchPriority="high"
                    loading="eager"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.55) 85%)",
                    }}
                  />
                </div>

                <div className="p-5">
                  <p className="text-white font-extrabold">
                    {tt("hero.card.title", "Comfortable group travel, handled professionally")}
                  </p>
                  <p className="mt-2 text-white/75 text-sm leading-6">
                    {tt(
                      "hero.card.desc",
                      "Ideal for airport arrivals, cruise port timing, and longer routes across Catalonia—so you can relax while we drive."
                    )}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs rounded-full border border-white/15 px-3 py-1 text-white/80">
                      {tt("hero.card.tags.0", "Airport")}
                    </span>
                    <span className="text-xs rounded-full border border-white/15 px-3 py-1 text-white/80">
                      {tt("hero.card.tags.1", "Cruise Port")}
                    </span>
                    <span className="text-xs rounded-full border border-white/15 px-3 py-1 text-white/80">
                      {tt("hero.card.tags.2", "Long Distance")}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-white/55 italic">
                {tt("hero.caption", "Clean vans • smooth rides • clear communication")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GOLD TITLE BAR + INTRO */}
      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl px-6 py-4 text-center" style={{ backgroundColor: "rgb(223,178,77)" }}>
            <p className="text-white font-extrabold tracking-[0.25em] text-sm md:text-base">{introBadgeText}</p>
          </div>

          <h2 className="mt-10 text-center text-3xl md:text-4xl font-extrabold">
            {tt("story.title", "Why travelers choose us again and again")}
          </h2>

          <p className="mt-6 text-center text-gray-700 leading-7">
            {tt("story.p1", "We built Taxi Van Barcelona for people who value comfort and clarity.")}
          </p>
        </div>
      </section>

      {/* IMAGE + STORY */}
      <section className="container-page pb-16 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 shadow-sm">
              <Image
                src="/images/long-distance-travel-barcelona.webp"
                alt={tt("story.imageAlt", "Taxi Van Barcelona fleet of spacious vans in Barcelona")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
            <p className="mt-3 text-center text-xs text-gray-500 italic">
              {tt("story.imageCaption", "Spacious vans, clean interiors, and professional service")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold">{tt("story.title", "Why travelers choose us again and again")}</h3>

            <p className="mt-4 text-gray-700 leading-7">
              {tt(
                "story.p1",
                "We built Taxi Van Barcelona for people who value comfort and clarity. Therefore, we keep the process simple: you message or call, we confirm the ride details, and we arrive on time."
              )}
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              {tt(
                "story.p2",
                "In addition, we support international travelers, which means communication stays easy from the first message to the final drop-off."
              )}
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>{tt("story.bullets.0", "• Clean 4–8 seater vans with luggage space")}</li>
              <li>{tt("story.bullets.1", "• Friendly, professional drivers")}</li>
              <li>{tt("story.bullets.2", "• Door-to-door transfers across Barcelona and beyond")}</li>
              <li>{tt("story.bullets.3", "• 24/7 availability, including weekends and holidays")}</li>
              <li>{tt("story.bullets.4", "• Transparent pricing (fixed price available on request)")}</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${prefix}/airport-taxi-barcelona`}
                className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
              >
                {tt("story.ctaAirport", "Airport Taxi")}
              </Link>

              <Link
                href={`${prefix}/cruise-port-transfer-barcelona`}
                className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
              >
                {tt("story.ctaCruise", "Cruise Port Pickup")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="container-page pb-16 md:pb-20">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 shadow-sm">
          <h3 className="text-center text-2xl md:text-3xl font-extrabold">{tt("services.title", "What we do")}</h3>

          <p className="mt-4 text-center text-gray-700 leading-7">
            {tt("services.subtitle", "We specialize in practical, high-comfort transfers for real travel needs.")}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {[
              {
                title: tt("services.items.airport.title", "Airport Transfers"),
                desc: tt("services.items.airport.desc", "El Prat pickups and drop-offs, 24/7."),
              },
              {
                title: tt("services.items.cruise.title", "Cruise Port Pickup"),
                desc: tt("services.items.cruise.desc", "Direct rides to/from Barcelona Port."),
              },
              {
                title: tt("services.items.long.title", "Long-Distance Trips"),
                desc: tt("services.items.long.desc", "Comfortable vans for longer routes."),
              },
            ].map((x) => (
              <Link
                key={x.title}
                href={
                  x.title === tt("services.items.airport.title", "Airport Transfers")
                    ? `${prefix}/airport-taxi-barcelona`
                    : x.title === tt("services.items.cruise.title", "Cruise Port Pickup")
                    ? `${prefix}/cruise-port-transfer-barcelona`
                    : `${prefix}/long-distance-transfers`
                }
                className="w-full max-w-[340px]"
              >
                <div className="h-full rounded-2xl border border-black/10 bg-white p-6 text-center transition hover:shadow-md hover:-translate-y-0.5">
                  <p className="font-extrabold">{x.title}</p>
                  <p className="mt-2 text-gray-600 leading-7">{x.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="container-page pb-20">
        <div className="rounded-3xl bg-black p-8 md:p-12 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(223,178,77,.18), rgba(223,178,77,0))",
            }}
          />
          <div className="relative">
            <h3 className="text-white text-2xl md:text-3xl font-extrabold">{tt("cta.title", "Ready to book your ride?")}</h3>

            <p className="mt-3 text-white/80 leading-7 max-w-2xl mx-auto">
              {tt(
                "cta.subtitle",
                "Message us on WhatsApp or call directly. We’ll confirm details quickly, and then you can travel with confidence."
              )}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a className="btn btn-gold" href={`tel:${PHONE_E164}`}>
                {tt("cta.ctaCall", "Call Now")}
              </a>

              <a
                className="btn px-6 py-3 rounded-full border border-white/25 text-white hover:bg-white/10 font-semibold"
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {tt("cta.ctaWhatsApp", "WhatsApp")}
              </a>

              <Link
                href={`${prefix}/faqs`}
                className="btn px-6 py-3 rounded-full border border-white/25 text-white hover:bg-white/10 font-semibold"
              >
                {tt("cta.ctaFaqs", "FAQs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
