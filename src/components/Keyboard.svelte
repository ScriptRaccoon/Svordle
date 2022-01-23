<script>
    import Key from "./Key.svelte";
    export let keys = [];
    export let letterEvaluation = {};
</script>

<section>
    <div class="row">
        {#each keys.slice(0, 10) as key}
            <Key on:key {key} {letterEvaluation} />
        {/each}
    </div>
    <div class="row">
        {#each keys.slice(10, 19) as key}
            <Key on:key {key} {letterEvaluation} />
        {/each}
    </div>
    <div class="row">
        {#each keys.slice(19, 27) as key}
            <Key on:key {key} {letterEvaluation} />
        {/each}
    </div>
</section>

<style>
    .row {
        --gap: min(8px, 1.5vw);
        display: flex;
        justify-content: center;
        gap: var(--gap);
        margin-bottom: var(--gap);
    }
</style>
