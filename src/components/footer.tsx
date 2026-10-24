import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { navigation, siteConfig } from "@/config/site";

export function Footer() {
  const { contact } = siteConfig;
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><Brand footer /><p>Tu mascota, siempre cerca.</p><span>Pequeñas piezas. Vínculos enormes.</span></div>
      <div><h2>Explorá PATUMÍN</h2><nav aria-label="Navegación del pie">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div>
      <div><h2>Los detalles importan</h2><nav aria-label="Políticas"><Link href="/politicas/envios">Envíos</Link><Link href="/politicas/devoluciones">Cambios y devoluciones</Link><Link href="/politicas/privacidad">Privacidad</Link><Link href="/politicas/terminos">Términos y condiciones</Link></nav></div>
      <div><h2>Sigamos cerca</h2><nav aria-label="Contacto">{contact.instagram && <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} /></a>}{contact.whatsapp && <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14} /></a>}{contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}<Link href="/contacto">Hablemos de tu miniatura <ArrowUpRight size={14} /></Link></nav>{!contact.instagram && !contact.whatsapp && !contact.email && <p className="footer-note">Estamos preparando<br />nuestros canales de atención.</p>}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} PATUMÍN · Argentina</span><span>Una marca en creación, hecha con mucho cariño.</span><span className="footer-demo">Vista previa · Compras aún no habilitadas</span></div>
  </div></footer>;
}
