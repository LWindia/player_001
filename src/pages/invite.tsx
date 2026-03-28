import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { ParticleBackground } from "@/components/ui/particle-background";
import { AnimatedCounter } from "@/components/ui/animated-counter";

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

export default function Invite() {
  const [, setLocation] = useLocation();
  const [referralName, setReferralName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    age: "",
    city: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralName(decodeURIComponent(ref));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add form submission logic with referral tracking
    setLocation("/thank-you");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          className="relative w-full min-h-[90vh] flex items-center overflow-hidden pt-20"
          id="invite-hero"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.24) saturate(1.4) contrast(1.1)" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/90 via-black/75 to-black/90" />
          
          <ParticleBackground color="255, 46, 46" density={1.2} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-24">
            
            {referralName && (
              <motion.div {...fadeUpProps()} className="text-center mb-8">
                <p className="text-white/60 text-[14px] md:text-[16px] mb-2">You've been invited by</p>
                <p className="text-primary text-[24px] md:text-[32px] font-display font-black uppercase tracking-wide">
                  {referralName}
                </p>
              </motion.div>
            )}

            <motion.div {...fadeUpProps(0.1)} className="text-center mb-12">
              <h1 className="font-display font-black uppercase tracking-[-0.01em] mb-6">
                <span className="block leading-[1.05] text-[clamp(2.2rem,7.5vw,5.5rem)] text-white mb-4">
                  The World's Biggest
                </span>
                <span className="block leading-[1.05] text-[clamp(2.2rem,7.5vw,5.5rem)] text-white mb-4">
                  Survival Reality Game
                </span>
                <span className="block leading-[1.05] text-[clamp(2rem,6.5vw,4.5rem)] text-primary mt-6">
                  First Time in India
                </span>
              </h1>
              
              <p className="text-white/80 text-[16px] md:text-[20px] leading-relaxed mt-8 max-w-3xl mx-auto">
                1,00,000 Players will enter. Only one will walk away as PLAYER 001.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUpProps(0.2)} className="grid grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
              <div className="premium-card prize-card-animated rounded-xl p-5 md:p-6 text-center">
                <p className="text-[28px] md:text-[36px] font-display font-black text-white leading-none mb-2">
                  <AnimatedCounter value={11147} />
                </p>
                <p className="text-white/60 text-[11px] md:text-[13px] leading-tight">Players Applied</p>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-5 md:p-6 text-center">
                <p className="text-[28px] md:text-[36px] font-display font-black text-primary leading-none mb-2">
                  ₹<AnimatedCounter value={1008907} />
                </p>
                <p className="text-white/60 text-[11px] md:text-[13px] leading-tight">Growing Prize</p>
              </div>
            </motion.div>

            {/* Prize Highlight */}
            <motion.div {...fadeUpProps(0.25)} className="text-center mb-12">
              <div className="inline-flex items-center gap-3 premium-card prize-card-animated rounded-xl px-8 py-5">
                <div className="laser-line w-5 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] tracking-[0.2em] text-white/40 font-display mb-1">CHAMPION PRIZE STARTS AT</p>
                  <p className="text-primary text-[28px] md:text-[36px] font-display font-black leading-none">₹1 Million +</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── REGISTRATION FORM ────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader
                eyebrow="JOIN THE ARENA"
                title="Enter Player 001"
                centered
                titleSize="text-[clamp(1.8rem,6vw,4rem)]"
                mobileTitleSize="text-[clamp(1.89rem,6.3vw,4.2rem)]"
                mobileBreaks={["ENTER", "PLAYER 001"]}
              />
              <p className="text-white/70 text-[15px] md:text-[18px] leading-relaxed mt-6">
                Fill in your details to begin your journey to becoming Player 001
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="premium-card prize-card-animated rounded-xl p-6 md:p-10 space-y-5">
                
                {referralName && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-white/70 text-[13px] mb-1">Referred by</p>
                    <p className="text-primary text-[18px] font-display font-bold">{referralName}</p>
                  </div>
                )}

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

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide"
                  />
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

                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-black bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8"
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">👉 ENTER THE ARENA</span>
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ── WHAT AWAITS ──────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 relative overflow-hidden border-y border-white/[0.05]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1773858764/img8_g8l6vb.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.22) saturate(1.1) contrast(1.05)" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader
                eyebrow="WHAT AWAITS YOU"
                title="Inside The Arena"
                centered
                titleSize="text-[clamp(1.8rem,6vw,4rem)]"
                mobileTitleSize="text-[clamp(1.89rem,6.3vw,4.2rem)]"
                mobileBreaks={["INSIDE", "THE ARENA"]}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {[
                {
                  title: "The Prize Engine",
                  desc: "A prize that starts at ₹1 Million and grows with every player who enters. No ceiling. No limit.",
                },
                {
                  title: "7 Episodes",
                  desc: "Decision Making, Strategic Thinking, Leadership, Negotiation, Crisis Handling, Survival Under Pressure, The Final Test.",
                },
                {
                  title: "The Final Vault",
                  desc: "The vault that gives you everything. Reserved for only one player: Player 001.",
                },
              ].map((item, i) => (
                <motion.div key={item.title} {...fadeUpProps(i * 0.07)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h3 className="text-primary text-[16px] md:text-[18px] mb-4 font-display font-bold uppercase tracking-wide">{item.title}</h3>
                  <p className="text-white/65 leading-relaxed text-[14px] md:text-[15px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUpProps(0.2)} className="text-center">
              <p className="text-[clamp(1.3rem,3.5vw,2.5rem)] font-display font-black text-white uppercase leading-tight mb-8">
                This is not just a show
                <br />
                <span className="text-primary">This is a real survival game</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── ARENA PREVIEW ────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/80">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.8rem,6vw,4rem)] font-display font-black text-primary uppercase mb-6">
                Witness The Arena
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                "https://res.cloudinary.com/dymamigxu/image/upload/v1773860374/s26_glyxjc.jpg",
                "https://res.cloudinary.com/dymamigxu/image/upload/v1773860370/s70_dmemo3.jpg",
                "https://res.cloudinary.com/dymamigxu/image/upload/v1773860358/s65_z1asit.jpg",
                "https://res.cloudinary.com/dymamigxu/image/upload/v1773860356/s64_ntfvra.jpg",
                "https://res.cloudinary.com/dymamigxu/image/upload/v1773860305/s11_oxkxtw.png",
                "https://res.cloudinary.com/dymamigxu/image/upload/v1773860306/s21_jgs0yt.jpg",
              ].map((src, i) => (
                <div key={i} className="premium-card prize-card-animated rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="text-center">
              <p className="text-white/70 text-[15px] md:text-[18px] leading-relaxed mb-8">
                India has never seen an arena like this
              </p>
              <Link href="/">
                <a className="inline-flex items-center justify-center gap-3 px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white border border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-sm active:scale-[0.98] cursor-pointer">
                  EXPLORE THE FULL ARENA
                </a>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
