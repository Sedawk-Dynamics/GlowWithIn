import type { MetadataRoute } from "next";
import { APEX_ORIGIN } from "@/lib/links";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${APEX_ORIGIN}/sitemap.xml`,
  };
}
