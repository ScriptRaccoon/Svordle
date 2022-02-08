<script>
    import Home from "./views/Home.svelte";
    import Help from "./views/Help.svelte";
    import Game from "./views/Game.svelte";
    import { view } from "./stores.js";
    const views = [
        { name: "home", component: Home },
        { name: "help", component: Help },
        { name: "game", component: Game },
    ];
</script>

<main>
    {#each views as { name, component }}
        <section class:visible={$view == name} class="view">
            <svelte:component this={component} />
        </section>
    {/each}
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
