<script>
    import Key from "./Key.svelte";
    export let keys = [];
    export let letterEvaluation = {};
    export let language = "en";
    $: limits = language == "en" ? [0, 10, 19, 27] : [0, 11, 22, 31];
</script>

<section>
    {#each [0, 1, 2] as keyRow}
        <div class="row">
            {#each keys.slice(limits[keyRow], limits[keyRow + 1]) as key}
                <Key
                    on:key
                    {key}
                    evaluation={letterEvaluation[key] || ""}
                />
            {/each}
        </div>
    {/each}
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
