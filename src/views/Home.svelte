<script>
    import { language, view } from "../stores.js";
    import Button from "../components/Button.svelte";
    import { texts } from "../language.js";
</script>

<div class="container">
    <h1>Svordle</h1>
    <p>{texts.subtitle[$language]}</p>
    <menu>
        {#each ["en", "de"] as lan}
            <button
                title={texts.languageTerm[lan]}
                class:active={$language == lan}
                on:click={() => ($language = lan)}
            >
                <img src="./img/flag-{lan}.png" alt="flag" />
            </button>
        {/each}
    </menu>
    <p>
        <Button text="Start" action={() => ($view = "game")} />
    </p>
    <footer>
        <div>
            Made by <a
                href="https://github.com/ScriptRaccoon/Svordle"
                target="_blank"
                >Script Raccoon
            </a>
        </div>
        <div>
            {@html texts.credit[$language]}
        </div>
    </footer>
</div>

<style>
    .container {
        padding-top: 100px;
        text-align: center;
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
    button {
        padding: 5px 10px;
        opacity: 0.4;
    }
    button:focus,
    button:hover,
    button.active {
        opacity: 1;
    }

    button img {
        width: 50px;
        border-radius: 4px;
    }
    footer {
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        text-align: center;
        color: var(--color-key);
        font-size: 14px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
    }
    :global(footer a) {
        color: var(--color-present);
    }
</style>
