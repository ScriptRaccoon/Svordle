<script>
    export let text = "";
    export let action = () => {};
    export let active = false;
</script>

<button disabled={!active} class:active on:click={action}
    >{text}</button
>

<style>
    button {
        --size: min(20px, 4vw);
        background: #666;
        font-size: var(--size);
        padding: calc(0.5 * var(--size)) var(--size);
    }
    button.active {
        background: green;
    }
    button:hover {
        filter: brightness(1.2);
    }
</style>
