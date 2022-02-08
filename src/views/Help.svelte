<script>
    import { language, view } from "../stores.js";
    import Button from "../components/Button.svelte";
    import { texts } from "../language.js";
</script>

<div class="container">
    <h2 class="center">{texts.helpTitle[$language]}</h2>
    <p>{texts.help1[$language]}</p>
    <p>{texts.help2[$language]}</p>
    {#each texts.exampleWords[$language] as word, j}
        <div>
            <p class="center">
                {#each word.split("") as letter, i}
                    <span
                        class:correct={i == j && j == 0}
                        class:present={i == j && j == 1}
                        class:absent={i == j + 1 && j == 2}
                        >{letter}</span
                    >
                {/each}
            </p>
            <p>{texts[`help${j + 3}`][$language]}</p>
        </div>
    {/each}
    <p>{texts.help6[$language]}</p>
    <p class="center">
        <Button text="Start" action={() => ($view = "game")} />
    </p>
</div>

<style>
    .container {
        font-size: 18px;
        padding: 10px;
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

    p > span.present {
        background: var(--color-present);
        border: 1px solid transparent;
    }

    p > span.absent {
        background: var(--color-absent);
        border: 1px solid transparent;
    }

    div {
        margin: 30px 0px;
    }
</style>
