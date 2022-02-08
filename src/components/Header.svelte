<script>
    import { view } from "../stores.js";
</script>

<header>
    <button on:click={() => ($view = "help")}>
        <i class="far fa-question-circle" />
    </button>
    <button on:click={() => ($view = "home")}>
        <i class="fas fa-home" />
    </button>
</header>

<style>
    header {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        font-size: min(30px, 7vw);
        padding: 10px 5px;
    }
    button {
        opacity: 0.5;
    }
    button:hover {
        opacity: 1;
    }
</style>
