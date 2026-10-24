import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDraft, validateCustomer } from "../src/lib/draft.ts";

const draft = { version: 1, variantId: "demo", petType: "gato", petName: "  Miga  ", quantity: 2, notes: "  Una manchita en la nariz.  " };
test("restores only known customization fields and trims whitespace", () => {
  assert.deepEqual(parseDraft(JSON.stringify({ ...draft, customerEmail: "private@example.test", total: 1 })), {
    ...draft, petName: "Miga", notes: "Una manchita en la nariz.",
  });
});
test("rejects damaged, unsupported and oversized stored drafts", () => {
  for (const value of [null, "{", "null", "[]", "x".repeat(4001), JSON.stringify({ ...draft, version: 2 })]) assert.equal(parseDraft(value), null);
});
test("rejects manipulated quantities and invalid pet details", () => {
  for (const quantity of [0, -1, 6, 1.5, "2", null]) assert.equal(parseDraft(JSON.stringify({ ...draft, quantity })), null);
  for (const patch of [{ petType: "otro" }, { petName: " " }, { petName: "x".repeat(61) }, { notes: "x".repeat(501) }, { variantId: "../../secret" }]) assert.equal(parseDraft(JSON.stringify({ ...draft, ...patch })), null);
});
const customer = { name: "Persona de prueba", email: "persona@example.test", phone: "+54 11 5555 5555", street: "Calle de prueba 123", city: "Buenos Aires", province: "Buenos Aires", postalCode: "C1000AAA" };
test("accepts Argentine postal code formats and validates customer fields", () => {
  assert.deepEqual(validateCustomer(customer), {});
  assert.deepEqual(validateCustomer({ ...customer, postalCode: "1000" }), {});
  const errors = validateCustomer({ name: "", email: "invalid", phone: "1", street: "", city: "", province: "", postalCode: "123" });
  assert.equal(Object.keys(errors).length, 7);
});
