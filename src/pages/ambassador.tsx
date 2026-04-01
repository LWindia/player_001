import type React from "react";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";

const springEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.75, delay, ease: springEase },
  } as const;
}

export default function Ambassador() {
  const { scrollYProgress } = useScroll();

  const [form, setForm] = useState({
    fullName: "", college: "", city: "", phone: "", email: "", why: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.status === "success") {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>

        {/* ── HERO SECTION ─────────────────────────────────────────────────────────── */}
        <section
          className="relative w-full overflow-hidden bg-black"
          id="hero"
          aria-labelledby="hero-title"
          style={{ paddingTop: 'calc(7rem - 2px)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12" style={{ transform: 'translateY(5px)' }}>
            
            {/* Eyebrow - Above Image */}
            <motion.div {...fadeUpProps(0.1)} className="flex items-center gap-2 mb-6 sm:mb-8">
              <span className="w-5 h-px bg-primary block" style={{ boxShadow: "0 0 6px rgba(255,46,46,0.8)" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-primary/80 font-display font-semibold uppercase">BUILD THE ARENA FROM YOUR CAMPUS</span>
            </motion.div>



          </div>

          {/* Black Background Section with Main Content */}
          <div className="relative bg-black pt-6 sm:pt-12 md:pt-16 pb-6 sm:pb-10 md:pb-12 overflow-hidden">
            
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
              
              {/* Two column layout: content left, images right */}
              <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                
                {/* Left: Text content */}
                <div className="flex-1">
                  {/* Headline */}
                  <motion.div {...fadeUpProps(0.15)} className="mb-6 sm:mb-8">
                    <h1 id="hero-title" className="font-display font-black uppercase tracking-[-0.02em] text-white">
                      <span className="block sm:hidden">
                        <span className="block text-[5.8vw] leading-[1.08] whitespace-nowrap mb-2.5">BUILD THE ARENA</span>
                        <span className="block text-[5.8vw] leading-[1.08] whitespace-nowrap mb-2.5">FROM YOUR CAMPUS</span>
                      </span>
                      <span className="hidden sm:block text-[clamp(2.5rem,6vw,5rem)] leading-[1.08]">
                        BUILD THE ARENA FROM YOUR CAMPUS
                      </span>
                    </h1>
                  </motion.div>

                  {/* Sub-copy */}
                  <motion.div {...fadeUpProps(0.2)} className="mb-6 sm:mb-8">
                    <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/80 font-medium leading-relaxed max-w-3xl">
                      India's biggest survival reality game is being built.
                    </p>
                    <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/80 font-medium leading-relaxed max-w-3xl">
                      And inside every college,
                    </p>
                    <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/80 font-medium leading-relaxed max-w-3xl">
                      There will be a few people who don't just watch it grow…they build it.
                    </p>
                  </motion.div>

                  <motion.div {...fadeUpProps(0.25)} className="mb-6 sm:mb-8">
                    <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white font-semibold leading-relaxed max-w-3xl">
                      You are not here to promote a game.
                    </p>
                    <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white font-semibold leading-relaxed max-w-3xl">
                      You are here to lead something
                    </p>
                    <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white font-semibold leading-relaxed max-w-3xl">
                      that people around you will remember.
                    </p>
                  </motion.div>

                  {/* Mobile only image — above CTA */}
                  <motion.div {...fadeUpProps(0.27)} className="block md:hidden mb-6">
                    <img
                      src="https://res.cloudinary.com/dymamigxu/image/upload/v1775049856/Badge-updateumbyjn-removebg-preview_duyqcq.png"
                      alt=""
                      className="w-full h-[280px] object-contain object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>

                  {/* CTA */}
                  <motion.div {...fadeUpProps(0.3)} className="flex flex-col items-start gap-3 mb-8">
                    <a href="#application-form" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                      <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                      <span className="relative z-10">BECOME A CAMPUS CHAMPION</span>
                    </a>
                    <p className="text-white/70 text-[13px] leading-relaxed">
                      Start your journey from your campus
                    </p>
                  </motion.div>
                </div>

                {/* Right: Single image card — desktop only */}
                <motion.div {...fadeUpProps(0.2)} className="hidden md:block w-[280px] shrink-0">
                  <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src="https://res.cloudinary.com/dgin6wumo/image/upload/v1775039035/Screenshot_20260401-155208_umbyjn.png"
                      alt=""
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* ── ROLE + DIFFERENTIATION ────────────────────────────────────────────── */}
        <section
          className="pt-3 md:pt-4 pb-5 md:pb-8 px-5 sm:px-8 relative bg-black/60 border-y border-white/[0.05]"
          id="role-section"
          aria-labelledby="role-title"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="role-title">
              <SectionHeader
                eyebrow="WHAT YOU DO — AND WHY IT MATTERS"
                title="Every arena needs players. But before players enter, someone creates the momentum."
                centered
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.2rem,4.8vw,3.9375rem)]"
                mobileBreaks={["EVERY ARENA NEEDS PLAYERS.", "BUT BEFORE PLAYERS ENTER,", "SOMEONE CREATES THE MOMENTUM."]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.05)} className="max-w-3xl mx-auto mb-8 text-white/65 text-[14px] md:text-[16px] leading-relaxed text-center">
              <p className="mb-4">As a Campus Champion, you become the official face of PLAYER 001 in your college.</p>
              <p className="mb-4">You don't just share information.</p>
            </motion.div>

            {/* Three Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
              <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <div className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>• Introduce the game to your campus</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.15)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <div className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>• Bring players into the arena</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.2)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <div className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>• Create real conversations that drive action</p>
                </div>
              </motion.div>
            </div>

            <motion.div {...fadeUpProps(0.25)} className="text-center mb-8">
              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/80 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
                Here, you are given ownership,
              </p>
              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/80 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
                Visibility, and the chance to build something real.
              </p>
              <p className="text-[clamp(1.25rem,3.2vw,2.2rem)] font-display font-black text-white uppercase leading-tight mt-8">
                YOU ARE NOT A PROMOTER WORKING QUIETLY.
                <br />
                <span className="text-primary">YOU ARE A BUILDER PEOPLE NOTICE.</span>
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUpProps(0.3)} className="text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="#application-form" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">STEP INTO THE ROLE</span>
                </a>
                <p className="text-white/70 text-[13px] leading-relaxed">
                  Take ownership on your campus
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── VALUE STACK ─────────────────────────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative overflow-hidden border-y border-white/[0.05] bg-black"
          id="value-stack"
          aria-labelledby="value-stack-title"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="value-stack-title">
              <SectionHeader 
                eyebrow="WHAT YOU GET (VALUE STACK)" 
                title="This Role Builds More Than You Expect" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.2rem,4.8vw,3.9375rem)]"
                mobileBreaks={["THIS ROLE BUILDS", "MORE THAN YOU EXPECT"]}
              />
            </motion.div>

            {/* Intro copy */}
            <motion.div {...fadeUpProps(0.03)} className="max-w-3xl mx-auto mb-6 md:mb-9 text-white/65 text-[14px] md:text-[16px] leading-relaxed text-center">
              <p className="mb-4">This is not just about earning.</p>
              <p className="mb-4">This is about building something that stays with you.</p>
            </motion.div>

            {/* Three pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              <motion.div {...fadeUpProps(0.07)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">EARNINGS THAT SCALE WITH YOU</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>Your effort directly reflects in your rewards.</p>
                  <p>• Performance-based incentives</p>
                  <p>• Bonuses for consistency</p>
                  <p>• Rewards for real impact</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.14)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">EXPERIENCE THAT BUILDS YOUR CAREER</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>This is where you gain what most students don't.</p>
                  <p>• Leadership experience</p>
                  <p>• Execution exposure</p>
                  <p>• Real-world project ownership</p>
                  <p className="text-white/85 font-semibold">This is what recruiters actually look for.</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.21)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <h3 className="text-white text-[18px] md:text-[20px] mb-5 font-display uppercase tracking-wide">GROWTH THAT CHANGES HOW YOU THINK</h3>
                <div className="space-y-3 text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>You develop:</p>
                  <p>• Communication that influences</p>
                  <p>• Confidence in decisions</p>
                  <p>• Ability to take responsibility</p>
                  <p className="text-white/85 font-semibold">This is what separates you from everyone else.</p>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div {...fadeUpProps(0.22)} className="text-center">
              <div className="flex flex-col items-center justify-center gap-3 mt-8">
                <a href="#application-form" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">START BUILDING YOUR PROFILE</span>
                </a>
                <p className="text-white/70 text-[13px] leading-relaxed">Stand out before you graduate</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FIT + SCALE + FINAL PUSH ───────────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative border-y border-white/[0.05] bg-black/60"
          id="fit-section"
          aria-labelledby="fit-title"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="fit-title">
              <SectionHeader 
                eyebrow="THIS IS FOR YOU IF YOU WANT MORE" 
                title="This role is for you if:" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["THIS ROLE IS", "FOR YOU IF:"]}
              />
            </motion.div>

            {/* Three conditions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
              <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <div className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>• You don't want to be like everyone else</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.15)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <div className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>• You want real experience, not just theory</p>
                </div>
              </motion.div>

              <motion.div {...fadeUpProps(0.2)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
                <div className="text-white/70 text-[14px] md:text-[15px] leading-relaxed">
                  <p>• You are ready to take initiative</p>
                </div>
              </motion.div>
            </div>

            <motion.div {...fadeUpProps(0.25)} className="text-center mb-8">
              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/80 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
                It does not matter what you study.
              </p>
              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white font-semibold leading-relaxed max-w-3xl mx-auto">
                It matters how you act.
              </p>
            </motion.div>

            {/* BE PART OF SOMETHING BIGGER */}
            <motion.div {...fadeUpProps(0.3)} className="text-center mb-10">
              <h3 className="text-white text-[clamp(1.5rem,4vw,2.5rem)] mb-8 font-display uppercase tracking-wide">BE PART OF SOMETHING BIGGER</h3>
              <div className="space-y-4 text-white/70 text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed max-w-4xl mx-auto">
                <p>Lakhs of players.</p>
                <p>Colleges across India.</p>
                <p>This is not local.</p>
                <p className="text-primary font-semibold">This is national.</p>
                <p>And the people who step in early</p>
                <p>will always have the edge.</p>
              </div>
            </motion.div>

            {/* Impact line */}
            <motion.div {...fadeUpProps(0.35)} className="text-center mb-8">
              <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-display font-black text-white uppercase leading-tight">
                SOME WILL WATCH THIS HAPPEN
                <br />
                <span className="text-primary">SOME WILL BUILD IT</span>
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUpProps(0.4)} className="text-center mb-16">
              <div className="flex flex-col items-center justify-center gap-3">
                <a href="#application-form" className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                  <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                  <span className="relative z-10">BECOME A CAMPUS CHAMPION</span>
                </a>
                <p className="text-white/70 text-[13px] leading-relaxed">Your journey starts from your campus</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── APPLICATION FORM ────────────────────────────────────────────────────── */}
        <section
          className="py-5 md:py-8 px-5 sm:px-8 relative bg-black border-y border-white/[0.05]"
          id="application-form"
          aria-labelledby="application-form-title"
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-6 md:mb-9" id="application-form-title">
              <SectionHeader 
                eyebrow="APPLICATION FORM" 
                title="Step Into The System" 
                centered 
                titleSize="text-[clamp(1.5rem,5.625vw,3.75rem)]"
                mobileTitleSize="text-[clamp(1.575rem,5.906vw,3.9375rem)]"
                mobileBreaks={["STEP INTO", "THE SYSTEM"]}
              />
            </motion.div>

            <motion.div {...fadeUpProps(0.05)} className="max-w-2xl mx-auto mb-8 text-white/65 text-[14px] md:text-[16px] leading-relaxed text-center">
              <p className="mb-4">Fill the form below to begin:</p>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <p className="text-primary text-[clamp(1.5rem,4vw,2.5rem)] font-display font-black uppercase mb-4">Application Received!</p>
                  <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed">
                    We'll be in touch soon. Get ready to build the arena.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="fullName" className="block text-white text-[14px] md:text-[15px] font-display mb-2">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required value={form.fullName} onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your full name" />
                  </div>

                  <div>
                    <label htmlFor="college" className="block text-white text-[14px] md:text-[15px] font-display mb-2">College Name</label>
                    <input type="text" id="college" name="college" required value={form.college} onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your college name" />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-white text-[14px] md:text-[15px] font-display mb-2">City</label>
                    <input type="text" id="city" name="city" required value={form.city} onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your city" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white text-[14px] md:text-[15px] font-display mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your phone number" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white text-[14px] md:text-[15px] font-display mb-2">Email ID</label>
                    <input type="email" id="email" name="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your email address" />
                  </div>

                  <div>
                    <label htmlFor="why" className="block text-white text-[14px] md:text-[15px] font-display mb-2">Why do you want to become a Campus Champion?</label>
                    <textarea id="why" name="why" required rows={5} value={form.why} onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us why you want to be a Campus Champion..." />
                  </div>

                  {submitError && (
                    <p className="text-primary text-[13px] text-center">{submitError}</p>
                  )}

                  <div className="text-center pt-4">
                    <button type="submit" disabled={isSubmitting}
                      className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 font-display font-bold tracking-[0.2em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                      <span className="relative z-10">{isSubmitting ? "SUBMITTING..." : "APPLY TO BECOME A CAMPUS CHAMPION"}</span>
                    </button>
                    <p className="text-white/70 text-[13px] mt-3">Takes less than 2 minutes</p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
