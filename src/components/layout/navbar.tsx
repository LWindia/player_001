import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Game Access Pass", path: "/viewers" },
    { name: "Careers", path: "/careers" },
    { name: "Become a Sponsor", path: "/sponsorship" },
    { name: "FAQ", path: "/faq" },
    { name: "Terms & conditions", path: "/terms" },
    { name: "Enquire Now", path: "/enquire" },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/") return location === "/";
    return location === path || location.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX, boxShadow: "0 0 8px rgba(255,46,46,0.8)" }}
      />

      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-[70] h-7 bg-primary/90 backdrop-blur-sm flex items-center overflow-hidden">
        <div className="flex announcement-scroll whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-display text-[9.5px] tracking-[0.38em] text-white/90 font-semibold px-10 flex-shrink-0">
              India&apos;s Biggest Game Arena &nbsp;·&nbsp; 1,00,000 Players Entering Season 1 &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          "top-7",
          isScrolled
            ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.06] py-3 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 relative z-50 shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}assets/ChatGPT_Image_Mar_11__2026__05_13_53_AM.png`}
              alt="PLAYER 001"
              className="h-9 w-auto object-contain transition-all duration-400"
              style={{
                filter: "drop-shadow(0 0 12px rgba(255,46,46,0.5))",
              }}
            />
            <span className="w-[7px] h-[7px] rounded-full bg-primary animate-pulse shadow-[0_0_7px_rgba(255,46,46,0.9)]" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "relative text-[10px] font-display font-semibold transition-colors duration-300 uppercase tracking-[0.14em] group py-2 whitespace-nowrap",
                  isActiveLink(link.path) ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-[1.5px] bg-primary transition-transform origin-left duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActiveLink(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="w-px h-6 bg-white/30" />
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-display font-bold tracking-[0.2em] uppercase overflow-hidden border border-white/60 text-white hover:text-black transition-colors duration-300 clip-corner-all whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">GET GAME INFO</span>
            </Link>
          </div>

          {/* Mobile CTA + Toggle */}
          <div className="md:hidden flex items-center gap-2 relative z-50">
            <Link
              href="/register"
              className="inline-flex items-center px-3 py-2 text-[9px] font-display font-bold tracking-[0.16em] uppercase border border-white/60 text-white clip-corner-all whitespace-nowrap"
            >
              GET GAME INFO
            </Link>
            <button
              className="text-white w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(28px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center"
          >
            <div className="noise-overlay absolute inset-0 z-0 opacity-30" />

            {/* Red glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/8 blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-7 w-full px-8 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.path}
                    className={cn(
                      "text-2xl font-display font-bold hover:text-white hover:neon-text-red transition-all duration-300 tracking-[0.18em] text-center",
                      isActiveLink(link.path) ? "text-white" : "text-white/80"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                <Link
                  href="/register"
                  className="inline-block px-10 py-4 bg-primary text-white font-display font-bold text-sm tracking-[0.22em] uppercase neon-box-red clip-corner-all hover:bg-primary/90 transition-colors"
                >
                  GET GAME INFO
                </Link>
              </motion.div>
            </div>

            {/* Bottom divider */}
            <div className="absolute bottom-12 left-8 right-8 h-px bg-white/[0.06]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
