/**
 * Struttura dati del menu.
 * È la stessa struttura che l'interfaccia /admin modifica ed esporta in JSON.
 * Nessun prezzo è pubblicato: non esiste un menu ufficiale aggiornato online.
 * Gli allergeni NON sono stati compilati: vanno inseriti dal ristorante (Reg. UE 1169/2011).
 */

export type Localized = { it: string; en: string };

export type AllergenId =
  | "glutine" | "crostacei" | "uova" | "pesce" | "arachidi" | "soia" | "latte"
  | "frutta-guscio" | "sedano" | "senape" | "sesamo" | "solfiti" | "lupini" | "molluschi";

export const allergens: { id: AllergenId; it: string; en: string }[] = [
  { id: "glutine", it: "Glutine", en: "Gluten" },
  { id: "crostacei", it: "Crostacei", en: "Crustaceans" },
  { id: "uova", it: "Uova", en: "Eggs" },
  { id: "pesce", it: "Pesce", en: "Fish" },
  { id: "arachidi", it: "Arachidi", en: "Peanuts" },
  { id: "soia", it: "Soia", en: "Soy" },
  { id: "latte", it: "Latte", en: "Milk" },
  { id: "frutta-guscio", it: "Frutta a guscio", en: "Tree nuts" },
  { id: "sedano", it: "Sedano", en: "Celery" },
  { id: "senape", it: "Senape", en: "Mustard" },
  { id: "sesamo", it: "Sesamo", en: "Sesame" },
  { id: "solfiti", it: "Anidride solforosa e solfiti", en: "Sulphites" },
  { id: "lupini", it: "Lupini", en: "Lupin" },
  { id: "molluschi", it: "Molluschi", en: "Molluscs" },
];

export type CategoryId = "antipasti" | "primi" | "secondi" | "brace" | "contorni" | "dessert" | "vini";

export const categories: { id: CategoryId; label: Localized; intro: Localized }[] = [
  { id: "antipasti", label: { it: "Antipasti", en: "Starters" }, intro: { it: "L'apertura, tra latticini dell'Alto Molise e carne cruda.", en: "To begin: Alto Molise dairy and raw beef." } },
  { id: "primi", label: { it: "Primi", en: "First courses" }, intro: { it: "Paste fatte in casa e sughi lenti.", en: "Handmade pasta and slow-cooked sauces." } },
  { id: "secondi", label: { it: "Secondi", en: "Main courses" }, intro: { it: "La cucina dello chef oltre la griglia.", en: "The chef's kitchen beyond the grill." } },
  { id: "brace", label: { it: "Carni alla brace", en: "From the grill" }, intro: { it: "Carni nazionali e internazionali cotte sulla brace.", en: "Italian and international cuts cooked over embers." } },
  { id: "contorni", label: { it: "Contorni", en: "Sides" }, intro: { it: "Verdure di stagione.", en: "Seasonal vegetables." } },
  { id: "dessert", label: { it: "Dessert", en: "Desserts" }, intro: { it: "Dolci della casa.", en: "House desserts." } },
  { id: "vini", label: { it: "Vini", en: "Wines" }, intro: { it: "Etichette italiane, con attenzione al Molise.", en: "Italian labels, with a focus on Molise." } },
];

export type MenuItem = {
  id: string;
  category: CategoryId;
  name: Localized;
  description: Localized;
  /** null = prezzo non pubblicato */
  price: number | null;
  allergens: AllergenId[];
  /** true se gli allergeni sono stati compilati e verificati dal ristorante */
  allergensVerified: boolean;
  seasonal: boolean;
  available: boolean;
  signature: boolean;
  /** Fonte da cui il piatto è stato ricavato */
  source: string;
  /** true finché il ristorante non conferma che il piatto è nel menu corrente */
  toConfirm: boolean;
  image?: string;
};

const AIC = "Accademia Italiana della Cucina (scheda non datata)";
const REV = "Recensioni Google (2023–2025)";
const BRIEF = "Brief del progetto";

export const menuItems: MenuItem[] = [
  {
    id: "stracciata-carrozza", category: "antipasti", signature: true,
    name: { it: "Stracciata di Agnone in carrozza", en: "Agnone stracciata \"in carrozza\"" },
    description: {
      it: "La stracciata, formaggio fresco a pasta filata dell'Alto Molise, nella preparazione \"in carrozza\".",
      en: "Stracciata, the fresh stretched-curd cheese of Alto Molise, prepared \"in carrozza\".",
    },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: AIC, toConfirm: true,
  },
  {
    id: "carpaccio-tartufo", category: "antipasti", signature: true,
    name: { it: "Carpaccio di manzo, panna acida e tartufo", en: "Beef carpaccio, sour cream and truffle" },
    description: { it: "Manzo crudo, panna acida, tartufo.", en: "Raw beef, sour cream, truffle." },
    price: null, allergens: [], allergensVerified: false, seasonal: true, available: true, source: AIC, toConfirm: true,
  },
  {
    id: "tartare-anguria", category: "antipasti", signature: false,
    name: { it: "Tartare di manzo, anguria e pomodorini", en: "Beef tartare, watermelon and cherry tomatoes" },
    description: { it: "Proposta estiva citata dagli ospiti.", en: "A summer dish mentioned by guests." },
    price: null, allergens: [], allergensVerified: false, seasonal: true, available: false, source: REV, toConfirm: true,
  },
  {
    id: "chitarrina-agnello", category: "primi", signature: true,
    name: { it: "Chitarrina al sugo di agnello", en: "Chitarrina with lamb ragù" },
    description: { it: "Pasta alla chitarra con sugo di agnello.", en: "Chitarra pasta with lamb sauce." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: AIC, toConfirm: true,
  },
  {
    id: "tortellacci-agnello", category: "primi", signature: true,
    name: { it: "Tortellacci di agnello", en: "Lamb tortellacci" },
    description: { it: "Pasta ripiena di agnello.", en: "Filled pasta with lamb." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: AIC, toConfirm: true,
  },
  {
    id: "cannellone-brasato", category: "primi", signature: true,
    name: { it: "Cannellone al brasato di vitellone bianco", en: "Cannellone with braised white veal" },
    description: { it: "Cannellone ripieno di brasato di vitellone bianco.", en: "Cannellone filled with braised white veal." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: AIC, toConfirm: true,
  },
  {
    id: "coniglio-porchettato", category: "secondi", signature: false,
    name: { it: "Coniglio porchettato", en: "Porchetta-style rabbit" },
    description: { it: "Coniglio nella preparazione \"porchettata\".", en: "Rabbit prepared porchetta-style." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: AIC, toConfirm: true,
  },
  {
    id: "agnello", category: "secondi", signature: false,
    name: { it: "Agnello", en: "Lamb" },
    description: { it: "Il secondo più citato dagli ospiti. Preparazione da confermare con lo chef.", en: "The main course guests mention most. Preparation to be confirmed with the chef." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: REV, toConfirm: true,
  },
  {
    id: "tagliata", category: "brace", signature: true,
    name: { it: "Tagliata di manzo", en: "Sliced beef \"tagliata\"" },
    description: { it: "Manzo alla brace servito a fette.", en: "Grilled beef, served sliced." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: BRIEF, toConfirm: true,
  },
  {
    id: "entrecote", category: "brace", signature: true,
    name: { it: "Entrecôte", en: "Entrecôte" },
    description: { it: "Taglio di manzo cotto sulla brace.", en: "Beef cut cooked over embers." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: BRIEF, toConfirm: true,
  },
  {
    id: "selezione-carni", category: "brace", signature: false,
    name: { it: "Selezione di carni nazionali e internazionali", en: "Italian and international meat selection" },
    description: {
      it: "Tagli disponibili secondo la selezione del giorno: chiedere in sala. Provenienze da pubblicare.",
      en: "Cuts vary with the day's selection: ask our staff. Origins to be published.",
    },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: "Visit Agnone; AIC", toConfirm: true,
  },
  {
    id: "parfait-ricotta", category: "dessert", signature: false,
    name: { it: "Parfait alla ricotta", en: "Ricotta parfait" },
    description: { it: "Dolce della casa citato dagli ospiti.", en: "House dessert mentioned by guests." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: REV, toConfirm: true,
  },
  {
    id: "cucciolone", category: "dessert", signature: false,
    name: { it: "Il \"cucciolone\" della casa", en: "House \"cucciolone\"" },
    description: { it: "Rivisitazione del gelato-biscotto, citata dagli ospiti.", en: "A take on the classic ice-cream sandwich, mentioned by guests." },
    price: null, allergens: [], allergensVerified: false, seasonal: false, available: true, source: REV, toConfirm: true,
  },
];

export const signatureDishes = menuItems.filter((m) => m.signature);
