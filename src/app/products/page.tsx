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
                  <div className="gw-prose mt-5">
                    {p.story.map((s) => (
                      <p key={s} className="text-[16px] leading-7 text-ink">
                        {tm(s)}
                      </p>
                    ))}
                    <p className="text-[16px] leading-7 text-ink">{tm(p.formulation)}</p>
                  </div>

                  {p.extra && (
                    <div className="mt-6 border-l-4 border-peach bg-white/70 px-5 py-4">
                      <p className="m-0 font-semibold text-ink">{p.extra.title}</p>
                      {p.extra.text && <p className="mt-1 mb-0 text-[15px] leading-6 text-ink/85">{p.extra.text}</p>}
                    </div>
                  )}

                  <h3 className="mt-8 mb-4 font-sans text-[15px] font-semibold uppercase tracking-[0.12em] text-ink">{p.heroIngredientsLabel}</h3>
                  <dl className="m-0 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {p.heroIngredients.map((h) => (
                      <div key={h.name} className="border-t border-ink/10 pt-3">
                        <dt className="m-0 text-[13px] font-semibold uppercase tracking-[0.12em] text-mocha">{h.name}</dt>
                        <dd className="m-0 mt-1 text-[15px] leading-6 text-ink/85">{h.role}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.heroClosing && <p className="mt-5 mb-0 text-[15px] leading-7 text-ink/85">{p.heroClosing}</p>}

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mt-0 mb-3 font-sans text-[15px] font-semibold uppercase tracking-[0.12em] text-ink">{p.experienceLabel}</h3>
                      <ul className="gw-bullets">
                        {p.experience.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mt-0 mb-3 font-sans text-[15px] font-semibold uppercase tracking-[0.12em] text-ink">{p.transformationLabel}</h3>
                      <p className="m-0 font-serif text-[22px] leading-snug text-ink">{p.transformation}</p>
                    </div>
                  </div>

                  {p.closing && <p className="mt-8 mb-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-mocha">{p.closing}</p>}
                  <div className="mt-6">
                    <Link href={routes.product(p.slug)} className="gw-link text-[14px]">
                      Full product page
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
          <div className="mx-auto max-w-[820px] text-center">
            <p className="gw-eyebrow">{collectionLine.verbs}</p>
            <p className="m-0 font-serif text-[clamp(28px,3.6vw,44px)] leading-tight text-ink">{collectionLine.heading}</p>
            <p className="mt-6 mb-0 text-[16px] leading-7 text-ink/85">{tm(collectionLine.closing)}</p>
          </div>
          <div className="mt-10">
            <Signature line={collectionLine.evolves} signOff={collectionLine.signOff} />
          </div>
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
