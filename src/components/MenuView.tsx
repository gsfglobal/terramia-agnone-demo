"use client";

import { useEffect, useMemo, useState } from "react";
import { Leaf, Info } from "lucide-react";
import { demoMode } from "@/config/site";
import { allergens, categories, menuItems as defaultItems, type MenuItem } from "@/data/menu";
import type { Locale } from "@/lib/i18n";
import { dishPhotos, photos } from "@/data/photos";
import { assetUrl } from "@/lib/asset";

const STORAGE_KEY = "tm-menu-draft";

const T = {
  it: {
    all: "Tutto", seasonal: "Stagionale", unavailable: "Al momento non disponibile", price: "Prezzo in carta",
    allergensTitle: "Allergeni", allergensMissing: "Allergeni in aggiornamento: chiedere al personale",
    empty: "Sezione in aggiornamento. Chiedi la proposta del giorno in sala.",
    legal: "Informativa allergeni (Reg. UE 1169/2011): i piatti possono contenere o essere contaminati da uno o più dei 14 allergeni. Prima di ordinare, segnala al personale allergie e intolleranze. Disponibili opzioni senza glutine.",
    source: "Fonte", draft: "Stai vedendo la bozza salvata in questo browser dall'area riservata.",
    filter: "Filtra le categorie",
  },
  en: {
    all: "All", seasonal: "Seasonal", unavailable: "Currently unavailable", price: "Price on the menu",
    allergensTitle: "Allergens", allergensMissing: "Allergen info being updated: please ask our staff",
    empty: "Section being updated. Ask for today's selection at the table.",
    legal: "Allergen notice (EU Reg. 1169/2011): dishes may contain or be contaminated by one or more of the 14 allergens. Please tell our staff about allergies and intolerances before ordering. Gluten-free options available.",
    source: "Source", draft: "You are viewing the draft saved in this browser from the admin area.",
    filter: "Filter categories",
  },
};

export default function MenuView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [items, setItems] = useState<MenuItem[]>(defaultItems);
  const [isDraft, setIsDraft] = useState(false);
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    // In demo, mostra le modifiche fatte dall'area riservata (salvate solo nel browser)
    if (!demoMode) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as MenuItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
          setIsDraft(true);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (categories.some((c) => c.id === h)) setActive(h);
  }, []);

  const shown = useMemo(() => categories.filter((c) => active === "all" || c.id === active), [active]);

  return (
    <div>
      {isDraft && (
        <p className="mb-8 border border-fire/40 bg-fire/10 px-4 py-3 text-sm text-fire">{t.draft}</p>
      )}
      <div role="tablist" aria-label={t.filter} className="sticky top-[68px] z-30 -mx-6 mb-14 flex gap-2 overflow-x-auto bg-coal/90 px-6 py-4 backdrop-blur-md md:mx-0 md:px-0">
        {[{ id: "all", label: { it: t.all, en: t.all } }, ...categories].map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => {
              setActive(c.id);
              history.replaceState(null, "", c.id === "all" ? " " : `#${c.id}`);
            }}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm transition-colors ${
              active === c.id ? "border-fire bg-fire text-coal" : "border-ivory/20 text-ivory/75 hover:border-ivory/50"
            }`}
          >
            {c.label[locale]}
          </button>
        ))}
      </div>

      <div className="space-y-24">
        {shown.map((cat) => {
          const list = items.filter((i) => i.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-40" aria-labelledby={`cat-${cat.id}`}>
              <div className="grid gap-8 md:grid-cols-12">
                <header className="md:col-span-4">
                  <h2 id={`cat-${cat.id}`} className="display text-5xl text-ivory md:text-6xl">{cat.label[locale]}</h2>
                  <p className="mt-3 text-ivory/60">{cat.intro[locale]}</p>
                </header>
                <div className="md:col-span-8">
                  {list.length === 0 ? (
                    <p className="border-t border-ivory/10 py-6 text-ivory/55">{t.empty}</p>
                  ) : (
                    <ul>
                      {list.map((item) => (
                        <li key={item.id} className={`border-t border-ivory/10 py-7 ${item.available ? "" : "opacity-50"}`}>
                          <div className="flex items-baseline justify-between gap-6">
                            <h3 className="display text-3xl leading-tight text-ivory">
                              {item.name[locale]}
                              {item.seasonal && (
                                <span className="ml-3 inline-flex items-center gap-1 align-middle font-sans text-[0.62rem] uppercase tracking-[0.16em] text-[#a9b48a]">
                                  <Leaf className="h-3 w-3" aria-hidden="true" /> {t.seasonal}
                                </span>
                              )}
                            </h3>
                            <span className="shrink-0 font-sans text-sm tabular-nums text-stone">
                              {item.price != null ? `€ ${item.price.toFixed(2).replace(".", ",")}` : <span className="text-xs">{t.price}</span>}
                            </span>
                          </div>
                          {(item.image || dishPhotos[item.id]) && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image || assetUrl(photos[dishPhotos[item.id]].src)}
                              alt={item.name[locale]}
                              loading="lazy"
                              className="mt-4 aspect-[16/9] w-full max-w-md object-cover"
                            />
                          )}
                          <p className="mt-2 max-w-xl text-ivory/65">{item.description[locale]}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ivory/45">
                            {!item.available && <span className="text-fire">{t.unavailable}</span>}
                            {item.allergensVerified && item.allergens.length > 0 ? (
                              <span>
                                {t.allergensTitle}: {item.allergens.map((a) => allergens.find((x) => x.id === a)?.[locale]).join(", ")}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1"><Info className="h-3 w-3" aria-hidden="true" /> {t.allergensMissing}</span>
                            )}
                            {demoMode && <span>{t.source}: {item.source}{item.toConfirm ? " · da confermare" : ""}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <aside className="mt-24 border border-ivory/10 p-8 text-sm leading-relaxed text-ivory/65">
        <p className="eyebrow mb-4">{t.allergensTitle}</p>
        <p>{t.legal}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {allergens.map((a) => (
            <li key={a.id} className="rounded-full border border-ivory/15 px-3 py-1 text-xs">{a[locale]}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
