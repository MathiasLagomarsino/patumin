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
    // Heights and poses follow Pirucho's public catalog; see docs/PRICING.md.
    variants: [
      { id: "10cm-sentado", title: "10 cm · Sentado", size: 10, pose: "Sentado", priceArs: 60000, active: true },
      { id: "10cm-parado", title: "10 cm · Parado", size: 10, pose: "Parado", priceArs: 62000, active: true },
      { id: "16cm-sentado", title: "16 cm · Sentado", size: 16, pose: "Sentado", priceArs: 81000, active: true },
      { id: "16cm-parado", title: "16 cm · Parado", size: 16, pose: "Parado", priceArs: 104000, active: true },
      { id: "20cm", title: "20 cm de alto", size: 20, pose: null, priceArs: 162000, active: true },
    ],
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
