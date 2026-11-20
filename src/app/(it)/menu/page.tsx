import { MenuPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("menu", "it", 'Menu', 'Il menu di Terra Mia ad Agnone: antipasti, primi, secondi, carni alla brace, dessert e vini, con informazioni sugli allergeni.');

export default function Page() {
  return <MenuPage locale="it" />;
}
