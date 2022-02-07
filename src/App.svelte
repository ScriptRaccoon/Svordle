<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Button from "./components/Button.svelte";
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Popup from "./components/Popup.svelte";
    import { fade } from "svelte/transition";
    import { copyStringToClipboard, sleep } from "./utils.js";
    import { texts } from "./language.js";

    import {
        WORD_LENGTH,
        ATTEMPTS,
        FLIP_SPEED,
        language,
        letters,
    } from "./stores.js";

    language.set(navigator.language.includes("de") ? "de" : "en");

    let screen = "home";

    let code,
        playing,
        grid,
        evaluation,
        evaluationDone,
        row,
        column,
        letterEvaluation,
        popup,
        popupText,
        won,
        confirm;

    async function generateCode() {
        try {
            const res = await fetch(
                `/api/word?language=${$language}`
            );
            if (!res.ok) throw "Word could not be loaded";
            const { code } = await res.json();
            return code;
        } catch (error) {
            console.log(error);
            window.alert("Word could not be loaded");
        }
    }

    async function initializeValues() {
        code = await generateCode();
        playing = true;
        grid = new Array($ATTEMPTS)
            .fill("")
            .map(() => new Array($WORD_LENGTH).fill(""));
        evaluation = new Array($ATTEMPTS)
            .fill(0)
            .map(() => new Array($WORD_LENGTH).fill(null));
        evaluationDone = new Array($WORD_LENGTH).fill(false);
        row = 0;
        column = 0;
        letterEvaluation = Object.fromEntries(
            $letters.map((letter) => [letter, null])
        );
        popup = false;
        popupText = "";
        won = null;
        confirm = false;
    }

    $: if ($language) initializeValues();

    function handleKeyInput(e) {
        if (!playing) return;
        const key = e.detail;
        if (key != "Backspace") {
            grid[row][column] = key;
            if (column < $WORD_LENGTH) column++;
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
                `/api/evaluate?language=${$language}&word=${word}&code=${code}`
            );
            if (!res.ok) throw `Could not evaluate ${word}`;
            const { evaluation: ev } = await res.json();
            return ev;
        } catch (error) {
            console.log(error);
            window.alert(`Could not evaluate ${word}`);
        }
    }

    async function handleSubmit() {
        if (column != $WORD_LENGTH || !playing) return;
        const ev = await getEvaluation();
        if (!ev.valid) {
            showPopup(texts.notValid[$language]);
        } else {
            evaluationDone[row] = true;
            await sleep($FLIP_SPEED / 2);
            evaluation[row] = ev.letters;
            await sleep($FLIP_SPEED / 2);
            updateLetterEvaluation();
            if (evaluation[row].every((x) => x == "correct")) {
                won = true;
                showPopup(texts.won[$language]);
                endGame();
            } else {
                if (row < $ATTEMPTS - 1) {
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
        for (let index = 0; index < $WORD_LENGTH; index++) {
            const letter = grid[row][index];
            if (evaluation[row][index] == "correct") {
                letterEvaluation[letter] = "correct";
            } else if (
                evaluation[row][index] == "present" &&
                letterEvaluation[letter] != "correct"
            ) {
                letterEvaluation[letter] = "present";
            } else {
                letterEvaluation[letter] = "absent";
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
        const languageSymbol = $language == "de" ? "🇩🇪" : "🇬🇧";
        let result = `Wordle ${languageSymbol} `;
        result += won ? (row + 1).toString() : "X";
        result += `/${$ATTEMPTS}\n\n`;
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j < $WORD_LENGTH; j++) {
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
        showPopup(texts.clipboard[$language]);
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
        <Home bind:screen />
    {:else if screen == "help"}
        <Help bind:screen />
    {:else if screen == "game"}
        <section transition:fade={{ duration: 200 }}>
            <Header bind:screen />
            <Grid
                {playing}
                {grid}
                {evaluation}
                {evaluationDone}
                currentRow={row}
            />
            <menu>
                {#if column == $WORD_LENGTH && playing}
                    <Button
                        text={texts.submit[$language]}
                        action={handleSubmit}
                    />
                {/if}
                <Button
                    text={confirm
                        ? texts.confirm[$language]
                        : texts.restart[$language]}
                    action={handleRestart}
                />
                {#if !playing}
                    <Button
                        text={texts.share[$language]}
                        action={shareResult}
                    />
                {/if}
            </menu>
            <Keyboard {letterEvaluation} on:key={handleKeyInput} />
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
