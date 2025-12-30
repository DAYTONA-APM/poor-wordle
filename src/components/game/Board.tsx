// /src/components/game/Board.tsx
import { Row } from './Row';
import { LetterStatus } from '../../lib/logic';

interface BoardProps {
  guesses: { key: string; color: LetterStatus }[][];
  currentGuess: string;
  turn: number;
  wordLength: number;
}

export const Board = ({ guesses, currentGuess, turn, wordLength }: BoardProps) => {
  return (
    <div className="flex flex-col gap-2 my-8">
      {[...Array(6)].map((_, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} wordLength={wordLength} />;
        }
        return <Row key={i} guess={guesses[i]} wordLength={wordLength} />;
      })}
    </div>
  );
};