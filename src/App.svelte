<script>
    import Header from "./components/Header.svelte";
    import Grid from "./components/Grid.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import Submit from "./components/Submit.svelte";
    import { onMount } from "svelte";
    import { generateRandomWord } from "./words.js";

    let correctWord;

    onMount(() => {
        correctWord = generateRandomWord();
        console.log(correctWord);
    });

    let playing = true;

    let grid = new Array(5)
        .fill("")
        .map((i) => new Array(5).fill(""));
    let evaluation = new Array(5)
        .fill(0)
        .map((i) => new Array(5).fill(null));

    let row = 0;
    let column = 0;

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
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (column != 5) return;
        evaluateWord();
        if (row < 4) {
            setTimeout(() => {
                column = 0;
                row++;
            }, 500);
        } else {
            playing = false;
        }
    }
</script>

<main>
    <Header />
    <Grid {grid} {evaluation} />
    <form on:submit={handleSubmit}>
        <Submit active={column == 5 && playing} />
    </form>
    <Keyboard on:key={handleKeyInput} />
</main>

<style>
    main {
        max-width: 700px;
        margin: 0 auto;
    }
    form {
        text-align: center;
        padding: 15px 0px;
    }
</style>
