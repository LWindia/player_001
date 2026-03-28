import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { EpisodeCard } from './episode-card';
import { EpisodeNode } from './episode-node';
import { VictoryCard } from './victory-card';
import { GradientPath } from './gradient-path';
import { episodeConfig, victoryConfig } from './config';
import { calculateNodePosition } from './utils';

export function EpisodeLadder() {
  // Track mobile breakpoint
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Desktop path definition (horizontal flow with slight upward curve)
  const desktopPath = 'M 120 450 Q 280 420, 450 360 Q 620 300, 790 280 Q 960 260, 1130 250 Q 1250 245, 1350 240';
  
  // Mobile path definition (steeper vertical curve)
  const mobilePath = 'M 50 930 Q 100 850, 200 750 Q 300 650, 400 550 Q 500 450, 600 350 Q 650 250, 700 150 Q 720 100, 740 50';
  
  // Staggered animation delays for episodes (disabled if reduced motion)
  const episodeAnimationDelays = prefersReducedMotion 
    ? [0, 0, 0, 0, 0, 0] 
    : [0.25, 0.30, 0.35, 0.40, 0.45, 0.50];
  const victoryAnimationDelay = prefersReducedMotion ? 0 : 0.55;
  
  // Memoize node positions calculation (expensive operation)
  const nodePositions = useMemo(() => {
    const positions = [];
    
    // Calculate node positions between episodes
    for (let i = 0; i < episodeConfig.length - 1; i++) {
      const pos1 = isMobile ? episodeConfig[i].position.mobile : episodeConfig[i].position.desktop;
      const pos2 = isMobile ? episodeConfig[i + 1].position.mobile : episodeConfig[i + 1].position.desktop;
      positions.push({
        position: calculateNodePosition(pos1, pos2),
        status: episodeConfig[i + 1].status
      });
    }
    
    // Add final node between Episode 6 and Victory
    const lastEpisodePos = isMobile ? episodeConfig[5].position.mobile : episodeConfig[5].position.desktop;
    const victoryPos = isMobile ? victoryConfig.position.mobile : victoryConfig.position.desktop;
    positions.push({
      position: calculateNodePosition(lastEpisodePos, victoryPos),
      status: 'locked' as const
    });
    
    return positions;
  }, [isMobile]);

  return (
    <section 
      className="relative w-full py-12 md:py-16 overflow-hidden"
      aria-label="Episode Ladder: Player elimination progression from 100,000 to 1"
    >
      {/* Header */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 mb-8"
      >
        <h2 className="text-white text-[20px] md:text-[24px] font-display font-black tracking-tight">
          FROM 1,00,000 → 1 | EPISODE LADDER
        </h2>
      </motion.div>

      {/* Main ladder container */}
      <div className="relative w-full">
        <div 
          className="relative w-full"
          style={{ 
            height: isMobile ? '800px' : '600px',
            // Add will-change for animated container
            willChange: prefersReducedMotion ? 'auto' : 'transform'
          }}
          role="region"
          aria-label="Episode progression visualization"
        >
          {/* Gradient Path */}
          <GradientPath 
            pathDefinition={desktopPath}
            mobilePathDefinition={mobilePath}
            gradientId="episode-ladder-gradient"
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Episode Cards */}
          {episodeConfig.map((episode, index) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              animationDelay={episodeAnimationDelays[index]}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}

          {/* Episode Nodes */}
          {nodePositions.map((node, index) => (
            <EpisodeNode
              key={`node-${index}`}
              status={node.status}
              position={node.position}
              animationDelay={episodeAnimationDelays[index] + 0.15}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}

          {/* Victory Card */}
          <VictoryCard
            config={victoryConfig}
            animationDelay={victoryAnimationDelay}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Decorative star element in bottom right */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            whileInView={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
            className="absolute bottom-8 right-8"
            style={{
              // Add will-change for animated element
              willChange: prefersReducedMotion ? 'auto' : 'transform, opacity'
            }}
          >
            <Sparkles 
              className="w-8 h-8 md:w-10 md:h-10 text-[#00ff88]"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0,255,136,0.6))'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
