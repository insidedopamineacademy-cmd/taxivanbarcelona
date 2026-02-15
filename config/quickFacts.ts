import type { AppLocale } from "@/config/brand";

export type QuickFactsPage = "home" | "airport" | "cruise" | "long";

export type QuickFactsContent = {
  title: string;
  items: string[];
};

const QUICK_FACTS: Record<QuickFactsPage, Record<AppLocale, QuickFactsContent>> = {
  home: {
    en: {
      title: "Quick Facts",
      items: [
        "24/7 service across Barcelona and surrounding areas",
        "Spacious 4–8 passenger vans for groups and families",
        "Airport, cruise port, and long-distance transfers",
        "Fixed pricing confirmed before travel",
        "Book online, by telephone, or on WhatsApp",
      ],
    },
    es: {
      title: "Datos Rápidos",
      items: [
        "Servicio 24/7 en Barcelona y alrededores",
        "Vans espaciosas para 4–8 pasajeros, ideales para grupos y familias",
        "Traslados de aeropuerto, puerto de cruceros y larga distancia",
        "Precio fijo confirmado antes del viaje",
        "Reserva online, por teléfono o por WhatsApp",
      ],
    },
    it: {
      title: "Dati Rapidi",
      items: [
        "Servizio 24/7 a Barcellona e dintorni",
        "Van spaziose da 4–8 passeggeri per gruppi e famiglie",
        "Transfer da aeroporto, porto crociere e lunga distanza",
        "Prezzo fisso confermato prima del viaggio",
        "Prenota online, per telefono o su WhatsApp",
      ],
    },
    de: {
      title: "Kurzinfos",
      items: [
        "24/7 Service in Barcelona und Umgebung",
        "Geräumige 4–8-Sitzer-Vans für Gruppen und Familien",
        "Flughafen-, Kreuzfahrthafen- und Langstreckentransfers",
        "Festpreis wird vor der Fahrt bestätigt",
        "Buchung online, telefonisch oder per WhatsApp",
      ],
    },
  },
  airport: {
    en: {
      title: "Quick Facts",
      items: [
        "Pickup at Barcelona El Prat Airport (T1 and T2)",
        "Designed for 4–8 passengers with luggage space",
        "24/7 airport transfers with fixed pricing confirmed before travel",
        "Child seats available upon request",
        "Book online, by telephone, or on WhatsApp",
      ],
    },
    es: {
      title: "Datos Rápidos",
      items: [
        "Recogida en el Aeropuerto de Barcelona El Prat (T1 y T2)",
        "Pensado para 4–8 pasajeros con espacio para equipaje",
        "Traslados al aeropuerto 24/7 con precio fijo confirmado antes del viaje",
        "Sillas infantiles disponibles bajo solicitud",
        "Reserva online, por teléfono o por WhatsApp",
      ],
    },
    it: {
      title: "Dati Rapidi",
      items: [
        "Pick-up all’Aeroporto di Barcellona El Prat (T1 e T2)",
        "Pensato per 4–8 passeggeri con spazio bagagli",
        "Transfer aeroportuali 24/7 con prezzo fisso confermato prima del viaggio",
        "Seggiolini per bambini disponibili su richiesta",
        "Prenota online, per telefono o su WhatsApp",
      ],
    },
    de: {
      title: "Kurzinfos",
      items: [
        "Abholung am Flughafen Barcelona El Prat (T1 und T2)",
        "Für 4–8 Passagiere mit Gepäckraum ausgelegt",
        "24/7 Flughafentransfers mit vorab bestätigtem Festpreis",
        "Kindersitze auf Anfrage verfügbar",
        "Buchung online, telefonisch oder per WhatsApp",
      ],
    },
  },
  cruise: {
    en: {
      title: "Quick Facts",
      items: [
        "Cruise terminal pickup at Moll Adossat and Port Vell",
        "4–8 passenger vans with room for cruise luggage",
        "24/7 service with fixed pricing confirmed before travel",
        "City transfer and onward airport transfer options",
        "Book online, by telephone, or on WhatsApp",
      ],
    },
    es: {
      title: "Datos Rápidos",
      items: [
        "Recogida en terminales de crucero de Moll Adossat y Port Vell",
        "Vans para 4–8 pasajeros con espacio para equipaje de crucero",
        "Servicio 24/7 con precio fijo confirmado antes del viaje",
        "Opciones de traslado por ciudad y conexión al aeropuerto",
        "Reserva online, por teléfono o por WhatsApp",
      ],
    },
    it: {
      title: "Dati Rapidi",
      items: [
        "Pick-up ai terminal crociere di Moll Adossat e Port Vell",
        "Van da 4–8 passeggeri con spazio per bagagli da crociera",
        "Servizio 24/7 con prezzo fisso confermato prima del viaggio",
        "Opzioni per trasferimenti in città e verso l’aeroporto",
        "Prenota online, per telefono o su WhatsApp",
      ],
    },
    de: {
      title: "Kurzinfos",
      items: [
        "Abholung an den Kreuzfahrtterminals Moll Adossat und Port Vell",
        "4–8-Sitzer-Vans mit Platz für Kreuzfahrtgepäck",
        "24/7 Service mit vorab bestätigtem Festpreis",
        "Optionen für Stadttransfer und Weiterfahrt zum Flughafen",
        "Buchung online, telefonisch oder per WhatsApp",
      ],
    },
  },
  long: {
    en: {
      title: "Quick Facts",
      items: [
        "Long-distance transfers from Barcelona across Catalonia and Spain",
        "Spacious 4–8 passenger vans with luggage room",
        "24/7 availability for pre-booked long routes",
        "Fixed pricing confirmed before travel",
        "Book online, by telephone, or on WhatsApp",
      ],
    },
    es: {
      title: "Datos Rápidos",
      items: [
        "Traslados de larga distancia desde Barcelona por Cataluña y España",
        "Vans espaciosas para 4–8 pasajeros con espacio para equipaje",
        "Disponibilidad 24/7 para rutas largas reservadas con antelación",
        "Precio fijo confirmado antes del viaje",
        "Reserva online, por teléfono o por WhatsApp",
      ],
    },
    it: {
      title: "Dati Rapidi",
      items: [
        "Transfer a lunga distanza da Barcellona in Catalogna e in Spagna",
        "Van spaziose da 4–8 passeggeri con spazio bagagli",
        "Disponibilità 24/7 per tratte lunghe prenotate in anticipo",
        "Prezzo fisso confermato prima del viaggio",
        "Prenota online, per telefono o su WhatsApp",
      ],
    },
    de: {
      title: "Kurzinfos",
      items: [
        "Langstreckentransfers ab Barcelona in Katalonien und Spanien",
        "Geräumige 4–8-Sitzer-Vans mit Gepäckraum",
        "24/7 Verfügbarkeit für vorab gebuchte Langstrecken",
        "Festpreis wird vor der Fahrt bestätigt",
        "Buchung online, telefonisch oder per WhatsApp",
      ],
    },
  },
};

export function getQuickFacts(page: QuickFactsPage, locale: AppLocale): QuickFactsContent {
  return QUICK_FACTS[page][locale];
}
