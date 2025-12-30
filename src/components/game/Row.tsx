// /src/components/game/Row.tsx
import { Tile } from './Tile';
import { LetterStatus } from '../../lib/logic';

interface RowProps {
  guess?: { key: string; color: LetterStatus }[];
  currentGuess?: string;
  wordLength: number;
}

export const Row = ({ guess, currentGuess, wordLength }: RowProps) => {
  // If this is a past guess
  if (guess) {
    return (
      <div className="flex gap-2 justify-center">
        {guess.map((l, i) => (
          <Tile key={i} letter={l.key} status={l.color} />
        ))}
      </div>
    );
  }

  // If this is the active row being typed into
  if (currentGuess !== undefined) {
    const letters = currentGuess.split('');
    const emptyTiles = Array(wordLength - letters.length).fill('');

    return (
      <div className="flex gap-2 justify-center">
        {letters.map((l, i) => (
          <Tile key={i} letter={l} />
        ))}
        {emptyTiles.map((_, i) => (
          <Tile key={i} />
        ))}
      </div>
    );
  }

  // If this is a future row
  const emptyRow = Array(wordLength).fill('');
  return (
    <div className="flex gap-2 justify-center">
      {emptyRow.map((_, i) => (
        <Tile key={i} />
      ))}
    </div>
  );
};