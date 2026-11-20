"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { href, type Locale, ui } from "@/lib/i18n";
import { restaurant } from "@/config/site";

const EmberScene = dynamic(() => import("./three/EmberScene"), { ssr: false });

type Mode = "pending" | "3d" | "static";

function canRun3D(): boolean {
  if (typeof window === "undefined") return false;
  // Override per test e presentazioni: ?scene=3d oppure ?scene=static
  const forced = new URLSearchParams(window.location.search).get("scene");
  if (forced === "3d") return true;
  if (forced === "static") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 3) return false;
  if ((navigator.hardwareConcurrency || 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const copy = {
  eyebrow: { it: "Ristorante Braceria · Agnone, Molise", en: "Restaurant & Grill · Agnone, Molise" },
  title1: { it: "Il territorio", en: "Where the land" },
  title2: { it: "incontra il fuoco.", en: "meets the fire." },
  sub: {
    it: "Nel cuore di Agnone, la tradizione gastronomica prende nuova forma tra cucina d'autore e carni alla brace.",
    en: "In the heart of Agnone, culinary tradition takes a new shape between chef-driven cooking and meat over embers.",
  },
  scroll: { it: "Scorri", en: "Scroll" },
};

export default function Hero({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<Mode>("pending");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setCompact(window.innerWidth < 768);
    setMode(canRun3D() ? "3d" : "static");
  }, []);

  return (
    <section className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#120f0d]" aria-labelledby="hero-title">
      {/* Fondo: statico subito, 3D quando pronto */}
      <div className="ember-static absolute inset-0" aria-hidden="true" />
      {mode === "3d" && <EmberScene compact={compact} />}

      {/* Velature per leggibilità */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0b0a]/90 via-[#0d0b0a]/45 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-coal to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0d0b0a]/80 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:justify-center md:px-12 md:pb-0">
        <p className="eyebrow mb-6 opacity-0 animate-[fadeUp_1.2s_var(--ease-luxe)_0.2s_forwards]">{copy.eyebrow[locale]}</p>
        <h1 id="hero-title" className="display max-w-[13ch] text-[clamp(3.2rem,8vw,7.6rem)] text-ivory">
          <span className="block opacity-0 animate-[fadeUp_1.4s_var(--ease-luxe)_0.35s_forwards]">{copy.title1[locale]}</span>
          <span className="block italic text-fire opacity-0 animate-[fadeUp_1.4s_var(--ease-luxe)_0.55s_forwards]">
            {copy.title2[locale]}
          </span>
        </h1>
        <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/80 opacity-0 animate-[fadeUp_1.2s_var(--ease-luxe)_0.8s_forwards] md:text-lg">
          {copy.sub[locale]}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-[fadeUp_1.2s_var(--ease-luxe)_1s_forwards]">
          <Link
            href={href("contact", locale) + "#prenota"}
            className="group inline-flex items-center gap-3 rounded-full bg-fire px-7 py-4 text-sm font-semibold tracking-wide text-coal transition-colors duration-500 hover:bg-ivory"
          >
            {ui.book[locale]}
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={href("cuisine", locale)}
            className="inline-flex items-center gap-3 rounded-full border border-ivory/30 px-7 py-4 text-sm font-medium tracking-wide text-ivory backdrop-blur-sm transition-colors duration-500 hover:border-fire hover:text-fire"
          >
            {ui.discover[locale]}
          </Link>
          <a href={restaurant.phoneHref} className="link-underline ml-1 text-sm text-ivory/70 hover:text-ivory">
            {restaurant.phone}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 md:flex" aria-hidden="true">
        <span className="eyebrow text-[0.6rem]">{copy.scroll[locale]}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion: reduce){[class*="animate-[fadeUp"]{animation:none!important;opacity:1!important}}`}</style>
    </section>
  );
}
