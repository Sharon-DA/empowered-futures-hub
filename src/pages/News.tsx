import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "lucide-react";
import programYouth from "@/assets/program-youth.jpg";
import programWomen from "@/assets/program-women.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const posts = [
  { title: "2024 Annual Youth Summit Recap", date: "March 15, 2024", category: "Events", image: programYouth, excerpt: "Over 500 young leaders gathered for our biggest summit yet, featuring workshops on digital skills, entrepreneurship, and leadership development. The event brought together mentors, industry leaders, and passionate young people from across the region." },
  { title: "Women's Skill Workshop Graduation", date: "February 28, 2024", category: "Achievements", image: programWomen, excerpt: "30 women graduated from our 6-month vocational training program. Graduates received starter kits and business mentorship to launch their own enterprises. This cohort included tailors, hairdressers, and caterers ready to build their futures." },
  { title: "Community Health Drive Success", date: "January 20, 2024", category: "Events", image: programHealth, excerpt: "Our latest health awareness campaign reached over 1,000 community members with free screenings, vaccinations, and wellness education. Partners included local health centers and volunteer medical professionals." },
  { title: "Scholarship Awards Ceremony 2024", date: "January 5, 2024", category: "Achievements", image: programEducation, excerpt: "We awarded scholarships to 100 outstanding students from underserved communities. These scholarships will cover tuition, books, and learning materials for the upcoming academic year." },
  { title: "New Partnership Announcement", date: "December 10, 2023", category: "Announcements", image: heroBg, excerpt: "We're excited to announce a new partnership with leading tech companies to expand our digital skills training programs. This collaboration will provide access to world-class learning resources and mentorship." },
  { title: "End of Year Impact Report", date: "December 1, 2023", category: "Announcements", image: programYouth, excerpt: "Our 2023 impact report is here! This year, we reached over 5,000 individuals through our various programs, trained 200 volunteers, and expanded our reach to 20+ communities." },
];

const News = () => (
  <div>
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="News" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/75" />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">News & Updates</h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">Stay informed about our latest activities, events, and achievements.</p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border group"
            >
              <div className="h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-orange-light text-secondary font-semibold px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <button className="text-primary font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default News;
