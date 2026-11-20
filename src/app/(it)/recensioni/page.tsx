import { ReviewsPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("reviews", "it", 'Recensioni', 'Valutazioni e recensioni degli ospiti di Terra Mia su Tripadvisor e Google.');

export default function Page() {
  return <ReviewsPage locale="it" />;
}
