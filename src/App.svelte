<script>
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Game from "./components/Game.svelte";

    import {
        WORD_LENGTH,
        language,
        ATTEMPTS,
        letters,
    } from "./stores.js";

    import { getCode } from "./api.js";

    language.set(navigator.language.includes("de") ? "de" : "en");

    let screen = "home";

    let code,
        playing,
        grid,
        evaluation,
        evaluationDone,
        row,
        column,
        letterEvaluation,
        popup,
        popupText,
        won,
        confirm;

    async function initializeValues() {
        code = await getCode($language);
        playing = true;
        grid = new Array($ATTEMPTS)
            .fill("")
            .map(() => new Array($WORD_LENGTH).fill(""));
        evaluation = new Array($ATTEMPTS)
            .fill(0)
            .map(() => new Array($WORD_LENGTH).fill(null));
        evaluationDone = new Array($WORD_LENGTH).fill(false);
        row = 0;
        column = 0;
        letterEvaluation = Object.fromEntries(
            $letters.map((letter) => [letter, null])
        );
        popup = false;
        popupText = "";
        won = null;
        confirm = false;
    }

    $: if ($language) initializeValues();
</script>

<main>
    {#if screen == "home"}
        <Home bind:screen />
    {:else if screen == "help"}
        <Help bind:screen />
    {:else if screen == "game" && code}
        <Game
            bind:screen
            bind:grid
            bind:code
            bind:won
            bind:confirm
            bind:playing
            bind:evaluation
            bind:evaluationDone
            bind:letterEvaluation
            bind:row
            bind:column
            bind:popup
            bind:popupText
        />
    {/if}
</main>

<style>
    main {
        max-width: 500px;
        margin: 0 auto;
        padding: 10px;
        position: relative;
    }
</style>
