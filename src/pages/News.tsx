import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import heroBg from "@/assets/003.jpg";
import programYouth from "@/assets/6.jpg";
import programWomen from "@/assets/1.jpg";
import programHealth from "@/assets/Project Girl Rise.jpg";
import programEducation from "@/assets/J.jpg";
import wee1 from "@/assets/1.jpg";
import nysc6 from "@/assets/6.jpg";
import envA from "@/assets/A.jpg";
import skillsJ from "@/assets/J.jpg";
import cso000 from "@/assets/000.jpg";

const News = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setPosts(data);
      } else {
        // Fallback
        setPosts([
          { 
            title: "Strengthening Our Impact Through Capacity Building", 
            created_at: "2026-07-22T12:00:00Z", 
            category: "Workshops", 
            image_url: cso000, 
            excerpt: "PYWEI participated in a transformative 2-day Capacity Building Workshop organized by the Civil Society Organizations Benue State (CSO-B).",
            content: "Prime youths and women empowerment initiative participated in a transformative 2-day Capacity Building Workshop organized by the Civil Society Organizations Benue State (CSO-B), in collaboration with GoGreen Environmental Health Sustainability Initiatives, Elohim Development Foundation, and FJDP Makurdi.\n\nThe training brought together both emerging and established CSOs with a shared goal: to strengthen organizational capacity and enhance impact within our communities.\n\nOver the two days, we gained practical knowledge and hands-on tools in key areas such as:\n- Organizational development and internal systems.\n- Project planning and logical framework design.\n- Budgeting, financial management, and donor compliance.\n- Monitoring & Evaluation (M&E) tools and reporting.\n- Proposal writing and resource mobilization strategies.\n- Building strategic partnerships and consortiums.\n\nIt was an engaging and highly impactful experience that has further equipped our team to deliver sustainable, results-driven programs for youths and women.\n\nWe deeply appreciate CSO-B and its partners for this valuable opportunity and their commitment to strengthening the civil society ecosystem in Benue State.\n\nAt Prime Youths & Women Empowerment initiative, we remain committed to applying these learnings to drive meaningful change and empower our communities."
          },
          { 
            title: "Cohort 3 Digital & Employability Skills Training", 
            created_at: "2026-04-24T12:00:00Z", 
            category: "Skills Training", 
            image_url: skillsJ, 
            excerpt: "Successfully concluded 4 weeks of Digital & Employability Skills Training at Hub 17 Innovation Hub.",
            content: "After four impactful weeks of learning, growth, and transformation, we are excited to announce the successful completion of Cohort 3 of our Digital & Employability Skills Training, which officially closed on 24th April 2026.\n\nThe fourth and final week featured three days of intensive practical sessions designed to strengthen participants’ confidence and competence in digital literacy, employability readiness, and entrepreneurial development. On the final day, participants reflected on their journey, sharing inspiring testimonials on the knowledge, confidence, and practical skills gained throughout the training.\n\nParticipants expressed heartfelt appreciation to Prime youths and women empowerment initiative and all implementing partners for investing in their growth and equipping them with relevant digital and life skills to become self-reliant, competitive, and empowered to take charge of their futures.\n\nAs part of the closing ceremony, certificates were awarded to participants who demonstrated commitment by attending and actively participating throughout the full four weeks of training.\n\nWe extend our sincere gratitude to our amazing partners whose support made this cohort a success:\nHub 17 Innovation Hub – for providing a conducive learning environment, excellent facilities, and experienced facilitators who patiently guided participants throughout the program.\nCheerfulHands Initiative, Mother of FAITH Foundation, Roots Media and Dorcas women aid and care foundation, for their financial, technical, and strategic support towards empowering young people and women with future-ready skills.\n\nThis training continues to reinforce our commitment to bridging the digital divide, promoting employability, and advancing socio-economic inclusion for women and youth.\nTogether, we are building a generation of digitally empowered leaders and innovators."
          },
          { 
            title: "World Environment Day 2026", 
            created_at: "2026-06-05T12:00:00Z", 
            category: "Events", 
            image_url: envA, 
            excerpt: "PYWEI joined the global community to commemorate World Environment Day with an awareness walk and tree-planting exercise in Makurdi.",
            content: "Prime Youths & Women Empowerment initiative joined the global community in commemorating World Environment Day 2026, in collaboration with the Benue State Ministry of Environment and Water Resources, International Alert Nigeria, Civil Society Organizations, partner institutions, and passionate environmental advocates.\n\nUnder the theme: \"Urbanization and Climate Change: Building Resilient Cities for a Sustainable Future\" the day commenced with a peaceful awareness walk from B Division Police Station Junction, Ishaya Bakut Road, Makurdi, with participants carrying placards bearing powerful messages promoting environmental sustainability, climate action, and responsible urban development.\n\nThe road walk culminated at the Benue State Ministry of Environment and Water Resources, where the Honourable Commissioner and other distinguished stakeholders delivered keynote addresses emphasizing the urgent need for collective action in addressing climate change and creating sustainable communities.\n\nOne of the highlights of the celebration was the tree-planting exercise, symbolizing our shared commitment to restoring the environment and safeguarding the future. Partner organizations also distributed tree seedlings to participants to encourage continued planting efforts within communities.\n\nPrime youths and women empowerment initiative believe that protecting the environment is a shared responsibility. Through collaboration, awareness, and practical actions, we can build greener, healthier, and more resilient communities for generations to come.\nTogether, we are not only planting trees, we are planting hope, resilience, and a sustainable future."
          },
          { 
            title: "Domestication of the WEE Policy Framework", 
            created_at: "2026-07-03T12:00:00Z", 
            category: "Stakeholder Engagement", 
            image_url: wee1, 
            excerpt: "PYWEI participated in the 5-Day Stakeholder Engagement and Validation Meeting for the Domestication of the Women's Economic Empowerment (WEE) Policy Framework in Benue State.",
            content: "Prime youths and women empowerment initiative (PYWEI) was honored to participate in the 5-Day Stakeholder Engagement and Validation Meeting for the Domestication of the Women's Economic Empowerment (WEE) Policy Framework, organized by the Benue State Ministry of Women Affairs and Social Welfare in collaboration with the Nigeria Governors' Forum which started 1st July to 3rd July at Benue State planning hall, State Secretariate Makurdi.\n\nThe engagement, themed \"Strengthening Women's Economic Empowerment (WEE) Through Evidence-Based Policy Domestication and Stakeholder Engagement\" brought together government institutions, development partners, civil society organizations, community-based organizations, women-led groups, and other key stakeholders committed to advancing gender equality and inclusive economic growth in Benue State.\n\nThroughout the five-day engagement, participants critically reviewed the policy framework, shared valuable insights, and contributed recommendations aimed at ensuring that the domesticated policy reflects the realities, needs, and aspirations of women and girls across the state. The process emphasized the importance of evidence-based approaches, inclusive participation, and collaborative action in addressing barriers to women's economic advancement.\n\nAs an organization dedicated to empowering adolescents, young people, and women through education, economic inclusion, leadership development, and social justice, PYWEI remains committed to supporting policies and initiatives that expand opportunities for women, promote financial independence, and strengthen their participation in decision-making processes.\n\nWe commend the Benue State Ministry of Women Affairs and Social Welfare, the Nigeria Governors' Forum, development partners, and all stakeholders for facilitating this important process. We look forward to the successful domestication and implementation of the WEE Policy Framework as a catalyst for sustainable development, gender equality, and economic prosperity for women in Benue State.\n\nTogether, we can build a future where every woman has the opportunity, resources, and support needed to thrive."
          },
          { 
            title: "NYSC Camp Wannune Sensitization on Gender Equality", 
            created_at: "2026-06-17T12:00:00Z", 
            category: "Events", 
            image_url: nysc6, 
            excerpt: "PYWEI engaged Corps Members at the NYSC Orientation Camp, Wannune, in a sensitization session on Gender Inequality and children's rights.",
            content: "On 17th June 2026, Prime youths and women empowerment initiative (PYWEI) had the privilege of engaging Corps Members NYSC Orientation Camp, Wannune, in a sensitization session on Gender Inequality.\n\nRecognizing that these young graduates will soon be deployed to schools, organizations, industries, and communities across the country for their mandatory service year, the session emphasized their critical role as advocates for social change and community development.\n\nThe discussion focused on key issues that continue to fuel gender inequality: Girl Child Education, Child Abuse, Out-of-School Children. These topics are not only relevant to the realities many communities face but are also central to building inclusive, safe, and equitable societies.\n\nCorps Members were encouraged to become champions for children's rights, promote equal access to education, and contribute to creating environments where every child, regardless of gender, can thrive and realize their full potential.\n\nPrime Youths & Women Empowerment initiative believes that empowering young people with knowledge and awareness is essential to addressing the systemic barriers that perpetuate inequality.\nBy equipping Corps Members with these insights, we are investing in a generation of leaders who can drive positive change and foster more resilient communities.\n\nWe appreciate the management of the NYSC Orientation Camp, Wannune, for providing this valuable platform and commend the Corps Members for their enthusiasm and commitment to making a difference wherever they will be serving.\n\nTogether, we can create communities where every child is protected, educated, and empowered."
          },
          { 
            title: "Bridging the Gaps in Women's Health", 
            created_at: "2026-07-14T12:00:00Z", 
            category: "Stakeholder Engagement", 
            image_url: programHealth, 
            excerpt: "PYWEI participated in the Community Entry and Stakeholder Engagement Meeting organised by GIFSEP in partnership with CBM Global.",
            content: "Prime youths and women empowerment initiative (PYWEI), through the Network of Women in Agriculture Nigeria (NWAN), Benue State Chapter, participated in the Community Entry and Stakeholder Engagement Meeting for the Bridging the Gaps in Women's Health and Wellbeing Project.\n\nThe one-day meeting, organised by the Global Initiative for Food Security and Ecosystem Preservation (GIFSEP) in partnership with CBM Global, brought together key stakeholders to formally introduce the project, foster meaningful collaboration, identify opportunities for partnership, and strengthen mechanisms for coordinated implementation.\n\nHeld on 14 July 2026 at Doo Palace Hotel, Makurdi, Benue State, the engagement provided a valuable platform for stakeholders to share perspectives, build connections and explore collective actions towards addressing gaps affecting women's health and wellbeing.\n\nAs an organisation committed to women's empowerment, PYWEI continues to partner with like-minded organisations to champion health, well-being and rights of women and girls in our society."
          },
        ]);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
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

      <section className="section-padding min-h-[400px]">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id || post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border group"
                >
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={post.image_url || programYouth} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                      width={800} 
                      height={600} 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs bg-orange-light text-secondary font-semibold px-3 py-1 rounded-full">{post.category}</span>
                      <span className="text-xs text-muted-foreground">
                        {post.created_at ? format(new Date(post.created_at), "MMMM dd, yyyy") : "Recent"}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col border border-border"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="h-64 sm:h-80 shrink-0 overflow-hidden relative">
                <img
                  src={selectedPost.image_url || programYouth}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs bg-orange-light text-secondary font-semibold px-3 py-1 rounded-full">
                      {selectedPost.category}
                    </span>
                    <span className="text-xs text-white/90">
                      {selectedPost.created_at ? format(new Date(selectedPost.created_at), "MMMM dd, yyyy") : "Recent"}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  {(selectedPost.content || selectedPost.excerpt).split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default News;

