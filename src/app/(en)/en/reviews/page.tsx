import { ReviewsPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("reviews", "en", 'Reviews', 'Guest ratings and reviews of Terra Mia on Tripadvisor and Google.');

export default function Page() {
  return <ReviewsPage locale="en" />;
}
