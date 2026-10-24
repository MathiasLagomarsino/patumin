import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: path === "/" ? `${siteConfig.name} — ${title}` : title,
    description,
    ...(siteConfig.domain ? { alternates: { canonical: new URL(path, siteConfig.domain).toString() } } : {}),
    openGraph: {
      title: `${title} | PATUMÍN`, description, locale: "es_AR", type: "website", siteName: "PATUMÍN",
      ...(siteConfig.domain ? { url: new URL(path, siteConfig.domain).toString() } : {}),
      images: [{ url: "/assets/hero-miniature.webp", width: 1122, height: 1402, alt: "Concepto demostrativo de una miniatura PATUMÍN" }],
    },
  };
}
