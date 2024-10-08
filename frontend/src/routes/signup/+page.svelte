<script lang="ts">
    import VerificationCode from "$lib/components/utils/VerificationCode.svelte";
    import { ErrorFH } from "$lib/classes/errorClass";


    let name = "";
    let mail = "";

    let passwordHash = "";
    let passwordRepeat = "";

    let sessionMessage = "";
    let sessionError=null;

    let showVerifyModule = false;

    const signupUser = async () => {
        if (passwordHash !== passwordRepeat) {
            sessionError = new ErrorFH(
                "Password",
                "Las contraseñas no coinciden.",
            );
            return sessionError;
        }
        else {
            sessionError = null
        }

        try {
            const registrationResponse = await fetch(
                "http://localhost:3000/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, mail, passwordHash }),
                },
            );

            const registrationResult = await registrationResponse.json();

            if (!registrationResponse.ok) {
                console.log(registrationResponse)
                sessionError = new ErrorFH(registrationResult.errorType, registrationResult.errorMessage)
                return sessionError

            } else {
                sessionMessage = `Tú cuenta ha sido creada con éxito`;
                showVerifyModule = true;

                const loginResponse = await fetch(
                    "http://localhost:3000/api/v1/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ mail, password: passwordHash }),
                    },
                );

                const loginResult = await loginResponse.json();
                console.log(loginResult);
            }
        } catch (err) {
            console.error(err);
        }
    };
</script>

<!-- markup (zero or more items) goes here -->

<div class="container">
    <div class="signup_container">
        <h2>Register</h2>
        <form
            on:submit|preventDefault={signupUser}
            method="post"
            action="http://localhost:3000/api/users/register"
        >
            <div class="form form1">
                <label for="userName">Name</label>
                <input
                    id="name"
                    bind:value={name}
                    type="text"
                    name="name"
                    placeholder="Pon tú nombre aquí."
                    required
                />
                {#if sessionError?.errorType == "Name"}
                    <p class="error">{sessionError.getErrorMessage()}</p>
                {/if}
            </div>

            <div class="form form2">
                <label for="userEmail">Email</label>
                <div class="input_container_mail">
                    <input
                        id="email"
                        bind:value={mail}
                        type="text"
                        name="mail"
                        placeholder="Pon tú mail aquí."
                        required
                    />
                    {#if sessionError?.errorType == "Mail"}
                        <p class="error">{sessionError.getErrorMessage()}</p>
                    {/if}
                </div>
            </div>

            <div class="form form3">
                <label for="password">Password</label>
                <div class="input_container_password">
                    <input
                        id="password"
                        bind:value={passwordHash}
                        type="password"
                        name="passwordHash"
                        placeholder="Pon tú contraseña aquí."
                        required
                    />
                </div>
                {#if sessionError?.errorType == "Password"}
                    <p class="error">{sessionError.getErrorMessage()}</p>
                {/if}
            </div>

            <div class="form form4">
                <label for="passwordRepeat">Repeat Password</label>
                <div class="input_container_password">
                    <input
                        id="passwordRepeat"
                        bind:value={passwordRepeat}
                        type="password"
                        name="passwordRepeat"
                        placeholder="Repite tú contraseña aquí."
                        required
                    />
                    {#if sessionError?.errorType == "Password"}
                        <div>
                            <p class="error">{sessionError.getErrorMessage()}</p>
                        </div>
                    {/if}
                </div>
            </div>

            <button type="submit">Register</button>
        </form>
        {#if sessionMessage}
            <p>{sessionMessage}</p>
        {/if}

        {#if showVerifyModule}
            <VerificationCode userData={{ mail }}></VerificationCode>
        {/if}
    </div>
</div>

<style>
    .container {
        width: 100vw;
        height: 91vh;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    .signup_container {
        width: 90%;
        border-left: #000 1px solid;
        padding: 10px;
    }

    .signup_container h2 {
        margin-bottom: 10px;

        color: #4fb477;
        font-family: "Lora", sans-serif;
    }

    .form {
        margin-bottom: 20px;
    }
    .error {
        color: #d82929;
        font-family: "Oxygen", sans-serif;
        font-size: 12px;

        margin-top: 1.5px;
    }

    label {
        font-family: "Nunito sans", sans-serif;
        font-weight: 700;
    }

    input {
        height: 50px;
        width: 100%;

        padding-left: 5px;

        border: #345511 2px solid;
        border-radius: 5px;

        font-family: "Oxygen", sans-serif;
    }

    .signup_container form input:nth-child(3) {
        background-color: aqua;
    }

    .input_container_mail input {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%234FB477" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>');
        background-repeat: no-repeat;
        background-position: right 10px center; /* Posiciona el ícono a la derecha */
        background-size: 25px 25px; /* Ajusta el tamaño del ícono */
    }

    .input_container_password input {
        background-image: url('data:image/svg+xml;utf8,<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="%234FB477"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>');
        background-repeat: no-repeat;
        background-position: right 10px center; /* Posiciona el ícono a la derecha */
        background-size: 25px 25px; /* Ajusta el tamaño del ícono */
    }

    button {
        width: 150px;
        height: 40px;

        background: none;

        border: #4fb477 2px solid;
        border-radius: 5px;

        margin-top: 10px;

        font-family: "Nunito Sans", sans-serif;
        font-weight: 700;
        font-size: 16px;
    }
</style>
