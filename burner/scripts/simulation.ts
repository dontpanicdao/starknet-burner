import { ec } from 'starknet';
import { BigNumberish, toBN } from 'starknet/utils/number';
import { calculateTransactionHashCommon } from 'starknet/utils/hash';
import { TransactionHashPrefix, StarknetChainId } from 'starknet/constants';

import * as dotenv from 'dotenv';
dotenv.config();

// Note: in order to run a transaction:
//  1. Get the current Nonce
//  2. Estimate the Max Fee
//  3. Create and Run the transaction
//  4. Monitor the transaction status

const pk = toBN(process.env.ARGENT_ACCOUNT_PRIVATE_KEY as BigNumberish, 10);
console.log(`private key: ${pk.toString(16)}`);
const keypair = ec.getKeyPair(pk);

// ********************************************
// 1. Get the current Nonce
// ********************************************
// This is an example of how to get the current nonce of an account
//
// curl 'https://alpha4.starknet.io/feeder_gateway/call_contract?blockNumber=pending' \
//   --data-raw '{
// 	"signature":[],
// 	"contract_address":"0x0207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde",
// 	"entry_point_selector":"0x1ac47721ee58ba2813c2a816bca188512839a00d3970f67c05eab986b14006d",
// 	"calldata":[]
// }'

// ********************************************
// 2. Estimate the Max Fee
// ********************************************
// This is an example of how to estimate the max fee of a transaction
//

console.log(
	`**************************************************************************************`
);
console.log(`POST on /feeder_gateway/estimate_fee?blockNumber=pending:`);
// curl 'https://alpha4.starknet.io/feeder_gateway/estimate_fee?blockNumber=pending' \
//   -H 'content-type: application/json' \
//   --data-raw '{
// 	"contract_address":"0x207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde",
// 	"entry_point_selector":"0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
// 	"calldata":[
// 		"1",
// 		"3451821955164864433308383606942371883506813563715795535587103668389654669771",
// 		"232670485425082704932579856502088130646006032362877466777181098476241604910",
// 		"0",
// 		"3",
// 		"3",
// 		"1478889342385977866847350421410405821707989742040860331696169838368143044160",
// 		"2",
// 		"0",
// 		"54"
// 	],
// 	"version":"0x100000000000000000000000000000000",
// 	"signature":[
// 		"1221368276894607823576780701845735838248329480917347593087086860731821596799",
// 		"2880515871325113926391453580850112597118683340039868486705088714179945289667"
// 	]
// }'

// compute transaction hash from transaction details
let hash = calculateTransactionHashCommon(
	// transaction hash prefix
	TransactionHashPrefix.INVOKE,
	// version
	toBN('0x100000000000000000000000000000000'),
	// account address
	toBN('0x207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde'),
	// entry point selector for "__execute__"
	toBN('0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad'),
	[
		// calls to execute
		// # of calls
		toBN('0x1'),
		// contract address
		toBN('0x7A1A9784591AAD3CC294ED3D89FA45ADD74E96E8C20E46A21153A6AA979A9CB'),
		// entry point selector for "transfer"
		toBN('0x83AFD3F4CAEDC6EEBF44246FE54E38C95E3179A5EC9EA81740ECA5B482D12E'),
		// offset in calldata
		toBN('0x0'),
		// length in calldata
		toBN('0x3'),
		// calldata
		// # of calldata
		toBN('0x3'),
		// calldata 1 is the address of the recipient
		toBN('0x345058E731BB3B809880175260EAAA284D2302AFB3551F74C1832731F25EE40'),
		// calldata 2 and 3 matches Uint256(2)
		toBN('0x2'),
		toBN('0x0'),
		// nonce
		toBN('0x36')
	],
	// max fee
	toBN('0x0'),
	// chain id
	StarknetChainId.TESTNET
);
console.log(`tx hash:     ${hash}`);
let signature = ec.sign(keypair, hash);
let s = toBN('1221368276894607823576780701845735838248329480917347593087086860731821596799', 10);
let r = toBN('2880515871325113926391453580850112597118683340039868486705088714179945289667', 10);

console.log(`s: expected ${s.toString(10)}\n        got ${signature[0]}`);
console.log(`r: expected ${r.toString(10)}\n        got ${signature[1]}`);

// ********************************************
// 3. Create and Run the transaction
// ********************************************
// This is an example of how to execute a transaction
//
// curl 'https://alpha4.starknet.io/gateway/add_transaction' \
// --data-raw '{
// 	"type":"INVOKE_FUNCTION",
// 	"contract_address":"0x207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde",
// 	"entry_point_selector":"0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
// 	"calldata":[
// 		"1",
// 		"3451821955164864433308383606942371883506813563715795535587103668389654669771",
// 		"232670485425082704932579856502088130646006032362877466777181098476241604910",
// 		"0",
// 		"3",
// 		"3",
// 		"1478889342385977866847350421410405821707989742040860331696169838368143044160",
// 		"2",
// 		"0",
// 		"54"
// 	],
// 	"signature":[
// 		"3477370255884311117325812555858383809956991971631275431972067599328905892405",
// 		"1978615115535109457109435916363384787717634478878037049083725485973803901780"
// 	],
// 	"max_fee":"0x17c3dd5fcc48"
// }' \
//   --compressed

console.log(
	`**************************************************************************************`
);
console.log(`POST on /gateway/add_transaction:`);

// compute transaction hash from transaction details
hash = calculateTransactionHashCommon(
	// transaction hash prefix
	TransactionHashPrefix.INVOKE,
	// version
	toBN('0x0'),
	// account address
	toBN('0x207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde'),
	// entry point selector for "__execute__"
	toBN('0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad'),
	[
		// calls to execute
		// # of calls
		toBN('0x1'),
		// contract address
		toBN('0x7A1A9784591AAD3CC294ED3D89FA45ADD74E96E8C20E46A21153A6AA979A9CB'),
		// entry point selector for "transfer"
		toBN('0x83AFD3F4CAEDC6EEBF44246FE54E38C95E3179A5EC9EA81740ECA5B482D12E'),
		// offset in calldata
		toBN('0x0'),
		// length in calldata
		toBN('0x3'),
		// calldata
		// # of calldata
		toBN('0x3'),
		// calldata 1 is the address of the recipient
		toBN('0x345058E731BB3B809880175260EAAA284D2302AFB3551F74C1832731F25EE40'),
		// calldata 2 and 3 matches Uint256(2)
		toBN('0x2'),
		toBN('0x0'),
		// nonce
		toBN('0x36')
	],
	// max fee
	toBN('0x17c3dd5fcc48'),
	// chain id
	StarknetChainId.TESTNET
);

console.log(`tx hash:     ${hash}`);
signature = ec.sign(keypair, hash);

// expected signature:
s = toBN('0x7b01f2f69d6ed9420db8e111c674a780a6cf5fc5a709cbac27d2e572c8d9235');
r = toBN('0x45fdb419059156b00f2ae8e374cb54fed97e35f9611693252025d7895282354');

console.log(`s: expected ${s.toString(10)}\n        got ${signature[0]}`);
console.log(`r: expected ${r.toString(10)}\n        got ${signature[1]}`);

// ********************************************
// 4. Monitor the transaction status
// ********************************************
// This is an example of how to execute a transaction
//
// - Check the status of the transaction:
// curl 'https://alpha4.starknet.io/feeder_gateway/get_transaction_status?transactionHash=0x12340f88718e03528b359b7e234c66c9a7d60de63bc26828b2c4e2c0e15011c'
//
// - Once it has succeeded, you can check some details about the transaction:
// curl 'https://goerli.voyager.online/api/txns?to=0x207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde'
