import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Contact" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">Contact Us</h1>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">Have a question, want to volunteer, or partner with us? Reach out!</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We'd love to hear from you. Whether you're interested in our programs, want to volunteer, or have a partnership idea, don't hesitate to reach out.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "info@primeyouths.org" },
                  { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+234 800 000 0000" },
                  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Lagos, Nigeria" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  rows={5}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {loading ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
