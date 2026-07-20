import { useState } from "react";
import { Cta } from "./ui.jsx";

const LINKS = [
  { label: "Le lieu", href: "#lieu" },
  { label: "Programme", href: "#programme" },
  { label: "FAQ", href: "#faq" },
  { label: "Dress code", href: "#dresscode" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {/* Overlay mobile — frère du header (pas descendant) : le backdrop-blur du
          header crée un containing block qui piégerait un enfant en position fixed */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-noir transition-transform duration-500 ease-[cubic-bezier(0.6,0,0.2,1)] md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!open}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            tabIndex={open ? 0 : -1}
            className="font-fraunces text-[28px] text-white transition-colors hover:text-or-soft"
          >
            {l.label}
          </a>
        ))}
        <Cta href="#rsvp" className="mt-4" onClickCapture={close}>
          RSVP
        </Cta>
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          open ? "bg-transparent" : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2.5 px-5 py-4 md:px-10 md:py-[25px]">
          <a
            href="#top"
            onClick={close}
            className={`font-script text-2xl leading-none whitespace-nowrap transition-colors md:max-w-[200px] md:flex-1 ${
              open ? "text-white" : "text-black"
            }`}
          >
            Jean-Michel <span className="font-script text-or">&amp;</span> Jelva
          </a>

          {/* Menu desktop */}
          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative font-fraunces text-base transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-or after:transition-transform after:duration-300 hover:text-or hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden max-w-[200px] flex-1 justify-end md:flex">
            <Cta href="#rsvp">RSVP</Cta>
          </div>

          {/* Burger mobile */}
          <button
            className="relative size-10 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute left-2 top-[15px] h-0.5 w-6 transition-all duration-300 ${
                open ? "translate-y-1 rotate-45 bg-white" : "bg-black"
              }`}
            />
            <span
              className={`absolute left-2 top-[23px] h-0.5 w-6 transition-all duration-300 ${
                open ? "-translate-y-1 -rotate-45 bg-white" : "bg-black"
              }`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
