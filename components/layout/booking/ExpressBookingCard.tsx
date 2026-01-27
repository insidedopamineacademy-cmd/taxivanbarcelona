"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useMessages, useTranslations } from "next-intl";

declare global {
  interface Window {
    google?: any;
  }
}

type WhenMode = "now" | "schedule";

type BookingStrings = {
  title?: string;
  subtitle?: string;
  pickupPlaceholder?: string;
  destinationPlaceholder?: string;
  phonePlaceholder?: string;
  phoneLabel?: string;
  waPhone?: string;
  useMyLocationAria?: string;
  whenLabel?: string;
  whenNow?: string;
  whenSchedule?: string;
  whenAsapHint?: string;
  whenChooseHint?: string;
  dateLabel?: string;
  timeLabel?: string;
  estimatedTimeLabel?: string;
  distanceLabelShort?: string;
  passengersLabel?: string;
  luggageLabel?: string;
  passengerSingular?: string;
  passengerPlural?: string;
  bagSingular?: string;
  bagPlural?: string;
  etaCalculating?: string;
  etaLabel?: string;
  distanceLabel?: string;
  tipText?: string;
  sendViaWhatsApp?: string;
  errorPickupDropoff?: string;
  errorChooseDateTime?: string;
  errorMissingPickup?: string;
  errorMissingDestination?: string;
  errorChooseDateTimeResolved?: string;
  locUnsupported?: string;
  locPermissionDenied?: string;
  googleMissingKey?: string;
  googleUnavailable?: string;

  // WhatsApp message lines
  waHeader?: string;
  waPickup?: string;
  waDropoff?: string;
  waDateTime?: string;
  waPassengers?: string;
  waLuggage?: string;
  waPassengersLuggage?: string;
  waEta?: string;
  waDistance?: string;
  waNotes?: string;
  waExtraDetails?: string;
};

type Props = {
  whatsappE164: string;
  title?: string;
  subtitle?: string;
  className?: string;
  strings?: BookingStrings;
};

function loadGooglePlaces(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>('script[data-google-places="true"]');
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Google script")), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.dataset.googlePlaces = "true";
    s.async = true;
    s.defer = true;
    s.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}` +
      `&libraries=places&v=weekly`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Google script"));
    document.head.appendChild(s);
  });
}

export default function ExpressBookingCard({
  whatsappE164,
  title,
  subtitle,
  className = "",
  strings,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const locale = useLocale();
  const messages = useMessages() as any;
  const tCard = useTranslations("booking.card");
  const tWa = useTranslations("booking.whatsapp");

  const tc = (key: string, fallback: string) => {
    const cardMsgs = messages?.booking?.card;
    if (cardMsgs && Object.prototype.hasOwnProperty.call(cardMsgs, key)) {
      try {
        return tCard(key as any);
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  const tw = (key: string, fallback: string) => {
    const waMsgs = messages?.booking?.whatsapp;
    if (waMsgs && Object.prototype.hasOwnProperty.call(waMsgs, key)) {
      try {
        return tWa(key as any);
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  const s: Required<BookingStrings> = useMemo(
    () => ({
      title: title || strings?.title || tc("title", "Express Booking"),
      subtitle:
        subtitle ||
        strings?.subtitle ||
        tc("subtitle", "Enter your route — opens WhatsApp with your details prefilled."),

      pickupPlaceholder: strings?.pickupPlaceholder || tc("pickupPlaceholder", "Pickup location"),
      destinationPlaceholder: strings?.destinationPlaceholder || tc("destinationPlaceholder", "Destination"),
      phonePlaceholder: strings?.phonePlaceholder || tc("phonePlaceholder", "Phone number"),
      phoneLabel: strings?.phoneLabel || tc("phoneLabel", "Phone"),
      useMyLocationAria:
        strings?.useMyLocationAria || tc("useMyLocationAria", "Use my current location for pickup"),
      whenLabel: strings?.whenLabel || tc("whenLabel", "When?"),
      whenNow: strings?.whenNow || tc("whenNow", "Now"),
      whenSchedule: strings?.whenSchedule || tc("whenSchedule", "Schedule"),
      whenAsapHint: strings?.whenAsapHint || tc("whenAsapHint", "ASAP pickup"),
      whenChooseHint: strings?.whenChooseHint || tc("whenChooseHint", "Choose date & time."),
      dateLabel: strings?.dateLabel || tc("dateLabel", "Date"),
      timeLabel: strings?.timeLabel || tc("timeLabel", "Time"),
      estimatedTimeLabel: strings?.estimatedTimeLabel || tc("estimatedTimeLabel", "ETA"),
      distanceLabelShort: strings?.distanceLabelShort || tc("distanceLabelShort", "Distance"),
      passengersLabel: strings?.passengersLabel || tc("passengersLabel", "Passengers"),
      luggageLabel: strings?.luggageLabel || tc("luggageLabel", "Luggage"),
      passengerSingular: strings?.passengerSingular || "Passenger",
      passengerPlural: strings?.passengerPlural || "Passengers",
      bagSingular: strings?.bagSingular || "Bag",
      bagPlural: strings?.bagPlural || "Bags",
      etaCalculating: strings?.etaCalculating || tc("etaCalculating", "Calculating…"),
      etaLabel: strings?.etaLabel || tc("estimatedTimeLabel", "ETA"),
      distanceLabel: strings?.distanceLabel || "",
      tipText: strings?.tipText || tc("tip", "💡 Use exact hotel/terminal names for faster confirmation."),
      sendViaWhatsApp: strings?.sendViaWhatsApp || tc("sendViaWhatsApp", "Send via WhatsApp"),
      errorPickupDropoff: strings?.errorPickupDropoff || "",
      errorChooseDateTime: strings?.errorChooseDateTime || "",
      errorMissingPickup: strings?.errorPickupDropoff || tc("errors.missingPickup", "Please enter a pickup location."),
      errorMissingDestination:
        strings?.errorPickupDropoff || tc("errors.missingDestination", "Please enter a destination."),
      errorChooseDateTimeResolved: strings?.errorChooseDateTime || "Please choose a date and time.",
      locUnsupported:
        strings?.locUnsupported ||
        tc("errors.geolocationUnsupported", "Current location is not supported on this browser."),
      locPermissionDenied:
        strings?.locPermissionDenied ||
        tc("errors.geolocationDenied", "Could not get your location. Please allow location permission."),
      googleMissingKey:
        strings?.googleMissingKey ||
        tc(
          "errors.mapsMissingKey",
          "Google location search is not configured. You can still type addresses manually."
        ),
      googleUnavailable:
        strings?.googleUnavailable ||
        tc(
          "errors.mapsUnavailable",
          "Google location search is unavailable. You can still type addresses manually."
        ),

      waHeader: strings?.waHeader || tw("header", "New booking request"),
      waPickup: strings?.waPickup || tw("pickup", "Pickup"),
      waDropoff: strings?.waDropoff || tw("dropoff", "Drop-off"),
      waDateTime: strings?.waDateTime || tw("when", "When"),
      waPassengers: strings?.waPassengers || tw("passengers", "Passengers"),
      waLuggage: strings?.waLuggage || tw("luggage", "Luggage"),
      waPassengersLuggage: strings?.waPassengersLuggage || "",
      waEta: strings?.waEta || tw("eta", "ETA"),
      waDistance: strings?.waDistance || tw("distance", "Distance"),
      waPhone: strings?.waPhone || tw("phone", "Phone"),
      waNotes: strings?.waNotes || tw("notes", "Notes"),
      waExtraDetails: strings?.waExtraDetails || tw("notes", "Notes"),
    }),
    [locale, messages, title, subtitle, strings]
  );

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const dropoffRef = useRef<HTMLInputElement | null>(null);

  const [googleReady, setGoogleReady] = useState(false);
  const [googleFailed, setGoogleFailed] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const acInitRef = useRef(false);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [phone, setPhone] = useState("");

  const [pickupPlaceId, setPickupPlaceId] = useState<string>("");
  const [dropoffPlaceId, setDropoffPlaceId] = useState<string>("");

  const [whenMode, setWhenMode] = useState<WhenMode>("now");
  const [whenDate, setWhenDate] = useState("");
  const [whenTime, setWhenTime] = useState("");

  const [pax, setPax] = useState(1);
  const [bags, setBags] = useState(0);

  const [loadingLoc, setLoadingLoc] = useState(false);
  const [error, setError] = useState<string>("");

  const canUseGoogle = useMemo(() => !!apiKey && !googleFailed, [apiKey, googleFailed]);

  const ensureGoogleLoaded = async () => {
    if (!apiKey) {
      setGoogleReady(false);
      setGoogleFailed(false);
      return false;
    }
    if (googleFailed) return false;
    if (window.google?.maps?.places) {
      setGoogleReady(true);
      return true;
    }

    try {
      setGoogleLoading(true);
      await loadGooglePlaces(apiKey);
      if (window.google?.maps?.places) {
        setGoogleReady(true);
        return true;
      }
      setGoogleReady(false);
      setGoogleFailed(true);
      return false;
    } catch {
      setGoogleReady(false);
      setGoogleFailed(true);
      return false;
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (!googleReady) return;
    if (acInitRef.current) return;
    if (!pickupRef.current || !dropoffRef.current) return;

    try {
      const A = window.google.maps.places.Autocomplete;

      const defaultBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(41.270, 1.930),
        new window.google.maps.LatLng(41.520, 2.320)
      );

      const baseOptions = {
        fields: ["place_id", "formatted_address", "name", "geometry"],
        componentRestrictions: { country: "es" },
        bounds: defaultBounds,
        strictBounds: false,
      } as const;

      const pickupAC = new A(pickupRef.current, baseOptions);
      const dropoffAC = new A(dropoffRef.current, baseOptions);

      (pickupRef.current as any).__ac = pickupAC;
      (dropoffRef.current as any).__ac = dropoffAC;
      acInitRef.current = true;

      pickupAC.addListener("place_changed", () => {
        const p = pickupAC.getPlace?.();
        const label = p?.formatted_address || p?.name || pickupRef.current?.value || "";
        setPickup(label);
        setPickupPlaceId(p?.place_id || "");

        const loc = p?.geometry?.location;
        if (loc && window.google?.maps?.Circle) {
          const circle = new window.google.maps.Circle({
            center: loc,
            radius: 30000,
          });
          const b = circle.getBounds();
          if (b) {
            try {
              dropoffAC.setBounds(b);
              dropoffAC.setOptions({ bounds: b, strictBounds: false });
            } catch {
              // ignore
            }
          }
        }
      });

      dropoffAC.addListener("place_changed", () => {
        const p = dropoffAC.getPlace?.();
        const label = p?.formatted_address || p?.name || dropoffRef.current?.value || "";
        setDropoff(label);
        setDropoffPlaceId(p?.place_id || "");
      });
    } catch {
      acInitRef.current = false;
      setGoogleReady(false);
      setGoogleFailed(true);
    }
  }, [googleReady]);


  function formatWhen(): string {
    if (whenMode === "now") return s.whenNow;
    if (!whenDate || !whenTime) return s.whenSchedule;

    const d = new Date(`${whenDate}T${whenTime}`);
    if (Number.isNaN(d.getTime())) return s.whenSchedule;

    return d.toLocaleString(locale);
  }

  function buildWhatsAppMessage(): string {
    const lines: string[] = [];

    lines.push(s.waHeader);
    lines.push("");

    lines.push(`${s.waPickup}: ${pickup || "____"}`);
    lines.push("");

    lines.push(`${s.waDropoff}: ${dropoff || "____"}`);
    lines.push("");

    lines.push(`${s.waPhone}: ${phone || "____"}`);
    lines.push("");

    lines.push(`${s.waDateTime}: ${formatWhen()}`);
    lines.push("");

    lines.push(`${s.waPassengers}: ${pax}`);
    lines.push("");

    lines.push(`${s.waLuggage}: ${bags}`);

    lines.push("");
    lines.push(`${s.waNotes}: ____`);

    return lines.join("\n");
  }

  function onConfirm() {
    setError("");

    if (!pickup.trim()) {
      setError((s as any).errorMissingPickup || "Please enter a pickup location.");
      return;
    }
    if (!dropoff.trim()) {
      setError((s as any).errorMissingDestination || "Please enter a destination.");
      return;
    }
    if (whenMode === "schedule" && (!whenDate || !whenTime)) {
      setError((s as any).errorChooseDateTimeResolved || "Please choose a date and time.");
      return;
    }

    const url = `https://wa.me/${whatsappE164}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function useCurrentLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError(s.locUnsupported);
      return;
    }

    setLoadingLoc(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          if (canUseGoogle && !window.google?.maps?.Geocoder) {
            await ensureGoogleLoaded();
          }
          if (canUseGoogle && window.google?.maps?.Geocoder) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
              { location: { lat, lng } },
              (results: any[], status: string) => {
                if (status === "OK" && results?.[0]?.formatted_address) {
                  const addr = results[0].formatted_address as string;
                  setPickup(addr);
                  setPickupPlaceId(results[0].place_id || "");
                  if (pickupRef.current) pickupRef.current.value = addr;

                  const loc = results?.[0]?.geometry?.location;
                  const ac = (dropoffRef.current as any)?.__ac;
                  if (loc && ac && window.google?.maps?.Circle) {
                    const circle = new window.google.maps.Circle({ center: loc, radius: 30000 });
                    const b = circle.getBounds();
                    if (b) {
                      try {
                        ac.setBounds(b);
                        ac.setOptions({ bounds: b, strictBounds: false });
                      } catch {
                        // ignore
                      }
                    }
                  }
                } else {
                  const fallback = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                  setPickup(fallback);
                  setPickupPlaceId("");
                  if (pickupRef.current) pickupRef.current.value = fallback;
                }
              }
            );
          } else {
            const fallback = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            setPickup(fallback);
            setPickupPlaceId("");
            if (pickupRef.current) pickupRef.current.value = fallback;
          }
        } finally {
          setLoadingLoc(false);
        }
      },
      () => {
        setLoadingLoc(false);
        setError(s.locPermissionDenied);
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  return (
    <div className={className}>
      <div className="rounded-[22px] border border-white/14 bg-transparent shadow-[0_24px_90px_rgba(0,0,0,0.50)] overflow-hidden backdrop-blur-sm">
        {/* Compact Header */}
        <div className="px-4 pt-4 pb-3 bg-gradient-to-br from-[rgba(14,165,233,0.14)] to-[rgba(168,85,247,0.14)] border-b border-white/10">
          <div className="text-[28px] leading-[1.1] font-extrabold text-white tracking-tight">{s.title}</div>
          <div className="mt-1.5 text-[13px] text-white/65 leading-snug">{s.subtitle}</div>
        </div>

        {/* Compact Form */}
        <div className="px-4 py-4 bg-[rgba(2,6,23,0.10)]">
          <div className="grid gap-2.5">
            {/* Pickup */}
            <div className="relative h-11 w-full rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
              <input
                ref={pickupRef}
                className="h-full w-full rounded-xl bg-transparent px-3.5 pr-11 text-[14px] text-white placeholder:text-white/40 outline-none"
                placeholder={s.pickupPlaceholder}
                autoComplete="off"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  setPickupPlaceId("");
                }}
                onFocus={() => {
                  if (canUseGoogle && !googleReady && !googleLoading) ensureGoogleLoaded();
                }}
              />

              <button
                type="button"
                onClick={useCurrentLocation}
                aria-label={s.useMyLocationAria}
                title={s.useMyLocationAria}
                disabled={loadingLoc}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-white/75 hover:bg-white/12 hover:text-white transition disabled:opacity-50"
              >
                {loadingLoc ? (
                  <span className="text-[9px] font-bold">…</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 2v3m0 14v3M2 12h3m14 0h3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Destination */}
            <div className="h-11 w-full rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
              <input
                ref={dropoffRef}
                className="h-full w-full rounded-xl bg-transparent px-3.5 text-[14px] text-white placeholder:text-white/40 outline-none"
                placeholder={s.destinationPlaceholder}
                autoComplete="off"
                value={dropoff}
                onChange={(e) => {
                  setDropoff(e.target.value);
                  setDropoffPlaceId("");
                }}
                onFocus={() => {
                  if (canUseGoogle && !googleReady && !googleLoading) ensureGoogleLoaded();
                }}
              />
            </div>

            {/* Phone */}
            <div className="h-11 w-full rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
              <input
                type="tel"
                inputMode="tel"
                className="h-full w-full rounded-xl bg-transparent px-3.5 text-[14px] text-white placeholder:text-white/40 outline-none"
                placeholder={s.phonePlaceholder}
                aria-label={s.phoneLabel}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* When + Pax + Bags (3-col compact row) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="h-11 rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
                <select
                  value={whenMode}
                  onChange={(e) => {
                    const v = e.target.value as WhenMode;
                    setWhenMode(v);
                    if (v === "now") {
                      setWhenDate("");
                      setWhenTime("");
                    }
                  }}
                  aria-label={s.whenLabel}
                  className="h-full w-full rounded-xl bg-transparent px-2.5 text-[13px] text-white outline-none"
                >
                  <option value="now" className="bg-slate-900">
                    {s.whenNow}
                  </option>
                  <option value="schedule" className="bg-slate-900">
                    {s.whenSchedule}
                  </option>
                </select>
              </div>

              <div className="h-11 rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
                <select
                  value={pax}
                  onChange={(e) => setPax(parseInt(e.target.value, 10))}
                  aria-label={s.passengersLabel}
                  className="h-full w-full rounded-xl bg-transparent px-2.5 text-[13px] text-white outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-slate-900">
                      {n} {n === 1 ? "Pax" : "Pax"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-11 rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
                <select
                  value={bags}
                  onChange={(e) => setBags(parseInt(e.target.value, 10))}
                  aria-label={s.luggageLabel}
                  className="h-full w-full rounded-xl bg-transparent px-2.5 text-[13px] text-white outline-none"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-slate-900">
                      {n} {n === 1 ? "Bag" : "Bags"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Schedule Date+Time (only when scheduled) */}
            {whenMode === "schedule" ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="h-11 rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
                  <input
                    type="date"
                    value={whenDate}
                    onChange={(e) => setWhenDate(e.target.value)}
                    aria-label={s.dateLabel}
                    className="h-full w-full rounded-xl bg-transparent px-3 text-[13px] text-white outline-none [color-scheme:dark]"
                  />
                </div>

                <div className="h-11 rounded-xl border border-white/12 bg-white/6 backdrop-blur-sm">
                  <input
                    type="time"
                    value={whenTime}
                    onChange={(e) => setWhenTime(e.target.value)}
                    aria-label={s.timeLabel}
                    className="h-full w-full rounded-xl bg-transparent px-3 text-[13px] text-white outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
            ) : null}


            {/* Error */}
            {error ? (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-100">
                {error}
              </div>
            ) : null}

            {/* Send Button */}
            <button
              type="button"
              onClick={onConfirm}
              className="mt-1 h-11 w-full inline-flex items-center justify-center rounded-xl px-5 font-extrabold text-[14px] bg-gradient-to-r from-[#10b981] to-[#22c55e] text-black shadow-[0_12px_40px_rgba(16,185,129,0.30)] hover:brightness-110 transition"
            >
              {s.sendViaWhatsApp}
            </button>

            {/* Tip - very compact */}
            <div className="text-[11px] text-white/40 leading-snug">
              {s.tipText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}