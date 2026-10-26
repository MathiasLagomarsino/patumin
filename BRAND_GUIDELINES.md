# PATUMÍN · Guía de identidad inicial

Versión de trabajo para la primera etapa visual. El wordmark es provisional y las imágenes generadas son demostraciones, no evidencia de piezas entregadas.

Las variantes SVG están en `public/brand/patumin-horizontal.svg`, `patumin-stacked.svg` y `patumin-monochrome.svg`. Mantienen texto editable con DM Serif Display y DM Sans; requieren esas fuentes para reproducir la tipografía exacta. Antes de uso en imprenta, convertir los textos a curvas y validar la marca definitiva. El isotipo de la web y el favicon comparten la misma patita, disponible también en `public/brand/patumin-mark.svg`. Para sincronizar los SVG con el componente de marca, ejecutar `node scripts/export-brand.mjs`.

## Idea de marca

PATUMÍN crea una versión chiquita de un amor enorme: miniaturas de perros y gatos que conservan los rasgos de un compañero particular, con modelado personalizado y terminación artesanal.

- **Nombre:** PATUMÍN. Conservar siempre la tilde en la Í, también en mayúsculas.
- **Descriptor:** Miniaturas personalizadas de mascotas.
- **Slogan principal:** Tu mascota, siempre cerca.
- **Slogan secundario:** Una versión chiquita de un amor enorme.
- **Personalidad:** cálida, cercana, cuidada, contemporánea y sensible.
- **Posicionamiento:** boutique artesanal premium; la atención a los detalles sostiene el valor.

La identidad debe comunicar afecto y calidad sin infantilizar el producto ni depender de estereotipos de género. Mostrar al animal y a su representación es más importante que decorar con huellas o corazones.

## Color

Paleta actualizada el 25 de octubre de 2026: beige cálido, grises cálidos y púrpura ciruela.

| Nombre | Valor | Uso |
| --- | --- | --- |
| Beige claro | `#F3EDE3` | Fondo principal |
| Blanco cálido | `#FFFCF7` | Tarjetas y superficies |
| Beige arena | `#E8DECF` | Bloques artesanales y fondos de imagen |
| Beige suave | `#F0E8DD` | Footer y superficies secundarias |
| Gris suave | `#E7E3E0` | Beneficios y superficies neutras |
| Grafito cálido | `#3E3A40` | Títulos y texto principal |
| Gris cálido | `#665F69` | Texto secundario |
| Púrpura ciruela | `#684A7C` | Botones, iconos y acentos |
| Púrpura profundo | `#50365F` | Hover de acciones principales |
| Lila niebla | `#EBE3F0` | Selección, comparación y avisos |
| Lila empolvado | `#D8C7E2` | CTA final y acentos decorativos |

Predominan beige y grises; el púrpura organiza las acciones y los momentos destacados. Usar los lilas como superficies con texto oscuro. No colocar texto pastel sobre fondos claros. El botón principal tiene contraste aproximado de 7,18:1 sobre blanco cálido; el texto secundario, 5,29:1 sobre beige.

Los tokens y su correspondencia con Tailwind se mantienen en `src/app/globals.css`. Todas las páginas consumen la misma paleta.

## Tipografía

- **DM Serif Display:** títulos, frases editoriales y wordmark provisional. Peso regular. La expresividad está en la forma de la letra, no en agregar negrita.
- **DM Sans:** navegación, párrafos, formularios, botones, etiquetas y notas.
- Las fuentes se sirven desde dependencias locales; no requieren una solicitud del navegador a Google Fonts.

Escala orientativa: hero 64–76 px en escritorio, secciones 40–52 px, subtítulos 24–32 px, cuerpo 16–18 px, etiquetas 13–14 px. En móvil, reducir la escala con `clamp()` y conservar interlineado cómodo. Evitar líneas excesivamente largas: la mayoría de los bloques de lectura funcionan entre 45 y 75 caracteres por línea.

Los encabezados son frases naturales, preferentemente en minúsculas después de la primera letra. Las etiquetas de sección pueden usar mayúsculas y un espaciado leve.

## Logo y variantes

La identidad inicial utiliza un wordmark tipográfico legible y una patita propia de formas suaves, almohadillas asimétricas y una sonrisa discreta calada en la almohadilla central. Es una base de implementación, pendiente de validación y refinamiento final.

- **Horizontal:** símbolo junto al nombre; uso principal en navegación y packaging ancho.
- **Apilada:** símbolo sobre el nombre; apropiada para perfiles, tarjetas y etiquetas cuadradas.
- **Monocromática:** una sola tinta grafito sobre claro; el favicon usa blanco cálido sobre púrpura.
- **Área de respeto:** conservar alrededor al menos la altura de una letra del descriptor.
- **Reducción:** si el descriptor pierde legibilidad, retirarlo. No convertirlo en texto ilegible para mantener la composición.

No estirar, agregar sombras duras, usar degradados, quitar la tilde o reemplazar la marca por un emoji. Los SVG definitivos deben mantener la misma capacidad de funcionar en una sola tinta. Revisar impresión y legibilidad física antes de producir packaging.

## Composición y espaciado

- Base de espaciado de 4 px, con pasos frecuentes de 8, 12, 16, 24, 32, 48, 64 y 96 px.
- Contenedor centrado y margen lateral cómodo; más espacio entre secciones que entre elementos de una misma idea.
- Alternar composición editorial, retículas fotográficas, proceso numerado y bloques de lectura. Evitar convertir toda la página en tarjetas iguales.
- Radios habituales de 12–20 px. Reservar la forma de píldora para botones secundarios, filtros y etiquetas pequeñas.
- Bordes cálidos y finos. Sombras escasas y suaves.
- La fotografía ocupa el espacio principal; los adornos deben acompañar la lectura.

## Componentes e interacción

- **Botón principal:** púrpura ciruela y texto claro. Un propósito claro por bloque: “Crear mi miniatura”, “Empezar mi pedido”.
- **Botón secundario:** contorno o superficie discreta. Nunca competir visualmente con el principal.
- **Enlace editorial:** texto breve con flecha, área de interacción suficiente y subrayado o feedback reconocible.
- **Galería:** imágenes grandes, identificación de cada concepto y controles de filtro reales. La ampliación debe cerrarse con Escape y devolver el foco al control original.
- **FAQ:** acordeones nativos con `details` y `summary`; preguntas visibles, respuestas breves y concretas.
- **Formularios:** labels persistentes, instrucciones cerca del campo y mensajes de error específicos. No usar solamente placeholder como etiqueta.
- **Estados vacíos:** explicar lo que falta y el siguiente paso posible. Nunca simular que un pago, mensaje o pedido se completó.
- **Foco:** visible para navegación por teclado. El color no debe ser el único indicador de selección o error.
- **Movimiento:** transiciones breves de 150–300 ms, sin animaciones permanentes. La patita hace un saludo breve al pasar el cursor o enfocar la marca con teclado; respetar `prefers-reduced-motion`.

## Fotografía y demostraciones

La dirección busca iluminación suave, superficies beige, gris cálido o lila, sombras naturales, texturas reales y encuadres que permitan apreciar pelaje, marcas y expresión. Las figuras deben sentirse cuidadas y reconocibles, sin caricatura exagerada.

Las imágenes actuales son conceptos generados con IA. Deben llevar una identificación visible como “Concepto · IA” o “Imagen de concepto generada con IA”. Su texto alternativo también debe describir su carácter demostrativo. No llamarlas trabajos reales, resultados de clientes, pedidos entregados ni testimonios.

Los prompts y la procedencia de los assets se registran en `docs/ASSET_PROMPTS.md`. Antes del lanzamiento, reemplazar las demostraciones por fotografías propias y autorizadas. Para comparaciones de foto y miniatura, usar referencias de la misma mascota y mostrar el alcance real del producto.

No publicar fotografías identificables de personas, sus hogares, datos de pedido ni imágenes facilitadas por clientes sin la autorización necesaria.

## Tono de comunicación

Español argentino con voseo, frases simples y cercanía tranquila. Hablar de su mirada, sus colores y sus detalles concretos. El foco es celebrar a un compañero, no crear miedo a perderlo.

| Usar | Evitar |
| --- | --- |
| “La modelamos especialmente para vos.” | “Una réplica perfecta garantizada.” |
| “Sus detalles. Su personalidad. Su versión mini.” | “El mejor regalo del mercado.” |
| “Estamos preparando la apertura de pedidos.” | Un botón de compra que simula un pago exitoso |
| “Producción estimada de 15 a 30 días, sujeta a confirmación.” | Plazos de entrega, transportistas o gratuidad no confirmados |
| “Una pieza para conservar un poquito de su historia.” | Mensajes alarmistas o presión emocional |

No inventar nombres de clientes, reseñas, calificaciones, descuentos, certificaciones, estadísticas, stock escaso o urgencia. Los datos comerciales pendientes se completan desde la configuración central, sin rellenarlos con información ficticia.

## Antes de ampliar la identidad

Validar el logo definitivo, fotografiar prototipos reales, definir tamaños y materiales, revisar contraste en componentes nuevos y comprobar la aplicación en móvil, packaging y una sola tinta. Mantener esta guía actualizada cuando se aprueben esas decisiones.
