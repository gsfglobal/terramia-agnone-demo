"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { demoMode, hours, restaurant } from "@/config/site";
import type { Locale } from "@/lib/i18n";

type Values = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  area: "sala" | "giardino" | "indifferente";
  notes: string;
  privacy: boolean;
  website: string; // honeypot
};

const L = {
  it: {
    name: "Nome e cognome", phone: "Telefono", email: "Email", date: "Data", time: "Orario", guests: "Persone",
    area: "Preferenza", sala: "Sala interna", giardino: "Giardino (stagionale)", indifferente: "Indifferente",
    notes: "Allergie, intolleranze o note (facoltativo)",
    privacy: "Ho letto l'informativa privacy e acconsento al trattamento dei dati per gestire la richiesta.",
    submit: "Invia la richiesta", sending: "Invio in corso…",
    selectDate: "Scegli prima una data", closedDay: "Il ristorante risulta chiuso in questo giorno",
    pick: "Seleziona",
    disclaimer: "Questa è una richiesta, non una conferma. Il tavolo è garantito solo dopo la risposta del ristorante.",
    demoOk: "Richiesta simulata", demoText: "Modalità demo: nessun dato è stato inviato al ristorante. In produzione la richiesta arriva via email allo staff, che risponde con la conferma.",
    liveOk: "Email pronta", liveText: "Si è aperto il tuo programma di posta con la richiesta compilata: inviala per completare. Il ristorante ti risponderà con la conferma.",
    again: "Nuova richiesta", urgent: "Per richieste nella stessa giornata è meglio telefonare",
    errors: {
      name: "Inserisci il tuo nome", phone: "Inserisci un numero di telefono valido", email: "Inserisci un'email valida",
      date: "Scegli una data a partire da oggi", time: "Scegli un orario", guests: "Indica il numero di persone",
      privacy: "Serve il consenso per gestire la richiesta", spam: "Invio bloccato. Riprova tra qualche secondo.",
    },
  },
  en: {
    name: "Full name", phone: "Phone", email: "Email", date: "Date", time: "Time", guests: "Guests",
    area: "Preference", sala: "Indoor dining room", giardino: "Garden (seasonal)", indifferente: "No preference",
    notes: "Allergies, intolerances or notes (optional)",
    privacy: "I have read the privacy notice and consent to the processing of my data to handle this request.",
    submit: "Send request", sending: "Sending…",
    selectDate: "Choose a date first", closedDay: "The restaurant appears to be closed on this day",
    pick: "Select",
    disclaimer: "This is a request, not a confirmation. Your table is guaranteed only once the restaurant replies.",
    demoOk: "Simulated request", demoText: "Demo mode: no data was sent to the restaurant. In production the request reaches the staff by email, who reply with a confirmation.",
    liveOk: "Email ready", liveText: "Your email app opened with the request filled in: send it to complete. The restaurant will reply with a confirmation.",
    again: "New request", urgent: "For same-day requests, please call",
    errors: {
      name: "Please enter your name", phone: "Please enter a valid phone number", email: "Please enter a valid email",
      date: "Choose a date from today onwards", time: "Choose a time", guests: "Enter the number of guests",
      privacy: "Consent is required to handle the request", spam: "Blocked. Please try again in a few seconds.",
    },
  },
};

function slotsFor(dateStr: string): string[] {
  if (!dateStr) return [];
  const d = new Date(dateStr + "T12:00:00");
  const day = hours.find((h) => h.day === d.getDay());
  if (!day) return [];
  const out: string[] = [];
  for (const [open, close] of day.slots) {
    const [oh, om] = open.split(":").map(Number);
    const [ch, cm] = close.split(":").map(Number);
    let m = oh * 60 + om;
    const last = ch * 60 + cm - 45; // ultimo arrivo indicativo
    while (m <= last) {
      out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
      m += 15;
    }
  }
  return out;
}

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function BookingForm({ locale }: { locale: Locale }) {
  const t = L[locale];
  const startedAt = useRef(Date.now());
  const [v, setV] = useState<Values>({
    name: "", phone: "", email: "", date: "", time: "", guests: "2", area: "indifferente", notes: "", privacy: false, website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values | "spam", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const slots = useMemo(() => slotsFor(v.date), [v.date]);
  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((p) => ({ ...p, [k]: val }));

  function validate() {
    const e: typeof errors = {};
    if (v.name.trim().length < 2) e.name = t.errors.name;
    if (!/^[+\d][\d\s./-]{5,}$/.test(v.phone.trim())) e.phone = t.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = t.errors.email;
    if (!v.date || v.date < todayISO()) e.date = t.errors.date;
    if (!v.time) e.time = t.errors.time;
    const g = Number(v.guests);
    if (!Number.isInteger(g) || g < 1 || g > 40) e.guests = t.errors.guests;
    if (!v.privacy) e.privacy = t.errors.privacy;
    if (Object.keys(e).length === 0 && (v.website || Date.now() - startedAt.current < 2500)) e.spam = t.errors.spam;
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    if (demoMode) {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("done");
      return;
    }
    // Produzione senza backend: email precompilata verso il ristorante.
    const areaLabel = t[v.area];
    const body = [
      `Richiesta di prenotazione dal sito`,
      ``,
      `Nome: ${v.name}`,
      `Telefono: ${v.phone}`,
      `Email: ${v.email}`,
      `Data: ${v.date}`,
      `Orario: ${v.time}`,
      `Persone: ${v.guests}`,
      `Preferenza: ${areaLabel}`,
      `Note/allergie: ${v.notes || "-"}`,
      ``,
      `Consenso privacy: sì`,
    ].join("\n");
    const subject = `Richiesta tavolo ${v.date} ${v.time} — ${v.guests} persone`;
    window.location.href = `mailto:${restaurant.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("done");
  }

  const field = "mt-2 w-full rounded-none border-0 border-b border-ivory/20 bg-transparent px-0 py-3 text-ivory placeholder:text-ivory/30 focus:border-fire focus:outline-none focus:ring-0 [color-scheme:dark]";
  const label = "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-stone";
  const err = (k: keyof typeof errors) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-2 text-xs text-[#f29a6b]" role="alert">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Values) => ({
    "aria-invalid": errors[k] ? ("true" as const) : ("false" as const),
    "aria-describedby": errors[k] ? `err-${k}` : undefined,
  });

  if (status === "done") {
    return (
      <div className="border border-fire/30 bg-fire/5 p-8 md:p-10" role="status" aria-live="polite">
        <CheckCircle2 className="h-8 w-8 text-fire" aria-hidden="true" />
        <h3 className="display mt-5 text-3xl text-ivory">{demoMode ? t.demoOk : t.liveOk}</h3>
        <p className="mt-4 text-ivory/75">{demoMode ? t.demoText : t.liveText}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <dt className="text-stone">{t.date}</dt><dd>{v.date}</dd>
          <dt className="text-stone">{t.time}</dt><dd>{v.time}</dd>
          <dt className="text-stone">{t.guests}</dt><dd>{v.guests}</dd>
          <dt className="text-stone">{t.area}</dt><dd>{t[v.area]}</dd>
        </dl>
        <p className="mt-6 text-xs text-ivory/55">{t.disclaimer}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            startedAt.current = Date.now();
            setV((p) => ({ ...p, date: "", time: "", notes: "" }));
          }}
          className="mt-8 rounded-full border border-ivory/25 px-6 py-3 text-sm hover:border-fire hover:text-fire"
        >
          {t.again}
        </button>
      </div>
    );
  }

  const closed = v.date && slots.length === 0;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 md:grid-cols-2">
      {/* honeypot anti-spam: invisibile alle persone */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="bk-name" className={label}>{t.name}</label>
        <input id="bk-name" autoComplete="name" className={field} value={v.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="bk-phone" className={label}>{t.phone}</label>
        <input id="bk-phone" type="tel" inputMode="tel" autoComplete="tel" className={field} value={v.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="bk-email" className={label}>{t.email}</label>
        <input id="bk-email" type="email" autoComplete="email" className={field} value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="bk-date" className={label}>{t.date}</label>
        <input id="bk-date" type="date" min={todayISO()} className={field} value={v.date} onChange={(e) => { set("date", e.target.value); set("time", ""); }} {...aria("date")} />
        {err("date")}
      </div>
      <div>
        <label htmlFor="bk-time" className={label}>{t.time}</label>
        <select id="bk-time" className={field} value={v.time} disabled={!v.date || !!closed} onChange={(e) => set("time", e.target.value)} {...aria("time")}>
          <option value="" className="bg-coal">{!v.date ? t.selectDate : closed ? t.closedDay : t.pick}</option>
          {slots.map((s) => (
            <option key={s} value={s} className="bg-coal">{s}</option>
          ))}
        </select>
        {closed && <p className="mt-2 text-xs text-stone">{t.closedDay}</p>}
        {err("time")}
      </div>
      <div>
        <label htmlFor="bk-guests" className={label}>{t.guests}</label>
        <input id="bk-guests" type="number" min={1} max={40} inputMode="numeric" className={field} value={v.guests} onChange={(e) => set("guests", e.target.value)} {...aria("guests")} />
        {err("guests")}
      </div>
      <fieldset>
        <legend className={label}>{t.area}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["indifferente", "sala", "giardino"] as const).map((a) => (
            <label key={a} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${v.area === a ? "border-fire bg-fire/10 text-fire" : "border-ivory/20 text-ivory/75 hover:border-ivory/40"}`}>
              <input type="radio" name="area" value={a} checked={v.area === a} onChange={() => set("area", a)} className="sr-only" />
              {t[a]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <label htmlFor="bk-notes" className={label}>{t.notes}</label>
        <textarea id="bk-notes" rows={3} maxLength={600} className={field} value={v.notes} onChange={(e) => set("notes", e.target.value)} />
      </div>
      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/75">
          <input type="checkbox" checked={v.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 h-4 w-4 accent-[#d87a3a]" {...aria("privacy")} />
          <span>
            {t.privacy}{" "}
            <Link href="/privacy" className="link-underline text-fire" target="_blank">Privacy</Link>
          </span>
        </label>
        {err("privacy")}
        {err("spam")}
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-fire px-8 py-4 text-sm font-semibold text-coal transition-colors hover:bg-ivory disabled:opacity-60"
        >
          {status === "sending" ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t.sending}</>) : t.submit}
        </button>
        <a href={restaurant.phoneHref} className="inline-flex items-center gap-2 text-sm text-ivory/70 hover:text-fire">
          <Phone className="h-4 w-4" aria-hidden="true" /> {t.urgent}: {restaurant.phone}
        </a>
      </div>
      <p className="text-xs text-ivory/50 md:col-span-2">{t.disclaimer}</p>
    </form>
  );
}
