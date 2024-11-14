<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fetchImage } from "$lib/func/fetchImage";
    export let index
    export let plantData
    export let authToken

    const thisPlant = plantData[index]
    let plantImageUrl = ""

    function goToPlant(plantId:string) {
        goto(`garden/${plantId}/`)
    }

    onMount(async ()=>{
        plantImageUrl = await fetchImage(thisPlant.imageFilename, authToken)
    });
</script>

<style>

    .plantCard {
        border-radius: 5px;
        overflow: hidden;
        height: 100px;

        background-position: center;
        background-size: cover;
        outline: .5px solid #1e1e1e;
    }
</style>

<!-- markup (zero or more items) goes here -->
<div 
  class="plantCard" 
  style="background-image:url({plantImageUrl});" 
  on:click={() => goToPlant(thisPlant._id)}
>

</div>