import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import ExpressBookingCard from "@/components/layout/booking/ExpressBookingCard";
import {
  BRAND,
  localizedAbsoluteUrl,
  metadataAlternates,
  normalizeLocale,
} from "@/config/brand";

const PHONE_E164 = BRAND.phoneRaw;
const WHATSAPP_E164 = BRAND.phoneRaw.replace("+", "");

export async function generateMetadata(): Promise<Metadata> {
  const locale = normalizeLocale(await getLocale());
  const alternates = metadataAlternates(locale, "/faqs");
  return {
    title: "FAQs | Taxi Van Barcelona",
    description:
      "Answers to common questions about Taxi Van Barcelona: pricing, booking, airport and cruise pickups, luggage, child seats, long-distance trips, and more.",
    alternates,
    openGraph: {
      title: "FAQs | Taxi Van Barcelona",
      description:
        "Pricing, booking, airport transfers, cruise port pickup, long-distance trips, child seats, luggage, and more — Taxi Van Barcelona FAQs.",
      url: alternates.canonical,
      type: "website",
    },
  };
}

const faqs = [
  {
    q: "How much is a taxi van from Barcelona Airport to the city center?",
    short:
      "Pricing depends on your exact destination, time, and vehicle size. We confirm fixed pricing before travel so you know the total in advance.",
    details:
      "To avoid surprises, send your terminal and destination on WhatsApp and we’ll confirm the price before your trip.",
  },
  {
    q: "What payment methods do you accept?",
    short:
      "We accept cash and major credit or debit cards, including Visa, Mastercard, and Amex. You can pay in cash to the driver or use a secure online card link.",
    details:
      "For some reservations, we may take a small booking fee to confirm the ride, and the remaining amount can be paid to the driver.",
  },
  {
    q: "What is your cancellation policy?",
    short:
      "More than 24 hours before pickup is free cancellation. Within 24 hours, 50% is refundable, and within 3 hours it is not refundable.",
    details:
      "If your plans change, message us as early as possible and we’ll help you choose the best option.",
  },
  {
    q: "Can I book a 7 or 8 seater taxi van in advance?",
    short:
      "Yes, and advance booking is recommended for 7 or 8 seater vans. This is especially useful for airport arrivals, cruise days, weekends, and early pickups.",
    details:
      "Share your pickup point, time, passenger count, and luggage details, and we’ll confirm availability quickly.",
  },
  {
    q: "Do you offer long-distance taxi trips outside Barcelona?",
    short:
      "Yes, we provide long-distance transfers outside Barcelona. We regularly serve routes across Catalonia and nearby destinations.",
    details:
      "Popular routes include Sitges, Girona, Tarragona, Costa Brava, and Salou. Share your route and timing and we’ll confirm a suitable van and clear quote.",
  },
  {
    q: "Is your service available 24/7?",
    short:
      "Yes, our service operates 24/7. We cover airport transfers, cruise port pickup, city rides, and long-distance trips at all hours.",
    details:
      "If you have a late arrival or early flight, WhatsApp is the fastest way to confirm.",
  },
  {
    q: "Are your drivers English-speaking?",
    short:
      "Yes, our drivers can communicate clearly in English. They work with international travelers every day.",
    details:
      "We also support multiple languages whenever possible, so you can travel with confidence.",
  },
  {
    q: "Can you provide child seats or booster seats?",
    short:
      "Yes, child seats and boosters are available on request. We can prepare the right setup when informed at booking time.",
    details:
      "Tell us the child’s age or height/weight and how many seats you need, and we’ll arrange the correct option.",
  },
  {
    q: "How much luggage can your vans hold?",
    short:
      "Our 4–8 passenger vans are selected for both comfort and luggage capacity. Exact capacity depends on passenger count and suitcase sizes.",
    details:
      "Send a quick note like “6 passengers + 6 large suitcases” and we’ll confirm the best vehicle.",
  },
  {
    q: "Do you offer pickup from the Barcelona Cruise Port?",
    short:
      "Yes, we provide pickup from Barcelona Cruise Port terminals. We transfer directly to hotels, the airport, or any address.",
    details:
      "If your ship timing changes, message us and we’ll adjust pickup smoothly.",
  },
  {
    q: "What areas do you serve?",
    short:
      "We serve Barcelona city, Barcelona Airport (El Prat), cruise terminals, and destinations across Catalonia. Coverage includes both local and regional routes.",
    details:
      "If you’re staying outside the city or planning a day trip, share the route and we’ll confirm availability and pricing.",
  },
  {
    q: "How can I book a taxi van with you?",
    short:
      "The fastest booking method is WhatsApp. Send pickup and drop-off, date and time, passengers, and luggage details.",
    details:
      "You can also call us or use the Contact page. We confirm all details clearly so you can relax before the trip.",
  },
  {
    q: "Do you offer taxi transfers to La Roca Village?",
    short:
      "Yes, we offer transfers to La Roca Village for shopping trips. You can book one-way or round-trip service.",
    details:
      "If you want a return pickup, tell us your preferred return time or expected stay duration and we’ll arrange it.",
  },
  {
    q: "Are your vans wheelchair-accessible?",
    short:
      "Wheelchair-accessible options may be available on request, depending on vehicle availability and your needs. We review each request to confirm the right setup.",
    details:
      "Message us with wheelchair type and passenger details so we can confirm availability and the most suitable vehicle.",
  },
];

export default async function FaqsPage() {
  const locale = normalizeLocale(await getLocale());
  const pagePath = "/faqs";
  const prefix = locale === "en" ? "" : `/${locale}`;
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

      {/* HERO (premium black + gold vignette) */}
      <section className="relative overflow-hidden" style={{ background: "rgb(10,10,10)" }}>
        {/* Gold diagonal accents */}
        <div
          className="absolute inset-0 opacity-50"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(217,167,64,0.92) 0%, rgba(217,167,64,0.92) 8%, transparent 8%, transparent 100%), linear-gradient(315deg, rgba(217,167,64,0.92) 0%, rgba(217,167,64,0.92) 8%, transparent 8%, transparent 100%)",
            backgroundPosition: "left top, right bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "420px 420px, 420px 420px",
          }}
        />
        {/* Soft black→gold fade */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(217,167,64,0.28), transparent 46%), radial-gradient(circle at 82% 78%, rgba(217,167,64,0.20), transparent 52%), linear-gradient(135deg, rgba(217,167,64,0.18) 0%, rgba(0,0,0,0) 45%), linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        <div className="container-page relative py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-white/70 text-sm tracking-wide">Barcelona • Airport • Cruise Port • Long Distance</p>

              <h1 className="mt-4 text-white text-4xl md:text-6xl font-extrabold leading-tight">
                FAQs — Taxi Van Barcelona
              </h1>

              <p className="mt-6 text-white/80 text-lg leading-7 max-w-2xl">
                Quick answers about pricing, booking 4–8 passenger vans, luggage space, child seats, airport transfers,
                cruise port pickup, and long-distance trips.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                {/* Call = Blue */}
                <a
                  href={`tel:${PHONE_E164}`}
                  className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: "#2563EB",
                    color: "#fff",
                  }}
                >
                  Call Now
                </a>

                {/* WhatsApp = Green */}
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
                  WhatsApp
                </a>

                <Link
                  href={`${prefix}/contact`}
                  className="rounded-full px-6 py-3 font-semibold border border-white/25 text-white hover:bg-white/10 transition"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/70 text-sm">
                <span>✓ Fast replies</span>
                <span>✓ Clear quotes</span>
                <span>✓ 24/7 availability</span>
                <span>✓ Group-friendly vans</span>
              </div>
            </div>

            {/* Right side card */}
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

      {/* FAQ Content */}
      <section className="container-page py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Common Questions</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
            We’ve answered the questions we get most from international travelers booking taxi vans in Barcelona.
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
                <strong>Short answer:</strong> {f.short}
              </p>
              <p className="mt-2 text-gray-600 leading-7">
                <strong>Details:</strong> {f.details}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
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
              <h2 className="text-2xl md:text-3xl font-extrabold">Still unsure about your booking?</h2>
              <p className="mt-3 text-white/80 max-w-2xl leading-7">
                Send your pickup, drop-off, date/time, passengers, and luggage — we’ll reply with a clear quote and
                quick confirmation.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`tel:${PHONE_E164}`}
                className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#2563EB", color: "#fff" }}
              >
                Call
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#22C55E", color: "#0b0b0b" }}
              >
                WhatsApp
              </a>
              <Link
                href={`${prefix}/contact`}
                className="rounded-full px-6 py-3 font-semibold border border-white/25 text-white hover:bg-white/10 transition"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
