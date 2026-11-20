import type { Metadata } from "next";
import MenuAdmin from "@/components/admin/MenuAdmin";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Area riservata", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <section className="pb-28 pt-36 md:pt-44">
      <Container>
        <p className="eyebrow">Area riservata</p>
        <h1 className="display mt-4 mb-12 text-6xl">Gestione menu</h1>
        <MenuAdmin />
      </Container>
    </section>
  );
}
