const C = {
  earth: "#8B3A0F",
  gold: "#C9973A",
  white: "#FFFFFF",
};

const items = [
  { num: "48", unit: " ans", desc: "âge moyen au diagnostic — souvent trop tard" },
  { num: "<30", unit: "s", desc: "pour une évaluation complète du risque" },
  { num: "0", unit: " km", desc: "l'outil vient là où se trouvent les femmes" },
];

export function StatsBand() {
  return (
    <div style={{ background: C.earth }}>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ padding: "3.5rem 4rem", gap: "0" }}>
        {items.map((item, i) => (
          <div
            key={item.num}
            className="flex flex-col"
            style={{
              paddingRight: "2rem",
              paddingBottom: "2rem",
              borderRight: i < items.length - 1 ? "0.5px solid rgba(255,255,255,0.12)" : "none",
              paddingLeft: i > 0 ? "2rem" : 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 46,
                fontWeight: 700,
                color: C.white,
                lineHeight: 1,
              }}
            >
              {item.num}
              <span style={{ color: C.gold }}>{item.unit}</span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.55,
                marginTop: 6,
                maxWidth: 180,
                fontFamily: "'Lora', serif",
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
