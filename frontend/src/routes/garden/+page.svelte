<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

    console.log(data.userInfo)

    let userPlants = data.userInfo?.userResult[0].userPlants
    let userName = data.userInfo?.userResult[0].name
</script>

<h2>Tu jardin, {userName}.</h2>

<h4>Tus plantas</h4>
{#if userPlants == 0}
    <p>tu no tiene planta'</p>
{:else}
    <div class="userPlants">
        {#each userPlants as plant}
            <p>hola</p>
        {/each}
    </div>
{/if}