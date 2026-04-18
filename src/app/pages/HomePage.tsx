import { Link } from "react-router";
import { Dna, ScanLine, BookOpen, Hospital, HeartPulse, Wallet, Clock3 } from "lucide-react";
import { StatsBand } from "../components/StatsBand";

const C = {
  forest: "#1B263B", forestMid: "#415A77",
  gold: "#E5989B", goldLight: "#E8AEB1",
  rose: "#E5989B", roseDark: "#C97B82", roseMid: "#E8AEB1",
  ocre: "#415A77", earthLight: "#415A77", earth: "#1B263B",
  sand: "#F8F9FA", sandDeep: "#EEF2F6",
  white: "#F8F9FA", textSoft: "#6C7E95", text: "#1B263B", textMid: "#415A77",
};

const heroStats = [
  { num: "7/10", label: "diagnostics trop tardifs" },
  { num: "40%",  label: "survie à 5 ans au Bénin" },
  { num: "87%",  label: "avec dépistage précoce" },
];

const reassuranceItems = [
  { icon: <HeartPulse size={18} />, title: "Douleur", text: "Évaluation non invasive, sans douleur physique." },
  { icon: <Wallet size={18} />, title: "Coût", text: "Utilisation gratuite, sans abonnement obligatoire." },
  { icon: <Clock3 size={18} />, title: "Durée", text: "Parcours initial en moins de 30 secondes." },
];

const features = [
  {
    icon: <Dna size={24} color={C.earth} />,
    title: "Données cliniques",
    desc: "Renseignez vos paramètres médicaux (âge, antécédents, symptômes) pour une évaluation immédiate.",
    link: "/evaluation",
    cta: "Démarrer le test →",
  },
  {
    icon: <ScanLine size={24} color={C.ocre} />,
    title: "Analyse d'image radio",
    desc: "Importez une mammographie et laissez notre algorithme identifier les zones à surveiller.",
    link: "/evaluation",
    cta: "Analyser une image →",
  },
  {
    icon: <BookOpen size={24} color={C.gold} />,
    title: "Prévention & Éducation",
    desc: "Guides d'auto-examen, calendriers de dépistage, et démystification des idées reçues.",
    link: "/prevention",
    cta: "Voir les guides →",
  },
];

const modes = [
  { icon: <Dna size={20} color={C.white} />, title: "Données cliniques",      desc: "Formulaire médical · Résultat en 30s", color: C.earth },
  { icon: <ScanLine size={20} color={C.white} />, title: "Image radiographique", desc: "Upload mammographie · Détection IA",  color: C.forestMid },
];

export function HomePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: `radial-gradient(1000px 550px at 8% 8%, rgba(232,174,177,0.22) 0%, transparent 60%), radial-gradient(900px 500px at 92% 14%, rgba(194,207,222,0.3) 0%, transparent 62%), ${C.forest}`, minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute" style={{ right: "-10%", top: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(194,87,115,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="absolute" style={{ left: "-5%", bottom: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,151,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-16 py-20">
          <div className="flex flex-col gap-8 justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit rounded-full" style={{ background: "rgba(194,87,115,0.12)", border: "0.5px solid rgba(194,87,115,0.3)", color: C.roseMid, fontSize: 12, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "6px 16px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.roseMid, display: "inline-block", flexShrink: 0 }} />
              Dépistage intelligent — Bénin 2026
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 5.5vw, 68px)", fontWeight: 700, color: C.white, lineHeight: 1.1, letterSpacing: "-1.5px", margin: 0 }}>
              Le concept<br />
              qui <em style={{ fontStyle: "italic", color: C.gold }}>protège</em><br />
              nos femmes
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.70)", maxWidth: 460, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Anontché utilise l'intelligence artificielle pour prédire le risque de cancer du sein — accessible à toutes, partout au Bénin, sans délai.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link to="/evaluation" className="inline-block rounded-full transition-all duration-200"
                style={{ background: C.rose, color: C.white, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, padding: "15px 32px" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.roseDark)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = C.rose)}>
                Évaluer mon risque
              </Link>
              <Link to="/prevention" className="inline-block rounded-full transition-all duration-200"
                style={{ color: C.gold, border: "0.5px solid rgba(201,151,58,0.5)", textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, padding: "15px 30px", background: "transparent" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,151,58,0.1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                En savoir plus
              </Link>
            </div>

            <div className="flex gap-10 flex-wrap pt-6" style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)" }}>
              {heroStats.map((s) => (
                <div key={s.num} className="flex flex-col gap-1 breath">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.gold }}>{s.num}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.4, maxWidth: 90, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="hidden lg:flex flex-col gap-5 justify-center">
            <div className="rounded-2xl p-6 flex flex-col gap-4 glass-card depth-shadow" style={{ background: "rgba(248,249,250,0.12)", border: "0.5px solid rgba(255,255,255,0.28)" }}>
              <div style={{ fontSize: 12, color: C.gold, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Deux modes d'analyse
              </div>
              {modes.map((m) => (
                <div key={m.title} className="rounded-xl px-5 py-4 flex items-center gap-4" style={{ background: "rgba(248,249,250,0.14)", border: `0.5px solid ${m.color}55` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.white, fontWeight: 600 }}>{m.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.76)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/evaluation" className="text-center rounded-full py-3 transition-all duration-200 block"
                style={{ background: C.rose, color: C.white, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, marginTop: 4 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.roseDark)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = C.rose)}>
                Lancer une évaluation →
              </Link>
            </div>

            <div className="rounded-xl px-5 py-4 flex items-center gap-4" style={{ background: "rgba(201,151,58,0.08)", border: "0.5px solid rgba(201,151,58,0.2)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,151,58,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Hospital size={20} color={C.gold} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: C.white, fontWeight: 600 }}>Projet Scientifique MISS UNSTIM 2026</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.76)", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "inline-flex", alignItems: "center" }}>
                  <span style={{ marginRight: 4 }}>Par</span>
                  <span style={{ marginRight: 4 }}>Marguérite</span>
                  <span>ASSOU</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-16 pt-8 pb-2" style={{ background: C.sand }}>
        <div className="mx-auto w-full max-w-6xl">
          <div style={{ fontSize: 12, color: C.textSoft, letterSpacing: "1.6px", textTransform: "uppercase", marginBottom: "0.9rem", fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: "center" }}>
            Une première réponse claire
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {reassuranceItems.map((item) => (
              <div key={item.title} className="glass-card depth-shadow rounded-2xl p-6 h-full flex items-start gap-3" style={{ background: "rgba(248,249,250,0.7)", border: "0.5px solid rgba(255,255,255,0.6)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(27,38,59,0.08)", color: C.earth, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.text, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
                  <p style={{ margin: 0, fontSize: 14, color: C.textMid, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      {/* ── FEATURE CARDS ── */}
      <section style={{ background: C.sand, padding: "5rem 4rem" }}>
        <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.8rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Nos outils
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 3vw, 42px)", fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "3rem" }}>
          Tout ce qu'il vous faut <em style={{ fontStyle: "italic", color: C.earth }}>pour agir</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link key={f.title} to={f.link} style={{ textDecoration: "none" }}>
              <div className="flex flex-col gap-5 rounded-2xl p-8 h-full transition-transform duration-200 cursor-pointer"
                style={{ background: "rgba(248,249,250,0.6)", border: "0.5px solid rgba(255,255,255,0.5)", boxShadow: "0 16px 38px rgba(65,90,119,0.16)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: C.sand, display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid rgba(139,58,15,0.1)" }}>
                  {f.icon}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: C.text }}>{f.title}</div>
                <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans', sans-serif", flexGrow: 1 }}>{f.desc}</div>
                <span style={{ fontSize: 14, color: C.rose, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── URGENCY BANNER ── */}
      <section style={{ background: `linear-gradient(135deg, ${C.roseDark} 0%, ${C.rose} 50%, ${C.ocre} 100%)`, padding: "4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: C.white, lineHeight: 1.35, marginBottom: "2rem" }}>
          Chaque jour sans dépistage est un jour de trop.
          <br />
          <em style={{ fontWeight: 400, fontSize: "0.75em", color: "rgba(255,255,255,0.85)" }}>Un test prend moins de 30 secondes.</em>
        </p>
        <Link to="/evaluation" className="inline-block rounded-full transition-all duration-200"
          style={{ background: C.white, color: C.roseDark, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 38px" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}>
          Commencer maintenant →
        </Link>
      </section>
    </main>
  );
}