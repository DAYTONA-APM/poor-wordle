// /src/components/ui/LandingPage.tsx
import { useGameSettings } from "../../hooks/useGameSettings";

export const LandingPage = () => {
  const { setGameMode, setWordLength, wordLength } = useGameSettings();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl font-bold mb-8">Choose Your Challenge</h2>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button 
          onClick={() => setGameMode('classic')}
          className="bg-black text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
        >
          Classic Mode
        </button>
        
        <button 
          onClick={() => setGameMode('timed')}
          className="bg-orange-500 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform border-b-4 border-orange-700 active:border-b-0"
        >
          Timed Mode (60s)
        </button>
      </div>

      <div className="mt-12">
        <p className="text-gray-500 mb-2">Word Length</p>
        <div className="flex gap-2">
          {[4, 5, 6].map(len => (
            <button 
              key={len} 
              onClick={() => setWordLength(len as any)}
              className={`w-12 h-12 rounded-full border-2 ${wordLength === len ? 'bg-black text-white' : 'border-gray-300'}`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};