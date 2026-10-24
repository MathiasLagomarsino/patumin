import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const routes = ["/", "/crear-mi-miniatura", "/galeria", "/como-funciona", "/preguntas-frecuentes", "/contacto", "/checkout", "/pedido/confirmacion", "/pedido/prueba-no-real", "/politicas/privacidad", "/politicas/terminos", "/politicas/envios", "/politicas/devoluciones"];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="es-AR"/);
  assert.match(html, /noindex/);
  console.log(`PASS ${route}`);
}
assert.equal((await fetch(new URL("/ruta-inexistente", base))).status, 404);
assert.equal((await fetch(new URL("/politicas/no-existe", base))).status, 404);
const checkout = await fetch(new URL("/api/checkout", base), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ price: 1, status: "approved" }) });
assert.equal(checkout.status, 503);
assert.equal((await checkout.json()).error, "CHECKOUT_NOT_CONFIGURED");
const robots = await (await fetch(new URL("/robots.txt", base))).text();
assert.match(robots, /Disallow: \//);
console.log("PASS unknown routes 404, checkout fail-closed 503, demo robots");
