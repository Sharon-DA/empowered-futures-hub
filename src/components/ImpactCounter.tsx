import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

const Counter = ({ end, label, suffix = "", icon }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-accent mx-auto mb-4 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="font-heading text-4xl md:text-5xl font-bold text-foreground">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-muted-foreground mt-2 font-medium">{label}</p>
    </motion.div>
  );
};

export default Counter;
