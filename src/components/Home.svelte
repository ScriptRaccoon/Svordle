<script>
    export let screen = "home";
    import Button from "./Button.svelte";
</script>

<section class="home">
    <h1>Wordle</h1>
    <p>The classical word game</p>
    <p>
        <Button
            text="Start"
            active={true}
            action={() => (screen = "game")}
        />
    </p>
</section>

<style>
    .home {
        text-align: center;
    }
    h1 {
        font-size: 45px;
        text-transform: uppercase;
    }
    p {
        font-size: 20px;
        margin: 20px 0px;
    }
</style>
