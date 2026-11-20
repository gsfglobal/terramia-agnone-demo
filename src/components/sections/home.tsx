import Link from "next/link";
import { Flame, Mountain, Wheat, Star, ExternalLink } from "lucide-react";
import { ratings, restaurant } from "@/config/site";
import { signatureDishes } from "@/data/menu";
import { dishPhotos } from "@/data/photos";
import { reviewSummaries, reviewThemes } from "@/data/reviews";
import { href, type Locale, ui } from "@/lib/i18n";
import BookingForm from "../BookingForm";
import { HoursList } from "../Hours";
import TiltCard from "../TiltCard";
import { ButtonLink, Container, PhotoFrame, SectionHeading, ToConfirm } from "../ui";

type P = { locale: Locale };

/* 02 — BENVENUTI ---------------------------------------------------- */
export function Welcome({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="py-28 md:py-40" aria-labelledby="welcome-title">
      <Container className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          <SectionHeading
            id="welcome-title"
            index="02"
            eyebrow={it ? "Benvenuti da Terra Mia" : "Welcome to Terra Mia"}
            title={it ? "Una tavola nel cuore" : "A table in the heart"}
            italic={it ? "di Agnone." : "of Agnone."}
          />
          <div className="mt-8 space-y-5 text-ivory/75 md:text-lg" data-reveal>
            <p>
              {it
                ? "Al piano terra di Palazzo Bonanni, affacciato su Piazza Plebiscito, Terra Mia unisce due anime: la cucina del territorio, riletta dallo chef, e la brace, dove carni italiane e internazionali trovano la loro cottura."
                : "On the ground floor of Palazzo Bonanni, overlooking Piazza Plebiscito, Terra Mia brings together two souls: regional cooking reinterpreted by the chef, and the grill, where Italian and international meats meet the embers."}
            </p>
            <p>
              {it
                ? "Una gestione familiare, quella di Umberto e Jolanda: lui in cucina, l'accoglienza in sala. In estate, il giardino sul retro diventa una sala all'aperto."
                : "A family-run house, led by Umberto and Jolanda: he cooks, while the welcome happens in the dining room. In summer, the rear garden becomes an open-air dining room."}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <ButtonLink href={href("story", locale)} variant="ghost">{it ? "La nostra storia" : "Our story"}</ButtonLink>
          </div>
        </div>
        <div className="relative md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div data-mask>
            <PhotoFrame locale={locale} subject={it ? "La sala" : "The dining room"} photo="salaPietra" tone="stone" ratio="aspect-[4/5]" />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden w-48 md:block lg:-left-16 lg:w-60" data-parallax="80">
            <PhotoFrame locale={locale} subject={it ? "Il calice" : "The glass"} photo="vinoCalice" ratio="aspect-square" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 03 — FILOSOFIA ---------------------------------------------------- */
export function Philosophy({ locale }: P) {
  const it = locale === "it";
  const pillars = [
    {
      icon: Mountain,
      title: it ? "Territorio" : "Land",
      text: it
        ? "La cucina parte dall'Alto Molise e dal confine con l'Abruzzo: latticini come la stracciata, l'agnello, le paste fatte a mano."
        : "The cooking starts from Alto Molise and its border with Abruzzo: dairy such as stracciata, lamb, handmade pasta.",
    },
    {
      icon: Wheat,
      title: it ? "Materia prima" : "Ingredients",
      text: it
        ? "Ingredienti di stagione e un menu che cambia con loro. Carni di provenienza locale, italiana e internazionale."
        : "Seasonal ingredients and a menu that changes with them. Meat of local, Italian and international origin.",
    },
    {
      icon: Flame,
      title: it ? "Fuoco" : "Fire",
      text: it
        ? "La brace come gesto antico e come tecnica: la cottura su misura per ogni taglio, come chiede l'ospite."
        : "The grill as an ancient gesture and a technique: each cut cooked the way the guest asks.",
    },
  ];
  return (
    <section className="relative border-y border-ivory/10 bg-[#171412] py-28 md:py-36" aria-labelledby="phil-title">
      <Container>
        <SectionHeading
          id="phil-title"
          index="03"
          eyebrow={it ? "La nostra filosofia" : "Our philosophy"}
          title={it ? "Fuoco. Territorio." : "Fire. Land."}
          italic={it ? "Materia prima." : "Ingredients."}
          align="center"
        />
        <div className="mt-20 grid gap-px overflow-hidden bg-ivory/10 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="group bg-[#171412] p-10 transition-colors duration-700 hover:bg-[#1f1a17] md:p-12" data-reveal>
              <div className="flex items-center justify-between">
                <Icon className="h-7 w-7 text-fire transition-transform duration-700 group-hover:-translate-y-1" aria-hidden="true" strokeWidth={1.3} />
                <span className="display text-5xl text-ivory/10">0{i + 1}</span>
              </div>
              <h3 className="display mt-10 text-4xl text-ivory">{title}</h3>
              <p className="mt-4 leading-relaxed text-ivory/65">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 04 — L'ARTE DELLA BRACE ------------------------------------------- */
export function GrillArt({ locale }: P) {
  const it = locale === "it";
  const points = it
    ? [
        ["Selezione", "Carni nazionali e internazionali, scelte secondo la disponibilità del momento."],
        ["Tagli", "Tagliata, entrecôte e altri tagli per la brace: la carta del giorno si legge in sala."],
        ["Cottura", "Al punto richiesto, sul calore vivo dei carboni. Gli ospiti la descrivono tenera e precisa."],
        ["Provenienze", "Origine e caratteristiche di ogni taglio saranno indicate in carta."],
      ]
    : [
        ["Selection", "Italian and international meat, chosen according to what is available."],
        ["Cuts", "Tagliata, entrecôte and other cuts for the grill: the day's selection is presented at the table."],
        ["Cooking", "Done to your liking, over live coals. Guests describe it as tender and precise."],
        ["Origins", "The origin and character of each cut will be listed on the menu."],
      ];
  return (
    <section className="relative overflow-hidden py-28 md:py-40" aria-labelledby="grill-title">
      <div className="pointer-events-none absolute -right-40 top-20 h-[38rem] w-[38rem] rounded-full bg-fire/15 blur-[120px]" aria-hidden="true" />
      <Container className="relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="grill-title"
            index="04"
            eyebrow={it ? "L'arte della brace" : "The art of the grill"}
            title={it ? "Il tempo giusto" : "The right time"}
            italic={it ? "sul fuoco vivo." : "over live fire."}
            intro={
              it
                ? "La brace è il cuore di Terra Mia. Non una semplice griglia, ma una cucina che si regola sul fuoco."
                : "The grill is the heart of Terra Mia. Not just a barbecue, but a kitchen that tunes itself to the fire."
            }
          />
          <dl className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
            {points.map(([k, v], i) => (
              <div key={k} className="grid grid-cols-[3rem_1fr] gap-4 py-6" data-reveal>
                <dt className="display text-2xl text-fire">0{i + 1}</dt>
                <dd>
                  <p className="font-semibold text-ivory">
                    {k}
                    {(i === 1 || i === 3) && <ToConfirm locale={locale} />}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory/65">{v}</p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <ButtonLink href={href("grill", locale)}>{it ? "Visualizza la selezione delle carni" : "View the meat selection"}</ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
          <div className="col-span-2" data-mask>
            <PhotoFrame locale={locale} subject={it ? "La brace accesa" : "The live embers"} photo="braceGriglia" ratio="aspect-[16/10]" />
          </div>
          <div data-parallax="40"><PhotoFrame locale={locale} subject={it ? "Il taglio" : "The cut"} photo="taglio" tone="wine" ratio="aspect-[3/4]" /></div>
          <div className="mt-16" data-parallax="90"><PhotoFrame locale={locale} subject={it ? "La tagliata" : "The tagliata"} photo="tagliata" tone="stone" ratio="aspect-[3/4]" /></div>
        </div>
      </Container>
    </section>
  );
}

/* 05 — SIGNATURE DISHES --------------------------------------------- */
export function Signatures({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="overflow-hidden border-t border-ivory/10 bg-[#171412] py-28 md:py-36" aria-labelledby="sig-title">
      <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          id="sig-title"
          index="05"
          eyebrow={it ? "Signature dishes" : "Signature dishes"}
          title={it ? "I piatti che" : "The dishes that"}
          italic={it ? "ci raccontano." : "tell our story."}
          intro={
            <>
              {it
                ? "Piatti citati dalle guide e dagli ospiti. La carta segue le stagioni."
                : "Dishes mentioned by guides and guests. The menu follows the seasons."}
              <ToConfirm locale={locale} note="Disponibilità nel menu corrente da verificare con lo chef" />
            </>
          }
        />
        <div data-reveal>
          <ButtonLink href={href("menu", locale)} variant="ghost">{ui.exploreMenu[locale]} →</ButtonLink>
        </div>
      </Container>
      <div className="mt-16 overflow-x-auto pb-8 [scrollbar-width:thin]" tabIndex={0} aria-label={it ? "Piatti signature, scorri orizzontalmente" : "Signature dishes, scroll horizontally"}>
        <ul className="flex snap-x snap-mandatory gap-6 px-6 md:px-12 lg:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
          {signatureDishes.map((d, i) => (
            <li key={d.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[28rem]" data-reveal>
              <TiltCard className="group">
                <PhotoFrame locale={locale} subject={d.name[locale]} photo={dishPhotos[d.id]} motif="dish" tone={i % 3 === 0 ? "fire" : i % 3 === 1 ? "wine" : "stone"} ratio="aspect-[4/5]" />
                <div className="mt-6 flex items-start gap-4" style={{ transform: "translateZ(30px)" }}>
                  <span className="display text-3xl text-fire">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display text-3xl leading-tight text-ivory">{d.name[locale]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/60">{d.description[locale]}</p>
                  </div>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 06 — LO CHEF ------------------------------------------------------ */
export function Chef({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="py-28 md:py-40" aria-labelledby="chef-title">
      <Container className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-5" data-mask>
          <PhotoFrame locale={locale} subject={it ? "In cucina" : "In the kitchen"} photo="chef" tone="stone" ratio="aspect-[3/4]" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <SectionHeading
            id="chef-title"
            index="06"
            eyebrow={it ? "Lo chef e la cucina" : "The chef & the kitchen"}
            title="Umberto"
            italic="Masciotra."
          />
          <div className="mt-8 space-y-5 text-ivory/75 md:text-lg" data-reveal>
            <p>
              {it
                ? "Formato alla scuola internazionale di cucina ALMA di Colorno e cresciuto nella brigata di Villa Majella a Guardiagrele, Umberto porta a Terra Mia un dialogo continuo tra Molise e Abruzzo."
                : "Trained at ALMA, the international culinary school in Colorno, and shaped in the kitchen of Villa Majella in Guardiagrele, Umberto brings a constant dialogue between Molise and Abruzzo to Terra Mia."}
            </p>
            <p>
              {it
                ? "La sua è una cucina del territorio rivisitata: ricette riconoscibili, una lettura contemporanea, e la brace come linguaggio comune."
                : "His is regional cooking, revisited: recognisable recipes, a contemporary reading, and the grill as a shared language."}
              <ToConfirm locale={locale} note="Percorso da fonte AIC: far approvare il testo allo chef" />
            </p>
          </div>
          <blockquote className="display mt-12 border-l border-fire pl-6 text-3xl italic leading-snug text-ivory/90 md:text-4xl" data-reveal>
            {it ? "«Spazio riservato a una frase dello chef.»" : "“Space reserved for a quote from the chef.”"}
          </blockquote>
          <div className="mt-10" data-reveal>
            <ButtonLink href={href("cuisine", locale)} variant="ghost">{ui.discover[locale]}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 07 — MENU (anteprima) ---------------------------------------------- */
export function MenuTeaser({ locale }: P) {
  const it = locale === "it";
  const cats = it
    ? ["Antipasti", "Primi", "Secondi", "Carni alla brace", "Contorni", "Dessert", "Vini"]
    : ["Starters", "First courses", "Mains", "From the grill", "Sides", "Desserts", "Wines"];
  return (
    <section className="relative overflow-hidden border-y border-ivory/10 py-28 md:py-36" aria-labelledby="menu-title">
      <div className="ember-static pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <Container className="relative grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeading
            id="menu-title"
            index="07"
            eyebrow="Menu"
            title={it ? "La carta," : "The menu,"}
            italic={it ? "stagione dopo stagione." : "season by season."}
            intro={
              it
                ? "Un menu sempre aggiornato, con allergeni indicati e piatti stagionali in evidenza."
                : "An always up-to-date menu, with allergens listed and seasonal dishes highlighted."
            }
          />
          <div className="mt-10" data-reveal>
            <ButtonLink href={href("menu", locale)}>{ui.exploreMenu[locale]}</ButtonLink>
          </div>
        </div>
        <ol className="md:col-span-6 md:col-start-7">
          {cats.map((c, i) => (
            <li key={c} data-reveal>
              <Link
                href={href("menu", locale) + "#" + ["antipasti", "primi", "secondi", "brace", "contorni", "dessert", "vini"][i]}
                className="group flex items-baseline justify-between border-b border-ivory/10 py-5 transition-colors hover:border-fire"
              >
                <span className="display text-3xl text-ivory transition-all duration-500 group-hover:translate-x-2 group-hover:text-fire md:text-4xl">
                  {c}
                </span>
                <span className="text-xs tabular-nums text-stone">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* 08 — PALAZZO BONANNI ---------------------------------------------- */
export function Palazzo({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="py-28 md:py-40" aria-labelledby="palazzo-title">
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading
              id="palazzo-title"
              index="08"
              eyebrow="Palazzo Bonanni"
              title={it ? "Pietra, legno" : "Stone, wood"}
              italic={it ? "e luce calda." : "and warm light."}
            />
          </div>
          <div className="space-y-5 text-ivory/75 md:col-span-6 md:col-start-7 md:text-lg" data-reveal>
            <p>
              {it
                ? "Il ristorante occupa il piano terra di uno storico palazzo cittadino, nel centro di Agnone, la città delle campane e del rame. Una sala raccolta di 45 coperti, dove i materiali raccontano il luogo."
                : "The restaurant occupies the ground floor of a historic town palazzo in the centre of Agnone, the town of bells and copper. An intimate room of 45 covers, where materials tell the story of the place."}
            </p>
            <p className="text-sm text-stone">
              {it ? "Storia e dettagli architettonici del palazzo saranno raccontati con il titolare." : "The history and architecture of the palazzo will be told together with the owner."}
              <ToConfirm locale={locale} />
            </p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-6 gap-4 md:gap-6">
          <div className="col-span-6 md:col-span-4" data-mask>
            <PhotoFrame locale={locale} subject={it ? "Pietra e volte" : "Stone and vaults"} photo="salaVolte" tone="stone" ratio="aspect-[16/10]" />
          </div>
          <div className="col-span-3 md:col-span-2" data-parallax="60">
            <PhotoFrame locale={locale} subject={it ? "Materiali" : "Materials"} photo="pietraDettaglio" ratio="aspect-[3/4]" />
          </div>
          <div className="col-span-3 md:hidden">
            <PhotoFrame locale={locale} subject={it ? "Atmosfera" : "Atmosphere"} photo="vinoCalice" tone="wine" ratio="aspect-[3/4]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 09 — GIARDINO ESTIVO ---------------------------------------------- */
export function Garden({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="relative overflow-hidden bg-[#141511] py-28 md:py-40" aria-labelledby="garden-title">
      <Container className="grid items-end gap-12 md:grid-cols-12">
        <div className="md:col-span-7" data-mask>
          <PhotoFrame locale={locale} subject={it ? "Il giardino d'estate" : "The garden in summer"} photo="giardino" tone="garden" ratio="aspect-[16/11]" />
        </div>
        <div className="md:col-span-5">
          <SectionHeading
            id="garden-title"
            index="09"
            eyebrow={it ? "Il giardino estivo" : "The summer garden"}
            title={it ? "Cene d'estate," : "Summer dinners,"}
            italic={it ? "all'aperto." : "outdoors."}
            intro={
              it
                ? "Sul retro del palazzo, un giardino riservato accoglie fino a 50 ospiti nella bella stagione. Uno dei luoghi più ricordati da chi viene a trovarci."
                : "Behind the palazzo, a private garden welcomes up to 50 guests in the warm season. One of the places our guests remember most."
            }
          />
          <p className="mt-4 text-sm text-stone" data-reveal>
            {it ? "Apertura stagionale: date da confermare." : "Seasonal opening: dates to be confirmed."}
            <ToConfirm locale={locale} />
          </p>
          <div className="mt-10" data-reveal>
            <ButtonLink href={href("contact", locale) + "#prenota"}>{it ? "Richiedi un tavolo" : "Request a table"}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 10 — VINI --------------------------------------------------------- */
export function Wine({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="relative overflow-hidden py-28 md:py-40" aria-labelledby="wine-title">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-wine/50 blur-[120px]" aria-hidden="true" />
      <Container className="relative grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <SectionHeading
            id="wine-title"
            index="10"
            eyebrow={it ? "Vini e abbinamenti" : "Wine & pairing"}
            title={it ? "Il Molise" : "Molise"}
            italic={it ? "nel bicchiere." : "in the glass."}
            intro={
              it
                ? "Una carta di etichette italiane, con molti produttori molisani. Il vino accompagna la brace e la cucina dello chef, e in sala vi aiutiamo a scegliere l'abbinamento."
                : "A list of Italian labels with many Molise producers. Wine accompanies the grill and the chef's cooking, and our staff will help you choose a pairing."
            }
          />
          <div className="mt-10" data-reveal>
            <ButtonLink href={href("wine", locale)} variant="ghost">{it ? "Scopri la carta dei vini" : "Discover the wine list"}</ButtonLink>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8" data-parallax="50">
          <PhotoFrame locale={locale} subject={it ? "La cantina" : "The cellar"} photo="vinoCalice" tone="wine" ratio="aspect-[4/5]" />
        </div>
      </Container>
    </section>
  );
}

/* 11 — RECENSIONI --------------------------------------------------- */
export function Reviews({ locale, full = false }: P & { full?: boolean }) {
  const it = locale === "it";
  const list = full ? reviewSummaries : reviewSummaries.slice(0, 3);
  return (
    <section className="border-y border-ivory/10 bg-[#171412] py-28 md:py-36" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading
          id="reviews-title"
          index="11"
          eyebrow={it ? "Le parole degli ospiti" : "What our guests say"}
          title={it ? "Raccontato da" : "Told by"}
          italic={it ? "chi si è seduto a tavola." : "those who sat at our table."}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <a href={restaurant.tripadvisor} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 border border-ivory/10 p-8 transition-colors hover:border-fire/50" data-reveal>
            <div>
              <p className="eyebrow">Tripadvisor</p>
              <p className="display mt-3 text-6xl text-ivory">{ratings.tripadvisor.value.toLocaleString(locale)}<span className="text-2xl text-stone">/5</span></p>
              <p className="mt-2 text-sm text-ivory/65">
                {ratings.tripadvisor.count} {it ? "recensioni" : "reviews"} · {it ? "N. 1 di 22 ristoranti ad Agnone" : "#1 of 22 restaurants in Agnone"}
              </p>
              <p className="mt-1 text-xs text-stone">Travellers&apos; Choice 2026 · {it ? "verificato il" : "checked on"} {ratings.tripadvisor.checked}</p>
            </div>
            <ExternalLink className="h-5 w-5 shrink-0 text-stone group-hover:text-fire" aria-hidden="true" />
          </a>
          <a href={restaurant.googleReviews} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 border border-ivory/10 p-8 transition-colors hover:border-fire/50" data-reveal>
            <div>
              <p className="eyebrow">Google</p>
              <p className="display mt-3 text-6xl text-ivory">{ratings.google.value.toLocaleString(locale)}<span className="text-2xl text-stone">/5</span></p>
              <p className="mt-2 text-sm text-ivory/65">
                {it ? "circa" : "about"} {ratings.google.count} {it ? "recensioni" : "reviews"}
                <ToConfirm locale={locale} note={ratings.google.checked} />
              </p>
            </div>
            <ExternalLink className="h-5 w-5 shrink-0 text-stone group-hover:text-fire" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {list.map((r) => (
            <li key={r.author + r.date} className="flex flex-col justify-between border border-ivory/10 p-8" data-reveal>
              <div>
                {r.rating && (
                  <div className="flex gap-1 text-fire" aria-label={`${r.rating}/5`}>
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}
                  </div>
                )}
                <p className="display mt-5 text-2xl leading-snug text-ivory/90">{r[locale]}</p>
              </div>
              <p className="mt-8 text-xs text-stone">
                {r.author} · {r.source} · {r.date} ·{" "}
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-underline text-ivory/70">{it ? "fonte" : "source"}</a>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ivory/45" data-reveal>
          {it
            ? "Sintesi di recensioni pubbliche reali, riformulate. Le testimonianze definitive saranno scelte con il ristorante."
            : "Paraphrased summaries of real public reviews. Final testimonials will be selected with the restaurant."}
        </p>

        {full && (
          <div className="mt-20 grid gap-px bg-ivory/10 md:grid-cols-4">
            {reviewThemes.map((th) => (
              <div key={th.it} className="bg-[#171412] p-8" data-reveal>
                <h3 className="display text-2xl text-fire">{th[locale]}</h3>
                <p className="mt-3 text-sm text-ivory/65">{th.note[locale]}</p>
              </div>
            ))}
          </div>
        )}

        {!full && (
          <div className="mt-12" data-reveal>
            <ButtonLink href={href("reviews", locale)} variant="ghost">{it ? "Tutte le recensioni" : "All reviews"}</ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}

/* 12 — PRENOTA ------------------------------------------------------ */
export function Booking({ locale }: P) {
  const it = locale === "it";
  return (
    <section id="prenota" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40" aria-labelledby="book-title">
      <div className="ember-static pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <Container className="relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="book-title"
            index="12"
            eyebrow={it ? "Prenota il tuo tavolo" : "Book your table"}
            title={it ? "Vi aspettiamo" : "We look forward"}
            italic={it ? "a tavola." : "to seeing you."}
            intro={it ? "Invia una richiesta oppure chiamaci: ti confermiamo il tavolo il prima possibile." : "Send a request or call us: we'll confirm your table as soon as possible."}
          />
          <div className="mt-10 space-y-6" data-reveal>
            <ButtonLink href={restaurant.phoneHref}>{ui.call[locale]} · {restaurant.phone}</ButtonLink>
            <p className="text-sm text-ivory/65">
              Email: <a href={`mailto:${restaurant.email}`} className="link-underline break-all text-ivory">{restaurant.email}</a>
            </p>
            <HoursList locale={locale} compact />
          </div>
        </div>
        <div className="border border-ivory/10 bg-coal/70 p-6 backdrop-blur-sm md:p-12 lg:col-span-7 lg:col-start-6" data-reveal>
          <BookingForm locale={locale} />
        </div>
      </Container>
    </section>
  );
}
