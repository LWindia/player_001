// Type definitions for Episode Ladder component

export type ArenaType = 'online-live' | 'physical' | 'final';
export type EpisodeStatus = 'completed' | 'available' | 'locked';

export interface Position {
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
}

export interface ResponsivePosition {
  desktop: Position;
  mobile: Position;
}

export interface Episode {
  id: number;
  startPlayers: number;
  endPlayers: number;
  arenaType: ArenaType;
  status: EpisodeStatus;
  position: ResponsivePosition;
}

export interface GradientStop {
  offset: string;
  color: string;
  opacity: number;
}

export interface VictoryConfig {
  startPlayers: number;
  endPlayers: number;
  arenaType: ArenaType;
  status: 'locked' | 'achieved';
  position: ResponsivePosition;
}
