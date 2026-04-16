import { useState, useEffect } from "react";
import { Newspaper, Image, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    news: 0,
    gallery: 0,
    programs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [newsCount, galleryCount, programsCount] = await Promise.all([
          supabase.from("news_posts").select("*", { count: "exact", head: true }),
          supabase.from("gallery").select("*", { count: "exact", head: true }),
          supabase.from("programs").select("*", { count: "exact", head: true }),
        ]);

        setCounts({
          news: newsCount.count || 0,
          gallery: galleryCount.count || 0,
          programs: programsCount.count || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { label: "News Posts", count: counts.news, icon: Newspaper, to: "/admin/news", color: "bg-primary" },
    { label: "Gallery Images", count: counts.gallery, icon: Image, to: "/admin/gallery", color: "bg-secondary" },
    { label: "Programs", count: counts.programs, icon: BookOpen, to: "/admin/programs", color: "bg-primary" },
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
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">
                {loading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : s.count}
              </p>
            </div>
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
          <li>• All changes made here reflect immediately on the live website.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

