import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import heroBg from "@/assets/003.jpg";
import programYouth from "@/assets/6.jpg";
import programWomen from "@/assets/1.jpg";
import programHealth from "@/assets/Project Girl Rise.jpg";
import programEducation from "@/assets/J.jpg";
import girlRise1 from "@/assets/Project Girl Rise.jpg";
import girlRise2 from "@/assets/Project Girl Rise (2).jpg";
import girlRise3 from "@/assets/Project Girl Rise (3).jpg";
import girlRise4 from "@/assets/Project Girl Rise (4).jpg";
import girlRise5 from "@/assets/Project Girl Rise (5).jpg";
import wee1 from "@/assets/1.jpg";
import wee2 from "@/assets/2.jpg";
import wee3 from "@/assets/3.jpg";
import wee4 from "@/assets/4.jpg";
import wee5 from "@/assets/5.jpg";
import nysc6 from "@/assets/6.jpg";
import nysc7 from "@/assets/7.jpg";
import nysc8 from "@/assets/8.jpg";
import nysc9 from "@/assets/9.jpg";
import envA from "@/assets/A.jpg";
import envB from "@/assets/B.jpg";
import envC from "@/assets/C.jpg";
import envD from "@/assets/D.jpg";
import envE from "@/assets/E.jpg";
import envF from "@/assets/F.jpg";
import envG from "@/assets/G.jpg";
import envH from "@/assets/H.jpg";
import envI from "@/assets/I.jpg";
import skillsJ from "@/assets/J.jpg";
import skillsK from "@/assets/K.jpg";
import skillsL from "@/assets/L.jpg";
import skillsM from "@/assets/M.jpg";
import skillsN from "@/assets/N.jpg";
import skillsO from "@/assets/O.jpg";
import skillsP from "@/assets/P.jpg";
import skillsQ from "@/assets/Q.jpg";
import skillsR from "@/assets/R.jpg";
import skillsS from "@/assets/S.jpg";
import skillsT from "@/assets/T.jpg";
import cso000 from "@/assets/000.jpg";
import cso001 from "@/assets/001.jpg";
import cso002 from "@/assets/002.jpg";
import cso003 from "@/assets/003.jpg";
import cso004 from "@/assets/004.jpg";
import cso005 from "@/assets/005.jpg";
import cso006 from "@/assets/006.jpg";

const categories = ["All", "Programs", "Events", "Workshops", "Project Girl Rise", "WEE Policy Framework", "NYSC Sensitization", "World Environment Day", "Digital Skills", "Capacity Building"];

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
          { image_url: girlRise1, title: "Project Girl Rise", category: "Project Girl Rise" },
          { image_url: girlRise2, title: "Project Girl Rise - Session 2", category: "Project Girl Rise" },
          { image_url: girlRise3, title: "Project Girl Rise - Session 3", category: "Project Girl Rise" },
          { image_url: girlRise4, title: "Project Girl Rise - Session 4", category: "Project Girl Rise" },
          { image_url: girlRise5, title: "Project Girl Rise - Session 5", category: "Project Girl Rise" },
          { image_url: wee1, title: "WEE Policy Framework - Day 1", category: "WEE Policy Framework" },
          { image_url: wee2, title: "WEE Policy Framework - Stakeholders", category: "WEE Policy Framework" },
          { image_url: wee3, title: "WEE Policy Framework - Engagement", category: "WEE Policy Framework" },
          { image_url: wee4, title: "WEE Policy Framework - Session", category: "WEE Policy Framework" },
          { image_url: wee5, title: "WEE Policy Framework - Validation", category: "WEE Policy Framework" },
          { image_url: nysc6, title: "NYSC Camp Wannune Sensitization - 1", category: "NYSC Sensitization" },
          { image_url: nysc7, title: "NYSC Camp Wannune Sensitization - 2", category: "NYSC Sensitization" },
          { image_url: nysc8, title: "NYSC Camp Wannune Sensitization - 3", category: "NYSC Sensitization" },
          { image_url: nysc9, title: "NYSC Camp Wannune Sensitization - 4", category: "NYSC Sensitization" },
          { image_url: envA, title: "World Environment Day - Walk", category: "World Environment Day" },
          { image_url: envB, title: "World Environment Day - Awareness", category: "World Environment Day" },
          { image_url: envC, title: "World Environment Day - Speeches", category: "World Environment Day" },
          { image_url: envD, title: "World Environment Day - Participants", category: "World Environment Day" },
          { image_url: envE, title: "World Environment Day - Tree Planting 1", category: "World Environment Day" },
          { image_url: envF, title: "World Environment Day - Tree Planting 2", category: "World Environment Day" },
          { image_url: envG, title: "World Environment Day - Collaboration", category: "World Environment Day" },
          { image_url: envH, title: "World Environment Day - Action", category: "World Environment Day" },
          { image_url: envI, title: "World Environment Day - Group", category: "World Environment Day" },
          { image_url: skillsJ, title: "Digital Skills Training - Session", category: "Digital Skills" },
          { image_url: skillsK, title: "Digital Skills Training - Certificates", category: "Digital Skills" },
          { image_url: skillsL, title: "Digital Skills Training - Group", category: "Digital Skills" },
          { image_url: skillsM, title: "Digital Skills Training - Mentorship", category: "Digital Skills" },
          { image_url: skillsN, title: "Digital Skills Training - Practice", category: "Digital Skills" },
          { image_url: skillsO, title: "Digital Skills Training - Discussion", category: "Digital Skills" },
          { image_url: skillsP, title: "Digital Skills Training - Graduation", category: "Digital Skills" },
          { image_url: skillsQ, title: "Digital Skills Training - Class", category: "Digital Skills" },
          { image_url: skillsR, title: "Digital Skills Training - Award", category: "Digital Skills" },
          { image_url: skillsS, title: "Digital Skills Training - Learning", category: "Digital Skills" },
          { image_url: skillsT, title: "Digital Skills Training - Partners", category: "Digital Skills" },
          { image_url: cso000, title: "Capacity Building - 1", category: "Capacity Building" },
          { image_url: cso001, title: "Capacity Building - 2", category: "Capacity Building" },
          { image_url: cso002, title: "Capacity Building - 3", category: "Capacity Building" },
          { image_url: cso003, title: "Capacity Building - 4", category: "Capacity Building" },
          { image_url: cso004, title: "Capacity Building - 5", category: "Capacity Building" },
          { image_url: cso005, title: "Capacity Building - 6", category: "Capacity Building" },
          { image_url: cso006, title: "Capacity Building - 7", category: "Capacity Building" },
        ]);
      }
      setLoading(false);
    };
    fetchGallery();
  }, []);

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

