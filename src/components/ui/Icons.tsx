import type { SVGProps } from "react";

/** Thin-line icon set in the brand's bronze→blush gradient. */

function Base({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="url(#gw-icon-gradient)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={56}
      height={56}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="gw-icon-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#be926c" />
          <stop offset="1" stopColor="#e89a8a" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export const icons = {
  woman: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <circle cx="24" cy="15" r="7" />
      <path d="M10 42c1-8 6-13 14-13s13 5 14 13" />
      <path d="M17 12c2-5 12-5 14 0" />
    </Base>
  ),
  leaf: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M38 10C22 10 12 20 12 36c16 0 26-10 26-26Z" />
      <path d="M12 36c6-8 12-14 20-20" />
    </Base>
  ),
  microscope: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M20 8l8 8-8 8-8-8 8-8Z" />
      <path d="M24 20l10 10" />
      <path d="M10 40h28" />
      <path d="M18 40c0-6 5-10 12-10" />
      <path d="M34 30a8 8 0 0 1-4 10" />
    </Base>
  ),
  heart: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M24 40s-14-8.5-14-19a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 10.5-14 19-14 19Z" />
    </Base>
  ),
  levels: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M8 40h32" />
      <path d="M12 34v-8M20 34V16M28 34V22M36 34V10" />
      <path d="M10 20l10-8 8 6 10-12" />
    </Base>
  ),
  shield: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M24 6l14 5v12c0 9-6 16-14 19-8-3-14-10-14-19V11l14-5Z" />
      <path d="M17 24l5 5 9-10" />
    </Base>
  ),
  drop: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M24 6s12 13 12 22a12 12 0 0 1-24 0C12 19 24 6 24 6Z" />
      <path d="M18 30a6 6 0 0 0 6 6" />
    </Base>
  ),
  sparkle: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M24 8c1 8 5 12 13 13-8 1-12 5-13 13-1-8-5-12-13-13 8-1 12-5 13-13Z" />
      <path d="M36 30c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" />
    </Base>
  ),
  phone: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M16 8h6l3 8-4 3c2 5 5 8 10 10l3-4 8 3v6c0 2-2 4-4 4C22 38 10 26 10 12c0-2 2-4 4-4h2Z" />
    </Base>
  ),
  mail: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <rect x="8" y="12" width="32" height="24" rx="2" />
      <path d="M8 14l16 12 16-12" />
    </Base>
  ),
  pin: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M24 42s-12-12-12-22a12 12 0 0 1 24 0c0 10-12 22-12 22Z" />
      <circle cx="24" cy="20" r="4" />
    </Base>
  ),
  clock: (p?: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 14v10l7 4" />
    </Base>
  ),
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return icons[name](props);
}
