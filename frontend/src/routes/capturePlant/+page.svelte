<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from './$types';
    export let data: PageData;


    let videoElement: HTMLVideoElement;
    let canvasElement: HTMLCanvasElement;
    let imgElement: HTMLImageElement;
    let buttonElement: HTMLButtonElement;

    let stream: MediaStream;

    let photoTaken = false;

    onMount(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((videoStream) => {
                    stream = videoStream;
                    if (videoElement) {
                        videoElement.srcObject = videoStream;
                    }
                })
                .catch((err) => {
                    console.error("Error al acceder a la cámara: ", err);
                });
        }
    });

    async function createEmptyPlant() {
        const emptyPlant = {
            "imageUrl": "",
            "nombre_comun": "",
            "descripcion": "",
            "cuidados_especiales": [],
            "plagas": [],
            "nativas": [],
            "floracion": "",
            "userId": `${data.authStatus?.verifyResult.user.id}`
        }
        
        const response = await fetch('http://localhost:3000/api/v1/plants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data?.authToken}`,
            },
            body: JSON.stringify({
                ...emptyPlant,
            })
        })
        const result = await response.json();

        if (!response.ok) {
            console.error('Error:', result);
        }

        return result
    }

    async function takePicture() {
        if (photoTaken) return;
        photoTaken = true;

        const context = canvasElement?.getContext("2d");
        const size = Math.min(
            videoElement.videoWidth,
            videoElement.videoHeight,
        );

        canvasElement.width = size;
        canvasElement.height = size;

        context?.drawImage(
            videoElement,
            (videoElement.videoWidth - size) / 2,
            0,
            size,
            size,
            0,
            0,
            size,
            size,
        );

        const plant = await createEmptyPlant();
        const plantId = plant?.createdPlant?._id;

        canvasElement.toBlob((imageBlob) => {
            if (imageBlob) {
                imgElement.src = URL.createObjectURL(imageBlob);
                saveUserPlantImage(imageBlob, plantId);
            }
        }, "image/jpeg");

        if (stream) {
            try {
                stream.getTracks().forEach((track) => track.stop());
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function saveUserPlantImage(imageBlob:Blob, plantId:string) {
        const formData = new FormData();
        formData.append("imagenPlanta", imageBlob);
        formData.append("plantId", plantId);

        try {
            const plantResponse = await fetch("http://localhost:3000/api/v1/plants/capturePlant", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${data?.authToken}`,
                },
                body: formData,
            })
            console.log(imageBlob)

            const plantResult = await plantResponse.json()

            if (!plantResponse.ok) {
                console.error('Error:', plantResult);
            }

            return plantResult

        } catch (error) {
            console.error({error})
        }
    }
</script>

<div class="container">
    <div class="container_content">
        <div class="plantCapturer">
            <video
                id="camera-stream"
                bind:this={videoElement}
                autoplay
                loop
                muted
            ></video>
            <img bind:this={imgElement} />
        </div>
        {#if !photoTaken}
            <div class="plantButtonCapturer">
                <button
                    bind:this={buttonElement}
                    on:click={takePicture}
                    class:inactive={photoTaken}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-camera-up"
                        ><path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        /><path
                            d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5"
                        /><path d="M12 16a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" /><path
                            d="M19 22v-6"
                        /><path d="M22 19l-3 -3l-3 3" /></svg
                    >
                </button>
            </div>
        {:else}
            <p>Info relevante de la planta</p>
        {/if}
        <canvas bind:this={canvasElement} style="display:none;"></canvas>
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: 91vh;

        display: flex;
        justify-content: center;
    }

    .container_content {
        width: 90%;

        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .plantCapturer {
        width: 100%;
        max-width: 640px;
        /* aspect-ratio: 1 / 1; */
        margin-top: 20px;
        height: 350px;

        position: relative;
    }

    video {
        width: 100%;
        height: auto;
        border-radius: 10px;
        position: absolute;
    }

    img {
        width: 100%;
        max-width: 640px;
        border-radius: 10px;

        position: absolute;
        top: 0;
    }

    button {
        height: 60px;
        width: 60px;

        border: none;
        outline: #4fb477 4px solid;

        background-color: #fff;

        border-radius: 50%;

        margin-top: 10px;
    }

    .inactive {
        outline: #95b8a3 4px solid;
    }

    #camera-stream {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: cover; /* Asegura que se mantenga el ratio sin distorsiones */
    }
</style>
