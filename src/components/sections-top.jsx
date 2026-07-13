import { useEffect, useRef, useState } from "react";
import { Ornament, Flower, Cta, Reveal } from "./ui.jsx";

/* ---------- Hero — parallaxe entre l'image de fond et le titre ---------- */
export function Hero() {
  const imgRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${y * 0.35}px) scale(1.08)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${y * -0.18}px)`;
        titleRef.current.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.85));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex h-svh min-h-140 items-end justify-center overflow-clip">
      <img
        ref={imgRef}
        src="/images/hero/bg-hero-backdrop-2.jpg"
        alt="Jean-Michel et Jelva"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t  from-white to-transparent to-45%" />
      <div
        ref={titleRef}
        className="z-2 w-full flex flex-row justify-center items-center max-w-360 pb-25 px-10 will-change-transform"
      >
        <h1 className="pb-8 font-display text-7xl md:text-h1 text-black md:pb-12">
          Jean <span className="font-script text-or">&amp;</span> Jelva
        </h1>
      </div>
    </section>
  );
}

/* ---------- Marquee (Text slider) ---------- */
const MARQUEE_ITEMS = ["Jean-Michel et Jelva", "Château de Beauclair, Loiret", "09 Octobre 2026"];

/* Nombre pair de copies : l'animation translate de -50 %, soit exactement la
   moitié des copies — le raccord est donc invisible. 6 copies couvrent les
   écrans jusqu'à ~3× la largeur d'un groupe. */
const MARQUEE_COPIES = 6;

export function Marquee() {
  return (
    <section
      className="overflow-hidden border-b border-black/20 bg-mainbg py-8 md:py-[50px]"
      aria-label="Jean-Michel & Jelva — Château de Beauclair, Loiret — 09 Octobre 2026"
    >
      <div
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
        aria-hidden="true"
      >
        {Array.from({ length: MARQUEE_COPIES }).map((_, c) => (
          <div className="flex items-center gap-10 pr-10" key={c}>
            {MARQUEE_ITEMS.map((item) => (
              <span className="flex items-center gap-10 whitespace-nowrap" key={item}>
                <span className="font-fraunces text-b34 italic">{item}</span>
                <Flower />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Compte à rebours (demande du brief) ---------- */
const DEADLINE = new Date("2026-08-31T15:00:00+02:00");

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const s = Math.floor(diff / 1000);
  return {
    jours: Math.floor(s / 86400),
    heures: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    secondes: s % 60,
  };
}

export function Countdown() {
  const t = useCountdown(DEADLINE);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div
      className="flex flex-wrap justify-center gap-6 md:gap-16"
      role="timer"
      aria-label="Compte à rebours jusqu'au 31 août 2026"
    >
      {[
        ["Jours", t.jours],
        ["Heures", pad(t.heures)],
        ["Minutes", pad(t.minutes)],
        ["Secondes", pad(t.secondes)],
      ].map(([label, value]) => (
        <div className="flex min-w-[72px] flex-col items-center gap-2 md:min-w-[84px]" key={label}>
          <span className="font-fraunces text-num tabular-nums">{value}</span>
          <span className="text-sm text-black/40">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Section About ---------- */
const ABOUT_IMAGES = [
  "/images/venues/chateau-de-beauclair-1.jpg",
  "/images/venues/chateau-de-beauclair-2.jpg",
  "/images/venues/chateau-de-beauclair-3.webp",
  "/images/venues/chateau-de-beauclair-4.jpg",
  "/images/venues/chateau-de-beauclair-5.jpeg",
];

export function About() {
  return (
    <section className="flex flex-col items-center gap-14 py-[100px] md:gap-20 md:py-[180px]">
      <Reveal className="flex max-w-[770px] flex-col items-center gap-5 px-5 md:px-10">
        <Ornament />
        <p className="text-center font-display text-h4">
          Nous nous marions ! Le grand jour est fixé au 9 octobre 2026 et nous avons hâte d'y être.
          Découvrez dès maintenant le programme de la journée, le lieu et le dress code,
          puis confirmez votre présence pour faire la fête à nos côtés !
        </p>
      </Reveal>
      <Reveal>
        <Countdown />
      </Reveal>
      <Reveal>
        <Cta href="#rsvp">Confirmer ma présence</Cta>
      </Reveal>
      <div className="w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center motion-reduce:animate-none" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div className="flex items-center gap-[15px] pr-[15px] md:gap-[20px] md:pr-[20px]" key={copy}>
              {ABOUT_IMAGES.map((src) => (
                <img
                  key={`${src}-${copy}`}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] h-[320px] w-[240px] shrink-0 object-cover md:h-[420px] md:w-[320px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Programme du jour ---------- */
const PROGRAMME = [
  {
    time: "15h00",
    title: "Cérémonie religieuse",
    desc: "Rejoignez-nous pour la bénédiction nuptiale, entourés de nos familles et de ceux qui nous sont chers.",
  },
  {
    time: "17h00",
    title: "Vin d'honneur",
    desc: "Levons nos verres ensemble — un moment de partage, de douceurs et de retrouvailles dans les jardins du château.",
  },
  {
    time: "19h00",
    title: "Réception",
    desc: "Dîner, discours et soirée dansante : la fête se poursuit jusqu'au bout de la nuit pour célébrer notre union.",
  },
];

export function Schedule() {
  return (
    <section className="py-[100px] md:py-[180px]" id="programme">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 md:gap-20 md:px-10">
        <Reveal className="flex flex-col items-center gap-5">
          <Ornament />
          <h2 className="text-center font-fraunces text-h2">Le programme du jour</h2>
        </Reveal>
        <div className="flex w-full flex-col gap-8 md:gap-10">
          {PROGRAMME.map((item, i) => (
            <Reveal
              key={item.time}
              className={`grid grid-cols-1 items-start gap-3 sm:grid-cols-[100px_1fr] sm:gap-10 lg:grid-cols-[160px_1fr_1.2fr] ${
                i < PROGRAMME.length - 1 ? "border-b border-black/20 pb-8 md:pb-10" : ""
              }`}
            >
              <span className="font-fraunces text-[26px] italic text-or md:text-b34">
                {item.time}
              </span>
              <h3 className="font-fraunces text-h3">{item.title}</h3>
              <p className="max-w-[490px] text-base leading-[22px] text-black/70 sm:col-start-2 lg:col-start-auto">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
