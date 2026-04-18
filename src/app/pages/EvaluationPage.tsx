import { useState, useRef, useCallback } from "react";
import { ArrowRight, AlertTriangle, BadgeDollarSign, Check, CheckCircle, ChevronDown, ChevronRight, Clock, Dna, Image, Info, Lock, UploadCloud, X } from "lucide-react";

const C = {
  forest: "#1B263B",
  forestMid: "#415A77",
  gold: "#E5989B",
  rose: "#E5989B",
  roseDark: "#C97B82",
  roseMid: "#E8AEB1",
  roseLight: "#F6E6E7",
  ocre: "#415A77",
  earthLight: "#415A77",
  earth: "#1B263B",
  sand: "#F8F9FA",
  sandDeep: "#EEF2F6",
  ocrePale: "#F8F9FA",
  white: "#F8F9FA",
  text: "#1B263B",
  textMid: "#415A77",
  textSoft: "#6C7E95",
};

// ── API URLs ────────────────────────────────────────────────────────
const CLINICAL_API = "https://judikardo-cancersein.hf.space/api/v1/predict/clinical";
const IMAGE_API    = "https://parfait60-breast-cancer-classification-api.hf.space/api/v1/predict/binary";
const IMAGE_API_KEY = import.meta.env.VITE_HF_IMAGE_API_KEY ?? "";

const inputStyle: React.CSSProperties = {
  background: C.sand,
  border: "0.5px solid rgba(139,58,15,0.18)",
  borderRadius: 10,
  padding: "10px 14px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 14,
  color: C.text,
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s",
};

// ── Types ────────────────────────────────────────────────────────────
type RiskLevel = "faible" | "modéré" | "élevé";

interface RiskResult {
  level: RiskLevel;
  pct: number;
  label: string;
  advice: string;
  prediction: string;
}

const riskConfig: Record<RiskLevel, { bg: string; icon: React.ReactNode }> = {
  élevé:  { bg: C.earth,     icon: <AlertTriangle size={20} color="#fff" /> },
  modéré: { bg: C.ocre,      icon: <Info size={20} color="#fff" /> },
  faible: { bg: C.forestMid, icon: <CheckCircle size={20} color="#fff" /> },
};

const adviceMap: Record<RiskLevel, string> = {
  élevé:  "Consultez un médecin ou une clinique dans les meilleurs délais. Une mammographie est fortement conseillée.",
  modéré: "Une surveillance régulière est recommandée. Parlez-en à votre médecin lors de votre prochain rendez-vous.",
  faible: "Continuez l'auto-examen mensuel et le dépistage selon votre calendrier d'âge.",
};

// ── FormField helper ────────────────────────────────────────────────
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: 11, color: C.textSoft, letterSpacing: "0.4px", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── AnalysisStep ────────────────────────────────────────────────────
function AnalysisStep({ label, delay }: { label: string; delay: number }) {
  const [done, setDone] = useState(false);
  useState(() => {
    const t = setTimeout(() => setDone(true), delay + 600);
    return () => clearTimeout(t);
  });
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: done ? C.rose : "rgba(194,87,115,0.15)", border: done ? "none" : "1.5px solid rgba(194,87,115,0.3)", flexShrink: 0, transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {done && <Check size={10} color="#fff" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: 13, color: done ? C.text : C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color 0.3s" }}>{label}</span>
    </div>
  );
}

// ── CLINICAL TAB ────────────────────────────────────────────────────
function ClinicalTab() {
  const [age,       setAge]       = useState("");
  const [menarche,  setMenarche]  = useState("");
  const [familial,  setFamilial]  = useState("0");
  const [breastfed, setBreastfed] = useState("oui");
  const [symptoms,  setSymptoms]  = useState("none");
  const [menopause, setMenopause] = useState("non");
  const [children,  setChildren]  = useState("oui");

  // Champs médicaux avancés (Wisconsin features)
  const [meanRadius,      setMeanRadius]      = useState("");
  const [meanTexture,     setMeanTexture]     = useState("");
  const [meanPerimeter,   setMeanPerimeter]   = useState("");
  const [meanArea,        setMeanArea]        = useState("");
  const [meanConcavity,   setMeanConcavity]   = useState("");
  const [showAdvanced,    setShowAdvanced]    = useState(false);

  const [result,  setResult]  = useState<RiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const canSubmit = [age, menarche, meanRadius, meanTexture, meanPerimeter, meanArea, meanConcavity]
    .some((v) => v.trim() !== "");

  // Valeurs moyennes Wisconsin par défaut (seront remplacées si renseignées)
  const DEFAULTS = {
    mean_radius: 14.13, mean_texture: 19.29, mean_perimeter: 91.97,
    mean_area: 654.89, mean_smoothness: 0.0964, mean_compactness: 0.1043,
    mean_concavity: 0.0888, mean_concave_points: 0.0489, mean_symmetry: 0.1812,
    mean_fractal_dimension: 0.0628, radius_error: 0.4052, texture_error: 1.2169,
    perimeter_error: 2.866, area_error: 40.34, smoothness_error: 0.007,
    compactness_error: 0.0255, concavity_error: 0.032, concave_points_error: 0.0118,
    symmetry_error: 0.0205, fractal_dimension_error: 0.0038, worst_radius: 16.27,
    worst_texture: 25.68, worst_perimeter: 107.26, worst_area: 880.58,
    worst_smoothness: 0.1323, worst_compactness: 0.2543, worst_concavity: 0.2722,
    worst_concave_points: 0.1146, worst_symmetry: 0.2902, worst_fractal_dimension: 0.0839,
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setResult(null);
    setError(null);

    // Construction du payload — on override les defaults si valeurs avancées renseignées
    const payload = {
      ...DEFAULTS,
      ...(meanRadius    ? { mean_radius:    parseFloat(meanRadius) }    : {}),
      ...(meanTexture   ? { mean_texture:   parseFloat(meanTexture) }   : {}),
      ...(meanPerimeter ? { mean_perimeter: parseFloat(meanPerimeter) } : {}),
      ...(meanArea      ? { mean_area:      parseFloat(meanArea) }      : {}),
      ...(meanConcavity ? { mean_concavity: parseFloat(meanConcavity) } : {}),
    };

    try {
      const res = await fetch(CLINICAL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Erreur API : ${res.status}`);

      const data = await res.json();
      const level = data.risk_level as RiskLevel;

      setResult({
        level,
        pct:        data.risk_percent,
        label:      level === "élevé" ? "Risque élevé" : level === "modéré" ? "Risque modéré" : "Risque faible",
        advice:     adviceMap[level],
        prediction: data.prediction,
      });
    } catch (e: any) {
      setError("Impossible de contacter l'API. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── FORM ── */}
      <div className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.1)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: C.earth, fontWeight: 600, paddingBottom: "0.8rem", borderBottom: "0.5px solid rgba(139,58,15,0.1)" }}>
          Formulaire clinique
        </div>

        {/* Champs de base */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Âge">
            <input type="number" placeholder="ex. 44" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.earth)}
              onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(139,58,15,0.18)")} />
          </FormField>
          <FormField label="Premières règles (âge)">
            <input type="number" placeholder="ex. 13" value={menarche} onChange={(e) => setMenarche(e.target.value)} style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = C.earth)}
              onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(139,58,15,0.18)")} />
          </FormField>
        </div>

        <FormField label="Antécédents familiaux">
          <select value={familial} onChange={(e) => setFamilial(e.target.value)} style={inputStyle}>
            <option value="0">Aucun antécédent connu</option>
            <option value="1">Un parent au 1er degré</option>
            <option value="2+">Plusieurs membres de la famille</option>
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Allaitement">
            <select value={breastfed} onChange={(e) => setBreastfed(e.target.value)} style={inputStyle}>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </FormField>
          <FormField label="Ménopause">
            <select value={menopause} onChange={(e) => setMenopause(e.target.value)} style={inputStyle}>
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Enfants">
            <select value={children} onChange={(e) => setChildren(e.target.value)} style={inputStyle}>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </FormField>
          <FormField label="Symptômes actuels">
            <select value={symptoms} onChange={(e) => setSymptoms(e.target.value)} style={inputStyle}>
              <option value="none">Aucun</option>
              <option value="mass">Masse palpable</option>
              <option value="discharge">Écoulement</option>
              <option value="pain">Douleur persistante</option>
            </select>
          </FormField>
        </div>

        {/* Section avancée — médecin */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
        >
          <div style={{ fontSize: 12, color: C.earth, fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
            {showAdvanced ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            Mesures cliniques (médecin / radiologue)
          </div>
        </button>

        {showAdvanced && (
          <div className="flex flex-col gap-4" style={{ padding: "1rem", background: C.ocrePale, borderRadius: 12, border: "0.5px solid rgba(139,58,15,0.12)" }}>
            <div style={{ fontSize: 11, color: C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}>
              Ces mesures proviennent d'une biopsie ou échographie. Si renseignées, elles améliorent la précision du modèle.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Rayon moyen (mm)">
                <input type="number" step="0.01" placeholder="ex. 14.1" value={meanRadius} onChange={(e) => setMeanRadius(e.target.value)} style={inputStyle} />
              </FormField>
              <FormField label="Texture moyenne">
                <input type="number" step="0.01" placeholder="ex. 19.3" value={meanTexture} onChange={(e) => setMeanTexture(e.target.value)} style={inputStyle} />
              </FormField>
              <FormField label="Périmètre moyen (mm)">
                <input type="number" step="0.01" placeholder="ex. 92.0" value={meanPerimeter} onChange={(e) => setMeanPerimeter(e.target.value)} style={inputStyle} />
              </FormField>
              <FormField label="Aire moyenne (mm²)">
                <input type="number" step="0.1" placeholder="ex. 654.9" value={meanArea} onChange={(e) => setMeanArea(e.target.value)} style={inputStyle} />
              </FormField>
              <FormField label="Concavité moyenne">
                <input type="number" step="0.001" placeholder="ex. 0.088" value={meanConcavity} onChange={(e) => setMeanConcavity(e.target.value)} style={inputStyle} />
              </FormField>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className="w-full rounded-full py-3.5 transition-all duration-200"
          style={{ background: !canSubmit || loading ? "rgba(194,87,115,0.35)" : C.rose, color: C.white, border: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, cursor: !canSubmit || loading ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => { if (canSubmit && !loading) (e.currentTarget as HTMLElement).style.background = C.roseDark; }}
          onMouseLeave={(e) => { if (canSubmit && !loading) (e.currentTarget as HTMLElement).style.background = C.rose; }}
        >
          {loading ? "Analyse en cours…" : "Lancer l'évaluation"}
        </button>
      </div>

      {/* ── RESULT PANEL ── */}
      <div className="flex flex-col gap-5">
        {loading && (
          <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.1)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.text, fontWeight: 600 }}>Analyse en cours…</div>
            {["Envoi des données à l'API", "Application du modèle prédictif", "Calcul du score de risque", "Génération du rapport"].map((step, i) => (
              <AnalysisStep key={step} label={step} delay={i * 350} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl p-6" style={{ background: "#FDECEE", border: "0.5px solid rgba(194,87,115,0.3)" }}>
            <p style={{ fontSize: 13, color: C.roseDark, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7, display: "flex", alignItems: "flex-start", gap: 6 }}>
              <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{error}</span>
            </p>
          </div>
        )}

        {result && !loading && (
          <>
            <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: riskConfig[result.level].bg }}>
              <div className="flex items-center gap-3">
                {riskConfig[result.level].icon}
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.white, fontWeight: 700 }}>{result.label}</span>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Probabilité de malignité</span>
                  <span style={{ fontSize: 13, color: C.white, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{result.pct}%</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.pct}%`, background: C.white, borderRadius: 10, transition: "width 1.2s ease" }} />
                </div>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.15)" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Classification IA
                </div>
                <p style={{ fontSize: 14, color: C.white, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  {result.prediction === "Malignant" ? "Tumeur maligne détectée" : "Tumeur bénigne"}
                </p>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Recommandation
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{result.advice}</p>
              </div>
            </div>

            <div className="rounded-xl px-5 py-4" style={{ background: C.sandDeep, border: "0.5px solid rgba(139,58,15,0.1)" }}>
              <p style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <AlertTriangle size={14} color={C.textSoft} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
              <em>Cet outil est une aide à la décision, non un diagnostic médical. Consultez toujours un professionnel de santé qualifié.</em>
              </p>
            </div>
            </>
          )}

          {!result && !loading && !error && (
            <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4" style={{ background: C.white, border: "0.5px dashed rgba(139,58,15,0.2)", minHeight: 280 }}>
            <Info size={48} color={C.earth} />
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: C.text, fontWeight: 600 }}>Votre résultat apparaîtra ici</div>
            <p style={{ fontSize: 13, color: C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 260, lineHeight: 1.7 }}>Remplissez le formulaire et cliquez sur "Lancer l'évaluation".</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {[
            { icon: Clock, text: "Résultat en moins de 30s" },
            { icon: Lock, text: "Données non enregistrées" },
            { icon: BadgeDollarSign, text: "Entièrement gratuit" },
            ].map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.text} className="rounded-xl p-3 text-center" style={{ background: C.sand, border: "0.5px solid rgba(139,58,15,0.08)" }}>
              <div className="flex justify-center mb-1">
                <Icon size={20} color={C.textMid} />
              </div>
              <div style={{ fontSize: 11, color: C.textMid, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4 }}>{tip.text}</div>
              </div>
            );
            })}
        </div>
      </div>
    </div>
  );
}

// ── IMAGE TAB ────────────────────────────────────────────────────────
type ImageStep = "idle" | "preview" | "analyzing" | "result";

const analysisSteps = [
  "Prétraitement de l'image",
  "Normalisation et recadrage",
  "Détection des zones d'intérêt",
  "Classification des régions",
  "Calcul du score de malignité",
  "Génération du rapport",
];

interface ImageResult {
  level: RiskLevel;
  label: string;
  pct: number;
  prediction: string;
  confidence: number;
  advice: string;
  color: string;
}

function ImageTab() {
  const [step,             setStep]             = useState<ImageStep>("idle");
  const [previewUrl,       setPreviewUrl]       = useState<string | null>(null);
  const [imageFile,        setImageFile]        = useState<File | null>(null);
  const [dragOver,         setDragOver]         = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStepIdx,   setCurrentStepIdx]   = useState(0);
  const [result,           setResult]           = useState<ImageResult | null>(null);
  const [error,            setError]            = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreviewUrl(URL.createObjectURL(file));
    setImageFile(file);
    setStep("preview");
    setResult(null);
    setError(null);
    setAnalysisProgress(0);
    setCurrentStepIdx(0);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const startAnalysis = async () => {
    if (!imageFile) return;

    if (!IMAGE_API_KEY.trim()) {
      setError("Clé API image manquante. Configurez VITE_HF_IMAGE_API_KEY pour activer l'analyse radiographique.");
      setStep("preview");
      return;
    }

    setStep("analyzing");
    setAnalysisProgress(0);
    setCurrentStepIdx(0);
    setError(null);

    // Animation steps en parallèle
    let idx = 0;
    const total = analysisSteps.length;
    const tick = () => {
      idx++;
      setCurrentStepIdx(idx);
      setAnalysisProgress(Math.round((idx / total) * 100));
      if (idx < total) setTimeout(tick, 600 + Math.random() * 300);
    };
    setTimeout(tick, 400);

    // Vrai appel API
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch(IMAGE_API, {
        method: "POST",
        headers: { "X-API-Key": IMAGE_API_KEY },
        body: formData,
      });

      if (!res.ok) throw new Error(`Erreur API image : ${res.status}`);

      const data = await res.json();
      const prediction: string = String(data.prediction ?? "");
      const confidenceRaw = typeof data.confidence === "number" ? data.confidence : parseFloat(String(data.confidence));
      if (!prediction || Number.isNaN(confidenceRaw)) {
        throw new Error("Réponse API image invalide");
      }
      const confidence = Math.max(0, Math.min(1, confidenceRaw));
      const isMalignant = prediction === "Malignant";
      const riskPct = Math.round(isMalignant ? confidence * 100 : (1 - confidence) * 100);
      const level: RiskLevel = riskPct >= 55 ? "élevé" : riskPct >= 25 ? "modéré" : "faible";

      const colorMap: Record<RiskLevel, string> = { élevé: C.earth, modéré: C.ocre, faible: C.forestMid };

      setTimeout(() => {
        setResult({
          level,
          label:      level === "élevé" ? "Forte suspicion" : level === "modéré" ? "Suspicion modérée" : "Faible suspicion",
          pct:        riskPct,
          prediction,
          confidence,
          advice:     adviceMap[level],
          color:      colorMap[level],
        });
        setStep("result");
      }, 800);

    } catch (e: any) {
      setError("Impossible d'analyser l'image. Vérifiez votre connexion et réessayez.");
      setStep("preview");
    }
  };

  const reset = () => {
    setStep("idle"); setPreviewUrl(null); setImageFile(null);
    setResult(null); setError(null); setAnalysisProgress(0); setCurrentStepIdx(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── LEFT ── */}
      <div className="flex flex-col gap-4">
        {step === "idle" && (
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className="rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200"
            style={{ border: `2px dashed ${dragOver ? C.earth : "rgba(139,58,15,0.25)"}`, background: dragOver ? "rgba(139,58,15,0.04)" : C.white, minHeight: 320, padding: "3rem", textAlign: "center" }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl" style={{ background: C.sand }}>
              <UploadCloud size={28} color={C.earth} />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: C.text, fontWeight: 600, marginBottom: 6 }}>Déposez votre image ici</div>
              <p style={{ fontSize: 13, color: C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
                Formats acceptés : JPG, PNG<br />Mammographies, échographies, radiographies
              </p>
            </div>
            <span className="inline-block rounded-full px-6 py-2.5" style={{ background: C.sand, border: "0.5px solid rgba(139,58,15,0.2)", fontSize: 13, color: C.earth, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ou cliquez pour sélectionner
            </span>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>
        )}

        {(step === "preview" || step === "analyzing" || step === "result") && previewUrl && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Image chargée</span>
              <button onClick={reset} className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: C.sand, border: "none", cursor: "pointer", fontSize: 12, color: C.earth, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <X size={13} /> Nouvelle image
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ border: "0.5px solid rgba(139,58,15,0.15)" }}>
              <img src={previewUrl} alt="Image médicale" className="w-full" style={{ display: "block", maxHeight: 360, objectFit: "contain", background: "#0a0a0a" }} />
              {step === "analyzing" && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
                  <div className="rounded-xl px-6 py-4 text-center" style={{ background: "rgba(28,43,26,0.95)", border: "0.5px solid rgba(201,151,58,0.3)" }}>
                    <div style={{ fontSize: 11, color: C.gold, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 6 }}>Analyse en cours</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: C.white, fontWeight: 700 }}>{analysisProgress}%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl px-5 py-4" style={{ background: "#FDECEE", border: "0.5px solid rgba(194,87,115,0.3)" }}>
            <p style={{ fontSize: 13, color: C.roseDark, fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", alignItems: "flex-start", gap: 6 }}>
              <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{error}</span>
            </p>
          </div>
        )}

        {step === "preview" && (
          <button onClick={startAnalysis} className="w-full rounded-full py-3.5 transition-all duration-200"
            style={{ background: C.rose, color: C.white, border: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, cursor: "pointer" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.roseDark)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = C.rose)}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Analyser l'image
                <ArrowRight size={16} />
              </span>
          </button>
        )}
      </div>

      {/* ── RIGHT ── */}
      <div className="flex flex-col gap-5">
        {step === "idle" && (
          <div className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.1)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>Comment ça fonctionne ?</div>
            {[
              { n: "1", title: "Importez votre image",     text: "Déposez une mammographie ou radiographie mammaire (JPG, PNG)." },
              { n: "2", title: "L'algorithme analyse",     text: "Notre modèle IA détecte les zones de densité anormale." },
              { n: "3", title: "Recevez le rapport",       text: "Un score de suspicion et des recommandations sont générés en secondes." },
            ].map((s) => (
              <div key={s.title} className="flex gap-4 items-start">
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 32, height: 32, borderRadius: "50%", background: C.earth, color: C.white, fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700 }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}>{s.text}</div>
                </div>
              </div>
            ))}
            <div className="rounded-xl px-4 py-3" style={{ background: C.ocrePale, border: "0.5px solid rgba(212,114,26,0.2)" }}>
              <p style={{ fontSize: 12, color: C.textMid, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7, display: "flex", alignItems: "flex-start", gap: 6 }}>
                <Image size={14} color={C.textMid} style={{ flexShrink: 0, marginTop: 2 }} />
                <em>Cette analyse est fournie à titre d'aide à la décision uniquement. Elle ne remplace pas une lecture par un radiologue.</em>
              </p>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: C.white, border: "0.5px solid rgba(139,58,15,0.1)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: C.text }}>Analyse de l'image</div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span style={{ fontSize: 12, color: C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Progression</span>
                <span style={{ fontSize: 12, color: C.earth, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>{analysisProgress}%</span>
              </div>
              <div style={{ height: 6, background: C.sand, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${analysisProgress}%`, background: `linear-gradient(90deg, ${C.earth}, ${C.gold})`, borderRadius: 10, transition: "width 0.5s ease" }} />
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {analysisSteps.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: i < currentStepIdx ? C.forestMid : i === currentStepIdx ? C.ocre : "rgba(139,58,15,0.1)", border: i < currentStepIdx || i === currentStepIdx ? "none" : "1.5px solid rgba(139,58,15,0.2)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                    {i < currentStepIdx && <Check size={10} color="#fff" strokeWidth={3} />}
                    {i === currentStepIdx && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />}
                  </div>
                  <span style={{ fontSize: 13, color: i < currentStepIdx ? C.text : i === currentStepIdx ? C.ocre : C.textSoft, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color 0.3s" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "result" && result && (
          <>
            <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: result.color }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.white, fontWeight: 700 }}>{result.label}</div>
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Score de suspicion</span>
                  <span style={{ fontSize: 14, color: C.gold, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{result.pct}%</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.pct}%`, background: C.gold, borderRadius: 10 }} />
                </div>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.15)" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Classification IA</div>
                <p style={{ fontSize: 14, color: C.white, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  {result.prediction === "Malignant" ? "Tumeur maligne détectée" : "Tumeur bénigne"} — {Math.round(result.confidence * 100)}% de confiance
                </p>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recommandation</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{result.advice}</p>
              </div>
            </div>
            <div className="rounded-xl px-5 py-4" style={{ background: C.sandDeep, border: "0.5px solid rgba(139,58,15,0.1)" }}>
              <p style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", gap: 6, alignItems: "flex-start" }}>
                <AlertTriangle size={14} color={C.textSoft} style={{ flexShrink: 0, marginTop: 2 }} />
                <em>Cet outil est une aide à la décision. Les résultats ne constituent pas un diagnostic médical. Consultez impérativement un radiologue ou médecin.</em>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────
type Tab = "clinique" | "image";

export function EvaluationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("clinique");

  return (
    <main style={{ background: C.sand, minHeight: "100vh" }}>
      <div style={{ background: C.forest, padding: "4rem 4rem 0" }}>
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.8rem" }}>
          Outil d'évaluation
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, color: C.white, lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: "2rem" }}>
          Évaluez votre <em style={{ fontStyle: "italic", color: C.gold }}>risque</em>
        </h1>
        <div className="flex gap-0">
          {([
            { key: "clinique" as Tab, label: "Données cliniques", desc: "Formulaire médical + IA", icon: Dna },
            { key: "image"    as Tab, label: "Image radiographique", desc: "Upload & analyse IA", icon: Image },
          ] as const).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="flex flex-col items-start px-6 py-4 transition-all duration-200"
              style={{ background: activeTab === tab.key ? C.sand : "transparent", border: "none", borderTop: activeTab === tab.key ? `2px solid ${C.gold}` : "2px solid transparent", cursor: "pointer", borderRadius: "12px 12px 0 0" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: activeTab === tab.key ? C.text : "rgba(255,255,255,0.6)", fontWeight: activeTab === tab.key ? 500 : 400 }}>
                {(() => {
                  const Icon = tab.icon;
                  return <Icon size={16} />;
                })()}
                {tab.label}
              </span>
              <span style={{ fontSize: 11, color: activeTab === tab.key ? C.textSoft : "rgba(255,255,255,0.35)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{tab.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "3rem 4rem" }}>
        {activeTab === "clinique" ? <ClinicalTab /> : <ImageTab />}
      </div>
    </main>
  );
}