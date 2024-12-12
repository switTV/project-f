<script lang="ts">
    
</script>

<style>
    .container {
        width: 100%;
        height: 91vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container_content {
        width: 90%;
    }

    .container_content .container_image {
        width: 100%;
        height: 300px;
        background-color: aqua;
    }

    .container_content .container_text {
        margin-top: 25px;
        
        text-align: center;

        font-family: Oxygen, sans-serif;
    }

    .container_text p {
        margin-bottom: 10px;
    }

    .container_buttons {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        gap: 5px 2px;
    }

    .container_buttons .link_button{
        display: flex;
        width: 150px;

        border-radius: 2.5px;
        text-decoration: none;

        background-color: #4fb477;
        color: #2C363F;
        
        justify-content: center;
        align-items: center;
        
        height: 40px;
    }


    .container_buttons .garden {
        background-color: transparent;
        border: 1px solid #000;
    }


</style>


<div class="container">
    <div class="container_content">
        <div class="container_image">
            
        </div>
        <div class="container_text">
            <p>Lo sentimos :(,<br> no detectamos ninguna planta.</p>
            <div class="container_buttons">
                <a href="/capturePlant" class="link_button retry">Volver a intertarlo</a>
                <a href="/garden" class="link_button garden">Volver al jardín</a>
            </div>
        </div>
    </div>
</div>