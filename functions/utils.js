function randomElement(list) {
    return list[Math.floor(list.length * Math.random())];
}

module.exports = { randomElement };
