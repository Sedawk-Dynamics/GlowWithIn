import type { ReactNode } from "react";
import { PageHero } from "./Section";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated: ${updated}`} />
      <section className="gw-section bg-white">
        <div className="gw-container">
          <div className="gw-prose mx-auto max-w-[820px] text-[16px] leading-7 text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-[28px] [&_h2]:font-normal [&_h2]:text-ink [&_ul]:my-4 [&_ul]:pl-5 [&_li]:mb-2 [&_a]:text-wine">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
