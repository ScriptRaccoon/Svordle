<script>
    export let screen = "home";
    import Button from "./Button.svelte";
</script>

<section>
    <h1>Wordle</h1>
    <p>The classical word game</p>
    <p>
        <Button text="Start" action={() => (screen = "game")} />
    </p>
</section>

<style>
    section {
        padding-top: 100px;
        text-align: center;
    }
    h1 {
        font-size: 45px;
        text-transform: uppercase;
    }
    p {
        font-size: 18px;
        margin: 20px 0px;
    }
</style>
