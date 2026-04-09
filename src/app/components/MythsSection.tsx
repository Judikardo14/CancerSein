const C = {
  sandDeep: "#EDE3CC",
  ocre: "#D4721A",
  rose: "#C25773",
  rosePale: "#FDF0F3",
  earth: "#8B3A0F",
  forestMid: "#2E4A2C",
  text: "#1C2B1A",
};

const pairs = [
  {
    myth: "« Le cancer du sein ne touche que les personnes âgées. »",
    reality: "Il peut survenir à tout âge. Au Bénin, des cas à 30 ans sont documentés.",
  },
  {
    myth: "« Sans antécédent familial, je ne risque rien. »",
    reality: "Plus de 85 % des cancers du sein surviennent sans aucun antécédent familial direct.",
  },
  {
    myth: "« Une masse indolore n'est pas dangereuse. »",
    reality: "La plupart des tumeurs malignes sont indolores. L'absence de douleur ne rassure pas.",
  },
  {
    myth: "« Consulter coûte trop cher, autant attendre. »",
    reality: "Un dépistage précoce réduit drastiquement les coûts de traitement — et sauve des vies.",
  },
];

export function MythsSection() {
  return (
    <section style={{ background: C.sandDeep, padding: "5rem 4rem" }}>
      <div
        style={{
          fontSize: 11,
          color: C.rose,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "0.8rem",
          fontFamily: "'Lora', serif",
        }}
      >
        Idées reçues
      </div>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32,
          fontWeight: 700,
          color: C.text,
          lineHeight: 1.2,
          letterSpacing: "-0.5px",
          marginBottom: "2.5rem",
        }}
      >
        Ce que l'on croit —
        <br />
        <em style={{ fontStyle: "italic", color: C.earth }}>et la réalité</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pairs.map((pair, i) => (
          <>
            {/* Myth */}
            <div
              key={`myth-${i}`}
              className="rounded-[14px] px-6 py-5"
              style={{
                background: "#FDF0E8",
                border: "0.5px solid rgba(212,114,26,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 8,
                  color: C.ocre,
                  fontFamily: "'Lora', serif",
                }}
              >
                Mythe
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.text,
                  lineHeight: 1.6,
                  fontFamily: "'Lora', serif",
                }}
              >
                {pair.myth}
              </div>
            </div>

            {/* Reality */}
            <div
              key={`reality-${i}`}
              className="rounded-[14px] px-6 py-5"
              style={{
                background: C.rosePale,
                border: "0.5px solid rgba(194,87,115,0.25)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 8,
                  color: C.rose,
                  fontFamily: "'Lora', serif",
                }}
              >
                Réalité
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.text,
                  lineHeight: 1.6,
                  fontFamily: "'Lora', serif",
                }}
              >
                {pair.reality}
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}