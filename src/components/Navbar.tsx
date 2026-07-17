import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Linkedin, Heart } from "lucide-react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white shadow-md border-b border-gray-100"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
        }`}
    >

      {/* Main nav */}
      <div className="container mx-auto px-4 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="PYWEI Logo" className="w-12 h-12 object-contain" />
          <div className="leading-tight">
            <span
              className="block font-bold text-[#111111] text-base"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Prime Youths &amp; Women
            </span>
            <span className="block text-xs text-[#2E8B00] font-semibold tracking-wide uppercase">
              Empowerment Initiative
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 text-sm font-medium transition-colors group ${location.pathname === link.to
                  ? "text-[#2E8B00]"
                  : "text-gray-700 hover:text-[#2E8B00]"
                }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#F47920] rounded-full transition-transform origin-left ${location.pathname === link.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
            </Link>
          ))}
        </div>

        {/* Donate CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-[#F47920] text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#d96812] transition-colors"
          >
            <Heart className="w-4 h-4" />
            Donate Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-800 rounded"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded text-sm font-medium transition-colors ${location.pathname === link.to
                      ? "bg-[#f0fae8] text-[#2E8B00]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#2E8B00]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <Link
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#F47920] text-white text-sm font-semibold px-5 py-3 rounded hover:bg-[#d96812] transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 pt-3 pb-1">
                <a href="https://www.facebook.com/share/16gg2zCBWo/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#2E8B00]">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/pywei_?igsh=NTJuM2R2bWE4bnlo" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#2E8B00]">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://ng.linkedin.com/in/prime-youths-and-women-empowerment-initiative-initiative-839897360" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#2E8B00]">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
