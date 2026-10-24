"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, Cat, Check, Dog, Minus, Plus, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { emptyDraft, getDraftSnapshot, getServerDraftSnapshot, parseDraft, saveDraft, subscribeDraft } from "@/lib/draft";
import type { MiniatureDraft } from "@/types/commerce";

export function ProductConfigurator() {
  const router = useRouter();
  const stored = useSyncExternalStore(subscribeDraft, getDraftSnapshot, getServerDraftSnapshot);
  const [editingDraft, setEditingDraft] = useState<MiniatureDraft | null>(null);
  const draft = editingDraft ?? parseDraft(stored) ?? emptyDraft;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(patch: Partial<MiniatureDraft>) {
    setEditingDraft({ ...draft, ...patch });
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.petName.trim()) {
      setError("Contanos cómo se llama tu mascota.");
      document.getElementById("pet-name")?.focus();
      return;
    }
    if (!siteConfig.product.variants.some((variant) => variant.id === draft.variantId)) {
      setError("Volvé a seleccionar el tamaño de muestra.");
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
    <form className="product-form" onSubmit={handleSubmit}>
      <fieldset className="product-choice-group">
        <legend>01 <span>¿Quién es tu compañero?</span></legend>
        <div className="product-pet-options">
          {([{ value: "perro", label: "Un perro", Icon: Dog }, { value: "gato", label: "Un gato", Icon: Cat }] as const).map(({ value, label, Icon }) => (
            <label key={value} className={`product-pet-choice ${draft.petType === value ? "is-selected" : ""}`}>
              <input type="radio" name="pet-type" value={value} checked={draft.petType === value} onChange={() => update({ petType: value })} />
              <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              <span>{label}</span>
              {draft.petType === value && <Check size={16} aria-hidden="true" />}
            </label>
          ))}
        </div>
        <label className="product-label" htmlFor="pet-name">Su nombre <span>(obligatorio)</span></label>
        <input id="pet-name" name="petName" className="product-input" value={draft.petName} onChange={(event) => update({ petName: event.target.value })} placeholder="Ese nombre que tanto te gusta decir" autoComplete="off" maxLength={60} required aria-invalid={error === "Contanos cómo se llama tu mascota."} aria-describedby={error ? "product-form-error" : undefined} />
      </fieldset>

      <fieldset className="product-choice-group">
        <legend>02 <span>El formato de su versión mini</span></legend>
        <div className="product-size-options">
          {siteConfig.product.variants.map((variant) => (
            <label key={variant.id} className={`product-size-choice ${draft.variantId === variant.id ? "is-selected" : ""}`}>
              <input type="radio" name="variant" value={variant.id} checked={draft.variantId === variant.id} onChange={() => update({ variantId: variant.id })} />
              <span><strong>Tamaño de muestra</strong><small>Medidas a definir</small></span>
              <span className="product-sample-label">Vista previa</span>
            </label>
          ))}
        </div>
        <p className="product-field-help">Estamos preparando los tamaños y precios definitivos. Esta selección es ilustrativa.</p>
      </fieldset>

      <fieldset className="product-choice-group">
        <legend>03 <span>Esos detalles que lo hacen único</span></legend>
        <label className="product-label" htmlFor="pet-notes">¿Algo que quieras contarnos? <span>(opcional)</span></label>
        <textarea id="pet-notes" className="product-input product-textarea" name="notes" maxLength={500} rows={3} value={draft.notes} onChange={(event) => update({ notes: event.target.value })} placeholder="Su manchita, su forma de sentarse, esa expresión tan suya…" aria-describedby="notes-help" />
        <div className="product-note-count"><span id="notes-help">Solo detalles de tu mascota; evitá datos personales.</span><span>{draft.notes.length}/500</span></div>
        <div className="product-quantity-row">
          <label htmlFor="product-quantity">Cantidad de miniaturas</label>
          <div className="product-quantity">
            <button type="button" aria-label="Reducir cantidad" disabled={draft.quantity <= 1} onClick={() => update({ quantity: draft.quantity - 1 })}><Minus size={16} /></button>
            <input id="product-quantity" type="number" min={1} max={5} step={1} value={draft.quantity} onChange={(event) => update({ quantity: Math.min(5, Math.max(1, Math.round(Number(event.target.value)) || 1)) })} aria-label="Cantidad de miniaturas" />
            <button type="button" aria-label="Aumentar cantidad" disabled={draft.quantity >= 5} onClick={() => update({ quantity: draft.quantity + 1 })}><Plus size={16} /></button>
          </div>
        </div>
        <p className="product-field-help">La cantidad se aplica a la misma mascota.</p>
      </fieldset>

      {error && <p id="product-form-error" className="product-error" role="alert">{error}</p>}
      <button type="submit" className="button button-primary product-submit" disabled={saving}>{saving ? "Guardando tu selección…" : "Revisar mi miniatura"}<ArrowRight size={18} aria-hidden="true" /></button>
      <p className="product-preview-note"><Sparkles size={14} aria-hidden="true" /> Podés explorar y guardar tu idea. Todavía no se crean pedidos ni se realizan cobros.</p>
    </form>
  );
}
