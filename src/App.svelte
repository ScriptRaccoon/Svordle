<script>
    import Home from "./views/Home.svelte";
    import Help from "./views/Help.svelte";
    import Game from "./views/Game.svelte";
    import { screen } from "./stores.js";
</script>

<main>
    <section class:visible={$screen == "home"} class="view">
        <Home />
    </section>
    <section class:visible={$screen == "game"} class="view">
        <Game />
    </section>
    <section class:visible={$screen == "help"} class="view">
        <Help />
    </section>
</main>

<style>
    main {
        max-width: 500px;
        margin: 0 auto;
        padding: 10px;
        min-height: 100vh;
        position: relative;
    }
    .view {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 200ms linear;
    }
    .view.visible {
        opacity: 1;
        pointer-events: initial;
    }
</style>
