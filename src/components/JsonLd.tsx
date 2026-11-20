import { hours, restaurant, siteUrl } from "@/config/site";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function RestaurantJsonLd({ locale }: { locale: "it" | "en" }) {
  const openingHoursSpecification = hours.flatMap((h) =>
    h.slots.map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayNames[h.day]}`,
      opens,
      closes,
    })),
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: restaurant.fullName,
    url: locale === "it" ? siteUrl : `${siteUrl}/en`,
    telephone: restaurant.phone,
    email: restaurant.email,
    servesCuisine: ["Italian", "Molise regional cuisine", "Grill / Barbecue"],
    priceRange: restaurant.priceRange,
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Piazza Plebiscito, Palazzo Bonanni",
      addressLocality: restaurant.city,
      addressRegion: restaurant.province,
      postalCode: restaurant.postalCode,
      addressCountry: restaurant.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: restaurant.geo.lat, longitude: restaurant.geo.lng },
    hasMap: restaurant.mapsUrl,
    sameAs: [restaurant.instagram, restaurant.facebook, restaurant.tripadvisor],
    menu: `${siteUrl}${locale === "it" ? "/menu" : "/en/menu"}`,
    employee: { "@type": "Person", name: restaurant.chef, jobTitle: "Chef" },
    openingHoursSpecification,
    // aggregateRating NON incluso: Google non accetta rating di terze parti nei dati strutturati
    // e il valore va riconfermato.
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
