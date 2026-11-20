import { CuisinePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("cuisine", "en", 'Our cuisine — contemporary Molise cooking', "Chef Umberto Masciotra's cooking: handmade pasta, lamb, Agnone stracciata and seasonal ingredients.");

export default function Page() {
  return <CuisinePage locale="en" />;
}
