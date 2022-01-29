<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Button from "./components/Button.svelte";
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Popup from "./components/Popup.svelte";
    import { fade } from "svelte/transition";
    import { copyStringToClipboard } from "./utils.js";
    import { texts } from "./language.js";
    import { allKeys } from "./keys.js";

    export let language = navigator.language.includes("de")
        ? "de"
        : "en";

    let screen = "home";

    const SIZE = { x: 5, y: 6 };

    $: keys = allKeys[language];

    $: letters = keys.filter((key) => key.length == 1);

    let correctWordIndex,
        playing,
        grid,
        evaluation,
        row,
        column,
        letterEvaluation,
        popup,
        popupText,
        won,
        confirm;

    async function generateRandomWordIndex() {
        try {
            const res = await fetch(`/api/word?language=${language}`);
            if (!res.ok) throw "Word could not be loaded";
            const { index } = await res.json();
            return index;
        } catch (error) {
            console.log(error);
            window.alert("Word could not be loaded");
        }
    }

    async function initializeValues() {
        correctWordIndex = await generateRandomWordIndex();
        playing = true;
        grid = new Array(SIZE.y)
            .fill("")
            .map(() => new Array(SIZE.x).fill(""));
        evaluation = new Array(SIZE.y)
            .fill(0)
            .map(() => new Array(SIZE.x).fill(null));
        row = 0;
        column = 0;
        letterEvaluation = Object.fromEntries(
            letters.map((letter) => [letter, null])
        );
        popup = false;
        popupText = "";
        won = null;
        confirm = false;
    }

    $: if (language) initializeValues();

    function handleKeyInput(e) {
        if (!playing) return;
        const key = e.detail;
        if (key != "Backspace") {
            grid[row][column] = key;
            if (column < SIZE.x) column++;
        } else {
            if (column > 0) {
                column--;
                grid[row][column] = "";
            }
        }
    }

    async function getEvaluation() {
        const word = grid[row].join("");
        try {
            const res = await fetch(
                `/api/word?language=${language}&word=${word}&index=${correctWordIndex}`
            );
            if (!res.ok) throw `Could not evaluate ${word}`;
            const { evaluation: ev } = await res.json();
            return ev;
        } catch (error) {
            console.log(error);
            window.alert(`Could not evaluate ${word}`);
        }
    }

    // async function evaluateWord() {
    //     const word = grid[row].join("");

    //     const isValid = await isValidWord(word);
    //     if (!isValid) {
    //         showPopup(texts.notValid[language]);
    //         return false;
    //     }
    //     for (let index = 0; index < SIZE.x; index++) {
    //         const letter = grid[row][index];
    //         if (correctWord[index] == letter) {
    //             evaluation[row][index] = "correct";
    //             letterEvaluation[letter] = "correct";
    //         } else if (correctWord.includes(letter)) {
    //             evaluation[row][index] = "almost";
    //             if (letterEvaluation[letter] != "correct")
    //                 letterEvaluation[letter] = "almost";
    //         } else {
    //             evaluation[row][index] = "incorrect";
    //             letterEvaluation[letter] = "incorrect";
    //         }
    //     }
    //     if (evaluation[row].every((ev) => ev == "correct")) {
    //         won = true;
    //         showPopup(texts.won[language]);
    //         endGame();
    //     }
    //     return true;
    // }

    async function handleSubmit() {
        if (column != SIZE.x || !playing) return;
        const ev = await getEvaluation();
        if (!ev.valid) {
            showPopup(texts.notValid[language]);
        } else {
            evaluation[row] = ev.letters;
            updateLetterEvaluation();
            if (evaluation[row].every((x) => x == "correct")) {
                won = true;
                showPopup(texts.won[language]);
                endGame();
            } else {
                if (row < SIZE.y - 1) {
                    column = 0;
                    row++;
                } else {
                    won = false;
                    showPopup("Gameover");
                    endGame();
                }
            }
        }
    }

    function updateLetterEvaluation() {
        for (let index = 0; index < SIZE.x; index++) {
            const letter = grid[row][index];
            if (evaluation[row][index] == "correct") {
                letterEvaluation[letter] = "correct";
            } else if (
                evaluation[row][index] == "almost" &&
                letterEvaluation[letter] != "correct"
            ) {
                letterEvaluation[letter] = "almost";
            } else {
                letterEvaluation[letter] = "incorrect";
            }
        }
    }

    function endGame() {
        playing = false;
    }

    function showPopup(text, duration = 1500) {
        popupText = text;
        popup = true;
        setTimeout(() => {
            popup = false;
        }, duration);
    }

    function shareResult() {
        const languageSymbol = language == "de" ? "🇩🇪" : "🇬🇧";
        let result = `Wordle ${languageSymbol} `;
        result += won ? (row + 1).toString() : "X";
        result += `/${SIZE.y}\n\n`;
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j < SIZE.x; j++) {
                switch (evaluation[i][j]) {
                    case "correct":
                        result += "🟩";
                        break;
                    case "almost":
                        result += "🟨";
                        break;
                    case "incorrect":
                        result += "⬛";
                        break;
                }
            }
            result += "\n";
        }
        copyStringToClipboard(result);
        showPopup(texts.clipboard[language]);
    }

    function handleRestart() {
        if (!playing || confirm) {
            initializeValues();
        } else {
            confirm = true;
            setTimeout(() => {
                confirm = false;
            }, 5000);
        }
    }
</script>

<main>
    {#if screen == "home"}
        <Home bind:language bind:screen />
    {:else if screen == "help"}
        <Help {language} bind:screen />
    {:else if screen == "game"}
        <section transition:fade={{ duration: 200 }}>
            <Header bind:screen />
            <Grid
                {SIZE}
                {playing}
                {grid}
                {evaluation}
                currentRow={row}
            />
            <menu>
                {#if column == SIZE.x && playing}
                    <Button
                        text={texts.submit[language]}
                        action={handleSubmit}
                    />
                {/if}
                <Button
                    text={confirm
                        ? texts.confirm[language]
                        : texts.restart[language]}
                    action={handleRestart}
                />
                {#if !playing}
                    <Button
                        text={texts.share[language]}
                        action={shareResult}
                    />
                {/if}
            </menu>
            <Keyboard
                {language}
                {letterEvaluation}
                {keys}
                on:key={handleKeyInput}
            />
        </section>
    {/if}
    {#if popup}
        <Popup bind:popup {popupText} />
    {/if}
</main>

<style>
    main {
        max-width: 500px;
        margin: 0 auto;
        padding: 10px;
        position: relative;
    }
    menu {
        text-align: center;
        padding: 15px 0px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
</style>
