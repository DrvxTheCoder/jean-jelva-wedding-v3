import { useEffect, useState } from "react";
import { Ornament, Cta, Reveal } from "./ui.jsx";

/* ---------- Le lieu (Venue) — carte Google Maps + contenu sticky ---------- */
export function Venue() {
  return (
    <section className="bg-noir" id="lieu">
      <div className="flex flex-col gap-[60px] bg-lightsection pb-20 lg:flex-row lg:pb-0 lg:pr-10">
        <div className="hidden md:block relative min-h-[480px] w-full lg:min-h-[800px] lg:w-1/2 lg:max-w-1/2">
          <iframe
            title="Château de Beauclair — Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.3716421625136!2d2.1750379!3d48.260517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5b17aedd5ee41%3A0x3564b4eceed2e554!2sCh%C3%A2teau%20de%20Beauclair!5e1!3m2!1sen!2ssn!4v1783875240881!5m2!1sen!2ssn"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex max-w-[580px] flex-col gap-[60px] pt-10 md:pt-0 self-start px-5 md:px-10 lg:sticky lg:top-[100px] lg:px-0 lg:py-[120px]">
          <Reveal className="flex flex-col items-start gap-5">
            <span className="text-sm uppercase tracking-[0.14em] text-black/70">Le lieu</span>
            <h3 className="max-w-[490px] font-fraunces text-h3">
              Rendez-vous au Château de Beauclair
            </h3>
            <p className="max-w-[450px] text-base text-black/70">
              Nous serons heureux de vous accueillir au Château de Beauclair, dans le Loiret, pour
              une journée inoubliable au cœur de son parc.
            </p>
          </Reveal>
          <Reveal className="grid max-w-120 grid-cols-2 gap-4">
            {[
              ["Lieu :", "Château de Beauclair"],
              ["Région :", "Loiret, Centre-Val de Loire"],
              ["Date :", "09 Octobre 2026"],
            ].map(([label, value]) => (
              <div className="flex flex-col gap-1" key={label}>
                <span className="text-sm text-black/40">{label}</span>
                <span className="font-fraunces text-lg leading-6">{value}</span>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-black/40">Site :</span>
              <a
                className="font-fraunces text-sm leading-6 underline underline-offset-3 transition-colors hover:text-or"
                href="https://www.chateaudebeauclair.com/"
                target="_blank"
                rel="noreferrer"
              >
                chateaudebeauclair.com
              </a>
            </div>
          </Reveal>
          <Reveal>
            <Cta href="https://www.google.com/maps/search/Ch%C3%A2teau+de+Beauclair+Loiret">
              Voir sur la carte
            </Cta>
          </Reveal>
        </div>
        <div className="relative md:hidden min-h-[480px] w-full lg:min-h-[800px] lg:w-1/2 lg:max-w-1/2">
          <iframe
            title="Château de Beauclair — Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.3716421625136!2d2.1750379!3d48.260517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5b17aedd5ee41%3A0x3564b4eceed2e554!2sCh%C3%A2teau%20de%20Beauclair!5e1!3m2!1sen!2ssn!4v1783875240881!5m2!1sen!2ssn"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Hôtels à proximité ---------- */
const HOTELS = [
  {
    name: "La Scala",
    rooms: "11 chambres",
    address: "50, Faubourg de Paris, 45300 Pithiviers",
    img: "/images/venues/hotel-la-scala.jpg",
    url: "https://www.booking.com/hotel/fr/la-scala.fr.html",
  },
  {
    name: "Confort Hôtel Relais",
    rooms: "40 chambres",
    address: "Avenue du 8 Mai, 45300 Pithiviers",
    img: "/images/venues/hotel-confort-1.jpg",
    url: "https://www.booking.com/hotel/fr/comfort-hotel-pithiviers.fr.html",
  },
];

export function Hotels() {
  const [active, setActive] = useState(0);

  const contact = (
    <Reveal className="flex flex-col items-start gap-5">
      <div className="flex flex-col gap-1.5">
        <a
          className="font-medium text-xl leading-6 transition-colors hover:text-or"
          href="tel:+33648151822"
        >
          Aby — 06 48 15 18 22
        </a>
        <a
          className="font-medium text-xl leading-6 transition-colors hover:text-or"
          href="tel:+33607638369"
        >
          Magalie — 06 07 63 83 69
        </a>
      </div>
      <p className="max-w-[490px] text-base text-black/70">
        Besoin d'aide pour organiser votre séjour ? N'hésitez pas à nous contacter — nous serons
        ravis de vous aider.
      </p>
    </Reveal>
  );

  return (
    <section className="py-[100px] md:py-[150px] md:pb-[180px]" id="hotels">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 md:gap-20 md:px-10">
        <Reveal className="flex flex-col items-center gap-5">
          <Ornament />
          <h2 className="text-center font-fraunces text-h2">Où dormir après la fête</h2>
        </Reveal>

        {/* Mobile / tablette : image + nom + infos empilés, sans effet de survol */}
        <div className="flex w-full flex-col gap-14 lg:hidden">
          {HOTELS.map((h, i) => (
            <Reveal key={h.name} className="flex flex-col gap-6">
              <img src={h.img} alt={h.name} loading="lazy" className="h-[420px] w-full object-cover" />
              <div>
                <h3 className="font-fraunces text-[clamp(32px,3.6vw,52px)] leading-[1.05] tracking-[-0.02em]">
                  <a
                    className="transition-colors hover:text-or"
                    href={h.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {h.name}
                  </a>
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/70">
                  <span>{h.rooms}</span>
                  <span>{h.address}</span>
                </div>
                <Cta className="mt-6" href={h.url}>
                  Réserver
                </Cta>
              </div>
            </Reveal>
          ))}
          {contact}
        </div>

        {/* Desktop : image fixe en fondu croisé + liste au survol */}
        <div className="hidden w-full items-start gap-[60px] lg:flex">
          <div className="relative h-[640px] w-[530px] flex-none">
            {HOTELS.map((h, i) => (
              <div
                key={h.name}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : 1 }}
              >
                <img src={h.img} alt={h.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex min-h-[640px] flex-1 flex-col justify-center gap-20">
            <div className="group/list flex flex-col">
              {HOTELS.map((h, i) => (
                <Reveal
                  key={h.name}
                  className="cursor-pointer border-b border-black/20 py-7 transition-opacity duration-300 group-hover/list:opacity-35 hover:!opacity-100"
                >
                  <div onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                    <h3 className="font-fraunces text-[clamp(32px,3.6vw,52px)] leading-[1.05] tracking-[-0.02em]">
                      <a
                        className="transition-colors hover:text-or"
                        href={h.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {h.name}
                      </a>
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/70">
                      <span>{h.rooms}</span>
                      <span>{h.address}</span>
                    </div>
                    <Cta className="mt-6" href={h.url}>
                      Réserver
                    </Cta>
                  </div>
                </Reveal>
              ))}
            </div>
            {contact}
          </div>
        </div>
      </div>
    </section>
  );
}
