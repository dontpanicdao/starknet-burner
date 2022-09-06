/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	console.log('load...');
	let qrcode = url.searchParams.get('qr');

	return {
		qr: qrcode
	};
}
