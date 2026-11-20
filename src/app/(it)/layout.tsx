import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import Shell from "@/components/Shell";
import { baseMetadata } from "@/lib/seo";

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = { themeColor: "#141210", colorScheme: "dark" };

export default function ItalianLayout({ children }: { children: ReactNode }) {
  return <Shell locale="it">{children}</Shell>;
}
