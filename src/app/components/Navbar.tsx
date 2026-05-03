import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const C = {
  forest: "#1B263B",
  gold: "#E5989B",
  rose: "#E5989B",
  roseDark: "#C97B82",
  earthLight: "#415A77",
  white: "#F8F9FA",
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
    <nav className="apple-nav sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-5 md:px-8 py-4 max-w-7xl">
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
            textShadow: "0 1px 18px rgba(255,255,255,0.08)",
          }}
        >
          Anon<span style={{ color: C.gold }}>tché</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="apple-pill"
                style={{
                  fontSize: 13,
                  color: isActive(l.to) ? C.gold : "rgba(255,255,255,0.72)",
                  textDecoration: "none",
                  letterSpacing: "0.4px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "color 0.2s, background-color 0.2s, box-shadow 0.2s",
                  fontWeight: isActive(l.to) ? 500 : 400,
                  borderBottom: "1.5px solid transparent",
                  padding: "7px 12px",
                  background: isActive(l.to) ? "rgba(255,255,255,0.08)" : "transparent",
                  boxShadow: isActive(l.to) ? "0 10px 18px rgba(27,38,59,0.12)" : "none",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/evaluation"
              className="text-sm rounded-full apple-pill apple-hover"
              style={{
                background: "linear-gradient(135deg, rgba(229,152,155,0.98), rgba(201,123,130,0.98))",
                color: C.white,
                textDecoration: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                padding: "8px 22px",
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
          style={{ color: C.white, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", borderRadius: 999 }}
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
          style={{ background: "rgba(27,38,59,0.82)", borderTop: "0.5px solid rgba(255,255,255,0.08)", backdropFilter: "blur(22px) saturate(150%)" }}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 14,
                color: isActive(l.to) ? C.gold : "rgba(255,255,255,0.78)",
                textDecoration: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                padding: "8px 10px",
                borderRadius: 999,
                background: isActive(l.to) ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/evaluation"
            onClick={() => setOpen(false)}
            style={{
              background: "linear-gradient(135deg, rgba(229,152,155,0.98), rgba(201,123,130,0.98))",
              color: C.white,
              textDecoration: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              padding: "10px 22px",
              borderRadius: 999,
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