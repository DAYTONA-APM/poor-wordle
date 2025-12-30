export const WORD_LISTS = {
    4: ["FIRE", "STOP", "LIST", "PUSH"],
    5: ["APPLE", "BEACH", "BRAIN", "CLOUDS", "GHOST", "LIGHT"],
    6: ["BRIGHT", "DREAMS", "GARDEN", "PLAYER", "STREAM", "THINGS"]
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