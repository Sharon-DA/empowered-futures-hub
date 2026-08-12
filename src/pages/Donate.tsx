import { motion } from "framer-motion";
import { Heart, CreditCard, QrCode, Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const donationImpact = [
  { amount: "₦5,000", impact: "School supplies for 1 child" },
  { amount: "₦10,000", impact: "Complete school kit for 1 student" },
  { amount: "₦25,000", impact: "1 month of vocational training" },
  { amount: "₦50,000", impact: "Full scholarship for 1 semester" },
  { amount: "₦100,000", impact: "Fund a community health screening" },
  { amount: "₦500,000", impact: "Sponsor an entire program cohort" },
];

const Donate = () => (
  <div>
    <section className="relative py-36 md:py-44 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Supporters of Prime Youths & Women Empowerment Initiative" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-5">
            <span className="h-px w-8 bg-secondary/60" /> Give Today <span className="h-px w-8 bg-secondary/60" />
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-5 tracking-tight">Support Our Work</h1>
          <p className="text-background/85 text-lg max-w-2xl mx-auto leading-relaxed">Every donation, no matter the size, creates ripples of change in our communities.</p>
        </motion.div>
      </div>
    </section>


    {/* Impact of Donations */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading label="Your Impact" title="See What Your Donation Can Do" description="Every naira counts. Here's how your contribution directly transforms lives." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {donationImpact.map((item, i) => (
            <motion.div
              key={item.amount}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="font-heading text-2xl md:text-3xl font-bold text-primary mb-2">{item.amount}</div>
              <p className="text-muted-foreground text-sm">{item.impact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Donation Methods */}
    <section className="section-padding bg-accent">
      <div className="container mx-auto">
        <SectionHeading label="How to Give" title="Donation Methods" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-green-light flex items-center justify-center text-primary mb-6">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">Bank Transfer</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Bank Name</span>
                <span className="font-semibold text-foreground">First Bank Nigeria</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Account Name</span>
                <span className="font-semibold text-foreground">Prime Youths & Women</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Account Number</span>
                <span className="font-semibold text-foreground">0123456789</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-orange-light flex items-center justify-center text-secondary mb-6">
              <QrCode className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">Mobile Transfer / QR Code</h3>
            <p className="text-muted-foreground mb-6">Scan the QR code below or use our mobile transfer details to make a quick donation.</p>
            <div className="bg-muted rounded-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">QR Code Coming Soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Thank You for Your Generosity</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Your support makes our programs possible. Together, we can empower more youths and women to build brighter futures.
          </p>
          <a href="mailto:primeyouthinitiative22@gmail.com">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 h-12">
              Contact Us for More Info
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Donate;
