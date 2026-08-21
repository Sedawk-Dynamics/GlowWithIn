# GlowWithin® — hybrid frontend

Next.js 16 brand site for **glowwithin.co.in**, WooCommerce stays on **shop.glowwithin.co.in**.
Same split as banarasivastram.com and mahidha.com.

```bash
npm install
cp .env.example .env.local     # SMTP_* for the contact form; WOO_WEBHOOK_SECRET for revalidation
npm run dev                    # http://localhost:3000
npm run build                  # lint + types + static generation
```

## What lives where

| glowwithin.co.in (this app)                                   | shop.glowwithin.co.in (WordPress + WooCommerce) |
| ------------------------------------------------------------- | ----------------------------------------------- |
| `/` home, `/about`, `/products`, `/products/<slug>`, `/services`, `/why-glowwithin`, `/contact`, `/faq`, `/privacy-policy`, `/terms-conditions` | `/shop/`, `/product/<slug>/`, `/product-category/<slug>/`, `/cart/`, `/checkout/`, `/my-account/…` |

Every URL resolves through [`src/lib/links.ts`](src/lib/links.ts) — nothing else hardcodes a link.
Cross-domain links are plain `<a href>` (the cart cookie belongs to the shop origin).
"Add to cart" is `shop…/cart/?add-to-cart=<id>&quantity=1`.
Prices / stock / permalinks come from the public Store API at build + ISR time
(`src/lib/woo.ts`, revalidated hourly or on demand via `/api/revalidate`).

`next.config.ts` 308-redirects every old WordPress path still indexed against
the apex (`/shop`, `/product/*`, `/cart`, `/my-account/*`, `/wp-*`…) to the shop.

## Header, footer and CSS parity

The header and footer are the live site's **BeTheme header/footer-builder
templates (#66 / #148) reproduced element-for-element**, and the theme's
stylesheets are copied verbatim into `src/styles/wp/` (be.css, responsive.css,
the theme-options CSS, the two template CSS files, icon fonts). Each file is
wrapped in `@layer wp { … }` so it sits *below* our own styles and Tailwind
utilities in the cascade (`@layer wp, theme, gw, utilities` in `globals.css`).
Identical markup + identical CSS = identical header/footer at every breakpoint.

Only the behaviour is re-implemented, in
[`HeaderBehaviour.tsx`](src/components/chrome/HeaderBehaviour.tsx) (body
offset, mobile side-slide drawer, tap-to-open submenu, rotating tagline,
current-page highlight). None of the theme's jQuery is shipped.

Breakpoints follow BeTheme: `< 768px` mobile header (fixed), `768–959px`
tablet, `≥ 960px` desktop. Page content uses `.gw-*` classes + Tailwind.

## Content

All copy is from the client's brand document, in
[`src/data/brand.ts`](src/data/brand.ts) and
[`src/data/products.ts`](src/data/products.ts). The claim hedges
("-looking", "helps support", "traditionally valued for") are deliberate —
do not tighten them.

## Images

* **Hero slides** — the five 2560×1440 banners in `public/images/banners/`,
  rendered in a 16:9 box with `object-fit: contain`, so the whole banner is
  always visible (the old Elementor slider used `background-size: cover` in a
  647px box and cropped them).
* **Pack shots** — `.gw-packshot` is a square box with `object-fit: contain`;
  products are never cropped.

## Deploy

Vercel, `main` → production. Set the env vars from `.env.example`
(Production). Then point `glowwithin.co.in` / `www` at Vercel while
`shop.glowwithin.co.in` keeps pointing at the WordPress host.

## Still to do in wp-admin (cannot be done through the MCP connector)

1. **Product slugs** are still the theme demo slugs (`hand-cream-soft-dictum`,
   `face-natural-skin-facisilis`, `body-cream-parturient`,
   `schampoo-with-olive`). Rename them (Rank Math will add the redirects) and
   update `shopSlug` in `src/data/products.ts`.
2. **Short descriptions** on the four products (the long descriptions and
   names were already updated from the brand document).
3. **Shop header/footer menus** — point HOME / ABOUT / CONTACT (and add OUR
   PRODUCTS / SERVICES) at `https://glowwithin.co.in/...` so the two sites
   interlink both ways; the "Customer service" footer menu still points at
   `themes.muffingroup.com`.
4. **Mobile header logo** on the shop still uses the theme's `beauty3.svg`;
   swap for the GlowWithin logo.
5. **Webhook** — WooCommerce → Settings → Advanced → Webhooks:
   `product.updated` → `https://glowwithin.co.in/api/revalidate`, secret =
   `WOO_WEBHOOK_SECRET`.
6. **Social profile URLs** (`contact.social` in `src/lib/links.ts`) — the live
   site links them to `#`.
