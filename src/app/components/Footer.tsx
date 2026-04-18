import { Link } from "react-router";

const C = {
  forest: "#1C2B1A",
  gold: "#C9973A",
  white: "#FFFFFF",
  ocre: "#D4721A",
};

const footerLinks = [
  { label: "Accueil", to: "/" },
  { label: "Évaluation", to: "/evaluation" },
  { label: "Prévention", to: "/prevention" },
  { label: "À propos", to: "/a-propos" },
];

export function Footer() {
  return (
    <footer style={{ background: C.forest }}>
      <div className="px-8 md:px-16 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              color: C.white,
              fontWeight: 700,
            }}
          >
            Math<span style={{ color: C.gold }}>Care</span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              fontStyle: "italic",
              fontFamily: "'Lora', serif",
              lineHeight: 1.6,
            }}
          >
            La mathématique au service de la vie.
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              fontSize: 10,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: C.gold,
              fontFamily: "'Lora', serif",
              marginBottom: 4,
            }}
          >
            Navigation
          </div>
          {footerLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                fontFamily: "'Lora', serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.gold)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3">
          <div
            style={{
              fontSize: 10,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: C.gold,
              fontFamily: "'Lora', serif",
              marginBottom: 4,
            }}
          >
            À propos du projet
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'Lora', serif",
              lineHeight: 1.7,
            }}
          >
            Projet académique développé à l'UNSTIM (Bénin) pour améliorer le dépistage précoce du cancer du sein en Afrique de l'Ouest.
          </p>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Lora', serif",
              marginTop: 4,
            }}
          >
            Marguérite ASSOU · 2026
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          padding: "1.2rem 4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'Lora', serif" }}>
          © 2026 Anontché · Bénin · UNSTIM — Outil de dépistage non diagnostique
        </span>
      </div>
    </footer>
  );
}
