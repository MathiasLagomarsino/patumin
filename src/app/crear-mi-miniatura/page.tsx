import Link from "next/link";
import { ArrowLeft, Brush, Clock3, PackageCheck, Fingerprint } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductConfigurator } from "@/components/product/product-configurator";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import "./product.css";

export const metadata = pageMetadata("Creá tu miniatura", "Imaginá una miniatura personalizada de tu perro o gato, modelada para vos y pintada a mano. Explorá la personalización de PATUMÍN.", "/crear-mi-miniatura");

export default function ProductPage() {
  return (
    <>
      <div className="container product-page">
        <Link href="/" className="product-back"><ArrowLeft size={14} aria-hidden="true" /> Volver al inicio</Link>
        <div className="product-layout">
          <ProductGallery />
          <div className="product-details">
            <p className="eyebrow">SU HISTORIA, EN MINIATURA</p>
            <h1>Miniatura personalizada de tu mascota</h1>
            <p className="product-description">Sus gestos, sus colores y esa mirada que conocés de memoria. Una pieza creada especialmente para celebrar a tu compañero.</p>
            <div className="product-price"><strong>A confirmar</strong><span>Precio en pesos argentinos</span></div>
            <div className="product-details-rule" />
            <ProductConfigurator />
            <div className="product-production"><Clock3 size={21} aria-hidden="true" /><p>Cada miniatura se realiza especialmente para vos. El proceso de producción tiene una duración estimada de <strong>{siteConfig.production.minDays} a {siteConfig.production.maxDays} días.</strong><small>El tipo de días y el inicio del plazo se confirmarán antes de comprar.</small></p></div>
            <p className="product-shipping"><PackageCheck size={18} aria-hidden="true" /> Envíos a Argentina. El costo se informará antes de la compra.</p>
          </div>
        </div>
      </div>
      <section className="product-detail-section">
        <div className="container product-detail-grid">
          <div><p className="eyebrow">TAN ÚNICA COMO ÉL. TAN ESPECIAL COMO ELLA.</p><h2>Los pequeños detalles<br />hacen la diferencia.</h2></div>
          <div className="product-craft-facts">
            <article><Fingerprint size={26} strokeWidth={1.4} aria-hidden="true" /><div><h3>Su esencia como punto de partida</h3><p>Partimos de sus fotografías para trabajar los rasgos que hacen reconocible a tu mascota.</p></div></article>
            <article><Brush size={26} strokeWidth={1.4} aria-hidden="true" /><div><h3>Una terminación artesanal</h3><p>La pintura a mano da lugar a sus colores, sus marcas y su personalidad.</p></div></article>
            <Link href="/como-funciona" className="text-link">Conocé cómo creamos cada PATUMÍN <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <div className="container product-help"><p>¿Te quedó alguna duda?</p><Link href="/preguntas-frecuentes" className="text-link">Encontrá respuestas en nuestras preguntas frecuentes <span aria-hidden="true">↗</span></Link></div>
    </>
  );
}
