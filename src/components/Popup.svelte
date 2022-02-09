<script>
    import { scale } from "svelte/transition";
    export let popup = true;
    export let popupText = "";
</script>

<aside transition:scale={{ duration: 200 }}>
    <p on:click={() => (popup = false)}>
        {@html popupText}
    </p>
</aside>

<style>
    aside {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
    p {
        font-size: 22px;
        line-height: 1.5;
        font-weight: bold;
        padding: 10px 20px;
        background: #eee;
        color: #111;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0px 0px 5px #fff4;
    }
</style>
