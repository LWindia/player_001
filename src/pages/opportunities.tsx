import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { FinalCta } from "@/components/landing/final-cta";
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

export default function Opportunities() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-10 items-center">
            <div>
              <motion.div {...fadeUpProps()} className="text-center mb-14">
                <SectionHeader eyebrow="Opportunities" title="Transformation, Not Just Prize" centered />
                <p className="text-white/60 text-[16px] leading-relaxed mt-6">
                  The ₹10,00,000 prize is only part of PLAYER 001. The real value is the experience players gain through the arena.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Decision making",
                  "Strategic thinking",
                  "Leadership",
                  "Negotiation",
                  "Crisis handling",
                  "Pressure management",
                ].map((skill, index) => (
                  <motion.div key={skill} {...fadeUpProps(index * 0.05)} className="premium-card rounded-xl p-7">
                    <p className="text-white text-[15px]">{skill}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div {...fadeUpProps(0.2)} className="premium-card rounded-xl p-8 mt-8 text-white/65 leading-relaxed">
                These are real-life skills rarely taught in classrooms and directly useful for career growth, leadership
                roles, and high-pressure environments.
              </motion.div>
            </div>
            <CharacterSpotlight src={char2Image} alt="PLAYER 001 Character" align="center" />
          </div>
        </section>

        <FinalCta compact />
      </main>
      <Footer />
    </div>
  );
}
