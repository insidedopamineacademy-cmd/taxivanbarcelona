import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getLocale, getTranslations } from "next-intl/server";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";

const PHONE_E164 = "+34625099099";
const WHATSAPP_E164 = "34625099099";

export const metadata: Metadata = {
  title: "Taxi Van Barcelona | Airport, Cruise & Long-Distance Transfers",
  description:
    "Book a spacious taxi van in Barcelona for airport transfers, cruise port pickup, and long-distance trips across Catalonia. Clean 4–8 seater vans, fixed pricing, 24/7 support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taxi Van Barcelona | Airport, Cruise & Long-Distance Transfers",
    description:
      "Spacious 4–8 seater taxi vans in Barcelona for airport, cruise, and long-distance transfers. Fixed pricing, professional drivers, fast WhatsApp booking.",
    url: "/",
    type: "website",
  },
};

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();

  // localePrefix = "as-needed" behavior: default locale (en) has NO prefix
  const prefix = locale === "en" ? "" : `/${locale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Taxi Van Barcelona",
        url: "https://taxivanbarcelona.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://taxivanbarcelona.com/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "Taxi Van Barcelona",
        url: "https://taxivanbarcelona.com/",
        telephone: PHONE_E164,
        email: "email@taxivanbarcelona.com",
        areaServed: "Barcelona",
        priceRange: "€€",
        sameAs: [`https://wa.me/${WHATSAPP_E164}`],
      },
    ],
  };

  return (
    <>
      <Script id="home-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>


      {/* HERO (premium black + gold vignette) */}
      <section
        className="relative overflow-hidden min-h-[calc(100svh-72px)] md:min-h-0"
        style={{ background: "#070A0F" }}
      >
        {/* Gold diagonal accents */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(250,204,21,0.85) 0%, rgba(250,204,21,0.85) 7%, transparent 7%, transparent 100%), linear-gradient(315deg, rgba(250,204,21,0.85) 0%, rgba(250,204,21,0.85) 7%, transparent 7%, transparent 100%)",
            backgroundPosition: "left top, right bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "360px 360px, 360px 360px",
            opacity: 0.42,
          }}
        />
        {/* Soft black→gold fade (premium vignette) */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(250,204,21,0.16), transparent 46%), radial-gradient(circle at 85% 80%, rgba(250,204,21,0.10), transparent 55%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(0deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.70) 100%)",
          }}
        />

        <div className="container-page relative py-16 md:py-20 min-h-[calc(100svh-72px)] flex items-center">
          <div className="w-full">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="order-1 lg:order-none lg:col-span-7">
                <p className="text-white/70 text-sm tracking-wide">
                  {t("home.hero.eyebrow", { default: "Barcelona • 4–8 seater vans • 24–7 support" })}
                </p>
                <h1 className="mt-4 text-white text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
                  {t("home.hero.title", {
                    default: "Taxi Van Barcelona for Airport, Cruise & Long-Distance Transfers",
                  })}
                </h1>

                {/* Desktop subtitle (keeps spacing tight on desktop) */}
                <p className="hidden lg:block mt-4 text-white/80 text-lg leading-7 max-w-2xl">
                  {t("home.hero.p1", { default: "Need a " })}
                  <b>{t("home.hero.bold", { default: "spacious taxi van in Barcelona" })}</b>
                  {t("home.hero.p2", {
                    default:
                      "? Book in seconds via WhatsApp or call. We provide clean 4–8 seater vans, professional drivers, and clear pricing—so your ride feels smooth from the first message.",
                  })}
                </p>
              </div>

              {/* Right: Express Booking */}
              <div className="order-2 lg:order-none lg:col-span-5">
                <ExpressBookingCard
                  whatsappE164={WHATSAPP_E164}
                  className="neo-card neo-card--booking"
                />
              </div>

              {/* Mobile subtitle (below form) */}
              <div className="order-3 lg:hidden">
                <p className="mt-4 text-white/80 text-lg leading-7 max-w-2xl">
                  {t("home.hero.p1", { default: "Need a " })}
                  <b>{t("home.hero.bold", { default: "spacious taxi van in Barcelona" })}</b>
                  {t("home.hero.p2", {
                    default:
                      "? Book in seconds via WhatsApp or call. We provide clean 4–8 seater vans, professional drivers, and clear pricing—so your ride feels smooth from the first message.",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + Services + rest of main site in off-white wrapper */}
      <div className="page-mid">
        {/* Intro */}
        <section className="py-16 md:py-20 text-center">
          <div className="container-page">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {t("home.intro.title", { default: "Your Ride, Your Way in Barcelona" })}
            </h2>
            <p className="mt-6 text-gray-600 max-w-4xl mx-auto leading-7">
              {t("home.intro.p1", { default: "Whether you’re traveling solo or with a group, Taxi Van Barcelona has the right vehicle for your trip. We operate modern " })}
              <b>{t("home.intro.bold", { default: "4, 6, 7, and 8-seater taxi vans" })}</b>
              {t("home.intro.p2", { default: "—clean, spacious, and professionally maintained. From short city rides to long routes across Spain, we focus on comfort, punctuality, and clear communication." })}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3 text-left">
              {[
                {
                  title: t("home.intro.cards.fastBooking.title", { default: "Fast booking" }),
                  desc: t("home.intro.cards.fastBooking.desc", { default: "Message us on WhatsApp and get confirmation quickly—ideal for tourists on the move." }),
                },
                {
                  title: t("home.intro.cards.comfortFirst.title", { default: "Comfort-first vans" }),
                  desc: t("home.intro.cards.comfortFirst.desc", { default: "Extra space for luggage, strollers, and groups—so everyone rides relaxed." }),
                },
                {
                  title: t("home.intro.cards.proDrivers.title", { default: "Professional drivers" }),
                  desc: t("home.intro.cards.proDrivers.desc", { default: "Local knowledge, safe driving, and on-time pickups—day or night." }),
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="card-accent card-premium rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[rgba(217,167,64,0.35)]"
                >
                  <h3 className="text-lg font-extrabold">{b.title}</h3>
                  <p className="mt-2 text-gray-600 leading-7">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services (SEO-friendly cards + hover) */}
        <section className="pb-16 md:pb-20">
          <div className="container-page">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {t("home.services.title", { default: "Transfers We Specialize In" })}
              </h2>
              <p className="mt-4 text-gray-600">
                {t("home.services.subtitle", { default: "Airport, cruise, and long-distance routes—built for comfort and reliability." })}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: t("home.services.cards.airport.title", { default: "Barcelona Airport Taxi Van" }),
                  desc: t("home.services.cards.airport.desc", { default: "El Prat (BCN) transfers with meet & greet and generous luggage space." }),
                  href: `${prefix}/airport-taxi-barcelona`,
                },
                {
                  title: t("home.services.cards.cruise.title", { default: "Cruise Port Transfer" }),
                  desc: t("home.services.cards.cruise.desc", { default: "Pickup at the port and direct transfer to your hotel, airport, or destination." }),
                  href: `${prefix}/cruise-port-transfer-barcelona`,
                },
                {
                  title: t("home.services.cards.longDistance.title", { default: "Long-Distance Transfers" }),
                  desc: t("home.services.cards.longDistance.desc", { default: "Comfortable vans for routes like Sitges, Girona, Tarragona, Costa Brava and more." }),
                  href: `${prefix}/long-distance-transfers`,
                },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="card-accent card-premium group rounded-3xl border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[rgba(217,167,64,0.45)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold">{card.title}</h3>
                      <p className="mt-3 text-gray-600 leading-7">{card.desc}</p>
                    </div>
                    <span className="text-[rgba(217,167,64,1)] text-xl font-bold transition group-hover:translate-x-0.5">→</span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                    {t("home.services.cards.cta.explore", { default: "Explore details" })} <span className="text-[rgba(217,167,64,1)]">•</span> {t("home.services.cards.cta.bookFaster", { default: "Book faster" })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet (adds clarity + helps users choose vehicle type) */}
        <section className="pb-16 md:pb-20">
          <div className="container-page">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {t("home.fleet.title", { default: "Our Fleet Options" })}
              </h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
                {t("home.fleet.subtitle", { default: "Choose the right ride for your transfer—standard taxis, premium cars, and spacious taxi vans for groups." })}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: t("home.fleet.items.standardTaxi.title", { default: "Standard Taxi (Fast-Lane City Transfers)" }),
                  meta: t("home.fleet.items.standardTaxi.meta", { default: "1–3 passengers • Barcelona city rides" }),
                  desc: t("home.fleet.items.standardTaxi.desc", { default: "Ideal for quick Barcelona rides with a fast-lane style pickup. Best for solo travelers or couples who want a smooth, direct transfer." }),
                  img: "/images/fleet/standard-taxi-fast-lane.webp",
                },
                {
                  title: t("home.fleet.items.premiumTaxi.title", { default: "Premium Taxi (Luxury Comfort)" }),
                  meta: t("home.fleet.items.premiumTaxi.meta", { default: "Business • meetings • special events" }),
                  desc: t("home.fleet.items.premiumTaxi.desc", { default: "A luxury-comfort option for corporate travel, conferences, and elegant arrivals. Quiet ride, professional service, and a premium feel." }),
                  img: "/images/fleet/premium-taxi-luxury.webp",
                },
                {
                  title: t("home.fleet.items.standardVan.title", { default: "Standard Taxi Van (4–7 Pasengers)" }),
                  meta: t("home.fleet.items.standardVan.meta", { default: "Families & groups • extra luggage space" }),
                  desc: t("home.fleet.items.standardVan.desc", { default: "Our most popular choice for airport transfers and cruise port pickup. Spacious 4–7 Pasengers taxi vans for luggage, strollers, and group travel." }),
                  img: "/images/fleet/standard-taxi-van-4-8.webp",
                },
                {
                  title: t("home.fleet.items.fordTourneo.title", { default: "Ford Tourneo Custom Taxi (Up to 8 Passengers)" }),
                  meta: t("home.fleet.items.fordTourneo.meta", { default: "Max space • long-distance transfers" }),
                  desc: t("home.fleet.items.fordTourneo.desc", { default: "Best for larger groups with suitcases. Ford Tourneo Custom taxi for up to 8 passengers—perfect for long-distance routes across Catalonia." }),
                  img: "/images/fleet/ford-tourneo-custom-8p.webp",
                },
              ].map((v) => {
                const altText = t("home.fleet.imageAlt", {
                  title: v.title,
                  default: "{title} in Barcelona",
                } as any);
                return (
                  <div
                    key={v.title}
                    className="card-accent card-premium group overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:-translate-y-1 hover:border-[rgba(217,167,64,0.45)]"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.45) 100%)" }} />
                      <Image
                        src={v.img}
                        alt={altText}
                        width={1200}
                        height={700}
                        className="h-56 w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        quality={85}
                        unoptimized
                      />
                    </div>

                    <div className="p-7">
                      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold text-gray-700">
                        <span className="text-[rgba(217,167,64,1)]">●</span>
                        {v.meta}
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold">{v.title}</h3>
                      <p className="mt-3 text-gray-600 leading-7">{v.desc}</p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <a
                          className="text-sm font-extrabold text-gray-900 hover:text-black"
                          href={`https://wa.me/${WHATSAPP_E164}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t("home.fleet.requestAvailabilityAria", {
                            title: v.title,
                            default: "Request {title} availability on WhatsApp",
                          } as any)}
                        >
                          {t("home.fleet.requestAvailability", { default: "Request availability →" })}
                        </a>
                        <span className="text-amber-800 text-sm font-semibold">{t("home.fleet.fastReply", { default: "Fast reply" })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                className="btn btn-gold px-7 py-3 rounded-full font-extrabold transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {t("home.fleet.cta", { default: "Ask which vehicle fits your trip" })}
              </a>
            </div>
          </div>
        </section>

      {/* Why choose (beige section) */}
      <section className="section-sand">
        <div className="container-page py-16 md:py-20">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold">
            {t("home.whyChoose.title", { default: "Why Choose Taxi Van Barcelona?" })}
          </h2>
          <p className="mt-4 text-center text-gray-700 max-w-3xl mx-auto leading-7">
            {t("home.whyChoose.subtitle", { default: "We’re built for tourists and groups who want space, punctuality, and stress-free transport. Here’s what you get when you ride with us." })}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("home.whyChoose.items.vans.title", { default: "Spacious vans + luggage space" }),
                desc: t("home.whyChoose.items.vans.desc", { default: "Comfortable 4–8 seater vans with room for suitcases, strollers, and gear—without compromising comfort." }),
              },
              {
                title: t("home.whyChoose.items.fastLane.title", { default: "Airport / City Fast-Lane Taxi" }),
                desc: t("home.whyChoose.items.fastLane.desc", { default: "Skip the traffic with our fast-lane service—ideal for connecting flights and time-sensitive transfers across the city." }),
              },
              {
                title: t("home.whyChoose.items.multilingual.title", { default: "Multilingual Drivers" }),
                desc: t("home.whyChoose.items.multilingual.desc", { default: "Clear communication and friendly support for international travelers." }),
              },
              {
                title: t("home.whyChoose.items.pricing.title", { default: "Transparent Pricing" }),
                desc: t("home.whyChoose.items.pricing.desc", { default: "No surprises—clear quotes and fair rates for popular routes. Prices starting from 35€" }),
              },
              {
                title: t("home.whyChoose.items.meetGreet.title", { default: "Meet & Greet" }),
                desc: t("home.whyChoose.items.meetGreet.desc", { default: "Professional pickup experience—especially helpful at airport and port." }),
              },
              {
                title: t("home.whyChoose.items.availability.title", { default: "24/7 Availability" }),
                desc: t("home.whyChoose.items.availability.desc", { default: "Early flights, late arrivals, and last-minute changes—we’re ready." }),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white/70 p-7 text-center transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                <h3 className="text-xl font-extrabold">{item.title}</h3>
                <p className="mt-2 text-gray-700 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* How it works (improves UX + conversion) */}
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {t("home.howItWorks.title", { default: "How Booking Works" })}
              </h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
                {t("home.howItWorks.subtitle", { default: "Simple steps, quick confirmation, and a smooth pickup. That’s it." })}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: t("home.howItWorks.steps.s1.title", { default: "Send trip details" }),
                  desc: t("home.howItWorks.steps.s1.desc", { default: "Pickup + drop-off, passengers, luggage, and time. WhatsApp is fastest." }),
                },
                {
                  step: "02",
                  title: t("home.howItWorks.steps.s2.title", { default: "Get a clear quote" }),
                  desc: t("home.howItWorks.steps.s2.desc", { default: "We confirm price and availability—so you know exactly what to expect." }),
                },
                {
                  step: "03",
                  title: t("home.howItWorks.steps.s3.title", { default: "Enjoy the ride" }),
                  desc: t("home.howItWorks.steps.s3.desc", { default: "Your driver arrives on time and helps with luggage—stress-free travel." }),
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-3xl border border-white/10 bg-black p-7 transition hover:-translate-y-0.5 shadow-[0_18px_55px_rgba(217,167,64,0.25)] hover:shadow-[0_26px_70px_rgba(217,167,64,0.34)]"
                >
                  <div className="text-[rgba(217,167,64,1)] font-extrabold text-sm tracking-widest">
                    {t("home.howItWorks.stepLabel", { default: "STEP" })} {s.step}
                  </div>
                  <h3 className="mt-2 text-xl font-extrabold text-white">{s.title}</h3>
                  <p className="mt-2 text-white/75 leading-7">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ (SEO + helpful content) */}
        <section className="pb-20">
          <div className="container-page">
            <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold">
                  {t("home.faq.title", { default: "Quick FAQs" })}
                </h2>
                <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
                  {t("home.faq.subtitle", { default: "Answers to the most common questions from international travelers." })}
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  {
                    q: t("home.faq.items.fixedPricing.q", { default: "Do you offer fixed pricing?" }),
                    a: t("home.faq.items.fixedPricing.a", { default: "Yes. For popular routes we provide clear quotes so you know the cost before you ride." }),
                  },
                  {
                    q: t("home.faq.items.passengers.q", { default: "How many passengers can your vans carry?" }),
                    a: t("home.faq.items.passengers.a", { default: "We typically serve 4–8 passengers, depending on the vehicle and luggage requirements." }),
                  },
                  {
                    q: t("home.faq.items.whatsapp24.q", { default: "Is WhatsApp booking available 24/7?" }),
                    a: t("home.faq.items.whatsapp24.a", { default: "Yes. WhatsApp is the fastest way to book, update timings, or ask questions." }),
                  },
                  {
                    q: t("home.faq.items.cruisePickup.q", { default: "Do you do cruise port pickups?" }),
                    a: t("home.faq.items.cruisePickup.a", { default: "Yes. We pick up at Barcelona’s cruise terminals and transfer you directly to your destination." }),
                  },
                ].map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-black/10 bg-white px-5 py-4 open:shadow-lg transition"
                  >
                    <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-4">
                      <span>{f.q}</span>
                      <span className="text-[rgba(217,167,64,1)] font-bold group-open:rotate-45 transition">+</span>
                    </summary>
                    <p className="mt-3 text-gray-600 leading-7">{f.a}</p>
                  </details>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold transition"
                  href={`${prefix}/contact`}
                >
                  {t("home.faq.cta", { default: "Still have a question? Contact us" })}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="pb-20">
          <div className="container-page">
            <div className="rounded-3xl p-10 md:p-12 border border-black/10 bg-black text-white relative overflow-hidden">
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
                    {t("home.ctaStrip.title", { default: "Ready to book your taxi van in Barcelona?" })}
                  </h2>
                  <p className="mt-3 text-white/80 max-w-2xl leading-7">
                    {t("home.ctaStrip.subtitle", { default: "Skip taxi queues and uncertainty. Call or WhatsApp Taxi Van Barcelona for fast confirmation and a comfortable ride—airport, cruise port, or long distance." })}
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#0A66C2] hover:bg-[#095AB0] transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                    href={`tel:${PHONE_E164}`}
                  >
                    {t("home.ctaStrip.buttons.callNow", { default: "Call Now" })}
                  </a>

                  <a
                    className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1FB85A] transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                    href={`https://wa.me/${WHATSAPP_E164}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("home.ctaStrip.buttons.whatsapp", { default: "WhatsApp" })}
                  </a>

                  <Link
                    className="btn px-6 py-3 rounded-full font-semibold text-white border border-[rgba(217,167,64,0.55)] bg-[rgba(0,0,0,0.35)] hover:bg-[rgba(217,167,64,0.18)] transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                    href={`${prefix}/contact`}
                  >
                    {t("home.ctaStrip.buttons.contact", { default: "Contact" })}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}