import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, type AppLocale, localizedAbsoluteUrl } from "@/config/brand";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/airport-taxi-barcelona", priority: 0.8 },
  { path: "/cruise-port-transfer-barcelona", priority: 0.8 },
  { path: "/long-distance-transfers", priority: 0.8 },
  { path: "/private-transfers", priority: 0.8 },
  { path: "/about-taxi-van-barcelona", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/faqs", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.5 },
  { path: "/terms-and-conditions", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Root URL.
  entries.push({
    url: localizedAbsoluteUrl("en", "/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: localizedAbsoluteUrl(locale as AppLocale, "/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    });

    for (const route of ROUTES) {
      if (route.path === "/") continue;
      entries.push({
        url: localizedAbsoluteUrl(locale as AppLocale, route.path),
        lastModified: now,
        changeFrequency: "weekly",
        priority: route.priority,
      });
    }
  }

  return entries;
}
