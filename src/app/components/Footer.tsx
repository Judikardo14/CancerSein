import { Link } from "react-router";

const C = {
  forest: "#1B263B",
  gold: "#E5989B",
  white: "#F8F9FA",
  ocre: "#415A77",
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
            Anon<span style={{ color: C.gold }}>tché</span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              fontStyle: "italic",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Les mathématiques au service de la vie.
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: 4,
            }}
          >
            À propos du projet
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 1.7,
            }}
          >
            Projet Scientifique Miss UNSTIM{"\u00A0"}2026
          </p>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginTop: 4,
            }}
          >
           <span style={{ display: "inline-flex", alignItems: "center" }}>
             <span style={{ marginRight: 4 }}>Par</span>
             <span style={{ marginRight: 4 }}>Marguérite</span>
             <span>ASSOU</span>
           </span>
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
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          © 2026 Anontché · Bénin · UNSTIM — Outil de dépistage non diagnostique
        </span>
      </div>
    </footer>
  );
}
