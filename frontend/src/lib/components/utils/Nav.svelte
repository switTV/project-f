<script>
    import { goto } from "$app/navigation";
    export let signedIn

    function navHome() {
        goto("/")
    }
</script>

<style>
    .Nav {
        width: 100vw;
        height: 9vh;

        display: flex;
        justify-content: center;
        align-items: center;

        box-shadow: 10px 10px 44px -21px #b5a7b5;

        border-radius: 0px 0px 10px 10px;
    }

    .Nav .Nav_container .Nav_container_logo h2 {
        font-size: 28px;
        color: #4FB477;
        font-family: "Lora", sans-serif;
    }
    
    .Nav_container {
        width: 90%;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .Nav_container_buttons a{
        margin-right: 10px;
        font-family: "Oxygen", sans-serif;
        color: #000;
        text-decoration: none;
    }

    .Nav_container_buttons .signUp{
        border: #4FB477 2px solid;
        box-shadow: 0px 0px 4px 0px rgba(79,180,119,1);
        padding: 3px 10px;
        border-radius: 2.5px;
        
    }

    .Nav_container2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Nav_container_logo2 {
        font-size: 24px;
        color: #4FB477;
        font-family: "Lora", sans-serif;
    }
</style>

<!-- markup (zero or more items) goes here -->

<div class="Nav">
    {#if signedIn == false}
        <div class="Nav_container">
            <div class="Nav_container_logo">
                <h2 on:click={navHome}>AIplant</h2>
            </div>
            <div class="Nav_container_buttons">
                <a href="/signin" class="signIn">Sign in</a>
                <a href="signup" class="signUp">Sign up</a>
            </div>
        </div>

        {:else}

        <div class="Nav_container2">
            <div class="Nav_container_logo2">
                <h2 on:click={navHome}>AIplant</h2>
            </div>
        </div>
    {/if}
</div>