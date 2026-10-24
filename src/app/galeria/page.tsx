import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { pageMetadata } from "@/lib/metadata";
import "@/app/information.css";

export const metadata = pageMetadata(
  "Galería de conceptos",
  "Conocé la dirección visual de PATUMÍN: miniaturas personalizadas de perros y gatos. Imágenes de concepto claramente identificadas.",
  "/galeria",
);

export default function GalleryPage() {
  return (
    <div className="container info-page">
      <header className="page-intro info-intro">
        <span className="eyebrow">EL UNIVERSO PATUMÍN</span>
        <h1>Pequeñas versiones de<br className="desktop-break" /> grandes compañeros.</h1>
        <p>Sus manchitas. Su manera de sentarse. Esa mirada que reconocés entre mil. Un universo de pequeños detalles por transformar en miniatura.</p>
      </header>
      <div className="demo-disclosure">
        <Sparkles size={18} strokeWidth={1.5} aria-hidden="true" />
        <p><strong>Una primera mirada a nuestra idea.</strong> Estas imágenes fueron generadas con IA para explorar la dirección visual de la marca. No son fotografías de trabajos terminados ni de mascotas de clientes.</p>
      </div>
      <Gallery />
      <section className="info-inline-cta">
        <div><span className="eyebrow">TAN ÚNICA COMO SU HISTORIA</span><h2>La próxima idea puede ser la tuya.</h2></div>
        <Link href="/crear-mi-miniatura" className="button button-primary">Crear mi miniatura <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
