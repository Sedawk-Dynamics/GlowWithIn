import { Fragment, type ReactNode } from "react";

/**
 * Render a string with every trade-mark sign as a superscript:
 * "GlowWithin™ Hair Serum" → GlowWithin<sup>™</sup> Hair Serum.
 *
 * Use at render time only — metadata, JSON-LD and alt text keep the plain
 * character. Non-string children pass straight through.
 */
export function tm(text: ReactNode): ReactNode {
  if (typeof text !== "string" || !text.includes("™")) return text;
  const parts = text.split("™");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <sup className="gw-tm">™</sup>}
    </Fragment>
  ));
}

/** Component form, handy inside JSX: <Tm>{product.name}</Tm> */
export function Tm({ children }: { children: ReactNode }) {
  return <>{tm(children)}</>;
}
