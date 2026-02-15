import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { BRAND, languageAlternates, SITE_URL } from "@/config/brand";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Taxi Van Barcelona | Airport, Cruise & Long-Distance Transfers",
  description:
    "Book a spacious taxi van in Barcelona for airport transfers, cruise port pickup, and long-distance trips.",
  alternates: {
    canonical: languageAlternates("/").en,
    languages: languageAlternates("/"),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N9QTR7FV');`}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9QTR7FV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* Floating buttons */}
        <div className="floating-actions" aria-label="Quick contact">
          {/* Call */}
          <a
            href={`tel:${BRAND.phoneRaw}`}
            aria-label={`Call ${BRAND.name}`}
            className="floating-action floating-action--call"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
              />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${BRAND.name}`}
            className="floating-action floating-action--wa"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12.04 2C6.58 2 2.14 6.43 2.14 11.9c0 1.93.56 3.82 1.62 5.44L2 22l4.84-1.7a9.86 9.86 0 0 0 5.2 1.45h.01c5.46 0 9.9-4.43 9.9-9.9C21.95 6.43 17.5 2 12.04 2zm5.76 14.02c-.24.69-1.19 1.26-1.92 1.42-.5.11-1.14.2-3.31-.7-2.77-1.15-4.56-3.96-4.7-4.14-.13-.18-1.12-1.49-1.12-2.84 0-1.35.71-2.02.96-2.3.24-.28.53-.35.71-.35h.51c.16 0 .38-.06.6.46.24.58.82 2.01.89 2.16.07.15.12.33.02.52-.1.2-.15.33-.3.5-.15.18-.31.39-.44.52-.15.15-.3.32-.13.62.18.3.77 1.27 1.66 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.71-.17 1.4z"
              />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
