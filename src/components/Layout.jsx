import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-cultural-bg)]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
