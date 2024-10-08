<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

    let userInfo = data.userInfo?.userResult[0]

    console.log(userInfo)

</script>

<h2>Tú jardín, {userInfo.name}.</h2>

<h4>Tus plantas</h4>
{#if userInfo.userPlants == 0}
    <p>tu no tiene planta'</p>
{:else}
    <div class="userPlants">
        {#each userInfo.userPlants as plant}
            <p>hola</p>
        {/each}
    </div>
{/if}