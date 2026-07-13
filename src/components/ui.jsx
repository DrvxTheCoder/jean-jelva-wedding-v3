import { useEffect, useRef } from "react";

/* Placeholder image — dimensions exactes du template, à remplacer plus tard */
export function Ph({ dim, dark = false, className = "", style }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-linear-135 ${
        dark
          ? "from-[#e6c9ac] to-[#d9b691]"
          : "from-[#f0dccb] via-[#f9e2d2] to-[#f3e6da]"
      } after:font-sans after:text-xs after:tracking-widest after:uppercase after:text-black/30 after:content-[attr(data-dim)] ${className}`}
      data-dim={dim}
      style={style}
      aria-hidden="true"
    />
  );
}

/* Ornement floral (remplace le PNG 270px du template) */
export function Ornament({ className = "" }) {
  return (
    <svg
      className={`w-[270px] max-w-[60vw] text-or ${className}`}
      viewBox="0 0 270 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 20 H110" stroke="currentColor" strokeWidth="1" />
      <path d="M160 20 H260" stroke="currentColor" strokeWidth="1" />
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <path d="M135 8 C138 14 138 26 135 32 C132 26 132 14 135 8 Z" />
        <path d="M123 20 C129 17 141 17 147 20 C141 23 129 23 123 20 Z" />
        <path d="M127 12 C131 15 139 25 143 28" />
        <path d="M143 12 C139 15 131 25 127 28" />
      </g>
      <circle cx="135" cy="20" r="2.4" fill="currentColor" />
    </svg>
  );
}

/* Petite fleur (séparateur marquee & footer, 28px dans le template) */
export function Flower({ className = "" }) {
  return (
    <svg
      className={`size-7 flex-none text-or ${className}`}
      viewBox="0 0 28 28"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 2c1.8 3.4 1.8 6.6 0 10-1.8-3.4-1.8-6.6 0-10Zm0 24c-1.8-3.4-1.8-6.6 0-10 1.8 3.4 1.8 6.6 0 10ZM2 14c3.4-1.8 6.6-1.8 10 0-3.4 1.8-6.6 1.8-10 0Zm24 0c-3.4 1.8-6.6 1.8-10 0 3.4-1.8 6.6-1.8 10 0Z" />
      <circle cx="14" cy="14" r="2.2" />
    </svg>
  );
}

/* Main CTA — double texte qui glisse au hover (fidèle au composant Framer) */
export function Cta({ children, href, onClick, type, className = "", disabled = false }) {
  const label = (
    <span className="font-fraunces text-lg leading-6 font-semibold">{children}</span>
  );
  const inner = (
    <span className="h-6 overflow-hidden">
      <span className="flex flex-col items-center gap-2.5 transition-transform duration-[450ms] ease-[cubic-bezier(0.6,0,0.2,1)] group-hover:-translate-y-[34px]">
        {label}
        {label}
      </span>
    </span>
  );
  const base = `group inline-flex items-center justify-center border-none bg-or px-[30px] py-[13px] text-white ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"} ${className}`;
  if (href) {
    return (
      <a
        className={base}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  }
  return (
    <button className={base} onClick={onClick} type={type || "button"} disabled={disabled}>
      {inner}
    </button>
  );
}

/* Hook + wrapper reveal-on-scroll */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({ children, className = "", as: Tag = "div" }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
