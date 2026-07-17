import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer style={{ backgroundColor: "#111111", color: "#ffffff" }}>
    {/* Top green accent strip */}
    <div style={{ height: "4px", background: "linear-gradient(to right, #2E8B00, #F47920, #2E8B00)" }} />

    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="PYWEI Logo" className="w-14 h-14 object-contain" />
            <div className="leading-tight">
              <span
                className="block font-bold text-white text-base"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Prime Youths &amp; Women
              </span>
              <span className="block text-xs text-[#F47920] font-semibold tracking-wide uppercase">
                Empowerment Initiative
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
            Empowering youths and women to build a brighter, more equitable future through
            education, skill development, and community support.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/share/16gg2zCBWo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2E8B00")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/pywei_?igsh=NTJuM2R2bWE4bnlo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F47920")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://ng.linkedin.com/in/prime-youths-and-women-empowerment-initiative-initiative-839897360"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2E8B00")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            className="font-bold text-white text-base mb-5 pb-2 border-b"
            style={{ fontFamily: "'Roboto Slab', serif", borderColor: "#2E8B00" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            {["Home", "About", "Programs", "Gallery", "News", "Contact", "Donate"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-[#F47920] transition-colors flex items-center gap-1.5 group"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#2E8B00] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {item}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                to="/admin/login"
                className="text-[#F47920] hover:underline text-xs"
              >
                Staff Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4
            className="font-bold text-white text-base mb-5 pb-2 border-b"
            style={{ fontFamily: "'Roboto Slab', serif", borderColor: "#F47920" }}
          >
            Our Programs
          </h4>
          <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            {[
              "Youth Empowerment",
              "Women Empowerment",
              "Education Support",
              "Health Awareness",
              "Community Outreach",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="/programs"
                  className="hover:text-[#2E8B00] transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47920] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="font-bold text-white text-base mb-5 pb-2 border-b"
            style={{ fontFamily: "'Roboto Slab', serif", borderColor: "#2E8B00" }}
          >
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#F47920]" />
              <span>primeyouthinitiative22@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#F47920]" />
              <span>0705 368 9152 / 0703 391 6169</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2E8B00]" />
              <span>C5 Unique Plaza, Modern Market Junction, Makurdi, Benue State</span>
            </li>
          </ul>

          {/* Mini donate CTA */}
          <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#F47920] text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#d96812] transition-colors w-full justify-center"
            >
              <Heart className="w-4 h-4" />
              Support Our Mission
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
        <span>
          © {new Date().getFullYear()} Prime Youths &amp; Women Empowerment Initiative (PYWEI). All rights reserved.
        </span>
        <span className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-[#F47920]" /> for community impact
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
