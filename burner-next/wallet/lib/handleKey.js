import { ec } from "starknet";
import { toBN } from "starknet/utils/number";

const generateKey = () => {
  const sessionKey = `0x${ec.genKeyPair().getPrivate().toString(16)}`;
  return sessionKey;
};

const getPublicKey = (sessionKey) => {
  const keypair = ec.getKeyPair(toBN(sessionKey));
  const sessionPublicKey = ec.getStarkKey(keypair);
  return sessionPublicKey;
};

export { generateKey, getPublicKey };
