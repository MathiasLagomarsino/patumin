import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/dm-serif-display/latin-400.css";
import "@fontsource/dm-serif-display/latin-400-italic.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { default: "PATUMÍN — Tu mascota, siempre cerca.", template: "%s | PATUMÍN" },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.domain || "http://127.0.0.1:3000"),
  robots: siteConfig.demo ? { index: false, follow: false } : { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#F8F3ED", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><main id="contenido">{children}</main><Footer /></body></html>;
}
