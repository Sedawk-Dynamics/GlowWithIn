import type { Metadata } from "next";
import { tm } from "@/components/ui/Tm";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { aboutBrands, brandStory, commitment, founderNote, mission, values, vision, whyChooseUs } from "@/data/brand";
import { products } from "@/data/products";
import { routes, shopRoutes } from "@/lib/links";

export const metadata: Metadata = {
  title: "About GlowWithin™ — Brand Story, Founder's Note, Vision, Mission & Values",
  description:
    "There is something beautiful within every woman. Read the GlowWithin™ brand story, a note from our founder Srilatha, and the vision, mission, commitment and values behind Sri Varamaha Wellness (P) Ltd.",
  alternates: { canonical: routes.about },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About GlowWithin™" title="Her glow is uniquely hers. We are here to nurture it." lead={brandStory.paragraphs[0]} />

      {/* Brand story */}
      <section className="gw-section bg-white" aria-labelledby="brand-story">
        <div className="gw-container grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="gw-eyebrow">Brand Story</p>
            <h2 id="brand-story" className="gw-h2">
              GlowWithin<sup className="gw-tm">™</sup> <span className="gw-gradient-text">Brand Story</span>
            </h2>
            <hr className="gw-rule" />
            <p className="m-0 text-[15px] leading-7 text-ink/80">Every day brings new moments, new experiences and new expressions of who she is.</p>
          </div>
          <div className="gw-prose lg:col-span-8 lg:pl-10">
            {brandStory.paragraphs.slice(2, 3).map((p) => (
              <p key={p} className="text-[17px] leading-8 text-ink">
                {tm(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's note */}
      <section id="founders-note" className="gw-section bg-cream scroll-mt-28" aria-labelledby="founder-heading">
        <div className="gw-container">
          <div className="mx-auto max-w-[880px]">
            <SectionHeading eyebrow="From our founder" title={<span id="founder-heading">{founderNote.heading}</span>} />
            <div className="gw-prose mt-10">
              {founderNote.paragraphs.map((p) => (
                <p key={p} className="text-[17px] leading-8 text-ink">
                  {tm(p)}
                </p>
              ))}
              <blockquote className="my-10 border-l-4 border-peach bg-white px-8 py-6 font-serif text-[clamp(24px,3vw,34px)] leading-tight text-ink">
                {founderNote.pullQuote}
              </blockquote>
              {founderNote.closing.map((p) => (
                <p key={p} className="text-[17px] leading-8 text-ink">
                  {tm(p)}
                </p>
              ))}
              <p className="mt-8 font-serif text-[26px] leading-tight text-ink">{founderNote.signature}</p>
              <p className="mt-8 mb-0 text-[16px] text-ink">{founderNote.signOff}</p>
              <p className="mt-1 mb-0 font-serif text-[30px] text-ink">{founderNote.name}</p>
              <p className="m-0 text-[14px] text-mocha">
                {tm(founderNote.role)}
                <br />
                {founderNote.company}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About our brands */}
      <section className="gw-section bg-white" aria-labelledby="brands-heading">
        <div className="gw-container">
          <SectionHeading eyebrow="About our brands" title={<span id="brands-heading">{aboutBrands.purpose}</span>} />
          <div className="gw-prose mx-auto mt-10 max-w-[820px] text-center">
            {aboutBrands.paragraphs.map((p) => (
              <p key={p} className="text-[17px] leading-8 text-ink">
                {tm(p)}
              </p>
            ))}
          </div>
          <ul className="mx-auto mt-12 grid max-w-[1100px] list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.slug} className="gw-card text-center">
                <p className="gw-num m-0">0{i + 1}</p>
                <h3 className="mt-3 mb-1 font-serif text-[22px] leading-tight text-ink">{p.shortName}</h3>
                <p className="m-0 text-[14px] font-semibold uppercase tracking-[0.12em] text-mocha">{p.promise}</p>
                <p className="mt-3 mb-4 text-[14px] leading-6 text-ink/80">{p.heroLine}</p>
                <Link href={routes.product(p.slug)} className="gw-link text-[14px]">
                  Discover
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="gw-section gw-section--blush scroll-mt-28" aria-label="Vision and mission">
        <div className="gw-container grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="gw-panel p-8 md:p-12">
            <p className="gw-eyebrow">{vision.heading}</p>
            <p className="m-0 font-serif text-[clamp(24px,2.6vw,32px)] leading-snug text-ink">{vision.text}</p>
          </div>
          <div className="gw-panel p-8 md:p-12">
            <p className="gw-eyebrow">{mission.heading}</p>
            <p className="m-0 font-serif text-[clamp(24px,2.6vw,32px)] leading-snug text-ink">{mission.text}</p>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section id="commitment" className="gw-section bg-white scroll-mt-28" aria-labelledby="commitment-heading">
        <div className="gw-container">
          <SectionHeading eyebrow={commitment.heading} title={<span id="commitment-heading">{commitment.intro.replace(":", "")}</span>} />
          <ol className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {commitment.items.map((item) => (
              <li key={item.n} className="gw-card">
                <span className="gw-num">{item.n}</span>
                <h3 className="mt-3 mb-2 font-sans text-[17px] font-semibold leading-6 text-ink">{item.title}</h3>
                <p className="m-0 text-[14px] leading-6 text-ink/80">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="gw-section bg-cream scroll-mt-28" aria-labelledby="values-heading">
        <div className="gw-container">
          <SectionHeading eyebrow="What we stand for" title={<span id="values-heading">{values.heading}</span>} />
          <ol className="mt-12 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {values.items.map((item) => (
              <li key={item.n} className="gw-card">
                <div className="flex items-baseline gap-4">
                  <span className="gw-num">{item.n}</span>
                  <h3 className="m-0 font-sans text-[15px] font-semibold uppercase tracking-[0.1em] leading-6 text-ink">{item.title}</h3>
                </div>
                <p className="mt-4 mb-0 text-[15px] leading-7 text-ink/85">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gw-section bg-white" aria-labelledby="special-heading">
        <div className="gw-container text-center">
          <h2 id="special-heading" className="gw-h2">
            {tm(whyChooseUs.special.heading)}
          </h2>
          <hr className="gw-rule gw-rule--center" />
          <div className="mx-auto max-w-[720px]">
            {whyChooseUs.special.lines.map((l) => (
              <p key={l} className="mb-1 font-serif text-[clamp(22px,2.6vw,30px)] text-ink/60">
                {l}
              </p>
            ))}
            <p className="mt-6 mb-2 font-serif text-[clamp(30px,4vw,48px)] leading-tight text-ink">{whyChooseUs.special.answer}</p>
            <p className="m-0 text-[15px] font-semibold uppercase tracking-[0.16em] text-mocha">{whyChooseUs.special.her}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={routes.products} className="gw-btn gw-btn--outline">
              Our products
            </Link>
            <a href={shopRoutes.catalogue} className="gw-btn">
              Shop now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
