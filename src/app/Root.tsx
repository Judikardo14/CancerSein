import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function Root() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#F8F9FA", color: "#1B263B" }}>
      <Navbar currentPath={pathname} />
      <Outlet />
      <Footer />
    </div>
  );
}
