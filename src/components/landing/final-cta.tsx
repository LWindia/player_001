import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

type FinalCtaProps = {
  compact?: boolean;
};

export function FinalCta({ compact = false }: FinalCtaProps) {
  const coreElement = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858750/element_dztiwk.png";

  return (
    <section className={`${compact ? "py-20" : "py-24"} px-6 border-y border-primary/15 bg-black/70 relative overflow-hidden`} aria-labelledby="final-cta-shared-title">
      <img
        src={coreElement}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-6 right-8 w-20 h-20 object-contain opacity-30 pointer-events-none select-none"
        loading="lazy"
        decoding="async"
      />
      <img
        src={coreElement}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute bottom-8 left-10 w-14 h-14 object-contain opacity-20 pointer-events-none select-none rotate-180"
        loading="lazy"
        decoding="async"
      />
      <div className="max-w-5xl mx-auto text-center">
        <h2 id="final-cta-shared-title" className="text-[clamp(2rem,5vw,3.75rem)] font-display font-black text-white uppercase leading-[0.95]">
          Some will watch.
          <br />
          <span className="text-primary neon-text-red">Some will play.</span>
        </h2>
        <p className="text-[16px] md:text-[18px] text-white/60 mt-6">History remembers the ones who step forward.</p>
        <Link
          href="/register"
          className="group inline-flex items-center gap-3 px-10 py-4 mt-10 bg-primary text-white font-display font-bold tracking-[0.2em] text-[11px] clip-corner-all hover:bg-red-600 transition-all duration-300"
        >
          ENTER THE ARENA
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}
