import { restaurant } from "@/config/site";
import { href, type Locale, ui } from "@/lib/i18n";
import { ButtonLink, Container } from "./ui";

export default function CtaBand({ locale }: { locale: Locale }) {
  const it = locale === "it";
  return (
    <section className="relative overflow-hidden border-t border-ivory/10 py-24 md:py-32">
      <div className="ember-static pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <Container className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <h2 className="display max-w-3xl text-[clamp(2.6rem,6vw,5.5rem)] text-ivory" data-reveal>
          {it ? "Il fuoco è acceso." : "The fire is lit."} <em className="text-fire">{it ? "Manca solo il tuo tavolo." : "All that's missing is your table."}</em>
        </h2>
        <div className="flex flex-wrap gap-4" data-reveal>
          <ButtonLink href={href("contact", locale) + "#prenota"}>{ui.book[locale]}</ButtonLink>
          <ButtonLink href={restaurant.phoneHref} variant="ghost">{restaurant.phone}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
