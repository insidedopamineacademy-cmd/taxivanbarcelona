import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.taxivanbarcelona.com" }],
        destination: "https://taxivanbarcelona.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
