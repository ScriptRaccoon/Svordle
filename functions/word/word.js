const words = require("../wordlist.js");
const { encrypt } = require("../encryption.js");
const { randomElement } = require("../utils.js");

const handler = async (event) => {
    try {
        const language = event.queryStringParameters.language;
        if (!["de", "en"].includes(language))
            throw "Invalid language";
        const correctWord = randomElement(words[language]);
        console.log({ correctWord });
        const code = encrypt(correctWord);
        return {
            statusCode: 200,
            body: JSON.stringify({ code }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
