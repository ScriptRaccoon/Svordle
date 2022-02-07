const crypto = require("crypto");

const algorithm = "aes-192-cbc";
const password = process.env.PASSWORD;
const salt = process.env.SALT;

const key = crypto.scryptSync(password, salt, 24);

function encrypt(text) {
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(text) {
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = cipher.update(text, "hex", "utf8");
    decrypted += cipher.final("utf8");
    return decrypted;
}

module.exports = { encrypt, decrypt };
