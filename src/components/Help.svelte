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
    {#each texts.exampleWords[language] as word, j}
        <div>
            <p class="center">
                {#each word.split("") as letter, i}
                    <span
                        class:correct={i == j && j == 0}
                        class:almost={i == j && j == 1}
                        class:incorrect={i == j + 1 && j == 2}
                        >{letter}</span
                    >
                {/each}
            </p>
            <p>{texts[`help${j + 3}`][language]}</p>
        </div>
    {/each}
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
