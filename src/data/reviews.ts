/**
 * Sintesi di recensioni pubbliche reali (parafrasate, non citazioni integrali).
 * In produzione sostituire con testimonianze scelte dal titolare, con link alla fonte.
 */
export type ReviewSummary = {
  author: string;
  source: "Google" | "Tripadvisor";
  date: string;
  rating?: number;
  it: string;
  en: string;
  url: string;
};

const TA =
  "https://www.tripadvisor.it/Restaurant_Review-g1408090-d15643345-Reviews-Terra_Mia-Agnone_Province_of_Isernia_Molise.html";
const GO = "https://www.google.com/maps/search/?api=1&query=Terra+Mia+Ristorante+Braceria+Agnone";

export const reviewSummaries: ReviewSummary[] = [
  {
    author: "Nick P.", source: "Google", date: "ott 2025",
    it: "Pasta fatta in casa, carni locali e vino del territorio, con lo chef-titolare in cucina e la moglie in sala.",
    en: "Handmade pasta, local meat and regional wine, with the chef-owner in the kitchen and his wife running the room.",
    url: GO,
  },
  {
    author: "Dario D.", source: "Tripadvisor", date: "gen 2026", rating: 5,
    it: "Rapporto qualità-prezzo giudicato eccellente; lodate la carne e il servizio.",
    en: "Value for money rated excellent; the meat and the service were praised.",
    url: TA,
  },
  {
    author: "Carmen P.", source: "Google", date: "set 2024",
    it: "Un pranzo con l'agnello ricordato come il migliore mai assaggiato.",
    en: "A lunch where the lamb was remembered as the best ever tasted.",
    url: GO,
  },
  {
    author: "Luca L.", source: "Google", date: "ago 2023",
    it: "Personale professionale, menu invitante e una carta dei vini ricca di produttori molisani.",
    en: "Professional staff, an inviting menu and a wine list full of Molise producers.",
    url: GO,
  },
  {
    author: "Andrea P.", source: "Tripadvisor", date: "lug 2026", rating: 5,
    it: "Un'esperienza descritta come superlativa, dall'accoglienza ai piatti dello chef.",
    en: "An experience described as superb, from the welcome to the chef's dishes.",
    url: TA,
  },
  {
    author: "Kevin", source: "Google", date: "apr 2025",
    it: "Tre visite, sempre con cibo ottimo, servizio attento e ingredienti di stagione.",
    en: "Three visits, always with excellent food, attentive service and seasonal ingredients.",
    url: GO,
  },
];

export const reviewThemes = [
  { it: "Carne alla brace", en: "Grilled meat", note: { it: "L'elemento più lodato: tenera e cotta come richiesto.", en: "The most praised item: tender and cooked to order." } },
  { it: "Accoglienza", en: "Hospitality", note: { it: "Staff cordiale e professionale, attento alle famiglie.", en: "Friendly, professional staff who welcome families." } },
  { it: "Giardino estivo", en: "Summer garden", note: { it: "Il giardino sul retro è tra i ricordi più citati.", en: "The rear garden is one of the most mentioned memories." } },
  { it: "Vini molisani", en: "Molise wines", note: { it: "Una carta con molti produttori del territorio.", en: "A list with many local producers." } },
];
