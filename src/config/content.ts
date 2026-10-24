import { siteConfig } from "@/config/site";

export const productionEstimate = `Cada miniatura se realiza especialmente para vos. El proceso de producción tiene una duración estimada de ${siteConfig.production.minDays} a ${siteConfig.production.maxDays} días, sujeta a confirmación operativa.`;

export const processSteps = [
  {
    title: "Elegís tu miniatura.",
    description:
      "Seleccionás las opciones disponibles y realizás tu pedido. Antes de confirmar, vas a conocer el precio y el costo del envío.",
  },
  {
    title: "Nos compartís sus fotos.",
    description:
      "Después de comprar, enviás las fotografías por WhatsApp. Una mirada, sus manchitas, su postura: cada referencia nos ayuda a conocerlo.",
  },
  {
    title: "La modelamos especialmente para vos.",
    description:
      "Trabajamos sus rasgos y preparamos el diseño. Los detalles de la instancia de revisión se informarán antes de la compra.",
  },
  {
    title: "La creamos y pintamos a mano.",
    description:
      "Después de la revisión correspondiente, imprimimos y terminamos la pieza. Sus colores y marcas toman forma, detalle a detalle.",
  },
  {
    title: "La recibís en casa.",
    description:
      "Preparamos tu pedido y lo enviamos con cuidado. Coordinamos la entrega dentro de Argentina, con condiciones informadas antes de comprar.",
  },
] as const;

export const faqs = [
  {
    question: "¿Cómo puedo pedir una miniatura?",
    answer:
      "Desde “Crear mi miniatura” podés explorar la personalización. Estamos preparando la apertura de pedidos: los tamaños, precios y medios de pago se publicarán cuando estén confirmados. Por ahora podés guardar tu idea en este dispositivo, sin realizar una compra.",
  },
  {
    question: "¿Qué fotografías necesitan?",
    answer:
      "Nos ayudan las fotos nítidas, con buena luz, que permitan ver su cara, ambos perfiles, cuerpo y marcas particulares. No hace falta una sesión profesional. Una vez habilitados los pedidos, vamos a recibirlas por WhatsApp y revisar juntos las referencias disponibles.",
  },
  {
    question: "¿Qué tipos de mascotas hacen?",
    answer:
      "La propuesta inicial de PATUMÍN está pensada para perros y gatos. Cada pieza se modela a partir de sus fotografías para conservar sus rasgos, con una estética semirrealista y una terminación artesanal.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso?",
    answer:
      `${productionEstimate} Antes de habilitar las compras vamos a precisar si son días hábiles o corridos y desde qué momento se cuentan. El plazo de envío se informa por separado.`,
  },
  {
    question: "¿Puedo pedir una figura de una mascota que ya falleció?",
    answer:
      "Sí, la propuesta también está pensada para homenajear a un compañero que vive en tus recuerdos. Vamos a mirar con vos las fotografías que conservás para evaluar las referencias, con todo el cuidado que esa historia merece.",
  },
  {
    question: "¿Puedo ver el modelo antes de que lo impriman?",
    answer:
      "El proceso contempla una instancia de revisión del diseño antes de la impresión. La modalidad y la cantidad de ajustes incluidos todavía deben definirse y se comunicarán antes de confirmar una compra.",
  },
  {
    question: "¿Realizan envíos a todo el país?",
    answer:
      "La propuesta incluye envíos dentro de Argentina. La disponibilidad para tu domicilio, el costo y la modalidad deberán estar confirmados antes de pagar. Todavía no hay transportistas ni plazos de entrega definidos.",
  },
  {
    question: "¿Cómo puedo cuidar mi miniatura?",
    answer:
      "Pensala como una pieza de exhibición: manipulala con cuidado y evitá golpes o caídas. Las indicaciones específicas de limpieza y conservación se informarán cuando estén confirmados los materiales y la terminación.",
  },
] as const;
