<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { fetchImage } from '$lib/func/fetchImage';
    export let data: PageData;

    import SpecialCaresCard from '$lib/components/utils/specialCaresCard.svelte';
    import { goto } from '$app/navigation';

    let switcherToggler = false
    let optionToggler = false

    function switchMode() {
        switcherToggler = !switcherToggler
    }

    async function deletePlant() {
        let userId = data.authStatus?.verifyResult.user.id
        let plantId = data.plant._id

        try {
            const deleteRequest = await fetch("http://localhost:3000/api/v1/plants", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.authToken}`
                },

                body: JSON.stringify({ userId, plantId })
            })

            goto("/garden")

            const deleteResponse = await deleteRequest.json()
            return deleteResponse

            
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    function toggleMenu() {
        optionToggler = !optionToggler
    }
    
    let plantImageUrl = ""
    onMount(async ()=>{
        plantImageUrl = await fetchImage(data.plant.imageFilename, data.authToken)
    });

</script>

<style>
    .container {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .container_content {
        width: 90%;

    }
    .plantImage {
        width: 100%;
        height: 300px;

        border-radius: 20px;
        border: 1px solid #000;

        background-size: cover;
    }

    h1 {
        font-family: "Lora", sans-serif;
        font-size: 26px;
    }
    h2 {
        font-family: "Nunito Sans", sans-serif;
        font-size: 22px;
        font-weight: 800;
    }

    p {
        font-family: "Oxygen", sans-serif;
        font-weight: lighter;
    }

    .plantHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 20px;
        margin-top: 60px;

    }
    
    .options_menu {
        background-color: #214d32;
        border-radius: 5px;
        position: absolute;

        height: 200px;
        width: 100px;

        right: 5%;

        justify-content: center;
        align-items: start;

    }

    .options_menu button {
        width: 100%;
        background-color: #4FB477;
        border-radius: 5px 5px 0 0;

        font-family: "Oxygen", sans-serif;

        height: 25%;

        border: none;
        outline: none;
    }

    .description {
        font-weight: 500;
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .Switcher_container {
        width: 100%;

        display: flex;
        justify-content: center;
    }

    .Switcher {
        width: 120px;
        height: 40px;

        border-radius: 20px;
        
        background: #ffffff;
        border: #000 1px solid;
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        position: relative;
        cursor: pointer;
        transition: background 0.2s ease-in-out;

        margin-top: 65px;
        margin-bottom: 20px;
    }

    .option {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: bold;
        color: #666;
        transition: all 0.3s ease-in-out;
    }

    .active {
        background-color: #4FB477;
        color: white;
    }

    .inactive {
        background-color: transparent;
        color: #000000;
    }

    .switchTitle {
        text-align: center;
    }

    .options_menu {
        display: none;
    }

    .visible {
        display: flex;
    }

</style>

<div class="container">
    <div class="container_content">
        
        <div class="plantHeader">
            <div class="plantHeader_name">
                <h1>{data.plant.nombre_comun}</h1>
            </div>
            <div class="plantHeader_options">
                <svg on:click={toggleMenu}  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                <div class="options_menu" class:visible={optionToggler}>
                    <button on:click={deletePlant}>Borrar</button>
                </div>
            </div>
        </div>
        
        <div
          class="plantImage"
          style="background-image:url({plantImageUrl});"
        ></div>
        <p class="description">{data.plant.descripcion}</p>
        <div class="flowering_container">
            <h2>Floración</h2>
            <p>{data.plant.floracion}</p>
        </div>
        <div class="Switcher_container">
            <div class="Switcher" on:click={switchMode}>
                <div class="option {switcherToggler ? 'inactive' : 'active'}">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plant-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 9a10 10 0 1 0 20 0" /><path d="M12 19a10 10 0 0 1 10 -10" /><path d="M2 9a10 10 0 0 1 10 10" /><path d="M12 4a9.7 9.7 0 0 1 2.99 7.5" /><path d="M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5" /></svg>
                </div>
                <div class="option {switcherToggler ? 'active' : 'inactive'}">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bug"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 9v-1a3 3 0 0 1 6 0v1" /><path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" /><path d="M3 13l4 0" /><path d="M17 13l4 0" /><path d="M12 20l0 -6" /><path d="M4 19l3.35 -2" /><path d="M20 19l-3.35 -2" /><path d="M4 7l3.75 2.4" /><path d="M20 7l-3.75 2.4" /></svg>
                </div>
            </div>
        </div>

        {#if !switcherToggler}
            <div class="special_cares_container">
                <h2 class="switchTitle">Cuidados especiales</h2>
                <ul>
                {#each data.plant.cuidados_especiales as specialCareData}
                    <SpecialCaresCard {specialCareData}></SpecialCaresCard>
                {/each}
                </ul>
            </div>
        {:else}
            <div class="plagues_container">
                <h2 class="switchTitle">Plagas recurrentes</h2>
                {#each data.plant.plagas as plaguesInfo}
                    <div class="plague_container">
                        <p>{plaguesInfo}</p>
                    </div>        
                {/each}
            </div>
        {/if}
    </div>

        
</div>