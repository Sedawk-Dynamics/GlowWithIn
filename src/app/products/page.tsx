import type { Metadata } from "next";
import { tm } from "@/components/ui/Tm";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Signature } from "@/components/ui/Section";
import { products, productsIntro } from "@/data/products";
import { collectionLine } from "@/data/brand";
import { getLiveProductMap, formatPrice } from "@/lib/woo";
import { addToCartUrl, routes, shopRoutes } from "@/lib/links";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Products — Nature's Heroes. Thoughtful Care. Her Everyday Glow.",
  description:
    "GlowWithin™ Nourishing Hair Serum, Brightening Face Serum, Gel Based Face Cream and Intimate Wash — every formulation begins with a purpose, and every purpose has its hero ingredient.",
  alternates: { canonical: routes.products },
};

export default async function ProductsPage() {
  const live = await getLiveProductMap();

  return (
    <>
      <PageHero eyebrow={productsIntro.heading} title={productsIntro.subheading} lead={productsIntro.text}>
        <nav aria-label="Jump to a product" className="mt-10 flex flex-wrap justify-center gap-3">
          {products.map((p, i) => (
            <a key={p.slug} href={`#${p.slug}`} className="gw-chip">
              0{i + 1} · {p.shortName}
            </a>
          ))}
        </nav>
      </PageHero>

      {products.map((p, i) => {
        const wp = live.get(p.wooId);
        const price = wp ? formatPrice(wp.prices) : null;
        const even = i % 2 === 1;
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={`gw-section scroll-mt-28 ${even ? "bg-cream" : "bg-white"}`}
            aria-labelledby={`${p.slug}-title`}
          >
            <div className="gw-container">
              <div className={`grid grid-cols-1 items-start gap-10 lg:grid-cols-12 ${even ? "lg:[&>*:first-child]:order-2" : ""}`}>
                {/* pack shot — whole, never cropped */}
                <div className="lg:col-span-5">
                  <div className="gw-packshot">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 1023px) 92vw, 40vw" priority={i === 0} />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-ink/10 bg-white px-5 py-4">
                    <div>
                      <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-mocha">Net qty. {p.netQty}</p>
                      <p className="m-0 font-sans text-[20px] font-semibold text-ink">{price ?? <span className="text-[15px] font-normal text-ink/60">See price on shop</span>}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {wp && !wp.is_in_stock ? (
                        <a href={wp.permalink} className="gw-btn gw-btn--outline">
                          Out of stock
                        </a>
                      ) : (
                        <a href={addToCartUrl(p.wooId)} className="gw-btn" rel="nofollow">
                          Add to cart
                        </a>
                      )}
                      <a href={wp?.permalink ?? shopRoutes.product(p.shopSlug)} className="gw-btn gw-btn--outline">
                        View on shop
                      </a>
                    </div>
                  </div>
                </div>

                {/* editorial */}
                <div className="lg:col-span-7">
                  <p className="gw-eyebrow">
                    0{i + 1} | {p.category}
                  </p>
                  <h2 id={`${p.slug}-title`} className="gw-h2">
                    {tm(p.name)}
                  </h2>
                  <p className="mt-4 mb-0 text-[13px] font-semibold uppercase tracking-[0.16em] text-mocha">Hero ingredients</p>
                  <p className="mt-1 mb-0 font-serif text-[clamp(20px,2.2vw,26px)] leading-snug text-ink">{p.heroLine}</p>
                  <hr className="gw-rule" />
                  <p className="m-0 font-serif text-[24px] leading-snug text-ink">{p.hook}</p>
                  <p className="mt-5 mb-0 text-[16px] leading-7 text-ink">{tm(p.story[0])}</p>

                  <h3 className="mt-8 mb-3 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-mocha">{p.heroIngredientsLabel}</h3>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {p.heroIngredients.map((h) => (
                      <li key={h.name} className="gw-chip normal-case tracking-normal">
                        {h.name}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-8 mb-3 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-mocha">{p.experienceLabel}</h3>
                  <ul className="gw-bullets grid grid-cols-1 sm:grid-cols-2">
                    {p.experience.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link href={routes.product(p.slug)} className="gw-btn gw-btn--outline">
                      Read the full story
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="gw-section gw-section--blush text-ink" aria-label="The collection">
        <div className="gw-container">
          <Signature line={collectionLine.evolves} signOff={collectionLine.signOff} />
          <div className="mt-8 flex justify-center">
            <a href={shopRoutes.catalogue} className="gw-btn">
              Shop the collection
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
