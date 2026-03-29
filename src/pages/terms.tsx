import type React from "react";
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

export default function Terms() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden vignette pt-20"
          id="terms-hero"
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
              <span className="block leading-[1.1] text-[clamp(2rem,7vw,4.5rem)] text-white">
                ARENA TRANSPARENCY
              </span>
            </motion.h1>

            <motion.div {...fadeUpProps(0.25)} className="text-center max-w-4xl mx-auto">
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed mb-4">
                PLAYER 001 is designed as a large-scale survival reality game.
              </p>
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed mb-4">
                Because of the scale, we believe players deserve complete clarity.
              </p>
              <p className="text-[15px] md:text-[17px] text-white font-semibold leading-relaxed">
                Below are the principles that define the arena.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 1: THIS IS A SKILL-BASED GAME ───────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                THIS IS A SKILL-BASED GAME
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  PLAYER 001 is not gambling.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  There are no random winners.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  Every episode tests real-world abilities such as:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• decision making</li>
                  <li>• negotiation</li>
                  <li>• leadership</li>
                  <li>• strategy</li>
                  <li>• communication</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  Players advance based on performance inside missions.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: EVERY PLAYER GETS PREPARATION ────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                EVERY PLAYER GETS PREPARATION
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Before every episode, players receive Battle Intel.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  Battle Intel sessions explain:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• mission concepts</li>
                  <li>• skill frameworks</li>
                  <li>• scenario preparation</li>
                </ul>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  This ensures players are not judged on prior knowledge.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  Everyone enters the arena with preparation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: THE PRIZE VAULT IS REAL ──────────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                THE PRIZE VAULT IS REAL
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The Champion Prize begins at:
                </p>
                <p className="text-primary text-[28px] md:text-[32px] font-display font-black mb-6 text-center">
                  ₹ 1 Million +
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The vault grows through multiple sources.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  These include:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• brand sponsorship contributions</li>
                  <li>• ecosystem partnerships</li>
                  <li>• arena reward systems</li>
                  <li>• participation-linked value systems</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  Rewards may include:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• cash prizes</li>
                  <li>• brand rewards</li>
                  <li>• travel experiences</li>
                  <li>• career opportunities</li>
                  <li>• sponsored benefits</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  All rewards are disclosed before the Final Vault opens.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 4: CLEAR GAME STRUCTURE ─────────────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                CLEAR GAME STRUCTURE
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  The arena unfolds across 7 episodes.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Each episode contains 2–3 rounds of missions.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Player progression moves from:
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  1,00,000 players to 1 champion.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-2">
                  Episodes happen every Sunday.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                  Battle Intel sessions happen during the week.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 5: NO PLAYER LEAVES EMPTY HANDED ────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                NO PLAYER LEAVES EMPTY HANDED
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Even if a player exits early,
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  they unlock Battle Rewards during their journey.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  These include:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• skill resources</li>
                  <li>• learning systems</li>
                  <li>• battle kits</li>
                  <li>• merchandise</li>
                  <li>• strategic tools</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  The arena is designed so every player gains value.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 6: DATA PRIVACY & PLAYER INFORMATION ────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                DATA PRIVACY & PLAYER INFORMATION
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  We collect only the information required to operate the game smoothly.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  This may include:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• name</li>
                  <li>• contact details (email, phone)</li>
                  <li>• basic profile information</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  This data is used only for:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• player communication</li>
                  <li>• game updates</li>
                  <li>• participation tracking</li>
                </ul>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  All player data is securely stored and protected.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  We do not sell, share, or misuse your personal information
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  with any third party.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 7: PAYMENT & ENTRY CLARITY ──────────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                PAYMENT & ENTRY CLARITY
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Becoming a Player in Player 001 requires a one-time Battle Arena Entry Fee of ₹456.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  This is the step that officially confirms your entry into the Arena.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-3">
                  Your Battle Arena Entry Fee:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• activates your Player status</li>
                  <li>• confirms serious participation</li>
                  <li>• unlocks Battle Intel before the game</li>
                  <li>• enables your entry into the Arena system</li>
                </ul>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-3">
                  This is a one-time entry fee to become part of the game.
                </p>
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-3">
                  There are no hidden charges.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  Every step, every access point, and every benefit is communicated clearly in advance.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: FAIR PARTICIPATION RULES ─────────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                FAIR PARTICIPATION RULES
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                  Every player is expected to follow fair play guidelines.
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  This includes:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• honest participation</li>
                  <li>• respectful conduct</li>
                  <li>• no misuse of the system</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  The arena reserves the right to take action
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  in case of violations or unfair practices.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 9: PLAYER RESPONSIBILITY ────────────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="mb-8">
              <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6">
                PLAYER RESPONSIBILITY
              </h2>
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                  Players are responsible for:
                </p>
                <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                  <li>• providing accurate information</li>
                  <li>• maintaining active communication</li>
                  <li>• ensuring access to a basic internet-enabled device</li>
                </ul>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  Players must also follow all instructions
                </p>
                <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                  shared during the game journey.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed max-w-4xl mx-auto mb-4">
                The arena is not built on mystery.
              </p>
              <p className="text-white text-[16px] md:text-[18px] font-semibold leading-relaxed max-w-4xl mx-auto">
                It is built on skill, fairness, and trust
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="text-center flex flex-col items-center gap-3">
              <a
                href="https://rzp.io/rzp/player001-could-be-you"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">👉 BECOME A PLAYER NOW</span>
              </a>
              <p className="text-white/60 text-[13px] md:text-[14px]">
                Game Arena Entry Fee : ₹456
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
