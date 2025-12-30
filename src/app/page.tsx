"use client";
import { useEffect, useState } from 'react';
import { useGameSettings } from '../hooks/useGameSettings';
import { useWordle } from '../hooks/useWordle';
import { Board } from '../components/game/Board';
import { Settings } from '../components/ui/Settings';
import { Keyboard } from '../components/game/Keyboard';
import { LandingPage } from '../components/ui/LandingPage';
import { Timer } from '../components/game/Timer';

export default function Home() {
  const { gameMode, setGameMode, wordLength, solution, toggleSettings } = useGameSettings();
  const { turn, currentGuess, guesses, handleKeyup, isCorrect, usedKeys, resetGameLogic } = useWordle();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Listen for physical keyboard input
  useEffect(() => {
    const handlePhysicalKey = (e: KeyboardEvent) => {
      // Only process input if a game is actually active
      if (gameMode) {
        handleKeyup(e.key);
      }
    };

    window.addEventListener('keyup', handlePhysicalKey);
    return () => window.removeEventListener('keyup', handlePhysicalKey);
  }, [handleKeyup, gameMode]);

  // Handle returning to landing page
  const handleQuit = () => {
    if (confirm("Are you sure you want to quit? Your progress will be lost.")) {
      resetGameLogic(); // Clears the tiles and guesses
      setGameMode(null); // Goes back to landing page
    }
  };

  const confirmQuit = () => {
    resetGameLogic();
    setGameMode(null);
    setShowQuitConfirm(false);
  }

  // VIEW 1: Landing Page (No mode selected yet)
  if (!gameMode) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white text-black">
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-black tracking-tighter italic italic">NOT WORDLE !!</h1>
          <p className="text-gray-500 font-medium tracking-widest uppercase mt-2">v1.0 Edition</p>
        </header>
        <LandingPage />
      </main>
    );
  }

  // VIEW 2: Active Game (Classic or Timed)
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white text-black">
      {/* HUD / Top Bar */}
      <header className="w-full max-w-md flex justify-between items-center border-b pb-4 mb-4">
        <button 
          onClick={() => setShowQuitConfirm(true)}
          className="text-sm font-bold text-gray-400 hover:text-black transition-colors"
        >
          ← EXIT
        </button>
        
        <div className="text-center">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{gameMode} Mode</h2>
          <h1 className="text-2xl font-black tracking-tighter">NOT WORDLE!!</h1>
        </div>

        <button onClick={toggleSettings} className="p-2 text-xl hover:scale-110 transition-transform">⚙️</button>
      </header>

      {/* Mode Specific Logic (Timer) */}
      <div className="h-12 flex items-center justify-center">
        {gameMode === 'timed' && !isCorrect && turn < 6 && (
          <Timer onTimeUp={() => alert(`Time's up! The word was ${solution}`)} />
        )}
      </div>

      {/* Main Game Area */}
      <div className="flex-grow flex flex-col justify-center w-full max-w-sm">
        <Board 
          guesses={guesses} 
          currentGuess={currentGuess} 
          turn={turn} 
          wordLength={wordLength} 
        />
      </div>

      {/* Input Section */}
      <div className="w-full max-w-2xl">
        <Keyboard usedKeys={usedKeys} onKey={handleKeyup} />
      </div>

      {/* Settings Modal Overlay */}
      <Settings />

      {/* CUSTOM GUI QUIT MODAL */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-xs w-full border border-gray-100">
            <div className="bg-red-50 p-3 rounded-full mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">Quit Game?</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Your current progress in this {gameMode} session will be lost forever.
            </p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
              >
                Stay
              </button>
              <button 
                onClick={confirmQuit}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-200"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Overlays */}
      {(isCorrect || turn >= 6) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-xs w-full">
            <h2 className="text-3xl font-black mb-2">
              {isCorrect ? "GENIUS!" : "BUMMER..."}
            </h2>
            <p className="text-gray-600 mb-6">
              {isCorrect 
                ? `You found the word in ${turn} ${turn === 1 ? 'try' : 'tries'}!` 
                : `The word was ${solution}. Better luck next time!`}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}