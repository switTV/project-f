export const load = async ({ cookies, url }) => {
    const authToken = cookies.get('authToken');
    let signedIn = false

    if (authToken) {
        signedIn = true
    }

    return {
        signedIn
    };
};