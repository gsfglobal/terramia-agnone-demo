/**
 * Risolve un percorso pubblico ("/images/x.jpg") rispetto alla radice reale del sito.
 * Serve quando il sito è pubblicato in una sottocartella (es. anteprima demo).
 */
export function assetUrl(path: string): string {
  if (typeof document === "undefined" || !path.startsWith("/")) return path;
  if (process.env.NEXT_PUBLIC_BASE_PATH) return path;
  const s = document.querySelector<HTMLScriptElement>('script[src*="static/chunks/"]');
  const root = s?.src.replace(/(_next|nx)\/static\/chunks\/.*$/, "");
  return root ? root + path.slice(1) : path;
}
