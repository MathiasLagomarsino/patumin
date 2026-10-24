import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand";

export function FinalCta() {
  return <section className="final-cta"><div className="container final-cta-inner"><BrandMark className="cta-mark" /><div><p className="eyebrow">UN AMOR QUE MERECE SU VERSIÓN MINI</p><h2>¿Creamos una versión mini<br />de tu compañero?</h2><p>Un recuerdo personalizado para celebrar todo lo que lo hace único.</p></div><Link href="/crear-mi-miniatura" className="button button-primary">Quiero mi PATUMÍN <ArrowUpRight size={19} /></Link></div></section>;
}
