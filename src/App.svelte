<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Button from "./components/Button.svelte";
    import { generateRandomWord } from "./words.js";
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Popup from "./components/Popup.svelte";

    let screen = "home";
    let popup = false;
    let popupText = "";

    const keys = [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
        "Backspace",
    ];

    const letters = keys.filter((key) => key.length == 1);

    let correctWord,
        playing,
        grid,
        evaluation,
        row,
        column,
        letterEvaluation;

    function initializeValues() {
        correctWord = generateRandomWord();
        console.log(correctWord);
        playing = true;
        grid = new Array(6)
            .fill("")
            .map((i) => new Array(5).fill(""));
        evaluation = new Array(6)
            .fill(0)
            .map((i) => new Array(5).fill(null));
        row = 0;
        column = 0;
        letterEvaluation = Object.fromEntries(
            letters.map((letter) => [letter, null])
        );
    }

    initializeValues();

    function handleKeyInput(e) {
        if (!playing) return;
        const key = e.detail;
        if (key != "Backspace") {
            grid[row][column] = key;
            if (column < 5) column++;
        } else {
            if (column > 0) {
                column--;
                grid[row][column] = "";
            }
        }
    }

    function evaluateWord() {
        for (let index = 0; index < 5; index++) {
            const letter = grid[row][index];
            evaluation[row][index] =
                correctWord[index] == letter
                    ? "correct"
                    : correctWord.includes(letter)
                    ? "almost"
                    : "incorrect";
            if (!letterEvaluation[letter])
                letterEvaluation[letter] = evaluation[row][index];
        }
        if (evaluation[row].every((ev) => ev == "correct")) {
            showPopup("Correct!");
            playing = false;
            row = null;
        }
    }

    function handleSubmit() {
        if (column != 5) return;
        evaluateWord();
        if (playing && row < 5) {
            column = 0;
            row++;
        } else {
            playing = false;
        }
    }

    function showPopup(text) {
        popupText = text;
        popup = true;
    }
</script>

<main>
    {#if screen == "home"}
        <Home bind:screen />
    {:else if screen == "help"}
        <Help bind:screen />
    {:else if screen == "game"}
        <Header bind:screen />
        <Grid {grid} {evaluation} currentRow={row} />
        <menu>
            <Button
                text="Submit"
                action={handleSubmit}
                active={column == 5 && playing}
            />
            <Button
                text="Restart"
                action={initializeValues}
                active={true}
            />
        </menu>
        <Keyboard {letterEvaluation} {keys} on:key={handleKeyInput} />
    {/if}
    {#if popup}
        <Popup bind:popup {popupText} />
    {/if}
</main>

<style>
    main {
        padding: 0px 10px;
    }
    menu {
        text-align: center;
        padding: 15px 0px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
</style>
