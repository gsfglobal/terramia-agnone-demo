"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { demoMode } from "@/config/site";
import type { Locale } from "@/lib/i18n";

export default function DemoBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!demoMode) return;
    let hidden = false;
    try {
      hidden = sessionStorage.getItem("tm-demo-banner") === "0";
    } catch {}
    setVisible(!hidden);
  }, []);

  if (!demoMode || !visible) return null;

  return (
    <div role="note" className="fixed inset-x-0 bottom-0 z-[65] border-t border-fire/30 bg-[#1a1512]/95 backdrop-blur-md md:bottom-auto md:top-auto">
      <div className="mx-auto flex max-w-[1400px] items-start gap-4 px-6 py-3 text-xs leading-relaxed text-ivory/80 md:items-center md:px-12">
        <span className="mt-0.5 shrink-0 rounded-full bg-fire px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-coal md:mt-0">Demo</span>
        <p className="flex-1">
          {locale === "it"
            ? "Proposta di sito non ufficiale, in attesa di approvazione del ristorante. I dati marcati \"Da confermare\" vanno verificati; le prenotazioni non vengono inviate."
            : "Unofficial website proposal awaiting the restaurant's approval. Items marked \"To be confirmed\" must be verified; bookings are not sent."}
        </p>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            try {
              sessionStorage.setItem("tm-demo-banner", "0");
            } catch {}
          }}
          className="shrink-0 rounded-full p-1 text-ivory/60 hover:text-ivory"
          aria-label={locale === "it" ? "Nascondi avviso" : "Hide notice"}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
