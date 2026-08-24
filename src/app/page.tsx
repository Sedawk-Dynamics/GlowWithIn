import Image from "next/image";
import { tm } from "@/components/ui/Tm";
import Link from "next/link";
import { HeroSlides } from "@/components/home/HeroSlides";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading, Signature } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icons";
import { products, productsIntro } from "@/data/products";
import { brandStory, collectionLine, founderNote, whyChooseUs } from "@/data/brand";
import { getLiveProductMap } from "@/lib/woo";
import { routes, shopRoutes, categoryNav } from "@/lib/links";

export const revalidate = 3600;

const CATEGORY_IMAGES: Record<string, string> = {
  "face-care": "https://shop.glowwithin.co.in/wp-content/uploads/2026/02/tranquil-moments-girl-embracing-selfcare-home-800x800.jpg",
  "hair-care": "https://shop.glowwithin.co.in/wp-content/uploads/2026/02/woman-studio-haircare-with-brush-grooming-selfcare-beauty-white-background-comb-portrait-keratin-scalp-treatment-texture-strong-tangled-hairstyle-female-person-800x800.jpg",
  "intimate-care": "https://shop.glowwithin.co.in/wp-content/uploads/2026/02/unrecognizable-female-model-casual-comfort-800x800.jpg",
  "wellness-essentials": "https://shop.glowwithin.co.in/wp-content/uploads/2026/02/homemade-treatment-ingredients-assortment-800x800.jpg",
};

export default async function HomePage() {
  const live = await getLiveProductMap();

  return (
    <>
      {/* 1 · Hero — the five banners, shown whole */}
      <HeroSlides />

      {/* 2 · Why GlowWithin? (from "WHY CHOOSE US?") */}
      <section className="gw-section bg-white" aria-labelledby="why-heading">
        <div className="gw-container">
          <SectionHeading eyebrow="Why GlowWithin?" title={<span id="why-heading">{whyChooseUs.subheading}</span>} />
          <ul className="mt-12 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.items.map((item) => (
              <li key={item.title} className="flex flex-col items-center text-center">
                <Icon name={item.icon as IconName} />
                <h3 className="mt-4 mb-2 font-sans text-[17px] font-semibold leading-7 text-ink">{item.title}</h3>
                <p className="m-0 max-w-[340px] text-[15px] leading-6 text-ink/80">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · Brand story */}
      <section className="gw-section bg-cream" aria-labelledby="story-heading">
        <div className="gw-container grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="gw-eyebrow">Our Brand Story</p>
            <h2 id="story-heading" className="gw-h2">
              There is something beautiful <em className="not-italic gw-gradient-text">within every woman.</em>
            </h2>
            <hr className="gw-rule" />
            <p className="gw-lead m-0">{brandStory.paragraphs[0].replace("There is something beautiful within every woman. ", "")}</p>
          </div>
          <div className="gw-prose lg:col-span-7 lg:pl-8">
            <p className="text-[16px] leading-7 text-ink">{tm(brandStory.paragraphs[3])}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={routes.about} className="gw-btn">
                About us
              </Link>
              <Link href={routes.founder} className="gw-btn gw-btn--outline">
                A note from the founder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Our Products — Nature's Heroes */}
      <section className="gw-section bg-white" aria-labelledby="products-heading" id="products">
        <div className="gw-container">
          <SectionHeading
            eyebrow={productsIntro.heading}
            title={<span id="products-heading">{productsIntro.subheading}</span>}
            lead={productsIntro.text}
          />
          <ul className="mt-14 grid list-none grid-cols-1 gap-x-8 gap-y-14 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} live={live.get(p.wooId)} priority={i < 2} showPromise={false} />
                <p className="mt-4 mb-0 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-mocha">
                  Hero ingredients: <span className="text-ink">{p.heroLine}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href={routes.products} className="gw-btn gw-btn--outline">
              Explore the ingredients
            </Link>
            <a href={shopRoutes.catalogue} className="gw-btn">
              Shop the collection
            </a>
          </div>
        </div>
      </section>

      {/* 5 · One Brand. Many Expressions of Her Glow */}
      <section className="gw-section gw-section--blush text-ink" aria-labelledby="expressions-heading">
        <div className="gw-container">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="gw-eyebrow">{collectionLine.verbs}</p>
            <h2 id="expressions-heading" className="gw-h2">
              {collectionLine.heading}
            </h2>
            <hr className="gw-rule gw-rule--center" />
          </div>
          <ul className="mx-auto mt-10 grid max-w-[1000px] list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {collectionLine.items.map((item, i) => (
              <li key={item.product} className="gw-panel p-7 text-center">
                <p className="m-0 font-serif text-[40px] leading-none text-peach">0{i + 1}</p>
                <p className="mt-3 mb-1 text-[13px] font-semibold uppercase tracking-[0.16em] text-mocha">{item.product}</p>
                <p className="m-0 font-serif text-[24px] leading-tight text-ink">{item.line}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 mb-0 max-w-[820px] text-center text-[16px] leading-7 text-ink/85">{tm(collectionLine.closing)}</p>
          <ol className="mx-auto mt-10 flex max-w-[1100px] list-none flex-wrap items-center justify-center gap-x-3 gap-y-3 p-0 text-center">
            {collectionLine.journey.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-[14px] font-medium text-ink">
                <span className="border border-bronze/40 bg-white/60 px-4 py-2">{step}</span>
                {i < collectionLine.journey.length - 1 && (
                  <span aria-hidden="true" className="text-bronze">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Signature line={collectionLine.evolves} />
          </div>
        </div>
      </section>

      {/* 6 · Shop by category (WooCommerce) */}
      <section className="gw-section bg-white" aria-labelledby="categories-heading">
        <div className="gw-container">
          <SectionHeading eyebrow="Shop" title={<span id="categories-heading">Shop by Category</span>} />
          <ul className="mt-12 grid list-none grid-cols-2 gap-5 p-0 lg:grid-cols-4">
            {categoryNav.map((cat) => (
              <li key={cat.label}>
                <a href={cat.href} className="group block text-center text-ink no-underline">
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    <Image
                      src={CATEGORY_IMAGES[cat.href.split("/product-category/")[1]?.replace(/\/$/, "") ?? ""]}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 45vw, 22vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <span className="mt-4 block font-serif text-[24px] leading-tight text-ink group-hover:text-wine">{cat.label}</span>
                  <span className="mt-1 block text-[12px] font-semibold uppercase tracking-[0.14em] text-mocha">Shop now →</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 · Founder's note teaser */}
      <section className="gw-section bg-cream" aria-labelledby="founder-heading">
        <div className="gw-container grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="gw-eyebrow">From our founder</p>
            <h2 id="founder-heading" className="gw-h2">
              {founderNote.heading}
            </h2>
            <hr className="gw-rule" />
            <p className="m-0 font-serif text-[22px] text-ink">{founderNote.name}</p>
            <p className="m-0 text-[14px] text-mocha">
              {tm(founderNote.role)}
              <br />
              {founderNote.company}
            </p>
          </div>
          <div className="gw-prose lg:col-span-8 lg:pl-10">
            <p className="text-[16px] leading-7 text-ink">{tm(founderNote.paragraphs[2])}</p>
            <Link href={routes.founder} className="gw-link mt-2 inline-block text-[14px]">
              Read the full note
            </Link>
          </div>
        </div>
      </section>

      {/* 8 · Closing CTA */}
      <section className="gw-section bg-cream" aria-label="Shop GlowWithin">
        <div className="gw-container">
          <Signature line={brandStory.signature} signOff="GlowWithin™ · For Her, Forever." />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={shopRoutes.catalogue} className="gw-btn">
              <span>Shop GlowWithin<sup className="gw-tm">™</sup></span>
            </a>
            <Link href={routes.contact} className="gw-btn gw-btn--outline">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
