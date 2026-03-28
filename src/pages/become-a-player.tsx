import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
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

export default function BecomeAPlayer() {
  const prizeVideoRef = useRef<HTMLVideoElement>(null);
  const [prizeVideoMuted, setPrizeVideoMuted] = useState(true);

  useEffect(() => {
    const vid = prizeVideoRef.current;
    if (!vid) return;

    const tryPlay = () => {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          vid.muted = false;
          setPrizeVideoMuted(false);
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
      { threshold: 0.5 }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  function togglePrizeAudio() {
    const vid = prizeVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setPrizeVideoMuted(vid.muted);
  }

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden vignette pt-20"
          id="become-player-hero"
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
                <span style={{
                  animationName: "heroWave",
                  animationDuration: "12s",
                  animationDelay: "-12s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                  color: "white"
                }}>1,00,000</span> PLAYERS WILL
              </span>
              <span className="block leading-[1.1] text-[clamp(1.75rem,6.5vw,4.5rem)] text-white">
                ENTER THE ARENA.
              </span>
              <span className="block leading-[1.1] text-[clamp(1.75rem,6.5vw,4.5rem)] text-white mt-2">
                <span style={{
                  animationName: "heroWave",
                  animationDuration: "12s",
                  animationDelay: "-10s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                  color: "white"
                }}>SEVEN EPISODES</span> LATER,
              </span>
              <span className="block leading-[1.1] text-[clamp(1.75rem,6.5vw,4.5rem)] text-white">
                ONLY <span style={{
                  animationName: "heroWave",
                  animationDuration: "12s",
                  animationDelay: "-8s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                  color: "white"
                }}>ONE CHAMPION</span> REMAINS.
              </span>
            </motion.h1>

            <motion.div {...fadeUpProps(0.25)} className="text-center max-w-3xl mx-auto">
              <p className="text-[15px] md:text-[18px] text-white font-semibold leading-relaxed mb-2">
                Player 001 Game is India's First Survival Reality Game
              </p>
              <p className="text-[15px] md:text-[18px] text-white font-semibold leading-relaxed">
                Built around Real-Life Situations
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FIRST SECTION: THE PLAYER 001 JOURNEY ───────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="THE PLAYER 001 JOURNEY"
                title=""
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="mb-12">
              <h3 className="text-white text-[18px] md:text-[20px] font-display font-bold mb-6 text-center">
                HOW THE GAME UNFOLDS
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 text-center">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                  The arena journey happens across 7 Episodes. Each episode includes 2–3 mission rounds, eliminations, and new challenges. With every episode, the arena becomes more intense.
                </p>
              </div>
            </motion.div>

            {/* Episode Ladder Table */}
            <motion.div {...fadeUpProps(0.2)} className="mb-12">
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
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 1</td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">1,00,000 → 75,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 2</td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">75,000 → 25,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 3</td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">25,000 → 8,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 4</td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">8,000 → 1,000</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 5</td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">1,000 → 100</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Online + Live Arena</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'rgba(255, 46, 46, 0.3)' }}>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 6</td>
                      <td className="text-white text-[13px] md:text-[15px] py-4 pr-4">100 → 10</td>
                      <td className="text-white/70 text-[13px] md:text-[15px] py-4">Physical Arena Battle</td>
                    </tr>
                    <tr>
                      <td className="text-primary text-[13px] md:text-[15px] font-semibold py-4 pr-4">Episode 7</td>
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

            <motion.div {...fadeUpProps(0.25)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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

            <motion.div {...fadeUpProps(0.3)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-12">
              <h4 className="text-white text-[16px] md:text-[18px] font-display font-bold mb-4">BATTLE INTEL</h4>
              <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                Before every episode, players receive Battle Intel. These are 60–90 minute evening sessions during the week where mission insights are revealed. Players learn how the upcoming challenge works.
              </p>
              <p className="text-white/60 text-[13px] md:text-[14px] italic">
                Important Note: Battle Intel sessions are not mandatory. But players who attend gain a strategic advantage inside the arena.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.35)} className="text-center">
              <p className="text-white text-[16px] md:text-[18px] font-semibold">
                Every Sunday the arena eliminates thousands. Until only one Player remains.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SECOND SECTION: THE ARENA IS OPEN ───────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                THE ARENA IS OPEN
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                Not every opportunity is designed for everyone. Most opportunities come with filters. They ask for marks, college names, past achievements, or experience. This one doesn't.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                WHO CAN ENTER THE ARENA
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  PLAYER 001 is built on a simple belief: Talent exists everywhere. But opportunities rarely reach everyone.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The arena is open to youth across India who are ready to step forward and experience something real.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mb-4">
                  If you are between 18 and 24, you are eligible to enter.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  It doesn't matter what you study or where you come from.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Engineering. Commerce. Arts. Science. Design. Any stream. Any background.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mb-6">
                  Because inside this arena, your past does not decide your progress.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-2">
                  What actually matters here is different: How you think when faced with a situation. How you respond when the pressure builds. How you make decisions when it matters.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  Not your marks. Not your fluency in English. Not your college brand.
                </p>
                <p className="text-primary text-[18px] md:text-[20px] font-display font-black mt-4">
                  Just you.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE PLAYER IDENTITY SYSTEM
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Inside the arena, every participant is assigned a unique Player Number.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  This is more than a label. It becomes your identity inside the game.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  From that moment onward, you are no longer known by your background.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mb-6">
                  You are known by your performance.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Your identity looks like this:
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <span className="text-primary text-[18px] md:text-[20px] font-display font-black">PLAYER #00021</span>
                  <span className="text-primary text-[18px] md:text-[20px] font-display font-black">PLAYER #034271</span>
                  <span className="text-primary text-[18px] md:text-[20px] font-display font-black">PLAYER #100000</span>
                </div>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                  This number represents your journey. Every mission you face. Every decision you make. Every step you take inside the arena.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="text-center mb-10">
              <p className="text-[clamp(1.25rem,3.2vw,2.2rem)] font-display font-black text-primary uppercase leading-tight">
                YOUR DEGREE DOESN'T ENTER THE ARENA YOU DO
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.25)} className="text-center">
              <Link href="/register">
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">UNLOCK YOUR GAME GUIDE NOW</span>
                </button>
              </Link>
              <p className="text-white/60 text-[13px] md:text-[14px] mt-4">
                Takes less than 2 minutes to begin. No selection filters. No hidden criteria.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── THIRD SECTION: THE PRIZE THAT NEVER STAYS THE SAME ─────────── */}
        <section className="relative py-12 md:py-16 px-5 sm:px-8 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(1.1) saturate(1.4) contrast(1.15)" }}
            />
          </div>
          <div className="absolute inset-0 z-0 bg-black/20" />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                THE PRIZE THAT NEVER STAYS THE SAME
              </h2>
            </motion.div>

            {/* Video — 16:9 responsive */}
            <motion.div
              {...fadeUpProps(0.05)}
              className="premium-card prize-card-animated rounded-2xl overflow-hidden mb-10 relative w-full"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                ref={prizeVideoRef}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dymamigxu/video/upload/v1773860439/s59_vdfzs4.mp4"
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              {/* Mute / Unmute toggle */}
              <button
                type="button"
                onClick={togglePrizeAudio}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 text-[11px] font-display tracking-[0.12em] cursor-pointer"
                aria-label={prizeVideoMuted ? "Unmute video" : "Mute video"}
              >
                {prizeVideoMuted
                  ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</>
                  : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>
                }
              </button>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="text-center mb-10">
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                Most games announce a cash prize, fix a number, and never touch it again. PLAYER 001 was never built to follow that rule.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE CHAMPION CASH PRIZE
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 text-center">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The Champion Cash Prize begins at:
                </p>
                <p className="text-primary text-[32px] md:text-[40px] font-display font-black mb-4">
                  ₹ 1 Million +
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  This is not an estimate. This is committed. Guaranteed from day one.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  But what defines this arena is not where the prize starts, it is how far that number can move before the game even begins.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE PRIZE ENGINE
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Inside PLAYER 001, the prize is not a static number sitting on a screen. It is a system designed to grow as the arena expands.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                  Every player who steps into the arena adds to its scale. Every partner who joins increases what is at stake.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mt-4">
                  This is not just participation happening around the game. This is the game itself growing in real time.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                AS THE ARENA EXPANDS
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The arena is built to become bigger with every step forward. More players entering. More intensity building. More value getting added into the system.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  And as that happens, the Champion Prize does not stay the same. It rises with the arena.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  The bigger the arena becomes before it begins, the bigger the Champion walks away with.
                </p>
              </div>
            </motion.div>

            {/* Final section with video background */}
            <div className="relative py-12 md:py-16" style={{ height: '90%' }}>
              {/* Background Video */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://res.cloudinary.com/dymamigxu/video/upload/v1774212442/0323_tknme9.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <motion.div {...fadeUpProps(0.25)} className="text-center mb-10">
                  <div className="inline-block bg-black/80 backdrop-blur-sm px-8 py-6 rounded-xl">
                    <p className="text-white/90 text-[15px] md:text-[17px] leading-relaxed mb-4">
                      It begins at ₹ 1 Million . But where it ends… no one knows.
                    </p>
                    <p className="text-primary text-[28px] md:text-[36px] font-display font-black">
                      ₹ 1 Million to ∞
                    </p>
                  </div>
                </motion.div>

                <motion.div {...fadeUpProps(0.3)} className="text-center flex flex-col items-center gap-4">
                  <Link href="/register">
                    <button
                      type="button"
                      className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                      <span className="relative z-10">UNLOCK YOUR GAME GUIDE</span>
                    </button>
                  </Link>
                  <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <p className="text-white/80 text-[13px] md:text-[14px]">
                      Your entry into the arena starts with one step.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOURTH SECTION: FINAL VAULT ─────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader
                eyebrow="FINAL VAULT : Only Player 001 can access"
                title=""
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="text-center max-w-4xl mx-auto mb-12">
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-4">
                Many players ask an important question.
              </p>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-4">
                If the Champion Cash Prize starts at ₹1 Million & keeps growing What else is there in the Final Vault
              </p>
              <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed">
                The answer is simple.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 text-center mb-12">
              <p className="text-white text-[18px] md:text-[20px] font-display font-bold mb-4">
                PLAYER 001 is designed as a multi-source reward ecosystem.
              </p>
              <p className="text-primary text-[24px] md:text-[28px] font-display font-black">
                The Final Vault the Gives You Everything
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE SPONSOR ECOSYSTEM
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  PLAYER 001 brings together partners from multiple industries.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  These partners contribute rewards, opportunities, and experiences to the arena.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  Examples of participating sectors include:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-6 space-y-2">
                  <li>• Hospitality partners</li>
                  <li>• Food & beverage brands</li>
                  <li>• Banking and financial partners</li>
                  <li>• Technology partners</li>
                  <li>• Travel partners</li>
                  <li>• Knowledge and learning partners</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  These sponsors may add:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2">
                  <li>• cash prizes</li>
                  <li>• brand rewards</li>
                  <li>• exclusive experiences</li>
                  <li>• travel opportunities</li>
                  <li>• special merchandise</li>
                  <li>• career opportunities</li>
                </ul>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mt-6">
                  Some rewards are added to specific rounds. Some are added directly to the Final Vault.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.25)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE ARENA GROWTH SYSTEM
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The arena also grows through player participation.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Every player who enters the arena contributes to the expansion of the ecosystem.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  A pre-determined value range is associated with participation in the arena.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  This value contributes to:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• rewards distributed during episodes</li>
                  <li>• player benefit systems</li>
                  <li>• and the Final Vault.</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  As more players enter the arena, the overall prize ecosystem grows.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.3)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE FINAL VAULT MAY CONTAIN
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The Final Vault begins at:
                </p>
                <p className="text-primary text-[28px] md:text-[32px] font-display font-black mb-6 text-center">
                  ₹1 Million +
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-6">
                  But it may also include:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• cash prize money</li>
                  <li>• brand rewards</li>
                  <li>• sponsored opportunities</li>
                  <li>• travel experiences</li>
                  <li>• internships & career exposure</li>
                  <li>• exclusive merchandise</li>
                </ul>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed italic">
                  And sometimes, things that cannot be predicted.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.35)} className="text-center">
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed">
                That is why the arena says:
              </p>
              <p className="text-primary text-[24px] md:text-[28px] font-display font-black mt-4">
                FROM ₹1 MILLION TO ∞
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FIFTH SECTION: WHAT IF YOU GET ELIMINATED ──────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHAT IF YOU GET ELIMINATED?
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto">
                In most competitions, elimination means you leave empty-handed.
              </p>
              <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed mt-4">
                PLAYER 001 works differently.
              </p>
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
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                PLAYER REWARD SYSTEM
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
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
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                WHAT THESE REWARDS INCLUDE
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
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

            <motion.div {...fadeUpProps(0.35)} className="text-center">
              <p className="text-primary text-[20px] md:text-[24px] font-display font-black">
                The arena tests you. The journey rewards you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SIXTH SECTION: TRANSFORMATION, NOT JUST PRIZE ──────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                TRANSFORMATION, NOT JUST PRIZE
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto mb-4">
                The ₹1 Million + Cash Prize inside the Final Vault is only one part of PLAYER 001.
              </p>
              <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed max-w-4xl mx-auto">
                The real value of the arena is the experience players gain through the journey.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-12">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                Because in real life, success is not decided by exams.
              </p>
              <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                It is decided by how you:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• Make decisions</li>
                <li>• Handle pressure</li>
                <li>• Work with people</li>
                <li>• Adapt to unexpected situations</li>
                <li>• Take responsibility for outcomes</li>
              </ul>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                These are life skills rarely taught in classrooms.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="text-center mb-12">
              <p className="text-primary text-[24px] md:text-[28px] font-display font-black">
                Real life Never Gives You a Question paper
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-8 text-center">
                HOW THE ARENA BUILDS THESE SKILLS
              </h3>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed text-center max-w-4xl mx-auto mb-8">
                Every episode of PLAYER 001 simulates a real-world situation.
              </p>
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed text-center max-w-4xl mx-auto mb-10">
                Players do not just learn concepts.
              </p>
              <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed text-center max-w-4xl mx-auto mb-10">
                They experience them inside missions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 1 — Decision Making</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    Players face rapid-choice scenarios where quick thinking matters.
                  </p>
                </div>
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 2 — Strategic Thinking</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    Participants learn how every move affects the future outcome.
                  </p>
                </div>
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 3 — Leadership</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    Players work with teams and understand responsibility.
                  </p>
                </div>
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 4 — Negotiation</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    Players practice persuasion and communication.
                  </p>
                </div>
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 5 — Crisis Handling</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    Unexpected twists force players to adapt.
                  </p>
                </div>
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 6 — Survival Under Pressure</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    The arena tests emotional control and resilience.
                  </p>
                </div>
                <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 md:col-span-2">
                  <h4 className="text-primary text-[16px] md:text-[18px] font-display font-bold mb-3">Episode 7 — The Final Test</h4>
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed">
                    Where preparation meets opportunity.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.25)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                THE ROLE OF BATTLE INTEL
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Before every episode, players receive Battle Intel.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  These are mission insights that help players understand the challenge ahead.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  It is like receiving a practice briefing before the real test begins.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  Something real life rarely offers.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.3)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                WHY THIS EXPERIENCE IS RARE
              </h3>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-2">
                  In real life: You rarely know what challenge is coming.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mb-6">
                  In PLAYER 001: You prepare. You enter the arena. You experience the outcome.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-2">
                  This helps players understand:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2">
                  <li>• Their strengths</li>
                  <li>• Their decision style</li>
                  <li>• Their leadership ability</li>
                  <li>• The skills they need to improve</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER NOTE SECTION WITH BACKGROUND ─────────────────────────── */}
        <section className="relative py-12 md:py-16 px-5 sm:px-8 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860358/s65_z1asit.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.4) saturate(1.2)", transform: "translateY(-200px)" }}
            />
          </div>
          <div className="absolute inset-0 z-0 bg-black/60" />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* BEYOND THE GAME Section */}
            <motion.div {...fadeUpProps(0.35)} className="mb-12">
              <h3 className="text-white text-[20px] md:text-[24px] font-display font-bold mb-6 text-center">
                BEYOND THE GAME
              </h3>
              <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 md:p-8 text-center max-w-4xl mx-auto">
                <p className="text-white/90 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Many participants may not win the vault.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mb-4">
                  But they will gain something far more valuable:
                </p>
                <p className="text-primary text-[20px] md:text-[24px] font-display font-black mb-6">
                  clarity about themselves.
                </p>
                <p className="text-white/90 text-[14px] md:text-[16px] leading-relaxed">
                  This clarity helps them make better career decisions, leadership choices, and life decisions.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.4)} className="text-center mb-12">
              <p className="text-primary text-[20px] md:text-[24px] font-display font-black">
                The arena does not just create winners.
              </p>
              <p className="text-white text-[18px] md:text-[20px] font-semibold mt-2">
                It creates stronger individuals ready for the real world.
              </p>
            </motion.div>

            {/* Footer Text */}
            <div className="max-w-4xl mx-auto text-center">
              <motion.div {...fadeUpProps()}>
                <p className="text-primary text-[24px] md:text-[28px] font-display font-black mb-6">
                  The Game that Gives Your Everything
                </p>
                <p className="text-white/90 text-[15px] md:text-[17px] leading-relaxed mb-2">
                  Some Will Watch
                </p>
                <p className="text-white/90 text-[15px] md:text-[17px] leading-relaxed mb-2">
                  Some will Play
                </p>
                <p className="text-white/90 text-[15px] md:text-[17px] leading-relaxed mb-2">
                  We don't like viewers
                </p>
                <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed">
                  Will like players
                </p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
