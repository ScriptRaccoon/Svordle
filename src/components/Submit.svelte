<script>
    export let active = false;
</script>

<button class:active> Submit </button>

<style>
    button {
        background: #555;
        font-size: 20px;
        padding: 10px 20px;
    }
    button.active {
        background: green;
    }
</style>
