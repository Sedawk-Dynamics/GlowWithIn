import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centred = align === "center";
  return (
    <div className={`${centred ? "mx-auto max-w-[820px] text-center" : "max-w-[820px] text-left"} ${className}`}>
      {eyebrow && <p className="gw-eyebrow">{eyebrow}</p>}
      <Tag className={Tag === "h1" ? "gw-h1" : Tag === "h2" ? "gw-h2" : "gw-h3"}>{title}</Tag>
      <hr className={`gw-rule ${centred ? "gw-rule--center" : ""}`} />
      {lead && <div className="gw-lead">{lead}</div>}
    </div>
  );
}

/** Full-width page title band used by every inner page. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="gw-pagehero">
      <div className="gw-container py-14 md:py-20">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
        {children}
      </div>
    </section>
  );
}

/** The brand sign-off used at the foot of several pages. */
export function Signature({ line, signOff, light = false }: { line: string; signOff?: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p className={`m-0 font-serif text-[clamp(26px,3.4vw,40px)] leading-[1.2] ${light ? "text-white" : "text-ink"}`}>{line}</p>
      {signOff && (
        <p className={`mt-3 mb-0 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] ${light ? "text-white/80" : "text-mocha"}`}>{signOff}</p>
      )}
    </div>
  );
}
