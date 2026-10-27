import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDraft, validateCustomer } from "../src/lib/draft.ts";

const draft = { version: 1, variantId: "demo", quantity: 2 };
test("restores size and quantity without requiring pet details", () => {
  assert.deepEqual(parseDraft(JSON.stringify(draft)), draft);
});

test("restores legacy selections while discarding pet details and unknown fields", () => {
  assert.deepEqual(parseDraft(JSON.stringify({ ...draft, petType: "gato", petName: "Miga", notes: "Una manchita", customerEmail: "private@example.test", total: 1 })), draft);
});
test("rejects damaged, unsupported and oversized stored drafts", () => {
  for (const value of [null, "{", "null", "[]", "x".repeat(4001), JSON.stringify({ ...draft, version: 2 })]) assert.equal(parseDraft(value), null);
});
test("rejects manipulated quantities and invalid variants", () => {
  for (const quantity of [0, -1, 6, 1.5, "2", null]) assert.equal(parseDraft(JSON.stringify({ ...draft, quantity })), null);
  for (const variantId of ["", "../../secret", "x".repeat(81), null]) assert.equal(parseDraft(JSON.stringify({ ...draft, variantId })), null);
});
const customer = { name: "Persona de prueba", email: "persona@example.test", phone: "+54 11 5555 5555", street: "Calle de prueba 123", city: "Buenos Aires", province: "Buenos Aires", postalCode: "C1000AAA" };
test("accepts Argentine postal code formats and validates customer fields", () => {
  assert.deepEqual(validateCustomer(customer), {});
  assert.deepEqual(validateCustomer({ ...customer, postalCode: "1000" }), {});
  const errors = validateCustomer({ name: "", email: "invalid", phone: "1", street: "", city: "", province: "", postalCode: "123" });
  assert.equal(Object.keys(errors).length, 7);
});
