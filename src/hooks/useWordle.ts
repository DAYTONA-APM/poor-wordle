// /src/hooks/useWordle.ts
import { useState } from 'react';
import { useGameSettings } from './useGameSettings';
import { checkGuess, LetterStatus } from '../lib/logic';
import { resourceLimits } from 'node:worker_threads';

export const useWordle = () => {
  const { solution, wordLength } = useGameSettings();
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<{key: string, color: LetterStatus}[][]>([]); 
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState<{ [key: string]: LetterStatus }>({});


  const handleKeyup = (key: string) => {
    // 1. Handle Backspace
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // 2. Handle Enter (Submit)
    if (key === 'Enter') {
      if (turn > 5) return; // Game over
      if (currentGuess.length !== wordLength) return; // Too short
      
      const formattedGuess = checkGuess(currentGuess, solution);

      setUsedKeys((prev) => {
        const newKeys = { ...prev };
        currentGuess.split('').forEach((letter, i) => {
        const status = formattedGuess[i];
        const currentStatus = newKeys[letter];

        // Logic: correct > present > absent
        if (status === 'correct') {
            newKeys[letter] = 'correct';
        } else if (status === 'present' && currentStatus !== 'correct') {
            newKeys[letter] = 'present';
        } else if (!currentStatus) {
            newKeys[letter] = 'absent';
        }
        });
        return newKeys;
      });
      
      // Update state
      setGuesses((prev) => [...prev, currentGuess.split('').map((l, i) => ({key: l, color: formattedGuess[i]}))]);
      setTurn((prev) => prev + 1);
      
      if (currentGuess === solution) setIsCorrect(true);
      setCurrentGuess('');
      return;
    }

    // 3. Handle Alpha Keys
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => (prev + key).toUpperCase());
      }
    }
  };

  const resetGameLogic = () => {
    setTurn(0);
    setCurrentGuess('');
    setGuesses([]);
    setIsCorrect(false);
    setUsedKeys({});
  }

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, resetGameLogic };
};