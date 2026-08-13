import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import heroBg from "@/assets/photo-hero.jpg";
import programYouth from "@/assets/program-youth.jpg";
import programWomen from "@/assets/program-women.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";

const categories = ["All", "Programs", "Events", "Workshops"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setGalleryItems(data);
      } else {
        // Fallback
        setGalleryItems([
          { image_url: heroBg, title: "Youth summit event", category: "Events" },
          { image_url: programYouth, title: "Youth digital skills training", category: "Programs" },
          { image_url: programWomen, title: "Women vocational training", category: "Workshops" },
          { image_url: programEducation, title: "Education support program", category: "Programs" },
        ]);
      }
      setLoading(false);
    };
    fetchGallery();
  }, []);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div>
      <section className="relative py-36 md:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Gallery" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">Gallery</h1>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">See the impact of our programs through photos and moments.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding min-h-[500px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setLightboxImage(item.image_url)}
                  className="cursor-pointer rounded-xl overflow-hidden group aspect-[4/3]"
                >
                  <img src={item.image_url} alt={item.title} title={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={800} height={600} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 text-background hover:text-secondary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={lightboxImage}
              alt="Gallery lightbox"
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

