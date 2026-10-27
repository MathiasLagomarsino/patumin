# Verificación de la fase 1

## Simplificación del pedido — 27 de octubre de 2026

El producto pide únicamente tamaño y cantidad y lleva directamente al checkout. Se retiraron tipo, nombre y observaciones de mascota del formulario y del borrador. Contacto, entrega y resumen comparten una pantalla sin la acción intermedia “Revisar mis datos”. Fotos, nombre y detalles se coordinan por WhatsApp después del pago confirmado, cuando se habiliten las compras.

- Lint, build con prefijo `/patumin`, siete pruebas unitarias y validación de las 16 páginas exportadas: aprobados.
- Navegador sobre la exportación local: continuar sin datos de mascota, cantidad 2 conservada en el resumen y al editar, límite de 5 y botón de incremento deshabilitado al alcanzarlo.
- Checkout sin desbordes horizontales a 360, 390, 768, 1024 y 1440 px; revisión visual de producto en escritorio y móvil y checkout en escritorio.
- Consola sin errores ni advertencias en el recorrido comprobado. Pago deshabilitado con aviso visible; no se probó ninguna transacción.
- Las pruebas verifican compatibilidad con borradores anteriores, descarte de datos de mascota y rechazo de cantidades o variantes malformadas.

Las comprobaciones del personalizador y de la validación local descritas en la revisión inicial más abajo corresponden al flujo anterior y quedan reemplazadas por este recorrido.

## Corrección de GitHub Pages — 27 de octubre de 2026

Se reprodujo el fallo del job `122381702365`, commit `c391dd3e519a576e39ac6dc92afc5c92c575b935`: `next build` detenía la exportación porque `/pedido/[reference]` no tenía `generateStaticParams`.

- Se genera únicamente `/pedido/consulta`, una página informativa sin datos de pedidos. Las referencias desconocidas no se exportan.
- Se retiró el workflow de Jekyll; Next.js es el único publicador de Pages.
- Imágenes, iconos, URLs canónicas y sitemap respetan el subdirectorio de publicación.
- El workflow obtiene dominio y prefijo de la acción oficial de Pages y valida el artefacto antes de cargarlo.
- Build reproducido con `NEXT_PUBLIC_BASE_PATH=/patumin` y `NEXT_PUBLIC_SITE_URL=https://MathiasLagomarsino.github.io/patumin`: aprobado.
- `npm run test:export`: 16 páginas y sus archivos locales validados.
- Lint, TypeScript y seis pruebas unitarias aprobados. YAML del workflow parseado correctamente.

Esto valida la corrección local; el resultado del próximo job de GitHub Actions solo se podrá confirmar después de subir los cambios. Pages sigue siendo una vista previa estática y no ejecuta el endpoint de checkout ni procesa pagos.

## Revisión de identidad — 25 de octubre de 2026

Paleta actualizada a beige, gris y púrpura. Logo reemplazado por una patita vectorial con sonrisa, variantes exportables y favicon sincronizados. El saludo de la marca dura 560 ms y está desactivado con `prefers-reduced-motion`.

- Lint y TypeScript: aprobados.
- Contrastes calculados: CTA 7,18:1; texto secundario sobre beige 5,29:1; púrpura sobre lila claro 5,87:1.
- Todas las referencias a variables CSS de color resuelven correctamente.
- Home y producto sin desbordamiento horizontal a 360, 390, 768, 1024 y 1440 px.
- Selección de mascota verificada con fondo lila y borde púrpura. Consola sin errores en el recorrido revisado.
- Build: compila los componentes y supera TypeScript, pero la exportación se detiene por la configuración preexistente `output: "export"` y la ruta dinámica `/pedido/[reference]` sin `generateStaticParams`. La configuración de publicación quedó fuera de este cambio visual.
- Capturas: `screenshots/home-purple-desktop.png`, `screenshots/home-purple-mobile.png`, `screenshots/product-purple-desktop.png` y `screenshots/paw-logo.png`.

La evidencia de la entrega inicial se conserva a continuación.

Fecha: 24 de octubre de 2026. Entorno: Windows, Node 24, compilación de producción de Next.js 16.4.3.

## Comprobaciones automatizadas

- `npm run lint`: sin errores ni advertencias.
- `npm run typecheck`: sin errores.
- `npm test`: cuatro pruebas aprobadas, incluyendo múltiples casos de datos corruptos, cantidades manipuladas, campos desconocidos y validación de datos de contacto/CPA.
- `npm run build`: generación correcta de las 18 páginas estáticas; rutas dinámicas de consulta y API disponibles. La compilación requirió ejecución fuera del sandbox por una restricción de Windows al resolver la ruta del proyecto.
- `npm audit`: cero vulnerabilidades reportadas después de actualizar Next.js a 16.4.3. Esto no equivale a una auditoría integral de seguridad.
- `npm run test:routes`, con el servidor iniciado: 13 rutas respondieron HTTP 200; rutas inexistentes HTTP 404; headers básicos presentes; `noindex` en la vista previa; API de checkout HTTP 503 aun cuando recibe un precio y un estado de pago manipulados; robots bloquea la indexación.

## Comprobaciones en navegador

Se usó el navegador integrado de Codex contra la compilación local en `127.0.0.1:3000`.

| Página | 360 | 390 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- | --- |
| Home | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |
| Producto | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |
| Galería | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |
| Cómo funciona | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |
| Preguntas frecuentes | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |
| Contacto | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |
| Checkout con borrador | Sin overflow | Sin overflow | Sin overflow | Sin overflow | Sin overflow |

El ancho del documento se verificó contra el viewport real. La revisión visual incluyó la home de escritorio y móvil, el personalizador y la ampliación de galería.

Recorridos comprobados:

- Menú móvil abre, navega y se cierra al cambiar de página.
- Filtro “Gatos” muestra un único concepto y actualiza el contador accesible.
- Ampliación de imagen abre un diálogo modal con control de cierre; Escape lo cierra y devuelve el foco al botón de origen.
- Nombre obligatorio de mascota: el envío vacío queda bloqueado y el foco vuelve al campo.
- Selección de gato, nombre de prueba, observaciones y cantidad 2: el resumen conserva esos datos.
- Recarga del checkout: conserva la personalización, elimina los datos de entrega que se habían escrito y mantiene los pagos deshabilitados.
- Formulario de entrega vacío: siete errores, foco en el primer campo inválido.
- Formulario con datos ficticios válidos: muestra una validación local que aclara que no hubo envío ni creación de pedido.
- Consola del navegador sin errores en los recorridos inspeccionados.
- Acordeón de plazos: abre y muestra la respuesta completa.
- Borrar selección: restaura el estado vacío del checkout.

Capturas guardadas: [home de escritorio](screenshots/home-desktop.png) y [home móvil](screenshots/home-mobile.png). Las imágenes de producto que aparecen en ellas son conceptos generados con IA.

## Límites

No hay backend comercial, base de datos, pagos ni WhatsApp poscompra configurados. No se ejecutaron pruebas de transacciones, webhooks, estados de producción o administración. No se realizó una auditoría completa con lector de pantalla, Lighthouse, dispositivos físicos ni mediciones de Core Web Vitals con tráfico real. Las páginas legales requieren revisión profesional antes del lanzamiento.

La prueba del formulario usa datos ficticios y no envía información a terceros. Los borradores de prueba se eliminan al terminar la revisión.
