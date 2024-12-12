<script lang="ts">
    import { goto } from "$app/navigation";

    export let userData;

    let message = "";
    let code = "";
    let mail = userData.mail;

    async function verifySecurityCode() {
        try {
            const verificationResponse = await fetch("http://localhost:3000/api/v1/users/verifycode",
                {
                    method: "post",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mail, code }),
                },
            );

            const verificationResult = await verificationResponse.json();

            if (!verificationResponse.ok) {
                message = verificationResult.errorMessage;
                code = ""
            } else {
                message = verificationResult.errorMessage;
                goto("http://localhost:5173/garden")
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>

<style>
    .VerificationCode {
        width: 100%;
        height: 91vh;

        position: absolute;
        top: 9vh;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .VerificationCode_content {
        width: 90%;
        height: auto;

        background-color: #ffffff;
        border: 2px solid #000;
        
        border-radius: 5px;
        
        padding: 10px;
        position: absolute;
        z-index: 2;
    }

    .VerificationCode_content h2 {
        font-family: "Lora", sans-serif;
        margin-bottom: 5px;
    }

    .VerificationCode_content p{
        font-family: 'Oxygen', sans-serif;
    }

    .VerificationCode_content header {
        margin-bottom: 20px;
    }

    #vCode {
        border: none;
        outline: none;

        color: #4fb477;        

        border-bottom: #8f8c8c 2px solid;
        width: 100%;
        text-align: center;

        font-family: "Lora", sans-serif;
        font-size: 24px;
        font-weight: 700;
    }

    .overlay {
        background-color: rgba(0, 0, 0, 0.363);
        width: 100%;
        height: 100%;

        backdrop-filter: blur(4px);
        z-index: 1;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0px;
    }

    button {
        width: 100px;
        height: 30px;

        border: none;
        border-radius: 2.5px;

        font-size: 16px;
        font-family: "Oxygen", sans-serif;
        
        outline: #3ce07e;

        background-color: #4fb477;
    }

    .errorMsg {
        color: #d82626;
    }
</style>


<!-- markup (zero or more items) goes here -->

<div class="VerificationCode">
    <div class="VerificationCode_content">
        <header>
            <div class="headerTitle">
                <h2>Verification code</h2>
                <p>
                    te enviamos un correo con un código
                    que tienes que poner aquí
                </p>
            </div>
        </header>

        <body>
            <form
                action="http://localhost:3000/api/v1/users/verifycode"
                method="post"
                on:submit|preventDefault={verifySecurityCode}
            >
                <input
                    bind:value={code}
                    type="text"
                    name="verificationCode"
                    required
                    id="vCode"
                    autofocus
                    maxlength="4"
                />
                <div class="footer">
                    <div class="footer_left">
                        <button type="submit">Verificar</button>
                    </div>
                    <div class="footer_right">
                        <a href="#">Resend; falta terminar esto!!!</a>
                    </div>
                </div>
            </form>
            {#if message}
                <p class="errorMsg">{message}</p>
            {/if}
        </body>
    </div>
    <div class="overlay"></div>
</div>