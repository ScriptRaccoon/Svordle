<script>
    export let key = "";
    export let evaluation;

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
    class:backspace={key == "Backspace"}
    class:pressed
    class={evaluation}
    on:click={handleClick}
>
    {#if key == "Backspace"}
        <i class="fas fa-backspace" />
    {:else}
        {key}
    {/if}
</button>

<style>
    button {
        width: min(40px, 8vw);
        height: min(50px, 10vw);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 18%;
        font-size: min(30px, 6vw);
        background: var(--color-key);
        box-shadow: 0px 3px 0px var(--color-key-dark);
    }

    button.backspace {
        width: min(60px, 12vw);
        background: var(--color-backspace);
        box-shadow: 0px 3px 0px var(--color-backspace-dark);
    }

    button:hover {
        filter: brightness(1.2);
    }

    button.correct {
        background: var(--color-correct);
        box-shadow: 0px 3px 0px var(--color-correct-dark);
    }

    button.almost {
        background: var(--color-almost);
        box-shadow: 0px 3px 0px var(--color-almost-dark);
    }

    button.incorrect {
        background: var(--color-incorrect);
        box-shadow: 0px 3px 0px var(--color-incorrect-dark);
    }

    button.pressed {
        transform: translateY(3px);
        box-shadow: none !important;
    }
</style>
