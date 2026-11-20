import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { demoMode, restaurant } from "@/config/site";
import { href, type Locale, mainNav, navLabels, ui } from "@/lib/i18n";
import { HoursList } from "./Hours";
import { Logo } from "./Logo";
import { ToConfirm } from "./ui";

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-[#0e0c0b] pt-24">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-fire/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <Logo size="lg" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
            {locale === "it"
              ? "Cucina del territorio, carni alla brace e ospitalità nel centro storico di Agnone."
              : "Regional cooking, meat over embers and hospitality in the historic centre of Agnone."}
          </p>
          <div className="mt-8 flex gap-3">
            <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 hover:border-fire hover:text-fire">
              <InstagramIcon />
            </a>
            <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 hover:border-fire hover:text-fire">
              <FacebookIcon />
            </a>
          </div>
        </div>

        <nav className="md:col-span-2" aria-label={locale === "it" ? "Navigazione a piè di pagina" : "Footer navigation"}>
          <p className="eyebrow mb-5">{locale === "it" ? "Esplora" : "Explore"}</p>
          <ul className="space-y-2.5 text-sm">
            {[...mainNav, "contact" as const].map((k) => (
              <li key={k}>
                <Link href={href(k, locale)} className="link-underline text-ivory/70 hover:text-ivory">
                  {navLabels[k][locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <p className="eyebrow mb-5">{locale === "it" ? "Dove siamo" : "Find us"}</p>
          <ul className="space-y-4 text-sm text-ivory/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fire" aria-hidden="true" />
              <span>
                {restaurant.street}
                {restaurant.streetToConfirm && <ToConfirm locale={locale} note="Civico: le fonti riportano 1/C e 4" />}
                <br />
                {restaurant.postalCode} {restaurant.city} ({restaurant.province}), {restaurant.region}
                <br />
                <a href={restaurant.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-fire">
                  {ui.directions[locale]} →
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-fire" aria-hidden="true" />
              <a href={restaurant.phoneHref} className="link-underline">{restaurant.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-fire" aria-hidden="true" />
              <a href={`mailto:${restaurant.email}`} className="link-underline break-all">{restaurant.email}</a>
            </li>
          </ul>
        </address>

        <div className="md:col-span-3">
          <HoursList locale={locale} compact />
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-[1400px] px-6 md:px-12">
        <div className="hairline" />
        <div className="flex flex-col gap-4 py-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Terra Mia — Ristorante Braceria · Agnone (IS)
            {demoMode && (
              <span className="ml-2">
                · {locale === "it" ? "P.IVA e ragione sociale da inserire" : "VAT number and company name to be added"}
              </span>
            )}
          </p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy" className="hover:text-ivory">Privacy</Link></li>
            <li><Link href="/cookie" className="hover:text-ivory">Cookie</Link></li>
            <li><Link href="/admin" className="hover:text-ivory">Area riservata</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
