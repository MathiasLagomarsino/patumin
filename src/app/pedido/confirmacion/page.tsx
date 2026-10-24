import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import "../../checkout/checkout.css";

export const metadata = { ...pageMetadata("Estado de tu pedido", "Información sobre la confirmación de pedidos de PATUMÍN.", "/pedido/confirmacion"), robots: { index: false, follow: false } };

/** A redirect, query string or visit to this page is never proof of payment. */
export default function OrderConfirmationPage() {
  return (
    <div className="order-status-page">
      <span className="checkout-empty-icon"><LockKeyhole size={28} strokeWidth={1.4} aria-hidden="true" /></span>
      <p className="eyebrow">PASO A PASO, CON CUIDADO</p>
      <h1>Todavía no hay un pedido confirmado.</h1>
      <p className="order-status-description">La tienda está en preparación y los pagos aún no están habilitados. Visitar esta página no confirma una compra.</p>
      <div className="order-status-card"><h2>Tu idea puede esperar acá.</h2><p>Si exploraste el personalizador, podés recuperar tu selección desde este mismo navegador. Cuando las compras estén disponibles, confirmaremos el pago antes de habilitar el envío de fotografías por WhatsApp.</p></div>
      <div className="order-status-actions"><Link href="/checkout" className="button button-primary">Ver mi selección <ArrowRight size={16} aria-hidden="true" /></Link><Link href="/contacto" className="text-link">Ir a contacto <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
