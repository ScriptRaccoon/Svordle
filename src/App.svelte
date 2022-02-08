<script>
    import Home from "./components/Home.svelte";
    import Help from "./components/Help.svelte";
    import Game from "./components/Game.svelte";
    import { language } from "./stores.js";
    language.set(navigator.language.includes("de") ? "de" : "en");

    let screen = "home";
</script>

<main>
    {#if screen == "home"}
        <Home bind:screen />
    {:else if screen == "help"}
        <Help bind:screen />
    {:else if screen == "game"}
        <Game bind:screen />
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
