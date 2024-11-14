export async function fetchImage(plantFilename:string, authToken:string) {
    let imageBlobUrl = ""
    const response = await fetch(`http://localhost:3000/api/v1/plantPhoto/${plantFilename}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Error al obtener la imagen: ${response.statusText}`);
    }

    const blob = await response.blob();
    imageBlobUrl = URL.createObjectURL(blob);

    return imageBlobUrl
}