const words = require("../wordlist.js");

const handler = async (event) => {
    console.log(process.env.SHIFT);
    try {
        const language = event.queryStringParameters.language;
        if (!["de", "en"].includes(language))
            throw "Invalid language";

        const index = Math.floor(
            Math.random() * words[language].length
        );
        console.log({ index });

        const code = index.toString(16);

        console.log({ code });

        const actualIndex =
            (index + parseInt(process.env.SHIFT)) %
            words[language].length;

        console.log({ actualIndex });

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
