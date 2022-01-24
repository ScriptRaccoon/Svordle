<script>
    import { fade } from "svelte/transition";
    export let popup = true;
    export let popupText = "";
</script>

<aside
    transition:fade={{ duration: 120 }}
    on:click={() => (popup = false)}
>
    {popupText}
</aside>

<style>
    aside {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000e;
        z-index: 100;
        cursor: pointer;
        font-size: 30px;
    }
</style>
