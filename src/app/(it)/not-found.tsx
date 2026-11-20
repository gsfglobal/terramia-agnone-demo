import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-6xl">Pagina non trovata</h1>
      <p className="mt-4 text-ivory/65">La brace è accesa, ma questa pagina non c&apos;è.</p>
      <Link href="/" className="mt-10 rounded-full bg-fire px-6 py-3 text-sm font-semibold text-coal">Torna alla home</Link>
    </section>
  );
}
