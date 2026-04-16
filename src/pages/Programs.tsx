import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Users, Heart, GraduationCap, Stethoscope, HandHelping, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import heroBg from "@/assets/hero-bg.jpg";
import programYouth from "@/assets/program-youth.jpg";
import programWomen from "@/assets/program-women.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";

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
      const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        setPrograms(data);
      } else {
        // Fallback to static data if DB is empty or error
        console.log("Using static fallback for programs");
        setPrograms([
          { title: "Youth Empowerment", description: "Our Youth Empowerment program equips young people aged 15–35...", activities: ["Digital skills training", "Leadership workshops"], impact: "2,000+ youths trained" },
          { title: "Women Empowerment", description: "Economic independence for women...", activities: ["Vocational training", "Financial literacy"], impact: "1,500+ women empowered" },
          // etc... (keeping it simple for fallback)
        ]);
      }
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  return (
    <div>
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Programs" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">Our Programs</h1>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">Explore the initiatives that are transforming lives across communities.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding min-h-[400px]">
        <div className="container mx-auto space-y-20">
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
                className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={program.image_url || defaultImages[program.title] || heroBg} 
                      alt={program.title} 
                      className="w-full h-72 md:h-96 object-cover" 
                      loading="lazy" 
                      width={800} 
                      height={600} 
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1 text-right" : ""}>
                  <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? "justify-end" : ""}`}>
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary">
                      {categoryIcons[program.title] || <Users className="w-6 h-6" />}
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                  <ul className="space-y-2 mb-6">
                    {program.activities?.map((a: string) => (
                      <li key={a} className={`flex items-start gap-2 text-foreground ${i % 2 === 1 ? "justify-end" : ""}`}>
                        {i % 2 === 0 && <ArrowRight className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />}
                        <span>{a}</span>
                        {i % 2 === 1 && <ArrowRight className="w-4 h-4 text-secondary mt-1 flex-shrink-0 rotate-180" />}
                      </li>
                    ))}
                  </ul>
                  <div className={`inline-block bg-green-light px-4 py-2 rounded-lg`}>
                    <span className="text-primary font-semibold text-sm">📊 Impact: {program.impact}</span>
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
          <Link to="/donate"><Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 h-12">Donate Now</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;

