import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";

/**
 * On-demand revalidation, called by a WooCommerce webhook.
 *
 * Set up in WordPress under WooCommerce -> Settings -> Advanced -> Webhooks:
 *
 *   Topic          product.updated   (and product.created, product.deleted)
 *   Delivery URL   https://glowwithin.co.in/api/revalidate
 *   Secret         same value as WOO_WEBHOOK_SECRET in the Vercel env
 *
 * Without this the client edits a product in wp-admin and then phones to ask
 * why the website has not changed. With it, edits appear within seconds.
 *
 * WooCommerce signs the raw body with HMAC-SHA256 and sends it base64-encoded
 * in x-wc-webhook-signature. We verify before doing anything.
 */

const SECRET = process.env.WOO_WEBHOOK_SECRET;

function signatureIsValid(rawBody: string, header: string | null): boolean {
  if (!SECRET || !header) return false;

  const expected = crypto.createHmac("sha256", SECRET).update(rawBody, "utf8").digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  // Length check first — timingSafeEqual throws on mismatched lengths.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!SECRET) {
    return NextResponse.json(
      { revalidated: false, error: "WOO_WEBHOOK_SECRET is not configured." },
      { status: 500 },
    );
  }

  const rawBody = await request.text();

  if (!signatureIsValid(rawBody, request.headers.get("x-wc-webhook-signature"))) {
    return NextResponse.json(
      { revalidated: false, error: "Invalid signature." },
      { status: 401 },
    );
  }

  // WooCommerce sends a plain "webhook_id=..." ping when you first save the
  // webhook. Acknowledge it so the webhook activates instead of going dormant.
  let payload: { id?: number; slug?: string } = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ revalidated: false, ping: true });
  }

  revalidateTag("woo", "max");
  revalidateTag("products", "max");
  if (payload.slug) revalidateTag(`product:${payload.slug}`, "max");

  revalidatePath("/");
  revalidatePath("/products");
  if (payload.slug) revalidatePath(`/products/${payload.slug}`);

  return NextResponse.json({
    revalidated: true,
    slug: payload.slug ?? null,
    at: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "This endpoint accepts signed POST requests from WooCommerce only." },
    { status: 405 },
  );
}
