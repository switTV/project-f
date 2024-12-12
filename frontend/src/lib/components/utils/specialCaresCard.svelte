<script>
    export let specialCareData
</script>

<style>
    .specialCaresCard {
        width: 100%;
        min-height: 70px;

        border: 1px solid #000;
        border-radius: 5px;

        margin-bottom: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    p {
        font-family: "Oxygen", sans-serif;
        font-weight: lighter;
    }

    .specialCaresCard_text {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 90%;
    }
</style>

<!-- markup (zero or more items) goes here -->

<div class="specialCaresCard">
    <div class="specialCaresCard_text">
        <p>{specialCareData}</p>
    </div>
</div>