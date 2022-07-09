import { ec } from 'starknet';

const keypair = ec.genKeyPair();

console.log('-----------------------------------------------------');
console.log(`privatekey: 0x${keypair.getPrivate().toString('hex')}`);
let keys = keypair.getPublic();
console.log(`publickey:  ${ec.getStarkKey(keypair)}`);
console.log('-----------------------------------------------------');
