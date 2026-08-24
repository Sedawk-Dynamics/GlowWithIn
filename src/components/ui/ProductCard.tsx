import Image from "next/image";
import { tm } from "@/components/ui/Tm";
import Link from "next/link";
import type { Product } from "@/data/products";
import type { WooProduct } from "@/lib/woo";
import { formatPrice } from "@/lib/woo";
import { addToCartUrl, routes, shopRoutes } from "@/lib/links";

/**
 * Product card — the pack shot is rendered `object-fit: contain` inside a
 * square box (`.gw-packshot`) so the bottle is always shown whole.
 */
export function ProductCard({ product, live, priority = false, showPromise = true }: { product: Product; live?: WooProduct; priority?: boolean; showPromise?: boolean }) {
  const price = live ? formatPrice(live.prices) : null;
  const regular = live && live.on_sale ? formatPrice(live.prices, live.prices.regular_price) : null;
  const inStock = live ? live.is_in_stock : true;
  const shopHref = live?.permalink ?? shopRoutes.product(product.shopSlug);

  return (
    <article className="group flex flex-col bg-white">
      <Link href={routes.product(product.slug)} className="block" aria-label={product.name}>
        <div className="gw-packshot">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 767px) 90vw, (max-width: 1239px) 45vw, 22vw"
            className="transition-transform duration-500 group-hover:scale-[1.04]"
            priority={priority}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-5 text-center">
        <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-mocha">{product.category}</p>
        <h3 className="m-0 font-serif text-[26px] leading-[1.2] text-ink">
          <Link href={routes.product(product.slug)} className="text-ink no-underline hover:text-wine">
            {tm(product.shortName)}
          </Link>
        </h3>
        {showPromise && <p className="mt-1 mb-0 font-sans text-[15px] text-ink/80">{product.promise}</p>}
        <p className="mt-3 mb-0 font-sans text-[18px] text-peach">
          {price ? (
            <>
              {regular && <s className="mr-2 text-ink/40">{regular}</s>}
              <span className="font-semibold text-ink">{price}</span>
            </>
          ) : (
            <span className="text-ink/60">See price on shop</span>
          )}
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {inStock ? (
            <a href={addToCartUrl(product.wooId)} className="gw-btn w-full sm:w-auto" rel="nofollow">
              Add to cart
            </a>
          ) : (
            <a href={shopHref} className="gw-btn gw-btn--outline w-full sm:w-auto">
              Out of stock · Notify me
            </a>
          )}
          <Link href={routes.product(product.slug)} className="gw-link text-[14px]">
            Discover
          </Link>
        </div>
      </div>
    </article>
  );
}
