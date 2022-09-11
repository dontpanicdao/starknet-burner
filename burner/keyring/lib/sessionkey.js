import { ec } from "starknet4";
import { toBN } from "starknet4/utils/number";

const generateKey = () => {
  const sessionKey = `0x${ec.genKeyPair().getPrivate().toString(16)}`;
  return sessionKey;
};

const getSessionPublicKey = (sessionKey) => {
  const keypair = ec.getKeyPair(toBN(sessionKey));
  const sessionPublicKey = ec.getStarkKey(keypair);
  return sessionPublicKey;
};

export { generateKey, getSessionPublicKey };
