import { HomePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "en", 'Terra Mia — Restaurant & Grill in Agnone, Molise', 'Restaurant and grill in the historic centre of Agnone, Molise: contemporary regional cooking by chef Umberto Masciotra, meat over embers, local wines and a summer garden. Book your table.');

export default function Page() {
  return <HomePage locale="en" />;
}
