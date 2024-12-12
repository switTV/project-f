<script lang="ts">
    let switcher1:HTMLDivElement
    let switcher2:HTMLDivElement

    let counter = false

    function switchMode() {
        counter = !counter
    }
</script>

<style>
    .Switcher {
        width: 100px;
        height: 40px;
        border-radius: 20%;

        background-color: aliceblue;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .active {
        background-color: aqua;
    }
</style>

<!-- markup (zero or more items) goes here -->

<div class="Switcher" on:click={switchMode}>
    <div class="Switcher_plant" bind:this={switcher1} class:active={!counter}>1</div>
    <div class="Switcher_plague" bind:this={switcher2} class:active={counter}>2</div>
</div>