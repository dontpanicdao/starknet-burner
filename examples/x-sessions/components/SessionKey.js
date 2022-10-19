import styled from "styled-components";
import { useEffect, useState } from "react";
import useLocalStorage from "lib/useLocalStorage";
import {
  genKeyPair,
  getKeyPair,
  getStarkKey,
} from "starknet/utils/ellipticCurve";
import InputTextWithCopy from "./InputTextWithCopy";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const SessionKey = ({ keyname, setSessionPrivateKey }) => {
  const [sessionKey, setSessionKey] = useLocalStorage(keyname, "0x1");
  const [sessionPublicKey, setSessionPublicKey] = useState("");

  const genPrivateKey = () => {
    const keypair = genKeyPair();
    const privateKey = `0x${keypair.getPrivate().toString(16)}`;
    setSessionKey(privateKey);
  };

  useEffect(() => {
    const keypair = getKeyPair(sessionKey);
    const publicKey = getStarkKey(keypair);
    setSessionPublicKey(publicKey);
    if (setSessionPrivateKey) {
      setSessionPrivateKey(sessionKey, publicKey);
    }
  }, [sessionKey]);

  return (
    <Form>
      <label>Private Key</label>
      <Block>
        <InputTextWithCopy type="text" value={sessionKey} readOnly />
        <input
          type="button"
          value="random"
          onClick={() => {
            genPrivateKey();
          }}
        />
      </Block>
      <label>Public Key</label>
      <InputTextWithCopy type="text" value={sessionPublicKey} readOnly />
    </Form>
  );
};

export default SessionKey;
