import { useGameSettings } from "../../hooks/useGameSettings";

export const Settings = () => {
  const { wordLength, setWordLength, isSettingsOpen, toggleSettings } = useGameSettings();

  if (!isSettingsOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-black w-80">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className="mb-2 font-medium">Word Length</p>
        <div className="flex gap-4 mb-6">
          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setWordLength(num as any)}
              className={`px-4 py-2 rounded border-2 ${
                wordLength === num ? 'bg-green-500 text-white border-green-600' : 'border-gray-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <button 
          onClick={toggleSettings}
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          Close & New Game
        </button>
      </div>
    </div>
  );
};