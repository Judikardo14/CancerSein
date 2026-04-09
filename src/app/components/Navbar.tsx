import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const C = {
  forest: "#1C2B1A",
  gold: "#C9973A",
  rose: "#C25773",
  roseDark: "#9E3D57",
  earthLight: "#B85A2A",
  white: "#FFFFFF",
};

const links = [
  { label: "Accueil", to: "/" },
  { label: "Évaluation", to: "/evaluation" },
  { label: "Prévention", to: "/prevention" },
  { label: "À propos", to: "/a-propos" },
];

interface NavbarProps {
  currentPath: string;
}

export function Navbar({ currentPath }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  };

  return (
    <nav
      style={{ background: C.forest, borderBottom: "1px solid rgba(201,151,58,0.2)" }}
      className="sticky top-0 z-50"
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 24,
            color: C.white,
            textDecoration: "none",
            letterSpacing: "-0.5px",
          }}
        >
          Math<span style={{ color: C.gold }}>Care</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                style={{
                  fontSize: 13,
                  color: isActive(l.to) ? C.gold : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  letterSpacing: "0.4px",
                  fontFamily: "'Lora', serif",
                  transition: "color 0.2s",
                  fontWeight: isActive(l.to) ? 500 : 400,
                  borderBottom: isActive(l.to) ? `1.5px solid ${C.gold}` : "1.5px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/evaluation"
              className="text-sm rounded-full transition-all duration-200"
              style={{
                background: C.rose,
                color: C.white,
                textDecoration: "none",
                fontFamily: "'Lora', serif",
                fontSize: 13,
                padding: "8px 22px",
                borderRadius: 40,
                display: "inline-block",
              }}
            >
              Démarrer
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: C.white, background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden flex flex-col gap-4 px-6 pb-6"
          style={{ background: C.forest, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 14,
                color: isActive(l.to) ? C.gold : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontFamily: "'Lora', serif",
                padding: "4px 0",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/evaluation"
            onClick={() => setOpen(false)}
            style={{
              background: C.rose,
              color: C.white,
              textDecoration: "none",
              fontFamily: "'Lora', serif",
              fontSize: 13,
              padding: "10px 22px",
              borderRadius: 40,
              width: "fit-content",
              display: "inline-block",
            }}
          >
            Démarrer
          </Link>
        </div>
      )}
    </nav>
  );
}