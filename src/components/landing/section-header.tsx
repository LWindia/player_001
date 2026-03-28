type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  centered?: boolean;
  subtitle?: string;
  showElement?: boolean;
  titleSize?: string;
  mobileTitleSize?: string; // Custom mobile font size
  mobileBreaks?: string[]; // Array of text chunks for mobile line breaks
};

export function SectionHeader({
  eyebrow,
  title,
  accent,
  centered = false,
  subtitle,
  showElement = true,
  titleSize = "text-[clamp(2rem,4.5vw,3rem)]",
  mobileTitleSize,
  mobileBreaks,
}: SectionHeaderProps) {
  const parts = accent ? title.split(accent) : [title];
  const coreElement = "https://res.cloudinary.com/dymamigxu/image/upload/v1773858750/element_dztiwk.png";

  return (
    <div className={`relative ${centered ? "text-center" : ""}`}>
      {showElement ? (
        <img
          src={coreElement}
          alt=""
          aria-hidden="true"
          className={`hidden md:block absolute -top-10 ${centered ? "right-1/2 translate-x-[130%]" : "-right-2"} w-16 h-16 object-contain opacity-35 pointer-events-none select-none`}
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div className={`section-eyebrow mb-5 ${centered ? "justify-center" : ""}`}>{eyebrow}</div>
      
      {/* Mobile version with controlled line breaks */}
      {mobileBreaks ? (
        <>
          <h2 className={`sm:hidden ${mobileTitleSize || titleSize} font-display font-bold text-white leading-[1.2] text-center`}>
            {mobileBreaks.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          {/* Desktop version */}
          <h2 className={`hidden sm:block ${titleSize} font-display font-bold text-white leading-[1.1] ${centered ? "text-center" : "text-left"}`}>
            {parts[0]}
            {accent ? <span className="text-primary">{accent}</span> : null}
            {parts[1] ?? ""}
          </h2>
        </>
      ) : (
        <h2 className={`${titleSize} font-display font-bold text-white leading-[1.15] sm:leading-[1.1] text-center ${centered ? "sm:text-center" : "sm:text-left"}`}>
          {parts[0]}
          {accent ? <span className="text-primary">{accent}</span> : null}
          {parts[1] ?? ""}
        </h2>
      )}
      
      {subtitle ? (
        <p className={`text-white/45 text-[16px] mt-5 ${centered ? "max-w-3xl mx-auto" : "max-w-2xl"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
