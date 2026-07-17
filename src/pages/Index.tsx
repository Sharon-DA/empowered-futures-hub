import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Heart,
  HandHelping,
  ArrowRight,
  Quote,
  ChevronRight,
  Leaf,
  BookOpen,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import heroBg from "@/assets/hero-bg.jpg";
import programYouth from "@/assets/program-youth.jpg";
import programWomen from "@/assets/program-women.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";
import logo from "@/assets/logo.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const programs = [
  {
    title: "Youth Empowerment",
    description:
      "Equipping young people with digital skills, leadership training, and mentorship to unlock their full potential.",
    image: programYouth,
    icon: <Sparkles className="w-5 h-5" />,
    link: "/programs",
    color: "#2E8B00",
  },
  {
    title: "Women Empowerment",
    description:
      "Providing vocational training, financial literacy, and support networks for women to thrive economically.",
    image: programWomen,
    icon: <Leaf className="w-5 h-5" />,
    link: "/programs",
    color: "#F47920",
  },
  {
    title: "Education Support",
    description:
      "Scholarships, tutoring, and learning materials for children and young adults in underserved communities.",
    image: programEducation,
    icon: <BookOpen className="w-5 h-5" />,
    link: "/programs",
    color: "#2E8B00",
  },
  {
    title: "Health Awareness",
    description:
      "Community health campaigns, screenings, and wellness workshops to improve public health outcomes.",
    image: programHealth,
    icon: <Stethoscope className="w-5 h-5" />,
    link: "/programs",
    color: "#F47920",
  },
];

const testimonials = [
  {
    name: "Aisha M.",
    role: "Program Beneficiary",
    quote:
      "The skills training I received changed my life. I now run my own tailoring business and support my family.",
  },
  {
    name: "Emeka O.",
    role: "Youth Volunteer",
    quote:
      "Volunteering with Prime Youths opened my eyes to the power of community service. I've grown as a person and leader.",
  },
  {
    name: "Fatima K.",
    role: "Women's Program Graduate",
    quote:
      "I never imagined I could start my own business. The financial literacy program gave me the confidence and tools I needed.",
  },
];

const galleryImages = [
  programYouth,
  programWomen,
  programHealth,
  programEducation,
  heroBg,
];

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedNumber = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const inc = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += inc;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ─── Typing Animation ────────────────────────────────────────────────────────
const phrases = [
  "Empowering Youths for a Better Tomorrow",
  "Building Stronger Communities Together",
  "Uplifting Women Through Skills & Education",
  "Creating Leaders of the Future",
];

const TypingText = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <span className="text-[#F47920]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const Index = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const heroImage = settings?.hero_image_url || heroBg;
  const stats = settings?.impact_stats || {
    empowered: 5000,
    programs: 50,
    volunteers: 200,
    donations: 1000,
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="PYWEI Hero"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/40" />
          {/* Green tinted strip */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2E8B00]" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {/* Org name */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center p-3 overflow-hidden">
                <img src={logo} alt="PYWEI" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1
              className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Prime Youths &amp; Women
              <br />
              <span className="text-[#2E8B00]">Empowerment Initiative</span>
            </h1>

            {/* Typing tagline */}
            <div className="text-white/90 text-lg md:text-2xl font-medium min-h-[2.5rem] mb-10 flex items-center justify-center gap-0">
              <TypingText />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-[#F47920] text-white font-semibold px-8 py-3.5 rounded text-base hover:bg-[#d96812] transition-colors shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3.5 rounded text-base hover:bg-white hover:text-[#2E8B00] transition-colors"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#2E8B00] text-white font-semibold px-8 py-3.5 rounded text-base hover:bg-[#246f00] transition-colors"
              >
                Volunteer With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="bg-[#2E8B00] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {[
              { icon: <Users className="w-8 h-8" />, end: stats.empowered, suffix: "+", label: "People Empowered" },
              { icon: <GraduationCap className="w-8 h-8" />, end: stats.programs, suffix: "+", label: "Programs Completed" },
              { icon: <HandHelping className="w-8 h-8" />, end: stats.volunteers, suffix: "+", label: "Active Volunteers" },
              { icon: <Heart className="w-8 h-8" />, end: stats.donations, suffix: "+", label: "Donations Received" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 bg-white/10 rounded-full">{stat.icon}</div>
                <div className="text-4xl font-bold" style={{ fontFamily: "'Roboto Slab', serif" }}>
                  <AnimatedNumber end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-white/80 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Snippet ────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-[#F47920] text-sm font-semibold uppercase tracking-widest mb-3">
                Who We Are
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#111111] mb-6 leading-snug"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Transforming Lives Through
                <br />
                <span className="text-[#2E8B00]">Community & Empowerment</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Prime Youths &amp; Women Empowerment Initiative (PYWEI) is a non-governmental
                organisation based in Makurdi, Benue State, dedicated to empowering young people
                and women across Nigeria through education, skills training, and community
                development.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Since our founding, we have touched thousands of lives — equipping individuals
                with the tools and confidence to create a better future for themselves and their
                communities.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#2E8B00] text-white font-semibold px-6 py-3 rounded hover:bg-[#246f00] transition-colors"
              >
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={programWomen}
                  alt="PYWEI Community Impact"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Accent card */}
              <div className="absolute -bottom-6 -left-6 bg-[#F47920] text-white rounded-lg p-5 shadow-xl">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Roboto Slab', serif" }}>
                  5,000+
                </div>
                <div className="text-sm opacity-90">Lives Transformed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Programs Grid ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block text-[#F47920] text-sm font-semibold uppercase tracking-widest mb-3">
              What We Do
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-4"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Our Featured Programs
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
              We run impactful programs addressing the most pressing needs of youths and women in
              our communities.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-3 left-3 p-2 rounded-full text-white"
                    style={{ backgroundColor: program.color }}
                  >
                    {program.icon}
                  </div>
                </div>
                {/* Body */}
                <div className="p-5">
                  <h3
                    className="text-base font-bold text-[#111111] mb-2"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {program.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <Link
                    to={program.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                    style={{ color: program.color }}
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 border-2 border-[#2E8B00] text-[#2E8B00] font-semibold px-6 py-3 rounded hover:bg-[#2E8B00] hover:text-white transition-colors"
            >
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Image Gallery Carousel ────────────────────────────────────────── */}
      <section className="py-16 bg-[#111111] overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <span className="inline-block text-[#F47920] text-sm font-semibold uppercase tracking-widest mb-3">
            Gallery
          </span>
          <h2
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Moments of Impact
          </h2>
        </div>
        <div
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory px-8"
          style={{ scrollbarWidth: "none" }}
        >
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 h-48 rounded-lg overflow-hidden snap-start"
            >
              <img
                src={img}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-white border border-white/40 px-6 py-2.5 rounded text-sm font-medium hover:bg-white hover:text-[#111111] transition-colors"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[#F47920] text-sm font-semibold uppercase tracking-widest mb-3">
              Testimonials
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#111111] mb-4"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Voices of Impact
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Hear from the people whose lives have been transformed through our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gray-50 rounded-lg p-7 border-l-4 border-[#2E8B00] shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="w-8 h-8 text-[#F47920] mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic text-sm">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2E8B00] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111111] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News Preview ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="inline-block text-[#F47920] text-sm font-semibold uppercase tracking-widest mb-3">
                Stay Updated
              </span>
              <h2
                className="text-3xl font-bold text-[#111111]"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Latest News &amp; Achievements
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-[#2E8B00] font-semibold text-sm hover:underline"
            >
              View All News <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: programYouth,
                cat: "Youth",
                title: "PYWEI Trains 300 Youth in Digital Skills",
                date: "June 2025",
                excerpt: "Hundreds of young people in Benue State completed a 3-week intensive digital literacy training programme.",
              },
              {
                img: programWomen,
                cat: "Women",
                title: "Women's Empowerment Forum Draws Record Attendance",
                date: "May 2025",
                excerpt: "Over 500 women participated in our annual empowerment forum focusing on economic independence.",
              },
              {
                img: programHealth,
                cat: "Health",
                title: "Free Medical Outreach Reaches 2,000+ Residents",
                date: "April 2025",
                excerpt: "PYWEI partnered with healthcare providers to deliver free check-ups and medications to underserved communities.",
              },
            ].map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#F47920] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.cat}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                  <h3
                    className="text-base font-bold text-[#111111] mb-2 leading-snug group-hover:text-[#2E8B00] transition-colors"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-1 text-[#2E8B00] text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ────────────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2E8B00 0%, #1a5200 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Join Us in Making a Difference
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Whether you donate, volunteer, or spread the word — every action counts. Together,
              we can empower more lives across Nigeria and beyond.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-[#F47920] text-white font-semibold px-8 py-3.5 rounded text-base hover:bg-[#d96812] transition-colors shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#2E8B00] font-semibold px-8 py-3.5 rounded text-base hover:bg-white/90 transition-colors shadow-lg"
              >
                Get Involved
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;