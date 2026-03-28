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

export default function Application() {
  const formRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("4500px");

  useEffect(() => {
    // Listen for form submission and height adjustment messages from Zoho
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        const data = event.data.split('|');
        if (data.length >= 2) {
          const perma = data[0];
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden vignette pt-20"
          id="application-hero"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.32) saturate(1.4) contrast(1.1)" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-24">
            <motion.div {...fadeUpProps(0.1)} className="max-w-4xl">
              <h1 className="font-display font-black uppercase tracking-[-0.01em] mb-6">
                <span className="block leading-[1.05] text-[clamp(2rem,7vw,5rem)] text-white mb-3" style={{ textShadow: "0 0 40px rgba(255,46,46,0.4)" }}>
                  One Game. One Chance
                </span>
                <span className="block leading-[1.05] text-[clamp(2rem,7vw,5rem)] text-primary" style={{ textShadow: "0 0 50px rgba(255,46,46,0.6)" }}>
                  Everyone Deserves It
                </span>
              </h1>

              <motion.div {...fadeUpProps(0.25)} className="mb-8">
                <p className="text-[16px] md:text-[19px] text-white/80 leading-relaxed mb-2">
                  This is not just a form.
                </p>
                <p className="text-[16px] md:text-[19px] text-white font-semibold leading-relaxed">
                  This is your first step into the Player 001 Arena.
                </p>
              </motion.div>

              <motion.div {...fadeUpProps(0.35)} className="mb-10">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 backdrop-blur-sm">
                  <span className="text-[24px]">🎁</span>
                  <p className="text-white/90 text-[14px] md:text-[16px] leading-tight">
                    Fill this form to unlock the <span className="text-primary font-semibold">Player 001 Official Game Guide</span>
                    <br />
                    <span className="text-white/60 text-[13px]">(Your first real step inside the Arena)</span>
                  </p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.45)} className="mb-10">
                <p className="text-white/50 text-[13px] md:text-[15px] tracking-[0.2em] uppercase font-display">
                  Player 001 Could be You
                </p>
              </motion.div>

              <motion.div {...fadeUpProps(0.55)}>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
                  style={{ boxShadow: "0 0 30px rgba(255,46,46,0.5)" }}
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">UNLOCK MY GAME GUIDE</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FORM EXPERIENCE (PLACEHOLDER) ────────────────────────────────── */}
        <section
          ref={formRef}
          className="py-12 md:py-16 px-5 sm:px-8 relative bg-black pb-4"
          id="form-section"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.75rem,5.5vw,3rem)] font-display font-bold text-white leading-[1.1] mb-4" style={{ textShadow: "0 0 30px rgba(255,46,46,0.3)" }}>
                ENTER THE ARENA
              </h2>
              <p className="text-white/60 text-[14px] md:text-[16px]">
                Your journey begins here
              </p>
            </motion.div>

            {!submitted ? (
              <motion.div {...fadeUpProps(0.1)} className="relative">
                {/* Seamless Form Container */}
                <div className="relative bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.05]">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Loading shimmer (shows before iframe loads) */}
                  {!formLoaded && (
                    <div className="absolute inset-0 overflow-hidden z-20 bg-black/80">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ animationDuration: "2s" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4 animate-pulse">
                            <span className="text-primary text-[24px]">🎮</span>
                          </div>
                          <p className="text-white/70 text-[16px] md:text-[18px] font-display">
                            Loading Arena Entry Form…
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Zoho Form Iframe - Seamlessly integrated */}
                  <div className="relative z-10">
                    <iframe
                      ref={iframeRef}
                      aria-label="Player 001 - Application Form"
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
                      src="https://forms.zohopublic.in/player001couldbeyougm1/form/Player001ApplicationForm/formperma/4IT-t69CM7pY3DKrYVjA01AnapeA2Z16rnphGFVl92s?zf_rszfm=1"
                      onLoad={() => setFormLoaded(true)}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── POST-SUBMISSION SCREEN ───────────────────────────────────── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: springEase }}
                className="relative"
              >
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 md:p-16 border-2 border-primary/30 overflow-hidden text-center">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 mb-8 animate-pulse">
                      <span className="text-primary text-[36px]">✓</span>
                    </div>

                    <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-display font-black text-white leading-[1.1] mb-6" style={{ textShadow: "0 0 30px rgba(255,46,46,0.4)" }}>
                      The Game Has Noticed You.
                    </h2>

                    <p className="text-white/80 text-[15px] md:text-[17px] leading-relaxed mb-6">
                      You've successfully unlocked access to the <span className="text-primary font-semibold">Player 001 Game Guide</span>.
                    </p>

                    <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-8">
                      It's on its way to your WhatsApp / Email.
                    </p>

                    <div className="max-w-md mx-auto mb-10">
                      <p className="text-white/60 text-[14px] md:text-[15px] mb-4">Inside, you'll discover:</p>
                      <ul className="space-y-2 text-white/70 text-[13px] md:text-[14px] text-left">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>How the Arena actually works</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>How the Prize grows beyond ₹ 1 Million</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>What lies inside the Final Vault</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-white text-[15px] md:text-[17px] font-semibold mb-2">
                      This is where things start getting real.
                    </p>
                    <p className="text-white/60 text-[14px] md:text-[15px] mb-8">
                      👉 Keep your phone close.
                    </p>

                    <p className="text-white/70 text-[14px] md:text-[16px] mb-4">
                      How far you go… is up to you.
                    </p>

                    <p className="text-white/50 text-[13px] md:text-[15px] tracking-[0.2em] uppercase font-display">
                      Player 001 Could be You
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── REWARD SECTION ───────────────────────────────────────────────── */}
        {!submitted && (
          <section className="py-8 md:py-12 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUpProps()} className="text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="text-[32px]">🎁</span>
                  <h3 className="text-[clamp(1.5rem,4.5vw,2.25rem)] font-display font-bold text-white">
                    What You Unlock Next
                  </h3>
                </div>

                <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-6">
                  After you submit:
                </p>

                <div className="max-w-2xl mx-auto mb-8">
                  <div className="premium-card rounded-xl p-6 md:p-8 border border-primary/20">
                    <p className="text-white text-[15px] md:text-[17px] font-semibold mb-6">
                      You will receive the Official Game Guide
                    </p>
                    <p className="text-white/60 text-[14px] md:text-[15px] mb-4">You'll understand:</p>
                    <ul className="space-y-3 text-white/70 text-[13px] md:text-[14px] text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>How the Arena works</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>How the Prize grows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>What the Final Vault really means</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-primary text-[15px] md:text-[17px] font-semibold">
                  👉 This is your first real step inside the game
                </p>
              </motion.div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
