<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { fetchImage } from '$lib/func/fetchImage';
    export let data: PageData;
    
    let plantImageUrl = ""
    onMount(async ()=>{
        plantImageUrl = await fetchImage(data.plant.imageFilename, data.authToken)
    });
</script>

<style>
    .container {
        width: 100vw;
        min-height: 91vh;

        max-height: auto;
    
        display: flex;
        justify-content: center;
    }
    .container_content {
        width: 90%;
        margin-top: 20px;
    }
    .plantImage {
        height: 300px;
        width: 100%;
        border-radius: 10px;

        background-position: center;
        background-size: cover;
    }
</style>

<div class="container">
    <div class="container_content">
        <div
          class="plantImage"
          style="background-image:url({plantImageUrl});" 
        ></div>
    </div>
</div>