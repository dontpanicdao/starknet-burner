import { ec } from "starknet";
import { toBN } from "starknet/utils/number";

const generateKey = () => {
  const sessionKey = `0x${ec.genKeyPair().getPrivate().toString(16)}`;
  const keypair = ec.getKeyPair(toBN(sessPrivateKey));
  const sessionPublicKey = ec.getStarkKey(keypair);
  return sessionKey;
};

export { generateKey };
