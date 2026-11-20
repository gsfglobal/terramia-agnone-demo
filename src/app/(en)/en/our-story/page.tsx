import { StoryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("story", "en", 'Our story', "Terra Mia, Umberto and Jolanda's restaurant in Palazzo Bonanni, in the historic centre of Agnone: dining room, summer garden and regional cooking.");

export default function Page() {
  return <StoryPage locale="en" />;
}
