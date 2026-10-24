"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, Expand, X } from "lucide-react";

const images = [
  { src: "/assets/hero-miniature.webp", alt: "Concepto de una miniatura de perro junto a su fotografía de referencia", label: "Su versión mini" },
  { src: "/assets/cat-miniature.webp", alt: "Concepto de una miniatura personalizada de gato", label: "También para gatos" },
  { src: "/assets/craft-miniature.webp", alt: "Escena conceptual del proceso de pintura de una miniatura", label: "El detalle artesanal" },
];

export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = images[selected];

  return (
    <div className="product-gallery">
      <button className="product-main-image" type="button" onClick={() => dialog.current?.showModal()} aria-label={`Ampliar imagen: ${current.label}`}>
        <Image src={current.src} alt={current.alt} fill sizes="(max-width: 760px) 100vw, 50vw" priority />
        <span className="product-image-tag">Hecha de pequeños detalles <ArrowUpRight size={14} aria-hidden="true" /></span>
        <span className="product-expand"><Expand size={18} aria-hidden="true" /></span>
      </button>
      <div className="product-thumbnails" aria-label="Imágenes de la miniatura">
        {images.map((item, index) => (
          <button type="button" key={item.src} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`Ver ${item.label}`}>
            <Image src={item.src} alt="" fill sizes="100px" />
          </button>
        ))}
        <p>Imágenes de concepto generadas con IA.<br />No representan trabajos terminados.</p>
      </div>
      <dialog ref={dialog} className="product-image-dialog" aria-label={`Vista ampliada: ${current.label}`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="product-dialog-content">
          <button type="button" onClick={() => dialog.current?.close()} className="product-dialog-close" aria-label="Cerrar imagen ampliada"><X size={24} /></button>
          <div className="product-dialog-image"><Image src={current.src} alt={current.alt} fill sizes="90vw" /></div>
          <p>{current.label} · Imagen demostrativa generada con IA.</p>
        </div>
      </dialog>
    </div>
  );
}
