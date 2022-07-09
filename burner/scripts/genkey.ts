import { ec } from 'starknet';

const keypair = ec.genKeyPair();

console.log('-----------------------------------------------------');
console.log(`privatekey: 0x${keypair.priv.toString('hex')}`);
console.log(`publickey:  0x${keypair.ec.curve.g.x.toString('hex')}`);
console.log('-----------------------------------------------------');
