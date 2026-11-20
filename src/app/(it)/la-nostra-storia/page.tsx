import { StoryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("story", "it", 'La nostra storia', 'Terra Mia, il ristorante di Umberto e Jolanda a Palazzo Bonanni, nel centro storico di Agnone: sala, giardino estivo e cucina del territorio.');

export default function Page() {
  return <StoryPage locale="it" />;
}
