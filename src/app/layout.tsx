import type { Metadata, Viewport } from "next";
import { Golos_Text, Nunito } from "next/font/google";
import { kindergarten } from "@/shared/data/kindergarten";
import { seo } from "@/shared/data/seo";
import { LanguageProvider } from "@/shared/i18n/LanguageProvider";
import { SITE_URL } from "@/shared/lib/site-url";
import { MotionProvider } from "@/shared/ui/MotionProvider";
import "@/styles/globals.css";

// Both families ship Ә Ғ Қ Ң Ө Ұ Ү Һ І in their cyrillic-ext files (checked glyph by glyph).
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});
const golos = Golos_Text({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: "Детский сад «Улыбка»",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["kk_KZ"],
    url: "/",
    siteName: "Детский сад «Улыбка»",
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: kindergarten.legalName,
  alternateName: "Детский сад «Улыбка»",
  url: SITE_URL,
  telephone: kindergarten.phone.tel,
  sameAs: [kindergarten.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Болашак, 12Б",
    addressLocality: "с. Кайназар",
    addressRegion: "Алматинская область",
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: kindergarten.twoGis.lat, longitude: kindergarten.twoGis.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    opens: kindergarten.hours.opens,
    closes: kindergarten.hours.closes,
  },
  availableLanguage: ["ru"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${nunito.variable} ${golos.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
