import { ContactPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "en", 'Contact & booking', 'Book a table at Terra Mia: Piazza Plebiscito, Palazzo Bonanni, Agnone, Molise. Phone +39 0865 77843.');

export default function Page() {
  return <ContactPage locale="en" />;
}
