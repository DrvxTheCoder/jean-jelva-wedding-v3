import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Navbar } from "./components/Navbar.jsx";
import { Splash } from "./components/Splash.jsx";
import { Hero, Marquee, About, Schedule } from "./components/sections-top.jsx";
import { Venue, Hotels } from "./components/sections-middle.jsx";
import { Rsvp, Faq, DressCode, Footer } from "./components/sections-bottom.jsx";

/* Défilement inertiel (Lenis). L'offset des ancres reprend le scroll-margin-top
   de 90px défini en CSS, que Lenis ne lit pas. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -90 } });
    return () => lenis.destroy();
  }, []);
}

export default function App() {
  useSmoothScroll();
  return (
    <main id="top" className="scrollbar-none">
      <Splash />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Schedule />
      <Venue />
      <Hotels />
      <DressCode />
      <Rsvp />
      <Faq />
      <Footer />
    </main>
  );
}
