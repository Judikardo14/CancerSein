import { useEffect, useMemo, useRef, useState } from "react";

const C = {
  white: "#F8F9FA", sand: "#F8F9FA",
  earth: "#1B263B", ocre: "#415A77", rose: "#E5989B",
  text: "#1B263B", textMid: "#415A77",
};

const steps = [
  {
    title: "Regardez dans le miroir, bras le long du corps",
    text: "Observez la forme, la taille, la symétrie. Notez tout changement inhabituel de la peau ou du mamelon.",
  },
  {
    title: "Levez les bras au-dessus de la tête",
    text: "Vérifiez que la peau suit normalement le mouvement — aucune rétraction, aucune fossette.",
  },
  {
    title: "Palper debout, avec les doigts à plat",
    text: "En mouvements circulaires, de l'extérieur vers le mamelon. Couvrir toute la surface.",
  },
  {
    title: "Palper allongée, coussin sous l'épaule",
    text: "Facilite la palpation du tissu profond. Répéter des deux côtés avec attention.",
  },
  {
    title: "Vérifier mamelon et aisselles",
    text: "Pression douce sur le mamelon — aucun écoulement ne doit apparaître. Palper aussi les ganglions.",
  },
];

export function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([0]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mq.matches);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.stepIndex);
          if (!Number.isNaN(idx) && entry.isIntersecting) {
            setActiveStep(idx);
            setVisibleSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { root: null, threshold: 0.55, rootMargin: "-12% 0px -20% 0px" },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progress = useMemo(() => Math.round(((activeStep + 1) / steps.length) * 100), [activeStep]);

  return (
    <section aria-labelledby="steps-title" style={{ background: C.white, padding: "5rem 4rem" }} className="apple-section oil-paint">
      <div style={{ fontSize: 12, color: C.rose, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.8rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Auto-examen mensuel
      </div>
      <h2 id="steps-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: C.text, lineHeight: 1.2, letterSpacing: "-0.5px" }}>
        5 gestes à faire <em style={{ fontStyle: "italic", color: C.earth }}>chaque mois</em>
      </h2>

      <div aria-live="polite" style={{ marginTop: "1.25rem", maxWidth: 640 }}>
        <div style={{ fontSize: 12, color: C.textMid, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8 }}>
          Etape {activeStep + 1} / {steps.length} - {progress}%
        </div>
        <div style={{ height: 10, background: "rgba(65,90,119,0.14)", borderRadius: 999, overflow: "hidden", boxShadow: "inset 0 1px 2px rgba(27,38,59,0.08)" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${C.ocre} 0%, ${C.rose} 100%)`,
              borderRadius: 999,
              transition: reducedMotion ? "none" : "width 500ms ease",
              boxShadow: "0 0 22px rgba(229,152,155,0.26)",
            }}
          />
        </div>
      </div>

      <ol className="flex flex-col gap-3 mt-10" style={{ listStyle: "none", padding: 0, marginBottom: 0 }}>
        {steps.map((step, i) => (
          <li
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-step-index={i}
            aria-current={activeStep === i ? "step" : undefined}
            className="flex gap-6 items-start rounded-[24px] p-6 apple-hover glass-panel"
            style={{
              background: activeStep === i ? "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,249,250,0.82))" : "rgba(248,249,250,0.74)",
              border: activeStep === i ? "1px solid rgba(65,90,119,0.34)" : "0.5px solid rgba(65,90,119,0.22)",
              opacity: visibleSteps.includes(i) ? 1 : 0.45,
              transform: reducedMotion ? "none" : visibleSteps.includes(i) ? "translateY(0)" : "translateY(14px)",
              transition: reducedMotion ? "none" : "opacity 420ms ease, transform 420ms ease, border-color 300ms ease",
              boxShadow: activeStep === i ? "0 18px 40px rgba(27,38,59,0.14)" : "none",
            }}
          >
            <div className="flex items-center justify-center flex-shrink-0"
              style={{ minWidth: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #1B263B 0%, #415A77 100%)", color: C.white, fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, boxShadow: "0 14px 28px rgba(27,38,59,0.16)", border: "1px solid rgba(255,255,255,0.18)" }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.text, fontWeight: 600, marginBottom: 6 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {step.text}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}