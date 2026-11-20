import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import DemoBanner from "./DemoBanner";
import Footer from "./Footer";
import Header from "./Header";
import { RestaurantJsonLd } from "./JsonLd";
import Reveal from "./Reveal";

export default function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale}>
      <body className="grain min-h-screen">
        <RestaurantJsonLd locale={locale} />
        <Header locale={locale} />
        <main id="contenuto">{children}</main>
        <Footer locale={locale} />
        <DemoBanner locale={locale} />
        <Reveal />
      </body>
    </html>
  );
}
