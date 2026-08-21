import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { Users, Heart, GraduationCap, Stethoscope, HandHelping, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fallbackPrograms } from "@/lib/fallbackContent";
import { withFallback } from "@/lib/withFallback";
import heroBg from "@/assets/photo-hero.jpg";
import programYouth from "@/assets/photo-youth.jpg";
import programWomen from "@/assets/photo-women.jpg";
import programHealth from "@/assets/photo-health.jpg";
import programEducation from "@/assets/photo-education.jpg";

const categoryIcons: Record<string, JSX.Element> = {
  "Youth Empowerment": <Users className="w-6 h-6" />,
  "Women Empowerment": <Heart className="w-6 h-6" />,
  "Education Support": <GraduationCap className="w-6 h-6" />,
  "Health Awareness": <Stethoscope className="w-6 h-6" />,
  "Community Outreach": <HandHelping className="w-6 h-6" />,
};

const defaultImages: Record<string, string> = {
  "Youth Empowerment": programYouth,
  "Women Empowerment": programWomen,
  "Education Support": programEducation,
  "Health Awareness": programHealth,
  "Community Outreach": heroBg,
};

const Programs = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const data = await withFallback(
        () => supabase.from("programs").select("*").order("created_at", { ascending: true }),
        fallbackPrograms,
      );
      setPrograms(data);
      setLoading(false);
    };
    fetchPrograms();
  }, []);



  return (
    <div>
      <PageHero eyebrow="What We Do" title="Our Programs" description="Explore the initiatives transforming lives across Benue State — from digital skills to health outreach." image={heroBg} imageAlt="PYWEI programme participants" watermark="Programs" />

      <section className="relative overflow-hidden section-padding min-h-[400px]">
        <span className="watermark">Programs</span>
        <div className="container mx-auto relative space-y-20 md:space-y-28">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            programs.map((program, i) => (
              <motion.div
                key={program.id || program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                <div className={`relative ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <span className="absolute -top-8 -left-2 md:-left-6 font-heading text-[5rem] md:text-[7rem] leading-none font-bold text-secondary/15 select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="frame-offset rounded-[2rem]">
                    <img
                      src={program.image_url || defaultImages[program.title] || heroBg}
                      alt={program.title}
                      className="relative z-10 w-full h-72 md:h-[26rem] object-cover rounded-[2rem] shadow-elevated"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-primary">
                      {categoryIcons[program.title] || <Users className="w-6 h-6" />}
                    </div>
                    <h3 className="font-heading text-2xl md:text-[2rem] font-bold text-foreground leading-tight">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-7 text-base md:text-lg border-l-2 border-secondary/40 pl-5">{program.description}</p>
                  <ul className="space-y-2.5 mb-7">
                    {program.activities?.map((a: string) => (
                      <li key={a} className="flex items-start gap-3 text-foreground">
                        <ArrowRight className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span className="text-accent-foreground font-semibold text-sm">Impact: {program.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Want to Support a Program?</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">Your donation directly funds these programs and changes lives.</p>
          <Link to="/donate"><Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-semibold px-8 py-3.5">Donate Now</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;

