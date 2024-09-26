import { redirect } from '@sveltejs/kit';
let errorMessage = ""

export const load = async ({ cookies, url }) => {
    const authToken = cookies.get('authToken');

    if (!authToken && url.pathname !== '/signup') {
        throw redirect(302, '/signup');
    }

    try {
        const verifyResponse = await fetch("http://localhost:3000/api/v1/garden", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })

        if (!verifyResponse.ok) {
            errorMessage = `Error: ${verifyResponse.statusText}`
            console.log(`error ${verifyResponse.status} ${verifyResponse.redirected}`)
        }
        
        const verifyResult = await verifyResponse.json();
        const userInfo = await getUserData(verifyResult.user.id, authToken);
        
        return { verifyResult, userInfo }

    } catch (error) {
        errorMessage = `Error del servidor`
        return {errorMessage}
    }
};


const getUserData = async(id, authToken) => {
    try {
        const userResponse = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })

        if (!userResponse.ok) {
            throw new Error(`Error: ${userResponse.statusText}`);
        }

        const userResult = await userResponse.json()

        return { userResult }
    } catch (error) {
        errorMessage = `Error del servidor: ${error}`
        return {errorMessage}
    }
}