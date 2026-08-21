import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fallbackGallery } from "@/lib/fallbackContent";
import { withFallback } from "@/lib/withFallback";
import heroBg from "@/assets/photo-hero.jpg";
import programYouth from "@/assets/photo-youth.jpg";
import programWomen from "@/assets/photo-women.jpg";
import programHealth from "@/assets/photo-health.jpg";
import programEducation from "@/assets/photo-education.jpg";

const categories = ["All", "Programs", "Events", "Workshops"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const data = await withFallback(
        () => supabase.from("gallery").select("*").order("created_at", { ascending: false }),
        fallbackGallery,
      );
      setGalleryItems(data);
      setLoading(false);
    };
    fetchGallery();
  }, []);



  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div>
      <PageHero eyebrow="Moments of Impact" title="Gallery" description="See our programmes, outreaches and workshops through the faces and moments that define them." image={heroBg} imageAlt="PYWEI gallery of programme photos" watermark="Gallery" />

      <section className="relative overflow-hidden section-padding min-h-[500px]">
        <span className="watermark">Gallery</span>
        <div className="container mx-auto relative">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[12rem]">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setLightboxImage(item.image_url)}
                  className={`cursor-pointer rounded-[1.5rem] overflow-hidden group shadow-card h-40 md:h-auto ${
                    i % 7 === 0 ? "md:col-span-2 md:row-span-2" : i % 5 === 0 ? "md:row-span-2" : i % 6 === 0 ? "md:col-span-2" : ""
                  }`}
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

