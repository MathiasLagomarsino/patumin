import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { productionEstimate } from "@/config/content";
import "@/app/information.css";

const policies = {
  privacidad: {
    title: "Política de privacidad",
    description: "Cómo vamos a cuidar los datos que compartís con PATUMÍN.",
    sections: [
      { title: "Datos durante esta etapa", text: "Esta versión guarda solo el tamaño seleccionado y la cantidad en el navegador del dispositivo. Los datos de contacto y entrega que pruebes en el checkout no se envían ni se guardan. Todavía no hay pedidos ni pagos operativos." },
      { title: "Información para una futura compra", text: "Antes de abrir la tienda se informará qué datos personales se solicitan, con qué finalidad, quién es el responsable, dónde se almacenan, durante cuánto tiempo se conservan y cómo ejercer los derechos que correspondan." },
      { title: "Fotografías de tu mascota", text: "El proceso previsto contempla recibir las fotografías por WhatsApp después de un pago verificado. Las condiciones de uso, conservación y eliminación de esas imágenes deberán informarse antes de recibirlas. Publicar una imagen en la galería requerirá la autorización correspondiente." },
      { title: "Servicios de terceros y contacto", text: "Se deben completar los proveedores efectivamente utilizados, las condiciones de tratamiento de datos y un canal de contacto válido. No se han incorporado herramientas de analítica publicitaria en esta primera versión." },
    ],
  },
  terminos: {
    title: "Términos y condiciones",
    description: "Información clara para que puedas conocer las condiciones de tu pedido.",
    sections: [
      { title: "Estado actual de la tienda", text: "PATUMÍN está en una etapa de presentación y preparación comercial. La personalización disponible sirve para explorar una idea; no constituye una compra, reserva o aceptación de un precio. Los pagos todavía no están habilitados." },
      { title: "Información del emprendimiento", text: "Antes de abrir la tienda se deben completar la identidad del proveedor, domicilio, datos fiscales y canales de atención, junto con toda información comercial exigible." },
      { title: "Producto y personalización", text: "La propuesta consiste en miniaturas personalizadas de perros y gatos, modeladas a partir de fotografías y con terminación artesanal. Deben confirmarse materiales, tamaños, precios, opciones de base, alcance de la personalización y condiciones de revisión del diseño." },
      { title: "Confirmación y pago", text: "La compra solo estará disponible cuando las condiciones comerciales estén completas y la integración de pagos haya sido configurada y probada. El precio total y el costo del envío deberán conocerse antes de confirmar. Visitar una página de confirmación no acredita por sí mismo un pago." },
    ],
  },
  envios: {
    title: "Política de envíos",
    description: "Cada miniatura merece un viaje cuidado hasta su nuevo hogar.",
    sections: [
      { title: "Destino", text: "La propuesta contempla envíos dentro de Argentina. La cobertura para cada domicilio se deberá confirmar antes de aceptar una compra." },
      { title: "Costo y modalidad", text: "El transportista, las modalidades disponibles y los costos están pendientes de definición. No se ofrece envío gratuito ni una tarifa estimada. El costo final deberá ser informado y aceptado antes del pago." },
      { title: "Producción y entrega", text: `${productionEstimate} Falta definir si son días hábiles o corridos y el momento de inicio. El tiempo de transporte es independiente y deberá informarse según el servicio contratado.` },
      { title: "Seguimiento e inconvenientes", text: "Antes del lanzamiento se deben completar el procedimiento de seguimiento, los canales de consulta y la forma de resolver incidencias de entrega. No se han definido condiciones adicionales sobre extravíos o daños de transporte." },
    ],
  },
  devoluciones: {
    title: "Cambios, cancelaciones y devoluciones",
    description: "Condiciones que vamos a comunicar con claridad antes de tu compra.",
    sections: [
      { title: "Una política todavía en preparación", text: "Las condiciones operativas para solicitar cambios, cancelaciones y devoluciones están pendientes de definición y revisión legal. No hay compras habilitadas en esta versión." },
      { title: "Piezas personalizadas y derechos", text: "El carácter personalizado de una pieza no debe interpretarse, por sí solo, como una exclusión de todos los derechos de la persona consumidora. El texto definitivo deberá revisarse conforme a la normativa argentina aplicable y a las circunstancias de cada caso." },
      { title: "Revisión del diseño", text: "Se deben definir la instancia de aprobación, los ajustes incluidos y cómo se gestionan las solicitudes durante las distintas etapas del trabajo, sin presentar esas condiciones como una renuncia a derechos aplicables." },
      { title: "Solicitudes y resolución", text: "Antes de vender se deben completar un canal de atención, la información necesaria para una solicitud, los plazos de respuesta y los procedimientos de resolución y reintegro que correspondan." },
    ],
  },
} as const;

type PolicySlug = keyof typeof policies;

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in policies)) return { title: "Página no encontrada" };
  const policy = policies[slug as PolicySlug];
  return { ...pageMetadata(policy.title, policy.description, `/politicas/${slug}`), robots: { index: false, follow: true } };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in policies)) notFound();
  const policy = policies[slug as PolicySlug];
  return (
    <div className="container info-page policy-page">
      <Link href="/" className="text-link policy-back"><ArrowLeft size={16} aria-hidden="true" /> Volver a PATUMÍN</Link>
      <header className="page-intro info-intro"><span className="eyebrow">INFORMACIÓN PARA TU TRANQUILIDAD</span><h1>{policy.title}</h1><p>{policy.description}</p></header>
      <aside className="policy-draft"><FileText size={22} aria-hidden="true" /><div><strong>Borrador para revisión legal. No es una política vigente.</strong><p>Este contenido organiza la información pendiente y debe completarse y aprobarse antes de habilitar compras.</p></div></aside>
      <div className="policy-sections">{policy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
      <nav className="policy-navigation" aria-label="Otras políticas">{Object.entries(policies).filter(([key]) => key !== slug).map(([key, item]) => <Link href={`/politicas/${key}`} key={key}>{item.title}<span aria-hidden="true">↗</span></Link>)}</nav>
    </div>
  );
}
