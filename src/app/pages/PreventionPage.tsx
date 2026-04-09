import { PreventionSection } from "../components/PreventionSection";
import { StepsSection } from "../components/StepsSection";
import { MythsSection } from "../components/MythsSection";

const C = {
  forest: "#1C2B1A",
  gold: "#C9973A",
  white: "#FFFFFF",
  ocre: "#D4721A",
  earth: "#8B3A0F",
  sand: "#F5EFE0",
  text: "#1C2B1A",
};

export function PreventionPage() {
  return (
    <main>
      {/* Page header */}
      <div style={{ background: C.forest, padding: "5rem 4rem" }}>
        <div
          style={{
            fontSize: 11,
            color: C.gold,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "'Lora', serif",
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
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Lora', serif",
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
