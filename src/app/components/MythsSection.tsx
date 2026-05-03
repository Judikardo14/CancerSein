const C = {
  sandDeep: "#EEF2F6",
  ocre: "#415A77",
  rose: "#E5989B",
  rosePale: "#F6E6E7",
  earth: "#1B263B",
  forestMid: "#415A77",
  text: "#1B263B",
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
    <section style={{ background: C.sandDeep, padding: "5rem 4rem" }} className="apple-section oil-paint">
      <div
        style={{
          fontSize: 11,
          color: C.rose,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "0.8rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pairs.map((pair) => (
          <div key={pair.myth} className="contents">
            {/* Myth */}
            <div
              className="rounded-[20px] px-6 py-5 glass-panel apple-hover"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(248,249,250,0.7))",
                border: "0.5px solid rgba(65,90,119,0.1)",
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
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Mythe
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.text,
                  lineHeight: 1.6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {pair.myth}
              </div>
            </div>

            {/* Reality */}
            <div
              className="rounded-[20px] px-6 py-5 glass-panel apple-hover"
              style={{
                background: "linear-gradient(180deg, rgba(246,230,231,0.86), rgba(246,230,231,0.72))",
                border: "0.5px solid rgba(229,152,155,0.18)",
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
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Réalité
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.text,
                  lineHeight: 1.6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {pair.reality}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}