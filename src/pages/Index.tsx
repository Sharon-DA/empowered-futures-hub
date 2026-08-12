import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Heart, HandHelping, ArrowRight, Quote, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/ImpactCounter";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import heroBg from "@/assets/hero-bg.jpg";
import programYouth from "@/assets/program-youth.jpg";
import programWomen from "@/assets/program-women.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";

const programs = [
  { title: "Youth Empowerment", description: "Equipping young people with digital skills, leadership training, and mentorship to unlock their potential.", image: programYouth, link: "/programs" },
  { title: "Women Empowerment", description: "Providing vocational training, financial literacy, and support networks for women to thrive.", image: programWomen, link: "/programs" },
  { title: "Education Support", description: "Scholarships, tutoring, and learning materials for children and young adults in underserved communities.", image: programEducation, link: "/programs" },
  { title: "Health Awareness", description: "Community health campaigns, screenings, and wellness workshops to improve public health.", image: programHealth, link: "/programs" },
];

const testimonials = [
  { name: "Aisha M.", role: "Program Beneficiary", quote: "The skills training I received changed my life. I now run my own tailoring business and support my family." },
  { name: "Emeka O.", role: "Youth Volunteer", quote: "Volunteering with Prime Youths opened my eyes to the power of community service. I've grown as a person and leader." },
  { name: "Fatima K.", role: "Women's Program Graduate", quote: "I never imagined I could start my own business. The financial literacy program gave me the confidence and tools I needed." },
];

const Index = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const heroTitle = settings?.hero_title || "Empowering Youths & Women for a Brighter Future";
  const heroSubtitle = settings?.hero_subtitle || "We invest in education, skills, and community to help youths and women build the future they deserve.";
  const heroImage = settings?.hero_image_url || heroBg;
  const stats = settings?.impact_stats || { empowered: 5000, programs: 50, volunteers: 200, donations: 1000 };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Youths and women in a Prime Youths empowerment program" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative container mx-auto px-4 pt-32 pb-24 text-center md:text-left md:max-w-3xl md:mr-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs md:text-sm font-semibold uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-7 shadow-elevated">
              Making a Difference Together
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.08] tracking-tight mb-6">
              {heroTitle}
            </h1>
            <p className="text-background/85 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/donate">
                <Button size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base font-semibold px-8 h-13 py-3.5 shadow-elevated">
                  Donate <Heart className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold px-8 py-3.5">
                  Volunteer
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" className="rounded-full bg-transparent border-2 border-background/70 text-background hover:bg-background hover:text-foreground text-base font-semibold px-8 py-3.5 transition-colors">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Impact Counters */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading label="Our Impact" title="Changing Lives, One Step at a Time" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter end={stats.empowered} suffix="+" label="People Empowered" icon={<Users className="w-7 h-7" />} />
            <Counter end={stats.programs} suffix="+" label="Programs Completed" icon={<GraduationCap className="w-7 h-7" />} />
            <Counter end={stats.volunteers} suffix="+" label="Active Volunteers" icon={<HandHelping className="w-7 h-7" />} />
            <Counter end={stats.donations} suffix="+" label="Donations Received" icon={<Heart className="w-7 h-7" />} />
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="What We Do" title="Our Featured Programs" description="We run impactful programs that address the most pressing needs of youths and women in our communities." />
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow"
              >
                <div className="h-56 overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{program.description}</p>
                  <Link to={program.link} className="inline-flex items-center text-primary font-semibold text-sm hover:gap-3 gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <SectionHeading label="Testimonials" title="Voices of Impact" description="Hear from the people whose lives have been transformed through our programs." />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border"
              >
                <Quote className="w-8 h-8 text-secondary mb-4" />
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News (Simplified) */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <SectionHeading label="Stay Updated" title="Latest News & Achievements" />
          <p className="mb-10 text-muted-foreground">Check out our latest news posts and stories of impact.</p>
          <Link to="/news">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold">
              View All News <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Whether you donate, volunteer, or spread the word — every action counts. Together, we can empower more lives.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 h-12">
                  Donate Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 h-12">
                  Get Involved
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

