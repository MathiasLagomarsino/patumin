import Link from "next/link";
import { ArrowUpRight, Camera, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import "@/app/information.css";

export const metadata = pageMetadata("Contacto", "Hablemos de tu compañero. Encontrá los canales de contacto disponibles de PATUMÍN y las respuestas a las preguntas más frecuentes.", "/contacto");

export default function ContactPage() {
  const { whatsapp, email, instagram } = siteConfig.contact;
  const channels = [
    { name: "WhatsApp", icon: MessageCircle, description: "Para conversar sobre tu miniatura y, después de comprar, compartirnos sus fotos.", href: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : null, label: "Abrir WhatsApp" },
    { name: "Email", icon: Mail, description: "Para consultas con un poco más de espacio, propuestas o información sobre la marca.", href: email ? `mailto:${email}` : null, label: email ?? "Escribinos" },
    { name: "Instagram", icon: Camera, description: "Para descubrir el universo de PATUMÍN y acompañar los primeros pasos de la marca.", href: instagram, label: "Ver Instagram" },
  ];
  return (
    <div className="container info-page">
      <header className="page-intro info-intro"><span className="eyebrow">DEL OTRO LADO, PERSONAS</span><h1>Nos encantaría<br />conocer su historia.</h1><p>Una idea, una duda, un compañero muy especial. Este es el lugar para empezar la conversación.</p></header>
      {!channels.some((channel) => channel.href) && <div className="contact-opening-note"><span className="opening-dot" /><p>Estamos preparando nuestros canales de atención. Los vas a encontrar acá en cuanto estén disponibles.</p></div>}
      <div className="contact-grid">
        {channels.map(({ name, icon: Icon, description, href, label }) => (
          <article className="contact-channel" key={name}><Icon size={28} strokeWidth={1.25} aria-hidden="true" /><h2>{name}</h2><p>{description}</p>{href ? <a href={href} className="text-link" target={name === "Email" ? undefined : "_blank"} rel={name === "Email" ? undefined : "noopener noreferrer"}>{label}<ArrowUpRight size={18} aria-hidden="true" /></a> : <span className="contact-pending">Próximamente disponible</span>}</article>
        ))}
      </div>
      <section className="info-inline-cta"><div><span className="eyebrow">MIENTRAS TANTO</span><h2>Quizás tu respuesta ya esté acá.</h2></div><Link href="/preguntas-frecuentes" className="button button-secondary">Ver preguntas frecuentes <ArrowRight size={17} aria-hidden="true" /></Link></section>
    </div>
  );
}
