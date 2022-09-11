import type { Load } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: Load = async ({ url }) => {
	let session = url.searchParams.get('s');

	return {
		sessionkey: session
	};
};
