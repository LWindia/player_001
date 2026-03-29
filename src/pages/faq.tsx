import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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

interface FAQItemProps {
  question: string;
  answer: string | string[];
  delay?: number;
}

function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      {...fadeUpProps(delay)}
      className="premium-card prize-card-animated rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-white text-[14px] md:text-[16px] font-semibold pr-4 normal-case tracking-normal">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: springEase }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: springEase }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-5 pt-2">
              {Array.isArray(answer) ? (
                <div className="space-y-3">
                  {answer.map((line, idx) => (
                    <p key={idx} className="text-white/70 text-[13px] md:text-[15px] leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-white/70 text-[13px] md:text-[15px] leading-relaxed">
                  {answer}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const faqSections = [
    {
      title: "GAME & STRUCTURE",
      questions: [
        {
          q: "How does PLAYER 001 work?",
          a: [
            "PLAYER 001 is a 7-episode survival reality game where lakhs of players enter the arena and compete through real-life simulation challenges.",
            "Each episode includes 2–3 rounds of missions, and players are gradually eliminated based on performance.",
            "The journey continues until only one player reaches the Final Vault.",
          ],
        },
        {
          q: "How many episodes are there and when do they happen?",
          a: [
            "There are 7 total episodes.",
            "Episodes 1–5 happen online + live every Sunday starting Aug 2026.",
            "Episodes 6–7 are physical arena battles held at a grand location (to be announced).",
            "The final episode determines the champion.",
          ],
        },
        {
          q: "How does elimination happen?",
          a: [
            "Elimination is based on how you perform in each mission.",
            "Every episode removes a large number of players based on decision-making, strategy, and execution.",
            "There is no random elimination — your actions decide your progress.",
          ],
        },
        {
          q: "What happens inside each episode?",
          a: [
            "Each episode simulates real-world situations such as decision-making, leadership, negotiation, and crisis handling.",
            "You don't answer questions — you face scenarios and act.",
            "Every round tests how you think and respond under pressure.",
          ],
        },
      ],
    },
    {
      title: "ELIGIBILITY",
      questions: [
        {
          q: "Who can participate in PLAYER 001?",
          a: [
            "Anyone in India aged 18–24 can participate.",
            "It is open to students, graduates, and young professionals from all backgrounds.",
          ],
        },
        {
          q: "Is it open to all streams and domains?",
          a: [
            "Yes. Engineering, Commerce, Arts, Science — all streams are welcome.",
            "Your degree does not give you an advantage.",
            "The game evaluates how you think and act.",
          ],
        },
        {
          q: "Do I need any prior experience or special skills?",
          a: [
            "No prior experience is required.",
            "Before every episode, all players receive Battle Intel to prepare.",
            "This ensures everyone starts on equal ground.",
          ],
        },
      ],
    },
    {
      title: "FAIRNESS & SYSTEM",
      questions: [
        {
          q: "Is PLAYER 001 skill-based or luck-based?",
          a: [
            "PLAYER 001 is completely skill-based.",
            "There is no luck, no random winners, and no chance-based outcomes.",
            "Your decisions, strategy, and actions determine your progress.",
          ],
        },
        {
          q: "What is Battle Intel and how does it help?",
          a: [
            "Battle Intel is a preparation system provided before every episode.",
            "It includes insights about the upcoming mission, helping you understand the challenge.",
            "This ensures fair play and equal preparation for all players.",
          ],
        },
        {
          q: "Do some players have an advantage over others?",
          a: [
            "No.",
            "Every player receives the same Battle Intel and enters the same environment.",
            "There is no bias based on college, background, or experience.",
          ],
        },
      ],
    },
    {
      title: "PRIZE & REWARDS",
      questions: [
        {
          q: "What is the minimum prize the winner will get?",
          a: [
            "The Champion Prize starts at ₹10,00,000+.",
            "This is the guaranteed base amount.",
          ],
        },
        {
          q: "How does the prize money grow?",
          a: [
            "PLAYER 001 uses a unique Prize Engine.",
            "The prize grows through player participation and sponsor contributions.",
            "As the arena expands, the prize pool increases.",
          ],
        },
        {
          q: "Is the prize real?",
          a: [
            "Yes.",
            "The prize pool is built through a structured ecosystem of sponsors and predefined mechanisms.",
            "All rewards are transparently disclosed before the Final Vault opens.",
          ],
        },
        {
          q: "Is there a maximum limit to the prize?",
          a: [
            "No.",
            "There is no fixed ceiling.",
            "That's why it is defined as:",
            "₹1 Million 0,00,000 → ∞",
          ],
        },
        {
          q: "What does the Final Vault include?",
          a: [
            "The Final Vault includes more than just cash.",
            "It may contain:",
            "• cash prizes • brand rewards • career opportunities • travel experiences • exclusive access",
            "It represents everything accumulated throughout the game.",
          ],
        },
        {
          q: "Will only the winner get rewards?",
          a: [
            "No.",
            "While the winner unlocks the Final Vault, other players also gain rewards during their journey.",
            "The game is designed so that value is distributed across episodes.",
          ],
        },
        {
          q: "What if I get eliminated early (e.g., Episode 2)?",
          a: [
            "Even if you are eliminated early, you will receive rewards.",
            "These include Battle Kits, learning resources, and strategic tools.",
            "No player leaves empty-handed.",
          ],
        },
        {
          q: "Are rewards cash or non-cash?",
          a: [
            "Most rewards during the journey are non-cash and focused on growth.",
            "These include tools, playbooks, resources, and opportunities.",
            "The Final Vault includes both cash and non-cash rewards.",
          ],
        },
      ],
    },
    {
      title: "TRUST & LEGAL",
      questions: [
        {
          q: "Is PLAYER 001 gambling?",
          a: [
            "No.",
            "PLAYER 001 is a skill-based competition.",
            "There is no betting, no chance-based outcomes, and no gambling element.",
          ],
        },
        {
          q: "Is the game legal?",
          a: [
            "Yes.",
            "It operates as a skill-based competition platform aligned with applicable guidelines.",
          ],
        },
        {
          q: "How are winners decided?",
          a: [
            "Winners are determined based on performance in missions across episodes.",
            "Evaluation is based on decision-making, strategy, and execution.",
          ],
        },
        {
          q: "Is the process transparent?",
          a: [
            "Yes.",
            "The structure, progression, and rules are clearly defined.",
            "Every player receives the same preparation and opportunity.",
          ],
        },
      ],
    },
    {
      title: "EXPERIENCE & VALUE",
      questions: [
        {
          q: "What will I gain from participating?",
          a: [
            "You will gain real-world skills such as:",
            "• decision-making • leadership • strategy • problem-solving",
            "You also gain clarity about your strengths and areas of growth.",
          ],
        },
        {
          q: "How is this different from other competitions?",
          a: [
            "Most competitions test knowledge.",
            "PLAYER 001 tests real-life ability.",
            "It simulates real-world situations instead of theoretical questions.",
          ],
        },
        {
          q: "Can this help in my career?",
          a: [
            "Yes.",
            "Top performers may receive exposure, opportunities, and visibility.",
            "More importantly, the experience helps you become industry-ready.",
          ],
        },
      ],
    },
    {
      title: "PAYMENTS & ENTRY",
      questions: [
        {
          q: "Do I need to pay to become a Player?",
          a: [
            "Yes.",
            "To enter Player 001, a Battle Arena Entry Fee of ₹456 is required.",
          ],
        },
        {
          q: "What does the ₹456 entry fee include?",
          a: [
            "It activates your official entry into the game.",
            "This includes:",
            "• Your confirmed Player Identity",
            "• Access to pre-game Battle Intel",
            "• Entry into the Arena system",
          ],
        },
        {
          q: "Why is there an entry fee?",
          a: [
            "This step ensures that only serious participants enter the Arena.",
            "It is designed to maintain the integrity, commitment, and competitive intensity of the game.",
          ],
        },
        {
          q: "Is this a one-time payment?",
          a: [
            "Yes.",
            "The ₹456 is a one-time entry fee to become a Player.",
          ],
        },
        {
          q: "Are there any hidden charges?",
          a: [
            "No.",
            "There are no hidden costs at any stage.",
            "Every step is communicated with complete transparency.",
          ],
        },
        {
          q: "What happens after I pay?",
          a: [
            "Once your entry is confirmed:",
            "• Your Player Identity is activated",
            "• You receive Battle Intel before the game",
            "• You move forward into the Arena journey",
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden vignette pt-20"
          id="faq-hero"
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
                FREQUENTLY ASKED QUESTIONS
              </span>
            </motion.h1>

            <motion.div {...fadeUpProps(0.25)} className="text-center max-w-4xl mx-auto">
              <p className="text-[15px] md:text-[18px] text-white font-semibold leading-relaxed mb-4">
                EVERYTHING YOU NEED TO KNOW
              </p>
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed">
                Before you step into the arena, it's natural to have questions.
              </p>
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed">
                Here are clear answers to help you move forward with confidence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ SECTIONS ─────────────────────────────────────────────────── */}
        {faqSections.map((section, sectionIdx) => (
          <section
            key={section.title}
            className={`py-12 md:py-16 px-5 sm:px-8 ${
              sectionIdx % 2 === 0 ? "bg-black" : "bg-black/60 border-y border-white/[0.05]"
            }`}
          >
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUpProps()} className="mb-8">
                <h2 className="text-white text-[24px] md:text-[28px] font-display font-bold mb-6 text-center">
                  {section.title}
                </h2>
              </motion.div>

              <div className="space-y-4">
                {section.questions.map((item, idx) => (
                  <FAQItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    delay={idx * 0.05}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

      </main>
      <Footer />
    </div>
  );
}
