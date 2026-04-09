const C = {
  white: "#FFFFFF", sand: "#F5EFE0",
  earth: "#8B3A0F", ocre: "#D4721A", rose: "#C25773",
  text: "#1C2B1A", textMid: "#4A3A28",
};

const steps = [
  {
    title: "Regardez dans le miroir, bras le long du corps",
    text: "Observez la forme, la taille, la symétrie. Notez tout changement inhabituel de la peau ou du mamelon.",
  },
  {
    title: "Levez les bras au-dessus de la tête",
    text: "Vérifiez que la peau suit normalement le mouvement — aucune rétraction, aucune fossette.",
  },
  {
    title: "Palper debout, avec les doigts à plat",
    text: "En mouvements circulaires, de l'extérieur vers le mamelon. Couvrir toute la surface.",
  },
  {
    title: "Palper allongée, coussin sous l'épaule",
    text: "Facilite la palpation du tissu profond. Répéter des deux côtés avec attention.",
  },
  {
    title: "Vérifier mamelon et aisselles",
    text: "Pression douce sur le mamelon — aucun écoulement ne doit apparaître. Palper aussi les ganglions.",
  },
];

export function StepsSection() {
  return (
    <section style={{ background: C.white, padding: "5rem 4rem" }}>
      <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.8rem", fontFamily: "'Lora', serif" }}>
        Auto-examen mensuel
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px" }}>
        5 gestes à faire <em style={{ fontStyle: "italic", color: C.earth }}>chaque mois</em>
      </h2>

      <div className="flex flex-col gap-3 mt-10">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-6 items-start rounded-2xl p-6" style={{ background: C.sand, border: "0.5px solid rgba(139,58,15,0.08)" }}>
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ minWidth: 42, height: 42, borderRadius: "50%", background: C.earth, color: C.white, fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700 }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.text, fontWeight: 600, marginBottom: 6 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, fontFamily: "'Lora', serif" }}>
                {step.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}