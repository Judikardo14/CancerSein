import { Link } from "react-router";
import { Globe, FlaskConical, HandHeart, ShieldCheck } from "lucide-react";

const C = {
  forest: "#1C2B1A", forestMid: "#2E4A2C",
  gold: "#C9973A", rose: "#C25773", roseDark: "#9E3D57",
  ocre: "#D4721A", earthLight: "#B85A2A", earth: "#8B3A0F",
  sand: "#F5EFE0", sandDeep: "#EDE3CC", ocrePale: "#FAF3E6",
  white: "#FFFFFF", text: "#1C2B1A", textMid: "#4A3A28", textSoft: "#7A6A55",
};

const timeline = [
  { year: "2024", event: "Identification du problème — taux de diagnostic tardif au Bénin", color: C.earth },
  { year: "2025", event: "Recherche des données épidémiologiques et construction du modèle prédictif", color: C.rose },
  { year: "2025", event: "Développement du prototype de l'outil clinique", color: C.gold },
  { year: "2026", event: "Lancement de Anontché v2 — avec analyse d'image radiographique", color: C.forestMid },
];

const values = [
  { icon: <Globe size={22} color={C.earth} />,        title: "Accessibilité",        text: "Conçu pour fonctionner sans infrastructure médicale avancée, au cœur du Bénin." },
  { icon: <FlaskConical size={22} color={C.ocre} />,  title: "Rigueur scientifique", text: "Modèles basés sur les données épidémiologiques de l'Afrique de l'Ouest." },
  { icon: <HandHeart size={22} color={C.rose} />,     title: "Humanité",             text: "Chaque fonctionnalité est pensée pour les femmes, avec et pour elles." },
  { icon: <ShieldCheck size={22} color={C.gold} />,   title: "Confidentialité",      text: "Aucune donnée n'est enregistrée. L'outil tourne entièrement côté client." },
];

export function AboutPage() {
  return (
    <main>
      {/* ── HEADER ── */}
      <div style={{ background: C.forest, padding: "5rem 4rem" }}>
        <div style={{ fontSize: 12, color: C.gold, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Lora', serif", marginBottom: "0.8rem" }}>
          À propos
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 700, color: C.white, lineHeight: 1.15, letterSpacing: "-0.5px", maxWidth: 600 }}>
          La <em style={{ fontStyle: "italic", color: C.gold }}>mission</em> derrière Anontché
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.70)", fontFamily: "'Lora', serif", lineHeight: 1.8, maxWidth: 520, marginTop: "1.2rem" }}>
          Un outil né d'un constat brutal : au Bénin, 7 cancers du sein sur 10 sont diagnostiqués trop tard. Anontché est la réponse mathématique à cette réalité.
        </p>
      </div>

      {/* ── MISSION ── */}
      <section style={{ background: C.sand, padding: "5rem 4rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Lora', serif", marginBottom: "0.8rem" }}>Notre mission</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "1.5rem" }}>
              Mettre la science au service <em style={{ fontStyle: "italic", color: C.earth }}>des mères africaines</em>
            </h2>
            <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.85, fontFamily: "'Lora', serif", marginBottom: "1rem" }}>
              Le cancer du sein est la première cause de décès par cancer chez les femmes africaines. Au Bénin, le manque d'outils de dépistage accessibles et le faible niveau de sensibilisation contribuent à des diagnostics tardifs, souvent au stade III ou IV.
            </p>
            <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.85, fontFamily: "'Lora', serif" }}>
              Anontché est un outil de dépistage intelligent, gratuit, disponible hors ligne, qui combine un formulaire clinique à un algorithme de prédiction du risque — et une analyse d'image radiographique pour démontrer la puissance de l'IA médicale appliquée à ce contexte.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "70%",    label: "des cancers diagnostiqués en phase avancée au Bénin" },
              { num: "87%",    label: "de taux de survie avec un dépistage précoce" },
              { num: "48 ans", label: "âge moyen au diagnostic, souvent trop tardif" },
              { num: "0 km",   label: "Anontché se déplace avec l'utilisatrice" },
            ].map((s) => (
              <div key={s.num} className="rounded-2xl p-5" style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.08)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: C.earth, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: C.textSoft, fontFamily: "'Lora', serif", lineHeight: 1.6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ background: C.white, padding: "5rem 4rem" }}>
        <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Lora', serif", marginBottom: "0.8rem" }}>Histoire du projet</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "3rem" }}>
          De l'idée à <em style={{ fontStyle: "italic", color: C.earth }}>l'outil</em>
        </h2>
        <div className="flex flex-col gap-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="flex flex-col items-center" style={{ minWidth: 60 }}>
                <div className="flex items-center justify-center rounded-full" style={{ width: 44, height: 44, background: item.color, flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: C.white, fontWeight: 700, letterSpacing: "-0.5px" }}>{item.year}</span>
                </div>
                {i < timeline.length - 1 && <div style={{ width: 1, height: 40, background: "rgba(139,58,15,0.12)" }} />}
              </div>
              <div style={{ paddingBottom: i < timeline.length - 1 ? "1.5rem" : 0, paddingTop: "0.65rem" }}>
                <p style={{ fontSize: 15, color: C.textMid, fontFamily: "'Lora', serif", lineHeight: 1.65 }}>{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: C.sandDeep, padding: "5rem 4rem" }}>
        <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Lora', serif", marginBottom: "0.8rem" }}>Nos valeurs</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "3rem" }}>
          Ce qui guide <em style={{ fontStyle: "italic", color: C.earth }}>chaque décision</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.08)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: C.sand, display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid rgba(139,58,15,0.1)" }}>
                {v.icon}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>{v.title}</div>
              <div style={{ fontSize: 14, color: C.textMid, fontFamily: "'Lora', serif", lineHeight: 1.7 }}>{v.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section style={{ background: C.ocrePale, padding: "5rem 4rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Lora', serif", marginBottom: "0.8rem" }}>L'auteure</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "1.2rem" }}>
              Marguérite ASSOU
            </h2>
            <p style={{ fontSize: 16, color: C.textMid, fontFamily: "'Lora', serif", lineHeight: 1.85, marginBottom: "0.8rem" }}>
              Étudiante chercheuse à l'Université Nationale des Sciences, Technologies, Ingénierie et Mathématiques (UNSTIM) du Bénin. Marguérite a développé Anontché dans le cadre de ses travaux sur l'application des mathématiques appliquées à la santé publique en Afrique subsaharienne.
            </p>
            <p style={{ fontSize: 16, color: C.textMid, fontFamily: "'Lora', serif", lineHeight: 1.85 }}>
              Convaincue que la technologie doit d'abord servir ceux qui en ont le plus besoin, elle continue d'enrichir l'outil avec de nouvelles données et partenariats cliniques.
            </p>
          </div>

          <div className="rounded-2xl p-8 flex flex-col gap-6" style={{ background: C.forest }}>
            <div style={{ fontSize: 52, color: C.gold, fontFamily: "'Playfair Display', serif", lineHeight: 1, opacity: 0.5 }}>"</div>
            <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontStyle: "italic", color: C.white, lineHeight: 1.6, margin: 0 }}>
              La mathématique n'est pas froide — elle peut être l'acte le plus humain qui soit, quand elle sert à sauver une vie.
            </blockquote>
            <div style={{ fontSize: 14, color: C.gold, fontFamily: "'Lora', serif" }}>
              — Marguérite ASSOU, UNSTIM Bénin, 2026
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.roseDark} 0%, ${C.rose} 50%, ${C.ocre} 100%)`, padding: "4rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: C.white, lineHeight: 1.35, marginBottom: "2rem" }}>
          Prêt à commencer votre évaluation ?
        </h2>
        <Link to="/evaluation" className="inline-block rounded-full transition-all duration-200"
          style={{ background: C.white, color: C.earth, textDecoration: "none", fontFamily: "'Lora', serif", fontSize: 16, fontWeight: 500, padding: "15px 38px" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}>
          Lancer l'évaluation →
        </Link>
      </section>
    </main>
  );
}