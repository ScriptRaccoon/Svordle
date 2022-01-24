<script>
    import Key from "./Key.svelte";
    export let keys = [];
    export let letterEvaluation = {};
    export let language = "en";
    $: limiters = language == "en" ? [10, 19, 27] : [11, 22, 31];
</script>

<section>
    <div class="row">
        {#each keys.slice(0, limiters[0]) as key}
            <Key
                on:key
                {key}
                evaluation={letterEvaluation[key] || ""}
            />
        {/each}
    </div>
    <div class="row">
        {#each keys.slice(limiters[0], limiters[1]) as key}
            <Key
                on:key
                {key}
                evaluation={letterEvaluation[key] || ""}
            />
        {/each}
    </div>
    <div class="row">
        {#each keys.slice(limiters[1], limiters[2]) as key}
            <Key
                on:key
                {key}
                evaluation={letterEvaluation[key] || ""}
            />
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
