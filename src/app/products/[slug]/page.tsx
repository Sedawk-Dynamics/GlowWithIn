import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProduct, products } from "@/data/products";
import { getLiveProductMap, formatPrice } from "@/lib/woo";
import { addToCartUrl, APEX_ORIGIN, routes, shopRoutes } from "@/lib/links";

export const revalidate = 3600;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.promise}`,
    description: `${p.hook} ${p.story[0]}`,
    alternates: { canonical: routes.product(p.slug) },
    openGraph: { images: [{ url: p.banner, width: 2560, height: 1440, alt: p.name }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const live = await getLiveProductMap();
  const wp = live.get(p.wooId);
  const price = wp ? formatPrice(wp.prices) : null;
  const shopHref = wp?.permalink ?? shopRoutes.product(p.shopSlug);
  const others = products.filter((o) => o.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [p.image.src, `${APEX_ORIGIN}${p.banner}`],
    description: p.story.join(" "),
    brand: { "@type": "Brand", name: "GlowWithin®" },
    category: p.category,
    url: `${APEX_ORIGIN}${routes.product(p.slug)}`,
    ...(wp
      ? {
          offers: {
            "@type": "Offer",
            url: shopHref,
            priceCurrency: wp.prices.currency_code,
            price: (Number(wp.prices.price) / 10 ** wp.prices.currency_minor_unit).toFixed(2),
            availability: wp.is_in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* banner — full 16:9, never cropped */}
      <section className="bg-[#fbeee6]" aria-label={`${p.name} banner`}>
        <Image src={p.banner} alt={`${p.name} — ${p.promise}`} width={2560} height={1440} sizes="100vw" priority className="block h-auto w-full" />
      </section>

      <section className="gw-section bg-white" aria-labelledby="product-title">
        <div className="gw-container">
          <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-mocha">
            <Link href={routes.home} className="text-mocha hover:text-wine">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={routes.products} className="text-mocha hover:text-wine">
              Our Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{p.shortName}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="gw-packshot">
                <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 1023px) 92vw, 40vw" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="gw-eyebrow">{p.category}</p>
              <h1 id="product-title" className="gw-h1">
                {p.name}
              </h1>
              <p className="mt-3 mb-0 font-serif text-[26px] text-ink">{p.promise}</p>
              <hr className="gw-rule" />
              <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.16em] text-mocha">Hero ingredients</p>
              <p className="mt-1 mb-6 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug text-ink">{p.heroLine}</p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-ink/10 py-5">
                <div>
                  <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-mocha">Price</p>
                  <p className="m-0 font-sans text-[26px] font-semibold text-ink">{price ?? <span className="text-[15px] font-normal text-ink/60">See price on shop</span>}</p>
                </div>
                <div>
                  <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-mocha">Net qty.</p>
                  <p className="m-0 text-[18px] text-ink">{p.netQty}</p>
                </div>
                <div>
                  <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-mocha">Availability</p>
                  <p className="m-0 text-[18px] text-ink">{wp ? (wp.is_in_stock ? "In stock" : "Out of stock") : "Check on shop"}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {wp && !wp.is_in_stock ? (
                  <a href={shopHref} className="gw-btn gw-btn--outline">
                    Notify me on the shop
                  </a>
                ) : (
                  <a href={addToCartUrl(p.wooId)} className="gw-btn" rel="nofollow">
                    Add to cart
                  </a>
                )}
                <a href={shopHref} className="gw-btn gw-btn--outline">
                  View on shop
                </a>
              </div>
              <p className="mt-3 mb-0 text-[13px] text-ink/60">Cart, checkout and your account are handled securely on shop.glowwithin.co.in.</p>

              <p className="mt-10 mb-0 font-serif text-[24px] leading-snug text-ink">{p.hook}</p>
              <div className="gw-prose mt-4">
                {p.story.map((s) => (
                  <p key={s} className="text-[16px] leading-7 text-ink">
                    {s}
                  </p>
                ))}
                <p className="text-[16px] leading-7 text-ink">{p.formulation}</p>
              </div>
              {p.extra && (
                <div className="mt-6 border-l-4 border-peach bg-cream px-5 py-4">
                  <p className="m-0 font-semibold text-ink">{p.extra.title}</p>
                  {p.extra.text && <p className="mt-1 mb-0 text-[15px] leading-6 text-ink/85">{p.extra.text}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="gw-section bg-cream" aria-labelledby="heroes-heading">
        <div className="gw-container">
          <h2 id="heroes-heading" className="gw-h2 text-center">
            {p.heroIngredientsLabel}
          </h2>
          <hr className="gw-rule gw-rule--center" />
          <dl className="m-0 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.heroIngredients.map((h) => (
              <div key={h.name} className="gw-card">
                <dt className="m-0 font-serif text-[24px] leading-tight text-ink">{h.name}</dt>
                <dd className="m-0 mt-2 text-[15px] leading-6 text-ink/85">{h.role}</dd>
              </div>
            ))}
          </dl>
          {p.heroClosing && <p className="mx-auto mt-8 mb-0 max-w-[820px] text-center text-[16px] leading-7 text-ink/85">{p.heroClosing}</p>}
        </div>
      </section>

      <section className="gw-section bg-white" aria-label="What you can experience">
        <div className="gw-container grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="gw-eyebrow">{p.experienceLabel}</p>
            <ul className="gw-bullets text-[17px]">
              {p.experience.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="gw-eyebrow">{p.transformationLabel}</p>
            <p className="m-0 font-serif text-[clamp(24px,2.8vw,34px)] leading-snug text-ink">{p.transformation}</p>
            {p.closing && <p className="mt-6 mb-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-mocha">{p.closing}</p>}
          </div>
        </div>
      </section>

      <section className="gw-section bg-shell" aria-labelledby="more-heading">
        <div className="gw-container">
          <h2 id="more-heading" className="gw-h2 text-center">
            More expressions of her glow
          </h2>
          <hr className="gw-rule gw-rule--center" />
          <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <ProductCard product={o} live={live.get(o.wooId)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
