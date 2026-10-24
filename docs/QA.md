# Verificación de la fase 1

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
