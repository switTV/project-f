import { verifyAuthToken } from '$lib/func/verifyAuthToken.js';
export const load = async ({ cookies, url }) => {
    const authToken = cookies.get('authToken');
    const verified = await verifyAuthToken(authToken)
    console.log(verified)

    let signedIn = false

    if (verified) {
        signedIn = true
    }

    return {
        signedIn
    };
};