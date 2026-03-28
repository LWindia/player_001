// Utility functions for Episode Ladder component

import { ArenaType, Position, Episode } from './types';

/**
 * Format player count using Indian numbering system
 * Examples: 100000 -> "1,00,000", 75000 -> "75,000", 1000 -> "1,000"
 */
export function formatPlayerCount(count: number): string {
  if (count >= 100000) {
    // Indian numbering system: 1,00,000
    const lakhs = Math.floor(count / 100000);
    const remainder = count % 100000;
    return `${lakhs},${String(remainder).padStart(5, '0')}`;
  }
  return count.toLocaleString('en-IN');
}

/**
 * Get display text for arena type
 */
export function getArenaTypeText(arenaType: ArenaType): string {
  switch (arenaType) {
    case 'online-live':
      return 'Online + Live Arena';
    case 'physical':
      return 'Physical Arena Battle';
    case 'final':
      return 'Final Arena';
  }
}

/**
 * Calculate node position between two episodes (midpoint)
 */
export function calculateNodePosition(pos1: Position, pos2: Position): Position {
  return {
    x: (pos1.x + pos2.x) / 2,
    y: (pos1.y + pos2.y) / 2
  };
}

/**
 * Get position for current breakpoint
 */
export function getResponsivePosition(position: { desktop: Position; mobile: Position }, isMobile: boolean): Position {
  return isMobile ? position.mobile : position.desktop;
}

/**
 * Validate episode configuration data
 * Ensures:
 * - Exactly 6 episodes
 * - Start players > end players for each episode
 * - Player counts are continuous between episodes
 */
export function validateEpisodeConfig(episodes: Episode[]): boolean {
  if (episodes.length !== 6) {
    console.error('Expected 6 episodes');
    return false;
  }

  for (let i = 0; i < episodes.length; i++) {
    const episode = episodes[i];

    if (episode.startPlayers <= episode.endPlayers) {
      console.error(`Episode ${i + 1}: Start players must be greater than end players`);
      return false;
    }

    if (i > 0 && episodes[i - 1].endPlayers !== episode.startPlayers) {
      console.error(`Episode ${i + 1}: Player count mismatch with previous episode`);
      return false;
    }
  }

  return true;
}
