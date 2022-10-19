import styled from "styled-components";
import { useExecute } from "lib";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IncrementCounter = ({ account, contractAddress }) => {
  const [status, transactionHash, execute] = useExecute(
    account,
    contractAddress,
    "increment"
  );

  return (
    <main>
      <Form>
        <label>Transaction Hash</label>
        <input type="text" value={transactionHash} readOnly />
        <label>Status</label>
        <input type="text" value={status} readOnly />
        <div>
          <input type="button" value="execute" onClick={execute} />
        </div>{" "}
      </Form>
    </main>
  );
};

export default IncrementCounter;
