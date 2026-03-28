import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { FinalCta } from "@/components/landing/final-cta";
import { CharacterSpotlight } from "@/components/landing/character-spotlight";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const rewardsHeroVideo = "https://res.cloudinary.com/dymamigxu/video/upload/v1773858787/player001-reward_ycknde.mp4";
const char1Image = new URL("../../../../assets/char1.png", import.meta.url).href;

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: springEase },
  } as const;
}

export default function Rewards() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const rewardLadder = [
    "Episode 1 → Battle Kit worth ₹2,000",
    "Episode 2 → Battle Resources worth ₹5,000",
    "Episode 3 → Elite Skill Tools worth ₹10,000",
    "Episode 4 → Tactical Playbook worth ₹20,000",
    "Episode 5 → Strategic Growth Kit worth ₹35,000",
    "Episode 6 → Champion Preparation Kit worth ₹50,000",
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    void video.play().catch(() => {
      // Some browsers may still block autoplay with sound.
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-6">
          <div className="max-w-6xl mx-auto premium-card rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              src={rewardsHeroVideo}
              className="w-full h-[38vh] md:h-[52vh] object-cover object-center"
              autoPlay
              muted={false}
              playsInline
              preload="auto"
              controls={false}
            />
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-10 items-center">
            <div>
              <motion.div {...fadeUpProps()} className="text-center mb-14">
                <SectionHeader eyebrow="Rewards" title="What If You Get Eliminated?" centered />
                <p className="text-white/60 text-[16px] leading-relaxed mt-6">
                  In most competitions elimination means leaving empty handed. PLAYER 001 works differently.
                  Every player unlocks Battle Rewards during their journey.
                </p>
              </motion.div>
              <div className="space-y-4">
                {rewardLadder.map((reward, index) => (
                  <motion.div key={reward} {...fadeUpProps(index * 0.05)} className="premium-card rounded-xl p-6">
                    <p className="text-white text-[15px]">{reward}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p {...fadeUpProps(0.25)} className="text-primary/80 mt-8 text-[15px]">
                These are not cash payouts. They are learning resources, tools, merchandise, and player benefits.
              </motion.p>
            </div>
            <CharacterSpotlight src={char1Image} alt="PLAYER 001 Character" align="center" />
          </div>
        </section>

        <section className="py-20 px-6 bg-black/55 border-y border-white/[0.05]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUpProps()}>
              <SectionHeader eyebrow="Champion Prize" title="₹10,00,000+ Prize Engine" centered />
              <p className="text-white/60 text-[17px] leading-relaxed mt-8">
                The champion prize begins at ₹10,00,000 and can grow as participation scales across the arena.
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
