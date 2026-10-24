import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.domain || siteConfig.demo) return [];
  return ["/", "/crear-mi-miniatura", "/galeria", "/como-funciona", "/preguntas-frecuentes", "/contacto", "/politicas/privacidad", "/politicas/terminos", "/politicas/envios", "/politicas/devoluciones"].map(path => ({ url: new URL(path, siteConfig.domain!).toString() }));
}
