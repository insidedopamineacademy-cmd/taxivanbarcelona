

import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import {
  BRAND,
  localizedAbsoluteUrl,
  metadataAlternates,
  normalizeLocale,
} from "@/config/brand";

const BUSINESS_NAME = BRAND.name;
const WEBSITE_URL = "https://taxivanbarcelona.com";
const CONTACT_EMAIL = BRAND.email;
const PHONE_E164 = BRAND.phoneRaw;
const ADDRESS = `${BRAND.address.street}, ${BRAND.address.postalCode} ${BRAND.address.city}, ${BRAND.address.country}`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = normalizeLocale(await getLocale());
  const alternates = metadataAlternates(locale, "/terms-and-conditions");
  return {
    title: "Terms & Conditions | Taxi Van Barcelona",
    description:
      "Read Taxi Van Barcelona’s Terms & Conditions for bookings, payments, cancellations, and service policies.",
    alternates,
    openGraph: {
      title: "Terms & Conditions | Taxi Van Barcelona",
      description:
        "Taxi Van Barcelona Terms & Conditions: bookings, payments, cancellations, and service rules.",
      url: alternates.canonical,
      type: "website",
    },
  };
}

export default async function TermsAndConditionsPage() {
  const locale = normalizeLocale(await getLocale());
  const pagePath = "/terms-and-conditions";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const updatedDate = "December 21, 2025";

  const jsonLd = {
    "@type": "WebPage",
    name: "Terms & Conditions",
    url: localizedAbsoluteUrl(locale, pagePath),
    isPartOf: {
      "@type": "WebSite",
      name: BUSINESS_NAME,
      url: WEBSITE_URL,
    },
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
        name: "Terms & Conditions",
        item: localizedAbsoluteUrl(locale, pagePath),
      },
    ],
  };
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [jsonLd, breadcrumbJsonLd],
  };

  return (
    <>
      <script
        id="terms-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        {/* Gold diagonal accents */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(217,167,64,0.92) 0%, rgba(217,167,64,0.92) 8%, transparent 8%, transparent 100%), linear-gradient(315deg, rgba(217,167,64,0.92) 0%, rgba(217,167,64,0.92) 8%, transparent 8%, transparent 100%)",
            backgroundPosition: "left top, right bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "420px 420px, 420px 420px",
            opacity: 0.5,
          }}
        />
        {/* Soft black→gold vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(217,167,64,0.28), transparent 46%), radial-gradient(circle at 82% 78%, rgba(217,167,64,0.20), transparent 52%), linear-gradient(135deg, rgba(217,167,64,0.18) 0%, rgba(0,0,0,0) 45%), linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        <div className="container-page relative py-16 md:py-24">
          <p className="text-white/70 text-sm tracking-wide">Legal</p>
          <h1 className="mt-4 text-white text-4xl md:text-6xl font-extrabold leading-tight">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-white/80 text-lg leading-7 max-w-3xl">
            These Terms & Conditions explain how bookings work with {BUSINESS_NAME}, including payments,
            cancellations, and service rules.
          </p>

          <div className="mt-8 text-white/70 text-sm">
            <span className="font-semibold text-white/85">Last updated:</span> {updatedDate}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Quick business card */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-extrabold">Company details</h2>
            <p className="mt-3 text-gray-700 leading-7">
              For questions about these terms, contact us:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <p className="text-sm font-semibold text-gray-500">Business</p>
                <p className="mt-1 font-extrabold">{BUSINESS_NAME}</p>
                <p className="mt-2 text-gray-700">{ADDRESS}</p>
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <p className="text-sm font-semibold text-gray-500">Contact</p>
                <p className="mt-1 text-gray-700">
                  Email: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
                <p className="mt-1 text-gray-700">
                  Phone: <a className="underline" href={`tel:${PHONE_E164}`}>{PHONE_E164}</a>
                </p>
                <p className="mt-1 text-gray-700">
                  Website: <a className="underline" href={WEBSITE_URL} target="_blank" rel="noreferrer">{WEBSITE_URL}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-10">
            <Section title="1) Bookings and confirmations">
              <p className="text-gray-700 leading-7">
                You can request a booking by WhatsApp, phone, or via our Contact page. A booking is confirmed only
                when we accept it and provide confirmation (for example, by message or call). We may request additional
                details to confirm the pickup correctly.
              </p>
            </Section>

            <Section title="2) Prices and quotes">
              <p className="text-gray-700 leading-7">
                Prices depend on the route, time, number of passengers, luggage, and vehicle type. Where we provide a
                quote, the quote is intended to be clear and agreed before travel. If there are major changes to the
                booking (for example, new stops, different destination, large delays, extra passengers), the price may
                change and we will confirm it with you.
              </p>
            </Section>

            <Section title="3) Payments">
              <p className="text-gray-700 leading-7">
                We accept cash and major credit/debit cards. You can pay the driver in cash, or we can send you a
                secure payment link to pay by card online. For some reservations, we take a small booking fee to
                confirm the booking—then the remaining amount can be paid to the driver.
              </p>
            </Section>

            <Section title="4) Cancellations and refunds">
              <p className="text-gray-700 leading-7">
                Our cancellation policy is:
              </p>
              <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <b>More than 24 hours before pickup:</b> free cancellation.
                </li>
                <li>
                  <b>Within 24 hours of pickup:</b> 50% refundable.
                </li>
                <li>
                  <b>Within 3 hours of pickup:</b> not refundable.
                </li>
              </ul>
              <p className="mt-4 text-gray-700 leading-7">
                Refunds are processed to the original payment method where applicable. If you paid a booking fee, we
                will explain how it applies to refunds in your confirmation message.
              </p>
            </Section>

            <Section title="5) Waiting time and delays">
              <p className="text-gray-700 leading-7">
                Please be ready at the agreed meeting point at the agreed time. If you expect a delay, message or call
                us as soon as possible. For airport or cruise pickups, we may include a waiting period in the quote.
                Extended waiting or significant delays may result in additional charges.
              </p>
            </Section>

            <Section title="6) Passenger responsibilities">
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate pickup and drop-off details.</li>
                <li>Ensure the number of passengers and luggage details are correct.</li>
                <li>Use seatbelts and follow the driver’s safety instructions.</li>
                <li>Children must use appropriate child seats/boosters where required; request them in advance.</li>
              </ul>
            </Section>

            <Section title="7) Luggage and vehicle suitability">
              <p className="text-gray-700 leading-7">
                Vehicle assignment depends on passengers and luggage. If luggage details are not provided or change
                significantly, we may need to assign a different vehicle or adjust the price. Please share luggage
                details (for example, “6 passengers + 6 large suitcases”).
              </p>
            </Section>

            <Section title="8) Changes to the booking">
              <p className="text-gray-700 leading-7">
                If you need to change the pickup time, location, destination, or stops, contact us as early as
                possible. We will confirm whether the change is possible and whether it affects the price.
              </p>
            </Section>

            <Section title="9) Service limitations">
              <p className="text-gray-700 leading-7">
                We may refuse or cancel a booking if it is not possible to complete safely, if information provided is
                incorrect, or in situations beyond our control (for example, severe weather, road closures, strikes,
                or major events). In such cases, we will try to propose an alternative solution.
              </p>
            </Section>

            <Section title="10) Website use">
              <p className="text-gray-700 leading-7">
                You agree not to misuse the website, attempt to disrupt its operation, or use it for unlawful purposes.
                Content on this site is provided for general information.
              </p>
            </Section>

            <Section title="11) Liability">
              <p className="text-gray-700 leading-7">
                To the extent permitted by law, {BUSINESS_NAME} is not liable for indirect or consequential losses.
                Nothing in these terms limits liability where it cannot be limited under applicable law.
              </p>
            </Section>

            <Section title="12) Governing law">
              <p className="text-gray-700 leading-7">
                These terms are governed by the laws applicable in Spain. Where required, disputes will be handled by
                the competent courts.
              </p>
            </Section>

            <Section title="13) Changes to these terms">
              <p className="text-gray-700 leading-7">
                We may update these Terms & Conditions from time to time. We will publish the updated version on this
                page and revise the “Last updated” date above.
              </p>
            </Section>
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
                <h2 className="text-2xl md:text-3xl font-extrabold">Need a quote or booking confirmation?</h2>
                <p className="mt-3 text-white/80 max-w-2xl leading-7">
                  Send your pickup, drop-off, date/time, passengers, and luggage — we’ll confirm quickly.
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
                  href={`https://wa.me/${PHONE_E164.replace("+", "")}`}
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
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-gray-500">
            This page provides general information and is not legal advice. If you require legal guidance, consult a qualified professional.
          </p>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-xl md:text-2xl font-extrabold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
