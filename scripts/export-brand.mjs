import { readFile, writeFile } from "node:fs/promises";

// Keep the standalone assets and favicon in sync with the website's vector mark.
const component = await readFile(new URL("../src/components/brand.tsx", import.meta.url), "utf8");
const mark = component.match(/<g transform="rotate\(-9 24 24\)">[\s\S]*?<\/g>/)?.[0].replaceAll("fillRule=", "fill-rule=");
if (!mark) throw new Error("Could not locate the PATUMÍN paw artwork.");
const svg = (viewBox, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
const wordmark = (color, x, y, size, centered = false) => `<text x="${x}" y="${y}"${centered ? ' text-anchor="middle"' : ""} fill="${color}" font-family="'DM Serif Display', Georgia, serif" font-size="${size}" letter-spacing="-2">PATUMÍN.</text>`;
const assets = {
  "patumin-mark.svg": svg("0 0 48 48", "PATUMÍN — patita", `<g fill="#684A7C">${mark}</g>`),
  "patumin-horizontal.svg": svg("0 0 420 90", "PATUMÍN — marca horizontal", `<g transform="translate(9 9) scale(1.4)" fill="#684A7C">${mark}</g>${wordmark("#3E3A40", 81, 63, 57)}`),
  "patumin-monochrome.svg": svg("0 0 420 90", "PATUMÍN — marca monocromática", `<g transform="translate(9 9) scale(1.4)" fill="#3E3A40">${mark}</g>${wordmark("#3E3A40", 81, 63, 57)}`),
  "patumin-stacked.svg": svg("0 0 360 240", "PATUMÍN — marca apilada", `<g transform="translate(132 9) scale(2)" fill="#684A7C">${mark}</g>${wordmark("#3E3A40", 180, 163, 55, true)}<text x="180" y="201" text-anchor="middle" fill="#665F69" font-family="'DM Sans', Arial, sans-serif" font-size="14">Tu mascota, siempre cerca.</text>`),
};
for (const [file, contents] of Object.entries(assets)) {
  await writeFile(new URL(`../public/brand/${file}`, import.meta.url), contents);
}
await writeFile(new URL("../src/app/icon.svg", import.meta.url), svg("0 0 64 64", "PATUMÍN", `<rect width="64" height="64" rx="18" fill="#684A7C"/><g transform="translate(7 7) scale(1.05)" fill="#FFFCF7">${mark}</g>`));
console.log("Exported four SVG brand assets and favicon.");
