import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  watermark?: string;
}

const PageHero = ({ eyebrow, title, description, image, imageAlt, watermark }: PageHeroProps) => (
  <section className="relative bg-forest overflow-hidden">
    <div className="absolute inset-0 paper-texture opacity-40" />

    {watermark && (
      <span className="pointer-events-none select-none absolute left-4 bottom-0 font-heading font-bold uppercase whitespace-nowrap text-[13vw] leading-[0.75] text-background/[0.045]">
        {watermark}
      </span>
    )}

    <div className="relative container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="rule-label text-secondary mb-6">
            <span className="h-px w-10 bg-secondary/70" />
            {eyebrow}
          </span>

          <h1 className="font-heading text-[2.6rem] leading-[1.02] md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-background mt-4 mb-6">
            {title}
          </h1>

          {description && (
            <p className="text-background/80 text-base md:text-lg leading-relaxed max-w-xl">{description}</p>
          )}

          <nav aria-label="Breadcrumb" className="mt-9 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-background/60">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-secondary">{title}</span>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative lg:translate-y-6"
        >
          <div className="frame-offset rounded-[2rem]">
            <img
              src={image}
              alt={imageAlt || title}
              className="relative z-10 w-full h-64 md:h-[26rem] object-cover rounded-[2rem] shadow-elevated"
              width={1200}
              height={800}
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PageHero;
