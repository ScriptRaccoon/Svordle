const words = {
    de: require("../words_de.js"),
    en: require("../words_en.js"),
};

const { encrypt } = require("../encryption.js");
const { randomElement } = require("../utils.js");

const handler = async (event) => {
    try {
        const language = event.queryStringParameters.language;
        if (!["de", "en"].includes(language))
            throw "Invalid language";

        const correctWord = randomElement(words[language]);
        const code = encrypt(correctWord);
        console.log({ correctWord });
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
