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
        width: 90%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: min(10px, 2vw);
        font-size: min(60px, 12vw);
    }

    span {
        aspect-ratio: 1 / 1;
        border: 1px solid var(--color-key-dark);
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
