import { Outlet, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function Root() {
  const { pathname } = useLocation();

  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#F5EFE0", color: "#1C2B1A" }}>
      <Navbar currentPath={pathname} />
      <Outlet />
      <Footer />
    </div>
  );
}
