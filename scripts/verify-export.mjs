import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const root = resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const exists = async path => access(path).then(() => true, () => false);
const isFile = async path => stat(path).then(info => info.isFile(), () => false);
const pages = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.name.endsWith(".html")) pages.push(path);
  }
}
await collect(root);
assert.ok(pages.length >= 10, "Expected the complete storefront export");
assert.ok(await exists(resolve(root, "pedido/consulta/index.html")), "Missing informational order page");
assert.equal(await exists(resolve(root, "pedido/prueba-no-real/index.html")), false, "Order references must not be exported");
assert.equal(await exists(resolve(root, "api/checkout/index.html")), false, "Pages must not pretend to provide a payment backend");
for (const page of pages) {
  const html = await readFile(page, "utf8");
  for (const [tag] of html.matchAll(/<(?:a|link|img|script)\b[^>]*>/g)) {
    // Origin hints do not identify a file and need no repository prefix.
    if (/\brel="(?:preconnect|dns-prefetch)"/.test(tag)) continue;
    const value = tag.match(/\b(?:src|href)="([^"<>]+)"/)?.[1];
    if (!value) continue;
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    assert.ok(value === basePath || value.startsWith(`${basePath}/`), `${relative(root, page)}: missing basePath in ${value}`);
    const pathname = decodeURIComponent(value.slice(basePath.length).split(/[?#]/)[0] || "/");
    const asset = resolve(root, `.${pathname}`);
    assert.ok(asset === root || asset.startsWith(`${root}${sep}`), "Asset path escaped export directory");
    assert.ok(await isFile(asset) || await isFile(resolve(asset, "index.html")), `${relative(root, page)}: missing exported file ${value}`);
  }
}
const home = await readFile(resolve(root, "index.html"), "utf8");
assert.ok(home.includes(`src="${basePath}/assets/hero-miniature.webp"`), "Hero must use the deployment prefix");
if (process.env.NEXT_PUBLIC_SITE_URL) {
  const canonical = new URL(`${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "")}/`).toString();
  assert.ok(home.includes(`rel="canonical" href="${canonical}"`), "Canonical must retain the repository subdirectory");
}
console.log(`PASS: ${pages.length} exported pages, local links, scripts, styles, images, and deployment URLs.`);
