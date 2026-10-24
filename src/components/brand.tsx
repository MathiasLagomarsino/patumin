import Link from "next/link";

export function BrandMark({ className = "" }: { className?: string }) {
  return <svg className={className} width="34" height="40" viewBox="0 0 34 40" fill="none" aria-hidden="true">
    <path d="M8 33V13C8 7 12 4 17 4C24 4 28 8 28 14C28 20 23 24 17 24H14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M14 18V11L18 14L22 11V18C22 21 14 21 14 18Z" fill="currentColor" />
    <path d="M5 36H12M25 29L26 31L29 32L26 33L25 36L24 33L21 32L24 31L25 29Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className={`brand${footer ? " brand-footer" : ""}`} aria-label="PATUMÍN, inicio">
    <BrandMark /><span>PATUMÍN<span className="brand-period">.</span></span>
  </Link>;
}
