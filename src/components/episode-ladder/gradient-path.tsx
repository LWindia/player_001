import { motion } from 'framer-motion';

interface GradientPathProps {
  pathDefinition: string;
  mobilePathDefinition: string;
  gradientId: string;
  prefersReducedMotion: boolean;
}

export function GradientPath({ pathDefinition, mobilePathDefinition, gradientId, prefersReducedMotion }: GradientPathProps) {
  return (
    <>
      {/* Desktop path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        viewBox="0 0 1400 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${gradientId}-desktop`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ff2e2e', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#00d9ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00ff88', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={pathDefinition}
          stroke={`url(#${gradientId}-desktop)`}
          strokeWidth="4"
          fill="none"
          filter="url(#pathGlow)"
          strokeLinecap="round"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : {
            pathLength: { duration: 2, ease: [0.42, 0, 0.58, 1] },
            opacity: { duration: 0.5 }
          }}
          style={{
            // Add will-change for path animation
            willChange: prefersReducedMotion ? 'auto' : 'opacity'
          }}
        />
      </svg>

      {/* Mobile path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none md:hidden"
        viewBox="0 0 800 1000"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${gradientId}-mobile`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ff2e2e', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#00d9ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00ff88', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="pathGlowMobile">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={mobilePathDefinition}
          stroke={`url(#${gradientId}-mobile)`}
          strokeWidth="4"
          fill="none"
          filter="url(#pathGlowMobile)"
          strokeLinecap="round"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : {
            pathLength: { duration: 2, ease: [0.42, 0, 0.58, 1] },
            opacity: { duration: 0.5 }
          }}
          style={{
            // Add will-change for path animation
            willChange: prefersReducedMotion ? 'auto' : 'opacity'
          }}
        />
      </svg>
    </>
  );
}
