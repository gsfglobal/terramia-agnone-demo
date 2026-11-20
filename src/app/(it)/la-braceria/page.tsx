import { GrillPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("grill", "it", 'La braceria — carne alla brace ad Agnone', 'Carni nazionali e internazionali alla brace nel centro storico di Agnone: tagliata, entrecôte e la selezione del giorno.');

export default function Page() {
  return <GrillPage locale="it" />;
}
