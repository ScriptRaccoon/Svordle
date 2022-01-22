<script>
    import Key from "./Key.svelte";
    export let keys = [];
</script>

<section>
    <div class="row">
        {#each keys.slice(0, 10) as key}
            <Key on:key {key} />
        {/each}
    </div>
    <div class="row">
        {#each keys.slice(10, 19) as key}
            <Key on:key {key} />
        {/each}
    </div>
    <div class="row">
        {#each keys.slice(19, 27) as key}
            <Key on:key {key} />
        {/each}
    </div>
</section>

<style>
    .row {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 8px;
    }
</style>
