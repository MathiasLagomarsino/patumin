"use client";

import Image from "next/image";
import { assetPath } from "@/lib/urls";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, LockKeyhole, Pencil, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { clearDraft, getDraftSnapshot, getServerDraftSnapshot, parseDraft, subscribeDraft, validateCustomer } from "@/lib/draft";
import type { CustomerDetails, CustomerErrors } from "@/types/commerce";

const emptyCustomer: CustomerDetails = { name: "", email: "", phone: "", street: "", city: "", province: "", postalCode: "" };
const fields: { key: keyof CustomerDetails; label: string; placeholder: string; autoComplete: string; type?: string; maxLength: number; wide?: boolean }[] = [
  { key: "name", label: "Nombre y apellido", placeholder: "Como figura en tu documento", autoComplete: "name", maxLength: 100, wide: true },
  { key: "email", label: "Email", placeholder: "Tu correo electrónico", autoComplete: "email", type: "email", maxLength: 254 },
  { key: "phone", label: "Teléfono", placeholder: "Con código de área", autoComplete: "tel", type: "tel", maxLength: 24 },
  { key: "street", label: "Calle, número y departamento", placeholder: "Tu dirección de entrega", autoComplete: "shipping street-address", maxLength: 160, wide: true },
  { key: "city", label: "Localidad", placeholder: "Tu ciudad o localidad", autoComplete: "shipping address-level2", maxLength: 100 },
  { key: "province", label: "Provincia", placeholder: "Tu provincia", autoComplete: "shipping address-level1", maxLength: 100 },
  { key: "postalCode", label: "Código postal", placeholder: "Ej.: 1425 o C1425ABC", autoComplete: "shipping postal-code", maxLength: 8 },
];

export function CheckoutPreview() {
  const stored = useSyncExternalStore(subscribeDraft, getDraftSnapshot, getServerDraftSnapshot);
  const draft = parseDraft(stored);
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCustomer(customer);
    setErrors(nextErrors);
    setValidated(Object.keys(nextErrors).length === 0);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) formRef.current?.querySelector<HTMLInputElement>(`#customer-${firstInvalid}`)?.focus();
  }

  if (!draft || !siteConfig.product.variants.some((variant) => variant.id === draft.variantId)) {
    return (
      <div className="checkout-empty">
        <span className="checkout-empty-icon"><ShoppingBag size={30} strokeWidth={1.4} aria-hidden="true" /></span>
        <p className="eyebrow">CADA HISTORIA EMPIEZA POR UN DETALLE</p>
        <h1>Tu miniatura empieza acá.</h1>
        <p>Todavía no hay una personalización guardada en este navegador. Contanos cómo es tu compañero para explorar su versión mini.</p>
        <Link className="button button-primary" href="/crear-mi-miniatura">Crear mi miniatura <ArrowRight size={17} aria-hidden="true" /></Link>
        <small>Esta es una vista previa. Los pedidos y los pagos aún no están habilitados.</small>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <Link href="/crear-mi-miniatura" className="product-back"><ArrowLeft size={14} aria-hidden="true" /> Volver a mi miniatura</Link>
      <div className="checkout-heading"><p className="eyebrow">UN POQUITO MÁS CERCA</p><h1>La versión mini de {draft.petName}.</h1><p>Revisá tu idea y conocé cómo será el próximo paso.</p></div>
      <div className="checkout-preview-banner"><LockKeyhole size={19} aria-hidden="true" /><p><strong>Estás explorando una vista previa.</strong> Estamos preparando los precios, las opciones de envío y los pagos. Tu selección no es un pedido y no se realizará ningún cobro.</p></div>
      <div className="checkout-layout">
        <div className="checkout-form-panel">
          <div className="checkout-form-title"><span>01</span><div><h2>Así será la entrega</h2><p>Podés probar el formulario. Los datos se validan en tu navegador y no se envían ni se guardan.</p></div></div>
          <form ref={formRef} onSubmit={validate} noValidate className="checkout-customer-form">
            <div className="checkout-fields">
              {fields.map((field) => (
                <div className={`checkout-field${field.wide ? " checkout-field-wide" : ""}`} key={field.key}>
                  <label className="product-label" htmlFor={`customer-${field.key}`}>{field.label} <span aria-hidden="true">*</span></label>
                  <input id={`customer-${field.key}`} className="product-input" name={field.key} type={field.type ?? "text"} autoComplete={field.autoComplete} maxLength={field.maxLength} placeholder={field.placeholder} value={customer[field.key]} required aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `error-${field.key}` : undefined} onChange={(event) => { setCustomer({ ...customer, [field.key]: event.target.value }); setValidated(false); if (errors[field.key]) setErrors({ ...errors, [field.key]: undefined }); }} />
                  {errors[field.key] && <p id={`error-${field.key}`} className="checkout-field-error">{errors[field.key]}</p>}
                </div>
              ))}
              <div className="checkout-field"><label className="product-label" htmlFor="customer-country">País</label><input id="customer-country" className="product-input" value="Argentina" readOnly autoComplete="shipping country-name" /></div>
            </div>
            <p className="checkout-required">* Campos obligatorios para probar la validación.</p>
            {Object.values(errors).some(Boolean) && <p className="product-error" role="alert">Revisá los campos señalados para continuar con la prueba.</p>}
            <button className="button button-secondary checkout-validate" type="submit">Revisar mis datos <Check size={16} aria-hidden="true" /></button>
            {validated && <p role="status" className="checkout-validation-message"><Check size={18} aria-hidden="true" /> Los datos tienen el formato esperado. No fueron enviados ni se creó un pedido.</p>}
          </form>
          <div className="checkout-next-step"><span>02</span><div><h2>Después, los detalles de su historia</h2><p>Cuando la tienda esté habilitada, el pago se verificará antes de continuar. Luego vas a poder enviar las fotos de tu mascota por WhatsApp.</p><Link href="/como-funciona" className="text-link">Conocé el proceso completo <span aria-hidden="true">↗</span></Link></div></div>
        </div>
        <aside className="checkout-summary" aria-labelledby="summary-title">
          <div className="checkout-summary-top"><h2 id="summary-title">Tu idea, en miniatura</h2><Link href="/crear-mi-miniatura" aria-label="Editar personalización"><Pencil size={16} /></Link></div>
          <div className="checkout-summary-product"><div className="checkout-summary-image"><Image src={assetPath(draft.petType === "gato" ? "/assets/cat-miniature.webp" : "/assets/hero-miniature.webp")} alt={`Imagen demostrativa de una miniatura de ${draft.petType}, generada con IA`} fill sizes="90px" /></div><div><h3>{draft.petName}</h3><p>Miniatura personalizada · {draft.petType === "gato" ? "Gato" : "Perro"}</p><span>Tamaño de muestra · A definir</span><small>Cantidad: {draft.quantity}</small></div></div>
          {draft.notes && <div className="checkout-notes"><span>Eso que lo hace especial</span><p>{draft.notes}</p></div>}
          <dl className="checkout-totals"><div><dt>Miniatura{draft.quantity > 1 ? "s" : ""} ({draft.quantity})</dt><dd>A confirmar</dd></div><div><dt>Envío a Argentina</dt><dd>A confirmar</dd></div><div className="checkout-total"><dt>Total en ARS</dt><dd>A confirmar</dd></div></dl>
          <p className="checkout-price-note">Vas a conocer el precio final, incluido el envío, antes de confirmar cualquier compra.</p>
          <button className="button button-primary checkout-payment" type="button" disabled><LockKeyhole size={16} aria-hidden="true" /> Pagos aún no habilitados</button>
          <p className="checkout-production"><Clock3 size={16} aria-hidden="true" /><span>Producción estimada: {siteConfig.production.minDays} a {siteConfig.production.maxDays} días. El cómputo del plazo está pendiente de confirmación.</span></p>
          <button className="checkout-clear" type="button" onClick={clearDraft}>Borrar mi selección guardada</button>
          <p className="checkout-local-note">La selección se guarda solo en este navegador. No incluye datos de contacto ni dirección.</p>
        </aside>
      </div>
    </div>
  );
}
