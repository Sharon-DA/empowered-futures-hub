import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <span className="font-heading text-lg font-bold">Prime Youths</span>
              <span className="block text-xs opacity-70 -mt-0.5">& Women Empowerment</span>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Empowering youths and women to build a brighter, more equitable future through education, skill development, and community support.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {["About", "Programs", "Gallery", "News", "Contact", "Donate"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="hover:opacity-100 transition-opacity">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-4">Programs</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Youth Empowerment</li>
            <li>Women Empowerment</li>
            <li>Education Support</li>
            <li>Health Awareness</li>
            <li>Community Outreach</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              info@primeyouths.org
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              +234 800 000 0000
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              Lagos, Nigeria
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Prime Youths & Women Empowerment Initiative. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
