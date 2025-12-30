"use client";
import { useEffect } from 'react';
import { useGameSettings } from '../hooks/useGameSettings';
import { useWordle } from '../hooks/useWordle';
import { Board } from '../components/game/Board';
import { Settings } from '../components/ui/Settings';
import { Keyboard } from '../components/game/Keyboard';

export default function Home() {
  const { wordLength, toggleSettings, solution } = useGameSettings();
  const { turn, currentGuess, guesses, handleKeyup, isCorrect, usedKeys } = useWordle();

  // Handle physical keyboard
  useEffect(() => {
    const handlePhysicalKey = (e: KeyboardEvent) => handleKeyup(e.key);
    window.addEventListener('keyup', handlePhysicalKey);
    return () => window.removeEventListener('keyup', handlePhysicalKey);
  }, [handleKeyup]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white text-black">
      <header className="w-full max-w-md flex justify-between items-center border-b pb-4 mb-8">
        <h1 className="text-4xl font-black tracking-tighter">WORDLE-R</h1>
        <button onClick={toggleSettings} className="p-2 text-2xl">⚙️</button>
      </header>

      <div className="flex-grow flex flex-col justify-center">
        <Board 
          guesses={guesses} 
          currentGuess={currentGuess} 
          turn={turn} 
          wordLength={wordLength} 
        />
      </div>

      {/* On-screen Keyboard */}
      <Keyboard usedKeys={usedKeys} onKey={handleKeyup} />

      <Settings />

      {/* Game Over Messages */}
      {(isCorrect || turn > 5) && (
        <div className="fixed top-24 bg-black text-white px-6 py-3 rounded-lg shadow-2xl animate-bounce">
          {isCorrect ? "Splendid!" : `Word was: ${solution}`}
        </div>
      )}
    </main>
  );
}