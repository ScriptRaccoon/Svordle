export function sleep(time) {
    return new Promise((res) => setTimeout(res, time));
}

export function customUpperCase(key) {
    return key == "ß" ? "&#7838;" : key.toUpperCase();
}
