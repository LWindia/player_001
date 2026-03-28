import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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

export default function Sponsorship() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [formLoaded, setFormLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("1200px");

  useEffect(() => {
    // Listen for height adjustment messages from Zoho
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        const data = event.data.split('|');
        if (data.length >= 2) {
          const height = parseInt(data[1], 10);
          
          // Adjust iframe height dynamically
          if (height && !isNaN(height)) {
            setIframeHeight(`${height + 50}px`);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Set form as loaded after a short delay
    setTimeout(() => setFormLoaded(true), 500);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden vignette pt-20"
          id="sponsorship-hero"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.37) saturate(1.35) contrast(1.08)" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/92 via-black/55 to-black/10" />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-24">
            <motion.h1
              {...fadeUpProps(0.1)}
              className="font-display font-black uppercase tracking-[-0.01em] mb-6 text-center"
            >
              <span className="block leading-[1.1] text-[clamp(2rem,7vw,5rem)] text-primary">
                OWN THE ARENA
              </span>
            </motion.h1>

            <motion.div {...fadeUpProps(0.25)} className="text-center max-w-4xl mx-auto">
              <p className="text-[15px] md:text-[18px] text-white font-semibold leading-relaxed mb-4">
                Partner with World's Biggest Survival Reality Game Happening Now in India : Player 001
              </p>
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed mb-4">
                India has never seen a survival reality game at this scale. Which means… brands have never had an opportunity like this before.
              </p>
              <p className="text-[15px] md:text-[17px] text-white font-semibold leading-relaxed">
                This is not sponsorship. This is ownership of attention at a national level.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.35)} className="text-center mt-8">
              <button
                type="button"
                onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">BECOME A PARTNER</span>
              </button>
              <p className="text-white/60 text-[13px] md:text-[14px] mt-4">
                Be part of the arena before it begins.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── ACCESS INDIA'S MOST POWERFUL AUDIENCE ───────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                ACCESS INDIA'S MOST POWERFUL AUDIENCE
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                PLAYER 001 is not built for a niche audience. It is built for India's most dynamic and hard-to-reach segment.
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• 1,00,000+ players entering the arena</li>
                <li>• Nationwide participation across cities and campuses</li>
                <li>• 18–24 age group — highly engaged, highly influential</li>
                <li>• Weekly engagement across multiple episodes</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                This is not passive viewership sitting behind screens. This is active participation where the audience lives inside the experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── THIS IS NOT JUST AN EVENT ───────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                THIS IS NOT JUST AN EVENT
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                PLAYER 001 is designed as a multi-episode journey, not a one-day activation.
              </p>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                It unfolds over weeks. It builds momentum over time. It keeps the audience continuously engaged.
              </p>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                Online arenas. Live interactions. Physical final battles.
              </p>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                Your brand is not seen once. It becomes part of the journey people remember.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── YOUR BRAND INSIDE THE ARENA ─────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                YOUR BRAND INSIDE THE ARENA
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                This is not about logo placement. This is about integration.
              </p>
              <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                Your brand can live inside the experience through:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• Arena branding across environments</li>
                <li>• Missions powered by your brand</li>
                <li>• Player interactions and engagement</li>
                <li>• Content visibility across episodes</li>
                <li>• Association with the Final Vault</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                Your brand powers a moment. Your brand becomes part of the reward. Your brand is experienced — not just seen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── BE PART OF THE GROWTH ───────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                BE PART OF THE GROWTH
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                PLAYER 001 introduces a system never seen before. The Prize Engine & The Final Vault
              </p>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                As the arena grows, the prize grows. From ₹ 1 Million to ∞
              </p>
              <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                Sponsors become part of this system by:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• contributing to the reward ecosystem</li>
                <li>• adding value to the Final Vault</li>
                <li>• increasing what is at stake</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                As the arena expands, your brand grows with it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PARTNERSHIP OPPORTUNITIES ───────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                PARTNERSHIP OPPORTUNITIES
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                We offer multiple levels of integration based on scale and visibility.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  Title Partner (1 Exclusive Slot)
                </h3>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  Arena Partner
                </h3>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  Episode Partner
                </h3>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  Category Partner (Food, Tech, Fashion, etc.)
                </h3>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  Prize Engine Partner
                </h3>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  Experience Partner
                </h3>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 md:col-span-2">
                <h3 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-2">
                  The Final Vault Partner
                </h3>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="text-center mt-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                Each category is designed to give a different level of presence, control, and impact.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHO SHOULD PARTNER ──────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHO SHOULD PARTNER
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                If your brand speaks to India's youth, this is where they will be.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                We are working across:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2">
                <li>• Gaming & Technology</li>
                <li>• Fashion & Lifestyle</li>
                <li>• Food & Beverage</li>
                <li>• Energy Drinks</li>
                <li>• Fintech & Banking</li>
                <li>• EdTech & Career Platforms</li>
                <li>• Telecom & Internet</li>
                <li>• Travel & Hospitality</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mt-6">
                This is where attention shifts. This is where culture builds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHAT YOUR BRAND GETS ────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHAT YOUR BRAND GETS
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                This is not one moment of visibility. This is repeated exposure across a growing journey.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-8">
              <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                Your brand benefits from:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• high visibility across multiple episodes</li>
                <li>• presence in both digital and physical arenas</li>
                <li>• deep content integration</li>
                <li>• direct engagement with youth audience</li>
                <li>• long-term brand recall</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                This is not advertising. This is participation in culture.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── BUILD THE ARENA WITH US ─────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                BUILD THE ARENA WITH US
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                Some brands will watch this happen. Some brands will be remembered for building it.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="text-center">
              <button
                type="button"
                onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">APPLY FOR PARTNERSHIP</span>
              </button>
              <p className="text-white/60 text-[13px] md:text-[14px] mt-4">
                Our team will connect with you for next steps.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PARTNERSHIP FORM ────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black" id="partnership-form">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-4">
                PARTNERSHIP FORM
              </h2>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                Tell us about your brand and interest:
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 overflow-hidden">
              {/* Loading shimmer (shows before iframe loads) */}
              {!formLoaded && (
                <div className="absolute inset-0 overflow-hidden z-20 bg-black/80 rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ animationDuration: "2s" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4 animate-pulse">
                        <span className="text-primary text-[24px]">🤝</span>
                      </div>
                      <p className="text-white/70 text-[16px] md:text-[18px] font-display">
                        Loading Partnership Form…
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ 
                overflow: "hidden",
                WebkitOverflowScrolling: "touch"
              }}>
                <iframe 
                  ref={iframeRef}
                  aria-label='PARTNERSHIP FORM' 
                  frameBorder="0"
                  scrolling="no"
                  style={{
                    height: iframeHeight,
                    width: "100%",
                    border: "none",
                    display: "block",
                    opacity: formLoaded ? 1 : 0,
                    transition: "opacity 0.5s ease, height 0.3s ease",
                    background: "transparent",
                    overflow: "hidden"
                  }}
                  src='https://forms.zohopublic.in/player001couldbeyougm1/form/PARTNERSHIPFORM/formperma/x-a9T8hPVp3tNquKv5YR1bOt2pjOTEdbYRcuTbLA_Ak'
                  onLoad={() => setFormLoaded(true)}
                />
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
