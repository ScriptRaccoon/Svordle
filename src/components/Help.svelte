<script>
    import { fade } from "svelte/transition";
    export let screen = "help";
    import Button from "./Button.svelte";
</script>

<section transition:fade={{ duration: 200 }}>
    <h2 class="center">Help</h2>
    <p>Guess the correct word with 6 (or less) tries.</p>
    <p>
        After each try the letter tiles change their color to show you
        how close your guess was to the correct word.
    </p>
    <div>
        <p class="center">
            <span class="correct">A</span><span>P</span><span>P</span
            ><span>L</span><span>E</span>
        </p>
        <p>
            The letter A is contained in the word and at the correct
            position.
        </p>
    </div>

    <div>
        <p class="center">
            <span>D</span><span class="almost">R</span><span>U</span
            ><span>M</span><span>S</span>
        </p>
        <p>
            The letter R is contained in the word, but not at the
            correct position.
        </p>
    </div>
    <div>
        <p class="center">
            <span>C</span><span>H</span><span>A</span><span
                class="incorrect">O</span
            ><span>S</span>
        </p>
        <p>The letter O does not appear in the word at all.</p>
    </div>
    <p>
        You can restart the game at any time. This also generates a
        new word for you.
    </p>
    <p class="center">
        <Button text="Play" action={() => (screen = "game")} />
    </p>
</section>

<style>
    section {
        position: absolute;
        inset: 0;
        font-size: 18px;
        padding: 10px;
        z-index: 5;
    }
    h2 {
        padding: 15px 0px;
    }
    p {
        margin: 10px 0px;
    }

    p > span {
        border: 1px solid var(--color-key-dark);
        margin-right: 5px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 3px;
        font-size: 20px;
    }

    p > span.correct {
        background: var(--color-correct);
        border: 1px solid transparent;
    }

    p > span.almost {
        background: var(--color-almost);
        border: 1px solid transparent;
    }

    p > span.incorrect {
        background: var(--color-incorrect);
        border: 1px solid transparent;
    }

    div {
        margin: 30px 0px;
    }
</style>
