<script>
    
</script>

<style>
    .hero {
        width: 100%;
        height: 91vh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .hero_container {
        width: 90%;
    }

    .hero .hero_image .hero_image_detail {
        display: flex;
        flex-direction: row;
        justify-content: end;

        gap: 5px;
        animation: fadeDown .4s ease 0s 1 normal forwards;

    }
    
    .hero .hero_image .hero_image_detail div{
        width: 20px;
        height: 20px;
        border-radius: 2.5px;
    }
    
    .hero .hero_image .hero_image_detail div:nth-child(1){ background-color: #61c420; }
    .hero .hero_image .hero_image_detail div:nth-child(2){ background-color: #00ff15; }
    .hero .hero_image .hero_image_detail div:nth-child(3){ background-color: #37a853; }

    .hero .hero_image .hero_img {
        aspect-ratio: 1 / 1;
        width: 100%;

        background: url(../../images/planta3.webp);
        background-size: cover;
        border-radius: 10px;

        margin-top: 10px;

        border: #000 1px solid;

        max-width: 600px;
        max-height: 600px;

        animation: fadeDown .4s ease 0s 1 normal forwards;
    }

    .hero_text {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;

        animation: fade .4s ease .5s 1 normal forwards;

    }

    .hero .hero_text h1 {
        color: #4FB477;
        font-size: 26px;
        font-family: "Lora", sans-serif;
    }

    .hero .hero_text .hero_text_button{
        text-align: center;
    }
    
    .hero .hero_text .hero_text_button a{
        display: flex;
        
        align-items: center;
        justify-content: center;

        font-family: "Nunito sans", sans-serif;
        color: #000;
        font-weight: 700;
        text-decoration: none;
        font-size: 18px;

        border: #4FB477 2px solid;
        height: 60px;
        width: 280px;
        margin-top: 45px;

        border-radius: 10px;
    }

    @keyframes fadeDown {
        0% {
            opacity: 0;

            transform: translateY(-50px);
        }

        100% {
            opacity: 1;
        }
    }
    
    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>

<!-- markup (zero or more items) goes here -->

<div class="hero">
    <div class="hero_container">
        <div class="hero_image">
            <div class="hero_image_detail">
                <div class="square1"></div>
                <div class="square2"></div>
                <div class="square3"></div>
            </div>
            <div class="hero_img">
    
            </div>
        </div>
        <div class="hero_text">
            <h1>Discover your garden</h1>
    
            <div class="hero_text_button">
                <a href="/signup">Do it now!</a>
            </div>
        </div>
    </div>
</div>