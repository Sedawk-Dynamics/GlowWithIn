# GlowWithin™ — hybrid frontend

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
| `/` home, `/about`, `/products`, `/products/<slug>`, `/services`, `/contact`, `/faq`, `/privacy-policy`, `/terms-conditions`, `/return-policy` | `/shop/`, `/product/<slug>/`, `/product-category/<slug>/`, `/cart/`, `/checkout/`, `/my-account/…` |

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

## WordPress-side CSS

[`wordpress/checkout-legibility.css`](wordpress/checkout-legibility.css) fixes
the shop checkout, where the BeTheme page builder paints the order-summary box
#34252F but leaves most of the text at the dark body colour (invisible). Paste
it into BeTheme → Theme Options → Custom CSS. It is not used by this Next.js
app.

### COD handling fee

[`wordpress/glowwithin-cod-fee.php`](wordpress/glowwithin-cod-fee.php) adds the
non-refundable ₹100 Cash-on-Delivery handling fee, shows the notice under the
COD option and refreshes the totals when the payment method changes. Upload it
to `wp-content/mu-plugins/` on the shop — **not** the theme functions.php (the
site runs the parent BeTheme, so a theme update would erase it).

### GST details on invoices

[`wordpress/glowwithin-gst-invoice.php`](wordpress/glowwithin-gst-invoice.php)
adds an optional GSTIN field at checkout, an HSN code per product, and prints
Place of Supply + both GSTINs on the PDF invoice. It does **not** calculate
GST — the CGST/SGST/IGST split comes from WooCommerce → Settings → Tax, which
has to be configured first (the store currently charges no tax at all).

### Percentage-off sale badge

[`wordpress/glowwithin-sale-badge.php`](wordpress/glowwithin-sale-badge.php)
turns WooCommerce's "On Sale" flash into the real discount ("31% OFF") on the
shop loop, the product page and related products. The percentage is rounded
**down** so a 49.7% saving is never advertised as 50%. Shop-side only — this
Next.js app does not use it.

### Combo offers

[`wordpress/glowwithin-combos.csv`](wordpress/glowwithin-combos.csv) is a
WooCommerce product import for the four packs in the client's *Bonus Offer*
sheet. Each is a **simple** product whose regular price is the sum of the parts
and whose sale price is the pack price, so the percentage badge falls out of
the pricing automatically:

| Pack | Contents | Regular | Pack price | Badge |
| ---- | -------- | ------- | ---------- | ----- |
| Complete Wellness Pack — First Edition | all four products | ₹3,196 | ₹2,196 | 31% OFF |
| Glow & Grow Combo | Hair Serum + Face Serum | ₹1,798 | ₹1,161 | 35% OFF |
| Double Glow Offer | Face Serum × 2 | ₹1,798 | ₹1,161 | 35% OFF |
| Hair Duo — 2X Care | Hair Serum × 2 | ₹1,798 | ₹1,161 | 35% OFF |

They import as **drafts** — add pack photography, then publish. Simple products
do not decrement the component products' stock; if that matters, move them to a
bundle plugin (WPC Product Bundles is the free option). The packs live on the
shop only; they are not listed on the apex site.

## Still to do in wp-admin (cannot be done through the MCP connector)

1. ~~Product slugs~~ — renamed on 2026-08-21 (`nourishing-hair-serum`,
   `brightening-face-serum`, `gel-based-face-cream`, `intimate-wash`); old
   slugs 301 via Rank Math. If a slug changes again, update `shopSlug` in
   `src/data/products.ts`.
2. **Short descriptions** on the four products are still lorem ipsum (names
   and long descriptions were updated from the brand document).
3. **Shop header/footer menus** — point HOME / ABOUT / CONTACT (and add OUR
   PRODUCTS / SERVICES) at `https://glowwithin.co.in/...` so the two sites
   interlink both ways; the "Customer service" footer menu still points at
   `themes.muffingroup.com`.
4. **Mobile header logo** on the shop still uses the theme's `beauty3.svg`;
   swap for the GlowWithin logo.
5. **Webhook** — WooCommerce → Settings → Advanced → Webhooks:
   `product.updated` → `https://glowwithin.co.in/api/revalidate`, secret =
   `WOO_WEBHOOK_SECRET`.
6. ~~Social profile URLs~~ — Instagram / Facebook / LinkedIn / X wired up on
   2026-08-22, matching the shop footer.
7. **Footer email on the shop** still reads `info@shop.glowwithin.co.in` (a
   migration search-replace artefact) — should be `info@glowwithin.co.in`.
