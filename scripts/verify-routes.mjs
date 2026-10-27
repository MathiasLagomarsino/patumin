import assert from "node:assert/strict";

// Optional HTTP smoke check against next dev, not a static Pages server.
const base = `${(process.env.PREVIEW_URL || "http://127.0.0.1:3000").replace(/\/+$/, "")}/`;
const url = path => new URL(path.replace(/^\//, ""), base);
const routes = ["/", "/crear-mi-miniatura", "/galeria", "/como-funciona", "/preguntas-frecuentes", "/contacto", "/checkout", "/pedido/confirmacion", "/pedido/consulta", "/politicas/privacidad", "/politicas/terminos", "/politicas/envios", "/politicas/devoluciones"];
for (const route of routes) {
  const response = await fetch(url(route));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="es-AR"/);
  assert.match(html, /noindex/);
  console.log(`PASS ${route}`);
}
assert.equal((await fetch(url("/ruta-inexistente"))).status, 404);
assert.equal((await fetch(url("/politicas/no-existe"))).status, 404);
assert.equal((await fetch(url("/pedido/prueba-no-real"))).status, 404);
const checkout = await fetch(url("/api/checkout"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ price: 1, status: "approved" }) });
assert.equal(checkout.status, 503);
assert.equal((await checkout.json()).error, "CHECKOUT_NOT_CONFIGURED");
const robots = await (await fetch(url("/robots.txt"))).text();
assert.match(robots, /Disallow: \//);
console.log("PASS unknown routes 404, checkout fail-closed 503, demo robots");
