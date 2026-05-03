import { PreventionSection } from "../components/PreventionSection";
import { StepsSection } from "../components/StepsSection";
import { MythsSection } from "../components/MythsSection";

const C = {
  forest: "#1B263B",
  gold: "#E5989B",
  white: "#F8F9FA",
  ocre: "#415A77",
  earth: "#1B263B",
  sand: "#F8F9FA",
  text: "#1B263B",
};

export function PreventionPage() {
  return (
    <main>
      {/* Page header */}
      <div style={{ background: C.forest, padding: "5rem 4rem" }} className="oil-paint">
        <div
          style={{
            fontSize: 11,
            color: C.gold,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: "0.8rem",
          }}
        >
          Prévention & Éducation
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 50px)",
            fontWeight: 700,
            color: C.white,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            maxWidth: 600,
          }}
        >
          Savoir pour{" "}
          <em style={{ fontStyle: "italic", color: C.gold }}>mieux protéger</em>
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.78)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.8,
            maxWidth: 520,
            marginTop: "1.2rem",
          }}
        >
          Guides, auto-examen mensuel, et démystification des idées reçues — pour toutes les femmes du Bénin.
        </p>
      </div>

      <PreventionSection />
      <StepsSection />
      <MythsSection />
    </main>
  );
}
