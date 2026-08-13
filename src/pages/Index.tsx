import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Heart, HandHelping, ArrowRight, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/ImpactCounter";
import Typewriter from "@/components/Typewriter";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/logo.png";
import photoHero from "@/assets/photo-hero.jpg";
import photoYouth from "@/assets/photo-youth.jpg";
import photoWomen from "@/assets/photo-women.jpg";
import photoEducation from "@/assets/photo-education.jpg";
import photoHealth from "@/assets/photo-health.jpg";
import photoCommunity from "@/assets/photo-community.jpg";
import photoOutreach from "@/assets/photo-outreach.jpg";
import photoGirlRise from "@/assets/photo-girlrise.jpg";

const programs = [
  { title: "Youth Empowerment", description: "Equipping young people with digital skills, leadership training, and mentorship to unlock their full potential.", image: photoYouth },
  { title: "Women Empowerment", description: "Providing vocational training, financial literacy, and support networks for women to thrive economically.", image: photoWomen },
  { title: "Education Support", description: "Scholarships, tutoring, and learning materials for children and young adults in underserved communities.", image: photoEducation },
  { title: "Health Awareness", description: "Community health campaigns, screenings, and wellness workshops to improve public health outcomes.", image: photoHealth },
];

const galleryStrip = [photoCommunity, photoEducation, photoOutreach, photoYouth, photoWomen, photoHealth, photoGirlRise, photoHero];

const testimonials = [
  { name: "Aisha M.", role: "Program Beneficiary", quote: "The skills training I received changed my life. I now run my own tailoring business and support my family." },
  { name: "Emeka O.", role: "Youth Volunteer", quote: "Volunteering with Prime Youths opened my eyes to the power of community service. I've grown as a person and leader." },
  { name: "Fatima K.", role: "Women's Program Graduate", quote: "I never imagined I could start my own business. The financial literacy program gave me the confidence and tools I needed." },
];

const news = [
  { tag: "Workshops", date: "July 2026", title: "Capacity Building Workshop by CSO-B", excerpt: "PYWEI participated in a transformative 2-day Capacity Building Workshop to strengthen organizational capacity.", image: photoCommunity },
  { tag: "Environment", date: "June 2026", title: "World Environment Day 2026", excerpt: "PYWEI commemorated World Environment Day with a peaceful awareness walk and tree-planting exercise in Makurdi.", image: photoOutreach },
  { tag: "Youth", date: "June 2026", title: "Gender Equality Sensitization at NYSC Camp", excerpt: "PYWEI engaged Corps Members at the NYSC Orientation Camp, Wannune, in a session on gender inequality.", image: photoYouth },
  { tag: "Policy", date: "July 2026", title: "Validation of the WEE Policy Framework", excerpt: "PYWEI joined the 5-Day Stakeholder Engagement and Validation Meeting for the domestication of the WEE Policy Framework.", image: photoWomen },
];

const Index = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const heroImage = settings?.hero_image_url || photoHero;
  const stats = settings?.impact_stats || { empowered: 5000, programs: 50, volunteers: 200, donations: 1000 };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="PYWEI stakeholder engagement meeting in Makurdi" className="w-full h-full object-cover" width={1441} height={960} />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>

        <div className="relative container mx-auto px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-card mx-auto mb-8 flex items-center justify-center shadow-elevated">
              <img src={logo} alt="Prime Youths & Women Empowerment Initiative logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
              <span className="block text-background">Prime Youths &amp; Women</span>
              <span className="block text-primary">Empowerment Initiative</span>
            </h1>

            <p className="text-secondary text-lg md:text-xl font-medium mb-10 min-h-[2rem]">
              <Typewriter phrases={["Empowering Youths for a Better Tomorrow", "Building Stronger Women, Stronger Communities", "Education. Skills. Dignity."]} />
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" className="rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base font-semibold px-8 py-3.5">
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" className="rounded-lg bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground text-base font-semibold px-8 py-3.5 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold px-8 py-3.5">
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-14 md:py-16 px-4 bg-card border-b border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter end={stats.empowered} suffix="+" label="People Empowered" icon={<Users className="w-7 h-7" />} />
            <Counter end={stats.programs} suffix="+" label="Programs Completed" icon={<GraduationCap className="w-7 h-7" />} />
            <Counter end={stats.volunteers} suffix="+" label="Active Volunteers" icon={<HandHelping className="w-7 h-7" />} />
            <Counter end={stats.donations} suffix="+" label="Donations Received" icon={<Heart className="w-7 h-7" />} />
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading
              centered={false}
              label="Who We Are"
              title="Transforming Lives Through Community & Empowerment"
            />
            <div className="space-y-5 text-muted-foreground leading-relaxed -mt-6 mb-8">
              <p>
                Prime Youths &amp; Women Empowerment Initiative (PYWEI) is a registered women and youth-led,
                community-driven NGO based in Makurdi, Benue State. We respond to the growing social vices and
                systemic barriers that prevent adolescents, young people and women from thriving.
              </p>
              <p>
                Since our founding, we have touched thousands of lives — equipping individuals with the tools and
                confidence to create a better future for themselves and their communities.
              </p>
            </div>
            <Link to="/about">
              <Button size="lg" className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3.5">
                Read Our Story <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={photoWomen}
              alt="PYWEI community impact session with women beneficiaries"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl shadow-elevated"
              loading="lazy"
            />
            <div className="absolute -bottom-6 left-6 md:-left-6 bg-card rounded-2xl px-7 py-5 shadow-elevated border border-border/70">
              <div className="font-heading text-3xl font-bold text-primary">5,000+</div>
              <p className="text-sm text-muted-foreground">Lives Transformed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading label="What We Do" title="Our Featured Programs" description="We run impactful programs addressing the most pressing needs of youths and women in our communities." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-background rounded-2xl overflow-hidden shadow-card border border-border/70 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{program.description}</p>
                  <Link to="/programs" className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/programs">
              <Button size="lg" variant="outline" className="rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3.5">
                View All Programs <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading label="Gallery" title="Moments of Impact" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryStrip.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
                className="overflow-hidden rounded-2xl"
              >
                <img src={img} alt={`PYWEI programme moment ${i + 1}`} className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button size="lg" className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3.5">
                View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-accent">
        <div className="container mx-auto">
          <SectionHeading label="Testimonials" title="Voices of Impact" description="Hear from the people whose lives have been transformed through our programs." />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border/70"
              >
                <Quote className="w-9 h-9 text-secondary mb-5" />
                <p className="text-foreground leading-relaxed mb-7">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="flex-1">
              <SectionHeading centered={false} label="Stay Updated" title="Latest News & Achievements" />
            </div>
            <Link to="/news" className="md:-mt-8">
              <Button variant="outline" className="rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                View All News <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-background rounded-2xl overflow-hidden border border-border/70 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.excerpt}</p>
                  <Link to="/news" className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-gradient">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">
              Join Us in Making a Difference
            </h2>
            <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you donate, volunteer, or spread the word — every action counts. Together, we can empower more
              lives across Nigeria and beyond.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" className="rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 py-3.5 shadow-elevated">
                  Donate Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3.5">
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
