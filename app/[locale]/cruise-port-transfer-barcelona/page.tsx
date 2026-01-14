import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";

const PHONE_E164 = "+34625099099";
const WHATSAPP_E164 = "34625099099";

export const metadata: Metadata = {
  title: "Cruise Transfer Barcelona | Port Pickup, Airport Transfers & City Tours",
  description:
    "Book your cruise transfer in Barcelona with Taxi Van Barcelona. Reliable pickup from Moll Adossat/Port Vell to hotel or airport, plus Barcelona city tours for cruise passengers. Fixed pricing, luggage space, 24/7 service.",
};

export default async function CruisePortPickupPage() {
  const locale = await getLocale();
  const t = await getTranslations("cruise");

  // localePrefix = "as-needed" behavior: default locale (en) has NO prefix
  const prefix = locale === "en" ? "" : `/${locale}`;

  const tr = (key: string, fallback: string) => t(key, { default: fallback });
  // Airport-style floating cards: clean white + soft shadow + subtle gold border highlight
  const goldCard =
    "group relative rounded-3xl border border-black/10 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg";

  // subtle gold outline + top shimmer (same vibe as Airport cards)
  const goldCardInner =
    "relative z-10";

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
        {/* gold accents */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 8%, transparent 8%), linear-gradient(315deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 8%, transparent 8%)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top, right bottom",
            backgroundSize: "420px 420px",
            opacity: 0.55,
          }}
        />
        {/* Soft black→gold fade (premium vignette) */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(900px 600px at 20% 15%, rgba(223,178,77,0.20) 0%, rgba(223,178,77,0.06) 35%, transparent 70%), radial-gradient(900px 600px at 85% 80%, rgba(223,178,77,0.16) 0%, rgba(223,178,77,0.05) 35%, transparent 70%), linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="container-page relative py-16 md:py-24 min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0 flex items-center pb-10 md:pb-0">
          <div className="w-full">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* LEFT: TEXT */}
            <div className="max-w-3xl">
              <p className="text-white/70 text-sm font-semibold tracking-wide">
                {tr("hero.eyebrow", "Barcelona Cruise Port • Moll Adossat • Port Vell")}
              </p>

              <h1 className="mt-3 text-white text-4xl md:text-5xl font-extrabold leading-tight">
                {tr("hero.title", "Cruise Port Pickup in Barcelona — Smooth, On-Time Transfers")}
              </h1>

              {/* Description (desktop stays here; on mobile it will appear below the form) */}
              <p className="mt-5 hidden md:block text-white/80 text-lg leading-7">
                {tr(
                  "hero.desc",
                  "Arriving in Barcelona by cruise? Skip the port taxi queues and enjoy a comfortable, direct transfer from the cruise terminal to your hotel, airport, or destination. We also offer flexible Barcelona city tours during your stop—spacious vans, fixed pricing, and professional drivers, ready when your ship docks."
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
                    "Arriving in Barcelona by cruise? Skip the port taxi queues and enjoy a comfortable, direct transfer from the cruise terminal to your hotel, airport, or destination. We also offer flexible Barcelona city tours during your stop—spacious vans, fixed pricing, and professional drivers, ready when your ship docks."
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
      <section className="container-page mt-6 md:-mt-10 pb-10 md:pb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.tracking", "✓ Cruise-tracking")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.door", "✓ Door-to-door")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.fixed", "✓ Fixed rates")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {tr("hero.features.luggage", "✓ Luggage space")}
          </span>
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page py-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-black/10 bg-white/90 backdrop-blur p-6 md:p-8 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {tr("why.title", "Why Choose Our Cruise Port Taxi Service?")}
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              {tr("why.p1", "Cruise arrivals can be unpredictable—but your transfer shouldn’t be. We monitor ship schedules in real time and adjust pickup accordingly, ensuring your driver is ready when you disembark.")}
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>{tr("why.b1", "✅ Direct pickup from Moll Adossat & Port Vell")}</li>
              <li>{tr("why.b2", "✅ 4 to 8-seater vans for families and groups")}</li>
              <li>{tr("why.b3", "✅ Plenty of space for cruise luggage")}</li>
              <li>{tr("why.b4", "✅ Professional, multilingual drivers")}</li>
              <li>{tr("why.b5", "✅ Fixed pricing — no surprises")}</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/90 backdrop-blur p-6 shadow-lg">
            <h3 className="text-xl font-extrabold">{tr("where.title", "Where we take you")}</h3>

            <ul className="mt-4 space-y-2 text-gray-700 leading-7">
              <li>{tr("where.i1", "• Hotels & apartments across Barcelona")}</li>
              <li>{tr("where.i2", "• Barcelona Airport (El Prat)")}</li>
              <li>{tr("where.i3", "• Train stations (Sants, França)")}</li>
              <li>{tr("where.i4", "• Long-distance trips across Spain")}</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
                href={`tel:${PHONE_E164}`}
              >
                {tr("hero.call", "Call")}
              </a>
              <a
                className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1FB85A] transition-transform hover:-translate-y-0.5"
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {tr("hero.whatsapp", "WhatsApp")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CITY TOURS */}
      <section className="container-page pb-16 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {tr("tours.title", "Barcelona City Tours for Cruise Passengers")}
            </h2>
            <p className="mt-5 text-gray-600 leading-7">
              {tr("tours.p1", "Only in Barcelona for a few hours? Book a city tour directly from the cruise terminal. We pick you up at Moll Adossat or Port Vell and tailor the route to your schedule—then bring you back to the ship on time.")}
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>{tr("tours.b1", "• Flexible pickup at the cruise terminal")}</li>
              <li>{tr("tours.b2", "• Custom routes: Sagrada Família, Gothic Quarter, Montjuïc, beaches")}</li>
              <li>{tr("tours.b3", "• Comfortable 4–8 seater vans with luggage space")}</li>
              <li>{tr("tours.b4", "• Fixed pricing confirmed before you start")}</li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
                href={`tel:${PHONE_E164}`}
              >
                {tr("hero.call", "Call")}
              </a>
              <a
                className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1FB85A] transition-transform hover:-translate-y-0.5"
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {tr("hero.whatsapp", "WhatsApp")}
              </a>
            </div>
          </div>

          <div
            className="rounded-3xl border border-black/10 bg-white/90 backdrop-blur p-8 md:p-10 shadow-lg"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(30,30,30,0.9))",
            }}
          >
            <h3 className="text-xl font-extrabold text-white">{tr("tours.ideasTitle", "Popular tour ideas")}</h3>
            <ul className="mt-4 space-y-2 text-white/80 leading-7">
              <li>{tr("tours.i1", "⭐ Highlights tour (2–3 hours)")}</li>
              <li>{tr("tours.i2", "🕓 Half-day city tour (4 hours)")}</li>
              <li>{tr("tours.i3", "🛍️ Shopping + sightseeing (La Roca Village on request)")}</li>
              <li>{tr("tours.i4", "👨‍👩‍👧‍👦 Family-friendly routes (child seats available)")}</li>
            </ul>
            <p className="mt-4 text-sm text-white/70">
              {tr("tours.note", "Tell us your ship name, docking time, and must-see places—we’ll suggest a plan.")}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="container-page pb-16 md:pb-20">
        <h2
          className="text-center text-3xl md:text-4xl font-extrabold"
          style={{ color: "rgb(223,178,77)" }}
        >
          {tr("includes.title", "What’s Included in Your Cruise Transfer")}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            tr("includes.i1", "🚐 4–8 seater vans"),
            tr("includes.i2", "🧳 Large luggage capacity"),
            tr("includes.i3", "💰 Fixed pricing from 34€"),
            tr("includes.i4", "👶 Child seats from €5"),
            tr("includes.i5", "📍 Door-to-door service"),
          ].map((item) => (
            <div key={item} className={goldCard}>
              <div className={goldCardInner}>
                <p className="font-semibold text-gray-900">{item}</p>
              </div>

              {/* gold border + shimmer (hover) */}
              <div className={goldCardFx} aria-hidden>
                <div className={goldCardFxInner} />
                <div className={goldCardFxTop} />
              </div>
            </div>
          ))}
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
                {tr("faq.q1", "Do you offer fixed pricing for cruise port transfers?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a1", "Yes. We confirm a clear, fixed price before pickup based on passengers and luggage.")}
              </p>
            </details>

            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q2", "Where will the driver meet us at the cruise terminal?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a2", "We confirm the exact meeting point at Moll Adossat or Port Vell and share instructions by WhatsApp.")}
              </p>
            </details>

            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q3", "Can we do a city tour and still return to the ship on time?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a3", "Absolutely. City tours are planned around your docking schedule so you return comfortably on time.")}
              </p>
            </details>

            <details className="rounded-xl border border-black/10 p-4">
              <summary className="font-semibold cursor-pointer">
                {tr("faq.q4", "How many passengers fit in a cruise taxi van?")}
              </summary>
              <p className="mt-2 text-gray-700">
                {tr("faq.a4", "Our vans typically accommodate 4–8 passengers depending on luggage needs.")}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* TRUST + LINKS */}
      <section className="container-page pb-20 text-center">
        <p className="text-gray-700">
          {tr("links.portInfoPrefix", "Need official port information? Visit")}{" "}
          <a
            href="https://www.portdebarcelona.cat"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:opacity-80"
          >
            {tr("links.portInfoName", "Port de Barcelona")}
          </a>
          .
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`${prefix}/airport-taxi-barcelona`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {tr("links.airport", "Airport Taxi")}
          </Link>
          <Link
            href={`${prefix}/faqs`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {tr("links.faqs", "FAQs")}
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