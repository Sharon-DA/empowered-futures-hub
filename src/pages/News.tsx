import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import heroBg from "@/assets/photo-hero.jpg";
import programYouth from "@/assets/photo-youth.jpg";
import programWomen from "@/assets/photo-women.jpg";
import programHealth from "@/assets/photo-health.jpg";
import programEducation from "@/assets/photo-education.jpg";

const News = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setPosts(data);
      } else {
        // Fallback
        setPosts([
          { title: "2024 Annual Youth Summit Recap", created_at: "2024-03-15T12:00:00Z", category: "Events", image_url: programYouth, excerpt: "Over 500 young leaders gathered for our biggest summit yet..." },
          { title: "Women's Skill Workshop Graduation", created_at: "2024-02-28T12:00:00Z", category: "Achievements", image_url: programWomen, excerpt: "30 women graduated from our 6-month vocational training program..." },
        ]);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <section className="relative py-36 md:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="News" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">News & Updates</h1>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">Stay informed about our latest activities, events, and achievements.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding min-h-[400px]">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id || post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border group"
                >
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={post.image_url || programYouth} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                      width={800} 
                      height={600} 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs bg-orange-light text-secondary font-semibold px-3 py-1 rounded-full">{post.category}</span>
                      <span className="text-xs text-muted-foreground">
                        {post.created_at ? format(new Date(post.created_at), "MMMM dd, yyyy") : "Recent"}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <button className="text-primary font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;

