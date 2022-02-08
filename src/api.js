export async function getEvaluation(language, word, code) {
    try {
        const res = await fetch(
            `/api/evaluate?language=${language}&word=${word}&code=${code}`
        );
        if (!res.ok) throw `Could not evaluate ${word}`;
        const { evaluation: ev } = await res.json();
        return ev;
    } catch (error) {
        console.log(error);
        window.alert(`Could not evaluate ${word}`);
    }
}

export async function getCode(language) {
    try {
        const res = await fetch(`/api/word?language=${language}`);
        if (!res.ok) throw "Word could not be loaded";
        const { code } = await res.json();
        return code;
    } catch (error) {
        console.log(error);
        window.alert("Word could not be loaded");
    }
}
