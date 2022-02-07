<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Button from "./components/Button.svelte";
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Popup from "./components/Popup.svelte";
    import { fade } from "svelte/transition";
    import { generateRandomWord, isValidWord } from "./words.js";
    import { copyStringToClipboard } from "./utils.js";
    import { texts } from "./language.js";
    import { allKeys } from "./keys.js";

    export let language = navigator.language.includes("de")
        ? "de"
        : "en";

    let screen = "home";

    const WORD_LENGTH = 5;
    const ATTEMPTS = 6;

    $: keys = allKeys[language];

    $: letters = keys.filter((key) => key.length == 1);

    let correctWord,
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

    function initializeValues() {
        correctWord = generateRandomWord(language);
        if (!isProduction) console.log(correctWord);
        playing = true;
        grid = new Array(ATTEMPTS)
            .fill("")
            .map((i) => new Array(WORD_LENGTH).fill(""));
        evaluation = new Array(ATTEMPTS)
            .fill(0)
            .map((i) => new Array(WORD_LENGTH).fill(null));
        row = 0;
        column = 0;
        letterEvaluation = Object.fromEntries(
            letters.map((letter) => [letter, null])
        );
        popup = false;
        popupText = "";
        won = false;
        confirm = false;
    }

    $: if (language) initializeValues();

    function handleKeyInput(e) {
        if (!playing) return;
        const key = e.detail;
        if (key != "Backspace") {
            grid[row][column] = key;
            if (column < WORD_LENGTH) column++;
        } else {
            if (column > 0) {
                column--;
                grid[row][column] = "";
            }
        }
    }

    function evaluateWord() {
        if (!isValidWord(grid[row].join(""), language)) {
            showPopup(texts.notValid[language]);
            return false;
        }
        for (let index = 0; index < WORD_LENGTH; index++) {
            const letter = grid[row][index];
            if (correctWord[index] == letter) {
                evaluation[row][index] = "correct";
                letterEvaluation[letter] = "correct";
            } else if (correctWord.includes(letter)) {
                evaluation[row][index] = "present";
                if (letterEvaluation[letter] != "correct")
                    letterEvaluation[letter] = "present";
            } else {
                evaluation[row][index] = "absent";
                letterEvaluation[letter] = "absent";
            }
        }
        if (evaluation[row].every((ev) => ev == "correct")) {
            won = true;
            showPopup(texts.won[language]);
            endGame();
        }
        return true;
    }

    function handleSubmit() {
        if (column != WORD_LENGTH || !playing) return;
        if (evaluateWord()) {
            if (playing && row < ATTEMPTS - 1) {
                column = 0;
                row++;
            } else {
                if (!won)
                    showPopup(
                        `
                        ${texts.correct[language]}<br>
                        ${correctWord}`,
                        5000
                    );
                endGame();
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
        result += `/${ATTEMPTS}\n\n`;
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j < WORD_LENGTH; j++) {
                switch (evaluation[i][j]) {
                    case "correct":
                        result += "🟩";
                        break;
                    case "present":
                        result += "🟨";
                        break;
                    case "absent":
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
                {WORD_LENGTH}
                {ATTEMPTS}
                {playing}
                {grid}
                {evaluation}
                currentRow={row}
            />
            <menu>
                {#if column == WORD_LENGTH && playing}
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
