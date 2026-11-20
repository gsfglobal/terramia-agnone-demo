# Terra Mia — Ristorante Braceria · sito demo

Sito multipagina (IT/EN) con hero 3D per Terra Mia, Agnone (IS).
Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Three.js + React Three Fiber · GSAP ScrollTrigger · Lucide.

Dati, fonti e punti da verificare: vedi **RESEARCH.md**.

## Avvio

```bash
npm install
npm run dev        # sviluppo → http://localhost:3000
npm run build      # build di produzione (tutte le pagine statiche)
npm start
npm run lint
```

## Modalità demo

`demoMode` è attiva di default (`src/config/site.ts`). In demo:

- banner "Demo" e badge **Da confermare** sui dati non verificati;
- il modulo di prenotazione simula l'invio (nessun dato trasmesso);
- il sito è `noindex` e `robots.txt` blocca i motori di ricerca;
- nessun prezzo di sviluppo, nessuna approvazione del ristorante simulata.

Per la messa online reale: `NEXT_PUBLIC_DEMO_MODE=false` e `NEXT_PUBLIC_SITE_URL=https://dominio-definitivo.it` (vedi `.env.example`).

Hero 3D: si attiva automaticamente su dispositivi adatti; su dispositivi deboli, con *riduci movimento* o senza WebGL mostra un fondo statico.
Per forzare la scena durante una presentazione: `/?scene=3d` (oppure `/?scene=static`).

## Struttura

```
src/config/site.ts         dati del ristorante, orari, valutazioni, demoMode
src/data/menu.ts           menu (struttura usata anche dall'admin), allergeni UE
src/data/reviews.ts        sintesi recensioni con fonte
src/lib/i18n.ts            rotte IT/EN e testi comuni
src/components/three/      scena 3D della brace (carboni con shader, griglia, carne, fumo, scintille)
src/components/sections/   le 12 sezioni della homepage (+ footer)
src/components/pages.tsx   pagine interne
src/app/(it)/…  src/app/(en)/en/…   rotte italiane e inglesi
```

## Menu aggiornabile — cosa c'è e cosa manca

`/admin` (PIN demo: `terramia`) permette di aggiungere/modificare piatti, prezzi, categorie, disponibilità, stagionalità, allergeni e foto.
**In demo le modifiche si salvano solo nel browser di chi le fa** (localStorage) e si vedono nella pagina Menu di quel dispositivo. Il JSON si può esportare/importare.
Il PIN è solo una porta di cortesia, **non una protezione reale**.

Per renderlo operativo in produzione (consigliato, costi contenuti):

1. Database Supabase (tabella `menu_items` con la stessa struttura di `MenuItem`) + Storage per le foto.
2. Login del ristoratore con Supabase Auth (email magic link) e regole RLS: lettura pubblica, scrittura solo utenti autorizzati.
3. Pagina Menu che legge dal database con revalidate (ISR) o on-demand revalidation al salvataggio.

In alternativa: un CMS headless leggero (Sanity, Decap) con lo stesso schema.

## Prenotazioni

Il modulo distingue **richiesta** e **conferma**: non promette disponibilità.
- Demo: flusso simulato.
- Produzione senza backend: apre un'email precompilata verso il ristorante.
- Consigliato: route API / funzione serverless che invia l'email con un servizio transazionale (es. Resend) + Turnstile anti-spam, oppure integrazione con un gestionale di prenotazione se il ristorante ne adotta uno.

## Da fornire / confermare con il ristorante

Civico esatto, orari e ferie, logo ufficiale, fotografie autorizzate, menu e prezzi correnti, allergeni, provenienze delle carni, carta dei vini, storia del palazzo e del nome, frase dello chef, ragione sociale e P.IVA (privacy/footer), eventuale WhatsApp. Dettagli in RESEARCH.md.

## Deploy

Il progetto è interamente statico: si pubblica su Vercel o Netlify collegando il repository (nessuna configurazione aggiuntiva).
