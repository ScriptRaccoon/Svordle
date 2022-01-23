<script>
    import { fade } from "svelte/transition";
    export let popup = true;
    export let popupText = "";
</script>

<aside
    transition:fade={{ duration: 100 }}
    on:click={() => (popup = false)}
>
    <p>{popupText}</p>
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
    }

    p {
        background: #eee;
        color: black;
        padding: 10px;
        font-size: 20px;
        max-width: 300px;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0px 0px 3px #fffa;
        user-select: none;
    }
</style>
