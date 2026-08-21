/**
 * WooCommerce Store API client (server-side only).
 *
 * The editorial product content lives in src/data/products.ts; WooCommerce is
 * the source of truth for price, stock and the product permalink. All reads
 * happen in React Server Components, so the browser never calls the shop
 * origin and no CORS configuration is needed on WordPress.
 *
 * The Store API (wc/store/v1) is public and unauthenticated for reads.
 */

import "server-only";
import { SHOP_ORIGIN } from "./links";

const STORE_API = `${SHOP_ORIGIN}/wp-json/wc/store/v1`;
const REVALIDATE_SECONDS = 3600;

export interface WooImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface WooPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  on_sale: boolean;
  prices: WooPrices;
  images: WooImage[];
  is_in_stock: boolean;
  is_purchasable: boolean;
  average_rating: string;
  review_count: number;
}

async function storeFetch<T>(path: string, tags: string[] = []): Promise<T> {
  const res = await fetch(`${STORE_API}${path}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "GlowWithin-Frontend/1.0 (+https://glowwithin.co.in)",
    },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["woo", ...tags] },
  });
  if (!res.ok) throw new Error(`Store API ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

export async function getProducts(): Promise<WooProduct[]> {
  return storeFetch<WooProduct[]>("/products?per_page=50&orderby=menu_order", ["products"]);
}

/**
 * Live commerce data keyed by WooCommerce product ID — never fatal. The brand
 * pages must render even when the shop is unreachable; callers fall back to
 * "View on shop" links without prices.
 */
export async function getLiveProductMap(): Promise<Map<number, WooProduct>> {
  try {
    const list = await getProducts();
    return new Map(list.map((p) => [p.id, p]));
  } catch (err) {
    console.error("[woo] product fetch failed, rendering without live prices:", err instanceof Error ? err.message : err);
    return new Map();
  }
}

/** Format a Store API minor-unit price as displayed currency (₹1,299). */
export function formatPrice(prices: WooPrices, value?: string): string {
  const raw = Number(value ?? prices.price);
  const amount = raw / 10 ** prices.currency_minor_unit;
  const formatted = amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  // The Store API's prefix/suffix already embed the currency symbol (e.g. "₹");
  // fall back to the bare symbol only when both are empty.
  const hasAffix = Boolean(prices.currency_prefix || prices.currency_suffix);
  return hasAffix ? `${prices.currency_prefix}${formatted}${prices.currency_suffix}` : `${prices.currency_symbol}${formatted}`;
}
