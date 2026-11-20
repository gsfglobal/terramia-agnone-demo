import { HomePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "it", 'Terra Mia — Ristorante Braceria ad Agnone', 'Ristorante e braceria nel centro storico di Agnone (IS): cucina molisana contemporanea dello chef Umberto Masciotra, carni alla brace, vini del territorio e giardino estivo. Prenota il tuo tavolo.');

export default function Page() {
  return <HomePage locale="it" />;
}
