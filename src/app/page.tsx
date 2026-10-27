import Image from "next/image";
import { assetPath } from "@/lib/urls";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Brush, Fingerprint, Heart, Package, Sparkles, Truck } from "lucide-react";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { processSteps } from "@/config/content";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import "./information.css";

export const metadata = pageMetadata("Tu mascota, siempre cerca.", "Una versión chiquita de un amor enorme. Miniaturas personalizadas de perros y gatos, modeladas especialmente para vos y pintadas a mano.", "/");

const benefits = [
  { icon: Fingerprint, title: "Hecha especialmente para vos", text: "Modelada a partir de sus fotos. Porque la tuya no es cualquier mascota." },
  { icon: Brush, title: "Pintada a mano", text: "Sus colores, sus manchitas. Cada detalle recibe una terminación artesanal." },
  { icon: Heart, title: "Tan única como tu mascota", text: "Esa mirada y esos gestos que reconocerías en cualquier lugar." },
  { icon: Truck, title: "Envíos a toda Argentina", text: "Para que ese poquito de amor encuentre su lugar en tu casa." },
];
const galleryItems = [
  { image: "hero-miniature", label: "Esos ojos que lo dicen todo.", type: "PERROS", position: "center 65%" },
  { image: "cat-miniature", label: "Su personalidad, intacta.", type: "GATOS", position: "center" },
  { image: "dog-miniature", label: "Hasta su última manchita.", type: "PERROS", position: "center" },
];

export default function Home() {
  return <>
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> MINIATURAS PERSONALIZADAS DE MASCOTAS</p>
        <h1 id="hero-title">Tu mascota,<br /><em>siempre cerca.</em></h1>
        <p className="hero-description">Transformamos sus gestos, sus colores y esa mirada tan suya en una miniatura única, modelada especialmente para vos y pintada a mano.</p>
        <div className="hero-actions"><Link href="/crear-mi-miniatura" className="button button-primary">Crear mi miniatura <ArrowUpRight size={19} /></Link><Link href="/galeria" className="hero-secondary">Ver nuestras creaciones <ArrowRight size={18} /></Link></div>
        <div className="hero-footnote"><span className="tiny-icon"><Brush size={18} /></span><p>Creada con tiempo. Pintada con amor.<br /><span>Una pieza tan especial como su historia.</span></p></div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo"><Image src={assetPath("/assets/hero-miniature.webp")} alt="Imagen de concepto: miniatura pintada de un golden retriever junto a una fotografía de referencia" fill sizes="(max-width: 767px) 92vw, 48vw" priority /><span className="image-disclosure">Imagen de concepto · IA</span></div>
        <div className="hero-stamp"><Sparkles size={22} strokeWidth={1.2} /><span>Pequeñita en tamaño.<br /><em>Enorme en amor.</em></span></div>
        <div className="hero-caption"><span>DE UNA FOTO, A UN RECUERDO PARA ATESORAR</span><span aria-hidden="true">↗</span></div>
      </div>
    </section>

    <section className="benefits-section"><div className="container"><div className="benefits-title"><span className="eyebrow">EL UNIVERSO PATUMÍN</span><h2>Pequeños detalles, grandes emociones.</h2></div><div className="benefits-grid">{benefits.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={28} strokeWidth={1.25} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section container home-gallery" aria-labelledby="gallery-title"><div className="section-heading"><div><p className="eyebrow">COMPAÑEROS EN VERSIÓN MINI</p><h2 id="gallery-title">Pequeñas versiones de<br />grandes compañeros.</h2></div><div className="section-heading-aside"><p>Sus orejas, sus colores, su forma de mirar.<br />La magia está en lo que los hace únicos.</p><Link href="/galeria" className="text-link">Explorar la galería <ArrowUpRight size={18} /></Link></div></div><div className="home-gallery-grid">{galleryItems.map((item, i) => <Link className={`home-gallery-item gallery-item-${i}`} key={item.image} href="/galeria"><div className="gallery-image"><Image src={assetPath(`/assets/${item.image}.webp`)} alt={`Concepto demostrativo de miniatura personalizada de ${item.type === "GATOS" ? "gato" : "perro"}`} fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 46vw, 32vw" style={{ objectPosition: item.position }} /><span className="image-disclosure">Concepto · IA</span><span className="gallery-open" aria-hidden="true"><ArrowUpRight size={22} /></span></div><div className="gallery-label"><span>{item.type}</span><h3>{item.label}</h3></div></Link>)}</div><p className="demo-note">Una mirada a lo que estamos creando: imágenes demostrativas generadas con IA. Pronto, nuestros primeros trabajos reales.</p></section>

    <section className="comparison-section"><div className="container comparison-grid"><div className="comparison-copy"><p className="eyebrow">INCONFUNDIBLEMENTE TUYO</p><h2>Sus detalles.<br />Su personalidad.<br /><em>Su versión mini.</em></h2><p>No es un perro cualquiera.<br />No es un gato cualquiera.<br />Es tu compañero, con todo eso que lo hace él.</p><p>Partimos de sus fotografías para interpretar sus rasgos en una pieza que cuenta su historia.</p><Link href="/como-funciona" className="text-link">Conocé el proceso <ArrowUpRight size={18} /></Link></div><figure className="comparison-figure"><div className="comparison-photo"><Image src={assetPath("/assets/comparison.webp")} alt="Comparación conceptual generada con IA: un golden retriever a la izquierda y su interpretación como miniatura a la derecha" fill sizes="(max-width: 800px) 90vw, 56vw" /><div className="comparison-labels"><span>La inspiración</span><span>Su versión mini</span></div></div><figcaption>Comparación ilustrativa · Ambas imágenes son conceptos generados con IA, no un trabajo realizado.</figcaption></figure></div></section>

    <section className="section container process-home"><div className="section-heading"><div><p className="eyebrow">ASÍ EMPIEZA SU HISTORIA</p><h2>De sus fotos a<br />una miniatura única.</h2></div><p className="section-heading-aside">Vos nos compartís lo que lo hace especial.<br />Nosotros le damos forma, paso a paso.</p></div><ol className="process-grid">{processSteps.map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol><div className="process-bottom"><p><Package size={19} /> Producción estimada: {siteConfig.production.minDays} a {siteConfig.production.maxDays} días. Sujeta a confirmación.</p><Link href="/crear-mi-miniatura" className="button button-secondary">Empezar mi pedido <ArrowUpRight size={18} /></Link></div></section>

    <section className="craft-section container"><div className="craft-photo"><Image src={assetPath("/assets/craft-miniature.webp")} alt="Imagen de concepto de un pincel trabajando sobre una miniatura de mascota" fill sizes="(max-width: 767px) 90vw, 50vw" /><span className="image-disclosure">Proceso ilustrativo · IA</span></div><div className="craft-copy"><p className="eyebrow">EL VALOR DE LO HECHO A MANO</p><h2>Cada detalle<br />cuenta una historia.</h2><p>No hay dos mascotas iguales. Por eso, cada PATUMÍN se crea individualmente, prestando atención a esos pequeños detalles que hacen tan especial a tu compañero.</p><div className="craft-signature"><Brush size={25} strokeWidth={1.2} /><span>Un poquito de arte.<br /><em>Muchísimo cariño.</em></span></div></div></section>

    <section className="memory-section container"><span className="memory-star" aria-hidden="true">✳</span><p className="eyebrow">PARA CELEBRAR LO QUE NOS UNE</p><h2>Hay compañías que dejan<br /><em>huella para siempre.</em></h2><p>Algunas mascotas nos acompañan todos los días. Otras viven para siempre en nuestros recuerdos. En PATUMÍN queremos ayudarte a conservar un poquito de esa historia en una pieza hecha especialmente para vos.</p><span className="memory-rule" /></section>

    <section className="faq-home section container"><div><p className="eyebrow">TE ACOMPAÑAMOS</p><h2>Las pequeñas<br />grandes preguntas.</h2><p>Todo lo que querés saber<br />antes de empezar.</p><Link href="/preguntas-frecuentes" className="text-link">Ver todas las preguntas <ArrowUpRight size={18} /></Link></div><Faq limit={5} /></section>
    <FinalCta />
  </>;
}
