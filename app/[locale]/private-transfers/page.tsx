/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";
import { getLocale, getTranslations } from "next-intl/server";
import {
  BRAND,
  localizedAbsoluteUrl,
  metadataAlternates,
  normalizeLocale,
  type AppLocale,
} from "@/config/brand";

const WHATSAPP_E164 = BRAND.phoneRaw.replace("+", "");
const PHONE_E164 = BRAND.phoneRaw;

export async function generateMetadata(): Promise<Metadata> {
  let locale: AppLocale = "en";
  try {
    locale = normalizeLocale(await getLocale());
  } catch {
    locale = "en";
  }

  let t: any;
  try {
    t = await getTranslations({ locale, namespace: "privateTransfers" });
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

  const title = tr(
    "meta.title",
    "Private Transfers Barcelona | Premium Chauffeur Service (E-Class, V-Class, 5 Series, Tesla)"
  );
  const description = tr(
    "meta.description",
    "Premium private transfers in Barcelona with executive vehicles and luxury vans. Ideal for MWC / Fira Gran Via conferences, corporate travel, weddings, and VIP events. Book fast on WhatsApp."
  );

  const alternates = metadataAlternates(locale, "/private-transfers");
  return {
    title,
    description,
    alternates,
    openGraph: {
      title: tr("meta.ogTitle", "Private Transfers Barcelona | Premium Chauffeur Service"),
      description: tr(
        "meta.ogDescription",
        "Executive private transfers for conferences (MWC / Fira Gran Via), business, and VIP events in Barcelona."
      ),
      url: alternates.canonical,
      type: "website",
    },
  };
}

export default async function PrivateTransfersPage() {
  const locale = normalizeLocale(await getLocale());
  const pagePath = "/private-transfers";
  const prefix = locale === "en" ? "" : `/${locale}`;

  let t: any;
  try {
    t = await getTranslations({ locale, namespace: "privateTransfers" });
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
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${BRAND.name} Private Transfers`,
    serviceType: "Private executive and chauffeur transfers",
    provider: { "@id": "https://taxivanbarcelona.com/#localbusiness" },
    areaServed: "Barcelona",
    availableChannel: [
      {
        "@type": "ServiceChannel",
        name: "Online booking",
        serviceUrl: "https://taxivanbarcelona.com/contact",
      },
      {
        "@type": "ServiceChannel",
        name: "Telephone",
        telephone: PHONE_E164,
      },
      {
        "@type": "ServiceChannel",
        name: "WhatsApp",
        serviceUrl: BRAND.whatsappUrl,
      },
    ],
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
        name: "Private Transfers",
        item: localizedAbsoluteUrl(locale, pagePath),
      },
    ],
  };
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [serviceJsonLd, breadcrumbJsonLd],
  };

  return (
    <>
      <script
        id="private-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      {/* HERO — Premium Black + Neon Blue */}
      <section className="neo-hero">
        <div className="neo-hero__glow" aria-hidden />
        <div className="neo-hero__grid" aria-hidden />
        <div className="container-page neo-hero__inner">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="order-1 lg:order-none lg:col-span-7">
              <p className="neo-kicker">
                {tr("hero.kicker", "Barcelona • Chauffeur-driven • Executive & VIP")}
              </p>

              <h1 className="neo-title">
                {tr("hero.title", "Premium Private Transfers in Barcelona")}
                <span className="neo-title__accent">
                  {tr("hero.titleAccent", " — for VIP travel, events & private tours")}
                </span>
              </h1>
            </div>

            {/* Right: Express Booking */}
            <div className="order-2 lg:order-none lg:col-span-5">
              <ExpressBookingCard
                whatsappE164={WHATSAPP_E164}
                className="neo-card neo-card--booking"
              />
            </div>
            {/* Subtitle (below form on mobile, aligns with left column on desktop) */}
            <div className="order-3 lg:order-none lg:col-span-7 lg:col-start-1">
              <p className="neo-subtitle">
                {tr(
                  "hero.subtitle",
                  "Premium chauffeur-driven transfers for conferences, VIP travel, private events, airport pickups, and city rides. Ideal for business clients and private individuals who value comfort and discretion."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Mid wrapper */}
      <div className="page-mid">
        {/* When to choose + Services (combined) */}
        <section className="container-page py-14 md:py-20">
          <div className="neo-panel">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {tr("when.title", "When to Choose Private Transfers")}
              </h2>
              <p className="mt-4 text-gray-600 max-w-4xl mx-auto leading-7">
                {tr(
                  "when.subtitle",
                  "Designed for moments when comfort, timing, and presentation matter — for business clients and private travelers alike."
                )}
              </p>
            </div>

            <div className="mt-10">
  {/* Unified use-cases + services (single aligned grid) */}
  <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
    {[
      { key: "mwc", title: tr("when.cards.mwc.title", "MWC / Fira Gran Via Conferences"), desc: tr("when.cards.mwc.desc", "Arrive on time between meetings, hotels, and venue entrances — without stress or delays.") },
      { key: "corporate", title: tr("when.cards.corporate.title", "Corporate & Executive Travel"), desc: tr("when.cards.corporate.desc", "Professional service for client pickups, business dinners, and airport connections.") },
      { key: "hourly", title: tr("when.cards.hourly.title", "Hourly Chauffeur (Standby)"), desc: tr("when.cards.hourly.desc", "Ideal for multi-stop schedules, shopping, meetings, and flexible city travel.") },
      { key: "tours", title: tr("when.cards.tours.title", "Private Tours & Day Trips"), desc: tr("when.cards.tours.desc", "Comfortable sightseeing to Montserrat, Sitges, Costa Brava, and more.") },
      { key: "airport", title: tr("when.cards.airport.title", "Airport Transfers (T1 / T2)"), desc: tr("when.cards.airport.desc", "Meet & greet available with smooth hotel transfers and optional flight coordination.") },
      { key: "aviation", title: tr("when.cards.aviation.title", "Private Aviation / FBO Transfers"), desc: tr("when.cards.aviation.desc", "Discreet transfers for private flights and VIP airport terminals.") },
      { key: "weddings", title: tr("when.cards.weddings.title", "Weddings & Special Events"), desc: tr("when.cards.weddings.desc", "Premium arrivals and guest transport coordination with discreet chauffeur support.") },
      { key: "business", title: tr("when.cards.business.title", "Business & Conferences"), desc: tr("when.cards.business.desc", "Hotel ↔ venue transfers with professional presentation and tight timing.") },
      {
        key: "custom",
        title: tr("when.cards.custom.title", "Long Distance & Custom Routes"),
        desc: tr("when.cards.custom.desc", "Door-to-door city transfers and tailor-made intercity routes with flexible stops."),
        extra: [
          tr("when.cards.custom.extra1", "Long distance transfers"),
          tr("when.cards.custom.extra2", "Custom intercity routes"),
          tr("when.cards.custom.extra3", "Cross-border trips (e.g., Andorra / South of France)"),
          tr("when.cards.custom.extra4", "Flexible stops on request"),
        ],
      },
    ].map((item) => (
      <div
        key={item.key}
        className="rounded-2xl border border-black/10 bg-white/70 px-5 py-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(2,6,23,0.10)]"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 rounded-xl bg-[rgba(34,197,94,0.12)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20 6 9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="text-lg font-extrabold leading-snug">{item.title}</div>
            <div className="mt-1 text-gray-600 leading-7">{item.desc}</div>

            {"extra" in item && Array.isArray(item.extra) && item.extra.length > 0 ? (
              <ul className="mt-3 grid gap-1 text-gray-600">
                {item.extra.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/35" aria-hidden />
                    <span className="leading-6">{x}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    ))}
  </div>

</div>
          </div>
        </section>

        {/* Fleet */}
        <section className="container-page pb-14 md:pb-20">
          <div className="neo-fleet">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {tr("fleet.title", "Premium Fleet Options")}
              </h2>
              <p className="mt-4 text-gray-600 max-w-4xl mx-auto leading-7">
                {tr("fleet.subtitle", "Executive sedans, luxury vans, and an eco option—choose what fits your trip.")}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Mercedes E-Class",
                  tag: tr("fleet.tags.executiveSedan", "Executive Sedan"),
                  img: "/images/private/mercedes-e-class.webp",
                },
                {
                  title: "Mercedes V-Class",
                  tag: tr("fleet.tags.luxuryVan", "Luxury Van"),
                  img: "/images/private/mercedes-v-class.webp",
                },
                {
                  title: "BMW 5 Series",
                  tag: tr("fleet.tags.businessClass", "Business Class"),
                  img: "/images/private/bmw-5-series.webp",
                },
                {
                  title: "Eco Transfer — Tesla",
                  tag: tr("fleet.tags.ecoModel", "Model 3 / Model S"),
                  img: "/images/private/tesla-model.webp",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="neo-vehicle"
                >
                  <div className="neo-vehicle__img">
                    <Image
                      src={v.img}
                      alt={`${v.title} private transfer Barcelona`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                  <div className="neo-vehicle__body">
                    <div className="neo-vehicle__tag">{v.tag}</div>
                    <div className="neo-vehicle__title">{v.title}</div>
                    <div className="neo-vehicle__meta">
                      {tr("fleet.meta", "Chauffeur • Comfort • Discreet service")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={`${prefix}/contact`}
                className="neo-btn neo-btn--primary !text-black"
              >
                {tr("fleet.cta", "Contact us for a custom quotation")}
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="container-page pb-14 md:pb-20">
          <div className="rounded-[28px] border border-black/10 bg-white px-4 py-8 md:px-8 md:py-10 shadow-[0_18px_60px_rgba(2,6,23,0.08)]">
            <div className="neo-panel h-full !bg-[rgba(2,6,23,0.82)] !text-white !border-[rgba(217,167,64,0.55)] border backdrop-blur-md">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                {/* Left: content */}
                <div className="lg:col-span-7">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                    {tr("highlights.title", "What You Get with Premium Private Transfers")}
                  </h2>
                  <p className="mt-4 text-white/80 leading-7">
                    {tr("highlights.subtitle", "This page is designed for business travelers and VIP guests who need a higher standard than regular taxi service.")}
                  </p>

                  <ul className="mt-6 grid gap-3 md:grid-cols-2 text-white/80">
                    {[
                      tr("highlights.bullets.0", "Professional, discreet chauffeur"),
                      tr("highlights.bullets.1", "High comfort vehicles"),
                      tr("highlights.bullets.2", "Meet & greet on request"),
                      tr("highlights.bullets.3", "Fixed pricing on request"),
                      tr("highlights.bullets.4", "Airport / venue coordination"),
                      tr("highlights.bullets.5", "Clean, premium interior"),
                    ].map((li) => (
                      <li key={li} className="neo-li text-white/85">
                        <span className="neo-li__dot" aria-hidden />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: image card (same visual weight as the removed quick card) */}
                <div className="lg:col-span-5">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.04)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[360px]">
                      <Image
                        src="/images/private/hero-private-transfer.webp"
                        alt="Premium chauffeur-driven private transfer in Barcelona"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="container-page pb-20 text-center">

          <p className="mt-3 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-[rgba(217,167,64,0.55)] bg-[rgba(217,167,64,0.18)] px-4 py-2 text-sm font-extrabold text-[rgba(2,6,23,0.92)] shadow-[0_14px_40px_rgba(217,167,64,0.16)]">
              {tr("links.pill", "Also explore our taxi fleet for hourly booking and quick transfers.")}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={`${prefix}/airport-taxi-barcelona`}
              className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
            >
              {tr("links.airport", "Airport Transfers")}
            </Link>
            <Link
              href={`${prefix}/cruise-port-transfer-barcelona`}
              className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
            >
              {tr("links.cruise", "Cruise Port Pickup")}
            </Link>
            <Link
              href={`${prefix}/long-distance-transfers`}
              className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
            >
              {tr("links.longDistance", "Long Distance")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
