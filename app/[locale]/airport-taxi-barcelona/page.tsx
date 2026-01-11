import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";

const PHONE_E164 = "+34625099099";
const WHATSAPP_E164 = "34625099099";

export const metadata: Metadata = {
  title: "Barcelona Airport Taxi Van – Group Transfers & 24/7 Service",
  description:
    "Book a Barcelona airport taxi van for 3–8 people. 24/7 transfers, Fixed pricing, Free child seats. Reserve your van now!",
};

export default async function AirportTaxiPage() {
  const t = await getTranslations("airport");
  const locale = await getLocale();
  // localePrefix = "as-needed" behavior: default locale (en) has NO prefix
  const prefix = locale === "en" ? "" : `/${locale}`;

  // next-intl strict mode: avoid throwing on missing keys
  const hasKey = (key: string) => {
    const anyT = t as unknown as { has?: (k: string) => boolean };
    return typeof anyT.has === "function" ? anyT.has(key) : false;
  };

  const tt = (key: string, fallback: string) => {
    return hasKey(key) ? t(key) : fallback;
  };

  return (
    <>
      {/* HERO (clean + aligned) */}
      <section
        className="relative overflow-hidden bg-black min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0"
        style={{ background: "rgb(10,10,10)" }}
      >
        {/* gold diagonal accents */}
        <div
          className="absolute inset-0 opacity-50"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(223,178,77,0.92) 0%, rgba(223,178,77,0.92) 8%, transparent 8%, transparent 100%), linear-gradient(315deg, rgba(223,178,77,0.92) 0%, rgba(223,178,77,0.92) 8%, transparent 8%, transparent 100%)",
            backgroundPosition: "left top, right bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "420px 420px, 420px 420px",
          }}
        />
        {/* Soft black→gold fade (premium vignette like About hero) */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(900px 600px at 20% 15%, rgba(223,178,77,0.20) 0%, rgba(223,178,77,0.06) 35%, transparent 70%), radial-gradient(900px 600px at 85% 80%, rgba(223,178,77,0.16) 0%, rgba(223,178,77,0.05) 35%, transparent 70%), linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="container-page relative py-16 md:py-24 min-h-[calc(100vh-72px)] min-h-[calc(100svh-72px)] md:min-h-0 flex items-center pb-10 md:pb-0">
          <div className="w-full">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-white/70 text-sm font-semibold tracking-wide">
                {t("hero.eyebrow")}
              </p>

              <h1 className="mt-3 text-white text-4xl md:text-5xl font-extrabold leading-tight">
                {t("hero.title")}
              </h1>

              {/* Description (desktop stays here; on mobile it will appear below the form) */}
              <p className="mt-5 hidden md:block text-white/80 text-lg leading-7">
                {t("hero.desc")}
              </p>

              
            </div>

            {/* Right: Express Booking (desktop). On mobile, we show this below the H1 via stacking order. */}
            <div className="relative">
              <div className="md:hidden">
                <div className="mt-7">
                  <ExpressBookingCard whatsappE164={WHATSAPP_E164} />
                </div>

                {/* Description (mobile only, below the form) */}
                <p className="mt-5 text-white/80 text-lg leading-7">
                  {t("hero.desc")}
                </p>
              </div>

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
            {t("hero.features.fixed")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {t("hero.features.meet")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {t("hero.features.luggage")}
          </span>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
            {t("hero.features.child")}
          </span>
        </div>
      </section>

      {/* INCLUDES (aligned grid, mobile-perfect) */}
      <section className="container-page py-14 md:py-18 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "rgb(223,178,77)" }}>
          {t("includes.title")}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 text-left">
          {[
            { emoji: "🚐", title: t("includes.items.vans.title"), desc: t("includes.items.vans.desc") },
            { emoji: "🧳", title: t("includes.items.luggage.title"), desc: t("includes.items.luggage.desc") },
            { emoji: "💶", title: t("includes.items.pricing.title"), desc: t("includes.items.pricing.desc") },
            { emoji: "👶", title: t("includes.items.child.title"), desc: t("includes.items.child.desc") },
            { emoji: "🚪", title: t("includes.items.door.title"), desc: t("includes.items.door.desc") }
          ].map((f) => (
            <div
              key={f.title}
              className="card-accent card-premium group rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:border-[rgba(217,167,64,0.45)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.14)]"
            >
              <p className="font-extrabold text-lg flex items-center gap-2">
                <span className="text-[rgba(217,167,64,1)]">{f.emoji}</span>
                <span>{f.title}</span>
              </p>
              <p className="mt-3 text-gray-600 leading-7">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TERMINALS + DESTINATIONS (clean 2-column) */}
      <section className="container-page pb-16 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              {t("terminals.title")}
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              {t("terminals.desc")}
            </p>

            <div className="mt-6 rounded-2xl border border-black/10 p-5">
              <p className="font-semibold">{t("terminals.listTitle")}</p>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>🏨 {t("terminals.items.hotels")}</li>
                <li>🚢 {t("terminals.items.port")}</li>
                <li>🏠 {t("terminals.items.apartments")}</li>
                <li>🗺️ {t("terminals.items.daytrips")}</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6">
            <h3 className="text-xl font-extrabold">{t("how.title")}</h3>
            <ol className="mt-4 space-y-3 text-gray-700 leading-7">
              <li>
                <b>1)</b> {t("how.steps.1")}
              </li>
              <li>
                <b>2)</b> {t("how.steps.2")}
              </li>
              <li>
                <b>3)</b> {t("how.steps.3")}
              </li>
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
                href={`tel:${PHONE_E164}`}
              >
                {t("how.call")}
              </a>
              <a
                className="btn px-6 py-3 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1FB85A] transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
              >
                {t("how.whatsapp")}
              </a>
            </div>

            <p className="mt-5 text-sm text-gray-600">
              Want official airport info?{" "}
              <a
                className="underline underline-offset-4 hover:opacity-80"
                href="https://www.aena.es/en/josep-tarradellas-barcelona-el-prat.html"
                target="_blank"
                rel="noreferrer"
              >
                Barcelona Airport (AENA)
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* SEO parity: extra helpful copy + FAQs (safe defaults) */}
      <section className="container-page pb-16 md:pb-18">
        <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            {tt("seo.title", "Barcelona Airport Taxi Van — What to expect")}
          </h2>
          <p className="mt-4 text-gray-700 leading-7">
            {tt(
              "seo.p1",
              "If you’re landing at Barcelona El Prat (BCN) and want a smooth pickup, our taxi vans are designed for families and groups. You get generous luggage space, clear communication, and a door-to-door transfer to your hotel, apartment, cruise port, or any destination across Catalonia."
            )}
          </p>
          <p className="mt-4 text-gray-700 leading-7">
            {tt(
              "seo.p2",
              "We monitor timing and plan the pickup so you don’t waste time at the terminal. Just send your trip details and we confirm availability fast — WhatsApp is the quickest option."
            )}
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-extrabold">
              {tt("seo.faqTitle", "Frequently asked questions")}
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[ 
                {
                  q: tt("seo.faq.q1", "Do you offer fixed pricing for airport transfers?"),
                  a: tt(
                    "seo.faq.a1",
                    "Yes. For common routes we confirm a clear price before pickup, based on passengers and luggage."
                  ),
                },
                {
                  q: tt("seo.faq.q2", "How many passengers can the airport taxi van take?"),
                  a: tt(
                    "seo.faq.a2",
                    "Most trips are for 3–8 passengers depending on the van and luggage requirements."
                  ),
                },
                {
                  q: tt("seo.faq.q3", "Where will the driver meet us at BCN Airport?"),
                  a: tt(
                    "seo.faq.a3",
                    "We confirm the terminal (T1/T2) and meeting point in advance. If meet & greet is included, we share clear instructions by WhatsApp."
                  ),
                },
                {
                  q: tt("seo.faq.q4", "Can you take us from the airport to the cruise port?"),
                  a: tt(
                    "seo.faq.a4",
                    "Yes — airport to Barcelona cruise terminals is one of our most popular routes."
                  ),
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
                  <p className="mt-3 text-gray-700 leading-7">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO-friendly internal links */}
      <section className="container-page pb-20 text-center">
        <p className="text-gray-700">
          {t("links.intro")}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href={`${prefix}/cruise-port-transfer-barcelona`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {t("links.cruise")}
          </Link>
          <Link
            href={`${prefix}/faqs`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {t("links.faqs")}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
          >
            {t("links.contact")}
          </Link>
        </div>
      </section>
    </>
  );
}