export const allKeys = {
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

export function customUpperCase(key) {
    return key == "ß" ? "&#7838;" : key.toUpperCase();
}
