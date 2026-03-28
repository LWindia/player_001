import { motion } from 'framer-motion';
import { Episode } from './types';
import { formatPlayerCount, getArenaTypeText } from './utils';

interface EpisodeCardProps {
  episode: Episode;
  animationDelay: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function EpisodeCard({ episode, animationDelay, isMobile, prefersReducedMotion }: EpisodeCardProps) {
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

  const position = isMobile ? episode.position.mobile : episode.position.desktop;

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
          className="rounded-lg p-3 md:p-4 border text-center w-[110px] md:w-[130px] transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2e2e] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            background: 'rgba(255,255,255,0.024)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.06)',
            // Add will-change for hover animation
            willChange: prefersReducedMotion ? 'auto' : 'transform'
          }}
          whileHover={prefersReducedMotion ? {} : {
            y: -4,
            borderColor: 'rgba(255,46,46,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,46,46,0.1)',
            transition: {
              duration: 0.35,
              ease: [0.25, 0.8, 0.25, 1] as const
            }
          }}
          tabIndex={0}
          role="article"
          aria-label={`Episode ${episode.id}: ${formatPlayerCount(episode.startPlayers)} players reduced to ${formatPlayerCount(episode.endPlayers)} players. Arena type: ${getArenaTypeText(episode.arenaType)}. Status: ${episode.status}.`}
        >
          <p className="text-[#ff2e2e] text-[11px] md:text-[13px] font-display font-black mb-1" aria-hidden="true">
            Episode {episode.id}
          </p>
          <p className="text-white text-[16px] md:text-[20px] font-display font-black mb-1" aria-hidden="true">
            {formatPlayerCount(episode.startPlayers)} → {formatPlayerCount(episode.endPlayers)}
          </p>
          <p className="text-white/60 text-[9px] md:text-[10px]" aria-hidden="true">
            {getArenaTypeText(episode.arenaType)}
          </p>
        </motion.div>
        {episode.status === 'completed' && (
          <p className="text-white/50 text-[8px]" aria-hidden="true">status: completed</p>
        )}
      </div>
    </motion.div>
  );
}
