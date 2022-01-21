<script>
    import Key from "./Key.svelte";
</script>

<section class="keyboard">
    <div class="row">
        <Key on:key key={"Q"} />
        <Key on:key key={"W"} />
        <Key on:key key={"E"} />
        <Key on:key key={"R"} />
        <Key on:key key={"T"} />
        <Key on:key key={"Y"} />
        <Key on:key key={"U"} />
        <Key on:key key={"I"} />
        <Key on:key key={"O"} />
        <Key on:key key={"P"} />
    </div>
    <div class="row">
        <Key on:key key={"A"} />
        <Key on:key key={"S"} />
        <Key on:key key={"D"} />
        <Key on:key key={"F"} />
        <Key on:key key={"G"} />
        <Key on:key key={"H"} />
        <Key on:key key={"J"} />
        <Key on:key key={"K"} />
        <Key on:key key={"L"} />
    </div>
    <div class="row">
        <Key on:key key={"Z"} />
        <Key on:key key={"X"} />
        <Key on:key key={"C"} />
        <Key on:key key={"V"} />
        <Key on:key key={"B"} />
        <Key on:key key={"N"} />
        <Key on:key key={"M"} />
        <Key on:key key={"Backspace"} />
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
