import Link from "next/link";
import type { ReactNode } from "react";
import { Camera, ChefHat, Flame, Landmark, Trees, UtensilsCrossed, Wine, type LucideIcon } from "lucide-react";
import { demoMode } from "@/config/site";
import { photos, type PhotoKey } from "@/data/photos";
import { type Locale, ui } from "@/lib/i18n";

/** Badge visibile solo in modalità demo per segnalare un dato da verificare */
export function ToConfirm({ locale, note, className = "" }: { locale: Locale; note?: string; className?: string }) {
  if (!demoMode) return null;
  return (
    <span
      title={note}
      className={`ml-2 inline-flex items-center gap-1 rounded-full border border-fire/50 bg-fire/10 px-2 py-0.5 align-middle font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-fire ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-fire" aria-hidden="true" />
      {ui.toConfirm[locale]}
    </span>
  );
}

export type Motif = "fire" | "wine" | "stone" | "garden" | "dish" | "chef";
const motifs: Record<Motif, LucideIcon> = {
  fire: Flame,
  wine: Wine,
  stone: Landmark,
  garden: Trees,
  dish: UtensilsCrossed,
  chef: ChefHat,
};

/** Riquadro fotografico: segnaposto materico finché non arrivano le foto autorizzate */
export function PhotoFrame({
  subject,
  locale,
  tone = "fire",
  motif,
  photo,
  className = "",
  ratio = "aspect-[4/5]",
  src,
  alt,
}: {
  subject: string;
  locale: Locale;
  tone?: "fire" | "wine" | "stone" | "garden";
  motif?: Motif;
  photo?: PhotoKey;
  className?: string;
  ratio?: string;
  src?: string;
  alt?: string;
}) {
  const Icon = motifs[motif ?? tone];
  if (photo) {
    const ph = photos[photo];
    return (
      <figure className={`group relative overflow-hidden bg-coal ${ratio} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ph.src}
          alt={alt || subject}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.8s] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0b0a]/80 via-[#0d0b0a]/5 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[#d87a3a]/[0.06] mix-blend-overlay" aria-hidden="true" />
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-6">
          <span className="display text-xl italic leading-tight text-ivory md:text-2xl">{subject}</span>
          {demoMode && (
            <span className="text-[0.55rem] uppercase tracking-[0.18em] text-ivory/55">
              {locale === "it" ? "Immagine illustrativa · Unsplash" : "Illustrative image · Unsplash"}
            </span>
          )}
        </figcaption>
      </figure>
    );
  }
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt || subject} loading="lazy" className={`${ratio} w-full object-cover ${className}`} />;
  }
  return (
    <figure
      role="img"
      aria-label={`${subject} — ${ui.photoPending[locale]}`}
      data-tone={tone === "fire" ? undefined : tone}
      className={`photo-ph group relative overflow-hidden ${ratio} ${className}`}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,.05)_0_1px,transparent_1px_7px)]" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="relative flex h-[38%] max-h-40 min-h-16 aspect-square items-center justify-center rounded-full border border-ivory/10 transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-110">
          <div className="absolute inset-3 rounded-full border border-ivory/5" />
          <Icon className="h-[38%] w-[38%] text-stone/40" strokeWidth={0.8} />
        </div>
      </div>
      <div className="absolute inset-4 border border-ivory/[0.06]" aria-hidden="true" />
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 p-6">
        <span className="display text-xl italic leading-tight text-ivory/85 md:text-2xl">{subject}</span>
        {demoMode && (
          <span className="flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-stone/60">
            <Camera className="h-3 w-3" aria-hidden="true" />
            {ui.photoPending[locale]}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  italic,
  intro,
  align = "left",
  id,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`} data-reveal>
      <p className="eyebrow flex items-center gap-3" style={align === "center" ? { justifyContent: "center" } : undefined}>
        {index && <span className="text-fire">{index}</span>}
        <span className="h-px w-8 bg-stone/40" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-6 text-[clamp(2.4rem,5.5vw,4.8rem)] text-ivory">
        {title} {italic && <em className="text-copper">{italic}</em>}
      </h2>
      {intro && <div className="mt-6 text-base leading-relaxed text-ivory/70 md:text-lg">{intro}</div>}
    </header>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "bg-fire text-coal hover:bg-ivory"
      : "border border-ivory/25 text-ivory hover:border-fire hover:text-fire";
  const base = `inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-500 ${cls}`;
  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={base} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}

export function PageHero({ eyebrow, title, italic, intro }: { eyebrow: string; title: string; italic?: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="ember-static pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-coal/40 to-coal" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="eyebrow" data-reveal>{eyebrow}</p>
        <h1 className="display mt-6 max-w-5xl text-[clamp(3rem,8vw,7rem)] text-ivory" data-reveal>
          {title} {italic && <em className="text-fire">{italic}</em>}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/75" data-reveal>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1400px] px-6 md:px-12 ${className}`}>{children}</div>;
}
