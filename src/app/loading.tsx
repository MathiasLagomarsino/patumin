export default function Loading() {
  return <div className="container loading-page" aria-busy="true" aria-label="Cargando PATUMÍN"><div className="skeleton skeleton-heading" /><div className="skeleton skeleton-copy" /><div className="skeleton skeleton-image" /><span className="sr-only">Cargando contenido…</span></div>;
}
