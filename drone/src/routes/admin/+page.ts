/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	console.log('load...');
	let session = url.searchParams.get('s');

	return {
		sessionkey: session
	};
}
