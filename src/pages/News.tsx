import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fallbackNews } from "@/lib/fallbackContent";
import { withFallback } from "@/lib/withFallback";
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
      const data = await withFallback(
        () => supabase.from("news_posts").select("*").order("created_at", { ascending: false }),
        fallbackNews,
      );
      setPosts(data);
      setLoading(false);
    };
    fetchNews();
  }, []);



  return (
    <div>
      <PageHero eyebrow="Stay Updated" title="News & Updates" description="Our latest activities, events, partnerships and achievements across the communities we serve." image={heroBg} imageAlt="PYWEI event coverage" watermark="News" />

      <section className="relative overflow-hidden section-padding min-h-[400px]">
        <span className="watermark">Updates</span>
        <div className="container mx-auto relative">
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
                  className="bg-card rounded-3xl overflow-hidden shadow-card border border-border/70 group hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
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
                      <span className="text-xs bg-secondary text-secondary-foreground font-semibold px-3 py-1 rounded-full">{post.category}</span>
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

