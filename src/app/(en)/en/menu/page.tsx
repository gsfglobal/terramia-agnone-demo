import { MenuPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("menu", "en", 'Menu', 'The Terra Mia menu in Agnone: starters, pasta, mains, grilled meat, desserts and wines, with allergen information.');

export default function Page() {
  return <MenuPage locale="en" />;
}
