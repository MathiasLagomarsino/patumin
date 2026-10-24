import type { CustomerDetails, CustomerErrors, MiniatureDraft } from "@/types/commerce";

export const DRAFT_STORAGE_KEY = "patumin:miniature-draft:v1";
export const DRAFT_CHANGE_EVENT = "patumin:draft-changed";

export const emptyDraft: MiniatureDraft = {
  version: 1,
  variantId: "demo",
  petType: "perro",
  petName: "",
  quantity: 1,
  notes: "",
};

/** Treat browser storage as untrusted input. Invalid or stale drafts are discarded. */
export function parseDraft(raw: string | null): MiniatureDraft | null {
  if (!raw || raw.length > 4000) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const draft = value as Record<string, unknown>;
    if (
      draft.version !== 1 ||
      typeof draft.variantId !== "string" ||
      !/^[a-zA-Z0-9_-]{1,80}$/.test(draft.variantId) ||
      (draft.petType !== "perro" && draft.petType !== "gato") ||
      typeof draft.petName !== "string" ||
      draft.petName.trim().length === 0 ||
      draft.petName.length > 60 ||
      typeof draft.quantity !== "number" ||
      !Number.isInteger(draft.quantity) ||
      draft.quantity < 1 ||
      draft.quantity > 5 ||
      typeof draft.notes !== "string" ||
      draft.notes.length > 500
    ) return null;
    return {
      version: 1,
      variantId: draft.variantId,
      petType: draft.petType,
      petName: draft.petName.trim(),
      quantity: draft.quantity,
      notes: draft.notes.trim(),
    };
  } catch {
    return null;
  }
}

export function getDraftSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(DRAFT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getServerDraftSnapshot(): null {
  return null;
}

export function subscribeDraft(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(DRAFT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DRAFT_CHANGE_EVENT, callback);
  };
}

/** Only customization is saved. Customer contact and address never go into storage. */
export function saveDraft(draft: MiniatureDraft): boolean {
  const normalized = parseDraft(JSON.stringify(draft));
  if (!normalized) return false;
  try {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event(DRAFT_CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    window.dispatchEvent(new Event(DRAFT_CHANGE_EVENT));
  } catch {
    // Storage can be disabled by the browser; there is no server copy to remove.
  }
}

export function validateCustomer(customer: CustomerDetails): CustomerErrors {
  const errors: CustomerErrors = {};
  if (customer.name.trim().length < 2 || customer.name.length > 100) errors.name = "Ingresá tu nombre y apellido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim()) || customer.email.length > 254) errors.email = "Ingresá un email válido.";
  const phoneDigits = customer.phone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15) errors.phone = "Ingresá un teléfono válido, con código de área.";
  if (customer.street.trim().length < 3 || customer.street.length > 160) errors.street = "Ingresá la calle y el número.";
  if (customer.city.trim().length < 2 || customer.city.length > 100) errors.city = "Ingresá tu localidad.";
  if (customer.province.trim().length < 2 || customer.province.length > 100) errors.province = "Ingresá tu provincia.";
  if (!/^(?:\d{4}|[A-Za-z]\d{4}[A-Za-z]{3})$/.test(customer.postalCode.trim())) errors.postalCode = "Ingresá un código postal argentino: 4 números o CPA completo.";
  return errors;
}
