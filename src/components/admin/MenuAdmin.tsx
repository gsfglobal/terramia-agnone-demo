"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Download, Plus, RotateCcw, Trash2, Upload, Lock, AlertTriangle } from "lucide-react";
import { demoMode } from "@/config/site";
import { allergens, categories, menuItems as defaults, type AllergenId, type CategoryId, type MenuItem } from "@/data/menu";

const STORAGE_KEY = "tm-menu-draft";
/** Solo per la demo: NON è una protezione reale. In produzione serve autenticazione lato server. */
const DEMO_PIN = "terramia";

function blank(category: CategoryId): MenuItem {
  return {
    id: `piatto-${Date.now()}`,
    category,
    name: { it: "Nuovo piatto", en: "New dish" },
    description: { it: "", en: "" },
    price: null,
    allergens: [],
    allergensVerified: false,
    seasonal: false,
    available: true,
    signature: false,
    source: "Ristorante",
    toConfirm: false,
  };
}

export default function MenuAdmin() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [items, setItems] = useState<MenuItem[]>(defaults);
  const [selected, setSelected] = useState<string>(defaults[0]?.id ?? "");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      if (sessionStorage.getItem("tm-admin") === "1") setUnlocked(true);
    } catch {}
  }, []);

  const current = useMemo(() => items.find((i) => i.id === selected), [items, selected]);

  function update(patch: Partial<MenuItem>) {
    setItems((list) => list.map((i) => (i.id === selected ? { ...i, ...patch } : i)));
    setSavedAt(null);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setSavedAt(new Date().toLocaleTimeString("it-IT"));
    } catch {
      setNotice("Impossibile salvare nel browser (memoria non disponibile).");
    }
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setItems(defaults);
    setSelected(defaults[0]?.id ?? "");
    setSavedAt(null);
    setNotice("Bozza eliminata: ripristinato il menu di partenza.");
  }

  const json = JSON.stringify(items, null, 2);

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(json);
      setNotice("JSON copiato negli appunti.");
    } catch {
      setNotice("Copia non consentita dal browser: usa il pulsante Scarica.");
    }
  }

  function downloadJson() {
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "menu-terramia.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importJson(file: File) {
    file.text().then((txt) => {
      try {
        const parsed = JSON.parse(txt);
        if (!Array.isArray(parsed)) throw new Error();
        setItems(parsed);
        setSelected(parsed[0]?.id ?? "");
        setNotice("Menu importato. Ricorda di salvare.");
      } catch {
        setNotice("File non valido.");
      }
    });
  }

  function onPhoto(file: File) {
    if (file.size > 600_000) {
      setNotice("Foto troppo grande per la demo (max 600 KB). In produzione le immagini vanno su uno storage dedicato.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update({ image: String(reader.result) });
    reader.readAsDataURL(file);
  }

  if (!unlocked) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === DEMO_PIN) {
            setUnlocked(true);
            try { sessionStorage.setItem("tm-admin", "1"); } catch {}
          } else setPinError(true);
        }}
        className="mx-auto max-w-md border border-ivory/10 p-10"
      >
        <Lock className="h-6 w-6 text-fire" aria-hidden="true" />
        <h2 className="display mt-5 text-4xl">Area riservata</h2>
        <p className="mt-3 text-sm text-ivory/65">
          Gestione del menu. {demoMode && <>Accesso demo: PIN <code className="text-fire">{DEMO_PIN}</code></>}
        </p>
        <label htmlFor="pin" className="mt-8 block text-xs uppercase tracking-[0.18em] text-stone">PIN</label>
        <input id="pin" type="password" value={pin} onChange={(e) => { setPin(e.target.value); setPinError(false); }} className="mt-2 w-full border-b border-ivory/20 bg-transparent py-3 focus:border-fire focus:outline-none" aria-invalid={pinError} />
        {pinError && <p className="mt-2 text-xs text-[#f29a6b]" role="alert">PIN non corretto</p>}
        <button className="mt-8 rounded-full bg-fire px-6 py-3 text-sm font-semibold text-coal">Entra</button>
      </form>
    );
  }

  const input = "mt-1 w-full border border-ivory/15 bg-[#1a1714] px-3 py-2 text-sm focus:border-fire focus:outline-none";
  const lab = "block text-[0.65rem] uppercase tracking-[0.16em] text-stone";

  return (
    <div>
      <div className="mb-8 flex gap-3 border border-fire/40 bg-fire/10 p-4 text-sm text-ivory/85" role="note">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-fire" aria-hidden="true" />
        <p>
          <strong>Modalità demo:</strong> le modifiche vengono salvate <strong>solo in questo browser</strong> e si vedono nella pagina Menu di questo dispositivo.
          Non aggiornano il sito pubblico. Per la pubblicazione reale serve il collegamento a un database con login sicuro (vedi README).
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={save} className="rounded-full bg-fire px-5 py-2.5 text-sm font-semibold text-coal">Salva bozza</button>
        <button onClick={copyJson} className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2.5 text-sm"><Copy className="h-4 w-4" />Copia JSON</button>
        <button onClick={downloadJson} className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2.5 text-sm"><Download className="h-4 w-4" />Scarica</button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ivory/20 px-4 py-2.5 text-sm">
          <Upload className="h-4 w-4" />Importa
          <input type="file" accept="application/json" className="sr-only" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
        </label>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2.5 text-sm"><RotateCcw className="h-4 w-4" />Ripristina</button>
        <span className="self-center text-xs text-stone" aria-live="polite">{savedAt ? `Salvato alle ${savedAt}` : "Modifiche non salvate"}</span>
      </div>
      {notice && <p className="mb-6 text-sm text-stone" role="status">{notice}</p>}

      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          {categories.map((c) => (
            <div key={c.id} className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="eyebrow">{c.label.it}</h3>
                <button
                  onClick={() => { const n = blank(c.id); setItems((l) => [...l, n]); setSelected(n.id); }}
                  className="inline-flex items-center gap-1 text-xs text-fire"
                  aria-label={`Aggiungi piatto in ${c.label.it}`}
                >
                  <Plus className="h-3 w-3" /> Aggiungi
                </button>
              </div>
              <ul className="mt-2">
                {items.filter((i) => i.category === c.id).map((i) => (
                  <li key={i.id}>
                    <button
                      onClick={() => setSelected(i.id)}
                      className={`w-full truncate border-l-2 px-3 py-2 text-left text-sm ${selected === i.id ? "border-fire bg-ivory/5 text-ivory" : "border-transparent text-ivory/65 hover:text-ivory"}`}
                    >
                      {i.name.it} {!i.available && <span className="text-xs text-stone">(non disp.)</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {current && (
          <section className="space-y-5 border border-ivory/10 p-6 lg:col-span-8" aria-label="Modifica piatto">
            <div className="grid gap-4 md:grid-cols-2">
              <div><label className={lab} htmlFor="n-it">Nome (IT)</label><input id="n-it" className={input} value={current.name.it} onChange={(e) => update({ name: { ...current.name, it: e.target.value } })} /></div>
              <div><label className={lab} htmlFor="n-en">Nome (EN)</label><input id="n-en" className={input} value={current.name.en} onChange={(e) => update({ name: { ...current.name, en: e.target.value } })} /></div>
              <div><label className={lab} htmlFor="d-it">Descrizione (IT)</label><textarea id="d-it" rows={3} className={input} value={current.description.it} onChange={(e) => update({ description: { ...current.description, it: e.target.value } })} /></div>
              <div><label className={lab} htmlFor="d-en">Descrizione (EN)</label><textarea id="d-en" rows={3} className={input} value={current.description.en} onChange={(e) => update({ description: { ...current.description, en: e.target.value } })} /></div>
              <div>
                <label className={lab} htmlFor="cat">Categoria</label>
                <select id="cat" className={input} value={current.category} onChange={(e) => update({ category: e.target.value as CategoryId })}>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.label.it}</option>)}
                </select>
              </div>
              <div>
                <label className={lab} htmlFor="price">Prezzo € (vuoto = non mostrato)</label>
                <input id="price" type="number" step="0.5" min="0" className={input} value={current.price ?? ""} onChange={(e) => update({ price: e.target.value === "" ? null : Number(e.target.value) })} />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {([
                ["available", "Disponibile"],
                ["seasonal", "Stagionale"],
                ["signature", "Signature (in homepage)"],
                ["toConfirm", "Da confermare"],
              ] as const).map(([k, l]) => (
                <label key={k} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#d87a3a]" checked={current[k]} onChange={(e) => update({ [k]: e.target.checked } as Partial<MenuItem>)} />
                  {l}
                </label>
              ))}
            </div>

            <fieldset>
              <legend className={lab}>Allergeni (Reg. UE 1169/2011)</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
                {allergens.map((a) => (
                  <label key={a.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-[#d87a3a]"
                      checked={current.allergens.includes(a.id)}
                      onChange={(e) =>
                        update({
                          allergens: e.target.checked
                            ? [...current.allergens, a.id as AllergenId]
                            : current.allergens.filter((x) => x !== a.id),
                        })
                      }
                    />
                    {a.it}
                  </label>
                ))}
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-fire">
                <input type="checkbox" className="accent-[#d87a3a]" checked={current.allergensVerified} onChange={(e) => update({ allergensVerified: e.target.checked })} />
                Allergeni verificati dalla cucina (mostrali sul sito)
              </label>
            </fieldset>

            <div>
              <span className={lab}>Fotografia autorizzata</span>
              <div className="mt-2 flex items-center gap-4">
                {current.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={current.image} alt="" className="h-20 w-20 object-cover" />
                )}
                <label className="cursor-pointer rounded-full border border-ivory/20 px-4 py-2 text-sm">
                  Carica foto
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files?.[0] && onPhoto(e.target.files[0])} />
                </label>
                {current.image && <button onClick={() => update({ image: undefined })} className="text-xs text-stone">Rimuovi</button>}
              </div>
            </div>

            <div className="flex justify-between border-t border-ivory/10 pt-5">
              <span className="text-xs text-stone">Fonte: {current.source}</span>
              <button
                onClick={() => {
                  setItems((l) => l.filter((i) => i.id !== current.id));
                  setSelected(items.find((i) => i.id !== current.id)?.id ?? "");
                }}
                className="inline-flex items-center gap-2 text-sm text-[#f29a6b]"
              >
                <Trash2 className="h-4 w-4" /> Elimina piatto
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
