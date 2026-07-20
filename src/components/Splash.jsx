import { useEffect, useState } from "react";

/* ---------- Splash screen — affiché le temps du chargement ---------- */
const MIN_DISPLAY_MS = 1800; // durée minimale pour laisser l'animation respirer
const EXIT_MS = 900; // doit correspondre à la durée du rideau (duration-[900ms])

export function Splash() {
  const [phase, setPhase] = useState("loading"); // loading → exit → done

  useEffect(() => {
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));
    const minDelay = new Promise((r) => setTimeout(r, MIN_DISPLAY_MS));
    let t;
    Promise.all([loaded, minDelay]).then(() => {
      setPhase("exit");
      t = setTimeout(() => setPhase("done"), EXIT_MS);
    });
    return () => clearTimeout(t);
  }, []);

  /* Bloque le défilement tant que le splash est visible */
  useEffect(() => {
    if (phase === "done") return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-mainbg transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
        phase === "exit" ? "-translate-y-full" : ""
      }`}
      aria-hidden="true"
    >
      <div
        className={`flex flex-col items-center gap-8 transition-opacity duration-500 ${
          phase === "exit" ? "opacity-0" : ""
        }`}
      >
        <p className="splash-title font-display text-[clamp(44px,8vw,110px)] leading-none tracking-[-0.02em]">
          Jean-Michel <span className="font-script text-or">&amp;</span> Jelva
        </p>
        <div className="splash-line h-px w-45 bg-or" />
        <p className="splash-date text-sm uppercase tracking-[0.3em] text-black/50">
          09 Octobre 2026
        </p>
      </div>
    </div>
  );
}
