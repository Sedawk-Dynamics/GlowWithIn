import type { Metadata, Viewport } from "next";
import { APEX_ORIGIN, SHOP_ORIGIN, contact } from "@/lib/links";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import "@/styles/globals.css";
import "@/styles/wp/be.css";
import "@/styles/wp/responsive.css";
import "@/styles/wp/animations.css";
import "@/styles/wp/fontawesome.css";
import "@/styles/wp/mfn-dynamic.css";
import "@/styles/wp/header-tmpl.css";
import "@/styles/wp/footer-tmpl.css";

export const metadata: Metadata = {
  metadataBase: new URL(APEX_ORIGIN),
  title: {
    default: "GlowWithin™ — For Her, Forever | Women's Wellness: Hair, Skin & Intimate Care",
    template: "%s | GlowWithin™",
  },
  description:
    "GlowWithin™ brings together thoughtfully selected ingredients, modern wellness science and everyday care to help her feel fresh, confident and beautifully herself — across hair, skin and intimate wellness. Your Glow Is Within. Let It Shine Through.",
  keywords: [
    "GlowWithin", "women's wellness", "hair serum", "face serum", "gel face cream", "intimate wash",
    "Sri Varamaha Wellness", "women first skincare India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "GlowWithin™",
    locale: "en_IN",
    type: "website",
    url: APEX_ORIGIN,
    title: "GlowWithin™ — For Her, Forever",
    description: "Thoughtful care created around her. Hair · Skin · Intimate wellness.",
    images: [{ url: "/images/banners/banner-4.webp", width: 2560, height: 1440, alt: "The GlowWithin™ Women Wellness Collection" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Body classes are the subset of the live site's `<body>` classes that the
 * ported BeTheme CSS keys off (header template, mobile side-slide menu,
 * colour scheme, full-width layout).
 */
const BODY_CLASSES =
  "mfn-header-template mfn-footer-default color-custom content-brightness-light input-brightness-light style-default button-animation-fade layout-full-width if-modern-overlay no-content-padding no-shadows mobile-tb-center mobile-side-slide mobile-mini-mr-ll mobile-icon-user-ss mobile-icon-wishlist-ss mobile-icon-search-ss mobile-icon-wpml-ss mobile-icon-action-ss";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GlowWithin™",
  legalName: contact.legalName,
  url: APEX_ORIGIN,
  logo: `${APEX_ORIGIN}/images/brand/glowwithin-logo.png`,
  slogan: contact.tagline,
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "C 1204, Rainbow Vistas, Phase 1, Green Hills Road, Moosapet",
    addressLocality: "Hyderabad",
    postalCode: "500018",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  founder: { "@type": "Person", name: "Srilatha" },
  sameAs: [SHOP_ORIGIN],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Same families / weights the live site loads, so metrics match exactly.
            (App Router layout — the pages-router lint rule below does not apply.) */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Suranna&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body className={BODY_CLASSES}>
        <div id="Wrapper">
          <SiteHeader />
          <div id="Content">
            <main id="main" className="content_wrapper clearfix">
              {children}
            </main>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
