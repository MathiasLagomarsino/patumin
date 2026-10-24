import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MessageCircle } from "lucide-react";
import { processSteps, productionEstimate } from "@/config/content";
import { pageMetadata } from "@/lib/metadata";
import "@/app/information.css";

export const metadata = pageMetadata(
  "Cómo funciona",
  "De sus fotos a una pieza hecha para vos. Conocé el proceso de modelado, revisión, impresión y pintura artesanal de PATUMÍN.",
  "/como-funciona",
);

export default function HowItWorksPage() {
  return (
    <>
      <section className="container info-page process-page-intro">
        <div className="page-intro info-intro">
          <span className="eyebrow">DE UNA FOTO A UN RECUERDO</span>
          <h1>De sus fotos a una<br /> miniatura única.</h1>
          <p>Vos nos contás quién es. Nosotros ponemos el tiempo, las manos y el cuidado para darle su propia versión mini.</p>
          <Link href="/crear-mi-miniatura" className="button button-primary">Empezar mi pedido <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <figure className="process-cover">
          <Image src="/assets/craft-miniature.webp" alt="Concepto generado con IA del proceso de pintura a mano de una miniatura de perro" fill sizes="(max-width: 800px) 100vw, 46vw" priority />
          <figcaption>Imagen de concepto generada con IA</figcaption>
        </figure>
      </section>
      <section className="container process-detail-section" aria-label="Los cinco pasos de tu miniatura">
        <div className="process-aside"><span className="eyebrow">ASÍ LA HACEMOS POSIBLE</span><h2>Un proceso pensado<br /> para cada compañero.</h2><p>Una pieza personal lleva tiempo. Queremos que sepas qué sucede en cada etapa.</p></div>
        <ol className="process-detail-list">
          {processSteps.map((step, index) => (
            <li key={step.title}><span className="process-detail-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
          ))}
        </ol>
      </section>
      <section className="container process-notes">
        <article><Clock3 size={25} strokeWidth={1.4} aria-hidden="true" /><h2>Hecha a su tiempo.</h2><p>{productionEstimate}</p><p className="process-small">La definición de días hábiles o corridos y el inicio del plazo se informarán antes de habilitar las compras. El envío se calcula por separado.</p></article>
        <article><MessageCircle size={25} strokeWidth={1.4} aria-hidden="true" /><h2>Empezamos por conocerlo.</h2><p>Fotos de frente, de perfil y de sus detalles particulares nos ayudan a entender qué lo hace único. No hace falta que sean fotos profesionales.</p><Link className="text-link" href="/preguntas-frecuentes">Más sobre las fotografías <ArrowRight size={16} aria-hidden="true" /></Link></article>
      </section>
      <div className="container"><aside className="demo-disclosure process-phase-note"><p>Estamos preparando la apertura de pedidos. Este es el proceso previsto; las condiciones comerciales y operativas se publicarán antes de habilitar las compras.</p></aside></div>
    </>
  );
}
