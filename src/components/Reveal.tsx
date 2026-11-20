"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Animazioni d'ingresso con GSAP + ScrollTrigger su tutti gli elementi [data-reveal].
 * Gli elementi [data-parallax] scorrono leggermente più lenti.
 * Rispetta prefers-reduced-motion.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        ScrollTrigger.batch(els, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1.3, ease: "expo.out", stagger: 0.09, overwrite: true }),
        });
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 60);
          gsap.fromTo(
            el,
            { yPercent: 0 },
            {
              y: -amount,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });
        document.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(18% 12% 18% 12%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.6 },
            },
          );
        });
      });
      ScrollTrigger.refresh();
      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}
