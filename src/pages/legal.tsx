import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { CharacterSpotlight } from "@/components/landing/character-spotlight";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const char2Image = new URL("../../../../assets/char2.png", import.meta.url).href;

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: springEase },
  } as const;
}

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
          <div className="space-y-6">
            <motion.div {...fadeUpProps()} className="premium-card rounded-xl p-8 md:p-10">
              <SectionHeader eyebrow="Legal & Compliance" title="Skill-Based Competition Platform" />
              <p className="text-white/60 mt-5 leading-relaxed">
                PLAYER 001 operates as a skill-based competition platform.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.05)} className="premium-card rounded-xl p-8 md:p-10">
              <h2 className="text-2xl text-white mb-5">Terms & Conditions</h2>
              <ul className="text-white/60 leading-relaxed space-y-2 list-disc pl-5">
                <li>Participants must be 18–24 years old.</li>
                <li>Participants must follow fair play guidelines.</li>
                <li>Prize winnings are subject to Indian tax laws.</li>
              </ul>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card rounded-xl p-8 md:p-10">
              <h2 className="text-2xl text-white mb-5">Privacy Policy</h2>
              <ul className="text-white/60 leading-relaxed space-y-2 list-disc pl-5">
                <li>PLAYER 001 respects user privacy.</li>
                <li>Data is used only for registration and operations.</li>
                <li>Personal data is never sold.</li>
              </ul>
            </motion.div>
          </div>
          <CharacterSpotlight src={char2Image} alt="PLAYER 001 Character" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
