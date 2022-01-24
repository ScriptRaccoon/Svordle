<script>
    import { fade } from "svelte/transition";
    export let screen = "home";
    import Button from "./Button.svelte";
    export let language = "en";
</script>

<section transition:fade={{ duration: 200 }}>
    <h1>Wordle</h1>
    <p>The classical word game</p>

    <menu>
        <button
            title="English"
            class:active={language == "en"}
            on:click={() => (language = "en")}>🇬🇧</button
        >
        <button
            title="Deutsch"
            class:active={language == "de"}
            on:click={() => (language = "de")}>🇩🇪</button
        >
    </menu>
    <p>
        <Button text="Start" action={() => (screen = "game")} />
    </p>
</section>

<style>
    section {
        position: absolute;
        inset: 0;
        padding-top: 100px;
        text-align: center;
        z-index: 5;
    }
    h1 {
        font-size: 45px;
        text-transform: uppercase;
    }
    p {
        font-size: 18px;
        margin: 20px 0px;
    }
    menu {
        font-size: 40px;
    }
    menu button {
        padding: 5px 10px;
        opacity: 0.4;
    }
    menu button:hover,
    menu button.active {
        opacity: 1;
    }
</style>
