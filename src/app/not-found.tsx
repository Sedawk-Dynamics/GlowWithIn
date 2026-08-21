import Link from "next/link";
import { routes, shopRoutes } from "@/lib/links";

export default function NotFound() {
  return (
    <section className="gw-section gw-pagehero">
      <div className="gw-container text-center">
        <p className="gw-eyebrow">404</p>
        <h1 className="gw-h1">We couldn&apos;t find that page.</h1>
        <hr className="gw-rule gw-rule--center" />
        <p className="mx-auto max-w-[520px] text-[16px] leading-7 text-ink/85">
          The page may have moved to our shop, or the link may be out of date.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={routes.home} className="gw-btn">Back to home</Link>
          <a href={shopRoutes.catalogue} className="gw-btn gw-btn--outline">Go to the shop</a>
        </div>
      </div>
    </section>
  );
}
