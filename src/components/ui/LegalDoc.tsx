import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "./Section";
import { tm } from "./Tm";
import type { LegalBlock, LegalDocument } from "@/data/legal";
import { routes } from "@/lib/links";

/** Cross-references inside the policy text → our pages. */
const XREFS: Array<[RegExp, string]> = [
  [/Returns?, Refunds & Cancellations Policy|Return & Refund Policy|Return Policy|Shipping Policy/g, routes.returns],
  [/Privacy Policy/g, routes.privacy],
  [/Terms & Conditions/g, routes.terms],
];

/** Paragraph text: ™ as superscript, policy names / emails / phone as links. */
function rich(text: string, current: string): ReactNode {
  const tokens: Array<{ i: number; len: number; node: ReactNode }> = [];
  for (const [re, href] of XREFS) {
    if (href === current) continue;
    for (const m of text.matchAll(re)) {
      tokens.push({
        i: m.index!,
        len: m[0].length,
        node: (
          <Link key={`${m.index}-x`} href={href} className="text-wine underline-offset-2 hover:underline">
            {m[0]}
          </Link>
        ),
      });
    }
  }
  for (const m of text.matchAll(/[a-z.]+@glowwithin\.co\.in/g)) {
    tokens.push({
      i: m.index!,
      len: m[0].length,
      node: (
        <a key={`${m.index}-e`} href={`mailto:${m[0]}`} className="text-wine">
          {m[0]}
        </a>
      ),
    });
  }
  for (const m of text.matchAll(/\+91 70757 92176|7075792176/g)) {
    tokens.push({
      i: m.index!,
      len: m[0].length,
      node: (
        <a key={`${m.index}-t`} href="tel:+917075792176" className="text-wine">
          +91 70757 92176
        </a>
      ),
    });
  }
  tokens.sort((a, b) => a.i - b.i);
  const out: ReactNode[] = [];
  let pos = 0;
  tokens.forEach((t, k) => {
    if (t.i < pos) return;
    out.push(<span key={`s${k}`}>{tm(text.slice(pos, t.i))}</span>);
    out.push(t.node);
    pos = t.i + t.len;
  });
  out.push(<span key="tail">{tm(text.slice(pos))}</span>);
  return out;
}

function Block({ b, current }: { b: LegalBlock; current: string }) {
  if ("h2" in b) return <h2 className="mt-12 mb-3 font-serif text-[28px] font-normal leading-tight text-ink">{tm(b.h2)}</h2>;
  if ("h3" in b) return <h3 className="mt-8 mb-2 font-sans text-[16px] font-semibold leading-6 text-ink">{tm(b.h3)}</h3>;
  if ("lead" in b) return <p className="m-0 mb-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-mocha">{b.lead}</p>;
  if ("ul" in b) {
    return (
      <ul className="gw-bullets my-4">
        {b.ul.map((li) => (
          <li key={li}>{rich(li, current)}</li>
        ))}
      </ul>
    );
  }
  if ("contact" in b) {
    return (
      <div className="my-4 border border-ink/10 bg-cream p-5">
        <p className="m-0 mb-3 font-semibold text-ink">{tm(b.contact.org)}</p>
        <dl className="m-0">
          {b.contact.rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-x-6 py-1 sm:grid-cols-[200px_1fr]">
              <dt className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-mocha">{k}</dt>
              <dd className="m-0 text-[15px] leading-6 text-ink">{rich(v, current)}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  return <p className="my-3 text-[16px] leading-7 text-ink">{rich(b.p, current)}</p>;
}

const OTHER_POLICIES: Array<[string, string]> = [
  [routes.privacy, "Privacy Policy"],
  [routes.terms, "Terms & Conditions"],
  [routes.returns, "Shipping, Returns & Refunds"],
  [routes.faq, "FAQ"],
];

export function LegalDoc({ doc, current, eyebrow = "Policies" }: { doc: LegalDocument; current: string; eyebrow?: string }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={doc.title} />
      <section className="gw-section bg-white">
        <div className="gw-container">
          <article className="mx-auto max-w-[820px]">
            {doc.blocks.map((b, i) => (
              <Block key={i} b={b} current={current} />
            ))}
            <p className="mt-12 mb-0 font-serif text-[24px] text-ink">{tm("GlowWithin™ — For Her, Forever.")}</p>
            <p className="mt-2 text-[13px] text-mocha">© 2026 Sri Varamaha Wellness (P) Ltd. All rights reserved.</p>
          </article>
          <nav aria-label="Other policies" className="mx-auto mt-12 flex max-w-[820px] flex-wrap gap-4 border-t border-ink/10 pt-6 text-[14px]">
            {OTHER_POLICIES.filter(([href]) => href !== current).map(([href, label]) => (
              <Link key={href} href={href} className="gw-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
