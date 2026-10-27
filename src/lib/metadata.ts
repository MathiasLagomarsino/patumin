import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteSiteUrl, assetPath } from "@/lib/urls";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: path === "/" ? `${siteConfig.name} — ${title}` : title,
    description,
    ...(siteConfig.domain ? { alternates: { canonical: absoluteSiteUrl(path, siteConfig.domain) } } : {}),
    openGraph: {
      title: `${title} | PATUMÍN`, description, locale: "es_AR", type: "website", siteName: "PATUMÍN",
      ...(siteConfig.domain ? { url: absoluteSiteUrl(path, siteConfig.domain) } : {}),
      images: [{ url: assetPath("/assets/hero-miniature.webp"), width: 1122, height: 1402, alt: "Concepto demostrativo de una miniatura PATUMÍN" }],
    },
  };
}
