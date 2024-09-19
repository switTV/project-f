import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, url }) => {
    const authToken = cookies.get('authToken');

    if (!authToken && url.pathname !== '/signup') {
        throw redirect(302, '/signup');
    }
};