<script>
    export let grid = [];
    export let evaluation = [];
    export let WORD_LENGTH = 0;
    export let ATTEMPTS = 0;
    export let columnIndices = new Array(WORD_LENGTH)
        .fill(0)
        .map((x, i) => i);
    export let rowIndices = new Array(ATTEMPTS)
        .fill(0)
        .map((x, i) => i);
    export let currentRow = 1;
    export let playing = true;
</script>

<div class="grid" style:--cols={WORD_LENGTH} style:--rows={ATTEMPTS}>
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
        grid-template-columns: repeat(var(--cols), 1fr);
        grid-template-rows: repeat(var(--rows), 1fr);
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

    span.present {
        background: var(--color-present);
        border: 1px solid transparent;
    }

    span.absent {
        background: var(--color-absent);
        border: 1px solid transparent;
    }

    span.current {
        border: 1px solid #eee;
    }
</style>
