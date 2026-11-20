import { WinePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("wine", "it", 'La cantina — vini del Molise', 'Etichette italiane e molisane per accompagnare la brace e la cucina del territorio.');

export default function Page() {
  return <WinePage locale="it" />;
}
