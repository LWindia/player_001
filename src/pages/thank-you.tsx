import { motion } from "framer-motion";
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

export default function ThankYou() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[85vh] flex items-center overflow-hidden pt-20"
          id="thank-you-hero"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.28) saturate(1.35) contrast(1.08)" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/85 via-black/70 to-black/85" />
          
          <ParticleBackground color="255, 46, 46" density={0.8} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-24">
            <motion.div {...fadeUpProps()} className="text-center mb-12">
              <h1 className="font-display font-black uppercase tracking-[-0.01em] mb-8">
                <span className="block leading-[1.1] text-[clamp(2rem,7vw,5rem)] text-primary">
                  The Game Has Noticed You.
                </span>
              </h1>
              
              <p className="text-[18px] md:text-[24px] text-white font-bold leading-relaxed mb-6">
                You've successfully unlocked access to the Player 001 Game Guide.
              </p>
              <p className="text-[16px] md:text-[19px] text-white/80 leading-relaxed">
                It's on its way to your WhatsApp / Email.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHAT'S INSIDE ────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader
                eyebrow="WHAT YOU'LL DISCOVER"
                title="Inside, you'll discover:"
                centered
                titleSize="text-[clamp(1.5rem,5vw,3rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.25vw,3.15rem)]"
                mobileBreaks={["INSIDE, YOU'LL", "DISCOVER:"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-8 md:p-10 mb-10">
              <ul className="text-white/70 text-[16px] md:text-[20px] leading-relaxed space-y-5">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>How the Game Arena actually works</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>How the Prize grows beyond ₹ 1 Million</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>What lies inside the Final Vault : The Vault that Gives You Everything</span>
                </li>
              </ul>
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="text-center">
              <p className="text-white text-[17px] md:text-[21px] font-semibold leading-relaxed mb-6">
                This is where things start getting real.
              </p>
              <p className="text-primary text-[19px] md:text-[24px] font-display font-black leading-relaxed mb-8">
                👉 Keep your phone close.
              </p>
              <p className="text-white/70 text-[16px] md:text-[19px] leading-relaxed">
                How far you go… is up to you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── INVITE SECTION ───────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 relative overflow-hidden border-y border-white/[0.05]">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.22) saturate(1.2) contrast(1.05)" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black/90" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(2rem,6.5vw,4.5rem)] font-display font-black text-primary uppercase mb-8 leading-tight">
                Player 001 Could be You
              </h2>
              <p className="text-white text-[18px] md:text-[24px] font-bold leading-relaxed mb-6">
                Some things are better experienced together
              </p>
              <p className="text-white/70 text-[15px] md:text-[19px] leading-relaxed mb-6">
                Something big is about to begin in India.
              </p>
              <p className="text-white/70 text-[15px] md:text-[19px] leading-relaxed mb-10">
                If there are people you'd want inside the Game Arena with you…
                <br />
                This is the moment to bring them in.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="text-center mb-10">
              <div className="flex items-center gap-2 justify-center mb-8">
                <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
                <span className="text-[10px] tracking-[0.32em] text-primary/80 font-display font-semibold uppercase">INVITE ACTIONS</span>
                <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent("Join me in Player 001 - The Ultimate Survival Reality Game");
                  const url = encodeURIComponent(window.location.origin);
                  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 font-display font-bold tracking-[0.2em] text-[12px] text-black bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">👉 INVITE ON WHATSAPP</span>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("https://www.player-001.com/");
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-white/10 border border-white/20 overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] hover:bg-white/15 active:scale-[0.98]"
              >
                <span className="relative z-10">👉 COPY INVITE LINK</span>
              </button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
