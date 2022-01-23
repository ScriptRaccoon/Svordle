<script>
    export let text = "";
    export let action = () => {};
</script>

<button on:click={action}>{text}</button>

<style>
    button {
        --size: min(20px, 4vw);
        background: green;
        font-size: var(--size);
        padding: calc(0.5 * var(--size)) var(--size);
        border-radius: 3px;
    }

    button:hover {
        filter: brightness(1.2);
    }
</style>
