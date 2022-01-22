<script>
    export let key = "";
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
    export let letterEvaluation;
</script>

<button
    class:backspace={key == "Backspace"}
    class:pressed
    on:click={handleClick}
    class={letterEvaluation[key] || ""}
>
    {#if key == "Backspace"}
        <i class="fas fa-backspace" />
    {:else}
        {key}
    {/if}
</button>

<style>
    button {
        width: 40px;
        height: 50px;
        background: #666;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        font-size: 30px;
        box-shadow: 0px 3px 0px #444;
    }
    button.backspace {
        width: 60px;
        background: rgb(245, 71, 71);
    }
    button:hover {
        filter: brightness(1.2);
    }
    button.pressed {
        transform: translateY(3px);
        box-shadow: none !important;
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
</style>
