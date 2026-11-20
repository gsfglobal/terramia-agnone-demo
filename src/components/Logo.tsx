/** Wordmark tipografico provvisorio: il logo ufficiale va fornito dal ristorante */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex flex-col leading-none" translate="no">
      <span className={`display ${big ? "text-5xl" : "text-[1.7rem]"} tracking-tight text-ivory`}>
        Terra <em className="text-fire">Mia</em>
      </span>
      <span className={`mt-1 font-sans ${big ? "text-[0.7rem]" : "text-[0.55rem]"} uppercase tracking-[0.42em] text-stone/80`}>
        Ristorante · Braceria
      </span>
    </span>
  );
}
