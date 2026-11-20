import { CuisinePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("cuisine", "it", 'La nostra cucina — cucina molisana contemporanea', 'La cucina dello chef Umberto Masciotra: paste fatte in casa, agnello, stracciata di Agnone e ingredienti di stagione.');

export default function Page() {
  return <CuisinePage locale="it" />;
}
