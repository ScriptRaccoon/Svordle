import { readable, writable } from "svelte/store";

export const WORD_LENGTH = readable(5);
export const ATTEMPTS = readable(6);
export const FLIP_SPEED = readable(300);

export const language = writable("en");
