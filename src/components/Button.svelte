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
        background: var(--color-gray);
        font-size: 20px;
        padding: 10px 20px;
    }
    button.active {
        background: green;
    }
</style>
