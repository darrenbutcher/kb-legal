export const site = {
  name: "KB Legal",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kb-legal.com",
  title: "KB Legal | Boutique Corporate Law Firm in Sint Maarten",
  description:
    "KB Legal is a boutique corporate law firm in Sint Maarten, Dutch Caribbean. Partner-level expertise in M&A, joint ventures, corporate structuring and governance, at manageable rates.",
  email: "besancon@kb-legal.com",
  phone: "+1 721 542-4171",
  phoneHref: "tel:+17215424171",
  linkedin: "#",
  address: {
    street: "28a Front Street",
    city: "Philipsburg",
    country: "Sint Maarten",
    countryCode: "SX",
  },
} as const;
