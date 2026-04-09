const C = {
  ocrePale: "#FAF3E6", ocre: "#D4721A", rose: "#C25773",
  earth: "#8B3A0F", sand: "#F5EFE0",
  text: "#1C2B1A", textMid: "#4A3A28", textSoft: "#7A6A55",
  white: "#FFFFFF", gold: "#C9973A",
};

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C12 21 4 14 4 9a8 8 0 0116 0c0 5-8 12-8 12z" stroke="#8B3A0F" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" stroke="#8B3A0F" strokeWidth="1.5" />
      </svg>
    ),
    title: "Les gestes essentiels de l'auto-examen",
    text: "Cinq gestes simples à faire chaque mois, illustrés pas à pas pour toutes les femmes.",
    link: "Voir le guide →",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#D4721A" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="#D4721A" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.8" fill="#D4721A" />
      </svg>
    ),
    title: "Les signes qui ne doivent pas attendre",
    text: "Masse, rougeur, écoulement — quels signes exigent une consultation immédiate.",
    link: "Lire les alertes →",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#C9973A" strokeWidth="1.5" />
        <path d="M8 2v4M16 2v4M3 10h18" stroke="#C9973A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Calendrier de dépistage selon l'âge",
    text: "À quel âge consulter, à quelle fréquence — un guide clair pour chaque étape de la vie.",
    link: "Voir le calendrier →",
  },
];

export function PreventionSection() {
  return (
    <section style={{ background: C.ocrePale, padding: "5rem 4rem" }}>
      <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.8rem", fontFamily: "'Lora', serif" }}>
        Prévention & Éducation
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", maxWidth: 560, marginBottom: "0.8rem" }}>
        Comprendre pour <br /><em style={{ fontStyle: "italic", color: C.earth }}>agir à temps</em>
      </h2>
      <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.75, maxWidth: 520, marginBottom: "3rem", fontFamily: "'Lora', serif" }}>
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
            <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.75, fontFamily: "'Lora', serif" }}>
              {card.text}
            </div>
            <span className="flex items-center gap-1.5 mt-auto cursor-pointer" style={{ fontSize: 14, color: C.earth, fontWeight: 500, fontFamily: "'Lora', serif" }}>
              {card.link}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}