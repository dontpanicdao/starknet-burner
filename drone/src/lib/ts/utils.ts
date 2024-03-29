import { getStarknet } from 'get-starknet';

export const connect = async () => {
	let starknet = getStarknet();
	if (!starknet.isConnected) {
		await starknet.enable();
	}
	if (starknet.selectedAddress) {
		let account = starknet.account;
		return account;
	}
	return;
};
