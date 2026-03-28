import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";
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

const legacyImgs = [
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860374/s26_glyxjc.jpg",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860370/s70_dmemo3.jpg",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860358/s65_z1asit.jpg",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860356/s64_ntfvra.jpg",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860305/s11_oxkxtw.png",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860306/s21_jgs0yt.jpg",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860420/s41_k0egsf.jpg",
  "https://res.cloudinary.com/dymamigxu/image/upload/v1773860364/s67_zazo3l.gif",
];

export default function Enquire() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);

  const [form, setForm] = useState({
    name: "", whatsapp: "", email: "", age: "", city: "", reason: "", query: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function toggleHeroAudio() {
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setHeroVideoMuted(vid.muted);
  }

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytaVcy6D0S05aa9lfmpDV_IrDtJi7JIYZKE3TnevS8mmSXgBaC-NFUT9gmADujIkW92g/exec";
  const SECRET_TOKEN = "player001_secret_2026";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token: SECRET_TOKEN }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Still show success — no-cors won't return errors
    }
  }

  const doubled = [...legacyImgs, ...legacyImgs];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black"
          id="enquire-hero"
          style={{ paddingTop: "calc(7rem - 2px)" }}
        >
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full pb-10">
            {/* Eyebrow */}
            <motion.div {...fadeUpProps(0.05)} className="flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-primary/80 font-display font-semibold uppercase">Enquire Now</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fadeUpProps(0.1)} className="font-display font-black uppercase tracking-[-0.01em] mb-4">
              <span className="block text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.05] text-white">
                Before You Step In,
              </span>
              <span className="block text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.05] text-primary">
                Know What You're Entering
              </span>
            </motion.h1>

            {/* Sub copy */}
            <motion.div {...fadeUpProps(0.15)} className="max-w-2xl mb-8 space-y-3 text-white/70 text-[15px] md:text-[17px] leading-relaxed">
              <p>If you're here, you're already curious.</p>
              <p>And before you decide to enter the Arena, it's only fair you understand what stands behind it.</p>
              <p className="text-white font-semibold">This is not just a game.<br />It's a system.<br />Designed. Built. Controlled.</p>
            </motion.div>

            {/* Hero Video */}
            <motion.div {...fadeUpProps(0.2)} className="premium-card prize-card-animated rounded-2xl overflow-hidden relative w-full mb-8" style={{ aspectRatio: "16/9" }}>
              <video
                ref={heroVideoRef}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dymamigxu/video/upload/v1773920629/hf_20260316_230441_b269bf4b-949d-47e4-89ff-191584e71c13_azvf7f.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button
                type="button"
                onClick={toggleHeroAudio}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-200 text-[11px] font-display tracking-[0.12em]"
                aria-label={heroVideoMuted ? "Unmute video" : "Mute video"}
              >
                {heroVideoMuted ? <><VolumeX className="w-3.5 h-3.5" /> UNMUTE</> : <><Volume2 className="w-3.5 h-3.5" /> MUTE</>}
              </button>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUpProps(0.25)} className="flex justify-center">
              <a
                href="#enquiry-form"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10">ASK YOUR QUESTION</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── ENQUIRY FORM ─────────────────────────────────────────────────── */}
        <section
          id="enquiry-form"
          className="py-8 md:py-12 px-5 sm:px-8 relative bg-black border-y border-white/[0.05]"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="ENQUIRY FORM"
                title="Get Your Questions Answered"
                centered
                titleSize="text-[clamp(1.5rem,5vw,3.5rem)]"
              />
              <p className="text-white/60 mt-4 text-[14px] md:text-[16px] leading-relaxed">
                Every serious player pauses before they step in.<br />
                Ask what you need to. Clarity is part of the system.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div {...fadeUpProps()} className="premium-card prize-card-animated rounded-xl p-8 text-center">
                <p className="text-primary text-[22px] font-display font-black mb-3">Query Sent.</p>
                <p className="text-white/70 text-[15px] leading-relaxed">Our team typically responds within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.form {...fadeUpProps(0.05)} onSubmit={handleSubmit} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">Email ID</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Age + City */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">Age</label>
                    <input
                      type="number"
                      required
                      min={18}
                      max={24}
                      value={form.age}
                      onChange={e => setForm({ ...form, age: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="18–24"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">City</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Your city"
                    />
                  </div>
                </div>

                {/* Why are you here */}
                <div>
                  <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">Why are you here?</label>
                  <div className="space-y-2">
                    {[
                      "Ready to enter the Game Arena",
                      "Need more clarity before entering",
                      "Just exploring the concept",
                    ].map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="reason"
                          value={option}
                          checked={form.reason === option}
                          onChange={e => setForm({ ...form, reason: e.target.value })}
                          className="accent-primary w-4 h-4"
                        />
                        <span className="text-white/70 text-[14px] group-hover:text-white transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Query */}
                <div>
                  <label className="block text-white/70 text-[12px] tracking-[0.15em] uppercase mb-2 font-display">Your Query</label>
                  <textarea
                    required
                    rows={4}
                    value={form.query}
                    onChange={e => setForm({ ...form, query: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Type your question here..."
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">SEND YOUR QUERY</span>
                </button>

                <p className="text-white/40 text-[12px] text-center italic">Our team typically responds within 24 hours.</p>
              </motion.form>
            )}
          </div>
        </section>

        {/* ── TRUST BLOCK ──────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="TRUST BLOCK"
                title="Built On Real Foundations"
                centered
                titleSize="text-[clamp(1.5rem,5vw,3.5rem)]"
              />
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-left">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                Player 001 is not an experiment.
              </p>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                It comes from a system that has already worked with millions across India.
              </p>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                From building skills… to creating real-world impact…<br />
                this is built by people who understand what it takes to transform individuals in India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── THE ARCHITECT ────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="THE ARCHITECT"
                title="The Mind Behind The Game"
                centered
                titleSize="text-[clamp(1.5rem,5vw,3.5rem)]"
              />
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
              <div className="space-y-4 text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                <p>Every system has a creator.</p>
                <p>Someone who doesn't just build the game… but understands how people think inside it.</p>
                <p className="text-white font-semibold">The Architect is not here to play.<br />The Architect is here to observe, design, and decide how the game unfolds.</p>
                <p>Every round… every rule… every shift in the Arena…<br />is not random.</p>
                <p className="text-primary font-display font-bold text-[16px] md:text-[18px]">It's intentional.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PRESENCE & CONTACT ───────────────────────────────────────────── */}
        <section className="py-8 md:py-12 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="PRESENCE & CONTACT"
                title="Real People. Real Presence."
                centered
                titleSize="text-[clamp(1.5rem,5vw,3.5rem)]"
              />
            </motion.div>
            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-center">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-6">
                Behind Player 001 is a real team, operating from real locations.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-white font-display font-bold text-[15px] md:text-[17px]">LinuxWorld Informatics Pvt Ltd</p>
                <p className="text-white/70 text-[14px]">Jaipur, India</p>
                <p className="text-white/70 text-[14px]">Contact: +91 77339 55151</p>
                <p className="text-white/70 text-[14px]">Email: <a href="mailto:support@player-001.com" className="text-primary hover:underline">support@player-001.com</a></p>
              </div>
              <p className="text-white/50 text-[13px] italic">
                This is not just digital.<br />There's a system. A team. A structure behind it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── LEGACY CAROUSEL ──────────────────────────────────────────────── */}
        <section className="py-8 md:py-12 px-5 sm:px-8 bg-black border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <SectionHeader
                eyebrow="LEGACY"
                title="What We've Built Before This"
                centered
                titleSize="text-[clamp(1.5rem,5vw,3.5rem)]"
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.05)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-left mb-10">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">Before Player 001…<br />came initiatives that shaped millions of journeys.</p>
              <ul className="text-white/70 text-[14px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                <li>• National-level innovation platforms</li>
                <li>• Technical training ecosystems</li>
                <li>• Startup-building programs</li>
                <li>• Large-scale student transformation initiatives</li>
              </ul>
              <p className="text-white font-semibold text-[15px]">Player 001 is not the beginning.<br />It's the next evolution.</p>
            </motion.div>

            {/* Image carousel */}
            <div className="w-full overflow-hidden rounded-2xl">
              <div className="arena-carousel-track">
                {doubled.map((src, i) => (
                  <div key={i} className="shrink-0 w-[220px] h-[148px] mx-2 rounded-xl overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CONVERSION ─────────────────────────────────────────────── */}
        <section className="py-8 md:py-12 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-0">
            <motion.div {...fadeUpProps()} className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
                <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-primary/80 font-display font-semibold uppercase">Your Move</span>
              </div>
              <h2 className="font-display font-black uppercase tracking-[-0.01em] mb-4">
                <span className="block text-[clamp(1.8rem,5vw,4rem)] leading-[1.05] text-white">You Can Ask.</span>
                <span className="block text-[clamp(1.8rem,5vw,4rem)] leading-[1.05] text-primary">Or You Can Step In.</span>
              </h2>
              <p className="text-white/60 text-[14px] md:text-[16px] leading-relaxed max-w-2xl mx-auto">
                Most people reach this page with questions.<br />
                Some wait. Some get their answers…<br />
                and then take the step.
              </p>
            </motion.div>

            {/* Final CTA */}
            <motion.div {...fadeUpProps(0.1)} className="flex justify-center">
              <a
                href="https://rzp.io/rzp/player001-could-be-you"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex flex-col items-center justify-center px-12 py-5 font-display text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                <span className="relative z-10 text-[13px] font-black tracking-[0.2em] uppercase mb-1">Become a Player</span>
                <span className="relative z-10 text-[11px] font-normal tracking-[0.1em] text-white/85">₹456 — Game Arena Entry Fee</span>
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
