<script lang="ts">
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import PlantCard from "$lib/components/utils/PlantCard.svelte";

    export let data: PageData;

    let plantData:any[] = []

    let userInfo = data.userInfo?.userResult[0];

    async function fetchPlant() {
        try {
            const plantRequest = await fetch(`http://localhost:3000/api/v1/plants/user/${userInfo._id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${data.authToken}`,
                },
            })
    
            let plantResponse = await plantRequest.json()
            plantData = plantResponse
        } catch (error) {
            console.log(error)
        }

    }

    onMount(async () => {
        await fetchPlant();
    });
    
</script>

<div class="container">
    <div class="container_content">
        <header>
            <h2>Tu jardín,<br /><span>{userInfo.name}</span>.</h2>
            <a href="/capturePlant">Add plant</a>
        </header>
        <div class="separador"></div>
        <body>
            {#if userInfo.userPlants == 0}
                <img src="src/lib/images/noPlants.svg" alt="" />
                <p>
                    Aún no haz subido ninguna foto ¡Ve a sacarle fotos a tu
                    jardín!
                </p>
            {:else}
                <div class="userPlants">
                    {#if plantData.length > 0}
                        {#each userInfo.userPlants as plantId, index}
                            <PlantCard {index} {plantData} authToken={data.authToken}></PlantCard>
                        {/each}
                    {/if}
                </div>
            {/if}
        </body>
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: 90vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container_content {
        width: 90vw;
        height: auto;

        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .container_content header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 34px;
        width: 100%;
    }

    .container_content header h2 {
        font-size: 20px;
        font-family: "Nunito Sans", sans-serif;
        font-weight: 800;
        line-height: 22px;
    }

    .container_content header span {
        font-size: 26px;
        font-family: "Lora", sans-serif;
        font-weight: 800;
    }

    .container_content header a {
        height: 40px;
        width: 140px;

        font-size: 16px;
        font-family: "Oxygen", sans-serif;

        background-color: #3aec80;
        color: #000;
        text-decoration: none;

        border-radius: 2.5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .separador {
        width: 80%;
        height: 1px;

        background-color: #000;
    }

    .container_content body {
        margin-top: 34px;
    }

    .container_content body img {
        max-width: 100%;
        min-width: 250px;
    }

    .container_content body p {
        text-align: center;
        margin-top: 5px;

        font-family: "Oxygen", sans-serif;
    }

    .userPlants {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        grid-auto-flow: dense;
        align-items: center;
    }

    body {
        width: 100%;
    }
</style>
