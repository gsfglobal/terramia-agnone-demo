/**
 * Foto illustrative con licenza Unsplash (uso commerciale gratuito, nessuna attribuzione obbligatoria).
 * NON ritraggono Terra Mia: vanno sostituite con il servizio fotografico del ristorante.
 * Fonte di ogni immagine: https://unsplash.com/photos/<id>
 */
const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const photos = {
  braceGriglia: { src: B + "/images/brace-griglia.jpg", unsplash: "1558030137-a56c1b004fa3" },
  braceCarboni: { src: B + "/images/brace-carboni.jpg", unsplash: "1597353811858-fbb7ce0a9ca6" },
  fuoco: { src: B + "/images/fuoco.jpg", unsplash: "1748362885463-a19be2920f88" },
  taglio: { src: B + "/images/taglio.jpg", unsplash: "1608877907149-a206d75ba011" },
  tagliataTagliere: { src: B + "/images/tagliata-tagliere.jpg", unsplash: "1558030006-450675393462" },
  tagliata: { src: B + "/images/tagliata.jpg", unsplash: "1630828888865-e575232113df" },
  entrecote: { src: B + "/images/entrecote.jpg", unsplash: "1594041680534-e8c8cdebd659" },
  stracciata: { src: B + "/images/stracciata.jpg", unsplash: "1555072930-714bba1d24e2" },
  carpaccio: { src: B + "/images/carpaccio.jpg", unsplash: "1577357573416-3abf4ac6ff9e" },
  pastaRagu: { src: B + "/images/pasta-ragu.jpg", unsplash: "1771508558365-07e711f60270" },
  pastaRagu2: { src: B + "/images/pasta-ragu-2.jpg", unsplash: "1771508558231-83a6d757da7a" },
  ravioli: { src: B + "/images/ravioli.jpg", unsplash: "1676832661871-994153cf2d93" },
  chef: { src: B + "/images/chef.jpg", unsplash: "1577219491135-ce391730fb2c" },
  salaPietra: { src: B + "/images/sala-pietra.jpg", unsplash: "1775124270427-dd7503c0b264" },
  salaVolte: { src: B + "/images/sala-volte.jpg", unsplash: "1787933587626-6e434277b809" },
  pietraDettaglio: { src: B + "/images/pietra-dettaglio.jpg", unsplash: "1793569340557-169a65042cd5" },
  giardino: { src: B + "/images/giardino.jpg", unsplash: "1574482211311-45a2169db57c" },
  vinoCalice: { src: B + "/images/vino-calice.jpg", unsplash: "1722307036188-57649793ddcf" },
  cantina: { src: B + "/images/cantina.jpg", unsplash: "1724882207681-9e7e8c3dd45c" },
  cantinaBottiglie: { src: B + "/images/cantina-bottiglie.jpg", unsplash: "1562601579-599dec564e06" },
} as const;

export type PhotoKey = keyof typeof photos;

/** Foto per i piatti del menu (per id) */
export const dishPhotos: Record<string, PhotoKey> = {
  "stracciata-carrozza": "stracciata",
  "carpaccio-tartufo": "carpaccio",
  "chitarrina-agnello": "pastaRagu",
  "tortellacci-agnello": "ravioli",
  "cannellone-brasato": "pastaRagu2",
  tagliata: "tagliata",
  entrecote: "entrecote",
};
