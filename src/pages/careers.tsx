import type React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/landing/section-header";

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

export default function Careers() {
  const ROLES = [
    "Production Team (Live + Digital Content)",
    "Performance Marketer",
    "College Champions (Campus Ambassadors)",
    "Outreach & Sponsorship Team",
    "Government Liaison & Partnerships",
    "Marketing Head",
    "Community Manager",
    "Content Strategist",
  ];

  const [form, setForm] = useState({
    name: "", whatsapp: "", email: "", city: "",
    role: "", hasExperience: "", prevCompany: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function scrollToForm(role: string) {
    setForm(prev => ({ ...prev, role }));
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setSubmitError("Please upload a PDF file only.");
      setResumeFile(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSubmitError("Resume must be under 2MB. Please compress your PDF and try again.");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setSubmitError("");
    setResumeFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resumeFile) { setSubmitError("Please upload your resume (PDF)."); return; }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Convert PDF to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(resumeFile);
      });
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, resumeBase64: base64, resumeName: resumeFile.name }),
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

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden vignette pt-20"
          id="careers-hero"
        >
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dymamigxu/video/upload/v1774210089/videoplayback_1_t7wwkb.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ filter: "brightness(1.1) saturate(1.3) contrast(1.1)" }}
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-24">
            <motion.h1
              {...fadeUpProps(0.1)}
              className="font-display font-black uppercase tracking-[-0.01em] mb-6 text-center"
            >
              <span className="block leading-[1.1] text-[clamp(2rem,7vw,5rem)] text-primary">
                BUILD THE ARENA
              </span>
            </motion.h1>

            <motion.div {...fadeUpProps(0.25)} className="text-center max-w-4xl mx-auto">
              <p className="text-[15px] md:text-[18px] text-white font-semibold leading-relaxed mb-4">
                Join the team behind PLAYER 001
              </p>
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed mb-4">
                India has never seen a game like this. A survival reality experience designed at a scale where lakhs participate and millions watch.
              </p>
              <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed mb-4">
                Which means… it requires a team that does not operate like a company, but executes like a movement.
              </p>
              <p className="text-[15px] md:text-[17px] text-white font-semibold leading-relaxed">
                You are not applying for a job. You are stepping into a system that will define how India experiences competition, content, and real-world skill.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHY THIS IS DIFFERENT ───────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHY THIS IS DIFFERENT
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                PLAYER 001 is not a typical organization. It is a high-intensity execution environment where multiple systems come together:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• content production at scale</li>
                <li>• live + physical arena execution</li>
                <li>• performance-driven marketing</li>
                <li>• partnerships & sponsorship ecosystems</li>
                <li>• player engagement across India</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                You will not be assigned predefined tasks. You will own outcomes that directly impact how millions experience the arena.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── DEGREE VS SKILL ─────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05] relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHAT MATTERS HERE
              </h2>
            </motion.div>

            {/* Image in glowing red card */}
            <motion.div {...fadeUpProps(0.1)} className="flex justify-center mb-8">
              <div className="relative p-[5px] max-w-md">
                <div 
                  className="absolute inset-0 rounded-sm animate-pulse"
                  style={{ 
                    border: "2.5px solid #ff2a2a",
                    boxShadow: "0 0 20px rgba(255, 42, 42, 0.8), 0 0 40px rgba(255, 42, 42, 0.6), 0 0 60px rgba(255, 42, 42, 0.4)",
                    animationDuration: "3s"
                  }}
                />
                <img
                  src="https://res.cloudinary.com/dymamigxu/image/upload/v1774194001/degree_Vs_skill_ti633q.png"
                  alt="Degree vs Skill"
                  className="w-full h-auto object-contain relative z-10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUpProps(0.15)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed mb-4 text-center">
                We don't care about your degree. We care about what you can do.
              </p>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed text-center">
                PLAYER 001 is built on execution, not credentials. If you can deliver results, you belong here.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHO WE ARE LOOKING FOR ──────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black border-y border-white/[0.05] relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1773860309/s18_bbqg2n.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.6) saturate(1.3) contrast(1.15)" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/60" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHO WE ARE LOOKING FOR
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                We are not looking for perfect resumes. We are looking for individuals who can:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2">
                <li>• take ownership without constant direction</li>
                <li>• operate in fast-moving environments</li>
                <li>• solve problems in real time</li>
                <li>• execute under pressure</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── OPEN ROLES ──────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-12">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                OPEN ROLES
              </h2>
            </motion.div>

            {/* Role 1: Production Team */}
            <motion.div {...fadeUpProps(0.1)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    PRODUCTION TEAM (LIVE + DIGITAL CONTENT)
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Own the complete visual storytelling of PLAYER 001 —from arena capture to final episode output.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Plan and execute live shoot setups for arena environments</li>
                    <li>• Capture high-quality footage (live + BTS + reactions)</li>
                    <li>• Coordinate with editors to produce episode-level content</li>
                    <li>• Ensure storytelling consistency across all visual outputs</li>
                    <li>• Manage multi-camera production environments</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Experience in video production / live shoot environments</li>
                    <li>• Strong understanding of storytelling through visuals</li>
                    <li>• Ability to execute under time pressure</li>
                    <li>• Hands-on with cameras, direction, and on-ground execution</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Production Team (Live + Digital Content)")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 2: Performance Marketer */}
            <motion.div {...fadeUpProps(0.15)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    PERFORMANCE MARKETER
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Drive growth, visibility, and conversion at scale.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Plan and execute high-performance marketing campaigns</li>
                    <li>• Manage paid + organic growth strategies</li>
                    <li>• Optimize funnels for user acquisition and conversion</li>
                    <li>• Analyze campaign data and improve performance</li>
                    <li>• Work closely with content team for viral distribution</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Proven experience in performance marketing</li>
                    <li>• Strong understanding of digital platforms and audience behavior</li>
                    <li>• Ability to scale campaigns with measurable ROI</li>
                    <li>• Data-driven decision-making mindset</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Performance Marketer")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 3: College Champions */}
            <motion.div {...fadeUpProps(0.2)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    COLLEGE CHAMPIONS (CAMPUS AMBASSADORS)
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Lead PLAYER 001 inside your college ecosystem.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Drive awareness and participation within campus</li>
                    <li>• Build student communities around the game</li>
                    <li>• Onboard and guide players locally</li>
                    <li>• Execute on-ground activations</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">What You Get</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Best-in-market incentives</li>
                    <li>• Opportunity to earn while studying</li>
                    <li>• National-level exposure</li>
                    <li>• Direct association with a large-scale platform</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("College Champions (Campus Ambassadors)")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 4: Outreach & Sponsorship Team */}
            <motion.div {...fadeUpProps(0.25)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    OUTREACH & SPONSORSHIP TEAM
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Build and expand the brand ecosystem behind PLAYER 001.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Identify and approach potential sponsors</li>
                    <li>• Build partnerships across industries</li>
                    <li>• Manage sponsor relationships and deliverables</li>
                    <li>• Collaborate with internal teams for brand integrations</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Strong communication and negotiation skills</li>
                    <li>• Experience in business development or partnerships</li>
                    <li>• Ability to build long-term professional relationships</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Outreach & Sponsorship Team")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 5: Government Liaison */}
            <motion.div {...fadeUpProps(0.3)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    GOVERNMENT LIAISON & PARTNERSHIPS
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Align PLAYER 001 with national-level initiatives and institutions.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Build connections with government bodies and institutions</li>
                    <li>• Explore collaboration under skill development initiatives</li>
                    <li>• Identify funding and partnership opportunities</li>
                    <li>• Manage official communications and processes</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Strong network in government / institutional ecosystem</li>
                    <li>• Understanding of public systems and policies</li>
                    <li>• Ability to navigate structured environments</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Government Liaison & Partnerships")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 6: Marketing Head */}
            <motion.div {...fadeUpProps(0.35)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    MARKETING HEAD
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Lead and scale the entire marketing function of PLAYER 001.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Define and execute overall marketing strategy</li>
                    <li>• Build and manage multi-channel campaigns</li>
                    <li>• Oversee brand positioning and messaging</li>
                    <li>• Drive growth metrics across the platform</li>
                    <li>• Lead and coordinate cross-functional teams</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Proven leadership in marketing roles</li>
                    <li>• Experience scaling products or platforms</li>
                    <li>• Strategic thinking with execution capability</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Marketing Head")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 7: Community Manager */}
            <motion.div {...fadeUpProps(0.4)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    COMMUNITY MANAGER
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Build, engage, and manage the player ecosystem across India.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Manage player communication across platforms (WhatsApp, Discord, etc.)</li>
                    <li>• Build and nurture active communities</li>
                    <li>• Handle engagement, queries, and updates</li>
                    <li>• Ensure players stay connected and informed throughout the journey</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Strong communication skills</li>
                    <li>• Experience in community building or engagement</li>
                    <li>• Ability to manage large groups and interactions</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Community Manager")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>

            {/* Role 8: Content Strategist */}
            <motion.div {...fadeUpProps(0.45)} className="mb-8">
              <div className="premium-card prize-card-animated rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210074/pxfuel.jpg_blrljb.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.5) saturate(1.3) contrast(1.15)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/65" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-primary text-[18px] md:text-[20px] font-display font-bold mb-4">
                    CONTENT STRATEGIST
                  </h3>
                  <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                    Own the narrative and storytelling of PLAYER 001.
                  </p>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Key Responsibilities</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2 mb-4">
                    <li>• Develop content strategy across platforms</li>
                    <li>• Create high-impact storytelling for campaigns</li>
                    <li>• Align messaging across website, ads, and communication</li>
                    <li>• Work closely with marketing and production teams</li>
                  </ul>
                  <h4 className="text-white text-[15px] md:text-[16px] font-semibold mb-3">Who Should Apply</h4>
                  <ul className="text-white/70 text-[13px] md:text-[15px] leading-relaxed space-y-2">
                    <li>• Strong writing and storytelling ability</li>
                    <li>• Experience in content strategy / brand communication</li>
                    <li>• Understanding of audience psychology</li>
                  </ul>
                  <button type="button" onClick={() => scrollToForm("Content Strategist")} className="mt-5 group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-[0.18em] text-[11px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"><span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><span className="relative z-10">APPLY NOW →</span></button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WHY JOIN ────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black/60 border-y border-white/[0.05] relative overflow-hidden">
          {/* Background Character Images */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210088/WhatsApp_Image_2026-03-23_at_01.37.24_rhyltx.jpg"
              alt=""
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[70%] w-auto object-contain opacity-25"
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://res.cloudinary.com/dymamigxu/image/upload/v1774210082/WhatsApp_Image_2026-03-23_at_01.33.16_purp3d.jpg"
              alt=""
              className="absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-auto object-contain opacity-25"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/85 to-black/75" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-6">
                WHY JOIN PLAYER 001
              </h2>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-8 mb-8">
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed mb-4">
                This is not just another role. This is an opportunity to build something at a scale very few people get to experience.
              </p>
              <p className="text-white text-[15px] md:text-[17px] font-semibold mb-4">
                What you gain:
              </p>
              <ul className="text-white/70 text-[14px] md:text-[16px] leading-relaxed space-y-2 mb-4">
                <li>• ownership of real outcomes</li>
                <li>• exposure to national-level execution</li>
                <li>• fast-paced growth</li>
                <li>• work that stands out</li>
              </ul>
              <p className="text-white text-[15px] md:text-[17px] font-semibold leading-relaxed">
                This is the kind of experience that defines your career trajectory.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── APPLICATION FORM ─────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 sm:px-8 bg-black" id="apply-form">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUpProps()} className="text-center mb-10">
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-display font-black text-white uppercase mb-4">
                Apply Now
              </h2>
              <p className="text-white/70 text-[14px] md:text-[16px] leading-relaxed">
                Fill in your details and upload your resume. We'll be in touch.
              </p>
            </motion.div>

            <motion.div {...fadeUpProps(0.1)} className="premium-card prize-card-animated rounded-xl p-6 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <p className="text-primary text-[28px] font-display font-black mb-3">✓ Application Received</p>
                  <p className="text-white/70 text-[15px]">We'll review your application and reach out soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Name <span className="text-primary">*</span></label>
                    <input name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide" />
                  </div>
                  {/* WhatsApp + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">WhatsApp No <span className="text-primary">*</span></label>
                      <input name="whatsapp" type="tel" required placeholder="+91 XXXXX XXXXX" value={form.whatsapp} onChange={handleChange}
                        className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide" />
                    </div>
                    <div>
                      <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Email ID <span className="text-primary">*</span></label>
                      <input name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange}
                        className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide" />
                    </div>
                  </div>
                  {/* City */}
                  <div>
                    <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Current City <span className="text-primary">*</span></label>
                    <input name="city" type="text" required placeholder="Your city" value={form.city} onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide" />
                  </div>
                  {/* Role */}
                  <div>
                    <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Applying for which role? <span className="text-primary">*</span></label>
                    <select name="role" required value={form.role} onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide">
                      <option value="" className="bg-black">Select a role</option>
                      {ROLES.map(r => <option key={r} value={r} className="bg-black">{r}</option>)}
                    </select>
                  </div>
                  {/* Experience */}
                  <div>
                    <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Do you have past experience? <span className="text-primary">*</span></label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="hasExperience" value={opt} checked={form.hasExperience === opt} onChange={handleChange}
                            className="accent-primary w-4 h-4" />
                          <span className="text-white font-display text-[14px]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Previous company — only if Yes */}
                  {form.hasExperience === "Yes" && (
                    <div>
                      <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Previous Company & Job Role</label>
                      <input name="prevCompany" type="text" placeholder="e.g. Acme Corp — Marketing Executive" value={form.prevCompany} onChange={handleChange}
                        className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/60 focus:bg-black/60 transition-all font-display text-[15px] tracking-wide" />
                    </div>
                  )}
                  {/* Resume Upload */}
                  <div>
                    <label className="block text-white/70 text-[12px] font-display tracking-[0.15em] uppercase mb-2">Upload Resume (PDF only, max 2MB) <span className="text-primary">*</span></label>
                    <div
                      className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white/50 cursor-pointer hover:border-primary/60 transition-all font-display text-[14px] flex items-center gap-3"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="text-primary text-[18px]">📎</span>
                      <span>{resumeFile ? resumeFile.name : "Click to upload PDF"}</span>
                    </div>
                    <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                  </div>
                  {submitError && <p className="text-primary text-[13px]">{submitError}</p>}
                  <button type="submit" disabled={isSubmitting}
                    className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-5 font-display font-bold tracking-[0.2em] text-[12px] text-white bg-primary overflow-hidden clip-corner-all transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed disabled:scale-100">
                    <span className="absolute inset-0 bg-white/12 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out" />
                    {isSubmitting ? (
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        SUBMITTING...
                      </span>
                    ) : (
                      <span className="relative z-10">SUBMIT APPLICATION</span>
                    )}
                  </button>
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

