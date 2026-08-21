import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Heart, HandHelping, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
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
  { title: "Youth Empowerment", description: "Digital skills, leadership training and mentorship that unlock potential.", image: photoYouth, index: "01" },
  { title: "Women Empowerment", description: "Vocational training, financial literacy and support networks for women.", image: photoWomen, index: "02" },
  { title: "Education Support", description: "Scholarships, tutoring and learning materials for underserved communities.", image: photoEducation, index: "03" },
  { title: "Health Awareness", description: "Community campaigns, screenings and wellness workshops.", image: photoHealth, index: "04" },
];

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
      try {
        const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
        if (data) setSettings(data);
      } catch {
        /* keep static defaults when backend is unavailable */
      }
    };
    fetchSettings();
  }, []);

  const heroImage = settings?.hero_image_url || photoHero;
  const stats = settings?.impact_stats || { empowered: 5000, programs: 50, volunteers: 200, donations: 1000 };

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero: asymmetric, image offset off-grid ─────────────── */}
      <section className="relative bg-forest">
        <div className="absolute inset-0 paper-texture opacity-40" />
        <span className="pointer-events-none select-none absolute -left-6 bottom-2 font-heading font-bold uppercase whitespace-nowrap text-[20vw] leading-[0.75] text-background/[0.05]">
          Empower
        </span>

        <div className="relative container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-card flex items-center justify-center shadow-elevated shrink-0">
                  <img src={logo} alt="Prime Youths & Women Empowerment Initiative logo" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
                </div>
                <span className="rule-label text-secondary">
                  <span className="h-px w-8 bg-secondary/60" />
                  Makurdi, Benue State &middot; Nigeria
                </span>
              </div>

              <h1 className="font-heading text-[2.9rem] leading-[0.98] md:text-6xl lg:text-[4.8rem] font-bold tracking-tight text-background mb-7">
                Prime Youths
                <span className="block pl-0 md:pl-16">&amp; Women</span>
                <span className="block text-secondary italic">Empowerment</span>
              </h1>

              <p className="text-background/85 text-lg md:text-xl font-medium mb-10 min-h-[2.5rem] max-w-xl">
                <Typewriter phrases={["Empowering Youths for a Better Tomorrow", "Building Stronger Women, Stronger Communities", "Education. Skills. Dignity."]} />
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/donate">
                  <Button size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-clay-deep text-base font-semibold px-9 py-3.5 shadow-elevated">
                    <Heart className="w-4 h-4 mr-2" /> Donate Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full bg-transparent border border-background/50 text-background hover:bg-background hover:text-forest text-base font-semibold px-9 py-3.5 transition-colors">
                    Volunteer With Us
                  </Button>
                </Link>
                <Link to="/about" className="inline-flex items-center gap-2 text-background/80 hover:text-secondary font-semibold text-base px-2 py-3.5 transition-colors">
                  Our Story <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Overlapping photo cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative h-[24rem] md:h-[32rem] lg:h-[34rem]"
            >
              <img
                src={heroImage}
                alt="PYWEI stakeholder engagement meeting in Makurdi"
                className="absolute right-0 top-0 w-[78%] h-[70%] object-cover rounded-[2rem] shadow-elevated"
                width={900}
                height={700}
              />
              <img
                src={photoGirlRise}
                alt="PYWEI girl-child empowerment session"
                className="absolute left-0 bottom-0 w-[58%] h-[52%] object-cover rounded-[2rem] border-4 border-forest shadow-elevated"
                loading="lazy"
              />
              <div className="absolute right-2 bottom-6 md:right-6 bg-secondary text-secondary-foreground rounded-2xl px-5 py-4 shadow-elevated">
                <div className="font-heading text-2xl md:text-3xl font-bold leading-none">2020</div>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-1 opacity-90">Since</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Impact strip overlapping the hero edge */}
        <div className="relative container mx-auto px-4 -mb-14 md:-mb-16 translate-y-6">
          <div className="bg-card rounded-[2rem] border border-border shadow-elevated px-6 py-9 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter end={stats.empowered} suffix="+" label="People Empowered" icon={<Users className="w-7 h-7" />} />
            <Counter end={stats.programs} suffix="+" label="Programs Completed" icon={<GraduationCap className="w-7 h-7" />} />
            <Counter end={stats.volunteers} suffix="+" label="Active Volunteers" icon={<HandHelping className="w-7 h-7" />} />
            <Counter end={stats.donations} suffix="+" label="Donations Received" icon={<Heart className="w-7 h-7" />} />
          </div>
        </div>
      </section>

      {/* ── Who We Are: broken grid ─────────────────────────────── */}
      <section className="relative section-padding pt-32 md:pt-40">
        <span className="watermark top-24">About</span>
        <div className="container mx-auto relative grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[26rem] md:h-[32rem] order-2 lg:order-1">
            <img
              src={photoWomen}
              alt="PYWEI community impact session with women beneficiaries"
              className="absolute left-0 top-0 w-[80%] h-[78%] object-cover rounded-[2rem] shadow-elevated"
              loading="lazy"
            />
            <img
              src={photoCommunity}
              alt="PYWEI community outreach"
              className="absolute right-0 bottom-0 w-[52%] h-[46%] object-cover rounded-[2rem] border-4 border-background shadow-elevated"
              loading="lazy"
            />
            <div className="absolute left-2 bottom-4 bg-forest text-background rounded-2xl px-6 py-4 shadow-elevated">
              <div className="font-heading text-3xl font-bold leading-none">5,000+</div>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-1 text-background/70">Lives Transformed</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <span className="rule-label text-secondary mb-5">
              <span className="h-px w-10 bg-secondary/60" /> Who We Are
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.9rem] font-bold leading-[1.1] text-foreground mt-4 mb-6">
              Transforming lives through
              <span className="italic text-secondary"> community</span> &amp; empowerment
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg mb-9 border-l-2 border-secondary/40 pl-6">
              <p>
                Prime Youths &amp; Women Empowerment Initiative (PYWEI) is a registered women and youth-led,
                community-driven NGO based in Makurdi, Benue State. We respond to the social vices and
                systemic barriers that keep adolescents, young people and women from thriving.
              </p>
              <p>
                Since our founding we have touched thousands of lives — equipping people with the tools and
                confidence to build a better future for themselves and their communities.
              </p>
            </div>
            <Link to="/about">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-forest font-semibold px-8 py-3.5">
                Read Our Story <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Programs: staggered index cards ────────────────────── */}
      <section className="relative section-padding bg-accent overflow-hidden">
        <span className="watermark">Programs</span>
        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-xl">
              <span className="rule-label text-secondary">
                <span className="h-px w-10 bg-secondary/60" /> What We Do
              </span>
              <h2 className="font-heading text-3xl md:text-[2.75rem] font-bold leading-[1.1] text-foreground mt-5">
                Five pillars, one <span className="italic text-primary">mission</span>
              </h2>
            </div>
            <Link to="/programs">
              <Button variant="outline" className="rounded-full border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                All Programs <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative bg-card rounded-[1.75rem] overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-500 flex flex-col ${
                  i % 2 === 1 ? "lg:translate-y-10" : ""
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms]" loading="lazy" />
                  <span className="absolute top-4 left-4 font-heading text-sm font-bold text-background/90 bg-forest/70 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center">
                    {program.index}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{program.description}</p>
                  <Link to="/programs" className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery: broken bento grid ─────────────────────────── */}
      <section className="relative section-padding pt-28 lg:pt-36 overflow-hidden">
        <span className="watermark">Gallery</span>
        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="rule-label text-secondary">
                <span className="h-px w-10 bg-secondary/60" /> Gallery
              </span>
              <h2 className="font-heading text-3xl md:text-[2.75rem] font-bold text-foreground mt-5">Moments of impact</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View full gallery <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[11rem]">
            {[
              { img: photoCommunity, span: "md:col-span-2 md:row-span-2" },
              { img: photoEducation, span: "" },
              { img: photoOutreach, span: "md:row-span-2" },
              { img: photoYouth, span: "" },
              { img: photoWomen, span: "md:col-span-2" },
              { img: photoHealth, span: "" },
              { img: photoGirlRise, span: "" },
            ].map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
                className={`overflow-hidden rounded-[1.5rem] h-40 md:h-auto ${tile.span}`}
              >
                <img src={tile.img} alt={`PYWEI programme moment ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[900ms]" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials: offset editorial quotes ──────────────── */}
      <section className="relative section-padding bg-forest overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-30" />
        <span className="pointer-events-none select-none absolute right-0 top-6 font-heading font-bold uppercase whitespace-nowrap text-[16vw] leading-none text-background/[0.05]">
          Voices
        </span>
        <div className="container mx-auto relative">
          <div className="max-w-xl mb-14">
            <span className="rule-label text-secondary">
              <span className="h-px w-10 bg-secondary/60" /> Testimonials
            </span>
            <h2 className="font-heading text-3xl md:text-[2.75rem] font-bold text-background mt-5">
              Voices of <span className="italic text-secondary">impact</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`rounded-[1.75rem] p-8 border ${
                  i === 1
                    ? "bg-secondary text-secondary-foreground border-secondary md:-translate-y-6"
                    : "bg-background/[0.06] text-background border-background/15"
                }`}
              >
                <Quote className={`w-9 h-9 mb-5 ${i === 1 ? "text-secondary-foreground/70" : "text-secondary"}`} />
                <p className="leading-relaxed mb-7">"{t.quote}"</p>
                <div className={`flex items-center gap-4 pt-5 border-t ${i === 1 ? "border-secondary-foreground/25" : "border-background/15"}`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold ${i === 1 ? "bg-secondary-foreground text-secondary" : "bg-secondary text-secondary-foreground"}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className={`text-sm ${i === 1 ? "text-secondary-foreground/80" : "text-background/60"}`}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News: featured + list ──────────────────────────────── */}
      <section className="relative section-padding overflow-hidden">
        <span className="watermark">Updates</span>
        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="rule-label text-secondary">
                <span className="h-px w-10 bg-secondary/60" /> Stay Updated
              </span>
              <h2 className="font-heading text-3xl md:text-[2.75rem] font-bold text-foreground mt-5">Latest news &amp; achievements</h2>
            </div>
            <Link to="/news">
              <Button variant="outline" className="rounded-full border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                View All News <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-card rounded-[2rem] overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-500"
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img src={news[0].image} alt={news[0].title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[900ms]" loading="lazy" />
                <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">{news[0].tag}</span>
              </div>
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">{news[0].date}</p>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3 leading-snug">{news[0].title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{news[0].excerpt}</p>
                <Link to="/news" className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>

            <div className="space-y-5 lg:pt-10">
              {news.slice(1).map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex gap-5 bg-card rounded-[1.5rem] border border-border p-4 shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <img src={item.image} alt={item.title} className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-[1.15rem] shrink-0" loading="lazy" />
                  <div className="min-w-0">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-secondary mb-1">{item.tag} &middot; {item.date}</p>
                    <h3 className="font-heading text-base md:text-lg font-bold text-foreground leading-snug mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative section-padding overflow-hidden">
        <div className="container mx-auto relative">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-clay-gradient px-8 py-16 md:px-16 md:py-20">
            <div className="absolute inset-0 paper-texture opacity-30" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-2xl">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary-foreground leading-[1.08] mb-6">
                Be part of the change in <span className="italic">Benue State</span>
              </h2>
              <p className="text-secondary-foreground/85 text-lg mb-10">
                Your support funds skills training, scholarships and health outreach for youths and women who need it most.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donate">
                  <Button size="lg" className="rounded-full bg-forest text-background hover:bg-forest/90 font-semibold px-8 py-3.5">
                    <Heart className="w-4 h-4 mr-2" /> Donate Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full bg-transparent border border-secondary-foreground/60 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-semibold px-8 py-3.5 transition-colors">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
