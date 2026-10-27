"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, MessageCircle, Minus, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { emptyDraft, getDraftSnapshot, getServerDraftSnapshot, parseDraft, saveDraft, subscribeDraft } from "@/lib/draft";
import type { MiniatureDraft } from "@/types/commerce";
import { formatArs } from "@/lib/money";

export function ProductConfigurator() {
  const router = useRouter();
  const stored = useSyncExternalStore(subscribeDraft, getDraftSnapshot, getServerDraftSnapshot);
  const [editingDraft, setEditingDraft] = useState<MiniatureDraft | null>(null);
  const draft = editingDraft ?? parseDraft(stored) ?? emptyDraft;
  const selectedVariant = siteConfig.product.variants.find((variant) => variant.id === draft.variantId) ?? siteConfig.product.variants[0];
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(patch: Partial<MiniatureDraft>) {
    setEditingDraft({ ...draft, ...patch });
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!siteConfig.product.variants.some((variant) => variant.id === draft.variantId)) {
      setError("Volvé a seleccionar el tamaño de tu miniatura.");
      return;
    }
    if (!saveDraft(draft)) {
      setError("No pudimos guardar tu selección en este navegador. Permití el almacenamiento local e intentá de nuevo.");
      return;
    }
    setSaving(true);
    router.push("/checkout");
  }

  return (
    <>
      <div className="product-price" aria-live="polite" aria-atomic="true"><strong>{formatArs(selectedVariant.priceArs)}</strong><span>Por miniatura · Pesos argentinos</span></div>
      <div className="product-details-rule" />
      <form className="product-form" onSubmit={handleSubmit}>
        <fieldset className="product-choice-group" aria-describedby="product-size-help">
          <legend><span>Tamaño y postura</span></legend>
          <div className="product-size-options">
            {siteConfig.product.variants.map((variant) => (
              <label key={variant.id} className={`product-size-choice ${draft.variantId === variant.id ? "is-selected" : ""}`}>
                <input type="radio" name="variant" value={variant.id} checked={draft.variantId === variant.id} onChange={() => update({ variantId: variant.id })} />
                <span><strong>{variant.size} cm de alto</strong><small>{variant.pose ?? "Postura a coordinar"}</small></span>
                <span className="product-variant-price">{formatArs(variant.priceArs)}</span>
              </label>
            ))}
          </div>
          <p id="product-size-help" className="product-field-help">Las medidas corresponden a la altura de la figura. El envío se confirma por separado.</p>
        </fieldset>

        <div className="product-quantity-row">
          <label htmlFor="product-quantity">Cantidad</label>
          <div className="product-quantity">
            <button type="button" aria-label="Reducir cantidad" disabled={draft.quantity <= 1} onClick={() => update({ quantity: draft.quantity - 1 })}><Minus size={16} aria-hidden="true" /></button>
            <input id="product-quantity" name="quantity" type="number" min={1} max={5} step={1} value={draft.quantity} onChange={(event) => update({ quantity: Math.min(5, Math.max(1, Math.round(Number(event.target.value)) || 1)) })} />
            <button type="button" aria-label="Aumentar cantidad" disabled={draft.quantity >= 5} onClick={() => update({ quantity: draft.quantity + 1 })}><Plus size={16} aria-hidden="true" /></button>
          </div>
        </div>

        <p className="product-selection-total" aria-live="polite" aria-atomic="true"><span>Subtotal ({draft.quantity} {draft.quantity === 1 ? "miniatura" : "miniaturas"})</span><strong>{formatArs(selectedVariant.priceArs * draft.quantity)}</strong></p>

        {error && <p id="product-form-error" className="product-error" role="alert">{error}</p>}
        <button type="submit" className="button button-primary product-submit" disabled={saving}>{saving ? "Continuando…" : "Continuar con mi pedido"}<ArrowRight size={18} aria-hidden="true" /></button>
        <p className="product-preview-note">Vista previa: todavía no se crean pedidos ni se realizan cobros.</p>
        <div className="product-after-purchase">
          <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
          <div><h2>Las fotos, después de comprar.</h2><p>Una vez confirmado el pago, nos enviás por WhatsApp las fotos, el nombre y los detalles de tu mascota. Con eso empezamos a crear su miniatura.</p></div>
        </div>
      </form>
    </>
  );
}
