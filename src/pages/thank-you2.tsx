import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Copy, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/ui/particle-background";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.75, delay, ease: springEase },
  } as const;
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
      <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
      <span className="text-[9px] tracking-[0.32em] text-primary/80 font-display font-semibold uppercase">{label}</span>
    </div>
  );
}

export default function ThankYou2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [copied, setCopied] = useState(false);

  function toggleAudio() {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setVideoMuted(vid.muted);
  }

  function copyInviteLink() {
    navigator.clipboard.writeText("https://www.player-001.com/").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function shareOnWhatsApp() {
    const msg = "I just entered Player 001 - India's First Survival Game Arena. Join me inside: https://www.player-001.com/";
    window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
  }

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black" style={{ paddingTop: "calc(7rem - 2px)" }}>
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0" />
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full pb-10">
            <Eyebrow label="Player 001" />
            <motion.h1 {...fadeUpProps(0.1)} className="font-display font-black uppercase tracking-[-0.01em] mb-6 text-center sm:text-left">
              <span className="block text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.05] text-white">Welcome Inside</span>
              <span className="block text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.05] text-primary">The Arena</span>
            </motion.h1>
            <motion.div {...fadeUpProps(0.15)} className="max-w-2xl mb-8 space-y-3 text-center sm:text-left">
              <p className="text-white font-semibold text-[16px] md:text-[18px] leading-relaxed">
                Your entry into Player-001 Game is now confirmed.<br />
                You are no longer outside the system.
              </p>
              <p className="text-white/60 text-[14px] md:text-[16px] leading-relaxed">
                You have taken the step most people only think about.<br />
                From here on the experience changes.
              </p>
            </motion.div>
            <motion.div {...fadeUpProps(0.2)} className="premium-card prize-card-animated rounded-2xl overflow-hidden relative w-full mb-8" style={{ aspectRatio: "16/9" }}>
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover object-center" src="https://res.cloudinary.com/dymamigxu/video/upload/v1773920629/hf_20260316_230441_b269bf4b-949d-47e4-89ff-191584e71c13_azvf7f.mp4" autoPlay muted loop playsInline preload="metadata" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button type="button" onClick={toggleAudio} className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white transition-all text-[11px] font-display tracking-[0.12em]" aria-label={videoMuted ? "Unmute" : "Mute"}>
                {videoMuted ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</> : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>}
              </button>
            </motion.div>
          </div>
        </section>

        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()}><Eyebrow label="Confirmation Block" />
              <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-white mb-6 text-center sm:text-left">Your Player Identity Is Now Active</h2>
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-5">Your Battle Arena Entry Fee of <span className="text-white font-semibold">Rs.456</span> has been successfully processed.</p>
              <p className="text-white font-semibold text-[15px] mb-4">This means:</p>
              <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                <p>You are now officially part of Player 001</p>
                <p>Your journey inside the Arena has begun</p>
                <p>You will receive your Player Identification Number (PIN) soon</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()}><Eyebrow label="What Happens Next" />
              <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-white mb-6 text-center sm:text-left">Your Next Phase Begins Now</h2>
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <p className="text-white font-semibold text-[15px] mb-4">Within the next 24 hours:</p>
              <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-6">
                <p>You will receive your Player Identification Number (PIN)</p>
                <p>You will understand how the Arena unfolds</p>
                <p>You will know how to move forward</p>
              </div>
              <p className="text-primary font-display font-bold text-[15px] tracking-wide">Stay ready. The game does not wait.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()}><Eyebrow label="The Shift" />
              <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-white mb-6 text-center sm:text-left">You are No Longer Watching</h2>
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <div className="space-y-3 text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                <p>There was a version of you that was outside this.</p>
                <p>Just observing.</p>
                <p>That version does not exist anymore.</p>
                <p className="text-white font-semibold text-[16px] md:text-[18px] pt-2">Now you are inside.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()}><Eyebrow label="Invite Section" />
              <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-white mb-4 text-center sm:text-left">Some Things Are Better Experienced Together</h2>
              <p className="text-white/60 text-[14px] md:text-[16px] leading-relaxed max-w-2xl mb-6 text-center sm:text-left">If there are people you would want inside this with you this is the moment to bring them in.</p>
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="flex flex-col sm:flex-row gap-4">
              <button type="button" onClick={shareOnWhatsApp} className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03]">
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">Invite on WhatsApp</span>
              </button>
              <button type="button" onClick={copyInviteLink} className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white border border-white/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-sm">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copied ? "LINK COPIED!" : "Copy Invite Link"}
              </button>
            </motion.div>
            <p className="text-white/40 text-[13px] italic mt-4 text-center sm:text-left">Before it gets bigger.</p>
          </div>
        </section>

        <section className="py-5 md:py-8 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()}><Eyebrow label="Final Reinforcement" />
              <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-white mb-6 text-center sm:text-left">The Arena Is Now Open For You</h2>
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-6">Every decision from here will move you forward or take you out.</p>
              <p className="text-white/40 text-[13px] md:text-[14px] italic tracking-wide">The Architect is watching.</p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
