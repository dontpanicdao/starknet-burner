import styled from "styled-components";
import { useState } from "react";
import InputTextWithCopy from "./InputTextWithCopy";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ArgentX = ({ setArgentAccount }) => {
  const [accountAddress, setAccountAddress] = useState("");

  const connect = async () => {
    const starknet = window["starknet-argentX"];
    if (!starknet) {
      console.log("argent-x not found");
      return;
    }
    if (starknet?.isConnected) {
      setArgentAccount(starknet?.account);
      setAccountAddress(starknet?.account.address);
    }
    await starknet.enable({ starknetVersion: "v4" });
    if (starknet?.isConnected) {
      setArgentAccount(starknet?.account);
      setAccountAddress(starknet?.account.address);
    }
  };

  return (
    <Form>
      <input type="button" value="Connect..." onClick={connect} />
      <InputTextWithCopy type="text" value={accountAddress} />
    </Form>
  );
};

export default ArgentX;
