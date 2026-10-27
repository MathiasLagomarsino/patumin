import { test } from "node:test";
import assert from "node:assert/strict";
import { absoluteSiteUrl, assetPath } from "../src/lib/urls.ts";

test("public assets work at the domain root and under a repository prefix", () => {
  assert.equal(assetPath("/assets/cat.webp", ""), "/assets/cat.webp");
  assert.equal(assetPath("/assets/cat.webp", "/patumin"), "/patumin/assets/cat.webp");
  assert.equal(assetPath("/icon.svg", "/patumin/"), "/patumin/icon.svg");
});

test("canonical URLs retain the Pages subdirectory without duplication", () => {
  assert.equal(absoluteSiteUrl("/galeria", "https://example.test/patumin/"), "https://example.test/patumin/galeria");
  assert.equal(absoluteSiteUrl("/", "https://example.test/patumin"), "https://example.test/patumin/");
  assert.equal(absoluteSiteUrl("/galeria", "https://example.test/"), "https://example.test/galeria");
});
