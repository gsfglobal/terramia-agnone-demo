import { GrillPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("grill", "en", 'The grill — meat over embers in Agnone', 'Italian and international meat cooked over embers in the historic centre of Agnone.');

export default function Page() {
  return <GrillPage locale="en" />;
}
