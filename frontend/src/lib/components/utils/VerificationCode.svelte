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
        
    }
</style>


<!-- markup (zero or more items) goes here -->

<div class="VerificationCode">
    <div class="VerificationCode_content">
        <header>
            <div class="headerTitle">
                <h2>Verification code</h2>
                <p>
                    te enviamos un correo a <b>{userData.mail}</b> con un codigo
                    que tienes que poner aqui
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
                    placeholder="Pon tu codigo por aquí"
                    required
                    id="vCode"
                />
                <button type="submit">Verificar</button>
            </form>
            {#if message}
                <p>{message}</p>
            {/if}
        </body>
    </div>
    <div class="overlay"></div>
</div>