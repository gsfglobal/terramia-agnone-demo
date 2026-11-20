import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Cookie", alternates: { canonical: "/cookie" } };

export default function Cookie() {
  return (
    <section className="pb-28 pt-36 md:pt-44">
      <Container className="max-w-3xl">
        <p className="eyebrow">Informativa</p>
        <h1 className="display mt-4 text-6xl">Cookie</h1>
        <div className="mt-10 space-y-6 leading-relaxed text-ivory/75">
          <p>Questo sito non usa cookie di profilazione né strumenti di tracciamento di terze parti. Font e librerie sono serviti dallo stesso dominio; la mappa si apre su Google Maps solo su richiesta dell&apos;utente.</p>
          <p>Il sito può usare l&apos;archiviazione locale del browser (sessionStorage) per ricordare la chiusura di un avviso: è un dato tecnico che non identifica l&apos;utente e non viene trasmesso.</p>
          <p className="text-sm text-stone">Se in futuro verranno aggiunti strumenti di statistica o marketing, servirà un banner di consenso conforme alle linee guida del Garante.</p>
        </div>
      </Container>
    </section>
  );
}
