import { Link } from "react-router";

const C = {
  forest: "#1C2B1A",
  gold: "#C9973A",
  rose: "#C25773",
  roseDark: "#9E3D57",
  earth: "#8B3A0F",
  sand: "#F5EFE0",
  white: "#FFFFFF",
  text: "#1C2B1A",
  textSoft: "#9A866A",
};

export function NotFound() {
  return (
    <main
      style={{ background: C.forest, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="text-center flex flex-col items-center gap-6 px-8">
        <div
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 96, fontWeight: 700, color: C.gold, lineHeight: 1, opacity: 0.2 }}
        >
          404
        </div>
        <h1
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: C.white, lineHeight: 1.2 }}
        >
          Page introuvable
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontFamily: "'Lora', serif", lineHeight: 1.8, maxWidth: 360 }}>
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full"
          style={{
            background: C.rose,
            color: C.white,
            textDecoration: "none",
            fontFamily: "'Lora', serif",
            fontSize: 15,
            padding: "13px 32px",
          }}
        >
          Retour à l'accueil →
        </Link>
      </div>
    </main>
  );
}