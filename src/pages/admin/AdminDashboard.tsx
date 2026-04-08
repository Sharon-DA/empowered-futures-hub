import { Newspaper, Image, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { store } from "@/lib/store";

const AdminDashboard = () => {
  const stats = [
    { label: "News Posts", count: store.getNews().length, icon: Newspaper, to: "/admin/news", color: "bg-primary" },
    { label: "Gallery Images", count: store.getGallery().length, icon: Image, to: "/admin/gallery", color: "bg-secondary" },
    { label: "Programs", count: store.getPrograms().length, icon: BookOpen, to: "/admin/programs", color: "bg-primary" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">Welcome to Admin Panel</h2>
        <p className="text-muted-foreground mt-1">Manage your website content from here.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-primary-foreground mb-4`}>
              <s.icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-foreground">{s.count}</p>
            <p className="text-muted-foreground text-sm">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">Quick Tips</h3>
        <ul className="text-muted-foreground text-sm space-y-2">
          <li>• Use <strong>News Posts</strong> to add event recaps, announcements, and achievements.</li>
          <li>• Upload photos to the <strong>Gallery</strong> section to showcase your impact.</li>
          <li>• Update <strong>Programs</strong> details, activities, and impact stats.</li>
          <li>• Data is stored locally for now. Connect a backend for persistent storage.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
