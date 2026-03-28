import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
import { FinalCta } from "@/components/landing/final-cta";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const arenaIntroImage = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858764/img8_g8l6vb.jpg";

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: springEase },
  } as const;
}

export default function Arena() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32">
        <section className="px-6 pb-6">
          <div id="arena-hero-image" className="max-w-6xl mx-auto premium-card rounded-2xl overflow-hidden scroll-mt-32">
            <img
              src={arenaIntroImage}
              alt="The Arena"
              className="w-full h-[38vh] md:h-[52vh] object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div {...fadeUpProps()}>
              <SectionHeader
                eyebrow="The Arena"
                title="Welcome to the Arena"
                subtitle="India has millions of talented young minds. But very few arenas where that talent can truly be tested."
              />
              <p className="text-white/60 leading-relaxed mt-6">
                PLAYER 001 is India&apos;s first survival reality game built around real-life situations.
              </p>
              <p className="text-white/60 leading-relaxed mt-4">
                Inside this arena, players experience challenges that mirror real life.
              </p>
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Negotiation", "Decision making", "Leadership", "Strategy", "Communication"].map((skill) => (
                <div key={skill} className="premium-card p-6 rounded-xl">
                  <h3 className="text-[14px] font-bold text-white mb-2">{skill}</h3>
                  <p className="text-[13px] text-white/45">The skills that shape the future, not the ones exams measure.</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <SectionHeader eyebrow="Why This Game Exists" title="Because Real Life Never Gives You a Question Paper" centered />
            </motion.div>
            <motion.div {...fadeUpProps(0.1)} className="space-y-5 text-white/60 leading-relaxed max-w-4xl mx-auto">
              <p className="text-[17px] text-white font-medium red-accent-left pl-5 py-1">Schools teach subjects. Life teaches situations.</p>
              <p>But most young people experience these situations for the first time when it already matters.</p>
              <p>PLAYER 001 changes that.</p>
              <p>It creates a space where players experience the real world before the real world tests them.</p>
              <p className="text-primary/80">This is a real life skill competition in India designed for the next generation.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-12">
              <SectionHeader eyebrow="What Makes PLAYER 001 Different" title="Most Competitions Search for Talent. PLAYER 001 Creates It." centered />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
              <motion.div {...fadeUpProps(0.05)} className="p-10 bg-background/60 border-r border-white/[0.05]">
                <h3 className="text-[11px] font-display font-semibold text-white/25 mb-8 uppercase tracking-[0.35em]">Most competitions</h3>
                <ul className="space-y-5 text-white/45">
                  <li>search for talent.</li>
                  <li>eliminate quickly.</li>
                  <li>reward only winners.</li>
                </ul>
              </motion.div>
              <motion.div {...fadeUpProps(0.1)} className="p-10 bg-gradient-to-br from-primary/[0.08] to-background">
                <h3 className="text-[14px] font-display font-bold text-white mb-8 uppercase tracking-[0.3em]">PLAYER 001</h3>
                <ul className="space-y-5 text-white">
                  <li>PLAYER 001 creates talent.</li>
                  <li>PLAYER 001 prepares players.</li>
                  <li>PLAYER 001 rewards the journey.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <FinalCta compact />
      </main>
      <Footer />
    </div>
  );
}
