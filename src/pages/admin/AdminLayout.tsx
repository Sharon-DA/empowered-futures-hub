import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Newspaper, Image, BookOpen, LayoutDashboard, ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/news", label: "News Posts", icon: Newspaper },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/programs", label: "Programs", icon: BookOpen },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-border">
          <h2 className="font-heading text-lg font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">Prime Youths & Women</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Site
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 sticky top-0 z-20">
          <button className="lg:hidden p-2 text-foreground mr-3" onClick={() => setSidebarOpen(true)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-heading text-lg font-bold text-foreground">
            {navItems.find((n) => n.to === location.pathname)?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
