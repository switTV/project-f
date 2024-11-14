import type { PageServerLoad } from './$types';

export const load = (async ({params, cookies}) => {
    const authToken = cookies.get('authToken');
    const response = await fetch(`http://localhost:3000/api/v1/plants/${params.plant}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to load plant data: ${response.status} ${response.statusText}`);
    }
    const plantData = await response.json();

    return {
        plant: plantData
    };
}) satisfies PageServerLoad;