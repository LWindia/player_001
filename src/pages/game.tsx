import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { FinalCta } from "@/components/landing/final-cta";
import { CharacterSpotlight } from "@/components/landing/character-spotlight";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const gameHeroImage = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858765/img8_tfc1ss.jpg";
const char1Image = new URL("../../../../assets/char1.png", import.meta.url).href;

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: springEase },
  } as const;
}

export default function Game() {
  useEffect(() => {
    if (window.location.hash !== "#game-hero-image") return;

    const scrollToHero = () => {
      const heroEl = document.getElementById("game-hero-image");
      heroEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Wait one frame for layout/render before scrolling to hash target.
    requestAnimationFrame(scrollToHero);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-6">
          <div id="game-hero-image" className="max-w-6xl mx-auto premium-card rounded-2xl overflow-hidden scroll-mt-32">
            <img
              src={gameHeroImage}
              alt="How The Game Works"
              className="w-full h-[38vh] md:h-[52vh] object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
            <div>
              <motion.div {...fadeUpProps()} className="text-center mb-14">
                <SectionHeader eyebrow="How The Game Works" title="Battle Intel System" centered subtitle="Preparation Before Every Mission" />
              </motion.div>
              <motion.div {...fadeUpProps(0.05)} className="premium-card rounded-xl p-8 md:p-10">
                <p className="text-white/70 leading-relaxed mb-8">
                  Players receive Battle Intel before every episode to ensure fair gameplay and skill-based evaluation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Mission insights", "Strategy context", "Scenario understanding"].map((item) => (
                    <div key={item} className="bg-secondary/[0.04] p-6 border-l-2 border-secondary/40 rounded-r-lg">
                      <p className="text-white text-[14px] font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <CharacterSpotlight src={char1Image} alt="PLAYER 001 Character" />
          </div>
        </section>

        <section className="py-20 px-6 bg-black/55 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-12">
              <SectionHeader eyebrow="The Game Journey" title="From Identity Activation to Final Arena" centered />
            </motion.div>
            <div className="space-y-4">
              {[
                "Step 1 – Activate Player Identity",
                "Step 2 – Receive Battle Intel",
                "Step 3 – Enter the Arena",
                "Step 4 – Advance Through Episodes",
                "Step 5 – Reach the Final Arena",
              ].map((step, i) => (
                <motion.div key={step} {...fadeUpProps(i * 0.05)} className="premium-card rounded-xl p-6 flex items-center gap-4">
                  <span className="text-primary font-display font-bold text-2xl opacity-70">0{i + 1}</span>
                  <p className="text-white text-[16px]">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUpProps()}>
              <SectionHeader eyebrow="Prize Engine" title="The Champion Prize Starts at ₹10,00,000" centered />
              <p className="text-white/60 text-[17px] leading-relaxed mt-8">
                The Prize Engine allows the vault to grow as participation increases. The larger the arena becomes,
                the greater the final reward.
              </p>
            </motion.div>
          </div>
        </section>

        <FinalCta compact />
      </main>
      <Footer />
    </div>
  );
}
