export type websites = 'frenslands';
export type chains = 'mainnet' | 'goerli';

type Policy = {
	contractAddress: string;
	selector: string;
};

export const Policies: Record<websites, Policy[]> = {
	frenslands: [
		{
			contractAddress: '0x00a7a315c7463b4bc491239e1d995fe736fe4830d3345d109a25182fb918ddd2',
			selector: 'start_game'
		},
		{
			contractAddress: '0x00a7a315c7463b4bc491239e1d995fe736fe4830d3345d109a25182fb918ddd2',
			selector: 'reinitialize_game'
		},
		{
			contractAddress: '0x0442d2bfd1e20db5b59286805727241e3f26e37c223c2eed852f1a9450476c00',
			selector: 'claim'
		},
		{
			contractAddress: '0x0442d2bfd1e20db5b59286805727241e3f26e37c223c2eed852f1a9450476c00',
			selector: 'harvest'
		},
		{
			contractAddress: '0x044b7f706c198629198a4382aa21b71fa7aef5541452e894a1130bab6d3eef42',
			selector: 'build'
		},
		{
			contractAddress: '0x044b7f706c198629198a4382aa21b71fa7aef5541452e894a1130bab6d3eef42',
			selector: 'destroy'
		},
		{
			contractAddress: '0x044b7f706c198629198a4382aa21b71fa7aef5541452e894a1130bab6d3eef42',
			selector: 'upgrade'
		},
		{
			contractAddress: '0x044b7f706c198629198a4382aa21b71fa7aef5541452e894a1130bab6d3eef42',
			selector: 'recharge_building'
		},
		{
			contractAddress: '0x00b38e856e62416916645525541c05b85e74972f2d95769e4c89ae2e5f1614f9',
			selector: 'setApprovalForAll'
		}
	]
};
