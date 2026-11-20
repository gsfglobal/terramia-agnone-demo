import { ContactPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "it", 'Contatti e prenotazioni', 'Prenota un tavolo da Terra Mia: Piazza Plebiscito, Palazzo Bonanni, Agnone (IS). Telefono +39 0865 77843.');

export default function Page() {
  return <ContactPage locale="it" />;
}
