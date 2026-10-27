import { CheckoutPreview } from "@/components/product/checkout-preview";
import { pageMetadata } from "@/lib/metadata";
import "../crear-mi-miniatura/product.css";
import "./checkout.css";

export const metadata = { ...pageMetadata("Finalizar mi pedido", "Contacto, entrega y resumen de tu miniatura PATUMÍN. Vista previa sin pedidos ni pagos habilitados.", "/checkout"), robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <CheckoutPreview />;
}
