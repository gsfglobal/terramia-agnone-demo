import { WinePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("wine", "en", 'Wine cellar — Molise wines', 'Italian and Molise labels to accompany the grill and regional cooking.');

export default function Page() {
  return <WinePage locale="en" />;
}
