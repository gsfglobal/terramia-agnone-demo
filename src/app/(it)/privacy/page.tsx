import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { restaurant } from "@/config/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <section className="pb-28 pt-36 md:pt-44">
      <Container className="max-w-3xl">
        <p className="eyebrow">Informativa</p>
        <h1 className="display mt-4 text-6xl">Privacy</h1>
        <div className="mt-10 space-y-6 leading-relaxed text-ivory/75">
          <p className="border border-fire/40 bg-fire/10 p-4 text-sm text-fire">
            Bozza da completare e far validare da un consulente: mancano ragione sociale, P.IVA e sede legale del titolare.
          </p>
          <h2 className="display text-3xl text-ivory">Titolare del trattamento</h2>
          <p>[Ragione sociale da inserire] — {restaurant.street}, {restaurant.postalCode} {restaurant.city} ({restaurant.province}). Email: {restaurant.email}.</p>
          <h2 className="display text-3xl text-ivory">Dati raccolti e finalità</h2>
          <p>Il modulo di prenotazione raccoglie nome, telefono, email, data, orario, numero di persone ed eventuali note (incluse allergie o intolleranze comunicate volontariamente). I dati sono usati esclusivamente per gestire la richiesta di prenotazione e rispondere all&apos;interessato.</p>
          <h2 className="display text-3xl text-ivory">Base giuridica e conservazione</h2>
          <p>Esecuzione di misure precontrattuali richieste dall&apos;interessato (art. 6.1.b GDPR); per i dati relativi ad allergie, consenso esplicito (art. 9.2.a GDPR). Conservazione per il tempo necessario a gestire la prenotazione [periodo da definire].</p>
          <h2 className="display text-3xl text-ivory">Diritti</h2>
          <p>L&apos;interessato può chiedere accesso, rettifica, cancellazione, limitazione e opposizione scrivendo a {restaurant.email}, e può proporre reclamo al Garante per la protezione dei dati personali.</p>
        </div>
      </Container>
    </section>
  );
}
