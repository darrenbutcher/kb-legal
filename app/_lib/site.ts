const email = "besancon@kb-legal.com";
const mapsQuery = "28a Front Street, Philipsburg, Sint Maarten";

export const site = {
  name: "KB Legal",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kb-legal.com",
  title: "KB Legal | Boutique Corporate Law Firm in Sint Maarten",
  description:
    "KB Legal is a boutique corporate law firm in Sint Maarten, Dutch Caribbean. Partner-level expertise in M&A, joint ventures, corporate structuring and governance, at manageable rates.",
  email,
  phone: "+1 721 542-4171",
  phoneHref: "tel:+17215424171",
  linkedin: "#",
  // TODO: add the Chamber of Commerce registration number; it appears on the
  // disclaimer once set.
  chamberOfCommerce: "",
  legalUpdated: "2026-10-07",
  founderLinkedin: "#",
  // Every "Book a consultation" button leads here.
  bookPath: "/where#book",
  // TODO: replace with Kamla's scheduling link (e.g. Calendly) once available.
  bookingUrl: `mailto:${email}?subject=${encodeURIComponent("Consultation request")}`,
  address: {
    street: "28a Front Street",
    city: "Philipsburg",
    country: "Sint Maarten",
    countryCode: "SX",
  },
  maps: {
    embed: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  },
} as const;

export const nav = [
  { href: "/who", label: "WHO" },
  { href: "/what", label: "WHAT" },
  { href: "/why", label: "WHY" },
  { href: "/where", label: "WHERE" },
] as const;
