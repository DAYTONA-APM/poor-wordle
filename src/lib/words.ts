export const WORD_LISTS = {
    4: ["FIRE", "PLAN", "COLD", "GIVE", "BLUE", "STAY", "ROCK", "WIND"],
  5: ["APPLE", "BEACH", "BRAIN", "CLOUD", "GHOST", "LIGHT", "SPACE", "VOTER"],
  6: ["BRIGHT", "DREAMS", "GARDEN", "PLAYER", "STREAM", "THINGS", "YELLOW", "PLANTS"]
};

export type WordLength = 4 | 5 | 6;

export const getRandomWord = (length: WordLength): string => {
    const list = WORD_LISTS[length];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex].toUpperCase();
};

export const isValidWord = (word: string, length: WordLength): boolean => {
    return WORD_LISTS[length].includes(word.toUpperCase());
};