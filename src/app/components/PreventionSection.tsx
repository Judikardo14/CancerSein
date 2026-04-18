import { ArrowRight } from "lucide-react";

const C = {
  ocrePale: "#F8F9FA", ocre: "#415A77", rose: "#E5989B",
  earth: "#1B263B", sand: "#F8F9FA",
  text: "#1B263B", textMid: "#415A77", textSoft: "#6C7E95",
  white: "#F8F9FA", gold: "#E5989B",
};

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C12 21 4 14 4 9a8 8 0 0116 0c0 5-8 12-8 12z" stroke="#1B263B" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" stroke="#1B263B" strokeWidth="1.5" />
      </svg>
    ),
    title: "Les gestes essentiels de l'auto-examen",
    text: "Cinq gestes simples à faire chaque mois, illustrés pas à pas pour toutes les femmes.",
    link: "Voir le guide",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#415A77" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="#415A77" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.8" fill="#415A77" />
      </svg>
    ),
    title: "Les signes qui ne doivent pas attendre",
    text: "Masse, rougeur, écoulement — quels signes exigent une consultation immédiate.",
    link: "Lire les alertes",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#E5989B" strokeWidth="1.5" />
        <path d="M8 2v4M16 2v4M3 10h18" stroke="#E5989B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Calendrier de dépistage selon l'âge",
    text: "À quel âge consulter, à quelle fréquence — un guide clair pour chaque étape de la vie.",
    link: "Voir le calendrier",
  },
];

export function PreventionSection() {
  return (
    <section style={{ background: C.ocrePale, padding: "5rem 4rem" }}>
      <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.8rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Prévention & Éducation
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", maxWidth: 560, marginBottom: "0.8rem" }}>
        Comprendre pour <br /><em style={{ fontStyle: "italic", color: C.earth }}>agir à temps</em>
      </h2>
      <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.75, maxWidth: 520, marginBottom: "3rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Des ressources simples et accessibles à toutes les femmes — même sans bagage médical.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.title}
            className="flex flex-col gap-4 rounded-[18px] p-8 transition-transform duration-200 cursor-default"
            style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.1)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}>
            <div className="flex items-center justify-center w-12 h-12 rounded-[14px]" style={{ background: C.sand, border: "0.5px solid rgba(139,58,15,0.1)" }}>
              {card.icon}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.text, fontWeight: 600, lineHeight: 1.3 }}>
              {card.title}
            </div>
            <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {card.text}
            </div>
            <span className="flex items-center gap-1.5 mt-auto cursor-pointer" style={{ fontSize: 14, color: C.earth, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {card.link}
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}