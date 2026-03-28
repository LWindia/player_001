import { motion } from "framer-motion";

type CharacterSpotlightProps = {
  src: string;
  alt: string;
  align?: "start" | "center" | "end";
};

export function CharacterSpotlight({ src, alt, align = "end" }: CharacterSpotlightProps) {
  const alignClass = align === "start" ? "items-start" : align === "center" ? "items-center" : "items-end";

  return (
    <div className={`hidden xl:flex ${alignClass} justify-center`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full max-w-[320px] h-auto object-contain opacity-95 drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)] select-none pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
