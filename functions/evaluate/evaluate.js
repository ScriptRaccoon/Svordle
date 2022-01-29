const words = require("../wordlist.js");

const handler = async (event) => {
    try {
        const language = event.queryStringParameters.language;
        if (!["de", "en"].includes(language))
            throw "Invalid language";
        const word = event.queryStringParameters.word?.toLowerCase();
        console.log({ word });
        if (!word) throw "No word provided";
        const code = event.queryStringParameters.code;
        console.log({ code });
        if (!code) throw "No code provided";
        const index = parseInt(code, 16);
        console.log({ index });

        const actualIndex =
            (index + parseInt(process.env.SHIFT)) %
            words[language].length;

        console.log({ actualIndex });

        const evaluation = { valid: false, letters: [] };

        const correctWord = words[language][actualIndex];
        console.log({ correctWord });

        if (word == correctWord) {
            evaluation.valid = true;
            evaluation.letters = word.split("").map(() => "correct");
        } else {
            evaluation.valid = words[language].includes(word);
            if (evaluation.valid) {
                for (let i = 0; i < word.length; i++) {
                    const letter = word[i];
                    evaluation.letters[i] =
                        letter == correctWord[i]
                            ? "correct"
                            : correctWord.includes(letter)
                            ? "almost"
                            : "incorrect";
                }
            }
        }

        console.log({ evaluation });

        return {
            statusCode: 200,
            body: JSON.stringify({ evaluation }),
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
