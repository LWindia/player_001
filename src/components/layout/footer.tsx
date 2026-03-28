import { Link } from "wouter";
import { Twitter, Instagram, Youtube, Shield, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dymamigxu/image/upload/v1774433715/ps_ysvx4w.gif"
          alt=""
          className="w-full h-full object-contain object-right"
          style={{ filter: "brightness(0.6) saturate(1.15) contrast(1.1)" }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>
      
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-16">

          {/* Brand column */}
          <div className="col-span-1 md:col-span-5">
            <Link href="/" className="inline-block mb-4 md:mb-6 group">
              <span className="font-display font-black text-2xl md:text-3xl tracking-[0.15em] text-white group-hover:neon-text-red transition-all duration-300">
                PLAYER <span className="text-primary">001</span>
              </span>
            </Link>
            <p className="text-white/40 max-w-xs mb-6 md:mb-8 text-[13px] md:text-[15px] leading-relaxed font-light">
              India's first survival reality game built around real-life situations. Not a competition — an awakening.
            </p>

            {/* Social links */}
            <div className="flex gap-2.5 md:gap-3">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "Youtube" },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 md:w-9 md:h-9 border border-white/[0.1] flex items-center justify-center text-white/40 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-lg"
                >
                  <Icon className="w-[14px] h-[14px] md:w-[15px] md:h-[15px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigation column */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[9px] md:text-[10px] font-display font-semibold text-white/30 mb-4 md:mb-6 uppercase tracking-[0.35em] pl-3 border-l border-primary/40">Navigation</h4>
            <ul className="space-y-2.5 md:space-y-3.5">
              {[
                { label: "Home", path: "/" },
                { label: "The Arena", path: "/arena" },
                { label: "How The Game Works", path: "/game" },
                { label: "Player Journey", path: "/journey" },
                { label: "Rewards", path: "/rewards" },
                { label: "Opportunities", path: "/opportunities" },
                { label: "FAQ", path: "/faq" },
                { label: "Register", path: "/register" },
              ].map(({ label, path }, i) => (
                <li key={i}>
                  <Link
                    href={path}
                    className="group flex items-center gap-2 text-[13px] md:text-[14px] text-white/40 hover:text-white transition-colors duration-250"
                  >
                    <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary -ml-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[9px] md:text-[10px] font-display font-semibold text-white/30 mb-4 md:mb-6 uppercase tracking-[0.35em] pl-3 border-l border-primary/40">Legal</h4>
            <ul className="space-y-2.5 md:space-y-3.5">
              {[
                { label: "Legal & Compliance", path: "/legal" },
                { label: "Terms & conditions", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy" },
              ].map(({ label, path }, i) => (
                <li key={i}>
                  <Link
                    href={path}
                    className="group flex items-center gap-2 text-[13px] md:text-[14px] text-white/40 hover:text-white transition-colors duration-250"
                  >
                    <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary -ml-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px w-full bg-white/[0.06] mb-6 md:mb-8" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-5">
          <div className="flex items-start gap-2.5 md:gap-3">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/60 shrink-0 mt-0.5" />
            <p className="text-[11.5px] md:text-[12.5px] text-white/30 leading-relaxed max-w-md">
              PLAYER 001 is a skill-based competition platform and does not involve gambling.
            </p>
          </div>
          <p className="text-[10.5px] md:text-[11.5px] text-white/20 font-mono whitespace-nowrap">
            © {new Date().getFullYear()} PLAYER 001. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
