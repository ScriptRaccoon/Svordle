export function copyStringToClipboard(str) {
    var el = document.createElement("textarea");
    el.style.opacity = 0;
    el.value = str;
    el.setAttribute("readonly", "");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
}

export function sleep(time) {
    return new Promise((res) => setTimeout(res, time));
}

export function customUpperCase(key) {
    return key == "ß" ? "&#7838;" : key.toUpperCase();
}
