import { TransactionHashPrefix, StarknetChainId } from 'starknet/constants';

export const BASEURL = 'https://alpha4.starknet.io';
export const CHAINID = StarknetChainId.TESTNET;

export const ETHCONTRACT = {
	contract: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
	name: 'Ethereum',
	symbol: 'ETH',
	decimals: 18
};

export const STRKCONTRACT = {
	contract: '0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb',
	name: 'Stark pill',
	symbol: 'STRK',
	decimals: 0
};
