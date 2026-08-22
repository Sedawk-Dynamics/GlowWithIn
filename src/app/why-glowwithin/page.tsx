import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Signature } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icons";
import { whyChooseUs } from "@/data/brand";
import { routes, shopRoutes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Why Choose GlowWithin™? — Because Her Wellness Deserves Thoughtful Care",
  description:
    "Women first. Thoughtfully selected ingredients. Science with sensitivity. Celebrate, don't change. Care that evolves with her. Trust that lasts. What makes GlowWithin™ special.",
  alternates: { canonical: routes.whyGlowWithin },
};

export default function WhyPage() {
  const s = whyChooseUs.special;
  return (
    <>
      <PageHero eyebrow={whyChooseUs.heading} title={whyChooseUs.subheading} />

      <section className="gw-section bg-white" aria-label="Reasons to choose GlowWithin">
        <div className="gw-container">
          <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.items.map((item) => (
              <li key={item.title} className="gw-card">
                <Icon name={item.icon as IconName} />
                <h2 className="mt-4 mb-2 font-serif text-[26px] leading-tight text-ink">{item.title}</h2>
                <p className="m-0 text-[15px] leading-7 text-ink/85">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gw-section gw-section--blush text-ink" aria-labelledby="special-heading">
        <div className="gw-container text-center">
          <h2 id="special-heading" className="gw-h2">
            {s.heading}
          </h2>
          <hr className="gw-rule gw-rule--center" />
          <div className="mx-auto max-w-[720px]">
            {s.lines.map((l) => (
              <p key={l} className="mb-1 font-serif text-[clamp(22px,2.6vw,30px)] text-ink/60">
                {l}
              </p>
            ))}
            <p className="mt-6 mb-2 font-serif text-[clamp(30px,4vw,48px)] leading-tight text-ink">{s.answer}</p>
            <p className="m-0 text-[15px] font-semibold uppercase tracking-[0.16em] text-mocha">{s.her}</p>
          </div>
          <div className="mt-12">
            <Signature line={s.signature} signOff={`GlowWithin™ · ${s.signOff}`} />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={shopRoutes.catalogue} className="gw-btn">
              <span>Shop GlowWithin<sup className="gw-tm">™</sup></span>
            </a>
            <Link href={routes.products} className="gw-btn gw-btn--outline">
              Our products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
