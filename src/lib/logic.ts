// /src/lib/logic.ts

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export const checkGuess = (guess: string, solution: string) => {
  const result: LetterStatus[] = Array(solution.length).fill('absent');
  const solutionArray = solution.split('');
  const guessArray = guess.split('');

  // First pass: Find Greens
  guessArray.forEach((letter, i) => {
    if (letter === solutionArray[i]) {
      result[i] = 'correct';
      solutionArray[i] = ''; // Remove from pool
    }
  });

  // Second pass: Find Yellows
  guessArray.forEach((letter, i) => {
    if (result[i] !== 'correct' && solutionArray.includes(letter)) {
      result[i] = 'present';
      solutionArray[solutionArray.indexOf(letter)] = ''; // Remove from pool
    }
  });

  return result;
};