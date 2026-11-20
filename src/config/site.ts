/**
 * Configurazione centrale del sito.
 * demoMode: true finché il titolare non approva il progetto.
 * Si controlla con la variabile d'ambiente NEXT_PUBLIC_DEMO_MODE ("false" per disattivare).
 */
export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.terramiaagnone.it").replace(/\/$/, "");

export const restaurant = {
  name: "Terra Mia",
  fullName: "Terra Mia — Ristorante Braceria",
  phone: "+39 0865 77843",
  phoneHref: "tel:+39086577843",
  email: "terramia.ristorantebraceria@gmail.com",
  /** Civico non pubblicato: le fonti riportano 1/C e 4 — DA CONFERMARE */
  street: "Piazza Plebiscito — Palazzo Bonanni",
  streetToConfirm: true,
  postalCode: "86081",
  city: "Agnone",
  province: "IS",
  region: "Molise",
  country: "IT",
  geo: { lat: 41.80614, lng: 14.36625 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Terra+Mia+Ristorante+Braceria+Agnone",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=41.80614,14.36625",
  instagram: "https://www.instagram.com/terramia.ristorantebraceria/",
  facebook: "https://www.facebook.com/terramia.ristorantebraceria/",
  tripadvisor:
    "https://www.tripadvisor.it/Restaurant_Review-g1408090-d15643345-Reviews-Terra_Mia-Agnone_Province_of_Isernia_Molise.html",
  googleReviews: "https://www.google.com/maps/search/?api=1&query=Terra+Mia+Ristorante+Braceria+Agnone",
  chef: "Umberto Masciotra",
  priceRange: "€€",
  seats: { indoor: 45, outdoor: 50 },
};

/** Orari: fonte Tripadvisor (letta il 20/11/2026), coerenti con AIC. DA CONFERMARE. */
export type DayHours = { day: number; it: string; en: string; slots: [string, string][] };
export const hours: DayHours[] = [
  { day: 1, it: "Lunedì", en: "Monday", slots: [] },
  { day: 2, it: "Martedì", en: "Tuesday", slots: [["19:45", "22:00"]] },
  { day: 3, it: "Mercoledì", en: "Wednesday", slots: [["12:45", "14:30"], ["19:45", "22:00"]] },
  { day: 4, it: "Giovedì", en: "Thursday", slots: [["12:45", "14:30"], ["19:45", "22:30"]] },
  { day: 5, it: "Venerdì", en: "Friday", slots: [["12:45", "14:30"], ["19:45", "22:30"]] },
  { day: 6, it: "Sabato", en: "Saturday", slots: [["12:45", "14:30"], ["19:45", "23:00"]] },
  { day: 0, it: "Domenica", en: "Sunday", slots: [["12:45", "14:30"]] },
];
export const hoursToConfirm = true;

export const ratings = {
  tripadvisor: { value: 4.6, count: 280, checked: "20/11/2026", extra: "N. 1 di 22 ristoranti ad Agnone · Travellers' Choice 2026" },
  google: { value: 4.5, count: 456, checked: "dato aggregato (Wanderlog), da riconfermare" },
};
