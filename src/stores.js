import { readable, writable, derived } from "svelte/store";

export const WORD_LENGTH = readable(5);
export const ATTEMPTS = readable(6);
export const FLIP_SPEED = readable(300);

export const language = writable("en");

const allKeys = {
    en: [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        "Backspace",
    ],
    de: [
        "q",
        "w",
        "e",
        "r",
        "t",
        "z",
        "u",
        "i",
        "o",
        "p",
        "ü",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "ö",
        "ä",
        "y",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        "ß",
        "Backspace",
    ],
};

export const keys = derived(
    language,
    ($language) => allKeys[$language]
);

export const letters = derived(keys, ($keys) =>
    $keys.filter((key) => key.length == 1)
);
