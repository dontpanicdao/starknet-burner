import styled from "styled-components";
import { useState } from "react";

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

const ExpandedInput = styled.input`
  width: 100%;
`;

export const GetCount = ({ account, contractAddress }) => {
  const [incrementValue, setIncrementValue] = useState("unknown");

  const callGetCounter = async () => {
    const output = await account.callContract({
      contractAddress,
      entrypoint: "get_count",
    });
    if (!output.result || output.result.length === 0) {
      throw new Error("error with get_count");
    }
    setIncrementValue(output.result[0]);
  };

  return (
    <main>
      <Form>
        <label>Contract Address</label>
        <input type="text" value={contractAddress} readOnly />
        <label>Count Value</label>
        <Block>
          <input type="button" value="check" onClick={callGetCounter} />
          <ExpandedInput type="text" value={incrementValue} readOnly />
        </Block>
      </Form>
    </main>
  );
};

export default GetCount;
