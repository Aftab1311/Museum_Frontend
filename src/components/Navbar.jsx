import { Link, useLocation } from "react-router-dom";
import { Menu, X, Landmark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "History", path: "/history" },
    { name: "Map", path: "/map" },
    // { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-[#5A5A40]/10">
      <div className="px-4 sm:px-6 lg:px-14">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Landmark className="h-8 w-8 text-[#5A5A40]" />
              <span className="font-serif text-2xl font-semibold tracking-tight text-cultural-ink">
                NaijaHeritage
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors",
                  location.pathname === link.path
                    ? "text-[#5A5A40] underline underline-offset-8 decoration-2"
                    : "text-cultural-ink/60 hover:text-[#5A5A40]",
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="olive-button text-sm uppercase tracking-widest"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cultural-ink hover:text-[#5A5A40] focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#f5f5f0] border-b border-[#5A5A40]/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-medium uppercase tracking-widest",
                  location.pathname === link.path
                    ? "text-[#5A5A40] bg-cultural-sand rounded-md"
                    : "text-cultural-ink/60 hover:text-[#5A5A40] hover:bg-cultural-sand rounded-md",
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium uppercase tracking-widest text-[#5A5A40] hover:bg-cultural-sand rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
