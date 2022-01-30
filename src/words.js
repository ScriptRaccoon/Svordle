import { words_de } from "./words_de.js";
import { words_en } from "./words_en.js";

const words = { en: words_en, de: words_de };

export function isValidWord(word, language) {
    return words[language].includes(word.toLowerCase());
}

export function generateRandomWord(language) {
    const index = Math.floor(Math.random() * words[language].length);
    return words[language][index].toUpperCase();
}
