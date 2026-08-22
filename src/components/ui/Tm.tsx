import { Fragment, type ReactNode } from "react";

/**
 * Render a string with every trade-mark sign as a superscript:
 * "GlowWithin™ Hair Serum" → GlowWithin<sup>™</sup> Hair Serum.
 *
 * The result is a single inline <span>, so it behaves as one node inside flex
 * or grid parents (a bare fragment would split the text into separate items
 * and let `justify-between` push the ™ away from the word).
 *
 * Use at render time only — metadata, JSON-LD and alt text keep the plain
 * character. Non-string children pass straight through.
 */
export function tm(text: ReactNode): ReactNode {
  if (typeof text !== "string" || !text.includes("™")) return text;
  const parts = text.split("™");
  return (
    <span className="gw-tm-wrap">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <sup className="gw-tm">™</sup>}
        </Fragment>
      ))}
    </span>
  );
}

/** Component form, handy inside JSX: <Tm>{product.name}</Tm> */
export function Tm({ children }: { children: ReactNode }) {
  return <>{tm(children)}</>;
}
