<script>
    export let screen = "home";
</script>

<header>
    <button>
        <i
            class="far fa-question-circle"
            on:click={() => (screen = "help")}
        />
    </button>
    <button on:click={() => (screen = "home")}>
        <i class="fas fa-home" />
    </button>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        font-size: min(30px, 6vw);
        padding: 10px 5px;
        margin: 0 auto;
        width: min(95vw, 400px);
    }
    button {
        opacity: 0.5;
    }
    button:hover {
        opacity: 1;
    }
</style>
