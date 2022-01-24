<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Button from "./components/Button.svelte";
    import { generateRandomWord, isValidWord } from "./words.js";
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Popup from "./components/Popup.svelte";
    import { copyStringToClipboard } from "./utils.js";

    let screen = "home";

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
        letterEvaluation,
        popup,
        popupText,
        won;

    function initializeValues() {
        correctWord = generateRandomWord();
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
        popup = false;
        popupText = "";
        won = false;
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
        if (!isValidWord(grid[row].join(""))) {
            showPopup("No valid word");
            return false;
        }
        for (let index = 0; index < 5; index++) {
            const letter = grid[row][index];
            if (correctWord[index] == letter) {
                evaluation[row][index] = "correct";
                letterEvaluation[letter] = "correct";
            } else if (correctWord.includes(letter)) {
                evaluation[row][index] = "almost";
                if (letterEvaluation[letter] != "correct")
                    letterEvaluation[letter] = "almost";
            } else {
                evaluation[row][index] = "incorrect";
                letterEvaluation[letter] = "incorrect";
            }
        }
        if (evaluation[row].every((ev) => ev == "correct")) {
            won = true;
            showPopup("You won! 🎉");
            endGame();
        }
        return true;
    }

    function handleSubmit() {
        if (column != 5) return;
        if (evaluateWord()) {
            if (playing && row < 5) {
                column = 0;
                row++;
            } else {
                if (!won) showPopup("Gameover");
                endGame();
            }
        }
    }

    function endGame() {
        playing = false;
    }

    function showPopup(text) {
        popupText = text;
        popup = true;
    }

    function shareResult() {
        let result = "Wordle ";
        result += won ? (row + 1).toString() : "X";
        result += "/6\n\n";
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j < 5; j++) {
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
        showPopup("Copied result to clipboard");
    }

    function handleRestart() {
        if (
            !playing ||
            window.confirm(
                "Are you sure that you want to restart the game?"
            )
        )
            initializeValues();
    }
</script>

<main>
    {#if screen == "home"}
        <Home bind:screen />
    {:else if screen == "help"}
        <Help bind:screen />
    {:else if screen == "game"}
        <Header bind:screen />
        <Grid {playing} {grid} {evaluation} currentRow={row} />
        <menu>
            {#if column == 5 && playing}
                <Button text="Submit" action={handleSubmit} />
            {/if}
            <Button text="Restart" action={handleRestart} />
            {#if !playing}
                <Button text="Share" action={shareResult} />
            {/if}
        </menu>
        <Keyboard {letterEvaluation} {keys} on:key={handleKeyInput} />
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
    }
    menu {
        text-align: center;
        padding: 15px 0px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
</style>
