import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Signature } from "@/components/ui/Section";
import { services } from "@/data/brand";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Our Services — Building Wellness Solutions around Her",
  description:
    "Sri Varamaha Wellness Pvt. Ltd. builds thoughtful women's wellness solutions: women-centric product development, science-led formulation, brand building & marketing, distribution, and a growing women's wellness ecosystem.",
  alternates: { canonical: routes.services },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={services.heading} title={services.subheading} lead={services.intro} />

      {services.items.map((s, i) => (
        <section key={s.n} id={`service-${s.n}`} className={`gw-section scroll-mt-28 ${i % 2 ? "bg-cream" : "bg-white"}`} aria-labelledby={`svc-${s.n}`}>
          <div className="gw-container grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="gw-num">{s.n}</span>
              <h2 id={`svc-${s.n}`} className="gw-h2 mt-2">
                {s.title}
              </h2>
              <p className="mt-3 mb-0 font-serif text-[24px] leading-snug gw-gradient-text">{s.tagline}</p>
              <hr className="gw-rule" />
              <p className="m-0 text-[16px] leading-7 text-ink">{s.text}</p>
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              {s.listLabel && <p className="mt-0 mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-mocha">{s.listLabel}</p>}
              {"list" in s && s.list && (
                <ul className="gw-bullets grid grid-cols-1 gap-x-8 text-[16px] sm:grid-cols-2">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {"flow" in s && s.flow && (
                <ol className="flex list-none flex-wrap items-center gap-3 p-0">
                  {s.flow.map((step, j) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="border border-ink/15 bg-white px-5 py-3 font-serif text-[20px] text-ink">{step}</span>
                      {j < s.flow!.length - 1 && (
                        <span aria-hidden="true" className="text-peach">
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              )}
              {"closing" in s && s.closing && <p className="mt-6 mb-0 font-serif text-[22px] leading-snug text-ink">{s.closing}</p>}
            </div>
          </div>
        </section>
      ))}

      <section className="gw-section bg-cocoa text-white" aria-label="Closing">
        <div className="gw-container text-center">
          {services.outro.map((line) => (
            <p key={line} className="mx-auto mb-3 max-w-[820px] font-serif text-[clamp(24px,3vw,36px)] leading-snug text-white">
              {line}
            </p>
          ))}
          <div className="mt-8">
            <Signature line={services.signOff} light />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={routes.contact} className="gw-btn gw-btn--light">
              Partner with us
            </Link>
            <Link href={routes.products} className="gw-btn gw-btn--outline border-white! text-white! hover:bg-white! hover:text-ink!">
              Our products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
