<script lang="ts">
    import type { LayoutData } from './$types';
    import Nav from "$lib/components/utils/Nav.svelte";
    
    export let data: LayoutData;
</script>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>

<Nav signedIn={data.signedIn}></Nav>
<slot></slot>