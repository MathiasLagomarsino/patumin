"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Clock3, LockKeyhole, MessageCircle, Pencil, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/urls";
import { clearDraft, getDraftSnapshot, getServerDraftSnapshot, parseDraft, subscribeDraft } from "@/lib/draft";
import type { CustomerDetails } from "@/types/commerce";
import { formatArs } from "@/lib/money";

const fields: { key: keyof CustomerDetails; label: string; placeholder: string; autoComplete: string; type?: string; maxLength: number; wide?: boolean; group: "contact" | "shipping" }[] = [
  { key: "email", label: "Email", placeholder: "Tu correo electrónico", autoComplete: "email", type: "email", maxLength: 254, wide: true, group: "contact" },
  { key: "name", label: "Nombre y apellido", placeholder: "Tu nombre completo", autoComplete: "name", maxLength: 100, wide: true, group: "contact" },
  { key: "phone", label: "Teléfono", placeholder: "Con código de área", autoComplete: "tel", type: "tel", maxLength: 24, wide: true, group: "contact" },
  { key: "street", label: "Calle, número y departamento", placeholder: "Tu dirección de entrega", autoComplete: "shipping street-address", maxLength: 160, wide: true, group: "shipping" },
  { key: "city", label: "Localidad", placeholder: "Tu ciudad o localidad", autoComplete: "shipping address-level2", maxLength: 100, group: "shipping" },
  { key: "province", label: "Provincia", placeholder: "Tu provincia", autoComplete: "shipping address-level1", maxLength: 100, group: "shipping" },
  { key: "postalCode", label: "Código postal", placeholder: "Ej.: 1425 o C1425ABC", autoComplete: "shipping postal-code", maxLength: 8, group: "shipping" },
];

export function CheckoutPreview() {
  const stored = useSyncExternalStore(subscribeDraft, getDraftSnapshot, getServerDraftSnapshot);
  const draft = parseDraft(stored);
  const selectedVariant = siteConfig.product.variants.find((variant) => variant.id === draft?.variantId);

  if (!draft || !selectedVariant) {
    return (
      <div className="checkout-empty">
        <span className="checkout-empty-icon"><ShoppingBag size={30} strokeWidth={1.4} aria-hidden="true" /></span>
        <p className="eyebrow">TU COMPAÑERO, EN MINIATURA</p>
        <h1>Elegí tu miniatura.</h1>
        <p>Seleccioná el tamaño y la cantidad para continuar. Las fotos y los detalles de tu mascota se coordinan después de comprar.</p>
        <Link className="button button-primary" href="/crear-mi-miniatura">Elegir mi miniatura <ArrowRight size={17} aria-hidden="true" /></Link>
        <small>Esta es una vista previa. Los pedidos y los pagos aún no están habilitados.</small>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <Link href="/crear-mi-miniatura" className="product-back"><ArrowLeft size={14} aria-hidden="true" /> Volver al producto</Link>
      <div className="checkout-heading"><p className="eyebrow">TU COMPAÑERO, EN MINIATURA</p><h1>Finalizar mi pedido.</h1><p>Contacto, entrega y pago en un solo lugar.</p></div>
      <div id="checkout-preview-notice" className="checkout-preview-banner"><LockKeyhole size={19} aria-hidden="true" /><p><strong>Vista previa: los pagos todavía no están habilitados.</strong> Estamos preparando las opciones de envío y los medios de pago. Los datos que pruebes acá no se envían ni se guardan, y no se crea ningún pedido.</p></div>
      <form className="checkout-layout" onSubmit={(event) => event.preventDefault()}>
        <div className="checkout-form-panel">
          {([{ id: "contact", title: "Contacto" }, { id: "shipping", title: "Entrega en Argentina" }] as const).map((group) => (
            <fieldset className="checkout-customer-group" key={group.id}>
              <legend>{group.title}</legend>
              <div className="checkout-fields">
                {fields.filter((field) => field.group === group.id).map((field) => (
                  <div className={`checkout-field${field.wide ? " checkout-field-wide" : ""}`} key={field.key}>
                    <label className="product-label" htmlFor={`customer-${field.key}`}>{field.label}</label>
                    <input id={`customer-${field.key}`} className="product-input" name={field.key} type={field.type ?? "text"} autoComplete={field.autoComplete} maxLength={field.maxLength} placeholder={field.placeholder} required />
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="checkout-after-purchase"><MessageCircle size={23} strokeWidth={1.5} aria-hidden="true" /><div><h2>Después del pago, nos conocemos.</h2><p>Nos enviás por WhatsApp las fotos, el nombre y los detalles de tu mascota para empezar a crear su miniatura.</p><Link href="/como-funciona" className="text-link">Conocé el proceso <span aria-hidden="true">↗</span></Link></div></div>
        </div>
        <aside className="checkout-summary" aria-labelledby="summary-title">
          <div className="checkout-summary-top"><h2 id="summary-title">Resumen del pedido</h2><Link href="/crear-mi-miniatura" aria-label="Editar tamaño y cantidad"><Pencil size={16} /></Link></div>
          <div className="checkout-summary-product"><div className="checkout-summary-image"><Image src={assetPath("/assets/hero-miniature.webp")} alt="Imagen de concepto de una miniatura de mascota, generada con IA" fill sizes="90px" /></div><div><h3>Miniatura personalizada</h3><p>Para tu perro o gato</p><span>{selectedVariant.title}{!selectedVariant.pose && " · Postura a coordinar"}</span><small>{draft.quantity} × {formatArs(selectedVariant.priceArs)}</small></div></div>
          <dl className="checkout-totals"><div><dt>Subtotal ({draft.quantity} {draft.quantity === 1 ? "miniatura" : "miniaturas"})</dt><dd>{formatArs(selectedVariant.priceArs * draft.quantity)}</dd></div><div><dt>Envío a Argentina</dt><dd>A confirmar</dd></div><div className="checkout-total"><dt>Total con envío</dt><dd>A confirmar</dd></div></dl>
          <p className="checkout-price-note">Vas a conocer el precio final, incluido el envío, antes de pagar.</p>
          <button className="button button-primary checkout-payment" type="submit" disabled aria-describedby="checkout-preview-notice"><LockKeyhole size={16} aria-hidden="true" /> Pagar pedido</button>
          <p className="checkout-production"><Clock3 size={16} aria-hidden="true" /><span>Producción estimada: {siteConfig.production.minDays} a {siteConfig.production.maxDays} días. El cómputo del plazo está pendiente de confirmación.</span></p>
          <button className="checkout-clear" type="button" onClick={clearDraft}>Borrar mi selección guardada</button>
          <p className="checkout-local-note">Solo el tamaño y la cantidad se guardan en este navegador.</p>
        </aside>
      </form>
    </div>
  );
}
