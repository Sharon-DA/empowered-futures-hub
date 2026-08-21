import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { Target, Eye, Users, Award, Calendar } from "lucide-react";
import heroBg from "@/assets/photo-hero.jpg";
import photoWomen from "@/assets/photo-women.jpg";
import photoGirlRise from "@/assets/photo-girlrise.jpg";

const milestones = [
  { year: "2020", title: "Founded in Makurdi", description: "Prime Youths and Women Empowerment Initiative was established in Makurdi, Benue State, with a vision to transform communities." },
  { year: "2021", title: "First Community Outreach", description: "Organized our first community outreach program in Makurdi, reaching over 100 beneficiaries." },
  { year: "2022", title: "Women's Program Launch", description: "Launched vocational training programs for women in Benue State during challenging times." },
  { year: "2023", title: "Education & Health Drives", description: "Distributed school supplies, scholarships, and partnered with healthcare providers for community health campaigns." },
  { year: "2024", title: "Growing Impact", description: "Expanded programs across Benue State, empowering thousands of youths and women." },
];

const team = [
  { name: "Dr. Adaeze Obi", role: "Founder & Executive Director", bio: "A passionate advocate for youth development with over 15 years of experience in community empowerment." },
  { name: "Chukwuma Eze", role: "Programs Director", bio: "Leads the design and implementation of all empowerment programs across communities." },
  { name: "Fatima Ibrahim", role: "Women's Initiatives Lead", bio: "Champions women's economic empowerment through skills training and mentorship." },
  { name: "David Okonkwo", role: "Volunteer Coordinator", bio: "Manages our growing network of dedicated volunteers and community partners." },
];

const About = () => (
  <div>
      <PageHero eyebrow="Who We Are" title="About Us" description="A women and youth-led, community-driven NGO based in Makurdi, Benue State — building dignity, skills and opportunity." image={heroBg} imageAlt="PYWEI team at a community engagement in Makurdi" watermark="About" />

    {/* Vision & Mission */}
    <section className="relative overflow-hidden section-padding">
      <span className="watermark">Mission</span>
      <div className="container mx-auto relative grid lg:grid-cols-[1fr_0.85fr] gap-14 items-center">
        <div className="grid gap-8">
          {[
            { icon: <Eye className="w-8 h-8" />, title: "Our Vision", text: "A world where every youth and woman has the opportunity, skills, and support to reach their full potential and contribute meaningfully to their communities." },
            { icon: <Target className="w-8 h-8" />, title: "Our Mission", text: "To empower youths and women through education, vocational training, health awareness, and community development programs that create lasting, sustainable impact." },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-card rounded-3xl p-8 md:p-10 border border-border/70 shadow-card hover:shadow-elevated transition-shadow duration-300">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-primary mb-6">{item.icon}</div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[24rem] lg:h-[34rem]">
          <img src={photoWomen} alt="PYWEI women's empowerment session" className="absolute right-0 top-0 w-[76%] h-[62%] object-cover rounded-[2rem] shadow-elevated" loading="lazy" />
          <img src={photoGirlRise} alt="PYWEI girl-child programme" className="absolute left-0 bottom-0 w-[60%] h-[50%] object-cover rounded-[2rem] border-4 border-background shadow-elevated" loading="lazy" />
          <div className="absolute right-3 bottom-8 bg-secondary text-secondary-foreground rounded-2xl px-5 py-4 shadow-elevated">
            <div className="font-heading text-2xl font-bold leading-none">Makurdi</div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-1 opacity-90">Benue State</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Timeline */}
    <section className="relative overflow-hidden section-padding bg-accent">
      <span className="watermark">Journey</span>
      <div className="container mx-auto relative">
        <SectionHeading label="Our Journey" title="Milestones & Achievements" />
        <div className="max-w-3xl mx-auto space-y-0 relative">
          {milestones.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className={`flex gap-6 pb-8 last:pb-0 ${i % 2 === 1 ? "md:pl-12" : ""}`}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <span className="rule-label text-secondary">{m.year}</span>
                <h4 className="font-heading text-xl font-bold text-foreground mt-2">{m.title}</h4>
                <p className="text-muted-foreground mt-1">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="relative overflow-hidden section-padding bg-card">
      <span className="watermark">Our Team</span>
      <div className="container mx-auto relative">
        <SectionHeading label="Our Team" title="Meet the People Behind the Mission" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-[1.75rem] p-7 border border-border shadow-card hover:shadow-elevated transition-all duration-500 ${i % 2 === 1 ? "lg:translate-y-8" : ""}`}>
              <div className="w-20 h-20 rounded-2xl bg-accent mb-5 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-heading text-lg font-bold text-foreground">{member.name}</h4>
              <p className="text-secondary text-sm font-semibold mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
