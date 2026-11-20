import { GalleryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("gallery", "it", 'Gallery', 'Gli ambienti, i piatti e la brace di Terra Mia ad Agnone.');

export default function Page() {
  return <GalleryPage locale="it" />;
}
