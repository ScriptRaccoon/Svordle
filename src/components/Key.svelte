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
</script>

<button
    class:backspace={key == "Backspace"}
    class:pressed
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
        box-shadow: none;
    }
</style>
