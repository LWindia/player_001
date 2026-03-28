import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { EpisodeStatus, Position } from './types';

interface EpisodeNodeProps {
  status: EpisodeStatus;
  position: Position;
  animationDelay: number;
  prefersReducedMotion: boolean;
}

export function EpisodeNode({ status, position, animationDelay, prefersReducedMotion }: EpisodeNodeProps) {
  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';

  const nodeVariants = {
    hidden: prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : animationDelay,
        ease: [0.68, -0.55, 0.265, 1.55] as const
      }
    }
  };

  const pulseAnimation = (isLocked && !prefersReducedMotion) ? {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const
    }
  } : undefined;

  return (
    <motion.div
      variants={nodeVariants}
      initial="hidden"
      whileInView="visible"
      animate={pulseAnimation}
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
      <div
        className={`
          w-7 h-7 md:w-9 md:h-9 rounded-full border-3 border-black 
          flex items-center justify-center z-20
          ${isCompleted ? 'bg-primary' : 'bg-white/10'}
        `}
        style={{
          boxShadow: isCompleted
            ? '0 0 20px rgba(255,46,46,0.9)'
            : '0 0 10px rgba(255,255,255,0.3)'
        }}
        role="img"
        aria-label={isCompleted ? 'Episode completed' : isLocked ? 'Episode locked' : 'Episode available'}
      >
        {isCompleted && (
          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" aria-hidden="true" />
        )}
        {isLocked && (
          <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" aria-hidden="true" />
        )}
      </div>
    </motion.div>
  );
}
