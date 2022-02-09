<script>
    import { scale } from "svelte/transition";
    export let popup = true;
    export let popupText = "";
</script>

<aside
    transition:scale={{ duration: 200 }}
    on:click={() => (popup = false)}
>
    {@html popupText}
</aside>

<style>
    aside {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        font-size: 22px;
        line-height: 1.5;
        font-weight: bold;
        text-align: center;
        padding: 10px 20px;
        background: #eee;
        color: #111;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0px 0px 10px #0007;
    }
</style>
