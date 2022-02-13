<script>
    import {
        WORD_LENGTH,
        ATTEMPTS,
        FLIP_SPEED,
        FLIP_DELAY,
    } from "../stores.js";
    import { customUpperCase } from "../utils.js";
    export let grid = [];
    export let evaluation = [];
    export let columnIndices = new Array($WORD_LENGTH)
        .fill(0)
        .map((_, i) => i);
    export let rowIndices = new Array($ATTEMPTS)
        .fill(0)
        .map((_, i) => i);
    export let currentRow = 1;
    export let playing = true;
</script>

<div
    class="grid"
    style:--cols={$WORD_LENGTH}
    style:--rows={$ATTEMPTS}
>
    {#each rowIndices as row}
        {#each columnIndices as column}
            <span
                style:animation-delay="{column * $FLIP_DELAY}ms"
                style:--speed="{$FLIP_SPEED}ms"
                class={evaluation[row][column]
                    ? evaluation[row][column]
                    : ""}
                class:flip={evaluation[row][column] != null}
                class:current={row == currentRow && playing}
                >{@html customUpperCase(grid[row][column])}</span
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
        transition: border var(--speed) linear;
    }

    span.correct {
        --evaluation-color: var(--color-correct);
    }

    span.present {
        --evaluation-color: var(--color-present);
    }

    span.absent {
        --evaluation-color: var(--color-absent);
    }

    span.current {
        border: 1px solid #eee;
    }

    span.flip {
        animation: flip var(--speed) ease-in forwards;
    }

    @keyframes flip {
        0% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(0);
            border: 1px solid transparent;
            background: transparent;
        }
        100% {
            transform: scaleY(1);
            border: 1px solid transparent;
            background: var(--evaluation-color);
        }
    }
</style>
