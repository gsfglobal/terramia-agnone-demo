"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { alternatePath, href, type Locale, mainNav, navLabels, ui } from "@/lib/i18n";
import { restaurant } from "@/config/site";
import { Logo } from "./Logo";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other: Locale = locale === "it" ? "en" : "it";

  return (
    <>
      <a href="#contenuto" className="sr-only z-[80] rounded bg-fire px-4 py-2 text-coal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {ui.skip[locale]}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-coal/85 py-3 backdrop-blur-md shadow-[0_1px_0_rgba(200,183,160,.12)]" : "bg-transparent py-6"
        }`}
        style={{ top: "var(--demo-bar, 0px)" }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 md:px-12">
          <Link href={href("home", locale)} aria-label="Terra Mia — Home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label={locale === "it" ? "Navigazione principale" : "Main navigation"} className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((k) => {
                const active = pathname === href(k, locale);
                return (
                  <li key={k}>
                    <Link
                      href={href(k, locale)}
                      aria-current={active ? "page" : undefined}
                      className={`link-underline text-[0.8rem] tracking-wide transition-colors ${active ? "text-fire" : "text-ivory/80 hover:text-ivory"}`}
                    >
                      {navLabels[k][locale]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={alternatePath(pathname, other)}
              hrefLang={other}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone hover:text-ivory"
              aria-label={other === "en" ? "English version" : "Versione italiana"}
            >
              {other}
            </Link>
            <a href={restaurant.phoneHref} className="hidden h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 hover:border-fire hover:text-fire md:flex" aria-label={`${ui.call[locale]} ${restaurant.phone}`}>
              <Phone className="h-4 w-4" />
            </a>
            <Link
              href={href("contact", locale) + "#prenota"}
              className="hidden rounded-full bg-fire px-5 py-2.5 text-[0.8rem] font-semibold text-coal transition-colors hover:bg-ivory sm:inline-flex"
            >
              {ui.bookShort[locale]}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory xl:hidden"
              aria-label={ui.menuToggle[locale]}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigazione mobile */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={locale === "it" ? "Menu di navigazione" : "Navigation menu"}
        className={`fixed inset-0 z-[70] flex flex-col bg-coal transition-[opacity,visibility] duration-500 xl:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="ember-static pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative flex items-center justify-between px-6 py-6">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20" aria-label={ui.close[locale]}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="relative flex-1 overflow-y-auto px-6 pb-10">
          <ul className="space-y-1">
            {(["home", ...mainNav, "contact"] as const).map((k, i) => (
              <li key={k} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }} className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <Link href={href(k, locale)} className="display block py-2 text-4xl text-ivory hover:text-fire">
                  {navLabels[k][locale]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3">
            <Link href={href("contact", locale) + "#prenota"} className="rounded-full bg-fire px-6 py-4 text-center font-semibold text-coal">
              {ui.book[locale]}
            </Link>
            <a href={restaurant.phoneHref} className="rounded-full border border-ivory/25 px-6 py-4 text-center text-ivory">
              {restaurant.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
