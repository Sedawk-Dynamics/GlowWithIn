/**
 * GlowWithin — central URL map.
 *
 * Two origins:
 *   APEX  glowwithin.co.in        Next.js — brand, story, products editorial, contact
 *   SHOP  shop.glowwithin.co.in   WordPress + WooCommerce — catalogue, cart, checkout, account
 *
 * Every link in the app resolves through this file. Interlinking between the
 * two origins is plain `<a href>` navigation — there is no shared session, no
 * cross-origin fetch and nothing to configure on WordPress.
 */

/**
 * Read an origin from an env var, tolerating the ways it arrives broken from a
 * hosting dashboard: unset, empty string, surrounding whitespace, trailing
 * slash, or missing scheme. Anything unparseable falls back to the default so
 * `new URL(origin)` (metadataBase, sitemap, JSON-LD) can never throw at build.
 */
function originFromEnv(value: string | undefined, fallback: string): string {
  const raw = (value ?? "").trim().replace(/\/+$/, "");
  if (!raw) return fallback;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return fallback;
  }
}

export const APEX_ORIGIN = originFromEnv(process.env.NEXT_PUBLIC_SITE_URL, "https://glowwithin.co.in");

export const SHOP_ORIGIN = originFromEnv(process.env.NEXT_PUBLIC_SHOP_URL, "https://shop.glowwithin.co.in");

const shop = (path: string) => `${SHOP_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;

/* ------------------------------------------------------------------ *
 * Apex routes — served by Next.js
 * ------------------------------------------------------------------ */

export const routes = {
  home: "/",
  about: "/about",
  founder: "/about#founders-note",
  vision: "/about#vision-mission",
  commitment: "/about#commitment",
  values: "/about#values",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  services: "/services",
  whyGlowWithin: "/why-glowwithin",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-conditions",
  faq: "/faq",
} as const;

/* ------------------------------------------------------------------ *
 * Shop routes — served by WooCommerce
 * ------------------------------------------------------------------ */

export const shopRoutes = {
  root: shop("/"),
  catalogue: shop("/shop/"),
  product: (slug: string) => shop(`/product/${slug}/`),
  category: (slug: string) => shop(`/product-category/${slug}/`),
  cart: shop("/cart/"),
  checkout: shop("/checkout/"),
  account: shop("/my-account/"),
  orders: shop("/my-account/orders/"),
  downloads: shop("/my-account/downloads/"),
  addresses: shop("/my-account/edit-address/"),
  accountDetails: shop("/my-account/edit-account/"),
  lostPassword: shop("/my-account/lost-password/"),
} as const;

/** Add a product to the WooCommerce cart and land the customer on the cart page. */
export function addToCartUrl(productId: number, quantity = 1): string {
  const qs = new URLSearchParams({ "add-to-cart": String(productId), quantity: String(quantity) });
  return shop(`/cart/?${qs.toString()}`);
}

/* ------------------------------------------------------------------ *
 * Navigation — mirrors the live WordPress menus exactly
 * ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const categoryNav: NavItem[] = [
  { label: "Face Care", href: shopRoutes.category("face-care") },
  { label: "Hair Care", href: shopRoutes.category("hair-care") },
  { label: "Intimate Care", href: shopRoutes.category("intimate-care") },
  { label: "Wellness Essentials", href: shopRoutes.category("wellness-essentials") },
];

export const primaryNav: NavItem[] = [
  { label: "HOME", href: routes.home },
  { label: "SHOP", href: shopRoutes.catalogue, children: categoryNav },
  { label: "OUR PRODUCTS", href: routes.products },
  { label: "ABOUT", href: routes.about },
  { label: "SERVICES", href: routes.services },
  { label: "CONTACT", href: routes.contact },
];

/** Footer: Customer service — all on WooCommerce. */
export const customerServiceNav: NavItem[] = [
  { label: "Orders", href: shopRoutes.orders },
  { label: "Downloads", href: shopRoutes.downloads },
  { label: "Addresses", href: shopRoutes.addresses },
  { label: "Account details", href: shopRoutes.accountDetails },
  { label: "Lost password", href: shopRoutes.lostPassword },
];

/** Footer: Useful links. */
export const usefulNav: NavItem[] = [
  { label: "HOME", href: routes.home },
  { label: "SHOP", href: shopRoutes.catalogue },
  { label: "OUR PRODUCTS", href: routes.products },
  { label: "ABOUT", href: routes.about },
  { label: "CONTACT", href: routes.contact },
];

/** Footer: Important links. */
export const importantNav: NavItem[] = [
  { label: "Privacy & Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
  { label: "FAQ", href: routes.faq },
];

/* ------------------------------------------------------------------ *
 * Contact details — single source for header, footer, contact page, schema
 * ------------------------------------------------------------------ */

export const contact = {
  brand: "GlowWithin™",
  brandPlain: "GlowWithin",
  legalName: "Sri Varamaha Wellness (P) Ltd.",
  tagline: "For Her, Forever.",
  signature: "Your Glow Is Within. Let It Shine Through.",
  phone: "+91 70757 92176",
  phoneHref: "tel:+917075792176",
  email: "info@glowwithin.co.in",
  emailHref: "mailto:info@glowwithin.co.in",
  addressLines: [
    "C 1204, Rainbow Vistas, Phase 1,",
    "Green Hills Road, Moosapet,",
    "Hyderabad – 500018",
  ],
  hours: "Monday – Saturday | 10:00 AM – 6:00 PM",
  /** Social profiles. The live site links these to "#" — replace when the handles are confirmed. */
  social: {
    facebook: "#",
    instagram: "#",
    pinterest: "#",
  },
} as const;
