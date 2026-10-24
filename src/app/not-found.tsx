import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return <div className="container not-found"><p className="eyebrow">404 · NOS FUIMOS DE PASEO</p><h1>Por acá no era.</h1><p>Esta página no está, pero tu próxima miniatura puede estar un poquito más cerca.</p><Link href="/" className="button button-primary"><ArrowLeft size={18} /> Volver al inicio</Link></div>;
}
