

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
  const alternates = metadataAlternates(locale, "/privacy-policy");
  return {
    title: "Privacy Policy | Taxi Van Barcelona",
    description:
      "Read Taxi Van Barcelona’s Privacy Policy: what data we collect, how we use it, and your rights under GDPR.",
    alternates,
    openGraph: {
      title: "Privacy Policy | Taxi Van Barcelona",
      description:
        "Taxi Van Barcelona Privacy Policy (GDPR): data collection, use, retention, and your rights.",
      url: alternates.canonical,
      type: "website",
    },
  };
}

export default async function PrivacyPolicyPage() {
  const locale = normalizeLocale(await getLocale());
  const pagePath = "/privacy-policy";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const updatedDate = "December 21, 2025";

  const jsonLd = {
    "@type": "WebPage",
    name: "Privacy Policy",
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
        name: "Privacy Policy",
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
        id="privacy-jsonld"
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
          <p className="text-white/70 text-sm tracking-wide">Legal • GDPR</p>
          <h1 className="mt-4 text-white text-4xl md:text-6xl font-extrabold leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-6 text-white/80 text-lg leading-7 max-w-3xl">
            This Privacy Policy explains how {BUSINESS_NAME} collects, uses, and protects your personal
            data when you visit our website or contact us to book a ride.
          </p>

          <div className="mt-8 text-white/70 text-sm">
            <span className="font-semibold text-white/85">Last updated:</span> {updatedDate}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Quick contact card */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-extrabold">Controller & Contact</h2>
            <p className="mt-3 text-gray-700 leading-7">
              For privacy questions, requests, or concerns, contact us using the details below.
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

          {/* Sections */}
          <div className="mt-12 space-y-10">
            <Section title="1) What data we collect">
              <p className="text-gray-700 leading-7">
                We collect data that you provide directly and data collected automatically when you use the website.
              </p>
              <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <b>Booking and contact data:</b> name (if provided), phone number, WhatsApp messages, email address,
                  pickup/drop-off details, date/time, passengers, luggage notes, and any messages you send.
                </li>
                <li>
                  <b>Technical data:</b> IP address, device/browser information, pages visited, and basic analytics events
                  (where enabled).
                </li>
              </ul>
            </Section>

            <Section title="2) How we use your data">
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To reply to your enquiries and confirm bookings.</li>
                <li>To provide the service (airport pickup, cruise transfer, long-distance trips, etc.).</li>
                <li>To communicate important updates (timing, meeting point details, changes).</li>
                <li>To improve our website and services through aggregated analytics (where enabled).</li>
                <li>To comply with legal obligations when applicable.</li>
              </ul>
            </Section>

            <Section title="3) Legal bases (GDPR)">
              <p className="text-gray-700 leading-7">
                We process personal data under one or more of the following legal bases:
              </p>
              <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <b>Contract / steps before a contract:</b> to provide quotes and complete your requested transfer.
                </li>
                <li>
                  <b>Legitimate interests:</b> to improve service quality, prevent abuse, and keep the website secure.
                </li>
                <li>
                  <b>Consent:</b> where you choose to contact us via WhatsApp/email, or where cookies/analytics require consent.
                </li>
                <li>
                  <b>Legal obligation:</b> where we must keep records or comply with applicable law.
                </li>
              </ul>
            </Section>

            <Section title="4) Cookies and analytics">
              <p className="text-gray-700 leading-7">
                Our website may use cookies and similar technologies to ensure basic functionality and (optionally)
                measure performance. If we use analytics tools (e.g., Google Analytics / Google Tag Manager), they may
                set cookies or collect usage data to help us understand website performance.
              </p>
              <p className="mt-4 text-gray-700 leading-7">
                If a cookie banner is enabled, you can manage your preferences there. If you have questions, contact us
                at <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </Section>

            <Section title="5) Sharing your data">
              <p className="text-gray-700 leading-7">
                We do not sell your personal data. We may share data only when necessary:
              </p>
              <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <b>Service providers:</b> hosting, analytics, communication platforms (e.g., WhatsApp), and payment
                  providers where relevant.
                </li>
                <li>
                  <b>Operational needs:</b> sharing trip details with the assigned driver to complete the service.
                </li>
                <li>
                  <b>Legal reasons:</b> if required by law or to protect our rights and safety.
                </li>
              </ul>
            </Section>

            <Section title="6) International transfers">
              <p className="text-gray-700 leading-7">
                Some providers (for example, messaging or analytics services) may process data outside the European
                Economic Area. Where applicable, we rely on appropriate safeguards (such as Standard Contractual Clauses)
                or other valid transfer mechanisms.
              </p>
            </Section>

            <Section title="7) Data retention">
              <p className="text-gray-700 leading-7">
                We keep personal data only as long as needed for booking management, customer support, accounting,
                and legal compliance. Retention periods vary by purpose and may be extended when required by law.
              </p>
            </Section>

            <Section title="8) Security">
              <p className="text-gray-700 leading-7">
                We take reasonable technical and organizational measures to protect your data against unauthorized
                access, loss, or misuse. However, no method of transmission or storage is 100% secure.
              </p>
            </Section>

            <Section title="9) Your rights (GDPR)">
              <p className="text-gray-700 leading-7">
                Depending on your location and applicable law, you may have the right to:
              </p>
              <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion (where applicable)</li>
                <li>Object to or restrict certain processing</li>
                <li>Data portability (in certain cases)</li>
                <li>Withdraw consent (where processing is based on consent)</li>
                <li>File a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-4 text-gray-700 leading-7">
                To exercise your rights, contact us at <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </Section>

            <Section title="10) Children’s privacy">
              <p className="text-gray-700 leading-7">
                Our services are intended for adults. We do not knowingly collect personal data from children without
                appropriate consent.
              </p>
            </Section>

            <Section title="11) Changes to this policy">
              <p className="text-gray-700 leading-7">
                We may update this Privacy Policy from time to time. We will post the updated version on this page and
                revise the “Last updated” date above.
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
                <h2 className="text-2xl md:text-3xl font-extrabold">Need help with a booking?</h2>
                <p className="mt-3 text-white/80 max-w-2xl leading-7">
                  For transfers and quotes, the fastest way is WhatsApp. You can also call or use the Contact page.
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
