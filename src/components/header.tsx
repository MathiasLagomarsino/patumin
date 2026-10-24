"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/config/site";
import { Brand } from "@/components/brand";

export function Header() {
  const pathname = usePathname();
  return <HeaderForPage key={pathname} pathname={pathname} />;
}

function HeaderForPage({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  return <>
    <div className="announcement"><div className="container announcement-inner"><span>Una versión chiquita de un amor enorme.</span><span className="announcement-origin">Hecho con amor en Argentina <span aria-hidden="true">↗</span></span></div></div>
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
        <div className="header-actions">
          <Link className="button button-primary header-cta" href="/crear-mi-miniatura">Crear mi miniatura <ArrowUpRight size={17} /></Link>
          <button ref={menuButton} className="menu-button" type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegación móvil">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} /></Link>)}</nav>}
    </header>
  </>;
}
