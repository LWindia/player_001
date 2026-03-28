// Configuration data for Episode Ladder

import { Episode, VictoryConfig } from './types';

export const episodeConfig: Episode[] = [
  {
    id: 1,
    startPlayers: 100000,
    endPlayers: 75000,
    arenaType: 'online-live',
    status: 'completed',
    position: { 
      desktop: { x: 8, y: 75 },
      mobile: { x: 6, y: 93 }
    }
  },
  {
    id: 2,
    startPlayers: 75000,
    endPlayers: 25000,
    arenaType: 'online-live',
    status: 'completed',
    position: { 
      desktop: { x: 22, y: 60 },
      mobile: { x: 25, y: 75 }
    }
  },
  {
    id: 3,
    startPlayers: 25000,
    endPlayers: 8000,
    arenaType: 'online-live',
    status: 'available',
    position: { 
      desktop: { x: 37, y: 47 },
      mobile: { x: 50, y: 55 }
    }
  },
  {
    id: 4,
    startPlayers: 8000,
    endPlayers: 1000,
    arenaType: 'online-live',
    status: 'available',
    position: { 
      desktop: { x: 52, y: 42 },
      mobile: { x: 37, y: 38 }
    }
  },
  {
    id: 5,
    startPlayers: 1000,
    endPlayers: 100,
    arenaType: 'online-live',
    status: 'locked',
    position: { 
      desktop: { x: 67, y: 40 },
      mobile: { x: 62, y: 25 }
    }
  },
  {
    id: 6,
    startPlayers: 100,
    endPlayers: 10,
    arenaType: 'physical',
    status: 'locked',
    position: { 
      desktop: { x: 82, y: 40 },
      mobile: { x: 25, y: 12 }
    }
  }
];

export const victoryConfig: VictoryConfig = {
  startPlayers: 10,
  endPlayers: 1,
  arenaType: 'final',
  status: 'locked',
  position: { 
    desktop: { x: 92, y: 40 },
    mobile: { x: 6, y: 5 }
  }
};
