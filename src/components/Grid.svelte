<script>
    export let grid = [];
    export let evaluation = [];
    export let indices = [0, 1, 2, 3, 4];
</script>

<div class="grid">
    {#each indices as row}
        {#each indices as column}
            <span
                class={evaluation[row][column]
                    ? evaluation[row][column]
                    : ""}>{grid[row][column]}</span
            >
        {/each}
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 10px;
    }

    span {
        width: 100px;
        height: 100px;
        font-size: 80px;
        border: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }

    span.correct {
        background: green;
        border: 1px solid transparent;
    }

    span.almost {
        background: rgb(231, 189, 2);
        border: 1px solid transparent;
    }

    span.incorrect {
        background: #555;
        border: 1px solid transparent;
    }
</style>
