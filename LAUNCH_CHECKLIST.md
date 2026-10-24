# PATUMÍN · Checklist de lanzamiento

Esta entrega prioriza la Fase 1: identidad inicial y frontend navegable. Una compilación correcta no equivale a tener una tienda operativa. No habilitar pagos ni describir el flujo comercial como probado hasta completar y verificar las etapas siguientes.

## Estado de esta versión

- [x] Dirección visual inicial con paleta, tipografías y wordmark provisional.
- [x] Navegación, home, personalización, galería, proceso, FAQ y contacto.
- [x] Imágenes demostrativas identificadas, sin testimonios ni pedidos ficticios.
- [x] Páginas editables para los cuatro documentos comerciales, marcadas como borradores.
- [x] Configuración central para la información comercial pendiente.
- [x] Build de producción, TypeScript, lint y pruebas de la fase 1 aprobados; evidencia en `docs/QA.md`.
- [x] Revisión responsive y del recorrido de personalización de esta vista previa.
- [ ] Aceptación visual por parte de la marca.
- [ ] Tienda operativa y validada con sus proveedores reales.

## Producto y condiciones comerciales

- [ ] Confirmar el producto y las variantes vendibles: identificadores, tamaños y disponibilidad.
- [ ] Definir precios finales en ARS y tratamiento impositivo aplicable.
- [ ] Confirmar materiales, terminaciones, tolerancias y cuidados.
- [ ] Definir si se ofrece base personalizada, sus opciones y su precio.
- [ ] Definir cantidades permitidas y capacidad de producción real.
- [ ] Precisar qué incluye la personalización y qué referencias se requieren.
- [ ] Definir la instancia de revisión, ajustes incluidos y proceso de aprobación.
- [ ] Confirmar la estimación de 15–30 días, si son días hábiles o corridos y cuándo comienza el plazo.
- [ ] Completar las condiciones que requieren confirmación individual antes de aceptar el pedido.

## Marca, contenido y contacto

- [ ] Aprobar logo definitivo y variantes horizontal, apilada y monocromática.
- [ ] Reemplazar imágenes generadas por fotografías reales de prototipos o trabajos autorizados.
- [ ] Verificar que la galería distingue prototipos de productos entregados.
- [ ] Contar con permisos para fotografías de clientes y sus mascotas antes de publicarlas.
- [ ] Registrar y configurar el dominio y las URLs canónicas.
- [ ] Completar Instagram, email comercial y WhatsApp Business reales.
- [ ] Confirmar cobertura y horarios de atención antes de publicarlos.
- [ ] Revisar todos los textos con datos comerciales definitivos.

## Envíos

- [ ] Definir modalidades, transportistas y cobertura por domicilio.
- [ ] Implementar el cálculo o cotización de envío del lado del servidor.
- [ ] Mostrar costo y modalidad antes de confirmar y pagar.
- [ ] Diferenciar tiempos de producción y transporte.
- [ ] Definir preparación del paquete, protección de la pieza y seguimiento.
- [ ] Definir atención de incidentes de entrega sin promesas todavía no acordadas.

## Datos y operación — Fases 2 y 3

- [ ] Crear el proyecto de Supabase/PostgreSQL y administrar credenciales fuera del código.
- [ ] Revisar y ejecutar migraciones; configurar respaldos y verificar restauración.
- [ ] Implementar productos, variantes, pedidos, pagos y eventos del pedido.
- [ ] Mantener estados de pago, producción y envío separados.
- [ ] Implementar validación del servidor y cálculo de importes a partir del catálogo confiable.
- [ ] Evitar pedidos duplicados mediante claves de idempotencia y restricciones de base de datos.
- [ ] Definir una referencia pública y acceso seguro a la recuperación del pedido, sin exponer datos por enumeración.
- [ ] Proteger la administración con autenticación y autorización verificadas en servidor.
- [ ] Probar que un visitante no puede listar, editar ni leer pedidos ajenos.
- [ ] Permitir actualizar estados, observaciones y seguimiento con historial de cambios.
- [ ] Definir el flujo humano para confirmar la recepción de fotografías.
- [ ] Preparar notificaciones reales y configurar su proveedor, si son necesarias.
- [ ] Documentar la respuesta ante errores, respaldo y recuperación operativa.

## Mercado Pago — Fase 2

- [ ] Instalar e integrar el SDK oficial vigente con una cuenta comercial real.
- [ ] Configurar credenciales de prueba exclusivamente del lado del servidor.
- [ ] Crear preferencia a partir del pedido validado y persistido.
- [ ] No aceptar importes ni estados de pago enviados por el navegador como fuente de verdad.
- [ ] Verificar autenticidad de webhooks según la documentación oficial vigente.
- [ ] Consultar y contrastar estado, importe, moneda y referencia del pago en el proveedor.
- [ ] Implementar procesamiento idempotente de notificaciones repetidas o fuera de orden.
- [ ] Confirmar que visitar la URL de éxito nunca marca un pedido como pagado.
- [ ] Probar aprobados, pendientes, rechazados, cancelados, reintentos y errores de red.
- [ ] Registrar referencias del proveedor sin volcar secretos ni datos sensibles en logs.
- [ ] Mantener producción deshabilitada hasta completar las condiciones comerciales y legales.
- [ ] Configurar credenciales de producción y URLs HTTPS definitivas.
- [ ] Hacer una prueba real controlada y comprobar el pedido, pago y resolución correspondiente.

## WhatsApp y continuidad del pedido

- [ ] Verificar el número oficial en formato internacional para `wa.me`.
- [ ] Generar el mensaje con la referencia de pedido y el nombre de mascota correctos.
- [ ] Ofrecer “Enviar fotos por WhatsApp” solamente tras comprobar el pago en servidor.
- [ ] No tratar abrir el enlace como confirmación de envío o recepción de fotografías.
- [ ] Mantener “Esperando fotografías” hasta que el equipo confirme recepción.
- [ ] Probar recuperación segura de la acción si el cliente cierra la confirmación.

## Información comercial y revisión legal

- [ ] Completar titular, datos fiscales/comerciales, domicilio y canales de contacto.
- [ ] Revisar términos y condiciones conforme a la operatoria y normativa argentina aplicable.
- [ ] Revisar privacidad: responsable, finalidades, proveedores, retención, derechos y canales.
- [ ] Revisar política de envíos con datos operativos confirmados.
- [ ] Revisar cambios, cancelaciones y devoluciones; no suponer que personalizar elimina todos los derechos.
- [ ] Definir tratamiento y permisos de uso de las fotografías recibidas.
- [ ] Retirar las marcas de borrador solo después de aprobar los textos definitivos.

## Verificación técnica — Fase 4

- [ ] Ejecutar `npm run typecheck`, `npm run lint`, `npm test` y `npm run build` en el commit candidato a lanzamiento.
- [ ] Confirmar navegación, filtros, ampliación de imágenes, acordeones y formularios.
- [ ] Revisar anchos de 360, 390, 768, 1024 y 1440 px, además de tamaños intermedios.
- [ ] Probar teclado, foco visible, Escape, lector de pantalla y mensajes de validación.
- [ ] Revisar contraste de todos los estados y opciones de movimiento reducido.
- [ ] Comprobar textos alternativos, orden de encabezados y landmarks semánticos.
- [ ] Medir rendimiento con las fotografías reales y una conexión móvil representativa.
- [ ] Revisar tamaños de imagen, carga diferida, prioridad del hero y estabilidad visual.
- [ ] Configurar metadata, canonical, Open Graph, sitemap y robots con el dominio definitivo.
- [ ] Añadir datos estructurados de producto únicamente con oferta e información reales.
- [ ] Revisar dependencias y ejecutar análisis de vulnerabilidades antes de publicar.
- [ ] Revisar límites de solicitudes, validaciones, autorización y exposición de datos.
- [ ] Confirmar que los secretos no están en Git, el bundle cliente, URLs o logs.
- [ ] Probar errores, estados vacíos, pérdida de conexión y recuperación del pedido.
- [ ] Verificar despliegue en Vercel, variables separadas por entorno y estrategia de reversión.
- [ ] Observar el primer flujo real completo hasta recepción de fotos y preparación de la pieza.

## Evidencia de aprobación

Registrar la fecha, responsable, entorno y resultado de las pruebas de pago y seguridad. Mantener separados los checks técnicos de esta entrega y las validaciones comerciales que solo pueden realizarse al configurar los servicios y datos reales.
