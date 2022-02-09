<script>
    export let text = "";
    export let action = () => {};
</script>

<button on:click={action}>{text}</button>

<style>
    button {
        --size: min(20px, 6vw);
        background: var(--color-button);
        font-size: var(--size);
        padding: calc(0.4 * var(--size)) calc(0.8 * var(--size));
        border-radius: 4px;
    }

    button:focus,
    button:hover {
        filter: brightness(1.2);
    }
</style>
