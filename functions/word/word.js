const words = require("../wordlist.js");

const handler = async (event) => {
    try {
        const language = event.queryStringParameters.language;
        if (!["de", "en"].includes(language))
            throw "Invalid language";
        const index = Math.floor(
            Math.random() * words[language].length
        );
        const code = index.toString(16);
        const actualIndex =
            (index + parseInt(process.env.SHIFT)) %
            words[language].length;
        const correctWord = words[language][actualIndex];
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
