<script>
    export let key = "";
    export let evaluation;
    import {
        FLIP_SPEED,
        FLIP_DELAY,
        WORD_LENGTH,
    } from "../stores.js";
    import { customUpperCase } from "../utils.js";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let pressed = false;

    function handleClick() {
        dispatch("key", key);
        pressed = true;
        setTimeout(() => {
            pressed = false;
        }, 70);
    }
</script>

<button
    style:--speed="{$FLIP_SPEED + ($WORD_LENGTH - 1) * $FLIP_DELAY}ms"
    class:backspace={key == "Backspace"}
    class:pressed
    class={evaluation}
    on:click={handleClick}
>
    {#if key == "Backspace"}
        <i class="fas fa-backspace" />
    {:else}
        {@html customUpperCase(key)}
    {/if}
</button>

<style>
    button {
        --shadow-size: min(3px, 0.7vw);
        width: min(40px, 8vw);
        height: min(50px, 10vw);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 18%;
        font-size: min(30px, 6vw);
        background: var(--color-key);
        box-shadow: 0px var(--shadow-size) 0px var(--color-key-dark);
        transition: background var(--speed) linear,
            box-shadow var(--speed) linear;
    }

    button.backspace {
        width: min(60px, 12vw);
        background: var(--color-backspace);
        box-shadow: 0px var(--shadow-size) 0px
            var(--color-backspace-dark);
    }

    button:hover {
        filter: brightness(1.2);
    }

    button.correct {
        background: var(--color-correct);
        box-shadow: 0px var(--shadow-size) 0px
            var(--color-correct-dark);
    }

    button.present {
        background: var(--color-present);
        box-shadow: 0px var(--shadow-size) 0px
            var(--color-present-dark);
    }

    button.absent {
        background: var(--color-absent);
        box-shadow: 0px var(--shadow-size) 0px
            var(--color-absent-dark);
    }

    button.pressed {
        transform: translateY(var(--shadow-size));
        box-shadow: none !important;
    }
</style>
