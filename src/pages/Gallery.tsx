import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { X } from "lucide-react";
import programYouth from "@/assets/program-youth.jpg";
import programWomen from "@/assets/program-women.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const categories = ["All", "Programs", "Events", "Workshops"];

const galleryItems = [
  { src: heroBg, alt: "Youth summit event", category: "Events" },
  { src: programYouth, alt: "Youth digital skills training", category: "Programs" },
  { src: programWomen, alt: "Women vocational training", category: "Workshops" },
  { src: programEducation, alt: "Education support program", category: "Programs" },
  { src: programHealth, alt: "Community health outreach", category: "Events" },
  { src: programWomen, alt: "Women empowerment workshop", category: "Workshops" },
  { src: heroBg, alt: "Community engagement event", category: "Events" },
  { src: programYouth, alt: "Youth leadership workshop", category: "Workshops" },
  { src: programEducation, alt: "Scholarship ceremony", category: "Programs" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div>
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Gallery" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">Gallery</h1>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">See the impact of our programs through photos and moments.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={`${item.alt}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setLightboxImage(item.src)}
                className="cursor-pointer rounded-xl overflow-hidden group aspect-[4/3]"
              >
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={800} height={600} />
              </motion.div>
            ))}
          </div>
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
