<script>
    export let key = "";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<button
    class:backspace={key == "Backspace"}
    on:click={() => dispatch("key", key)}
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
        background: var(--color-gray);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        font-size: 30px;
    }
    button.backspace {
        width: 60px;
        background: rgb(245, 71, 71);
    }
</style>
