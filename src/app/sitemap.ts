import type { MetadataRoute } from "next";
import { APEX_ORIGIN, routes } from "@/lib/links";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    [routes.home, 1, "weekly"],
    [routes.products, 0.9, "weekly"],
    [routes.about, 0.8, "monthly"],
    [routes.services, 0.7, "monthly"],
    [routes.whyGlowWithin, 0.6, "monthly"],
    [routes.contact, 0.6, "yearly"],
    [routes.faq, 0.5, "monthly"],
    [routes.privacy, 0.2, "yearly"],
    [routes.terms, 0.2, "yearly"],
  ];
  return [
    ...statics.map(([path, priority, changeFrequency]) => ({ url: `${APEX_ORIGIN}${path}`, lastModified: now, priority, changeFrequency })),
    ...products.map((p) => ({ url: `${APEX_ORIGIN}${routes.product(p.slug)}`, lastModified: now, priority: 0.9, changeFrequency: "weekly" as const })),
  ];
}
