import { GalleryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("gallery", "en", 'Gallery', 'The rooms, dishes and grill of Terra Mia in Agnone.');

export default function Page() {
  return <GalleryPage locale="en" />;
}
