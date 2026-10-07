import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { CookieConsentProvider } from "./_components/cookie-consent";
import { RevealOnScroll } from "./_components/reveal-on-scroll";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { SiteToaster } from "./_components/site-toaster";
import { site } from "./_lib/site";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "corporate law firm Sint Maarten",
    "corporate lawyer Dutch Caribbean",
    "mergers and acquisitions",
    "M&A lawyer St. Maarten",
    "joint ventures",
    "corporate structuring",
    "corporate governance",
    "boutique law firm",
    "Philipsburg lawyer",
    "Kamla Besançon",
  ],
  category: "Legal services",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  // "only light" opts out of browsers' automatic dark mode (Chrome on
  // Android, Edge, Opera), which would otherwise invert the palette.
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS will reveal it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <CookieConsentProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <RevealOnScroll />
          <SiteToaster />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
