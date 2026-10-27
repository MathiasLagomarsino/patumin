import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import "../../checkout/checkout.css";

export const metadata: Metadata = {
  title: "Consulta de pedido",
  description: "La consulta privada de pedidos de PATUMÍN se habilitará junto con la tienda.",
  robots: { index: false, follow: false },
};

// Pages can only publish known static URLs. This is an informational page,
// never an exported customer/order record. Unknown references remain 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ reference: "consulta" }];
}

/** Public references alone must never grant access to customer data. */
export default function OrderLookupPage() {
  return (
    <div className="order-status-page">
      <span className="checkout-empty-icon"><ShieldCheck size={30} strokeWidth={1.4} aria-hidden="true" /></span>
      <p className="eyebrow">TU HISTORIA, BIEN CUIDADA</p>
      <h1>La consulta de pedidos está en preparación.</h1>
      <p className="order-status-description">Todavía no hay una consulta de pedidos habilitada. Esta página no permite verificar referencias ni acceder a información personal.</p>
      <div className="order-status-card"><h2>¿Buscabas tu personalización?</h2><p>Tu selección de muestra puede seguir guardada en el navegador donde la creaste. Podés volver a revisarla; todavía no representa una compra.</p></div>
      <div className="order-status-actions"><Link href="/checkout" className="button button-primary">Revisar mi miniatura <ArrowRight size={16} aria-hidden="true" /></Link><Link href="/contacto" className="text-link">Ir a contacto <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
