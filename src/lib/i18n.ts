export type Locale = "it" | "en";

export type RouteKey =
  | "home"
  | "story"
  | "grill"
  | "cuisine"
  | "menu"
  | "wine"
  | "gallery"
  | "reviews"
  | "contact";

export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { it: "/", en: "/en" },
  story: { it: "/la-nostra-storia", en: "/en/our-story" },
  grill: { it: "/la-braceria", en: "/en/the-grill" },
  cuisine: { it: "/la-nostra-cucina", en: "/en/our-cuisine" },
  menu: { it: "/menu", en: "/en/menu" },
  wine: { it: "/la-cantina", en: "/en/wine-cellar" },
  gallery: { it: "/gallery", en: "/en/gallery" },
  reviews: { it: "/recensioni", en: "/en/reviews" },
  contact: { it: "/contatti", en: "/en/contact" },
};

export const navLabels: Record<RouteKey, Record<Locale, string>> = {
  home: { it: "Home", en: "Home" },
  story: { it: "La nostra storia", en: "Our story" },
  grill: { it: "La braceria", en: "The grill" },
  cuisine: { it: "La cucina", en: "Our cuisine" },
  menu: { it: "Menu", en: "Menu" },
  wine: { it: "La cantina", en: "Wine cellar" },
  gallery: { it: "Gallery", en: "Gallery" },
  reviews: { it: "Recensioni", en: "Reviews" },
  contact: { it: "Contatti", en: "Contact" },
};

export const mainNav: RouteKey[] = ["story", "grill", "cuisine", "menu", "wine", "gallery", "reviews"];

export function href(key: RouteKey, locale: Locale) {
  return routes[key][locale];
}

/** Trova la stessa pagina nell'altra lingua */
export function alternatePath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].it === clean || routes[key].en === clean) return routes[key][target];
  }
  return routes.home[target];
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

export const ui = {
  book: { it: "Prenota il tuo tavolo", en: "Book your table" },
  bookShort: { it: "Prenota", en: "Book" },
  discover: { it: "Scopri la nostra cucina", en: "Discover our cuisine" },
  call: { it: "Chiama il ristorante", en: "Call the restaurant" },
  directions: { it: "Indicazioni stradali", en: "Get directions" },
  exploreMenu: { it: "Esplora il menu", en: "Explore the menu" },
  toConfirm: { it: "Da confermare", en: "To be confirmed" },
  hours: { it: "Orari", en: "Opening hours" },
  closed: { it: "Chiuso", en: "Closed" },
  address: { it: "Indirizzo", en: "Address" },
  readMore: { it: "Approfondisci", en: "Read more" },
  skip: { it: "Salta al contenuto", en: "Skip to content" },
  menuToggle: { it: "Apri il menu", en: "Open menu" },
  close: { it: "Chiudi", en: "Close" },
  photoPending: { it: "Foto autentica da fornire", en: "Authentic photo to be supplied" },
};

export function t<T extends Record<Locale, string>>(entry: T, locale: Locale) {
  return entry[locale];
}
