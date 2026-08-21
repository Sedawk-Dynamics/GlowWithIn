import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { contact, routes, shopRoutes } from "@/lib/links";

export const metadata: Metadata = {
  title: "FAQ — GlowWithin® questions, answered",
  description: "Who GlowWithin® is for, what the hero ingredients do, how to use the products, and how ordering on the shop works.",
  alternates: { canonical: routes.faq },
};

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Who is GlowWithin® for?",
    a: "Every woman. Our range is created around the everyday needs of women across hair, skin and intimate wellness — from adolescence to adulthood and through every new chapter. Her needs evolve, and our care evolves with her.",
  },
  {
    q: "What does “hero ingredient” mean?",
    a: "Every GlowWithin® formulation begins with a purpose, and every purpose has its hero — the ingredient chosen for a meaningful role in that product. The Hair Serum leads with Rice Bran Water, Amla, Bhringraj and Brahmi; the Face Serum with Snail Mucin, Vitamin C, Niacinamide and Alpha Arbutin; the Gel Face Cream with Hyaluronic Acid, Aloe Vera and Centella; the Intimate Wash with Lactic Acid, Cranberry, Tea Tree Extract and Inulin (pre-biotic).",
  },
  {
    q: "Why is the face cream gel-based?",
    a: "Because modern women want hydration without heaviness. The gel-based formulation delivers everyday hydration without a heavy or greasy feel — fresh, lightweight and comfortable.",
  },
  {
    q: "What does “pH-conscious” mean for the Intimate Wash?",
    a: "Intimate skin is naturally mildly acidic. GlowWithin® Intimate Wash is formulated with Lactic Acid to help support that naturally acidic environment, with Inulin (a pre-biotic) for a gentle, microbiome-conscious approach to daily care.",
  },
  {
    q: "Can I use the products every day?",
    a: "Yes — each product is designed as everyday care. Always follow the directions on the pack, patch-test before first use and discontinue if irritation occurs. The products are cosmetics for external use and are not medicines.",
  },
  {
    q: "Where can I buy GlowWithin®?",
    a: (
      <>
        On our official online shop at{" "}
        <a href={shopRoutes.catalogue} className="gw-link">
          shop.glowwithin.co.in
        </a>
        . Cart, checkout, payment and your account all live there.
      </>
    ),
  },
  {
    q: "How do I track my order, change my address or reset my password?",
    a: (
      <>
        Sign in to{" "}
        <a href={shopRoutes.account} className="gw-link">
          My account
        </a>{" "}
        on the shop to see orders, addresses and account details, or{" "}
        <a href={shopRoutes.lostPassword} className="gw-link">
          reset your password
        </a>
        .
      </>
    ),
  },
  {
    q: "I’m a retailer, pharmacy or distributor. How do we work together?",
    a: (
      <>
        We build channels and partnerships that make women&apos;s wellness products accessible — strategic distribution, retail &amp; pharmacy networks
        and digital commerce. See{" "}
        <Link href={routes.services} className="gw-link">
          Our Services
        </Link>{" "}
        and write to{" "}
        <a href={contact.emailHref} className="gw-link">
          {contact.email}
        </a>
        .
      </>
    ),
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => typeof f.a === "string")
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a as string } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title="Questions, answered." lead="If you don't find what you need here, we're a message away." />
      <section className="gw-section bg-white">
        <div className="gw-container">
          <div className="mx-auto max-w-[860px]">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[24px] leading-snug text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="mt-1 text-peach transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 pr-8 text-[16px] leading-7 text-ink/85">{f.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href={routes.contact} className="gw-btn">
              Ask us anything
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
