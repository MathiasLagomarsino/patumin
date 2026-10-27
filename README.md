# PATUMÍN

Una versión chiquita de un amor enorme. Tienda boutique de miniaturas personalizadas de mascotas para Argentina.

## Estado del proyecto

**Fase 1 implementada: identidad inicial y frontend navegable.** La web incluye home completa, personalizador, galería filtrable y ampliable, proceso, preguntas frecuentes, contacto y borradores de políticas. El checkout es una vista previa: permite revisar la personalización y validar un formulario local, pero no crea pedidos ni procesa pagos.

Las cinco fotografías son conceptos generados con IA, identificados en pantalla. No son pruebas de trabajos entregados. No se inventaron precios, medidas, contactos, testimonios ni información fiscal.

| Funcionalidad | Estado |
| --- | --- |
| Identidad, home y páginas informativas | Implementadas |
| Galería con filtros, zoom y navegación por teclado | Implementada |
| Personalización de mascota, cantidad y observaciones | Implementada |
| Recuperación de la selección en el mismo navegador | Implementada con `localStorage` |
| Validación local del formulario de entrega | Implementada; datos personales solo en memoria |
| Precios, variantes y costos de envío | Pendientes de definición comercial |
| Creación y persistencia de pedidos | Fase 2; no implementadas |
| Mercado Pago y webhooks | Fase 2; no configurados ni probados |
| Confirmación verificada y WhatsApp poscompra | Fase 2; no implementados |
| Base de datos y gestión administrativa | Fases 2–3; no implementadas |
| Publicación | Exportación estática para GitHub Pages; backend comercial pendiente |

## Stack

Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind CSS 4, Lucide y fuentes DM Sans / DM Serif Display alojadas en la aplicación mediante Fontsource. `package-lock.json` fija las versiones instaladas. Los componentes de servidor son la opción predeterminada; solo navegación, galería y formularios necesitan JavaScript de cliente.

Referencias utilizadas: [instalación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation) e [integración de Tailwind con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Desarrollo local

Requiere Node.js 22.18 o superior (recomendado 24 LTS) y npm actualizado.

```sh
npm ci
npm run dev
```

Abrí [http://127.0.0.1:3000](http://127.0.0.1:3000). Para comprobar la exportación estática:

```sh
npm run build
npm run test:export
```

El servidor local escucha en loopback. No se expone automáticamente a otros dispositivos.

La configuración actual usa `output: "export"` y genera `out/`. `next start` requiere un servidor Next.js y no sirve esta exportación: usá `npm run dev` para desarrollo o un servidor de archivos estáticos para revisar `out/`.

### Windows y certificados corporativos

Si npm devuelve `UNABLE_TO_VERIFY_LEAF_SIGNATURE` con Node reciente, usá `node --use-system-ca` al invocar el CLI de npm para confiar en los certificados instalados en Windows. No desactives la validación TLS. Si una versión global antigua de npm intercepta el comando, invocá el `npm-cli.js` incluido con la instalación actual de Node. El proyecto no modifica la configuración global de npm.

## Configuración

Copiá `.env.example` a `.env.local`. Ninguna variable es necesaria para explorar la fase 1.

| Variable | Uso actual |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio confirmado con `https://`; metadata y canonical |
| `NEXT_PUBLIC_BASE_PATH` | Subdirectorio de publicación: vacío localmente o `/patumin` en Pages |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número oficial internacional, solo dígitos |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email comercial confirmado |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL completa del perfil oficial |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Reservadas para fase 2; no utilizadas |
| `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_WEBHOOK_SECRET` | Reservadas para fase 2; no utilizadas |

Los secretos nunca deben llevar el prefijo `NEXT_PUBLIC_`, subirse a Git o incluirse en componentes de cliente.

`src/config/site.ts` centraliza marca, contactos, producto, variantes, precios, materiales, base, revisiones, plazos, envíos y datos fiscales. `null` identifica información sin confirmar. Los textos compartidos del proceso y FAQ viven en `src/config/content.ts`.

`demo: true` activa `noindex` y un `robots.txt` que impide la indexación de esta vista previa. El sitemap permanece vacío hasta disponer de dominio y desactivar el modo demo. Desactivar `demo` no habilita pagos: la ruta de checkout está deliberadamente cerrada.

## Rutas

`/`, `/crear-mi-miniatura`, `/galeria`, `/como-funciona`, `/preguntas-frecuentes`, `/contacto`, `/checkout`, `/pedido/confirmacion`, `/pedido/[reference]` y `/politicas/{privacidad,terminos,envios,devoluciones}`.

Las rutas de pedido no exponen información ni confirman transacciones. Se exporta únicamente `/pedido/consulta`, una pantalla informativa sin datos de clientes. Cualquier otra referencia queda fuera de la exportación y devuelve 404. `POST /api/checkout` es un bloqueo HTTP 503 `CHECKOUT_NOT_CONFIGURED` cuando se ejecuta en un servidor Next.js; no se publica como API en GitHub Pages. Una URL con parámetros `status=approved` nunca confirma un pago.

## Personalización y privacidad

El borrador guarda exclusivamente tipo y nombre de mascota, variante demostrativa, cantidad y observaciones bajo `patumin:miniature-draft:v1`. Se valida al recuperarlo, se eliminan campos desconocidos y se rechazan datos corruptos. La acción “Borrar selección” permite eliminarlo. Nombre del comprador, email, teléfono y domicilio no se guardan ni se envían en esta fase.

No hay analítica, cookies publicitarias, carga de fotos ni formularios que simulen un envío exitoso. Las políticas son borradores explícitos que requieren revisión legal argentina.

## Base de datos y migraciones (fase 2)

Todavía no se configuró Supabase y **no hay migraciones ejecutables**. El modelo previsto contiene productos, variantes, pedidos, pagos y eventos de pedido. Los tipos de dominio están en `src/types/commerce.ts`, con estados de pago, producción y envío separados.

Antes de conectar el checkout deben implementarse y probarse:

1. Migraciones versionadas para PostgreSQL y validación de importes/moneda; RLS que impida el acceso público a clientes y pedidos.
2. Precios y envío calculados exclusivamente en servidor, identificación de variante activa e idempotencia de creación.
3. Recuperación privada mediante token de alta entropía o enlace firmado con expiración; una referencia legible no debe dar acceso a información personal.
4. Autenticación y autorización de administración, historial de cambios y gestión de estados.

## Mercado Pago y WhatsApp (fase 2)

La integración aún no está instalada ni habilitada. Implementar Checkout Pro con el SDK oficial vigente, credenciales de prueba y documentación oficial actualizada. Crear preferencias en servidor, verificar la firma de notificaciones y consultar el pago al proveedor, comparando importe, moneda, cuenta receptora y referencia del pedido. Aplicar idempotencia de eventos y transiciones de estado; una redirección del navegador nunca es una fuente de verdad.

Después de verificar un pago aprobado, habilitar el enlace `https://wa.me/NUMERO?text=MENSAJE` con referencia y nombre de mascota. No enviar datos de entrega por ese enlace. Abrir WhatsApp no equivale a recibir fotografías: el pedido debe seguir esperando fotos hasta la confirmación del equipo.

## Verificaciones

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run test:export` valida el contenido de `out/`, los enlaces, las imágenes y las rutas con el prefijo de publicación. Debe recibir las mismas variables de entorno que el build. No requiere levantar un servidor.

Las pruebas de Node cubren recuperación de borradores, datos manipulados, descarte de datos ajenos a la personalización y validaciones de contacto/CPA. Ver [QA.md](docs/QA.md) para la evidencia y límites de la verificación de esta entrega.

La revisión visual debe incluir 360, 390, 768, 1024 y 1440 px; menú móvil, filtros, zoom con Escape, acordeones, selección y recuperación, validación del formulario y navegación con teclado. Todavía no existen pruebas de pagos: la integración no existe.

## Despliegue

El workflow `.github/workflows/nextjs.yml` publica la fase visual en GitHub Pages. En Settings → Pages, seleccionar GitHub Actions como fuente. Un push a `main` o una ejecución manual inicia el flujo.

1. Instala dependencias y ejecuta lint, TypeScript y pruebas con Node 24.
2. Obtiene `base_path` y `base_url` desde `actions/configure-pages`, respetando también dominios personalizados.
3. Construye `out/`, agrega `.nojekyll`, valida páginas y recursos y recién entonces carga el artefacto de Pages.
4. Despliega con `actions/deploy-pages`. El antiguo workflow de Jekyll fue retirado para evitar publicaciones competidoras.

Para reproducir el build del repositorio en PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/patumin'
$env:NEXT_PUBLIC_SITE_URL = 'https://MathiasLagomarsino.github.io/patumin'
npm run build
npm run test:export
```

GitHub Pages solo aloja la vista previa estática. Para habilitar pagos, webhooks o administración será necesario un backend y hosting con ejecución de servidor, además de completar [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md). Mantener el modo demo y los pagos cerrados hasta implementar y verificar esas integraciones.

No hace falta reescribir la interfaz para conectar las integraciones, pero habilitar ventas sí requiere implementar y probar los servicios pendientes.

## Archivos de referencia

- [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md): identidad, tipografía, componentes, voz y fotografía.
- [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md): pendientes comerciales, operativos y de seguridad.
- [ASSET_PROMPTS.md](docs/ASSET_PROMPTS.md): prompts completos y procedencia de imágenes generadas con ImageGen.
- `public/brand/`: variantes SVG de la marca tipográfica provisional.

Los assets definitivos pueden reemplazarse manteniendo sus rutas, dimensiones proporcionadas y textos alternativos actualizados. Las imágenes actuales suman aproximadamente 545 KB en WebP y se sirven mediante `next/image`.
