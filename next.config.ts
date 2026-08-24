import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

const SHOP_HOST = "shop.glowwithin.co.in";

/**
 * WordPress used to own glowwithin.co.in; it now lives on shop.glowwithin.co.in.
 * Every transactional / catalogue path that may still be indexed against the
 * apex is forwarded permanently, in a single hop.
 */
const toShop = (source: string, destination = source) => ({
  source,
  destination: `https://${SHOP_HOST}${destination}`,
  permanent: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root },
  images: {
    qualities: [75, 82],
    remotePatterns: [
      { protocol: "https", hostname: SHOP_HOST, pathname: "/wp-content/uploads/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // catalogue + taxonomy
      toShop("/shop"),
      toShop("/shop/:path*"),
      toShop("/product/:slug"),
      toShop("/product-category/:path*"),
      toShop("/product-tag/:path*"),
      // transactional
      toShop("/cart"),
      toShop("/checkout/:path*"),
      toShop("/my-account/:path*"),
      toShop("/my-account"),
      toShop("/wishlist"),
      // WordPress internals + media still referenced by old links
      toShop("/wp-admin/:path*"),
      toShop("/wp-login.php"),
      toShop("/wp-content/:path*"),
      toShop("/wp-json/:path*"),
      toShop("/feed"),
      // retired theme demo pages
      { source: "/courses", destination: "/", permanent: true },
      { source: "/why-glowwithin", destination: "/#why-heading", permanent: true },
      { source: "/sales", destination: "/products", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
