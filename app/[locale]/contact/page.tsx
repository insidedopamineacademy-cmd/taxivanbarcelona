import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

const PHONE_E164 = "+34625099099";
const WHATSAPP_E164 = "34625099099";
const EMAIL = "info@taxivanbarcelona.com";
const ADDRESS = "Av Parallel 49, 08001 Barcelona";

const GMAPS_QUERY = encodeURIComponent(ADDRESS);
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${GMAPS_QUERY}`;
const APPLE_MAPS_LINK = `https://maps.apple.com/?q=${GMAPS_QUERY}`;
const MAILTO_LINK = `mailto:${EMAIL}`;
const GMAIL_COMPOSE_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`;

export async function generateMetadata(): Promise<Metadata> {
  let locale = "en";
  try {
    locale = await getLocale();
  } catch {
    // ignore
  }

  let t: any;
  try {
    t = await getTranslations({ locale, namespace: "contact" });
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

  const title = tr("meta.title", "Contact Taxi Van Barcelona | WhatsApp, Call & Address");
  const description = tr(
    "meta.description",
    "Contact Taxi Van Barcelona by WhatsApp or phone 24/7. Find us at Av Parallel 49, 08001 Barcelona. Fast replies for airport, cruise, and long-distance transfers."
  );

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      title: tr("meta.ogTitle", "Contact Taxi Van Barcelona"),
      description: tr(
        "meta.ogDescription",
        "Message us on WhatsApp or call 24/7 for airport, cruise and long-distance transfers in Barcelona."
      ),
      url: "/contact",
      type: "website",
    },
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;

  let t: any;
  try {
    t = await getTranslations({ locale, namespace: "contact" });
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

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        {/* diagonal gold accents */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 10%, transparent 10%), linear-gradient(315deg, rgba(223,178,77,.95) 0%, rgba(223,178,77,.95) 10%, transparent 10%)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top, right bottom",
            backgroundSize: "420px 420px",
            opacity: 0.55,
          }}
        />

        {/* premium black → gold vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(1200px 600px at 15% 10%, rgba(223,178,77,.18), transparent 55%), radial-gradient(900px 500px at 90% 90%, rgba(223,178,77,.12), transparent 55%), linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="container-page relative py-14 md:py-24 pb-20">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm font-semibold tracking-wide">
              {tr("hero.kicker", "Fast replies • Clear pricing • 24/7")}
            </p>

            <h1 className="mt-3 text-white text-4xl md:text-5xl font-extrabold leading-tight">
              {tr("hero.title", "Contact Taxi Van Barcelona")}
            </h1>

            <p className="mt-5 text-white/80 text-lg leading-7">
              {tr(
                "hero.subtitle",
                "Want to book quickly? Message us on WhatsApp, or call directly. We reply fast and confirm your ride details clearly—so you can relax and travel with confidence."
              )}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="btn px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                href={GMAIL_COMPOSE_LINK}
                target="_blank"
                rel="noreferrer"
              >
                {tr("hero.ctaEmail", "Email Us")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING CONTACT CARDS */}
      <section className="container-page relative z-10 -mt-6 md:-mt-10 pb-10">
        <div className="grid gap-5 md:grid-cols-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_E164}`}
            target="_blank"
            rel="noreferrer"
            className="card-float group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition"
          >
            <div className="flex items-start gap-4">
              <div className="icon-badge" aria-hidden>
                {/* WhatsApp icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5 11.9c0 4.7-3.8 8.5-8.5 8.5-1.5 0-2.9-.4-4.1-1.1L3.5 20.5l1.2-4.1c-.8-1.2-1.2-2.7-1.2-4.4C3.5 7.2 7.3 3.4 12 3.4c4.7 0 8.5 3.8 8.5 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M9.3 8.9c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.8 1.9c.1.3.1.5-.1.7l-.4.5c-.1.2-.2.3 0 .6.2.3.8 1.3 1.8 2.1 1.2 1 2.2 1.3 2.5 1.4.3.1.5.1.7-.1l.8-.9c.2-.2.4-.2.7-.1l1.9.9c.3.1.5.3.5.5 0 .2 0 1.1-.5 1.7-.5.6-1.3 1.1-2.2 1-.9-.1-2.6-.6-4.6-2.1-1.9-1.4-3.1-3.1-3.5-3.9-.4-.8-1-2.1-.9-3.2.1-1 .7-1.8 1.2-2.4Z"
                    fill="currentColor"
                    opacity=".9"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      {tr("cards.whatsapp.label", "WhatsApp")}
                    </p>
                    <p className="mt-2 text-xl font-extrabold">
                      {tr("cards.whatsapp.title", "Message us 24/7")}
                    </p>
                  </div>
                  <span className="pill-gold">{tr("cards.whatsapp.badge", "Recommended")}</span>
                </div>

                <p className="mt-2 text-gray-600 leading-7">
                  {tr(
                    "cards.whatsapp.desc",
                    "Fast replies, perfect for airport pickups, cruise terminals, and group travel."
                  )}
                </p>

                <p className="mt-5 font-semibold text-gold">{tr("cards.whatsapp.cta", "Open WhatsApp →")}</p>
              </div>
            </div>
          </a>

          {/* Call */}
          <a
            href={`tel:${PHONE_E164}`}
            className="card-float group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition"
          >
            <div className="flex items-start gap-4">
              <div className="icon-badge" aria-hidden>
                {/* Phone icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.7 3.8h2c.5 0 .9.3 1 .7l.7 2.9c.1.5 0 .9-.4 1.2l-1.4 1c.9 1.9 2.4 3.4 4.3 4.3l1-1.4c.3-.4.8-.5 1.2-.4l2.9.7c.5.1.7.5.7 1v2c0 .6-.4 1.1-1 1.2-1.2.2-2.5.2-3.7 0-6.2-1.2-11-6-12.2-12.2-.2-1.2-.2-2.5 0-3.7.1-.6.6-1 1.2-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">{tr("cards.call.label", "Call")}</p>
                <p className="mt-2 text-xl font-extrabold">{tr("cards.call.title", "Speak to a driver")}</p>
                <p className="mt-2 text-gray-600 leading-7">
                  {tr(
                    "cards.call.desc",
                    "Ideal for urgent pickups, timing updates, or last‑minute changes."
                  )}
                </p>
                <p className="mt-5 font-semibold text-gold">{tr("cards.call.cta", "Call now →")}</p>
              </div>
            </div>
          </a>

          {/* Email */}
          <a
            href={GMAIL_COMPOSE_LINK}
            target="_blank"
            rel="noreferrer"
            className="card-float group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition"
          >
            <div className="flex items-start gap-4">
              <div className="icon-badge" aria-hidden>
                {/* Email icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 7.5c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2h-11c-1.1 0-2-.9-2-2v-9Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M6 8.5 12 13l6-4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">{tr("cards.email.label", "Email")}</p>
                <p className="mt-2 text-xl font-extrabold">{tr("cards.email.title", "Send a request")}</p>
                <p className="mt-2 text-gray-600 leading-7">
                  {tr(
                    "cards.email.desc",
                    "Best for corporate requests, invoices, or multi‑day planning."
                  )}
                </p>
                <p className="mt-5 font-semibold text-gold">{tr("cards.email.cta", "Send email →")}</p>
                <p className="mt-2 text-sm text-gray-500 break-words">{EMAIL}</p>
                <p className="mt-1 text-sm">
                  <a className="underline text-gray-600 hover:text-black" href={MAILTO_LINK}>
                    {tr("cards.email.fallback", "Open in your email app")}
                  </a>
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FIND US (BAR DOWNWARDS) */}
      <section className="container-page pb-16 md:pb-20">
        <div className="rounded-3xl border border-black/10 bg-white shadow-sm overflow-hidden">
          {/* Address bar */}
          <div className="p-6 md:p-7">
            <p className="text-sm font-semibold text-gray-500">{tr("find.title", "Where to find us")}</p>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-2xl font-extrabold">{ADDRESS}</p>
                <p className="mt-2 text-gray-600 leading-7">
                  {tr(
                    "find.subtitle",
                    "If you prefer, you can open the location instantly on Google Maps or Apple Maps."
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  className="btn btn-gold"
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tr("find.google", "Open in Google Maps")}
                </a>
                <a
                  className="btn px-6 py-3 rounded-full border border-black/15 hover:bg-black/5 font-semibold"
                  href={APPLE_MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tr("find.apple", "Open in Apple Maps")}
                </a>
              </div>
            </div>
          </div>

          {/* Map (drops downward) */}
          <div className="h-[360px] md:h-[420px] border-t border-black/10">
            <iframe
              title="Taxi Van Barcelona location map"
              src={`https://www.google.com/maps?q=${GMAPS_QUERY}&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* SMALL INTERNAL LINKS */}
      <section className="container-page pb-20 text-center">
        <p className="text-gray-700">{tr("links.title", "Looking for a specific service? Explore:")}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={`${prefix}/airport-taxi-barcelona`} className="btn btn-outline">
            {tr("links.airport", "Airport Taxi")}
          </Link>
          <Link href={`${prefix}/cruise-port-transfer-barcelona`} className="btn btn-outline">
            {tr("links.cruise", "Cruise Port Pickup")}
          </Link>
          <Link href={`${prefix}/long-distance-transfers`} className="btn btn-outline">
            {tr("links.longDistance", "Long Distance")}
          </Link>
        </div>
      </section>
    </>
  );
}