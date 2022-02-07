const words = {
    de: require("../words_de.js"),
    en: require("../words_en.js"),
};

const { decrypt } = require("../encryption.js");

const handler = async (event) => {
    try {
        const language = event.queryStringParameters.language;
        if (!["de", "en"].includes(language))
            throw "Invalid language";
        const word = event.queryStringParameters.word?.toLowerCase();
        if (!word) throw "No word provided";
        const code = event.queryStringParameters.code;
        if (!code) throw "No code provided";
        const correctWord = decrypt(code);
        console.log({ word, correctWord });
        const evaluation = { valid: false, letters: [] };
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
                            ? "present"
                            : "absent";
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
