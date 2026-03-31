import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { ParticleBackground } from "@/components/ui/particle-background";

const BASE = import.meta.env.BASE_URL;
const img = (filename: string) => `${BASE}assets/${filename}`;
const heroBg = img("hf_20260310_154130_f9334d89-ecb9-4471-bdaa-c4f409908a5d.jpeg");

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.75, delay, ease: springEase },
  } as const;
}

export default function Register() {
  const [, setLocation] = useLocation();
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby07uU4azOHR6gSIdO7oolFkvHjq2iL-s5nWw2i2H4atNtnJUQ8JRSrQLuGvVNUHhH1/exec";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    age: "",
    city: "",
    query: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // no-cors won't return errors, proceed anyway
    }
    setLocation("/thank-you");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-screen flex items-center overflow-hidden pt-20"
          id="register-hero"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.26) saturate(1.35) contrast(1.08)" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85" />
          
          <ParticleBackground color="255, 46, 46" density={0.8} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-24">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors w-fit mb-8">
              <ChevronLeft className="w-5 h-5 mr-1" /> BACK TO ARENA
            </Link>

            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader
                eyebrow="BEFORE YOU ENTER THE ARENA"
                title="Not Ready Yet? Start Here."
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["NOT READY YET?", "START HERE."]}
              />
              <p className="text-white/70 text-[15px] md:text-[18px] leading-relaxed mt-6 max-w-2xl mx-auto">
                Get the complete breakdown of Player 001 before you decide to enter.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="premium-card prize-card-animated rounded-xl p-6 md:p-10 space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="WhatsApp Number"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide"
                  />
                </div>

                <div>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide"
                  />
                </div>

                <div>
                  <textarea
                    name="query"
                    placeholder="Query (optional)"
                    rows={4}
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all resize-none font-display text-[15px] tracking-wide"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-black bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  {isSubmitting ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      SUBMITTING...
                    </span>
                  ) : (
                    <span className="relative z-10">👉 SEND ME THE DETAILS</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
