// src/components/game/Keyboard.tsx
import { LetterStatus } from "../../lib/logic";

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
];

interface KeyboardProps {
  usedKeys: { [key: string]: LetterStatus };
  onKey: (key: string) => void;
}

export const Keyboard = ({ usedKeys, onKey }: KeyboardProps) => {
  return (
    <div className="mt-auto pb-8 w-full max-w-2xl px-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5 mb-2 touch-none">
          {row.map((key) => {
            const status = usedKeys[key.toUpperCase()];
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`
                  h-14 rounded font-bold uppercase flex items-center justify-center transition-colors
                  ${key.length > 1 ? 'px-4 text-xs' : 'flex-1 max-w-[44px] text-sm'}
                  ${status === 'correct' ? 'bg-green-500 text-white' : 
                    status === 'present' ? 'bg-yellow-500 text-white' :
                    status === 'absent' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-black'}
                `}
              >
                {key === 'Backspace' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};