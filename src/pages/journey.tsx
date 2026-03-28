import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { FinalCta } from "@/components/landing/final-cta";
import { CharacterSpotlight } from "@/components/landing/character-spotlight";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const journeyHeroImage = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858779/img9_fiakov.png";
const char2Image = new URL("../../../../assets/char2.png", import.meta.url).href;

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: springEase },
  } as const;
}

export default function Journey() {
  useEffect(() => {
    if (window.location.hash !== "#journey-hero-image") return;

    const scrollToHero = () => {
      const heroEl = document.getElementById("journey-hero-image");
      heroEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Wait one frame for layout/render before scrolling to hash target.
    requestAnimationFrame(scrollToHero);
  }, []);

  const episodes = [
    { episode: "Episode 1", from: "1,00,000", to: "75,000" },
    { episode: "Episode 2", from: "75,000", to: "25,000" },
    { episode: "Episode 3", from: "25,000", to: "8,000" },
    { episode: "Episode 4", from: "8,000", to: "1,000" },
    { episode: "Episode 5", from: "1,000", to: "100" },
    { episode: "Episode 6", from: "100", to: "10" },
    { episode: "Episode 7", from: "10", to: "1" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-6">
          <div id="journey-hero-image" className="max-w-6xl mx-auto premium-card rounded-2xl overflow-hidden scroll-mt-32">
            <img
              src={journeyHeroImage}
              alt="Player Journey"
              className="w-full h-[38vh] md:h-[52vh] object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
            <div>
              <motion.div {...fadeUpProps()} className="text-center mb-12">
                <SectionHeader eyebrow="Player Journey" title="The PLAYER 001 Journey" centered />
                <p className="text-white/60 text-[16px] leading-relaxed mt-6">
                  1,00,000 players will enter the arena. Seven episodes later, only one champion remains.
                </p>
              </motion.div>
            </div>
            <CharacterSpotlight src={char2Image} alt="PLAYER 001 Character" />
          </div>
        </section>

        <section className="py-20 px-6 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-12">
              <SectionHeader eyebrow="Episode Ladder" title="One Arena, Seven Eliminations" centered />
            </motion.div>
            <div className="space-y-4">
              {episodes.map((item, i) => (
                <motion.div key={item.episode} {...fadeUpProps(i * 0.05)} className="premium-card rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <p className="text-white font-semibold">{item.episode}</p>
                  <p className="text-primary font-display tracking-[0.1em]">
                    {item.from} <span className="text-white/55">→</span> {item.to}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-12">
              <SectionHeader eyebrow="Arena Timeline" title="Season Timeline" centered />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div {...fadeUpProps(0.05)} className="premium-card rounded-xl p-8">
                <p className="text-[11px] tracking-[0.28em] text-primary/70 font-display mb-3">GAME BEGINS</p>
                <p className="text-white text-[26px] font-display font-bold">1st July 2026</p>
              </motion.div>
              <motion.div {...fadeUpProps(0.1)} className="premium-card rounded-xl p-8">
                <p className="text-[11px] tracking-[0.28em] text-primary/70 font-display mb-3">VAULT OPENS</p>
                <p className="text-white text-[26px] font-display font-bold">30th August 2026</p>
              </motion.div>
            </div>
            <motion.div {...fadeUpProps(0.15)} className="premium-card rounded-xl p-8 mt-4 text-white/65">
              Episodes happen every Sunday. Battle Intel sessions occur during the week.
            </motion.div>
          </div>
        </section>

        <FinalCta compact />
      </main>
      <Footer />
    </div>
  );
}
