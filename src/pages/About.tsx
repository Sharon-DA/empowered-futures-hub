import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Users, Award, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const milestones = [
  { year: "2018", title: "Founded", description: "Prime Youths & Women Empowerment Initiative was born from a vision to transform communities." },
  { year: "2019", title: "First Youth Summit", description: "Organized our inaugural youth leadership summit with 150 attendees." },
  { year: "2020", title: "Women's Program Launch", description: "Launched vocational training programs for women during challenging times." },
  { year: "2021", title: "Education Initiative", description: "Distributed school supplies and scholarships to 500+ students." },
  { year: "2022", title: "Health Outreach", description: "Partnered with healthcare providers for community health campaigns." },
  { year: "2023", title: "5,000+ Lives Impacted", description: "Reached a major milestone of empowering over 5,000 individuals." },
];

const team = [
  { name: "Dr. Adaeze Obi", role: "Founder & Executive Director", bio: "A passionate advocate for youth development with over 15 years of experience in community empowerment." },
  { name: "Chukwuma Eze", role: "Programs Director", bio: "Leads the design and implementation of all empowerment programs across communities." },
  { name: "Fatima Ibrahim", role: "Women's Initiatives Lead", bio: "Champions women's economic empowerment through skills training and mentorship." },
  { name: "David Okonkwo", role: "Volunteer Coordinator", bio: "Manages our growing network of dedicated volunteers and community partners." },
];

const About = () => (
  <div>
    {/* Hero */}
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="About us" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/75" />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">About Us</h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">Discover our story, mission, and the team behind the impact.</p>
        </motion.div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: <Eye className="w-8 h-8" />, title: "Our Vision", text: "A world where every youth and woman has the opportunity, skills, and support to reach their full potential and contribute meaningfully to their communities." },
            { icon: <Target className="w-8 h-8" />, title: "Our Mission", text: "To empower youths and women through education, vocational training, health awareness, and community development programs that create lasting, sustainable impact." },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-primary mb-6">{item.icon}</div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding bg-accent">
      <div className="container mx-auto">
        <SectionHeading label="Our Journey" title="Milestones & Achievements" />
        <div className="max-w-3xl mx-auto space-y-0">
          {milestones.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex gap-6 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <span className="text-secondary font-bold text-sm">{m.year}</span>
                <h4 className="font-heading text-lg font-bold text-foreground">{m.title}</h4>
                <p className="text-muted-foreground mt-1">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Our Team" title="Meet the People Behind the Mission" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
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
