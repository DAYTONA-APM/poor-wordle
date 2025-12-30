import { create } from 'zustand';
import { WordLength, getRandomWord } from '../lib/words';

export type GameMode = 'classic' | 'timed';

interface GameState {
    gameMode: GameMode | null; // done so, due to landing page
    wordLength: WordLength;
    solution: string;
    isSettingsOpen: boolean;
    setGameMode: (mode: GameMode | null) => void;
    setWordLength: (length: WordLength) => void;
    toggleSettings: () => void;
    resetGame: () => void;
}

export const useGameSettings = create<GameState>((set, get) => ({
  gameMode: null, // Start on the landing page
  wordLength: 5, // Default Wordle length
  solution: getRandomWord(5),
  isSettingsOpen: false,

  setGameMode: (mode: GameMode | null) => {
    const currentLength = get().wordLength;
    set({ 
      gameMode: mode, 
      // If we are entering a game, pick a word. If going to landing page, clear it.
      solution: mode ? getRandomWord(currentLength) : '' 
    });
  },
  
  setWordLength: (length: WordLength) => {
    set({ 
      wordLength: length, 
      solution: getRandomWord(length),
      isSettingsOpen: false 
    });
  },

  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),

  resetGame: () => {
    const currentLength = get().wordLength;
    set({ solution: getRandomWord(currentLength) });
  }
}));