import { readable, writable, derived } from "svelte/store";

export const WORD_LENGTH = readable(5);
export const ATTEMPTS = readable(6);
export const FLIP_SPEED = readable(300);
export const FLIP_DELAY = readable(80);

export const view = writable("home");

export const language = writable(
    navigator.language.includes("de") ? "de" : "en"
);

const allKeys = {
    en: "qwertyuiopasdfghjklzxcvbnm".split("").concat("Backspace"),
    de: "qwertzuiopüasdfghjklöäyxcvbnmß"
        .split("")
        .concat("Backspace"),
};

export const keys = derived(
    language,
    ($language) => allKeys[$language]
);

export const letters = derived(keys, ($keys) =>
    $keys.filter((key) => key.length == 1)
);
