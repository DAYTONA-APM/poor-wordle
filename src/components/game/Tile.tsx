// /src/components/game/Tile.tsx
import { LetterStatus } from "../../lib/logic";

interface TileProps {
  letter?: string;
  status?: LetterStatus;
}

export const Tile = ({ letter, status }: TileProps) => {
  // Map our logic statuses to Tailwind colors
  const statusColors = {
    correct: 'bg-green-500 border-green-600 text-white',
    present: 'bg-yellow-500 border-yellow-600 text-white',
    absent: 'bg-gray-500 border-gray-600 text-white',
    empty: 'bg-white border-gray-300 text-black',
  };

  return (
    <div className={`
      w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center 
      text-2xl font-bold uppercase transition-all duration-500
      ${status ? statusColors[status] : statusColors.empty}
    `}>
      {letter}
    </div>
  );
};