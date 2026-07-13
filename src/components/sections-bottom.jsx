import { useState } from "react";
import { Ornament, Cta, Reveal, Flower } from "./ui.jsx";

/* ---------- RSVP ---------- */
const PRESENCE_OPTIONS = [
  "Je serai présent(e) pour la bénédiction nuptiale et la réception",
  "Je serai présent(e) uniquement pour la réception",
  "Je suis invité(e) par la mariée",
  "Je suis invité(e) par le marié",
];

const fieldLabel = "text-sm text-black/70";
const fieldInput =
  "border-0 border-b border-black/20 bg-transparent py-2.5 font-fraunces text-lg outline-none transition-colors focus:border-or resize-y";

export function Rsvp() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    presence: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = import.meta.env.DEV
      ? "/api/rsvp"
      : import.meta.env.VITE_RSVP_WEBAPP_URL?.trim();
    if (!endpoint) {
      setError(
        "L’envoi vers la feuille Google n’est pas encore configuré. Ajoutez VITE_RSVP_WEBAPP_URL à votre fichier d’environnement."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || `Échec de l’envoi (${response.status}).`);
      }

      setSent(true);
    } catch (err) {
      setError(err.message || "Impossible d’enregistrer votre réponse pour le moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pb-25 md:pb-45" id="rsvp">
      <Reveal className="flex flex-col items-center gap-5">
        <Ornament />
        <h2 className="text-center font-fraunces text-h2">Pouvons-nous compter sur vous&nbsp;?</h2>
      </Reveal>
      <div className="mt-20 mx-auto flex w-full max-w-360 flex-col gap-8 px-5 md:px-10 lg:flex-row lg:gap-15">
        <div className="flex flex-1 flex-col justify-between gap-6">
          <img
            src="/images/hero/bg-hero-cover-2.jpeg"
            alt=""
            loading="lazy"
            className="aspect-47/60 w-full max-w-142.5 object-cover bg-center"
          />
        </div>
        <div className="flex flex-1 flex-col gap-8 md:gap-10 pt-10">
          {sent ? (
            <Reveal>
              <h3 className="font-fraunces text-h3">Merci&nbsp;!</h3>
              <p className="mt-4 font-fraunces text-lg leading-6">
                Votre réponse a bien été enregistrée et ajoutée à la feuille de présence.
              </p>
            </Reveal>
          ) : (
            <form className="flex flex-col gap-8 md:gap-10" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2.5">
                <span className={fieldLabel}>Nom &amp; prénom*</span>
                <input
                  className={fieldInput}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="flex flex-col gap-2.5">
                <span className={fieldLabel}>Email*</span>
                <input
                  className={fieldInput}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </label>
              <div className="flex flex-col gap-2.5">
                <span className={fieldLabel}>Votre présence*</span>
                <div className="flex flex-col gap-3.5">
                  {PRESENCE_OPTIONS.map((opt) => (
                    <label
                      className="flex cursor-pointer items-start gap-3 font-fraunces text-lg leading-6"
                      key={opt}
                    >
                      <input
                        className="mt-0.5 size-[18px] flex-none cursor-pointer accent-or"
                        type="radio"
                        name="presence"
                        value={opt}
                        checked={formData.presence === opt}
                        onChange={handleChange}
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2.5">
                <span className={fieldLabel}>Informations complémentaires</span>
                <textarea
                  className={fieldInput}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <p className="text-base font-medium text-or">
                Réponses attendues avant le 31 août 2026
              </p>
              <Cta className="w-full" type="submit" disabled={submitting || !formData.name || !formData.email || !formData.presence}>
                {submitting ? "Envoi en cours..." : "Envoyer ma réponse"}
              </Cta>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQ_ITEMS = [
  {
    q: "Les enfants sont-ils invités ?",
    a: "Avis aux mini-invités : vous êtes officiellement réquisitionnés pour une soirée pyjama. Pendant ce temps, vos parents auront pour mission de célébrer notre mariage, de danser, de rire et de profiter de la fête.",
  },
  {
    q: "À quelle heure faut-il arriver ?",
    a: "Nous vous conseillons d'arriver 15 à 30 minutes avant le début de la cérémonie religieuse (15h00) afin de vous installer sereinement.",
  },
  {
    q: "Puis-je venir accompagné(e) ?",
    a: "Les accompagnants sont les bienvenus s'ils figurent sur votre invitation. En cas de doute, contactez Aby ou Judith pour confirmer.",
  },
  {
    q: "Y a-t-il un parking sur place ?",
    a: "Oui, un parking est disponible au Château de Beauclair. Suivez la signalétique à votre arrivée.",
  },
  {
    q: "Quand faut-il répondre ?",
    a: "Merci de confirmer votre présence avant le 31 août 2026 via le formulaire de ce site.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/20">
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-7 text-left text-white"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-fraunces text-xl md:text-h5">{q}</span>
        <svg
          className={`size-3.5 flex-none text-or-soft transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M7 0v14M0 7h14" />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-[450ms] ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-10 pb-7 font-fraunces text-lg leading-[26px] text-white/70">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="bg-noir text-white" id="faq">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 py-[100px] md:gap-20 md:px-10 md:py-[120px] xl:px-[170px]">
        <Reveal className="flex flex-col items-center gap-5">
          <Ornament />
          <h2 className="text-center font-fraunces text-h2">Quelques informations utiles</h2>
        </Reveal>
        <div className="flex w-full max-w-[850px] flex-col">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dress code ---------- */
const DRESS_CARDS = [
  {
    text: "Une tenue élégante et raffinée est encouragée — costume, robe de cocktail ou tenue de cérémonie.",
    img: "/images/dresscode/dresscode-homme.jpg",
    pos: "lg:top-0 lg:left-0",
  },
  {
    text: "Inspirez-vous de notre palette : or, rose et rose pastel, pour une harmonie douce et lumineuse.",
    img: "/images/dresscode/palette.jpg",
    pos: "lg:bottom-50 lg:left-1/2 lg:-translate-x-1/2",
  },
  {
    text: "Pas de code strict — portez ce qui vous met en valeur. Une seule demande : merci de réserver le blanc à la mariée.",
    img: "/images/dresscode/dresscode-femme-2.jpg",
    pos: "lg:top-[420px] lg:right-0",
  },
];

export function DressCode() {
  return (
    <section className="py-[100px] md:py-[180px]" id="dresscode">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col items-center gap-5 pb-14 md:pb-20 lg:sticky lg:top-[100px] lg:z-0">
          <Ornament />
          <h2 className="text-center font-fraunces text-h2">Quelle tenue porter</h2>
        </div>
        <div className="relative z-[1] flex flex-col items-center gap-14 lg:block lg:h-[1680px]">
          {DRESS_CARDS.map((card, i) => (
            <Reveal
              key={card.img}
              className={`flex w-full max-w-[380px] flex-col gap-5 lg:absolute ${card.pos}`}
            >
              <img
                src={card.img}
                alt=""
                loading="lazy"
                className="aspect-[38/48] w-full object-cover"
              />
              <p className="font-fraunces text-lg leading-[26px] text-black/70">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer (composant Footer du projet Framer) ---------- */
export function Footer() {
  return (
    <footer className="bg-mainbg pt-[100px] pb-[30px] md:pt-[120px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-14 px-5 md:gap-[70px] md:px-10">
        <h2 className="w-full text-center font-display text-h1">
          Jean <span className="font-script text-or">&amp;</span> Jelva
        </h2>
        <div className="flex max-w-[900px] flex-wrap items-center justify-center gap-4 md:gap-[30px]">
          <span className="font-fraunces text-lg leading-6">Vendredi 9 Octobre 2026</span>
          <Flower />
          <span className="font-fraunces text-lg leading-6">Château de Beauclair, Loiret</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm uppercase tracking-[0.14em] text-black/40">
            Une question ? Contactez-nous
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-2">
            <a
              className="font-fraunces text-lg leading-6 transition-colors hover:text-or"
              href="tel:+33648151822"
            >
              Aby — 06 48 15 18 22
            </a>
            |
            <a
              className="font-fraunces text-lg leading-6 transition-colors hover:text-or"
              href="tel:+33613272485"
            >
              Judith — 06 13 27 24 85
            </a>
          </div>
        </div>
        <p className="w-full text-center text-base text-black/40">2026 © Made by Ratel Labs</p>
      </div>
    </footer>
  );
}
