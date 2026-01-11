import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

const PHONE_E164 = "+34625099099";
const WHATSAPP_E164 = "34625099099";
const EMAIL = "email@taxivanbarcelona.com";
const ADDRESS = "Av Parallel 49, 08001 Barcelona";

export default async function Footer() {
  const year = new Date().getFullYear();

  const locale = await getLocale();
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");

  // localePrefix = "as-needed" behavior: default locale (en) has NO prefix
  const prefix = locale === "en" ? "" : `/${locale}`;
  const hrefs = {
    home: `${prefix || "/"}`,
    airport: `${prefix}/airport-taxi-barcelona`,
    cruise: `${prefix}/cruise-port-transfer-barcelona`,
    longDistance: `${prefix}/long-distance-transfers`,
    privateTransfers: `${prefix}/private-transfers`,
    about: `${prefix}/about-taxi-van-barcelona`,
    contact: `${prefix}/contact`,
    faqs: `${prefix}/faqs`,
    privacy: `${prefix}/privacy-policy`,
    terms: `${prefix}/terms-and-conditions`,
  };

  return (
    <footer className="mt-20 border-t border-black/10 bg-black text-white">
      {/* Accepted Payment Methods */}
      <section className="border-t border-black/10 bg-white">
        <div className="container-page py-10 overflow-hidden">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 px-4 py-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-emerald-500"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-extrabold text-emerald-600">Secure &amp; trusted</span>
            </div>

            <h3 className="mt-4 text-center text-2xl font-extrabold text-black md:text-3xl">
              Accepted Payment Methods
            </h3>
            <p className="mt-2 text-center text-sm text-black/60">
              Secure and convenient — pay with your preferred method
            </p>
          </div>

          <div className="tvb-payments relative mt-8 overflow-hidden">
            {/* edge fade for "banner" look */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 tvb-payments__fade-left" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 tvb-payments__fade-right" />

            <div className="tvb-payments__track" aria-label="Accepted payment methods">
              {[
                { src: "/images/payments/visa.svg", label: "Visa" },
                { src: "/images/payments/mastercard.svg", label: "Mastercard" },
                { src: "/images/payments/maestro.svg", label: "Maestro" },
                { src: "/images/payments/amex.svg", label: "American Express" },
                { src: "/images/payments/stripe.svg", label: "Stripe" },
                { src: "/images/payments/cash.svg", label: "Cash" },
              ]
                .concat([
                  { src: "/images/payments/visa.svg", label: "Visa" },
                  { src: "/images/payments/mastercard.svg", label: "Mastercard" },
                  { src: "/images/payments/maestro.svg", label: "Maestro" },
                  { src: "/images/payments/amex.svg", label: "American Express" },
                  { src: "/images/payments/stripe.svg", label: "Stripe" },
                  { src: "/images/payments/cash.svg", label: "Cash" },
                ])
                .map((item, i) => (
                  <div
                    key={`${item.label}-${i}`}
                    className="tvb-payments__card group flex h-16 w-36 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                    <img
                      src={item.src}
                      alt={item.label}
                      className="max-h-8 max-w-[80%] object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-black/60">
            <div className="inline-flex items-center gap-2">
              <span aria-hidden="true">✅</span>
              <span className="font-semibold">SSL encrypted</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span aria-hidden="true">🔒</span>
              <span className="font-semibold">PCI compliant</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span aria-hidden="true">⚡</span>
              <span className="font-semibold">Instant processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top accent */}
      <div
        aria-hidden
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(217,167,64,0) 0%, rgba(217,167,64,0.85) 20%, rgba(217,167,64,0.85) 80%, rgba(217,167,64,0) 100%)",
        }}
      />

      <div className="container-page py-14">

        {/* Main footer grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={hrefs.home}
                aria-label={tFooter("ariaHome")}
                className="group inline-flex items-center"
              >
                <span
                  className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-black/10 transition group-hover:shadow-md"
                  aria-hidden={false}
                >
                  <img
                    src="/images/Taxi-barcelona.svg"
                    alt={tFooter("logoAlt")}
                    width={160}
                    height={40}
                    style={{ height: 36, width: 160, display: "block" }}
                  />
                </span>
              </Link>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold"
                style={{ background: "rgba(217,167,64,0.18)", color: "rgba(217,167,64,1)" }}>
                24/7
              </span>
            </div>

            <p className="mt-5 text-white/75 leading-7 max-w-xl">
              {tFooter("tagline.p1")}
              <b>{tFooter("tagline.bold")}</b>
              {tFooter("tagline.p2")}
            </p>

            <div className="mt-6 grid gap-3 text-sm">
              <a
                className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition"
                href={`tel:${PHONE_E164}`}
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition group-hover:border-[rgba(217,167,64,0.55)]"
                  aria-hidden
                >
                  📞
                </span>
                <span className="underline-offset-4 group-hover:underline">{PHONE_E164}</span>
              </a>

              <a
                className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition"
                href={`mailto:${EMAIL}`}
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition group-hover:border-[rgba(217,167,64,0.55)]"
                  aria-hidden
                >
                  ✉️
                </span>
                <span className="underline-offset-4 group-hover:underline">{EMAIL}</span>
              </a>

              <div className="inline-flex items-center gap-2 text-white/75">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5"
                  aria-hidden
                >
                  📍
                </span>
                <span>{ADDRESS}</span>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="md:col-span-3">
            <p className="font-extrabold text-white">{tFooter("sections.pages")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={hrefs.airport}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tNav("airport")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={hrefs.cruise}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tNav("cruise")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={hrefs.longDistance}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tNav("longDistance")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={hrefs.about}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tNav("about")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={hrefs.faqs}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tNav("faqs")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={hrefs.contact}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tNav("contact")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-4">
            <p className="font-extrabold text-white">{tFooter("sections.legal")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={hrefs.privacy}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tFooter("legal.privacy")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={hrefs.terms}
                  className="group inline-flex items-center text-white/80 transition hover:text-white"
                >
                  <span className="underline-offset-4 group-hover:underline">{tFooter("legal.terms")}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-4"
                    style={{ background: "rgba(217,167,64,0.9)" }}
                  />
                </Link>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-extrabold">{tFooter("booking.title")}</p>
              <p className="mt-2 text-sm text-white/75 leading-6">
                {tFooter("booking.desc")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP_E164}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    color: "#A7F3D0",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                >
                  {tFooter("booking.whatsapp")}
                </a>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(37,99,235,0.15)",
                    color: "#BFDBFE",
                    border: "1px solid rgba(37,99,235,0.25)",
                  }}
                >
                  {tFooter("booking.call")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/60">
            {tFooter("bottom.copyright", { year } as any)}
          </p>
          <p className="text-xs text-white/60">
            {tFooter("bottom.built")}
          </p>
        </div>
      </div>
    </footer>
  );
}