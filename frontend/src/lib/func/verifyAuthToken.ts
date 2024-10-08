export const verifyAuthToken = async (authToken: any) => {
    
    try {
        let verifyResponse = await fetch("http://localhost:3000/api/v1/garden", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })

        if (!verifyResponse.ok) {
            console.log(`error ${verifyResponse.status} ${verifyResponse.statusText}`)
            return null

        }

        const verifyResult = await verifyResponse.json()

        return { verifyResult }

    } catch (error) {
        console.error("Error en verifyAuthToken:", error);
        return null
    }
}