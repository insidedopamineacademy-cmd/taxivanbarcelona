"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname() || "/";

  const SUPPORTED_LOCALES = ["en", "es", "de", "it"] as const;
  type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

  const t = useTranslations();

  // Derive the active locale from the URL
  const routeLocale: SupportedLocale = useMemo(() => {
    const p = pathname.split("?")[0] || "/";
    const segs = p.split("/").filter(Boolean);
    const first = segs[0];
    if (first && (SUPPORTED_LOCALES as readonly string[]).includes(first)) {
      return first as SupportedLocale;
    }
    return "en";
  }, [pathname]);

  const desktopLangRef = useRef<HTMLDetailsElement | null>(null);
  const mobileLangRef = useRef<HTMLDetailsElement | null>(null);

  const closeLangMenus = () => {
    if (desktopLangRef.current) desktopLangRef.current.open = false;
    if (mobileLangRef.current) mobileLangRef.current.open = false;
  };

  const langPanelStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "absolute",
      top: "calc(100% + 10px)",
      right: 0,
      zIndex: 9999,
      minWidth: 220,
      background: "rgba(255,255,255,0.98)",
      border: "1px solid rgba(2,6,23,0.10)",
      borderRadius: 14,
      padding: 8,
      boxShadow: "0 18px 60px rgba(2,6,23,0.18)",
      backdropFilter: "blur(10px)",
    }),
    []
  );

  const langItemStyle = useMemo<React.CSSProperties>(
    () => ({
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 10px",
      borderRadius: 10,
      textDecoration: "none",
      color: "inherit",
      whiteSpace: "nowrap",
    }),
    []
  );

  const stripLocaleFromPath = (path: string) => {
    const parts = path.split("?");
    const p = parts[0] || "/";
    const qs = parts[1] ? `?${parts[1]}` : "";

    const segs = p.split("/").filter(Boolean);
    if (segs.length > 0 && (SUPPORTED_LOCALES as readonly string[]).includes(segs[0])) {
      const rest = "/" + segs.slice(1).join("/");
      const clean = rest === "/" ? "/" : rest.replace(/\/$/, "");
      return clean + qs;
    }
    return (p === "" ? "/" : p) + qs;
  };

  const basePath = stripLocaleFromPath(pathname);

  const hrefForLocale = (l: SupportedLocale) => {
    if (l === "en") return basePath || "/";
    const p = basePath.startsWith("/") ? basePath : `/${basePath}`;
    return `/${l}${p === "/" ? "" : p}`;
  };

  const localeLabel: Record<SupportedLocale, { code: string; label: string; flag: string }> = {
    en: { code: "EN", label: "English", flag: "🇬🇧" },
    es: { code: "ES", label: "Español", flag: "🇪🇸" },
    de: { code: "DE", label: "Deutsch", flag: "🇩🇪" },
    it: { code: "IT", label: "Italiano", flag: "🇮🇹" },
  };

  const current = routeLocale;

  // localePrefix = "as-needed" behavior: default locale (en) has NO prefix
  const prefix = current === "en" ? "" : `/${current}`;

  const hrefs = {
    home: `${prefix || "/"}`,
    airport: `${prefix}/airport-taxi-barcelona`,
    cruise: `${prefix}/cruise-port-transfer-barcelona`,
    longDistance: `${prefix}/long-distance-transfers`,
    privateTransfers: `${prefix}/private-transfers`,
    about: `${prefix}/about-taxi-van-barcelona`,
    contact: `${prefix}/contact`,
    faqs: `${prefix}/faqs`,
  };

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Responsive: render mobile lang switch outside hamburger only on small screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setIsMobile(mq.matches);
    apply();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }

    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close language menus when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      const d = desktopLangRef.current;
      const m = mobileLangRef.current;
      if (d && d.open && target && !d.contains(target)) d.open = false;
      if (m && m.open && target && !m.contains(target)) m.open = false;
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        {/* Logo */}
        <Link
          href={hrefs.home}
          className="brand"
          aria-label={t("header.ariaHome")}
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/images/Taxi-barcelona.svg"
            alt={t("header.ariaHome")}
            width={190}
            height={48}
            className="brand-logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Primary">
          <Link href={hrefs.airport} className="nav-link">
            {t("nav.airport")}
          </Link>
          <Link href={hrefs.cruise} className="nav-link">
            {t("nav.cruise")}
          </Link>
          <Link href={hrefs.longDistance} className="nav-link">
            {t("nav.longDistance")}
          </Link>
          <Link href={hrefs.privateTransfers} className="nav-link">
            {t("nav.privateTransfers")}
          </Link>
          <Link href={hrefs.about} className="nav-link">
            {t("nav.about")}
          </Link>
          <Link href={hrefs.contact} className="nav-link">
            {t("nav.contact")}
          </Link>
          <Link href={hrefs.faqs} className="nav-link">
            {t("nav.faqs")}
          </Link>
        </nav>

        {/* Desktop Language Switch */}
        {!isMobile && (
          <div className="header-ctas header-ctas--desktop">
            <details
              ref={desktopLangRef}
              className="lang-switch lang-switch--desktop"
              style={{ position: "relative" }}
            >
              <summary className="cta-btn cta-call" aria-label={t("header.language")}>
                <span aria-hidden="true" style={{ marginRight: 8 }}>
                  {localeLabel[current].flag}
                </span>
                {localeLabel[current].code}
              </summary>
              <div className="lang-switch__panel" role="menu" style={langPanelStyle}>
                {SUPPORTED_LOCALES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className="lang-switch__item"
                    role="menuitem"
                    style={{
                      ...langItemStyle,
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setMenuOpen(false);
                      closeLangMenus();
                      window.location.href = hrefForLocale(l);
                    }}
                  >
                    <span aria-hidden="true" style={{ marginRight: 10 }}>
                      {localeLabel[l].flag}
                    </span>
                    <span style={{ flex: 1 }}>{localeLabel[l].label}</span>
                    <span style={{ opacity: 0.7, fontWeight: 700 }}>{localeLabel[l].code}</span>
                  </button>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* Mobile Language Switch (outside hamburger, right before it) */}
        {isMobile && (
          <details
            ref={mobileLangRef}
            className="lang-switch lang-switch--mobile"
            style={{ position: "relative", marginLeft: "auto" }}
          >
            <summary className="cta-btn cta-call" aria-label={t("header.language")}>
              <span aria-hidden="true" style={{ marginRight: 8 }}>
                {localeLabel[current].flag}
              </span>
              {localeLabel[current].code}
            </summary>
            <div className="lang-switch__panel" role="menu" style={langPanelStyle}>
              {SUPPORTED_LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  className="lang-switch__item"
                  role="menuitem"
                  style={{
                    ...langItemStyle,
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    closeLangMenus();
                    window.location.href = hrefForLocale(l);
                  }}
                >
                  <span aria-hidden="true" style={{ marginRight: 10 }}>
                    {localeLabel[l].flag}
                  </span>
                  <span style={{ flex: 1 }}>{localeLabel[l].label}</span>
                  <span style={{ opacity: 0.7, fontWeight: 700 }}>{localeLabel[l].code}</span>
                </button>
              ))}
            </div>
          </details>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="menu-icon">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`menu-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile Drawer */}
      <aside className={`menu-drawer ${menuOpen ? "open" : ""}`}>
        <div className="menu-drawer-head">
          <div className="menu-drawer-title">{t("header.menu")}</div>
          <button
            className="menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label={t("header.closeMenu")}
          >
            ✕
          </button>
        </div>

        <nav className="nav-mobile">
          <Link href={hrefs.airport} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.airport")}
          </Link>
          <Link href={hrefs.cruise} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.cruise")}
          </Link>
          <Link href={hrefs.longDistance} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.longDistance")}
          </Link>
          <Link href={hrefs.privateTransfers} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.privateTransfers")}
          </Link>
          <Link href={hrefs.about} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.about")}
          </Link>
          <Link href={hrefs.contact} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.contact")}
          </Link>
          <Link href={hrefs.faqs} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>
            {t("nav.faqs")}
          </Link>
        </nav>
      </aside>
    </header>
  );
}