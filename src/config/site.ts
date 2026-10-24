/** Public, non-secret business configuration. Null means not yet confirmed. */
export const siteConfig = {
  name: "PATUMÍN",
  slogan: "Tu mascota, siempre cerca.",
  description: "Miniaturas personalizadas de mascotas, modeladas especialmente para vos y pintadas a mano en Argentina.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || null,
  locale: "es_AR",
  currency: "ARS",
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  },
  product: {
    id: "miniatura-personalizada",
    name: "Miniatura personalizada de tu mascota",
    variants: [{ id: "demo", title: "A definir", size: null, priceArs: null, active: false }],
    materials: null,
    baseOptions: [],
    includedRevisions: null,
  },
  production: { minDays: 15, maxDays: 30, dayType: null, startsAt: null },
  payments: { enabled: false, provider: "mercadopago" },
  shipping: { country: "AR", costArs: null, methods: [] },
  business: { legalName: null, taxId: null, address: null },
  demo: true,
} as const;

export const navigation = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/galeria", label: "Galería" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];
