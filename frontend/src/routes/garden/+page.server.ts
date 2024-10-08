import { verifyAuthToken } from '$lib/func/verifyAuthToken.js';
import { redirect } from '@sveltejs/kit';

let errorMessage = ""

export const load = async ({ cookies, url }) => {
    const authToken = cookies.get('authToken');

    if (!authToken && url.pathname !== '/signup') {
        throw redirect(302, '/signup');
    }

    try {
        const { authStatus, userInfo } = await fetchUserSession(authToken)

        if (!authStatus) {
            return { errorMessage };
        }

        return { authStatus, userInfo }
    } catch (error) {

    }

};

const fetchUserSession = async (authToken: any) => {
    try {
        const authStatus = await verifyAuthToken(authToken)
        const userInfo = await fetchUserData(authStatus?.verifyResult.user.id, authToken);

        return { authStatus, userInfo }

    } catch (error) {
        return { error }
    }
}

const fetchUserData = async (id: number, authToken: any) => {
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
        return { errorMessage }
    }
}