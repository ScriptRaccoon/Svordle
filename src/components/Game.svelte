<script>
    import { fade } from "svelte/transition";
    import Header from "./Header.svelte";
    import Grid from "./Grid.svelte";
    import Button from "./Button.svelte";
    import Keyboard from "./Keyboard.svelte";
    import Popup from "./Popup.svelte";
    import { texts } from "../language.js";
    import { getEvaluation } from "../api.js";
    import { sleep } from "../utils.js";
    import {
        WORD_LENGTH,
        language,
        ATTEMPTS,
        FLIP_DELAY,
        FLIP_SPEED,
    } from "../stores.js";

    export let screen;
    export let grid;
    export let code;
    export let won;
    export let confirm;
    export let playing;
    export let evaluation;
    export let evaluationDone;
    export let letterEvaluation;
    export let row;
    export let column;
    export let popup;
    export let popupText;

    async function handleSubmit() {
        if (column != $WORD_LENGTH || !playing) return;
        const word = grid[row].join("");
        const ev = await getEvaluation($language, word, code);
        if (!ev.valid) {
            showPopup(texts.notValid[$language]);
        } else {
            evaluationDone[row] = true;
            evaluation[row] = ev.letters;
            updateLetterEvaluation();
            await sleep(
                $FLIP_SPEED + ($WORD_LENGTH - 1) * $FLIP_DELAY
            );
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

    async function shareResult() {
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
        result += "\n" + `https://wordle-svelte.netlify.app`;
        await navigator.clipboard.writeText(result);
        showPopup(texts.clipboard[$language]);
    }

    function handleRestart() {
        if (!playing || confirm) {
            window.alert("Need to change that code here");
            // initializeValues();
        } else {
            confirm = true;
            setTimeout(() => {
                confirm = false;
            }, 5000);
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

    function updateLetterEvaluation() {
        for (let index = 0; index < $WORD_LENGTH; index++) {
            const letter = grid[row][index];
            if (letterEvaluation[letter] == "correct") continue;
            letterEvaluation[letter] = evaluation[row][index];
        }
    }
</script>

<section transition:fade={{ duration: 200 }}>
    <Header bind:screen />
    {#if grid.length == $ATTEMPTS}
        <Grid
            {playing}
            {grid}
            {evaluation}
            {evaluationDone}
            currentRow={row}
        />
    {/if}
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

{#if popup}
    <Popup bind:popup {popupText} />
{/if}

<style>
    menu {
        text-align: center;
        padding: 15px 0px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
</style>
