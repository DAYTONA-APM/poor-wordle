import { create } from 'zustand';
import { WordLength, getRandomWord } from '../lib/words';

interface GameState {
    wordLength: WordLength;
    solution: string;
    isSettingsOpen: boolean;
    setWordLength: (length: WordLength) => void;
    toggleSettings: () => void;
    resetGame: () => void;
}

export const useGameSettings = create<GameState>((set, get) => ({
  wordLength: 5, // Default Wordle length
  solution: getRandomWord(5),
  isSettingsOpen: false,
  
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