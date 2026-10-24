import { NextResponse } from "next/server";

/** Fail closed until server-side pricing, shipping, persistence and payment verification exist. */
export async function POST() {
  return NextResponse.json(
    {
      error: "CHECKOUT_NOT_CONFIGURED",
      message: "Los pedidos y pagos todavía no están habilitados. No se creó ningún pedido ni se realizó un cobro.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
