<script>
    import { fade } from "svelte/transition";
    export let screen = "help";
    import Button from "./Button.svelte";
    export let language = "en";
    import { texts } from "../language.js";
</script>

<section transition:fade={{ duration: 200 }}>
    <h2 class="center">{texts.helpTitle[language]}</h2>
    <p>{texts.help1[language]}</p>
    <p>{texts.help2[language]}</p>
    <div>
        <p class="center">
            <span class="correct">A</span><span>P</span><span>P</span
            ><span>L</span><span>E</span>
        </p>
        <p>{texts.help3[language]}</p>
    </div>

    <div>
        <p class="center">
            <span>D</span><span class="almost">R</span><span>U</span
            ><span>M</span><span>S</span>
        </p>
        <p>{texts.help4[language]}</p>
    </div>
    <div>
        <p class="center">
            <span>C</span><span>H</span><span>A</span><span
                class="incorrect">O</span
            ><span>S</span>
        </p>
        <p>{texts.help5[language]}</p>
    </div>
    <p>{texts.help6[language]}</p>
    <p class="center">
        <Button text="Start" action={() => (screen = "game")} />
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
