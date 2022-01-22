<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Button from "./components/Button.svelte";
    import { generateRandomWord } from "./words.js";

    let correctWord, playing, grid, evaluation, row, column;

    function initializeValues() {
        correctWord = generateRandomWord();
        console.log(correctWord);
        playing = true;
        grid = new Array(5)
            .fill("")
            .map((i) => new Array(5).fill(""));
        evaluation = new Array(5)
            .fill(0)
            .map((i) => new Array(5).fill(null));
        row = 0;
        column = 0;
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
        }
        if (evaluation[row].every((ev) => ev == "correct")) {
            playing = false;
            row = null;
        }
    }

    function handleSubmit() {
        if (column != 5) return;
        evaluateWord();
        if (playing && row < 4) {
            column = 0;
            row++;
        } else {
            playing = false;
        }
    }
</script>

<main>
    <Header />
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
    <Keyboard on:key={handleKeyInput} />
</main>

<style>
    main {
        max-width: 700px;
        margin: 0 auto;
    }
    menu {
        text-align: center;
        padding: 15px 0px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
</style>
