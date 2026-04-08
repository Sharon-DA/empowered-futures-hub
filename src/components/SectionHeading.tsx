import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeading = ({ label, title, description, centered = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
  >
    {label && (
      <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
        {label}
      </span>
    )}
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
