import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", ...(siteConfig.demo ? { disallow: "/" } : { allow: "/", disallow: ["/checkout", "/pedido/", "/api/"] }) }, ...(siteConfig.domain && !siteConfig.demo ? { sitemap: `${siteConfig.domain}/sitemap.xml` } : {}) };
}
