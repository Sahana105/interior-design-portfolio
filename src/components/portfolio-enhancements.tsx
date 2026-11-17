"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LightboxImage = { src: string; alt: string; width: number; height: number };

export function PortfolioEnhancements() {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const menu = document.querySelector<HTMLInputElement>("#mt");
    const closeMenuAfterNavigation = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("header nav a") && menu) menu.checked = false;
      const roomButton = target.closest<HTMLButtonElement>("[data-scroll]");
      if (roomButton?.dataset.scroll) {
        document.getElementById(roomButton.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const openImage = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>(".im[data-lightbox-src]");
      if (!button) return;
      const galleryButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".im[data-lightbox-src]"));
      const index = galleryButtons.indexOf(button);
      if (index < 0) return;
      setImages(galleryButtons.map((galleryButton) => ({
        src: galleryButton.dataset.lightboxSrc ?? "",
        alt: galleryButton.querySelector("img")?.alt ?? "Portfolio image",
        width: Number(galleryButton.dataset.lightboxWidth) || 1200,
        height: Number(galleryButton.dataset.lightboxHeight) || 900,
      })));
      setActiveIndex(index);
    };
    document.addEventListener("click", closeMenuAfterNavigation);
    document.addEventListener("click", openImage);

    if ("IntersectionObserver" in window) {
      root.classList.add("rvo");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -4% 0px", threshold: 0.04 });
      document.querySelectorAll(".rv").forEach((element) => observer.observe(element));
      return () => {
        observer.disconnect();
        document.removeEventListener("click", closeMenuAfterNavigation);
        document.removeEventListener("click", openImage);
        root.classList.remove("js", "rvo");
      };
    }

    root.classList.add("rvo");
    return () => {
      document.removeEventListener("click", closeMenuAfterNavigation);
      document.removeEventListener("click", openImage);
      root.classList.remove("js", "rvo");
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    closeRef.current?.focus();
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? null : (current + 1) % images.length);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? null : (current + images.length - 1) % images.length);
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [activeIndex, images.length]);

  return (
    <>
      {active && (
        <div aria-label="Image viewer" aria-modal="true" className="lb" onClick={(event) => event.target === event.currentTarget && setActiveIndex(null)} role="dialog">
          <button aria-label="Close image viewer" className="x" onClick={() => setActiveIndex(null)} ref={closeRef} type="button">×</button>
          <button aria-label="Previous image" className="pv" onClick={() => setActiveIndex((activeIndex! + images.length - 1) % images.length)} type="button">‹</button>
          <Image alt={active.alt} height={active.height} priority sizes="100vw" src={active.src} width={active.width} />
          <button aria-label="Next image" className="nx" onClick={() => setActiveIndex((activeIndex! + 1) % images.length)} type="button">›</button>
        </div>
      )}
    </>
  );
}
