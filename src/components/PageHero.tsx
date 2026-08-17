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
  <section className="relative py-28 md:py-36 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={image}
        alt={imageAlt || title}
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />
    </div>

    {watermark && (
      <span className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 bottom-0 font-heading font-bold uppercase whitespace-nowrap text-[16vw] leading-[0.85] text-background/[0.07]">
        {watermark}
      </span>
    )}

    <div className="relative container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
        <span className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-secondary mb-5">
          <span className="h-px w-8 bg-secondary/60" />
          {eyebrow}
        </span>

        <h1 className="font-heading text-[2.4rem] leading-[1.08] md:text-5xl lg:text-6xl font-bold tracking-tight text-background mb-5">
          {title}
        </h1>

        {description && (
          <p className="text-background/85 text-base md:text-lg leading-relaxed max-w-2xl">{description}</p>
        )}

        <nav aria-label="Breadcrumb" className="mt-8 flex items-center gap-2 text-sm text-background/70">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-medium">{title}</span>
        </nav>
      </motion.div>
    </div>
  </section>
);

export default PageHero;
