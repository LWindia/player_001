import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";

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

export default function Viewers() {
  const experienceCardsRef = useRef<HTMLDivElement>(null);
  const impactVideoRef = useRef<HTMLVideoElement>(null);
  const [impactVideoMuted, setImpactVideoMuted] = useState(true);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const vid = impactVideoRef.current;
    if (!vid) return;

    const tryPlay = () => {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          vid.muted = false;
          setImpactVideoMuted(false);
        }).catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  function toggleImpactAudio() {
    const vid = impactVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setImpactVideoMuted(vid.muted);
  }

  const scrollToExperience = () => {
    experienceCardsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden vignette pt-20"
          id="viewers-hero"
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
              <span className="block leading-[1.1] text-[clamp(1.75rem,6.5vw,4.5rem)] text-white">
                CHOOSE HOW YOU
              </span>
              <span className="block leading-[1.1] text-[clamp(1.75rem,6.5vw,4.5rem)] text-white">
                EXPERIENCE THE <span className="text-primary" style={{ textShadow: "0 0 40px rgba(255,46,46,0.8), 0 0 80px rgba(255,46,46,0.4)" }}>ARENA</span>
              </span>
            </motion.h1>

            <motion.div {...fadeUpProps(0.25)} className="text-center max-w-3xl mx-auto">
              <p className="text-[15px] md:text-[18px] text-white/80 leading-relaxed mb-2">
                You are not booking a ticket.
              </p>
              <p className="text-[15px] md:text-[18px] text-white/80 leading-relaxed mb-2">
                You are choosing
              </p>
              <p className="text-[15px] md:text-[18px] text-white font-semibold leading-relaxed">
                How close you want to be to the game.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── TIMELINE SECTION ─────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 relative border-y border-white/[0.05] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(1.1) saturate(1.5) contrast(1.3)" }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://res.cloudinary.com/dymamigxu/video/upload/v1774177397/Infinite_Loop_owwjk1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/5" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="THE ARENA TIMELINE"
                title="The game begins on 1st Aug 2026"
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["THE GAME BEGINS ON", "1st Aug 2026"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="max-w-4xl mx-auto">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-6">
                <p className="text-white/70 text-[15px] md:text-[17px] text-center mb-6">
                  A new episode unfolds every Sunday
                </p>
                <p className="text-primary text-[24px] md:text-[32px] font-display font-black text-center mb-8">
                  Total: 7 Episodes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div {...fadeUpProps(0.15)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 border border-primary/20">
                  <h3 className="text-white text-[16px] md:text-[18px] font-display font-bold mb-4">Episodes 1–5</h3>
                  <p className="text-primary text-[18px] md:text-[22px] font-display font-black mb-3">Live + Online Arena</p>
                  <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed">
                    Watch the game unfold in real-time as lakhs of players enter the arena and compete in high-stakes missions.
                  </p>
                </motion.div>

                <motion.div {...fadeUpProps(0.2)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 border border-primary/20">
                  <h3 className="text-white text-[16px] md:text-[18px] font-display font-bold mb-4">Episodes 6–7</h3>
                  <p className="text-primary text-[18px] md:text-[22px] font-display font-black mb-3">Physical Arena (Grand Scale)</p>
                  <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed">
                    Experience the final showdown live at India's biggest game arena. Witness the vault open and the champion crowned.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── EXPERIENCE CARDS SECTION ─────────────────────────────────────── */}
        <section
          ref={experienceCardsRef}
          className="py-12 md:py-16 px-5 sm:px-8 relative bg-black"
          id="experience-cards"
        >
          {/* Decorative elements */}
          <img
            src="https://res.cloudinary.com/dymamigxu/image/upload/v1774006346/element4_ncjhhh.png"
            alt=""
            aria-hidden="true"
            className="absolute top-10 right-8 w-20 h-20 md:w-24 md:h-24 object-contain opacity-20 pointer-events-none select-none animate-pulse"
            loading="lazy"
            decoding="async"
          />
          <img
            src="https://res.cloudinary.com/dymamigxu/image/upload/v1774006346/element4_ncjhhh.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-20 left-8 w-16 h-16 md:w-20 md:h-20 object-contain opacity-15 pointer-events-none select-none animate-pulse"
            style={{ animationDelay: "1s" }}
            loading="lazy"
            decoding="async"
          />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader
                eyebrow="CHOOSE YOUR ACCESS"
                title="SELECT YOUR EXPERIENCE"
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["SELECT YOUR", "EXPERIENCE"]}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Card 1: Single Episode Access */}
              <motion.div {...fadeUpProps(0.05)} className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border-2 border-white/[0.08] overflow-hidden group hover:border-white/[0.15] transition-all duration-300">
                {/* Decorative element in card */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774006346/element4_ncjhhh.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-3 -left-3 w-24 h-24 md:w-28 md:h-28 object-contain opacity-30 pointer-events-none select-none animate-spin"
                  loading="lazy"
                  decoding="async"
                  style={{ animationDuration: "20s" }}
                />
                {/* GIF element on right side */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860364/s67_zazo3l.gif"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 -right-[60px] w-[250px] h-[250px] md:w-[307px] md:h-[307px] object-contain opacity-40 pointer-events-none select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                  <div 
                    className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300 animate-slide-horizontal" 
                    style={{ boxShadow: "0 0 20px rgba(255,46,46,0.8)" }}
                  />
                </div>
                <div className="mb-4">
                  <span className="text-[24px]">🎟</span>
                  <h3 className="text-white text-[18px] md:text-[20px] font-display font-bold mt-2">
                    SINGLE EPISODE ACCESS
                  </h3>
                </div>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                  Step into the arena for one moment.
                </p>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-6">
                  Experience the game live<br />as one episode unfolds.
                </p>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-3">What You Get</p>
                  <ul className="space-y-2 text-white/60 text-[13px] md:text-[14px]">
                    <li>• Access to any 1 live episode</li>
                    <li>• Real-time mission + elimination viewing</li>
                    <li>• Entry into the arena experience</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">When</p>
                  <p className="text-white/60 text-[13px] md:text-[14px]">Every Sunday (starting 1st Aug 2026)</p>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">Price</p>
                  <p className="text-primary text-[22px] md:text-[26px] font-display font-black">₹250 + taxes</p>
                </div>

                <a
                  href="https://rzp.io/rzp/single-episode-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">WATCH ONE EPISODE</span>
                </a>
              </motion.div>

              {/* Card 2: Full Live Journey */}
              <motion.div {...fadeUpProps(0.1)} className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border-[3px] border-primary/30 overflow-hidden group hover:border-primary/50 transition-all duration-300">
                {/* Decorative element in card */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774006346/element4_ncjhhh.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-3 -left-3 w-24 h-24 md:w-28 md:h-28 object-contain opacity-35 pointer-events-none select-none animate-spin"
                  loading="lazy"
                  decoding="async"
                  style={{ animationDuration: "20s" }}
                />
                {/* GIF element on right side */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860364/s67_zazo3l.gif"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 -right-[60px] w-[250px] h-[250px] md:w-[307px] md:h-[307px] object-contain opacity-40 pointer-events-none select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
                  <div 
                    className="h-full w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-slide-horizontal" 
                    style={{ boxShadow: "0 0 30px rgba(255,46,46,1), 0 0 60px rgba(255,46,46,0.5)" }}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-sm">
                  <span className="text-white text-[10px] font-display font-bold tracking-wider">⭐ RECOMMENDED</span>
                </div>
                <div className="mb-4">
                  <span className="text-[24px]">🎟</span>
                  <h3 className="text-white text-[18px] md:text-[20px] font-display font-bold mt-2">
                    FULL LIVE JOURNEY (EPISODES 1–5)
                  </h3>
                </div>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                  Follow the game from the beginning.
                </p>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-6">
                  Watch how lakhs enter,<br />and the arena begins to change.
                </p>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-3">What You Get</p>
                  <ul className="space-y-2 text-white/60 text-[13px] md:text-[14px]">
                    <li>• Access to all 5 live episodes</li>
                    <li>• Complete early-stage journey of the game</li>
                    <li>• Watch players rise, fall, and adapt</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">When</p>
                  <p className="text-white/60 text-[13px] md:text-[14px]">Every Sunday (5 consecutive weeks)</p>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">Price</p>
                  <p className="text-primary text-[22px] md:text-[26px] font-display font-black">₹1000 + taxes</p>
                </div>

                <a
                  href="https://rzp.io/rzp/full-live-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">WATCH FULL JOURNEY</span>
                </a>
              </motion.div>

              {/* Card 3: Complete Experience */}
              <motion.div {...fadeUpProps(0.15)} className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border-2 border-white/[0.08] overflow-hidden group hover:border-white/[0.15] transition-all duration-300">
                {/* Decorative element in card */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774006346/element4_ncjhhh.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-3 -left-3 w-24 h-24 md:w-28 md:h-28 object-contain opacity-30 pointer-events-none select-none animate-spin"
                  loading="lazy"
                  decoding="async"
                  style={{ animationDuration: "20s" }}
                />
                {/* GIF element on right side */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860364/s67_zazo3l.gif"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 -right-[60px] w-[250px] h-[250px] md:w-[307px] md:h-[307px] object-contain opacity-40 pointer-events-none select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                  <div 
                    className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300 animate-slide-horizontal" 
                    style={{ boxShadow: "0 0 20px rgba(255,46,46,0.8)" }}
                  />
                </div>
                <div className="mb-4">
                  <span className="text-[24px]">🎟</span>
                  <h3 className="text-white text-[18px] md:text-[20px] font-display font-bold mt-2">
                    THE COMPLETE EXPERIENCE (ALL 7 EPISODES)
                  </h3>
                </div>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                  From first step to final vault.
                </p>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-6">
                  Experience the game in its entirety.
                </p>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-3">What You Get</p>
                  <ul className="space-y-2 text-white/60 text-[13px] md:text-[14px]">
                    <li>• Access to all 5 live episodes</li>
                    <li>• Entry to final 2 physical arena episodes</li>
                    <li>• Witness the final showdown</li>
                    <li>• Be present when the vault opens</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">When</p>
                  <p className="text-white/60 text-[13px] md:text-[14px]">July → August 2026</p>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">Price</p>
                  <p className="text-white/70 text-[16px] md:text-[18px] font-display font-semibold">To be announced</p>
                </div>

                <button
                  type="button"
                  onClick={scrollToExperience}
                  className="w-full group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white border border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-sm active:scale-[0.98]"
                >
                  <span className="relative z-10">GET PRIORITY ACCESS</span>
                </button>
              </motion.div>

              {/* Card 4: Final Arena */}
              <motion.div {...fadeUpProps(0.2)} className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border-2 border-white/[0.08] overflow-hidden group hover:border-white/[0.15] transition-all duration-300">
                {/* Decorative element in card */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774006346/element4_ncjhhh.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-3 -left-3 w-24 h-24 md:w-28 md:h-28 object-contain opacity-30 pointer-events-none select-none animate-spin"
                  loading="lazy"
                  decoding="async"
                  style={{ animationDuration: "20s" }}
                />
                {/* GIF element on right side */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860364/s67_zazo3l.gif"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 -right-[60px] w-[250px] h-[250px] md:w-[307px] md:h-[307px] object-contain opacity-40 pointer-events-none select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                  <div 
                    className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300 animate-slide-horizontal" 
                    style={{ boxShadow: "0 0 20px rgba(255,46,46,0.8)" }}
                  />
                </div>
                <div className="mb-4">
                  <span className="text-[24px]">🎟</span>
                  <h3 className="text-white text-[18px] md:text-[20px] font-display font-bold mt-2">
                    THE FINAL ARENA (PHYSICAL EXPERIENCE)
                  </h3>
                </div>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                  The game reaches its peak.
                </p>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-6">
                  This is where everything ends.
                </p>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-3">What You Get</p>
                  <ul className="space-y-2 text-white/60 text-[13px] md:text-[14px]">
                    <li>• Access to last 2 physical arena episodes</li>
                    <li>• Experience India's biggest game arena live</li>
                    <li>• Witness the final battles</li>
                    <li>• See the vault open</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">When</p>
                  <p className="text-white/60 text-[13px] md:text-[14px]">August 2026</p>
                </div>

                <div className="mb-6">
                  <p className="text-white text-[13px] md:text-[14px] font-display mb-2">Price</p>
                  <p className="text-white/70 text-[16px] md:text-[18px] font-display font-semibold">To be announced</p>
                </div>

                <button
                  type="button"
                  onClick={scrollToExperience}
                  className="w-full group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white border border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-sm active:scale-[0.98]"
                >
                  <span className="relative z-10">JOIN THE FINAL ARENA</span>
                </button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── CLOSING MESSAGE SECTION ──────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto relative">
            {/* Character image positioned absolutely on the right */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
              <div className="relative p-[5px]">
                <div 
                  className="absolute inset-0 rounded-sm animate-pulse"
                  style={{ 
                    border: "2.5px solid #ff2a2a",
                    boxShadow: "0 0 20px rgba(255, 42, 42, 0.8), 0 0 40px rgba(255, 42, 42, 0.6), 0 0 60px rgba(255, 42, 42, 0.4)",
                    animationDuration: "3s"
                  }}
                />
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774179134/ChatGPT_Image_Mar_22_2026_05_00_46_PM_zjki8z.png"
                  alt="Player 001"
                  className="w-[230px] h-auto object-contain relative z-10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Text content - centered across full width */}
            <motion.div {...fadeUpProps()} className="text-center w-full">
              <p className="text-white/70 text-[15.75px] md:text-[17.85px] leading-relaxed mb-3">
                How do you want to experience it?
              </p>
              <p className="text-white/70 text-[15.75px] md:text-[17.85px] leading-relaxed mb-3">
                Start with one moment.
              </p>
              <p className="text-white/70 text-[15.75px] md:text-[17.85px] leading-relaxed mb-3">
                Or experience the entire journey.
              </p>
              <p className="text-white text-[16.8px] md:text-[18.9px] font-semibold leading-relaxed">
                The choice is yours.
              </p>
            </motion.div>

            {/* Character image for mobile - below text */}
            <div className="md:hidden mt-8 flex justify-center">
              <div className="relative p-[5px]">
                <div 
                  className="absolute inset-0 rounded-sm animate-pulse"
                  style={{ 
                    border: "2.5px solid #ff2a2a",
                    boxShadow: "0 0 20px rgba(255, 42, 42, 0.8), 0 0 40px rgba(255, 42, 42, 0.6), 0 0 60px rgba(255, 42, 42, 0.4)",
                    animationDuration: "3s"
                  }}
                />
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774179134/ChatGPT_Image_Mar_22_2026_05_00_46_PM_zjki8z.png"
                  alt="Player 001"
                  className="w-48 h-auto object-contain relative z-10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPORTANT INFORMATION SECTION ────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="BEFORE YOU CHOOSE"
                title="IMPORTANT INFORMATION"
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["IMPORTANT", "INFORMATION"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <ul className="space-y-3 text-white/65 text-[14px] md:text-[16px]">
                <li>• This is a real-time experience</li>
                <li>• Episodes happen every Sunday</li>
                <li>• Access details will be shared after booking</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── IMPACT LINE SECTION ──────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUpProps()}>
              <p className="text-[clamp(1.25rem,3.2vw,2.2rem)] font-display font-black text-white uppercase leading-tight mb-2">
                🔥 This is not something you watch later.
              </p>
              <p className="text-[clamp(1.25rem,3.2vw,2.2rem)] font-display font-black text-primary uppercase leading-tight">
                This is something you experience live.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="mt-10 flex justify-center">
              <div className="relative w-full max-w-6xl rounded-xl overflow-hidden border border-white/[0.08]">
                <video
                  ref={impactVideoRef}
                  className="w-full h-auto"
                  src="https://res.cloudinary.com/dymamigxu/video/upload/v1774621141/0327_npxrwu.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                {/* Mute / Unmute toggle */}
                <button
                  type="button"
                  onClick={toggleImpactAudio}
                  className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 text-[11px] font-display tracking-[0.12em]"
                  aria-label={impactVideoMuted ? "Unmute video" : "Mute video"}
                >
                  {impactVideoMuted
                    ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</>
                    : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>
                  }
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── LIMITED ACCESS SECTION ───────────────────────────────────────── */}
        <section className="py-8 md:py-10 px-5 sm:px-8 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUpProps()}>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-3">
                Not everyone will be inside the arena.
              </p>
              <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed">
                Only those who choose to step in.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA SECTION ────────────────────────────────────────────── */}
        <section className="py-10 md:py-12 px-5 sm:px-8 bg-black/60 border-t border-white/[0.05]">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div {...fadeUpProps()}>
              <button
                type="button"
                onClick={scrollToExperience}
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">SELECT YOUR EXPERIENCE</span>
              </button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
