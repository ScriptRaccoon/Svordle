<script>
    export let grid = [];
    export let evaluation = [];
    export let columnIndices = [0, 1, 2, 3, 4];
    export let rowIndices = [0, 1, 2, 3, 4, 5];
    export let currentRow = 1;
    export let playing = true;
</script>

<div class="grid">
    {#each rowIndices as row}
        {#each columnIndices as column}
            <span
                class:current={row == currentRow && playing}
                class={evaluation[row][column] || ""}
                >{grid[row][column]}</span
            >
        {/each}
    {/each}
</div>

<style>
    .grid {
        margin: 0 auto;
        --size: min(95vw, 400px);
        width: var(--size);
        height: calc(1.25 * var(--size));
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: calc(0.02 * var(--size));
    }

    span {
        font-size: calc(0.13 * var(--size));
        border: 1px solid #444;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }

    span.correct {
        background: var(--color-correct);
        border: 1px solid transparent;
    }

    span.almost {
        background: var(--color-almost);
        border: 1px solid transparent;
    }

    span.incorrect {
        background: var(--color-incorrect);
        border: 1px solid transparent;
    }

    span.current {
        border: 1px solid #eee;
    }
</style>
