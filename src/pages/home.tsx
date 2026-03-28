import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Zap, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { ParticleBackground } from "@/components/ui/particle-background";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const BASE = import.meta.env.BASE_URL;
const img = (filename: string) => `${BASE}assets/${filename}`;
const heroBg = img("hf_20260310_154130_f9334d89-ecb9-4471-bdaa-c4f409908a5d.jpeg");
const prizeBg = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858750/7_lbnbem.png";
const vaultBg = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858764/img8_g8l6vb.jpg";
const historyBg = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858779/img9_fiakov.png";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.75, delay, ease: springEase },
  } as const;
}
// ── Hero Headline with delayed red ignition ───────────────────────────────────
// Single continuous wave across line1 only; line2 is fixed red with weld sparks
function HeroHeadline() {
  const line1 = "The World's Biggest Survival Reality Game".split(" ");
  const total = line1.length;
  const cycleDuration = 12;
  const spread = 5;

  const getDelay = (idx: number) => ((idx / total) * spread) - cycleDuration;

  const wordStyle = (idx: number): React.CSSProperties => ({
    animationName: "heroWave",
    animationDuration: `${cycleDuration}s`,
    animationDelay: `${getDelay(idx)}s`,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationFillMode: "both",
    color: "white",
  });

  return (
    <motion.h1
      id="hero-title"
      {...fadeUpProps(0.15)}
      className="font-display font-black uppercase tracking-[-0.01em] mb-6 sm:mb-4"
      style={{ color: "white" }}
    >
      <span className="block leading-[1.1] sm:leading-[0.92] text-[clamp(1.25rem,5.5vw,5.1rem)] sm:text-[clamp(1.75rem,6.5vw,5.1rem)]">
        {line1.map((word, i) => (
          <span key={`l1-${i}`}>
            <span style={wordStyle(i)}>{word}</span>
            {i < line1.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
      <span className="block mt-5 sm:mt-1 leading-[1.1] sm:leading-[0.92] text-[clamp(1.25rem,5.5vw,5.1rem)] sm:text-[clamp(1.75rem,6.5vw,5.1rem)]">
        <span style={{ color: "hsl(0 100% 59%)" }}>First Time in </span><span className="weld-text">India</span>
      </span>
    </motion.h1>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.65]);
  const arenaVideoRef = useRef<HTMLVideoElement>(null);
  const [arenaVideoMuted, setArenaVideoMuted] = useState(true);
  const vaultVideoRef = useRef<HTMLVideoElement>(null);
  const [vaultVideoMuted, setVaultVideoMuted] = useState(true);
  const playerVideoRef = useRef<HTMLVideoElement>(null);
  const [playerVideoMuted, setPlayerVideoMuted] = useState(true);

  useEffect(() => {
    const vid = arenaVideoRef.current;
    if (!vid) return;

    const tryPlay = () => {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          vid.muted = false;
          setArenaVideoMuted(false);
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

  useEffect(() => {
    const vid = vaultVideoRef.current;
    if (!vid) return;

    const tryPlay = () => {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          vid.muted = false;
          setVaultVideoMuted(false);
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

  useEffect(() => {
    const vid = playerVideoRef.current;
    if (!vid) return;

    const tryPlay = () => {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          vid.muted = false;
          setPlayerVideoMuted(false);
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

  function toggleArenaAudio() {
    const vid = arenaVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setArenaVideoMuted(vid.muted);
  }

  function toggleVaultAudio() {
    const vid = vaultVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setVaultVideoMuted(vid.muted);
  }

  function togglePlayerAudio() {
    const vid = playerVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setPlayerVideoMuted(vid.muted);
  }

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative w-full overflow-hidden bg-black"
          id="hero"
          aria-labelledby="hero-title"
          style={{ paddingTop: 'calc(7rem - 2px)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12" style={{ transform: 'translateY(5px)' }}>
            
            {/* Eyebrow - Above Image */}
            <motion.div {...fadeUpProps(0.1)} className="flex items-center gap-2 mb-6 sm:mb-8">
              <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-primary/80 font-display font-semibold uppercase">The Game That Gives You Everything</span>
            </motion.div>

            {/* Image Section in a Box */}
            <div className="relative w-full h-[calc(35vh-10px)] md:h-[calc(70vh-10px)] rounded-2xl overflow-hidden mb-8 border-4 border-white/20">
              {/* Background Image - More Prominent */}
              <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
                {/* Mobile Image */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774518086/banner-image-mobile-version-images.jpg_wga5oi.jpg"
                  alt=""
                  className="block sm:hidden w-full h-full object-cover object-center"
                  style={{ filter: "brightness(0.6) saturate(1.2) contrast(1.05)" }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                {/* Desktop Image */}
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860420/s41_k0egsf.jpg"
                  alt=""
                  className="hidden sm:block w-full h-full object-cover object-center"
                  style={{ filter: "brightness(0.6) saturate(1.2) contrast(1.05)" }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
            </div>

            {/* LIVE Stats Boxes - Below Image (No Background) */}
            <div className="relative z-20 -mt-16 sm:-mt-24 mb-12">
              <div className="flex flex-col items-center">
                <motion.div {...fadeUpProps(0.3)} className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl w-full mb-3">
                  <div className="premium-card prize-card-animated rounded-xl p-4 sm:p-5 border border-white/[0.08] bg-black/90 backdrop-blur-sm">
                    <p className="text-[24px] sm:text-[28px] md:text-[32px] font-display font-black text-white leading-none mb-2">
                      <AnimatedCounter value={11147} />
                    </p>
                    <p className="text-white/55 text-[10px] sm:text-[11px] leading-tight">Player's Joined Till Now</p>
                  </div>
                  <div className="premium-card prize-card-animated rounded-xl p-4 sm:p-5 border border-white/[0.08] bg-black/90 backdrop-blur-sm">
                    <p className="text-[24px] sm:text-[28px] md:text-[32px] font-display font-black text-white leading-none mb-2">
                      <AnimatedCounter value={1008907} />
                    </p>
                    <p className="text-white/55 text-[10px] sm:text-[11px] leading-tight">Growing Prize Money</p>
                  </div>
                </motion.div>
                <motion.p {...fadeUpProps(0.35)} className="text-white/70 text-[12px] sm:text-[13px] italic text-center mb-3">
                  The prize grows with every player who joins
                </motion.p>
                <motion.div {...fadeUpProps(0.4)} className="space-y-2.5">
                  <div className="flex items-center gap-3 pt-0.5 justify-center">
                    <div className="laser-line w-5 shrink-0" />
                    <div>
                      <p className="text-[11.5px] tracking-[0.2em] text-white font-display mb-0.5">PLAYER 001 &bull; WINNER CASH PRIZE STARTS AT</p>
                      <p className="text-primary text-[26px] sm:text-[32px] md:text-[40px] font-display font-black leading-none">1 Million +</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Black Background Section with Main Content */}
          <div className="relative bg-black pt-6 sm:pt-12 md:pt-16 pb-6 sm:pb-10 md:pb-12 overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                className="w-full h-full object-cover"
                src="https://cdn.dribbble.com/userupload/46353399/file/5657af743257c466354ddac1b85c3386.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/80" />
            </div>
            
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
              
              {/* Headline */}
              {(() => {
                const allWords = ["The", "World's", "Biggest", "Survival", "Reality", "Game"];
                const total = allWords.length;
                const cycleDuration = 12;
                const spread = 5;
                const wordStyle = (idx: number): React.CSSProperties => ({
                  animationName: "heroWave",
                  animationDuration: `${cycleDuration}s`,
                  animationDelay: `${((idx / total) * spread) - cycleDuration}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                  color: "white",
                });
                return (
                  <motion.div {...fadeUpProps(0.15)} className="mb-6 sm:mb-8">
                    <h1 id="hero-title" className="font-display font-black uppercase tracking-[-0.02em]">
                      {/* Mobile Layout */}
                      <span className="block sm:hidden">
                        <span className="block text-[5.8vw] leading-[1.08] whitespace-nowrap mb-2.5">
                          {allWords.slice(0, 3).map((word, i) => (
                            <span key={i} style={wordStyle(i)}>{word}{i < 2 ? " " : ""}</span>
                          ))}
                        </span>
                        <span className="block text-[5.8vw] leading-[1.08] whitespace-nowrap mb-2.5">
                          {allWords.slice(3).map((word, i) => (
                            <span key={i} style={wordStyle(i + 3)}>{word}{i < 2 ? " " : ""}</span>
                          ))}
                        </span>
                      </span>
                      {/* Desktop Layout */}
                      <span className="hidden sm:block text-[clamp(2.5rem,6vw,5rem)] leading-[1.08]">
                        {allWords.map((word, i) => (
                          <span key={i} style={wordStyle(i)}>{word}{i < allWords.length - 1 ? " " : ""}</span>
                        ))}
                      </span>
                    </h1>
                  </motion.div>
                );
              })()}

              {/* First Time in India */}
              <motion.div {...fadeUpProps(0.2)} className="mb-6 sm:mb-8">
                <p className="font-display font-black uppercase tracking-[-0.02em] text-[5.8vw] sm:text-[clamp(2rem,4vw,3.5rem)] leading-[1.08]">
                  <span style={{ color: "hsl(0 100% 59%)" }}>First Time in </span>
                  <span className="weld-text">India</span>
                </p>
              </motion.div>

              {/* Sub-copy */}
              <motion.div {...fadeUpProps(0.25)} className="mb-2 sm:mb-3">
                <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white font-semibold leading-relaxed">
                  Inspired by the Biggest Survival OTT Series
                  <br />
                  This time, the Game is Real - Player 001
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── WITNESS THE ARENA ────────────────────────────────────────────── */}
        <section
          className="pt-3 md:pt-4 pb-5 md:pb-8 px-5 sm:px-8 relative bg-black/60 border-y border-white/[0.05]"
          id="witness-arena"
          aria-labelledby="witness-arena-title"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="witness-arena-title">
              <SectionHeader
                eyebrow="WITNESS THE PLAYER 001 ARENA"
                title="India Has Never Seen An Arena Like This"
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["INDIA HAS NEVER", "SEEN AN ARENA", "LIKE THIS"]}
              />
              <p className="text-white/60 max-w-3xl mx-auto mt-5 leading-relaxed text-[14px] md:text-[16px]">
                For the first time in India, a massive survival arena opens its gates.
                <br className="hidden sm:block" />
                1,00,000 Players will enter. Only one will walk away as PLAYER 001.
                <br className="hidden sm:block" />
                This is where the game begins.
              </p>
            </motion.div>

            {/* Video — 16:9 responsive */}
            <motion.div
              {...fadeUpProps(0.05)}
              className="premium-card prize-card-animated rounded-2xl overflow-hidden mb-10 relative w-full"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                ref={arenaVideoRef}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dymamigxu/video/upload/v1773920629/hf_20260316_230441_b269bf4b-949d-47e4-89ff-191584e71c13_azvf7f.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Mute / Unmute toggle */}
              <button
                type="button"
                onClick={toggleArenaAudio}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 text-[11px] font-display tracking-[0.12em]"
                aria-label={arenaVideoMuted ? "Unmute video" : "Mute video"}
              >
                {arenaVideoMuted
                  ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</>
                  : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>
                }
              </button>
            </motion.div>

            {/* Three Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
              <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">WHO CAN ENTER THE ARENA</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>If you are <span className="text-primary font-bold">between 18 and 24,</span> you are eligible to enter.</p>
                  <p>It doesn't matter what you study or where you come from.</p>
                  <p>Engineering. Commerce. Arts. Science. Design. Any stream. Any background.</p>
                  <p className="text-white/85 font-semibold">Because inside this arena, your past does not decide your progress.</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.15)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">What actually matters here is different:</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-5">
                  <p>How you think when faced with a situation.</p>
                  <p>How you respond when the pressure builds.</p>
                  <p>How you make decisions when it matters.</p>
                </div>
                <div className="space-y-2 text-white/50 text-[13px] md:text-[14px] leading-relaxed">
                  <p>Not your marks.</p>
                  <p>Not your fluency in English.</p>
                  <p>Not your college brand.</p>
                  <p className="text-white font-semibold">Just you.</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.2)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">THE PLAYER IDENTITY SYSTEM</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-5">
                  <p>Inside the arena, every participant is assigned a unique Player Number.</p>
                  <p>This is more than a label. It becomes your identity inside the game.</p>
                  <p>From that moment onward, you are no longer known by your background. You are known by your performance.</p>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-white font-display text-[15px] md:text-[16px]">Your identity looks like this:</p>
                  <div className="space-y-1.5">
                    <p className="text-primary font-display font-bold text-[14px] md:text-[15px]">PLAYER #00021</p>
                    <p className="text-primary font-display font-bold text-[14px] md:text-[15px]">PLAYER #034271</p>
                    <p className="text-primary font-display font-bold text-[14px] md:text-[15px]">PLAYER #100000</p>
                  </div>
                </div>
                <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                  This number represents your journey. Every mission you face. Every decision you make. Every step you take inside the arena.
                </p>
              </motion.div>
            </div>

            {/* Impact line + CTA */}
            <motion.div {...fadeUpProps(0.2)} className="text-center">
              <p className="text-[clamp(1.25rem,3.2vw,2.2rem)] font-display font-black text-white uppercase leading-tight mb-8">
                YOUR DEGREE DOESN'T ENTER THE ARENA
                <br />
                <span className="text-primary">YOU DO</span>
              </p>
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="https://rzp.io/rzp/player001-could-be-you" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    <span className="relative z-10">👉 BECOME A PLAYER NOW</span>
                  </a>
                <p className="text-white/70 text-[13px] leading-relaxed">
                  Takes less than 2 minutes to begin.
                  <br />
                  No selection filters. No hidden criteria.
                </p>
              </div>

              {/* ── Arena image carousel ── */}
              {(() => {
                const imgs = [
                  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860374/s26_glyxjc.jpg",
                  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860370/s70_dmemo3.jpg",
                  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860358/s65_z1asit.jpg",
                  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860356/s64_ntfvra.jpg",
                  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860305/s11_oxkxtw.png",
                  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860306/s21_jgs0yt.jpg",
                ];
                const doubled = [...imgs, ...imgs];
                return (
                  <div className="w-full overflow-hidden mt-10 rounded-2xl">
                    <div className="arena-carousel-track">
                      {doubled.map((src, i) => (
                        <div key={i} className="shrink-0 w-[220px] h-[148px] mx-2 rounded-xl overflow-hidden">
                          <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </section>

        {/* ── THE PRIZE ENGINE ─────────────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative overflow-hidden border-y border-white/[0.05] bg-black"
          id="prize-engine"
          aria-labelledby="prize-engine-title"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="prize-engine-title">
              <SectionHeader 
                eyebrow="THE PRIZE ENGINE" 
                title="The Prize Money That Does Not Stay the Same" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.2rem,4.8vw,3.9375rem)]"
                mobileBreaks={["THE PRIZE MONEY THAT", "DOES NOT STAY THE SAME"]}
              />
            </motion.div>

            {/* Intro copy */}
            <motion.div {...fadeUpProps(0.03)} className="max-w-3xl mx-auto mb-6 md:mb-9 text-white/65 text-[14px] md:text-[16px] leading-relaxed text-center">
              <p className="mb-4">Most games announce a prize, and that prize remains the same from beginning to end. PLAYER 001 changes that completely. Here, the prize is not fixed. It is designed to grow with the game.</p>
            </motion.div>

            {/* Prize vault image */}
            <motion.div {...fadeUpProps(0.05)} className="w-full mb-8 md:mb-10 rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dymamigxu/image/upload/v1773920459/prize_engine-website.jpg_sgpo1u.jpg"
                alt="Prize Vault"
                className="w-full h-auto object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Three pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              <motion.div {...fadeUpProps(0.07)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">THE CHAMPION CASH PRIZE</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>The Champion Cash Prize begins at:</p>
                  <p className="text-primary text-[22px] md:text-[26px] font-display font-black leading-none">₹ 1 Million +</p>
                  <p>This is not an estimate.</p>
                  <p>This is committed. Guaranteed from day one.</p>
                  <p>But what defines this arena is not where the prize starts, it is how far that number can move before the game even begins.</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.14)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">THE PRIZE ENGINE</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>Inside PLAYER 001, the prize is not a static number sitting on a screen. It is a system designed to grow as the arena expands.</p>
                  <p>Every player who steps into the arena adds to its scale. Every partner who joins increases what is at stake.</p>
                  <p>This is not just participation happening around the game. This is the game itself growing in real time.</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.21)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">AS THE ARENA EXPANDS</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>The arena is built to become bigger with every step forward. More players entering. More intensity building. More value getting added into the system.</p>
                  <p>And as that happens, the Champion Prize does not stay the same. It rises with the arena.</p>
                  <p>The bigger the arena becomes before it begins, the bigger the Champion walks away with.</p>
                </div>
              </motion.div>
            </div>

            {/* Impact line + CTA */}
            <motion.div {...fadeUpProps(0.22)} className="text-center">
              <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-display font-black text-white uppercase leading-tight mb-4">
                It begins at ₹ 1 Million .
                <br />
                But where it ends…no one knows.
                <br />
                <span className="text-primary">₹ 1 Million to ∞</span>
              </p>
              <div className="flex flex-col items-center justify-center gap-3 mt-8">
                <a href="https://rzp.io/rzp/player001-could-be-you" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    <span className="relative z-10">👉 BECOME A PLAYER NOW</span>
                  </a>
                <p className="text-white/70 text-[13px] leading-relaxed">Your entry into the arena starts with one step.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── THE FINAL VAULT ──────────────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative border-y border-white/[0.05]"
          id="final-vault"
          aria-labelledby="final-vault-title"
        >
          <div className="absolute inset-0">
            <img
              src={vaultBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.26) saturate(1.05) contrast(1.03)" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/72 to-background/92" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="final-vault-title">
              <SectionHeader 
                eyebrow="THE FINAL VAULT" 
                title="Only One Player Reaches Here : Player 001" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["ONLY ONE PLAYER", "REACHES HERE :", "PLAYER 001"]}
              />
            </motion.div>

            {/* Narrative copy */}
            <motion.div {...fadeUpProps(0.05)} className="max-w-3xl mx-auto text-center mb-6 md:mb-9 space-y-4 text-white/65 text-[14px] md:text-[16px] leading-relaxed">
              <p>1,00,000 players will enter the arena. Many players ask an important question. If the Champion Cash Prize starts at &#8377;1 Million & keeps growing. What else is there in the Final Vault ? The answer is simple. The Final Vault that Gives You Everything</p>
            </motion.div>

            {/* Vault Video — 16:9 responsive */}
            <motion.div
              {...fadeUpProps(0.08)}
              className="premium-card prize-card-animated rounded-2xl overflow-hidden mb-10 relative w-full"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                ref={vaultVideoRef}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dymamigxu/video/upload/v1774549368/price_engine_nbvuwd.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Mute / Unmute toggle */}
              <button
                type="button"
                onClick={toggleVaultAudio}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 text-[11px] font-display tracking-[0.12em]"
                aria-label={vaultVideoMuted ? "Unmute video" : "Mute video"}
              >
                {vaultVideoMuted
                  ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</>
                  : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>
                }
              </button>
            </motion.div>

            {/* THE SPONSOR ECOSYSTEM */}
            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-10">
              <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">THE SPONSOR ECOSYSTEM</h3>
              <div className="space-y-4 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                <p>
                  PLAYER 001 brings together partners from multiple industries.
                </p>
                <p>
                  These partners contribute rewards, opportunities, and experiences to the arena.
                </p>
                <p className="text-white/80">
                  Hospitality | Food & beverage brands | Banking and financial | Technology | Travel | Knowledge & Learning
                </p>
                <p>
                  These sponsors may add:
                </p>
                <p className="text-white/80">
                  Sponsored cash prizes | brand rewards | exclusive experiences | travel opportunities | special merchandise | career opportunities & much more
                </p>
                <p>
                  Some rewards are added to specific rounds. Some are added directly to the Final Vault.
                </p>
              </div>
            </motion.div>

            {/* THE ARENA GROWTH SYSTEM */}
            <motion.div {...fadeUpProps(0.13)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-10">
              <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">THE ARENA GROWTH SYSTEM</h3>
              <div className="space-y-4 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                <p>
                  The arena also grows through player participation.
                </p>
                <p>
                  Every player who enters the arena contributes to the expansion of the ecosystem.
                </p>
                <p>
                  A pre-determined value range is associated with participation in the arena.
                </p>
                <p className="text-white/80">
                  This value contributes to:
                </p>
                <p>
                  Rewards distributed during episodes | player benefit systems and the Final Vault.
                </p>
                <p className="text-white/80">
                  As more players enter the arena,
                  <br />
                  the overall prize ecosystem grows.
                </p>
              </div>
            </motion.div>

            {/* THE FINAL VAULT MAY CONTAIN */}
            <motion.div {...fadeUpProps(0.16)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-10">
              <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">THE FINAL VAULT MAY CONTAIN</h3>
              <div className="space-y-4 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                <p>
                  The Final Vault begins at:
                </p>
                <p className="text-primary text-[32px] md:text-[40px] font-display font-black leading-none">
                  &#8377;1 Million +
                </p>
                <p>
                  But as sponsors join and the arena grows,
                  <br />
                  the rewards inside the vault continue to expand.
                </p>
                <p className="text-white/80">
                  Cash Prize Money | Brand Rewards | Sponsored Opportunities | Travel Experiences | Internships & Career exposure | Exclusive Merchandise
                </p>
                <p>
                  And sometimes, things that cannot be predicted.
                </p>
              </div>
            </motion.div>

            {/* Impact line */}
            <motion.div {...fadeUpProps(0.19)} className="text-center mb-8">
              <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-display font-black text-white uppercase leading-tight">
                That is why the arena says:
                <br />
                <span className="text-primary">The Game Ends When the Vault Opens</span>
              </p>
            </motion.div>

            {/* Vault Image */}
            <motion.div {...fadeUpProps(0.21)} className="w-full mb-8 md:mb-10 rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860378/s30_otjpmh.jpg"
                alt="The Final Vault"
                className="w-full h-auto object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUpProps(0.23)} className="text-center mb-16">
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="https://rzp.io/rzp/player001-could-be-you" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    <span className="relative z-10">👉 BECOME A PLAYER NOW</span>
                  </a>
                <p className="text-white/70 text-[13px] italic">Witness the Vault Open Live</p>
              </div>
            </motion.div>

            {/* THE PLAYER 001 JOURNEY - Section Header */}
            <motion.div {...fadeUpProps(0.25)} className="text-center mb-8">
              <SectionHeader 
                eyebrow="THE PLAYER 001 JOURNEY" 
                title="How the Game Player 001 Unfolds" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["HOW THE GAME", "PLAYER 001", "UNFOLDS"]}
              />
            </motion.div>

            {/* Journey Description */}
            <motion.div {...fadeUpProps(0.27)} className="mb-8 text-center">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed max-w-3xl mx-auto">
                The arena journey happens across 7 Episodes. Each episode includes 2–3 mission rounds, eliminations, and new challenges. With every episode, the arena becomes more intense.
              </p>
            </motion.div>

            {/* Journey Image */}
            <motion.div {...fadeUpProps(0.29)} className="w-full mb-12 rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860358/s65_z1asit.jpg"
                alt="Player 001 Arena Journey"
                className="w-full h-auto object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Episode Ladder Table */}
            <motion.div {...fadeUpProps(0.26)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                FROM 1,00,000 → 1 | EPISODE LADDER
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: '#ff2e2e' }}>
                      <th className="text-white text-[14px] md:text-[16px] font-display font-bold pb-4 pr-4">EPISODE</th>
                      <th className="text-white text-[14px] md:text-[16px] font-display font-bold pb-4 pr-4">ARENA REDUCTION</th>
                      <th className="text-white text-[14px] md:text-[16px] font-display font-bold pb-4">MODE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 1
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(Decision Making)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">1,00,000 → 75,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 2
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(Strategic Thinking)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">75,000 → 25,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 3
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(Leadership)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">25,000 → 8,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 4
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(Negotiation)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">8,000 → 1,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 5
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(Crisis Handling)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">1,000 → 100</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 6
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(Survival Under Pressure)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">100 → 10</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Physical Arena Battle</td>
                    </tr>
                    <tr>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">
                        Episode 7
                        <br />
                        <span className="text-primary text-[11px] md:text-[12px] font-normal">(The Final Test)</span>
                      </td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">10 → 1</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Final Arena</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/60 text-[13px] md:text-[14px] mt-4 italic text-center">
                Each Episode includes 2–3 mission rounds & Final Arena Location for Episode 6 and 7 will be announced soon
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.27)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h4 className="text-white text-[16px] md:text-[18px] font-display font-bold mb-4">ARENA TIMELINE</h4>
                <p className="text-white/70 text-[14px] md:text-[15px] mb-2">Game Begins: <span className="text-primary font-semibold">1st July 2026</span></p>
                <p className="text-white/70 text-[14px] md:text-[15px]">Vault Opens On : <span className="text-primary font-semibold">30th August 2026</span></p>
              </div>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h4 className="text-white text-[16px] md:text-[18px] font-display font-bold mb-4">ARENA DAY</h4>
                <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  Episodes happen every Sunday. This is when the arena runs missions and eliminations.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.28)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-12">
              <h4 className="text-white text-[16px] md:text-[18px] font-display font-bold mb-4">BATTLE INTEL</h4>
              <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                Before every episode, players receive Battle Intel. These are 60–90 minute evening sessions during the week where mission insights are revealed. Players learn how the upcoming challenge works.
              </p>
              <p className="text-white/60 text-[13px] md:text-[14px] italic">
                Important Note: Battle Intel sessions are not mandatory. But players who attend gain a strategic advantage inside the arena.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.29)} className="text-center">
              <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-display font-black text-white uppercase leading-tight mb-8">
                Every Sunday the arena eliminates thousands. Until only one Player remains.
              </p>
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="https://rzp.io/rzp/player001-could-be-you" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    <span className="relative z-10">👉 BECOME A PLAYER NOW</span>
                  </a>
                <p className="text-white/70 text-[13px] italic">Some will watch. Some will Play</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PLAYER REWARD SYSTEM ─────────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative bg-black border-y border-white/[0.05]"
          id="player-reward-system"
          aria-labelledby="player-reward-system-title"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="player-reward-system-title">
              <SectionHeader 
                eyebrow="PLAYER REWARD SYSTEM" 
                title="What if You Get Eliminated ?" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["WHAT IF YOU GET", "ELIMINATED ?"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.05)} className="max-w-3xl mx-auto text-center space-y-4 text-white/65 text-[14px] md:text-[16px] leading-relaxed mb-12">
              <p>In most games or reality shows, elimination means you leave empty-handed. Player 001 works differently. Every step inside the arena unlocks Battle Rewards. Even if a player exists early, they still gain value from the journey.</p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="text-center mb-12">
              <p className="text-primary text-[24px] md:text-[28px] font-display font-black mb-6">
                NO PLAYER LEAVES EMPTY HANDED
              </p>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                Every step inside the arena unlocks Battle Rewards.
              </p>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto mt-2">
                Even if a player exits early, they still gain value from the journey.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="mb-12">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">PLAYER REWARD SYSTEM</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-white/80 text-[13px] md:text-[14px] font-display pb-3 pr-4">Episode</th>
                        <th className="text-white/80 text-[13px] md:text-[14px] font-display pb-3 pr-4">What Players Experience</th>
                        <th className="text-white/80 text-[13px] md:text-[14px] font-display pb-3">Value Unlocked</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="text-white text-[13px] md:text-[14px] py-3 pr-4">Episode 1</td>
                        <td className="text-white/70 text-[13px] md:text-[14px] py-3 pr-4">First Arena Mission</td>
                        <td className="text-primary text-[13px] md:text-[14px] py-3 font-semibold">Battle Kit worth ₹2,000</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="text-white text-[13px] md:text-[14px] py-3 pr-4">Episode 2</td>
                        <td className="text-white/70 text-[13px] md:text-[14px] py-3 pr-4">Strategy Challenge</td>
                        <td className="text-primary text-[13px] md:text-[14px] py-3 font-semibold">Battle Resources worth ₹5,000</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="text-white text-[13px] md:text-[14px] py-3 pr-4">Episode 3</td>
                        <td className="text-white/70 text-[13px] md:text-[14px] py-3 pr-4">Leadership Arena</td>
                        <td className="text-primary text-[13px] md:text-[14px] py-3 font-semibold">Elite Skill Tools worth ₹10,000</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="text-white text-[13px] md:text-[14px] py-3 pr-4">Episode 4</td>
                        <td className="text-white/70 text-[13px] md:text-[14px] py-3 pr-4">Negotiation Mission</td>
                        <td className="text-primary text-[13px] md:text-[14px] py-3 font-semibold">Tactical Playbook worth ₹20,000</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="text-white text-[13px] md:text-[14px] py-3 pr-4">Episode 5</td>
                        <td className="text-white/70 text-[13px] md:text-[14px] py-3 pr-4">Crisis Simulation</td>
                        <td className="text-primary text-[13px] md:text-[14px] py-3 font-semibold">Strategic Growth Kit worth ₹35,000</td>
                      </tr>
                      <tr>
                        <td className="text-white text-[13px] md:text-[14px] py-3 pr-4">Episode 6</td>
                        <td className="text-white/70 text-[13px] md:text-[14px] py-3 pr-4">Final Arena Preparation</td>
                        <td className="text-primary text-[13px] md:text-[14px] py-3 font-semibold">Champion Preparation Kit worth ₹50,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/60 text-[13px] md:text-[14px] mt-6 italic">
                  Important Clarification
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mt-2">
                  These are not cash payouts.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                  They are exclusive player rewards and resources designed to help participants grow beyond the arena.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.3)} className="mb-12">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">WHAT THESE REWARDS INCLUDE</h3>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2">
                  <li>• Battle Intel Access</li>
                  <li>• Exclusive Learning Resources</li>
                  <li>• Elite Skill Development Kits</li>
                  <li>• Strategic Playbooks</li>
                  <li>• Digital Tools & Frameworks</li>
                  <li>• Limited Edition Player Merchandise</li>
                  <li>• Arena Collectibles & Goodies</li>
                </ul>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.32)} className="mb-12">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">CASH THROUGHOUT THE ARENA</h3>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  PLAYER 001 GAME rewards players across the journey. This is not a winner-takes-all game.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Throughout the episodes players may unlock:
                </p>
                <p className="text-white/80 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Episode Rewards | Advantage Tokens | Battle Loot | Survival Boosts | Secret Drops | Wild Card | Duel Challenge| Immunity Pass | The Architect Move
                </p>
                <p className="text-primary text-[18px] md:text-[20px] font-display font-bold">
                  Millions of rupees will be distributed across the arena.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.34)} className="text-center mb-8">
              <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-display font-black text-white uppercase leading-tight">
                THE ARENA REWARDS
                <br />
                <span className="text-primary">THOSE WHO DARE TO PLAY</span>
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.36)} className="text-center mb-12">
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="https://rzp.io/rzp/player001-could-be-you" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    <span className="relative z-10">👉 BECOME A PLAYER NOW</span>
                  </a>
                <p className="text-white/70 text-[13px] italic">No player leaves empty handed</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WHAT YOU GET AS A PLAYER ─────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative bg-black border-y border-white/[0.05]"
          id="what-you-get"
          aria-labelledby="what-you-get-title"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="what-you-get-title">
              <SectionHeader 
                eyebrow="WHAT YOU GET AS A PLAYER" 
                title="Player 001 Could Be You" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["PLAYER 001", "COULD BE YOU"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.05)} className="max-w-3xl mx-auto text-center space-y-4 text-white/65 text-[14px] md:text-[16px] leading-relaxed mb-10">
              <p>For the First Time in India, a Survival Reality Game of this scale comes alive. 1,00,000 players step into the arena. Decisions are made under pressure. Only Survival reality game built around real-life situations. Not just a competition, Neither a Hackathon - A Real Game Player 001</p>
            </motion.div>

            {/* Video — 16:9 responsive */}
            <motion.div
              {...fadeUpProps(0.08)}
              className="premium-card prize-card-animated rounded-2xl overflow-hidden mb-10 relative w-full"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                ref={playerVideoRef}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dymamigxu/video/upload/v1774609367/playeroo1_qqrhlq.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Mute / Unmute toggle */}
              <button
                type="button"
                onClick={togglePlayerAudio}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 text-[11px] font-display tracking-[0.12em]"
                aria-label={playerVideoMuted ? "Unmute video" : "Mute video"}
              >
                {playerVideoMuted
                  ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</>
                  : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>
                }
              </button>
            </motion.div>

            <motion.div {...fadeUpProps(0.11)} className="text-center mb-12">
              <p className="text-[clamp(1.2rem,2.8vw,2rem)] font-display font-black uppercase leading-tight">
                NOT A NETFLIX SERIES
                <br />
                <span className="text-primary">ITS A REAL GAME - PLAYER 001</span>
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.13)} className="mb-10">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                WHAT YOU GET AS A PLAYER ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {[
                  {
                    title: "₹1M+ Prize Money",
                    desc: "Starting from ₹1 Million, the prize pool keeps growing with every player who joins in..",
                  },
                  {
                    title: "Growing Rewards",
                    desc: "This is not a fixed prize game — the bigger the arena grows, the bigger the rewards become.",
                  },
                  {
                    title: "Cash Distributed",
                    desc: "Rewards are not limited to the end — cash is distributed across multiple rounds in the arena.",
                  },
                  {
                    title: "Final Vault",
                    desc: "The ultimate reward goes beyond money — only Player 001 gets access to The Final Vault which has everything you want",
                  },
                  {
                    title: "Guaranteed Returns",
                    desc: "Every player walks away with something — rewards, experience, or opportunities.",
                  },
                  {
                    title: "Battle Intel",
                    desc: "Get pre-game insights and clarity — a system designed to prepare every player before they enter.",
                  },
                  {
                    title: "Fair System",
                    desc: "Structured, transparent, and designed to ensure every player gets a real chance.",
                  },
                  {
                    title: "Real Stakes",
                    desc: "Every move impacts your journey — decisions here carry real outcomes and real rewards.",
                  },
                  {
                    title: "National Arena",
                    desc: "Compete with players from across India in a high-stakes survival environment.",
                  },
                  {
                    title: "Skill Upgrade",
                    desc: "Build decision-making, strategy, and pressure-handling skills in real scenarios.",
                  },
                  {
                    title: "High Exposure",
                    desc: "Stand out on a national platform and get visibility for your performance.",
                  },
                ].map((item, i) => (
                  <motion.div key={item.title} {...fadeUpProps(0.15 + i * 0.02)} className="premium-card prize-card-animated rounded-xl p-6 md:p-7">
                    <h4 className="text-primary text-[15px] md:text-[16px] mb-3 font-display font-bold">{item.title}</h4>
                    <p className="text-white/65 leading-relaxed text-[13px] md:text-[14px]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.35)} className="text-center mb-8">
              <p className="text-white/80 text-[15px] md:text-[17px] leading-relaxed">
                Some will hear about it later.
                <br />
                Some will watch it online.
                <br />
                <span className="font-display text-primary text-[17px] md:text-[20px]">VERY FEW WILL SAY</span>
                <br />
                <span className="font-display text-white text-[22px] md:text-[30px]">&quot;I WAS THERE&quot;</span>
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.38)} className="text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="https://rzp.io/rzp/player001-could-be-you" target="_blank" rel="noopener noreferrer" className="group relative inline-flex flex-col items-center justify-center w-full sm:w-auto px-10 py-5 font-display text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    <span className="relative z-10 text-[13px] font-black tracking-[0.2em] uppercase mb-2">👉 BECOME A PLAYER NOW</span>
                    <span className="relative z-10 text-[11px] font-normal tracking-[0.1em] text-white/85 text-center">Game Arena Entry Fee : ₹456</span>
                    <span className="relative z-10 text-[11px] font-normal tracking-[0.1em] text-white/85 text-center">Be there</span>
                  </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WITNESS HISTORY UNFOLD ───────────────────────────────────────── */}
        <section
          className="hidden relative bg-black overflow-hidden min-h-[90vh] flex items-center"
          id="witness-history"
          aria-labelledby="witness-history-title"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black" />
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860323/s45_ore2bp.jpg"
              alt=""
              className="absolute top-0 h-full w-[calc(50%+800px)] md:w-[calc(55%+800px)] object-cover object-center"
              style={{ filter: "brightness(0.9) saturate(1.2) contrast(1.15)", right: "-800px" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
          </div>
          <ParticleBackground color="0, 255, 136" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-12">
            <motion.div {...fadeUpProps()} id="witness-history-title" className="text-center sm:text-left">
              <SectionHeader
                eyebrow="WITNESS HISTORY UNFOLD"
                title="Not Everything Is Created For Screens"
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["NOT EVERYTHING", "IS CREATED FOR", "SCREENS"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.08)} className="mt-7 space-y-3 text-white/65 text-[14px] md:text-[16px] leading-relaxed max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
              <p>You&apos;ve watched games. You&apos;ve followed stories.</p>
              <p>But some moments are not meant to be replayed. They are meant to be experienced as they happen.</p>
              <p>This Is One Of Those Moments.</p>
              <p>For the first time in India, a survival reality game of this scale comes alive. Lakhs of players step into the arena. Decisions are made under pressure. Eliminations change everything. And it all unfolds — live.</p>
            </motion.div>

            <motion.div {...fadeUpProps(0.11)} className="mt-6 text-center sm:text-left">
              <p className="text-[clamp(1.2rem,2.8vw,2rem)] font-display font-black uppercase leading-tight">
                NOT A NETFLIX SERIES
                <br />
                <span className="text-primary">ITS A REAL GAME — PLAYER 001</span>
              </p>
            </motion.div>

            {/* What you step into */}
            <motion.div {...fadeUpProps(0.18)} className="mt-10 premium-card rounded-xl p-6 md:p-8 max-w-2xl mx-auto sm:mx-0">
              <h3 className="text-white text-[15px] md:text-[17px] mb-4 font-display text-center sm:text-left">What You Step Into</h3>
              <div className="space-y-3 text-white/60 text-[13px] md:text-[15px] leading-relaxed text-left sm:text-left">
                <p>You don&apos;t just watch from a distance.</p>
                <p>You are present inside the arena environment where every moment carries weight.</p>
                <p>You see how players think. You feel the tension in every decision. You witness the exact moments where outcomes change.</p>
              </div>
            </motion.div>

            {/* Why this cannot be recreated */}
            <motion.div {...fadeUpProps(0.22)} className="mt-6 premium-card rounded-xl p-6 md:p-8 max-w-2xl">
              <h3 className="text-white text-[15px] md:text-[17px] mb-4 font-display text-center sm:text-left">Why This Cannot Be Recreated</h3>
              <p className="text-white/60 text-[13px] md:text-[15px] leading-relaxed text-left sm:text-left">
                No edits. No retakes. No second version. What happens inside the arena happens once — and only once.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.26)} className="mt-8 text-center sm:text-left">
              <p className="text-[clamp(1.2rem,2.8vw,2rem)] font-display font-black text-white uppercase leading-tight">
                SOME MOMENTS
                <br />
                <span className="text-primary">DO NOT REPEAT</span>
              </p>
            </motion.div>

            {/* Arena Access Pass */}
            <motion.div {...fadeUpProps(0.3)} className="mt-10 premium-card rounded-xl p-6 md:p-8 max-w-2xl border border-primary/20">
              <p className="text-[10px] tracking-[0.28em] text-primary/80 font-display mb-3">YOUR ACCESS TO THE ARENA</p>
              <h3 className="text-white text-[17px] md:text-[20px] mb-3 font-display">Arena Viewing Pass</h3>
              <p className="text-white/60 text-[13px] md:text-[15px] leading-relaxed mb-4">
                This is not just an entry. It is access to a moment that will be remembered long after the game ends.
              </p>
              <div className="flex items-center gap-2 text-primary/80 text-[11px] tracking-[0.18em] font-display">
                <span className="w-1.5 h-1.5 rounded-full bg-primary pulsate-red inline-block" />
                LIMITED PRESENCE — NOT OPEN TO EVERYONE
              </div>
            </motion.div>

            {/* Final impact line */}
            <motion.div {...fadeUpProps(0.35)} className="mt-10">
              <p className="text-white/80 text-[15px] md:text-[17px] leading-relaxed text-center md:text-left">
                Some will hear about it later.
                <br />
                Some will watch it online.
                <br />
                <span className="font-display text-primary text-[17px] md:text-[20px]">VERY FEW WILL SAY</span>
                <br />
                <span className="font-display text-white text-[22px] md:text-[30px]">&quot;I WAS THERE&quot;</span>
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.4)} className="mt-10">
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-11 py-4 bg-primary text-white font-display font-bold tracking-[0.2em] text-[11px] hover:bg-red-600 transition-all duration-300 clip-corner-all cta-pulse active:scale-[0.98]"
                >
                  BE THERE
                </button>
                <p className="text-white/70 text-[13px] italic">Witness the moment as it happens</p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
