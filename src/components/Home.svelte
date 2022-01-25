<script>
    import { fade } from "svelte/transition";
    export let screen = "home";
    import Button from "./Button.svelte";
    export let language = "en";
    import { texts } from "../language.js";
</script>

<section transition:fade={{ duration: 200 }}>
    <h1>Wordle</h1>
    <p>{texts.subtitle[language]}</p>

    <menu>
        <button
            title="English"
            class:active={language == "en"}
            on:click={() => (language = "en")}
        >
            <img src="./img/flag-en.png" alt="English flag" />
        </button>

        <button
            title="Deutsch"
            class:active={language == "de"}
            on:click={() => (language = "de")}
        >
            <img src="./img/flag-de.png" alt="Deutsche Flagge" />
        </button>
    </menu>
    <p>
        <Button text="Start" action={() => (screen = "game")} />
    </p>
    <aside>
        <a
            href="https://github.com/ScriptRaccoon/Wordle"
            target="_blank"
            >Made by Script Raccoon
        </a>
    </aside>
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

    menu button img {
        width: 50px;
        border-radius: 4px;
    }
    aside {
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        text-align: center;
        opacity: 0.5;
        font-size: 14px;
    }
</style>
