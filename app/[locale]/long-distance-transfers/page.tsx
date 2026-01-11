import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";

const PHONE_E164 = "+34625099099";
const WHATSAPP_E164 = "34625099099";

export const metadata: Metadata = {
  title: "Long Distance Taxi Barcelona | Comfortable Van Transfers Across Spain",
  description:
    "Book long-distance taxi transfers from Barcelona with spacious 4–8 seater vans, professional drivers, and fixed pricing on request. Door-to-door travel across Catalonia and Spain.",
};

export default async function LongDistanceTransfersPage() {
  const locale = await getLocale();
  const t = await getTranslations("long");

  // Safe fallback helper (avoids MISSING_MESSAGE crashes while translations are being added)
  const tr = (key: string, fallback: string) => (t.has(key) ? t(key) : fallback);

  // localePrefix = "as-needed" behavior: default locale (en) has NO prefix
  const prefix = locale === "en" ? "" : `/${locale}`;

  // Airport-style floating cards: clean white + soft shadow + subtle gold border highlight
  const goldCard =
    "group relative rounded-3xl border border-black/10 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg";
  const goldCardFx =
    "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100";
  const goldCardFxInner =
    "absolute inset-0 rounded-3xl border border-[rgba(223,178,77,0.55)]";
  const goldCardFxTop =
    "absolute left-6 right-6 top-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[rgba(223,178,77,0.9)] to-transparent";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-black min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0">
        {/* soft black → gold vignette overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(1200px 600px at 15% 10%, rgba(223,178,77,0.18), transparent 40%), radial-gradient(1200px 600px at 85% 90%, rgba(223,178,77,0.18), transparent 40%), linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.75))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 8%, transparent 8%), linear-gradient(315deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 8%, transparent 8%)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top, right bottom",
            backgroundSize: "420px 420px",
            opacity: 0.85,
          }}
        />

        <div className="container-page relative py-16 md:py-24 min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0 flex items-center pb-10 md:pb-0">
          <div className="w-full">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* LEFT */}
              <div className="max-w-3xl">
                <p className="text-white/70 text-sm font-semibold tracking-wide">
                  {tr("hero.eyebrow", "Barcelona • Catalonia • Spain")}
                </p>

                <h1 className="mt-3 text-white text-4xl md:text-5xl font-extrabold leading-tight">
                  {tr("hero.title", "Long-Distance Transfers from Barcelona — Comfortable Vans for Long Routes")}
                </h1>

                {/* Description (desktop stays here; on mobile it will appear below the form) */}
                <p className="mt-5 hidden md:block text-white/80 text-lg leading-7">
                  {tr(
                    "hero.desc",
                    "Whether you’re heading to another city, a coastal town, or planning an all-day trip, we make long journeys smooth and stress-free. Enjoy clean, spacious vans, professional drivers, and door-to-door service—24/7."
                  )}
                </p>


              </div>

              {/* RIGHT: Express Booking */}
              <div className="relative">
                {/* Mobile: form + description below */}
                <div className="md:hidden">
                  <div className="mt-7">
                    <ExpressBookingCard whatsappE164={WHATSAPP_E164} />
                  </div>

                  {/* Description (mobile only, below the form) */}
                  <p className="mt-5 text-white/80 text-lg leading-7">
                    {tr(
                      "hero.desc",
                      "Whether you’re heading to another city, a coastal town, or planning an all-day trip, we make long journeys smooth and stress-free. Enjoy clean, spacious vans, professional drivers, and door-to-door service—24/7."
                    )}
                  </p>
                </div>

                {/* Desktop: form on the right */}
                <div className="hidden md:block">
                  <ExpressBookingCard whatsappE164={WHATSAPP_E164} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits line (below hero, not inside hero) */}
      <section className="container-page -mt-6 md:-mt-10 pb-10 md:pb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.vans", "✓ Spacious 4–8 seater vans")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.drivers", "✓ Professional drivers")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.door", "✓ Door-to-door")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.pricing", "✓ Fixed price on request")}
          </span>
        </div>
      </section>

      {/* SERVICE AREAS (modern list) */}
      <section className="container-page py-14 md:py-20">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 shadow-[0_18px_70px_rgba(2,6,23,0.08)]">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold">
            {tr("areas.title", "Service Areas — Where We Operate")}
          </h2>
          <p className="mt-4 text-center text-gray-600 max-w-4xl mx-auto leading-7">
            {tr("areas.desc", "We provide long-distance transfers, airport connections, and city pickups across Barcelona and popular nearby destinations. Tell us your route—if it’s not listed, we can still arrange it.")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "✈️", label: "Barcelona El Prat Airport" },
              { icon: "✈️", label: "Girona Airport" },
              { icon: "✈️", label: "Reus Airport, Tarragona" },
              { icon: "🏙️", label: "Barcelona City Center" },
              { icon: "🚆", label: "Sants Station (AVE / Renfe)" },
              { icon: "🛳️", label: "Port of Barcelona / Cruise Terminal" },
              { icon: "🏖️", label: "Sitges (Coastal Getaway)" },
              { icon: "🛍️", label: "La Roca Village (Shopping Outlet)" },
              { icon: "🏔️", label: "Andorra (Day Trips)" },
              { icon: "🏛️", label: "Montserrat Monastery" },
              { icon: "🎢", label: "PortAventura & Ferrari Land" },
              { icon: "🌊", label: "Costa Brava (Blanes, Calella, Cadaqués…)" },
              { icon: "🏟️", label: "Camp Nou / Estadi Olímpic" },
              { icon: "🏨", label: "Hotels & Resorts (W, Majestic, etc.)" },
              { icon: "🌴", label: "Castelldefels (Beach & Villas)" },
              { icon: "🏘️", label: "Tarragona, Girona, Lloret & more" },
            ].map((a) => (
              <div
                key={a.label}
                className="group rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(2,6,23,0.10)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl border border-black/10 bg-black/[0.03] grid place-items-center text-xl transition group-hover:scale-[1.03]">
                    <span aria-hidden>{a.icon}</span>
                  </div>
                  <div className="font-semibold text-gray-800 leading-6">{a.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-black/5 px-6 py-3 font-semibold transition hover:bg-black/10"
              href={`https://wa.me/${WHATSAPP_E164}`}
              target="_blank"
              rel="noreferrer"
            >
              {tr("areas.cta", "Ask about your route on WhatsApp")}
            </a>
          </div>
        </div>
      </section>

      {/* TRUST / BENEFITS */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {tr("trust.title", "Built for Comfort on Longer Journeys")}
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              {tr(
                "trust.desc",
                "Long routes require more than just a ride. We focus on comfort, clean vehicles, and punctual drivers—so your trip feels calm from start to finish."
              )}
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>{tr("trust.b1", "• Spacious seating and extra legroom")}</li>
              <li>{tr("trust.b2", "• Plenty of luggage space for groups and families")}</li>
              <li>{tr("trust.b3", "• Smooth driving style and professional service")}</li>
              <li>{tr("trust.b4", "• Door-to-door pickup and drop-off")}</li>
              <li>{tr("trust.b5", "• 24/7 availability, including weekends and holidays")}</li>
            </ul>
          </div>

          <div
            className="rounded-3xl border border-black/10 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.45)]"
            style={{
              background:
                "radial-gradient(circle at 20% 10%, rgba(217,167,64,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(217,167,64,0.25), transparent 45%), linear-gradient(180deg, #0b0b0b 0%, #000000 100%)",
            }}
          >
            <h3 className="text-xl font-extrabold text-white">
              {tr("trust.popularTitle", "Popular long-distance destinations")}
            </h3>
            <p className="mt-2 text-white/70">
              {tr("trust.popularDesc", "Common routes we handle daily (and many more):")}
            </p>

            <ul className="mt-4 space-y-2 text-white/85 leading-7">
              <li>{tr("trust.popular.sitges", "• Sitges")}</li>
              <li>{tr("trust.popular.tarragona", "• Tarragona")}</li>
              <li>{tr("trust.popular.girona", "• Girona")}</li>
              <li>{tr("trust.popular.costabrava", "• Costa Brava")}</li>
              <li>{tr("trust.popular.montserrat", "• Montserrat")}</li>
              <li>{tr("trust.popular.laroca", "• La Roca Village")}</li>
            </ul>

            <div className="mt-6">
              <a
                className="btn px-6 py-3 rounded-full font-semibold transition-transform hover:-translate-y-0.5 hover:brightness-110"
                style={{ background: "#22C55E", color: "#0b0b0b" }}
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {tr("cta.whatsappQuote", "WhatsApp for a Quote")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOURLY BOOKING */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {tr("hourly.title", "Hourly Van Booking in Barcelona")}
            </h2>
            <p className="mt-5 text-gray-600 leading-7">
              {tr("hourly.desc", "Need a taxi van for a few hours instead of a single route? Book our vans hourly for flexible plans like meetings, shopping, weddings, multiple stops, or short day trips. Tell us your schedule and we’ll recommend the best option.")}
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>{tr("hourly.b1", "• Multiple stops with one driver")}</li>
              <li>{tr("hourly.b2", "• Ideal for business, events, and families")}</li>
              <li>{tr("hourly.b3", "• Spacious 4–8 seater vans")}</li>
              <li>{tr("hourly.b4", "• Clear pricing confirmed in advance")}</li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
                href={`tel:${PHONE_E164}`}
              >
                {tr("cta.call", "Call")}
              </a>
              <a
                className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1FB85A] transition-transform hover:-translate-y-0.5"
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {tr("cta.whatsapp", "WhatsApp")}
              </a>
            </div>
          </div>

          <div
            className="rounded-3xl border border-black/10 p-6 md:p-8 shadow-[0_26px_80px_rgba(0,0,0,0.45)]"
            style={{
              background:
                "radial-gradient(circle at 20% 10%, rgba(217,167,64,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(217,167,64,0.25), transparent 45%), linear-gradient(180deg, #0b0b0b 0%, #000000 100%)",
            }}
          >
            <h3 className="text-xl font-extrabold text-white">
              {tr("hourly.ideasTitle", "Popular hourly uses")}
            </h3>
            <ul className="mt-4 space-y-2 text-white/85 leading-7">
              <li>{tr("hourly.i1", "• City multi-stop rides")}</li>
              <li>{tr("hourly.i2", "• Meetings + hotel transfers")}</li>
              <li>{tr("hourly.i3", "• Shopping (La Roca Village)")}</li>
              <li>{tr("hourly.i4", "• Events and weddings")}</li>
            </ul>
            <p className="mt-4 text-sm text-white/70">
              {tr(
                "hourly.note",
                "Send your date, pickup point, number of hours, and passenger count—we’ll confirm availability fast."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="container-page pb-16 md:pb-20">
        <h2
          className="text-center text-3xl md:text-4xl font-extrabold"
          style={{ color: "rgb(223,178,77)" }}
        >
          {tr("includes.title", "What’s Included in Your Long-Distance Transfer")}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {([
            { key: "includes.i1", fallback: "Private ride (no sharing)", emoji: "🚖" },
            { key: "includes.i2", fallback: "4–8 seater vans", emoji: "🚐" },
            { key: "includes.i3", fallback: "Luggage space included", emoji: "🧳" },
            { key: "includes.i4", fallback: "Professional drivers", emoji: "🧑‍✈️" },
            { key: "includes.i5", fallback: "Fixed price on request", emoji: "💶" },
          ] as const).map((item) => (
            <div key={item.key} className={goldCard}>
              <p className="font-semibold text-gray-900">
                <span aria-hidden className="mr-2">{item.emoji}</span>
                {tr(item.key, item.fallback)}
              </p>

              {/* gold border + shimmer (hover) */}
              <div className={goldCardFx} aria-hidden>
                <div className={goldCardFxInner} />
                <div className={goldCardFxTop} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">
            {tr("how.title", "How to Book a Long-Distance Taxi")}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3 text-gray-700">
            <div>
              <p className="font-bold">{tr("how.step1.title", "1) Send your route")}</p>
              <p className="mt-2">
                {tr("how.step1.desc", "Share pickup, destination, date/time, passengers, and luggage by call or WhatsApp.")}
              </p>
            </div>

            <div>
              <p className="font-bold">{tr("how.step2.title", "2) Get confirmation")}</p>
              <p className="mt-2">
                {tr("how.step2.desc", "We confirm the vehicle size and pricing (fixed price available on request).")}
              </p>
            </div>

            <div>
              <p className="font-bold">{tr("how.step3.title", "3) Travel in comfort")}</p>
              <p className="mt-2">
                {tr("how.step3.desc", "Your driver arrives on time and takes you directly to your destination—stress-free.")}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
              href={`tel:${PHONE_E164}`}
            >
              {tr("cta.callNow", "Call Now")}
            </a>
            <a
              className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1FB85A] transition-transform hover:-translate-y-0.5"
              href={`https://wa.me/${WHATSAPP_E164}`}
              target="_blank"
              rel="noreferrer"
            >
              {tr("cta.whatsapp", "WhatsApp")}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-black/10 bg-white/90 backdrop-blur p-8 md:p-10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">
            {tr("faq.title", "Frequently Asked Questions")}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q1", "Do you offer fixed pricing for long-distance trips?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a1", "Yes. For most routes we can confirm a clear fixed price in advance based on the route, passengers, and luggage.")}
              </p>
            </details>

            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q2", "How many passengers can your vans carry?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a2", "Most long-distance transfers accommodate 4–8 passengers depending on luggage requirements.")}
              </p>
            </details>

            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q3", "Can we add stops along the route?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a3", "Yes. Tell us your planned stops and timing—we’ll confirm the best option and pricing.")}
              </p>
            </details>

            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q4", "Do you offer hourly booking as well?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a4", "Yes. You can book a taxi van hourly in Barcelona for flexible schedules, multiple stops, or events.")}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container-page pb-20 text-center">
        <p className="text-gray-700">
          {tr("links.intro", "Need airport or cruise pickup too? Explore:")}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`${prefix}/airport-taxi-barcelona`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {tr("links.airport", "Airport Taxi")}
          </Link>

          <Link
            href={`${prefix}/cruise-port-transfer-barcelona`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {tr("links.cruise", "Cruise Port Pickup")}
          </Link>

          <Link
            href={`${prefix}/contact`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {tr("links.contact", "Contact")}
          </Link>
        </div>
      </section>
    </>
  );
}