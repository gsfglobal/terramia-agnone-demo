"use client";

import { useRef, type ReactNode } from "react";

/** Inclinazione 3D sottile al passaggio del puntatore (disattivata su touch e reduced-motion) */
export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(0)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1100px) rotateY(0) rotateX(0)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative transition-transform duration-500 ease-[var(--ease-luxe)] [transform-style:preserve-3d] ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_var(--gx,50%)_var(--gy,50%),rgba(216,122,58,.18),transparent_45%)] group-hover:opacity-100"
        aria-hidden="true"
      />
    </div>
  );
}
