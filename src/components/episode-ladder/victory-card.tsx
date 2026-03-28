import { motion } from 'framer-motion';
import { Crown, Lock } from 'lucide-react';
import { VictoryConfig } from './types';
import { formatPlayerCount } from './utils';

interface VictoryCardProps {
  config: VictoryConfig;
  animationDelay: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function VictoryCard({ config, animationDelay, isMobile, prefersReducedMotion }: VictoryCardProps) {
  const fadeUpVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : animationDelay,
        ease: [0.25, 0.8, 0.25, 1] as const
      }
    }
  };

  const pulseAnimation = prefersReducedMotion ? {} : {
    scale: [1, 1.02, 1],
    boxShadow: [
      '0 0 30px rgba(255,46,46,0.5)',
      '0 0 45px rgba(255,46,46,0.7)',
      '0 0 30px rgba(255,46,46,0.5)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const
    }
  };

  const position = isMobile ? config.position.mobile : config.position.desktop;

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        // Add will-change for animated element
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity'
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.div
          animate={pulseAnimation}
          className="rounded-lg p-3 md:p-4 border-2 text-center w-[120px] md:w-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2e2e] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            background: 'rgba(255,255,255,0.038)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,46,46,0.5)',
            boxShadow: '0 0 30px rgba(255,46,46,0.5)',
            // Add will-change for pulse animation
            willChange: prefersReducedMotion ? 'auto' : 'transform'
          }}
          tabIndex={0}
          role="article"
          aria-label={`Championship: ${formatPlayerCount(config.startPlayers)} players reduced to ${formatPlayerCount(config.endPlayers)} player. Final Arena. Status: ${config.status}.`}
        >
          <div className="flex items-center justify-center mb-2">
            <Crown className="w-5 h-5 md:w-6 md:h-6 text-[#ff2e2e]" aria-hidden="true" />
          </div>
          <p className="text-white text-[16px] md:text-[20px] font-display font-black mb-1" aria-hidden="true">
            {formatPlayerCount(config.startPlayers)} → {formatPlayerCount(config.endPlayers)}
          </p>
          <p className="text-white/60 text-[9px] md:text-[10px]" aria-hidden="true">
            Final Arena
          </p>
          {config.status === 'locked' && (
            <div className="mt-2 px-2 py-1 rounded" style={{
              background: 'rgba(255,46,46,0.15)',
              border: '1px solid rgba(255,46,46,0.4)'
            }}>
              <p className="text-[#ff2e2e] text-[8px] font-display font-bold uppercase tracking-wider" aria-hidden="true">
                Championship Locked
              </p>
            </div>
          )}
        </motion.div>
        {config.status === 'locked' && (
          <div
            className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/10 border-3 border-black flex items-center justify-center z-20"
            style={{ boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
            role="img"
            aria-label="Championship locked"
          >
            <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" aria-hidden="true" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
