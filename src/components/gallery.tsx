"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const filters = ["Todos", "Perros", "Gatos", "Proceso"] as const;
type Filter = (typeof filters)[number];

const galleryItems = [
  {
    id: "perro",
    category: "Perros",
    src: "/assets/hero-miniature.webp",
    title: "Esa mirada tan suya.",
    detail: "Exploración de una miniatura de perro",
    alt: "Concepto generado con IA de una miniatura de golden retriever junto a una fotografía de referencia",
  },
  {
    id: "gato",
    category: "Gatos",
    src: "/assets/cat-miniature.webp",
    title: "Sus pequeñas particularidades.",
    detail: "Exploración de una miniatura de gato",
    alt: "Concepto generado con IA de una miniatura de gato atigrado sobre un fondo lila suave",
  },
  {
    id: "perro-blanco-negro",
    category: "Perros",
    src: "/assets/dog-miniature.webp",
    title: "Todo lo que lo hace único.",
    detail: "Exploración de una miniatura de perro blanco y negro",
    alt: "Concepto generado con IA de una miniatura de perro blanco y negro sobre una base redonda, con fondo verde salvia",
  },
  {
    id: "artesania",
    category: "Proceso",
    src: "/assets/craft-miniature.webp",
    title: "El cariño está en los detalles.",
    detail: "Concepto visual de pintura artesanal",
    alt: "Escena demostrativa generada con IA de una mano pintando una miniatura de perro con un pincel",
  },
] as const;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [selected, setSelected] = useState<(typeof galleryItems)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const visibleItems = galleryItems.filter((item) => filter === "Todos" || item.category === filter);

  function openImage(item: (typeof galleryItems)[number], trigger: HTMLButtonElement) {
    setSelected(item);
    returnFocusRef.current = trigger;
    dialogRef.current?.showModal();
  }

  function closeImage() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div className="gallery-filters" role="group" aria-label="Filtrar galería">
          {filters.map((item) => (
            <button
              key={item}
              className={`gallery-filter ${filter === item ? "is-active" : ""}`}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="gallery-count" aria-live="polite">
          {visibleItems.length} {visibleItems.length === 1 ? "concepto visual" : "conceptos visuales"}
        </p>
      </div>
      <div className="gallery-grid">
        {visibleItems.map((item, index) => (
          <article className="gallery-card" key={item.id}>
            <button
              className="gallery-image-button"
              type="button"
              aria-label={`Ampliar: ${item.detail}`}
              onClick={(event) => openImage(item, event.currentTarget)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 520px) 100vw, 50vw"
                priority={index === 0}
              />
              <span className="gallery-demo-label">Concepto · IA</span>
              <span className="gallery-expand"><ArrowUpRight size={19} aria-hidden="true" /></span>
            </button>
            <p className="gallery-card-category">{item.category}</p>
            <h2>{item.title}</h2>
            <p className="gallery-card-detail">{item.detail}</p>
          </article>
        ))}
      </div>
      <dialog
        className="gallery-lightbox"
        ref={dialogRef}
        aria-label={selected ? `Vista ampliada: ${selected.detail}` : "Imagen ampliada"}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeImage();
        }}
        onClose={() => returnFocusRef.current?.focus()}
      >
        <button className="lightbox-close" type="button" onClick={closeImage} aria-label="Cerrar imagen ampliada" autoFocus>
          <X size={24} aria-hidden="true" />
        </button>
        {selected && (
          <figure>
            <div className="lightbox-image">
              <Image src={selected.src} alt={selected.alt} fill sizes="90vw" />
            </div>
            <figcaption>{selected.detail}. Imagen generada con IA; no representa un trabajo entregado.</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
