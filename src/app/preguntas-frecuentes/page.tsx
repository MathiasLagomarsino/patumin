import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Faq } from "@/components/faq";
import { pageMetadata } from "@/lib/metadata";
import "@/app/information.css";

export const metadata = pageMetadata("Preguntas frecuentes", "Todo lo que necesitás saber sobre las fotos, la personalización, los tiempos y el cuidado de tu miniatura PATUMÍN.", "/preguntas-frecuentes");

export default function FaqPage() {
  return (
    <div className="container info-page">
      <header className="page-intro info-intro"><span className="eyebrow">HABLEMOS DE LOS DETALLES</span><h1>Unas pequeñas preguntas.<br />Todo un mundo de respuestas.</h1><p>Queremos que disfrutes imaginar tu miniatura, con información clara en cada paso.</p></header>
      <div className="faq-page-grid">
        <Faq />
        <aside className="faq-contact-card"><MessageCircle size={28} strokeWidth={1.3} aria-hidden="true" /><h2>Cada historia es distinta.</h2><p>Si tu duda no está acá, en nuestra página de contacto vas a encontrar los canales disponibles.</p><Link href="/contacto" className="text-link">Hablemos <ArrowRight size={17} aria-hidden="true" /></Link></aside>
      </div>
    </div>
  );
}
