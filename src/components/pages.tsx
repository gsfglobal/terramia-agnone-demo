import { MapPin, Navigation, Car } from "lucide-react";
import { demoMode, restaurant } from "@/config/site";
import { menuItems } from "@/data/menu";
import { href, type Locale } from "@/lib/i18n";
import CtaBand from "./CtaBand";
import Hero from "./Hero";
import { HoursList } from "./Hours";
import MenuView from "./MenuView";
import {
  Booking, Chef, Garden, GrillArt, MenuTeaser, Palazzo, Philosophy, Reviews, Signatures, Welcome, Wine,
} from "./sections/home";
import { type PhotoKey } from "@/data/photos";
import { ButtonLink, Container, type Motif, PageHero, PhotoFrame, SectionHeading, ToConfirm } from "./ui";

type P = { locale: Locale };

export function HomePage({ locale }: P) {
  return (
    <>
      <Hero locale={locale} />
      <Welcome locale={locale} />
      <Philosophy locale={locale} />
      <GrillArt locale={locale} />
      <Signatures locale={locale} />
      <Chef locale={locale} />
      <MenuTeaser locale={locale} />
      <Palazzo locale={locale} />
      <Garden locale={locale} />
      <Wine locale={locale} />
      <Reviews locale={locale} />
      <Booking locale={locale} />
    </>
  );
}

export function StoryPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow={it ? "La nostra storia" : "Our story"}
        title={it ? "Una casa," : "A home,"}
        italic={it ? "un fuoco, un territorio." : "a fire, a land."}
        intro={
          it
            ? "Terra Mia è il ristorante di Umberto e Jolanda, nel centro storico di Agnone. Una cucina che parte dal Molise e una brace che accoglie i migliori tagli."
            : "Terra Mia is Umberto and Jolanda's restaurant in the historic centre of Agnone. A kitchen rooted in Molise and a grill that welcomes the finest cuts."
        }
      />
      <Welcome locale={locale} />
      <section className="py-24">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading eyebrow={it ? "Il nome" : "The name"} title="Terra" italic="Mia." />
          </div>
          <div className="space-y-5 text-ivory/75 md:col-span-6 md:col-start-7 md:text-lg" data-reveal>
            <p>
              {it
                ? "\"Terra mia\": un modo di dire appartenenza. Al territorio, ai suoi prodotti, alle sue ricette."
                : "\"Terra mia\" — \"my land\": a way of saying you belong. To a place, its produce, its recipes."}
            </p>
            <p className="text-sm text-stone">
              {it ? "Origine del nome e storia del ristorante da raccontare con le parole dei titolari." : "The origin of the name and the restaurant's story will be told in the owners' own words."}
              <ToConfirm locale={locale} />
            </p>
          </div>
        </Container>
      </section>
      <Palazzo locale={locale} />
      <Garden locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

export function GrillPage({ locale }: P) {
  const it = locale === "it";
  const grill = menuItems.filter((m) => m.category === "brace");
  return (
    <>
      <PageHero
        eyebrow={it ? "La braceria" : "The grill"}
        title={it ? "Carni scelte," : "Chosen cuts,"}
        italic={it ? "fuoco vivo." : "live fire."}
        intro={
          it
            ? "Un'ampia scelta di carni nazionali e internazionali alla brace, accanto alla cucina del territorio."
            : "A wide choice of Italian and international meat from the grill, alongside regional cooking."
        }
      />
      <GrillArt locale={locale} />
      <section className="border-t border-ivory/10 bg-[#171412] py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow={it ? "Selezione delle carni" : "Meat selection"}
            title={it ? "Dalla brace" : "From the grill"}
            italic={it ? "alla tavola." : "to the table."}
            intro={
              <>
                {it
                  ? "La selezione cambia secondo disponibilità. Provenienze, razze e frollature saranno indicate per ogni taglio."
                  : "The selection changes with availability. Origin, breed and ageing will be listed for each cut."}
                <ToConfirm locale={locale} note="Nessuna provenienza o frollatura pubblicata senza conferma" />
              </>
            }
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {grill.map((g, i) => (
              <li key={g.id} className="border border-ivory/10 p-8" data-reveal>
                <span className="display text-4xl text-fire">0{i + 1}</span>
                <h3 className="display mt-6 text-3xl text-ivory">{g.name[locale]}</h3>
                <p className="mt-3 text-sm text-ivory/65">{g.description[locale]}</p>
                <dl className="mt-6 grid grid-cols-2 gap-2 text-xs">
                  <dt className="text-stone">{it ? "Provenienza" : "Origin"}</dt><dd className="text-ivory/50">—</dd>
                  <dt className="text-stone">{it ? "Peso" : "Weight"}</dt><dd className="text-ivory/50">—</dd>
                </dl>
              </li>
            ))}
          </ul>
          <div className="mt-12" data-reveal>
            <ButtonLink href={href("menu", locale) + "#brace"}>{it ? "Vedi nel menu" : "See on the menu"}</ButtonLink>
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

export function CuisinePage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow={it ? "La nostra cucina" : "Our cuisine"}
        title={it ? "Il Molise," : "Molise,"}
        italic={it ? "riletto dallo chef." : "reread by the chef."}
        intro={
          it
            ? "Paste fatte in casa, agnello, latticini dell'Alto Molise e ingredienti di stagione: la cucina del territorio con uno sguardo contemporaneo."
            : "Handmade pasta, lamb, Alto Molise dairy and seasonal ingredients: regional cooking with a contemporary eye."
        }
      />
      <Chef locale={locale} />
      <Philosophy locale={locale} />
      <Signatures locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

export function MenuPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow="Menu"
        title={it ? "La carta" : "The menu"}
        italic={it ? "di Terra Mia." : "of Terra Mia."}
        intro={
          it
            ? "Il menu segue le stagioni e può variare. Piatti e disponibilità vanno sempre confermati in sala."
            : "The menu follows the seasons and may change. Dishes and availability should always be confirmed at the table."
        }
      />
      <Container className="pb-28">
        {demoMode && (
          <p className="mb-10 text-sm text-stone">
            {it
              ? "Demo: piatti ricavati da guide e recensioni pubbliche, prezzi non pubblicati. Il ristorante potrà aggiornare tutto dall'area riservata."
              : "Demo: dishes taken from public guides and reviews, prices not published. The restaurant will be able to update everything from the admin area."}
          </p>
        )}
        <MenuView locale={locale} />
      </Container>
      <CtaBand locale={locale} />
    </>
  );
}

export function WinePage({ locale }: P) {
  const it = locale === "it";
  const pairing = it
    ? [
        ["Con la brace", "Rossi strutturati per i tagli importanti; il personale vi guida nella scelta."],
        ["Con le paste", "Bianchi e rossi del territorio per i primi al sugo di agnello e i ripieni."],
        ["Con i latticini", "Bollicine e bianchi freschi per accompagnare la stracciata e gli antipasti."],
      ]
    : [
        ["With the grill", "Structured reds for the bigger cuts; our staff will guide your choice."],
        ["With pasta", "Local whites and reds for lamb ragù and filled pasta."],
        ["With dairy", "Sparkling and fresh whites to go with stracciata and starters."],
      ];
  return (
    <>
      <PageHero
        eyebrow={it ? "La cantina" : "Wine cellar"}
        title={it ? "Etichette italiane," : "Italian labels,"}
        italic={it ? "anima molisana." : "Molise at heart."}
        intro={
          it
            ? "Una carta di vini italiani con molti produttori del Molise, scelti per accompagnare la cucina e la brace."
            : "A list of Italian wines with many Molise producers, chosen to accompany the cooking and the grill."
        }
      />
      <Wine locale={locale} />
      <section className="border-t border-ivory/10 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow={it ? "Abbinamenti" : "Pairings"} title={it ? "Il vino giusto" : "The right wine"} italic={it ? "per ogni piatto." : "for every dish."} />
          <div className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-3">
            {pairing.map(([k, v]) => (
              <div key={k} className="bg-coal p-10" data-reveal>
                <h3 className="display text-3xl text-ivory">{k}</h3>
                <p className="mt-3 text-ivory/65">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-14" data-mask>
            <PhotoFrame locale={locale} subject={it ? "La cantina" : "The cellar"} photo="cantina" ratio="aspect-[21/9]" />
          </div>
          <div className="mt-14 border border-dashed border-ivory/20 p-10 text-center" data-reveal>
            <p className="display text-3xl text-ivory">{it ? "Carta dei vini" : "Wine list"}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ivory/60">
              {it
                ? "Struttura pronta per pubblicare etichette, produttori, denominazioni e annate: verrà compilata con il ristorante. Nessuna etichetta è mostrata finché non è confermata."
                : "Ready to publish labels, producers, appellations and vintages: it will be filled in with the restaurant. No label is shown until confirmed."}
              <ToConfirm locale={locale} />
            </p>
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

export function GalleryPage({ locale }: P) {
  const it = locale === "it";
  const shots: { s: [string, string]; tone: "fire" | "wine" | "stone" | "garden"; r: string; span?: string; m?: Motif; p: PhotoKey }[] = [
    { p: "braceCarboni", s: ["La brace", "The embers"], tone: "fire", r: "aspect-[4/5]" },
    { p: "salaVolte", s: ["La sala", "The dining room"], tone: "stone", r: "aspect-[16/10]", span: "md:col-span-2" },
    { p: "giardino", s: ["Il giardino", "The garden"], tone: "garden", r: "aspect-[16/10]", span: "md:col-span-2" },
    { p: "ravioli", s: ["Tortellacci di agnello", "Lamb tortellacci"], tone: "wine", r: "aspect-[4/5]", m: "dish" },
    { p: "chef", s: ["Lo chef al lavoro", "The chef at work"], tone: "stone", r: "aspect-[4/5]", m: "chef" },
    { p: "stracciata", s: ["Stracciata in carrozza", "Stracciata in carrozza"], tone: "fire", r: "aspect-[4/5]", m: "dish" },
    { p: "cantina", s: ["La cantina", "The cellar"], tone: "wine", r: "aspect-[4/5]" },
    { p: "salaPietra", s: ["Atmosfera", "Atmosphere"], tone: "stone", r: "aspect-[16/10]", span: "md:col-span-2" },
    { p: "tagliataTagliere", s: ["Il taglio", "The cut"], tone: "fire", r: "aspect-[4/5]" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={it ? "Gli ambienti," : "The rooms,"}
        italic={it ? "i piatti, il fuoco." : "the dishes, the fire."}
        intro={
          it
            ? "Gli ambienti, i piatti e la brace. In questa demo le immagini sono illustrative: verranno sostituite dal servizio fotografico del ristorante."
            : "The rooms, the dishes and the grill. In this demo the images are illustrative and will be replaced by the restaurant's own photo shoot."
        }
      />
      <Container className="pb-28">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {shots.map((x) => (
            <li key={x.s[0]} className={x.span || ""} data-reveal>
              <PhotoFrame locale={locale} subject={it ? x.s[0] : x.s[1]} tone={x.tone} motif={x.m} photo={x.p} ratio={x.r} className="h-full" />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-4" data-reveal>
          <ButtonLink href={restaurant.instagram} variant="ghost">Instagram →</ButtonLink>
          <ButtonLink href={restaurant.facebook} variant="ghost">Facebook →</ButtonLink>
        </div>
      </Container>
      <CtaBand locale={locale} />
    </>
  );
}

export function ReviewsPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow={it ? "Recensioni" : "Reviews"}
        title={it ? "La parola" : "Over to"}
        italic={it ? "ai nostri ospiti." : "our guests."}
        intro={
          it
            ? "Valutazioni e recensioni pubbliche, con il collegamento alle fonti originali."
            : "Public ratings and reviews, linked to the original sources."
        }
      />
      <Reviews locale={locale} full />
      <CtaBand locale={locale} />
    </>
  );
}

export function ContactPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow={it ? "Contatti e prenotazioni" : "Contact & booking"}
        title={it ? "Vieni a trovarci" : "Come and visit"}
        italic={it ? "ad Agnone." : "in Agnone."}
        intro={
          it
            ? "Richiedi un tavolo online o chiamaci. Ti rispondiamo con la conferma."
            : "Request a table online or call us. We'll reply with a confirmation."
        }
      />
      <Booking locale={locale} />
      <section className="border-t border-ivory/10 py-24 md:py-32" aria-labelledby="where-title">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading id="where-title" eyebrow={it ? "Come arrivare" : "Getting here"} title={it ? "Centro storico" : "Historic centre"} italic="di Agnone." />
            <ul className="mt-10 space-y-6 text-ivory/75" data-reveal>
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-fire" aria-hidden="true" />
                <span>
                  {restaurant.street}
                  <ToConfirm locale={locale} note="Civico da confermare (1/C o 4)" />
                  <br />
                  {restaurant.postalCode} {restaurant.city} ({restaurant.province})
                </span>
              </li>
              <li className="flex gap-4">
                <Car className="mt-1 h-5 w-5 shrink-0 text-fire" aria-hidden="true" />
                <span>
                  {it
                    ? "Il ristorante è nel centro storico: consigliamo di parcheggiare nelle vie vicine e raggiungere la piazza a piedi."
                    : "The restaurant is in the historic centre: we recommend parking nearby and walking to the square."}
                </span>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4" data-reveal>
              <ButtonLink href={restaurant.directionsUrl}>
                <Navigation className="h-4 w-4" aria-hidden="true" /> {it ? "Indicazioni stradali" : "Get directions"}
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden border border-ivory/10"
              aria-label={it ? "Apri la posizione su Google Maps" : "Open the location on Google Maps"}
              data-reveal
            >
              <MapGraphic />
              <span className="absolute bottom-5 left-5 rounded-full bg-coal/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-ivory group-hover:text-fire">
                Google Maps →
              </span>
            </a>
            <p className="mt-3 text-xs text-ivory/45">
              {it
                ? "Mappa non incorporata per evitare cookie di terze parti: si apre su Google Maps."
                : "The map is not embedded to avoid third-party cookies: it opens in Google Maps."}
            </p>
            <div className="mt-10"><HoursList locale={locale} /></div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Grafica cartografica stilizzata (nessuna richiesta a server esterni) */
function MapGraphic() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full bg-[#1a1613]" role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="pin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d87a3a" stopOpacity=".7" />
          <stop offset="100%" stopColor="#d87a3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(14)].map((_, i) => (
        <path key={i} d={`M${-20 + i * 32} 0 Q ${40 + i * 30} ${120 + (i % 3) * 20} ${i * 34 - 10} 300`} stroke="#c8b7a0" strokeOpacity=".08" fill="none" />
      ))}
      <path d="M0 180 C 90 150, 160 210, 230 160 S 360 120, 400 150" stroke="#c8b7a0" strokeOpacity=".28" strokeWidth="6" fill="none" />
      <path d="M160 0 C 180 80, 150 140, 205 155 S 250 260, 230 300" stroke="#c8b7a0" strokeOpacity=".2" strokeWidth="4" fill="none" />
      <rect x="182" y="130" width="46" height="34" fill="#c8b7a0" fillOpacity=".08" stroke="#c8b7a0" strokeOpacity=".25" />
      <circle cx="205" cy="148" r="44" fill="url(#pin)" />
      <circle cx="205" cy="148" r="6" fill="#d87a3a" />
      <text x="218" y="128" fill="#f5f0e6" fontSize="11" fontFamily="serif" fontStyle="italic">Terra Mia</text>
      <text x="218" y="142" fill="#c8b7a0" fontSize="8" letterSpacing="2">PIAZZA PLEBISCITO</text>
    </svg>
  );
}
