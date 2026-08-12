import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, centered = true, light = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
  >
    {label && (
      <span
        className={`inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-4 ${
          light ? "text-secondary" : "text-secondary"
        }`}
      >
        <span className="h-px w-8 bg-secondary/60" />
        {label}
        {centered && <span className="h-px w-8 bg-secondary/60" />}
      </span>
    )}
    <h2
      className={`font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}
    >
      {title}
    </h2>
    {description && (
      <p
        className={`mt-5 max-w-2xl text-base md:text-lg leading-relaxed ${centered ? "mx-auto" : ""} ${
          light ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
