<script>
    export let screen = "help";
    import Button from "./Button.svelte";
</script>

<div class="help">
    <h2>Help</h2>
    <p>Guess the correct word with 6 (or less) tries.</p>
    <p>
        After each try the letter tiles change their color to show you
        how close your guess was to the correct word.
    </p>
    <div>
        <p>
            <span class="correct">A</span><span>P</span><span>P</span
            ><span>L</span><span>E</span>
        </p>
        <p>
            The letter A is contained in the word and at the correct
            position.
        </p>
    </div>

    <div>
        <p>
            <span>D</span><span class="almost">R</span><span>U</span
            ><span>M</span><span>S</span>
        </p>
        <p>
            The letter R is contained in the word, but not at the
            correct position.
        </p>
    </div>
    <div>
        <p>
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
        <Button
            text="Play"
            active={true}
            action={() => (screen = "game")}
        />
    </p>
</div>

<style>
    .help {
        max-width: 500px;
        font-size: 20px;
        padding-bottom: 10px;
    }
    h2 {
        text-align: center;
        padding: 15px 0px;
    }
    p {
        margin: 10px 0px;
    }
    .center {
        text-align: center;
    }
    p > span {
        border: 1px solid #444;
        margin: 5px;
        padding: 10px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 3px;
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
        padding: 5px 0px;
    }
</style>
