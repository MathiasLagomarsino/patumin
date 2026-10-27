# Tamaños y precios de PATUMÍN

Referencia consultada el 27 de octubre de 2026: [miniatura personalizada de Pirucho](https://piruchouy.com/products/mascota-personalizadada). Los importes individuales se verificaron en el [catálogo público JSON del producto](https://piruchouy.com/products/mascota-personalizadada.js), cuyos precios están expresados en centésimos de pesos uruguayos.

| Variante | Pirucho (UYU) | PATUMÍN (ARS) |
| --- | ---: | ---: |
| 10 cm de alto, sentado | $2.590 | $60.000 |
| 10 cm de alto, parado | $2.690 | $62.000 |
| 16 cm de alto, sentado | $3.500 | $81.000 |
| 16 cm de alto, parado | $4.500 | $104.000 |
| 20 cm de alto | $7.000 | $162.000 |

Se usa la base de $60.000 ARS indicada por el titular para la variante más pequeña. Para el resto se conserva la proporción del catálogo de referencia y se redondea al millar más cercano:

`precio ARS = redondear((precio UYU / 2590) × 60000 / 1000) × 1000`

Esta es una escala comercial proporcional, no una conversión cambiaria. Las medidas publicadas son alturas; no se infieren largo ni ancho. Pirucho no especifica postura en la variante de 20 cm; en PATUMÍN se indica “Postura a coordinar”.

El precio por unidad y el subtotal se calculan desde `src/config/site.ts`, nunca a partir de un precio guardado en el navegador. El envío y el total con envío siguen pendientes de confirmación. Los pedidos y pagos permanecen deshabilitados hasta implementar las integraciones correspondientes. La validación comercial previa al lanzamiento debe confirmar que estos tamaños se pueden producir y que los precios cubren los costos e impuestos aplicables.
