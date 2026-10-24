"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="container not-found" role="alert"><p className="eyebrow">UN PEQUEÑO TROPIEZO</p><h1>Algo no salió como esperábamos.</h1><p>Intentá cargar la página de nuevo. No se realizó ningún cobro desde esta pantalla.</p><button className="button button-primary" onClick={reset}>Volver a intentar</button></div>;
}
